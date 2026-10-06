import { useEffect, useId, useRef, useState, type JSX } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import styles from './Header.module.css'

const links = [
  { to: '/collection', label: 'COLLECTION' },
  { to: '/edition/001', label: 'STORY' },
  { to: '/#gift', label: 'GIFT' },
] as const

export default function Header(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { pathname, hash } = useLocation()
  const locationId = `${pathname}${hash}`
  const previousLocation = useRef(locationId)

  useEffect(() => {
    if (previousLocation.current === locationId) return
    previousLocation.current = locationId
    if (menuOpen) {
      setMenuOpen(false)
    }
  }, [locationId, menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    function onEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onEscape)
    return () => document.removeEventListener('keydown', onEscape)
  }, [menuOpen])

  return (
    <header className={styles.header} aria-label="Шапка сайта">
      <Link className={styles.wordmark} to="/" aria-label="BOOKFORYOU — главная">BOOKFORYOU</Link>
      <nav className={styles.desktopNav} aria-label="Разделы сайта">
        {links.map(({ to, label }) => <NavLink className={styles.link} key={to} to={to}>{label}</NavLink>)}
      </nav>
      <div className={styles.release} aria-label="Выпуск №001, цена 4 900 рублей">№001 · 4 900 ₽</div>
      <span className={styles.mobileRelease} aria-label="Выпуск №001">№001</span>
      <button
        ref={buttonRef}
        className={styles.menuButton}
        type="button"
        aria-label="Меню"
        aria-controls={menuId}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className={styles.menuLine} aria-hidden="true" />
        <span className={styles.menuLine} aria-hidden="true" />
      </button>
      <nav id={menuId} className={styles.mobileNav} aria-label="Основная навигация" hidden={!menuOpen}>
        {links.map(({ to, label }) => <NavLink className={styles.mobileLink} key={to} to={to}>{label}</NavLink>)}
      </nav>
    </header>
  )
}
