import Header from '@/components/Header'
import type { Product, ResponseError } from '@/interfaces'
import Image from 'next/image'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data.message)
  }
  return data
}

const Product = () => {
  const { query } = useRouter()

  const { data, error, isLoading, isValidating } = useSWR<Product, ResponseError>(
    () => (query.id ? `https://dummyjson.com/products/${query.id}` : null),
    fetcher
  )

  if (error) {
    return (
      <>
        <Header />
        <div className="content">{error.message}</div>
      </>
    )
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="content">Loading...</div>
      </>
    )
  }

  if (!data) {
    return (
      <>
        <Header />
        <div className="content">{"Data doesn't exist!"}</div>
      </>
    )
  }

  return (
    <>
      <Header />
      {isValidating ? (
        'Validating...'
      ) : (
        <div className="content">
          <div className="img-container">
            <Image
              src={data.thumbnail}
              alt={data.title}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h1>{data.title}</h1>
          <h2>{data.description}</h2>
          <h3>${data.price}</h3>
          <dl>
            <dt>Category</dt>
            <dd>{data.category}</dd>
            <dt>Brand</dt>
            <dd>{data.brand}</dd>
          </dl>
        </div>
      )}
    </>
  )
}

export default Product
