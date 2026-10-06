import type { JSX } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import { getEditionBySlug } from './data/editions'
import { legalPages } from './data/legalPages'
import Header from './components/Header'
import Footer from './components/Footer'
import RouteEffects from './components/RouteEffects'
import HomePage from './pages/HomePage'
import EditionPage from './pages/EditionPage'
import CollectionPage from './pages/CollectionPage'
import LegalPlaceholderPage from './pages/LegalPlaceholderPage'

function NotFound(): JSX.Element {
  return <h1>Страница не найдена</h1>
}

function EditionRoute(): JSX.Element {
  const { slug = '' } = useParams()
  const edition = getEditionBySlug(slug)

  if (!edition) return <NotFound />

  return <EditionPage edition={edition} />
}

function LegalRoute(): JSX.Element {
  const { slug = '' } = useParams()
  const page = legalPages.find((item) => item.slug === slug)

  if (!page) return <NotFound />

  return <LegalPlaceholderPage page={page} />
}

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <RouteEffects />
      <Header />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/edition/:slug" element={<EditionRoute />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/legal/:slug" element={<LegalRoute />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
