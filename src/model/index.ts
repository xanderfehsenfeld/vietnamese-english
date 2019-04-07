export interface Entity {
  id: string
}
export type Coupon = Entity & {
  name: string
  isAvailable: boolean
}
export type Partner = Entity & {
  partnerDescription: string
  website: string
  cloudPlatformPartner: boolean
  dt: Date
}
