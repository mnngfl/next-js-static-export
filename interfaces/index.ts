export type Product = {
  id: number
  brand: string
  category: string
  description: string
  thumbnail: string
  title: string
  price: number
}

export type Products = {
  products: Product[]
  limit: number
  skip: number
  total: number
}

export type ResponseError = {
  message: string
}
