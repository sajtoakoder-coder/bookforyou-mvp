import { Link } from 'react-router-dom'
import type { Edition } from '../data/editions'
import HeroObject from './HeroObject'
import styles from './FirstEdition.module.css'

export default function FirstEdition({ edition }: { edition: Edition }) {
  return (
    <section id="first-edition" className={styles.section} aria-label="Первый выпуск">
      <div className={styles.copy} data-reveal="">
        <p className={styles.label}>Первый выпуск · BOOKFORYOU {edition.number}</p>
        <p className={styles.author}>{edition.author}</p>
        <h2>«{edition.title}»</h2>
        <p className={styles.description}>Одна книга. Три вопроса.<br />И свой путь по её страницам.</p>
        <div className={styles.offer}>
          <p className={styles.price}>{edition.price}</p>
          <Link className={styles.button} to={`/edition/${edition.slug}`}>Рассмотреть выпуск {edition.number} <span aria-hidden="true">↗</span></Link>
          <p className={styles.availability}>Скоро будет доступно</p>
        </div>
      </div>
      <div className={styles.photo}><HeroObject asset={edition.assetPaths.book} alt={`Книга BOOKFORYOU ${edition.number} в тканевом переплёте`} /></div>
    </section>
  )
}
