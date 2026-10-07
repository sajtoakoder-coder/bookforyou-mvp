import type { JSX } from 'react'
import { Link } from 'react-router-dom'
import HeroObject from '../components/HeroObject'
import KitExplorer from '../components/KitExplorer'
import AvailabilityNotice from '../components/AvailabilityNotice'
import type { Edition } from '../data/editions'
import styles from './EditionPage.module.css'

export default function EditionPage({ edition }: { edition: Edition }): JSX.Element {
  return (
    <>
      <article className={styles.edition} aria-labelledby="edition-title">
        <div className={styles.cover}>
          <HeroObject asset={edition.assetPaths.book} alt={`Книга BOOKFORYOU ${edition.number}`} priority />
        </div>
        <div className={styles.copy}>
          <Link className={styles.back} to="/collection">Вернуться к коллекции</Link>
          <div className={styles.heading}>
            <p className={styles.eyebrow}>BOOKFORYOU {edition.number}</p>
            <p className={styles.author}>{edition.author}</p>
            <h1 id="edition-title">{edition.title}</h1>
            <p className={styles.audience}>{edition.audienceLine}</p>
          </div>
          <div className={styles.availability}>
            <p className={styles.price}>{edition.price}</p>
            {edition.isCurrent && <AvailabilityNotice />}
            <Link className={styles.detailsLink} to="#inside">Рассмотреть комплект <span aria-hidden="true">↓</span></Link>
          </div>
        </div>
      </article>
      <section className={styles.curatorNote} aria-labelledby="edition-note-heading">
        <div><p className={styles.eyebrow}>От куратора</p><h2 id="edition-note-heading">Почему эта книга здесь</h2></div>
        <p>{edition.curatorText}</p>
      </section>
      <KitExplorer edition={edition} />
    </>
  )
}
