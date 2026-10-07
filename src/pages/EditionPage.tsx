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
          <div className={styles.numberRail}><span className={styles.number}>{edition.number.replace('№', '')}</span><p>BOOKFORYOU<br />Коллекционный выпуск</p></div>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>BOOKFORYOU {edition.number}</p>
            <h1>{edition.title}</h1>
            <p className={styles.author}>{edition.author}</p>
            <p className={styles.audience}>{edition.audienceLine}</p>
            <div className={styles.cover}>
              <HeroObject asset={edition.assetPaths.book} alt={`Книга BOOKFORYOU ${edition.number}`} priority />
            </div>
            {edition.isCurrent && <div className={styles.availability}><p>ВЫПУСК {edition.number} — {edition.price}</p><AvailabilityNotice /></div>}
          </div>
          <p className={styles.edgePrice}>{edition.price}</p>
        </div>
      </article>
      <EditorialSection eyebrow="От куратора" title="Почему эта книга здесь">
        <p>{edition.curatorText}</p>
      </EditorialSection>
      <section className={styles.objectField} aria-label={`Объект ${edition.number}`}>
        <p>Одна история. Четыре предмета.</p>
        <HeroObject asset={edition.assetPaths.hero} alt={`Комплект BOOKFORYOU ${edition.number}: книга, текстильный конверт, бумажный конверт и карточка`} />
        <span>BOOKFORYOU / {edition.number}</span>
      </section>
      <ObjectDetails edition={edition} />
    </>
  )
}
