import '@/styles/globals.css'
import App from '@/App.jsx'
import DefaultLayout from '@/layouts/DefaultLayout'

export default function MyApp({ Component, pageProps }) {
  return (
    <App>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </App>
  )
}
