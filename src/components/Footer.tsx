import type { JSX } from 'react'
import { Link } from 'react-router-dom'
import { legalPages } from '../data/legalPages'
import styles from './Footer.module.css'

export default function Footer(): JSX.Element {
  return (
    <footer className={styles.footer} aria-label="Подвал сайта">
      <span className={styles.wordmark}>BOOKFORYOU</span>
      <nav className={styles.links} aria-label="Юридическая информация">
        {legalPages.map(({ slug, title }) => (
          <Link key={slug} to={`/legal/${slug}`}>{title}</Link>
        ))}
      </nav>
    </footer>
  )
}
