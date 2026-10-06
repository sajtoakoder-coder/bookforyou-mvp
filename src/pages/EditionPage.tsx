import type { JSX } from 'react'
import HeroObject from '../components/HeroObject'
import EditorialSection from '../components/EditorialSection'
import ObjectDetails from '../components/ObjectDetails'
import AvailabilityNotice from '../components/AvailabilityNotice'
import type { Edition } from '../data/editions'
import styles from './EditionPage.module.css'

export default function EditionPage({ edition }: { edition: Edition }): JSX.Element {
  return (
    <>
      <article className={styles.edition}>
        <div className={styles.intro}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Коллекция / {edition.number}</p>
            <h1>BOOKFORYOU {edition.number}</h1>
            <p className={styles.audience}>{edition.audienceLine}</p>
            <div className={styles.bookMeta}>
              <p>{edition.title}</p>
              <p>{edition.author}</p>
            </div>
            {edition.isCurrent && <div className={styles.availability}><p className={styles.price}>{edition.price}</p><AvailabilityNotice /></div>}
          </div>
          <HeroObject asset={edition.assetPaths.hero} alt={`Комплект BOOKFORYOU ${edition.number}: книга, коробка, конверт и карточка`} priority />
        </div>
      </article>
      <EditorialSection eyebrow="От куратора" title="Почему эта книга здесь">
        <p>{edition.curatorText}</p>
      </EditorialSection>
      <ObjectDetails edition={edition} />
    </>
  )
}
