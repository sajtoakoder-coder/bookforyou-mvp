import type { JSX } from 'react'
import type { Edition, AssetSource } from '../data/editions'
import HeroObject from './HeroObject'
import styles from './ObjectDetails.module.css'

interface ObjectDetailsProps { edition: Edition }

interface Detail { label: string; alt: string; asset: AssetSource; description: string }

export default function ObjectDetails({ edition }: ObjectDetailsProps): JSX.Element {
  const details: Detail[] = [
    { label: 'КНИГА', alt: 'Книга BOOKFORYOU', asset: edition.assetPaths.book, description: 'Главный предмет выпуска — книга в физическом переплёте.' },
    { label: 'КОРОБКА', alt: 'Коробка комплекта BOOKFORYOU', asset: edition.assetPaths.box, description: 'Комплект хранится как единый коллекционный объект.' },
    { label: 'ЗАПЕЧАТАННЫЙ КОНВЕРТ', alt: 'Запечатанный конверт BOOKFORYOU', asset: edition.assetPaths.envelope, description: 'Личный элемент, который раскрывает историю постепенно.' },
    { label: 'КАРТОЧКА С КООРДИНАТАМИ', alt: 'Карточка с координатами BOOKFORYOU', asset: edition.assetPaths.coordinatesCard, description: 'Координаты предлагают интеллектуальную игру с литературой.' },
  ]

  return (
    <section className={styles.section} aria-labelledby="object-details-heading">
      <div className={styles.intro}>
        <p className={styles.eyebrow}>Физический объект</p>
        <h2 id="object-details-heading">Четыре части одной истории</h2>
      </div>
      <div className={styles.grid}>
        {details.map(({ label, alt, asset, description }, index) => (
          <article className={styles.detail} key={label}>
            <HeroObject asset={asset} alt={alt} />
            <div className={styles.caption}>
              <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
              <div><h3>{label}</h3><p>{description}</p></div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
