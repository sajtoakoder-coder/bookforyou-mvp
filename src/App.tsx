import type { JSX } from 'react'

export default function App(): JSX.Element {
  return (
    <>
      <header aria-label="Шапка сайта">
        <span>BOOKFORYOU</span>
      </header>
      <main id="main-content">
        <h1>BOOKFORYOU</h1>
      </main>
      <footer aria-label="Подвал сайта">
        <span>BOOKFORYOU</span>
      </footer>
    </>
  )
}
