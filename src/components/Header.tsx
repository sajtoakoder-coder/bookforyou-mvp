import { useEffect, useId, useLayoutEffect, useRef, useState, type JSX } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Header.module.css'

const links = [
  { to: '/collection', label: 'Коллекция' },
  { to: '/edition/001', label: 'Выпуск №001' },
  { to: '/#gift', label: 'В подарок' },
] as const

export default function Header(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const { pathname, hash } = useLocation()
  const locationId = `${pathname}${hash}`
  const previousLocation = useRef(locationId)

  function closeMenu(restoreFocus = true) {
    dialogRef.current?.close()
    setMenuOpen(false)
    if (restoreFocus) buttonRef.current?.focus()
  }

  function openMenu() {
    dialogRef.current?.showModal()
    setMenuOpen(true)
    closeRef.current?.focus()
  }

  useEffect(() => {
    if (previousLocation.current === locationId) return
    previousLocation.current = locationId
    if (menuOpen) {
      closeMenu(false)
    }
  }, [locationId, menuOpen])

  useLayoutEffect(() => {
    if (!menuOpen) return
    const previousOverflow = document.body.style.overflow
    const previousPadding = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const currentPadding = parseFloat(getComputedStyle(document.body).paddingRight) || 0
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${currentPadding + scrollbarWidth}px`
    return () => {
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPadding
    }
  }, [menuOpen])

  return (
    <header className={styles.header} aria-label="Шапка сайта">
      <Link className={styles.wordmark} to="/" aria-label="BOOKFORYOU — главная">BOOKFORYOU</Link>
      <nav className={styles.desktopNav} aria-label="Разделы сайта">
        {links.map(({ to, label }) => <Link className={styles.link} key={to} to={to} aria-current={locationId === to ? 'page' : undefined}>{label}</Link>)}
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
        aria-haspopup="dialog"
        onClick={() => menuOpen ? closeMenu() : openMenu()}
      >
        <span className={styles.menuLine} aria-hidden="true" />
        <span className={styles.menuLine} aria-hidden="true" />
      </button>
      <dialog
        ref={dialogRef}
        id={menuId}
        className={styles.drawer}
        aria-labelledby={`${menuId}-heading`}
        aria-modal="true"
        onCancel={(event) => { event.preventDefault(); closeMenu() }}
        onClose={() => setMenuOpen(false)}
        onKeyDown={(event) => {
          if (event.key !== 'Tab') return
          const controls = event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]')
          const first = controls[0]
          const last = controls[controls.length - 1]
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault()
            last?.focus()
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault()
            first?.focus()
          }
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return
          const box = event.currentTarget.getBoundingClientRect()
          if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) closeMenu()
        }}
      >
        <div className={styles.drawerHead}>
          <h2 id={`${menuId}-heading`}>Навигация</h2>
          <button ref={closeRef} type="button" className={styles.closeButton} aria-label="Закрыть меню" onClick={() => closeMenu()}>
            <span aria-hidden="true" /><span aria-hidden="true" />
          </button>
        </div>
        <nav className={styles.mobileNav} aria-label="Основная навигация">
          {links.map(({ to, label }) => <Link className={styles.mobileLink} key={to} to={to} onClick={() => closeMenu(false)} aria-current={locationId === to ? 'page' : undefined}>{label}</Link>)}
        </nav>
        <div className={styles.drawerFoot}>
          <p>BOOKFORYOU</p>
          <p>Книга для того, кто ты сегодня.</p>
          <div><span>Выпуск №001</span><span>4 900 ₽</span></div>
        </div>
      </dialog>
    </header>
  )
}
