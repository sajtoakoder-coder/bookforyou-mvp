import type { JSX } from 'react'
import EditionCard from '../components/EditionCard'
import { collection } from '../data/editions'
import styles from './CollectionPage.module.css'

export default function CollectionPage(): JSX.Element {
  const currentRelease = collection.find((edition) => edition.isCurrent)
  const upcomingReleases = collection.filter((edition) => !edition.isCurrent)
  return (
    <section className={styles.collection} aria-labelledby="collection-heading">
      <div className={styles.intro}>
        <p className={styles.eyebrow}>Серия BOOKFORYOU</p>
        <h1 id="collection-heading">Коллекция</h1>
        <p>Каждый выпуск — отдельная история и физический объект. Серия начинается с №001.</p>
      </div>
      <div className={styles.list}>
        {currentRelease && <EditionCard edition={currentRelease} />}
        <div className={styles.upcoming}>
          <p className={styles.eyebrow}>Дальше в коллекции</p>
          {upcomingReleases.map((edition) => <EditionCard key={edition.slug} edition={edition} />)}
        </div>
      </div>
    </section>
  )
}
