import type { AppProps } from 'next/app'

import { ThemeProvider } from 'styled-components'
import GlobalStyles from '../styles/global'
import 'antd/dist/antd.css'
import theme from '../styles/theme'
import { ConfigProvider } from 'antd'
import ptBr from 'antd/lib/locale/pt_BR'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <ConfigProvider locale={ptBr}>
        <Component {...pageProps} />
        <GlobalStyles />
      </ConfigProvider>
    </ThemeProvider>
  )
}
export default MyApp
