import { useEffect, useRef, useState, type FormEvent, type JSX } from 'react'
import { Link } from 'react-router-dom'
import type { PreorderReceiver } from '../features/preorder/types'
import styles from './PreorderDialog.module.css'

interface PreorderDialogProps { open: boolean; opener: HTMLElement | null; onClose: () => void; receiver: PreorderReceiver }
type Fields = { name: string; telegram: string; phone: string; email: string; consent: boolean }
const initialFields: Fields = { name: '', telegram: '', phone: '', email: '', consent: false }

export default function PreorderDialog({ open, opener, onClose, receiver }: PreorderDialogProps): JSX.Element {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [fields, setFields] = useState<Fields>(initialFields)
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [complete, setComplete] = useState(false)
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      if (typeof dialog.showModal === 'function') dialog.showModal()
      else dialog.setAttribute('open', '')
      closeRef.current?.focus()
    }
    if (!open && dialog.open) {
      if (typeof dialog.close === 'function') dialog.close()
      else dialog.removeAttribute('open')
    }
  }, [open])
  function close() { onClose(); window.setTimeout(() => opener?.focus(), 0) }
  function update(field: keyof Fields, value: string | boolean) { setFields(current => ({ ...current, [field]: value })); if (message) setMessage('') }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!fields.name.trim()) { setMessage('Укажите имя'); return }
    if (!fields.telegram.trim() && !fields.phone.trim()) { setMessage('Укажите Telegram или телефон'); return }
    if (!fields.consent) { setMessage('Подтвердите согласие на обработку данных'); return }
    setSubmitting(true); setMessage('')
    const result = await receiver({ ...fields, name: fields.name.trim(), telegram: fields.telegram.trim(), phone: fields.phone.trim(), email: fields.email.trim(), consent: true })
    setSubmitting(false)
    if (result.ok) { setComplete(true); return }
    setMessage(result.code === 'unconfigured' ? 'Заявки пока не принимаются' : 'Не удалось отправить заявку. Попробуйте ещё раз.')
  }
  return <dialog ref={dialogRef} hidden={!open} className={styles.dialog} aria-labelledby="preorder-heading" onCancel={event => { event.preventDefault(); close() }} onClick={event => { if (event.target === event.currentTarget) close() }}>
    <div className={styles.panel}><button ref={closeRef} className={styles.close} type="button" onClick={close} aria-label="Закрыть форму">×</button>
      {complete ? <div className={styles.success} role="status"><p>BOOKFORYOU №001</p><h2 id="preorder-heading">Заявка принята</h2><p>Мы свяжемся с вами, когда подтвердим выпуск.</p><button type="button" onClick={close}>Закрыть</button></div> : <>
        <p className={styles.kicker}>Выпуск №001 · «Гений»</p><h2 id="preorder-heading">Оставить заявку</h2><p className={styles.intro}>Оплата появится позже. Сейчас оставьте контакт — мы сообщим, когда откроем заказ.</p>
        <form onSubmit={submit} noValidate><label>Имя<input value={fields.name} onChange={event => update('name', event.target.value)} autoComplete="name" /></label><label>Telegram<input value={fields.telegram} onChange={event => update('telegram', event.target.value)} autoComplete="off" placeholder="@username" /></label><label>Телефон<input value={fields.phone} onChange={event => update('phone', event.target.value)} type="tel" autoComplete="tel" /></label><label>E-mail <span>необязательно</span><input value={fields.email} onChange={event => update('email', event.target.value)} type="email" autoComplete="email" /></label><label className={styles.consent}><input checked={fields.consent} onChange={event => update('consent', event.target.checked)} type="checkbox" /> <span>Согласен(-на) с <Link to="/legal/privacy">политикой обработки данных</Link></span></label>{message && <p className={styles.message} role="alert">{message}</p>}<button className={styles.submit} disabled={submitting} type="submit">{submitting ? 'Отправляем…' : 'Оставить заявку'}</button></form>
      </>}</div>
  </dialog>
}
