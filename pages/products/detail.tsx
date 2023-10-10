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
  const router = useRouter()

  const { data, error, isLoading, isValidating } = useSWR<Product, ResponseError>(
    () => (router.query.id ? `https://dummyjson.com/products/${router.query.id}` : null),
    fetcher
  )

  if (error) {
    return <p>{error.message}</p>
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!data) {
    return <p>{"Data doesn't exist!"}</p>
  }

  const handleBackButton = () => {
    router.push('/products')
  }

  return (
    <>
      {isValidating ? (
        <p>Validating...</p>
      ) : (
        <>
          <h3>
            <span onClick={() => handleBackButton()}>⬅ Go Back</span>
          </h3>
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
        </>
      )}
    </>
  )
}

export default Product
