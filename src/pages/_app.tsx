import 'tailwindcss/tailwind.css'
import '../global.css'
import '../styles/404-styles.css'
import '../styles/404-ballflight.css'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	return <Component {...pageProps} />
}

export default MyApp
