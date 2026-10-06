import type { JSX } from 'react'
import styles from './AvailabilityNotice.module.css'

export default function AvailabilityNotice(): JSX.Element {
  return <button className={styles.notice} type="button" aria-disabled="true">Скоро будет доступно</button>
}
