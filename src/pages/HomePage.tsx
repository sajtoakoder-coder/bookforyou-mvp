import { useRef, useState, type JSX, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import ArrowIcon from '../components/ArrowIcon'
import HeroObject from '../components/HeroObject'
import PreorderDialog from '../components/PreorderDialog'
import { getEditionBySlug } from '../data/editions'
import { unconfiguredReceiver } from '../features/preorder/unconfiguredReceiver'
import styles from './HomePage.module.css'

const ritual = [
  'Задайте себе три вопроса. Они останутся только у вас.',
  'Откройте запечатанный конверт. Внутри три координаты: страница, строка, абзац.',
  'Найдите эти места в книге и прочитайте.',
]

export default function HomePage(): JSX.Element {
  const edition = getEditionBySlug('001')!
  const [formOpen, setFormOpen] = useState(false)
  const opener = useRef<HTMLElement>(null)
  function openForm(event: MouseEvent<HTMLButtonElement>) { opener.current = event.currentTarget; setFormOpen(true) }

  return <>
    <section id="release" className={styles.release} aria-labelledby="home-heading">
      <div className={styles.releaseCopy}>
        <p className={styles.brand}>BOOKFORYOU</p>
        <p className={styles.kicker}>Книжный подарок для себя и близких</p>
        <h1 id="home-heading">Книга.<br />Для тебя.</h1>
        <p className={styles.lead}>Помните, как загадывают вопрос и открывают книгу наугад? Мы убрали «наугад».</p>
        <p className={styles.detail}>Внутри книга под ваше состояние сегодня и запечатанный конверт: три места в тексте, выбранные вручную для этого экземпляра.</p>
        <details className={styles.audience}><summary>{edition.audiencePrompt}<span aria-hidden="true">⌄</span></summary><p>Это выпуск о собственном пути — для момента, когда хочется услышать себя яснее.</p></details>
        <p className={styles.meta}>{edition.number} · {edition.author}, «{edition.title}» · {edition.run}</p>
        <button className={styles.primaryButton} type="button" onClick={openForm}>Заказать · {edition.price}<ArrowIcon /></button>
      </div>
      <div className={styles.releasePhoto}><HeroObject asset={edition.assetPaths.hero} alt="Комплект BOOKFORYOU: книга и два конверта" priority /></div>
    </section>

    <section id="ritual" className={styles.ritual} aria-labelledby="ritual-heading">
      <div className={styles.ritualPhoto}><HeroObject asset={edition.assetPaths.coordinatesCard} alt="Карточка BOOKFORYOU с тремя вопросами" /></div>
      <div className={styles.ritualCopy}>
        <p className={styles.kicker}>Внутри: книга, текстильный конверт, запечатанный конверт с координатами.</p>
        <h2 id="ritual-heading">Три вопроса.<br />Одна книга.</h2>
        <ol>{ritual.map((step, index) => <li key={step}><span>0{index + 1}</span><p>{step}</p></li>)}</ol>
        <p className={styles.note}>Координаты я выбираю сама для каждого экземпляра. Двух одинаковых конвертов нет.</p>
        <div className={styles.how}><h3>Как открыть</h3><p><b>01.</b> Задайте вопрос. Себе, тихо.</p><p><b>02.</b> Вскройте конверт.</p><p><b>03.</b> Откройте книгу на указанной странице и прочитайте.</p></div>
      </div>
    </section>

    <section id="curator-close" className={styles.close} aria-labelledby="curator-heading">
      <div className={styles.curatorPhoto}><HeroObject asset={edition.assetPaths.textileEnvelope} alt="Текстильный конверт BOOKFORYOU" /></div>
      <div className={styles.closeCopy}>
        <p className={styles.kicker}>Кто выбирает</p>
        <h2 id="curator-heading">Рита Ленских</h2>
        <blockquote>«Я много лет занималась кастингом в кино: искала человека для истории. Теперь я ищу историю для человека».</blockquote>
        <p className={styles.closingLine}>Иногда книга знает больше чем мы сами</p>
        <button className={styles.secondaryButton} type="button" onClick={openForm}>Выбрать выпуск №001<ArrowIcon /></button>
        <div className={styles.links}><span>Telegram</span><Link to="/legal/requisites">Реквизиты ИП</Link><Link to="/legal/terms">Оферта</Link><Link to="/legal/privacy">Политика данных</Link></div>
      </div>
    </section>
    <PreorderDialog open={formOpen} opener={opener.current} onClose={() => setFormOpen(false)} receiver={unconfiguredReceiver} />
  </>
}
