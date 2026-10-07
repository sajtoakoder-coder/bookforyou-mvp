import styles from './ArrowIcon.module.css'

export default function ArrowIcon({ direction = 'up-right' }: { direction?: 'up-right' | 'down' }) {
  return <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d={direction === 'down' ? 'M12 4v16m-6-6 6 6 6-6' : 'M5 19 19 5M5 5h14v14'} />
  </svg>
}
