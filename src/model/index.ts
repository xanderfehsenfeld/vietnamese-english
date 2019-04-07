export interface Definition {
  example: string
  definition: string
}

export interface Dictionary {
  [key: string]: Definition[]
}
