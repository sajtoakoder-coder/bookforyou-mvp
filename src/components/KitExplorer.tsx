import { useEffect, useState } from 'react'
import type { Edition } from '../data/editions'
import HeroObject from './HeroObject'
import styles from './KitExplorer.module.css'

export default function KitExplorer({ edition }: { edition: Edition }) {
  const parts = [
    { name: 'КНИГА', title: 'История, к которой возвращаются.', description: `«${edition.title}», ${edition.author}. Физический переплёт, бумага и время для чтения.`, asset: edition.assetPaths.book, alt: 'Книга BOOKFORYOU' },
    { name: 'ТЕКСТИЛЬНЫЙ КОНВЕРТ', title: 'Вещь, которая остаётся.', description: 'Текстильный конверт для книги. Его можно сохранить вместе с выпуском и использовать снова.', asset: edition.assetPaths.textileEnvelope, alt: 'Текстильный конверт для книги BOOKFORYOU' },
    { name: 'ЗАПЕЧАТАННЫЙ КОНВЕРТ', title: 'То, что открывают не сразу.', description: 'Отдельный бумажный конверт — личный элемент выпуска. Открыть, прочитать и оставить рядом с книгой.', asset: edition.assetPaths.envelope, alt: 'Запечатанный конверт BOOKFORYOU' },
    { name: 'КАРТОЧКА С КООРДИНАТАМИ', title: 'Свой маршрут по тексту.', description: 'Страница. Строка. Абзац. Координаты приглашают к интеллектуальной игре с литературой — без предсказаний и готовых ответов.', asset: edition.assetPaths.coordinatesCard, alt: 'Карточка с координатами BOOKFORYOU' },
  ]
  const [selected, setSelected] = useState(0)
  const [displayed, setDisplayed] = useState(0)
  const [ready, setReady] = useState<number[]>([])
  useEffect(() => {
    if (selected !== displayed && ready.includes(selected)) setDisplayed(selected)
  }, [selected, displayed, ready])
  const part = parts[displayed]
  return (
    <section id="inside" className={styles.section} aria-labelledby="object-details-heading">
      <div className={styles.opening}>
        <div className={styles.intro} data-reveal=""><p>Что внутри</p><h2 id="object-details-heading">Что придёт<br /> к вам</h2><p>Не только книга.<br />Четыре части одного выпуска —<br />и личный маршрут по тексту.</p></div>
        <div className={styles.overview}><HeroObject asset={edition.assetPaths.hero} alt="Полный комплект BOOKFORYOU: книга, текстильный и бумажный конверты, карточка" /></div>
      </div>
      <div className={styles.detailIntro}><p>Каждый предмет — часть истории.</p><p>Выберите деталь, чтобы рассмотреть её.</p></div>
      <div className={styles.spread} data-reveal="">
        <div className={styles.preview} id="kit-preview" role="region" aria-label="Деталь комплекта" aria-live="polite" aria-busy={selected !== displayed}>
          <div className={styles.visual}>
            {parts.map((item, index) => <div key={item.name} className={styles.photoLayer} data-part={index} data-active={displayed === index} aria-hidden={displayed !== index}>
              <HeroObject asset={item.asset} alt={item.alt} onReady={() => setReady(loaded => loaded.includes(index) ? loaded : [...loaded, index])} />
            </div>)}
          </div>
          <div className={styles.caption}><span>{String(displayed + 1).padStart(2, '0')} / 04</span><p>{part.title}</p></div>
        </div>
        <div className={styles.choices}>
          {parts.map((item, index) => <article key={item.name} className={selected === index ? styles.active : ''}>
            <h3><button type="button" aria-label={`${String(index + 1).padStart(2, '0')} ${item.name}`} aria-pressed={selected === index} aria-controls="kit-preview" onClick={() => setSelected(index)}><span className={styles.number}>{String(index + 1).padStart(2, '0')}</span><span>{item.name}</span><span aria-hidden="true">{selected === index ? '−' : '+'}</span></button></h3>
            <p>{item.description}</p>
          </article>)}
        </div>
      </div>
    </section>
  )
}
