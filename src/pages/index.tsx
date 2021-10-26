import Head from 'next/head'
import Header from '../components/Header'
import SearchTable from '../components/SearchTable'

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>MyFitnessBuddy</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Seu parceiro fitness!" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="Portuguese" />
        <meta name="author" content="MyFitnessBuddy" />
      </Head>
      <body>
        <Header />
        <SearchTable />
      </body>
    </div>
  )
}

export default Home
