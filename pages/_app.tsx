import '@/styles/reset.css'
import '@/styles/global.scss'

import type { AppProps } from 'next/app'
import Layout from '@/layouts/layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
