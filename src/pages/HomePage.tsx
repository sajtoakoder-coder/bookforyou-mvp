import type { JSX } from 'react'
import { Link } from 'react-router-dom'
import HeroObject from '../components/HeroObject'
import EditorialSection from '../components/EditorialSection'
import ObjectDetails from '../components/ObjectDetails'
import { getEditionBySlug } from '../data/editions'
import styles from './HomePage.module.css'

export default function HomePage(): JSX.Element {
  const edition = getEditionBySlug('001')!

  return (
    <>
      <section className={styles.hero} aria-labelledby="home-heading">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Первый выпуск · {edition.number}</p>
            <h1 id="home-heading"><span className={styles.brand}>BOOKFORYOU</span>Эта книга для того, кто…</h1>
            <p className={styles.heroLine}>…ждёт историю, которая окажется рядом в нужный момент.</p>
            <Link className={styles.heroLink} to={`/edition/${edition.slug}`}>О выпуске {edition.number} <span aria-hidden="true">↗</span></Link>
          </div>
          <div className={styles.heroVisual}>
            <HeroObject asset={edition.assetPaths.hero} alt="Комплект BOOKFORYOU: книга, коробка, конверт и карточка с координатами" priority ambient />
          </div>
        </div>
        <p className={styles.heroFootnote}>Книга как личный коллекционный объект</p>
      </section>

      <EditorialSection eyebrow="Редакционный выбор" title="Почему эта книга здесь">
        <p>Каждый выпуск BOOKFORYOU начинается с вопроса о человеке, для которого может оказаться важна история.</p>
        <p>{edition.curatorText}</p>
      </EditorialSection>

      <ObjectDetails edition={edition} />

      <EditorialSection eyebrow="Для близкого человека" title="BOOKFORYOU для другого" dark>
        <p className={styles.giftStatement}>Иногда книгу легче подарить, чем сказать.</p>
        <p>Книга, запечатанный конверт и координаты складываются в личное послание — без готовых объяснений за вас.</p>
      </EditorialSection>

      <section className={styles.curator} aria-labelledby="curator-heading">
        <div className={styles.curatorInner} data-reveal="">
          <p className={styles.curatorEyebrow}>Куратор</p>
          <div>
            <h2 id="curator-heading">Кто выбирает книги</h2>
            <p className={styles.curatorName}>Рита Ленских</p>
          </div>
          <blockquote>Я много лет занималась кастингом в кино — искала человека для истории. BOOKFORYOU в каком-то смысле продолжает эту работу. Только теперь я ищу историю для человека.</blockquote>
        </div>
      </section>
    </>
  )
}
