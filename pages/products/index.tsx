import Header from '@/components/Header'
import type { Products } from '@/interfaces'
import Image from 'next/image'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

const Products = () => {
  const router = useRouter()
  const { data, error, isLoading } = useSWR<Products>(
    'https://dummyjson.com/products/?limit=5',
    fetcher
  )

  if (error) {
    return (
      <>
        <Header />
        <div className="content">Failed to load</div>
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

  const handleProductClick = (id: number) => {
    router.push(`/products/detail?id=${id}`)
  }

  return (
    <>
      <Header />
      <div className="content">
        <h1>Product List</h1>
        <div className="card-container">
          {data.products.map(product => (
            <div
              key={product.id}
              className="card"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="img-container">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="txt-container">
                <p className="title">{product.title}</p>
                <p>{product.description}</p>
                <p>${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Products
