import Head from 'next/head'

export const siteTitle = 'Wordle'

interface Props {
  children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex items-center justify-center w-full text-center max-w-lg h-12 border-b border-gray-300">
        <div className="text-4xl">{siteTitle}</div>
      </header>
      {children}
    </div>
  )
}

export default Layout
