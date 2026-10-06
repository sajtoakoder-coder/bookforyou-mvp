import { useEffect, useId, useRef, useState, type JSX } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import styles from './Header.module.css'

const links = [
  { to: '/edition/001', label: 'Выпуск №001' },
  { to: '/collection', label: 'Коллекция' },
] as const

export default function Header(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { pathname } = useLocation()

  useEffect(() => setMenuOpen(false), [pathname])

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
