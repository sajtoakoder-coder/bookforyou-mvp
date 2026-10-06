import type { JSX } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import { collection, getEditionBySlug } from './data/editions'
import { legalPages } from './data/legalPages'

function NotFound(): JSX.Element {
  return <h1>Страница не найдена</h1>
}

function HomeRoute(): JSX.Element {
  return <h1>BOOKFORYOU</h1>
}

function EditionRoute(): JSX.Element {
  const { slug = '' } = useParams()
  const edition = getEditionBySlug(slug)

  if (!edition) return <NotFound />

  return (
    <article>
      <h1>BOOKFORYOU {edition.number}</h1>
      <p>{edition.title}</p>
      <p>{edition.author}</p>
      <p>{edition.price}</p>
    </article>
  )
}

function CollectionRoute(): JSX.Element {
  return (
    <section aria-labelledby="collection-heading">
      <h1 id="collection-heading">Коллекция</h1>
      {collection.map((edition) => (
        <article key={edition.slug}>
          <h2>BOOKFORYOU {edition.number}</h2>
          <p>{edition.title}</p>
        </article>
      ))}
    </section>
  )
}

function LegalRoute(): JSX.Element {
  const { slug = '' } = useParams()
  const page = legalPages.find((item) => item.slug === slug)

  if (!page) return <NotFound />

  return (
    <article>
      <h1>{page.title}</h1>
      <p>{page.notice}</p>
    </article>
  )
}

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <header aria-label="Шапка сайта">
        <span>BOOKFORYOU</span>
      </header>
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/edition/:slug" element={<EditionRoute />} />
          <Route path="/collection" element={<CollectionRoute />} />
          <Route path="/legal/:slug" element={<LegalRoute />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer aria-label="Подвал сайта">
        <span>BOOKFORYOU</span>
      </footer>
    </BrowserRouter>
  )
}
