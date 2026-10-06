import type { JSX, ReactNode } from 'react'
import styles from './EditorialSection.module.css'

interface EditorialSectionProps {
  id?: string
  eyebrow?: string
  title: string
  children: ReactNode
  dark?: boolean
}

export default function EditorialSection({ id, eyebrow, title, children, dark = false }: EditorialSectionProps): JSX.Element {
  return (
    <section id={id} className={`${styles.section} ${dark ? styles.dark : ''}`} aria-label={title}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          <h2>{title}</h2>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </section>
  )
}
