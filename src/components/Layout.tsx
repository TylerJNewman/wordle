import Head from 'next/head'
import {useState} from 'react'

import Overlay from 'components/Overlay'

export const siteTitle = 'WORDLE'

interface Props {
  children: React.ReactNode
}

const Layout = ({children}: Props) => {
  const [overlayIsOpen, setOverlayIsOpen] = useState(false)
  const openOverlay = () => setOverlayIsOpen(true)
  const closeOverlay = () => setOverlayIsOpen(false)

  const handleOverlayClose = () => {
    closeOverlay()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="flex items-center justify-between w-full text-center max-w-lg h-12 border-b border-gray-300">
        <div className="text-4xl"></div>
        <div className="text-4xl absolute left-0 right-0 -z-10 font-bold tracking-widest">
          {siteTitle}
        </div>

        <img src="/info.svg" alt="info icon" onClick={openOverlay} />
      </nav>
      {children}
      <Overlay onClose={handleOverlayClose} isOpen={overlayIsOpen} />
    </div>
  )
}

export default Layout
