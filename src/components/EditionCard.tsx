import type { JSX } from 'react'
import { Link } from 'react-router-dom'
import HeroObject from './HeroObject'
import type { Edition } from '../data/editions'
import styles from './EditionCard.module.css'

export default function EditionCard({ edition }: { edition: Edition }): JSX.Element {
  return (
    <article className={`${styles.card} ${edition.isCurrent ? styles.current : ''}`}>
      <div className={styles.visual}>
        {edition.isCurrent
          ? <HeroObject asset={edition.assetPaths.hero} alt={`Комплект BOOKFORYOU ${edition.number}`} />
          : <span aria-hidden="true">{edition.number}</span>}
      </div>
      <div className={styles.copy}>
        <p className={styles.status}>{edition.isCurrent ? 'Текущий выпуск' : 'Будущий выпуск'}</p>
        <h2>BOOKFORYOU {edition.number}</h2>
        <p>{edition.title}</p>
        <p className={styles.audience}>{edition.audienceLine}</p>
        {edition.isCurrent && <Link to={`/edition/${edition.slug}`}>Узнать о выпуске <span aria-hidden="true">↗</span></Link>}
      </div>
    </article>
  )
}
