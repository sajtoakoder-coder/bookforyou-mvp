import type { JSX } from 'react'
import EditionCard from '../components/EditionCard'
import { collection } from '../data/editions'
import styles from './CollectionPage.module.css'

export default function CollectionPage(): JSX.Element {
  return (
    <section className={styles.collection} aria-labelledby="collection-heading">
      <div className={styles.intro}>
        <p className={styles.eyebrow}>Серия BOOKFORYOU</p>
        <h1 id="collection-heading">Коллекция</h1>
        <p>Каждый выпуск — отдельная история и физический объект. Серия начинается с №001.</p>
      </div>
      <div className={styles.list}>
        {collection.map((edition) => <EditionCard key={edition.slug} edition={edition} />)}
      </div>
    </section>
  )
}
