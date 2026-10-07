import { Link } from 'react-router-dom'
import type { Edition } from '../data/editions'
import HeroObject from './HeroObject'
import ArrowIcon from './ArrowIcon'
import styles from './ReadingJourney.module.css'

export function QuestionInvitation({ edition }: { edition: Edition }) {
  return (
    <section id="begin" className={styles.invitation} aria-labelledby="begin-heading">
      <div className={styles.invitationCopy} data-reveal="">
        <h2 id="begin-heading">Начни книгу<br /> с вопроса.</h2>
        <p>Иногда книга знает больше,<br />чем мы сами.</p>
        <Link to="/#questions" className={styles.link}>Что за вопрос? <ArrowIcon direction="down" /></Link>
      </div>
      <div className={styles.envelopePhoto}><HeroObject asset={edition.assetPaths.envelope} alt="Бумажный конверт с надписью «Начни книгу с вопроса»" /></div>
    </section>
  )
}

export function ThreeQuestions({ edition }: { edition: Edition }) {
  return (
    <section id="questions" className={styles.questions} aria-labelledby="questions-heading">
      <div className={styles.questionsCopy} data-reveal="">
        <h2 id="questions-heading">Три вопроса.<br /> Одна книга.</h2>
        <p>Вы задаёте три вопроса себе. Внутри — три координаты: откройте книгу и прочитайте то, что оказалось в этой точке.</p>
        <p className={styles.coordinateKey}>Страница. Строка. Абзац.</p>
        <p className={styles.note}>Не предсказание и не готовый ответ. Личный разговор с текстом.</p>
      </div>
      <div className={styles.cardPhoto}><HeroObject asset={edition.assetPaths.coordinatesCard} alt="Карточка BOOKFORYOU с тремя строками для ваших вопросов" /></div>
    </section>
  )
}

const readingSteps = [
  { title: 'Задайте вопрос.', text: 'Запишите то, что для вас важно сейчас. Вопрос остаётся только у вас.' },
  { title: 'Найдите координату.', text: 'Для каждого вопроса внутри есть своя точка в книге: страница, строка или абзац.' },
  { title: 'Откройте книгу.', text: 'Прочитайте то, что оказалось в этой точке. Не торопитесь листать дальше.' },
  { title: 'Почувствуйте отклик.', text: 'Не готовый совет, а текст, который может вступить в диалог с вами.' },
]

export function ReadingSteps() {
  return (
    <section id="how-it-works" className={styles.process} aria-labelledby="process-heading">
      <div className={styles.processIntro} data-reveal="">
        <h2 id="process-heading">Как это работает</h2>
        <p className={styles.processLead}>Ваш вопрос.<br />Встреча с текстом.<br />То, что откликнется.</p>
      </div>
      <ol className={styles.steps}>
        {readingSteps.map((step, index) => (
          <li key={step.title}>
            <span className={styles.stepNumber} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <div><h3>{step.title}</h3><p>{step.text}</p></div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function LastingEnvelope({ edition }: { edition: Edition }) {
  return (
    <section id="keepsake" className={styles.keepsake} aria-labelledby="keepsake-heading">
      <div className={styles.keepsakeCopy} data-reveal="">
        <h2 id="keepsake-heading">Не упаковка,<br /> которую выбрасывают.<br /> Вещь, которая остаётся.</h2>
        <p>Книга будет прочитана.<br />А текстильный конверт BOOKFORYOU останется с вами.</p>
        <p className={styles.note}>Для книги, заметок и того,<br />что хочется сохранить.</p>
      </div>
      <div className={styles.keepsakePhoto}><HeroObject asset={edition.assetPaths.textileEnvelope} alt="Текстильный конверт BOOKFORYOU, который можно сохранить и использовать снова" /></div>
    </section>
  )
}
