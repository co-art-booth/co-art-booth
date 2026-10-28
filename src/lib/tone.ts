export type Tone = 'purple' | 'pink' | 'orange' | 'green' | 'red'

/** Gradient background classes used by icon chips, rank badges and bars. */
export const TONE_BG: Record<Tone, string> = {
  purple: 'bg-g-purple',
  pink: 'bg-g-pink',
  orange: 'bg-g-orange',
  green: 'bg-g-green',
  red: 'bg-g-red',
}

export const TONE_HEX: Record<Tone, string> = {
  purple: '#7C5CFF',
  pink: '#F062C0',
  orange: '#FFB24C',
  green: '#17A673',
  red: '#E5484D',
}
