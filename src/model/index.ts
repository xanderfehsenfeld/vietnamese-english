export interface Definition {
  example: string
  definition: string
}

export interface Dictionary {
  [key: string]: Definition[]
}

export interface Translation {
  vietnamese: string
  english: string
}
