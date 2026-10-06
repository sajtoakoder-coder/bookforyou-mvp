import type { JSX } from 'react'
import styles from './AvailabilityNotice.module.css'

export default function AvailabilityNotice(): JSX.Element {
  return <p className={styles.notice}>СКОРО БУДЕТ ДОСТУПНО</p>
}
