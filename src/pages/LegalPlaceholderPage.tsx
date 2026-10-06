import type { JSX } from 'react'
import type { LegalPage } from '../data/legalPages'
import styles from './LegalPlaceholderPage.module.css'

interface Props {
  page: LegalPage
}

export default function LegalPlaceholderPage({ page }: Props): JSX.Element {
  return (
    <article className={styles.page}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>Юридическая информация</p>
        <h1 className={page.slug === 'privacy' ? styles.longTitle : undefined}>{page.title}</h1>
        <p className={styles.notice}>{page.notice}</p>
      </div>
    </article>
  )
}
