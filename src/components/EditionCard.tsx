import type { JSX } from 'react'
import { Link } from 'react-router-dom'
import HeroObject from './HeroObject'
import ArrowIcon from './ArrowIcon'
import AvailabilityNotice from './AvailabilityNotice'
import type { Edition } from '../data/editions'
import styles from './EditionCard.module.css'

export default function EditionCard({ edition }: { edition: Edition }): JSX.Element {
  const headingId = `edition-${edition.slug}-heading`
  if (!edition.isCurrent) {
    return (
      <article className={styles.row} aria-labelledby={headingId}>
        <h2 id={headingId}><span>BOOKFORYOU</span> {edition.number}</h2>
        <p className={styles.rowTitle}>{edition.title}</p>
        <p className={styles.status}>Будущий выпуск</p>
        <p className={styles.rowPrice}>{edition.price}</p>
      </article>
    )
  }
  return (
    <article className={styles.current} aria-labelledby={headingId}>
      <div className={styles.copy}>
        <p className={styles.status}>Текущий выпуск</p>
        <h2 id={headingId}>BOOKFORYOU {edition.number}</h2>
        <p className={styles.author}>{edition.author}</p>
        <p className={styles.title}>{edition.title}</p>
        <p className={styles.price}>{edition.price}</p>
        <AvailabilityNotice />
        <Link to={`/edition/${edition.slug}`}>Узнать о выпуске <ArrowIcon /></Link>
      </div>
      <div className={styles.visual}>
        <HeroObject asset={edition.assetPaths.hero} alt={`Комплект BOOKFORYOU ${edition.number}`} />
      </div>
    </article>
  )
}
