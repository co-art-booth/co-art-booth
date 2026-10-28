/**
 * Sales forecast (phase 1: simple formula, runs in the browser).
 * Phase 2/3: the same inputs can come from Postgres views/functions, and the
 * function can later be swapped for a model behind a Supabase Edge Function.
 */
export type Trend = 'up' | 'flat' | 'down'
export type Confidence = 'high' | 'medium' | 'low'
export type Action = 'ok' | 'watch' | 'restock' | 'soldout'

export interface ForecastInput {
  left: number
  /** units sold per hour, oldest -> newest (today) */
  hourly: number[]
  /** average units/hour from previous events (optional) */
  historyRate?: number
}

export interface Forecast {
  trend: Trend
  ratePerHour: number
  next3h: number
  hoursToSellOut: number | null
  confidence: Confidence
  action: Action
}

const mean = (a: number[]) => (a.length ? a.reduce((s, v) => s + v, 0) / a.length : 0)
const std = (a: number[]) => {
  const m = mean(a)
  return Math.sqrt(mean(a.map((v) => (v - m) ** 2)))
}

export function forecastProduct({ left, hourly, historyRate }: ForecastInput): Forecast {
  const recent = mean(hourly.slice(-3))
  const earlier = mean(hourly.slice(0, -3))
  const trend: Trend = recent > earlier * 1.15 ? 'up' : recent < earlier * 0.85 ? 'down' : 'flat'
  // blend current speed with the speed seen in previous events
  const ratePerHour = historyRate != null ? 0.6 * recent + 0.4 * historyRate : recent
  const next3h = Math.min(left, Math.round(ratePerHour * 3))
  const hoursToSellOut = left > 0 && ratePerHour > 0 ? left / ratePerHour : null

  const cv = mean(hourly) > 0 ? std(hourly) / mean(hourly) : 1
  let confidence: Confidence = cv < 0.35 ? 'high' : cv < 0.7 ? 'medium' : 'low'
  if (historyRate != null && confidence === 'low') confidence = 'medium'

  let action: Action = 'ok'
  if (left === 0) action = 'soldout'
  else if (hoursToSellOut !== null && hoursToSellOut < 3) action = 'restock'
  else if (trend === 'up') action = 'watch'

  return { trend, ratePerHour, next3h, hoursToSellOut, confidence, action }
}

/** Linear-trend projection for the next event from past event totals (oldest -> newest). */
export function projectNextEvent(totals: number[]) {
  const n = totals.length
  const xs = totals.map((_, i) => i)
  const mx = mean(xs)
  const my = mean(totals)
  const slope = xs.reduce((s, x, i) => s + (x - mx) * (totals[i] - my), 0) / xs.reduce((s, x) => s + (x - mx) ** 2, 0)
  const value = Math.round((my + slope * (n - mx)) / 10) * 10
  return { value, low: Math.round((value * 0.9) / 100) * 100, high: Math.round((value * 1.1) / 100) * 100 }
}

export const CONFIDENCE_LABEL: Record<Confidence, string> = { high: 'มั่นใจสูง', medium: 'มั่นใจกลาง', low: 'มั่นใจต่ำ' }
export const CONFIDENCE_TONE: Record<Confidence, 'ok' | 'info' | 'neutral'> = { high: 'ok', medium: 'info', low: 'neutral' }
export const TREND_LABEL: Record<Trend, string> = { up: 'ขายดีขึ้น', flat: 'ทรงตัว', down: 'ขายช้าลง' }
