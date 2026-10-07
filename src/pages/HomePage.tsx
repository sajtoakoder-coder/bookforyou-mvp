import { Link } from 'react-router-dom'
import HeroObject from '../components/HeroObject'
import KitExplorer from '../components/KitExplorer'
import { getEditionBySlug } from '../data/editions'
import styles from './HomePage.module.css'

export default function HomePage() {
  const edition = getEditionBySlug('001')!
  return (
    <>
      <section className={styles.hero} aria-labelledby="home-heading">
        <div className={styles.heroVisual}>
          <HeroObject asset={edition.assetPaths.hero} alt="Комплект BOOKFORYOU: книга, коробка, конверт и карточка с координатами" priority />
        </div>
        <div className={styles.heroCopy}>
          <p className={styles.introduction}>Независимый книжный проект</p>
          <h1 id="home-heading" aria-label="КНИГА ДЛЯ ТЕБЯ">Книга.<br />Для тебя.</h1>
          <p className={styles.description}>Для того, кто ты сегодня.<br />Одна история. И кое-что личное внутри.</p>
          <Link className={styles.button} to="/edition/001">Смотреть выпуск №001 <span aria-hidden="true">↗</span></Link>
          <div className={styles.release}><p>№001 · 4 900 ₽</p><span>СКОРО БУДЕТ ДОСТУПНО</span></div>
        </div>
        <div className={styles.heroFoot}><span>Книга · коробка · конверт · координаты</span><Link to="/#inside">Рассмотреть ближе <span aria-hidden="true">↓</span></Link></div>
      </section>

      <section className={styles.statement} aria-label="Первый выпуск">
        <p>Первый выпуск</p>
        <div data-reveal=""><h2>Не всякую книгу<br />выбирают по названию.</h2><p>Книга приходит не с ответом, а в нужный момент. BOOKFORYOU начинается с человека — с того, что он переживает, ищет и о чём пока не говорит.</p></div>
      </section>

      <KitExplorer edition={edition} />

      <section id="gift" className={styles.gift} aria-label="Книга, которую проще передать, чем объяснить">
        <div className={styles.giftImage}><HeroObject asset={edition.assetPaths.envelope} alt="Бордовый запечатанный конверт BOOKFORYOU" /></div>
        <div className={styles.giftCopy} data-reveal="">
          <p>BOOKFORYOU для другого</p>
          <h2>Книга, которую проще передать, чем объяснить</h2>
          <p className={styles.giftStatement}>Иногда книгу легче подарить, чем сказать.</p>
          <p>Книга и запечатанный конверт — личное послание. Дальше остаются только человек и история.</p>
          <Link className={styles.textLink} to="/edition/001">Посмотреть комплект <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className={styles.curator} aria-labelledby="curator-heading">
        <div><p>Редакционный выбор</p><h2 id="curator-heading">Кто выбирает книги</h2><p className={styles.signature}>Рита Ленских</p></div>
        <div data-reveal=""><blockquote>«Я много лет занималась кастингом в кино — искала человека для истории. BOOKFORYOU в каком-то смысле продолжает эту работу. Только теперь я ищу историю для человека».</blockquote><h3>Почему эта книга здесь</h3><p>У каждого выпуска будет свой авторский текст куратора. Название и история первого выпуска будут объявлены отдельно.</p></div>
      </section>

      <section className={styles.collection} aria-labelledby="home-collection-heading">
        <div data-reveal=""><p>Коллекция BOOKFORYOU</p><h2 id="home-collection-heading">История начинается<br />с первого выпуска.</h2><Link className={styles.button} to="/collection">Смотреть коллекцию <span aria-hidden="true">↗</span></Link></div>
        <div className={styles.issueNumber} aria-hidden="true">001</div>
      </section>
    </>
  )
}
