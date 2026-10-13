import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { afterEach, expect, it } from 'vitest'
import App from '../App'

afterEach(() => { cleanup(); window.history.pushState({}, '', '/') })

it('uses the approved three-screen home sequence and exact release information', () => {
  render(<App />)
  expect(Array.from(document.querySelectorAll('main > section')).map(section => section.id)).toEqual(['release', 'ritual', 'curator-close'])
  expect(screen.getByRole('heading', { level: 1, name: 'Книга.Для тебя.' })).toBeVisible()
  expect(document.querySelector('#release')).toHaveTextContent('20 экземпляров')
  expect(screen.getByRole('heading', { name: 'Три вопроса.Одна книга.' })).toBeVisible()
  expect(screen.getByRole('heading', { name: 'Рита Ленских' })).toBeVisible()
  expect(screen.queryByText('Книга, которую проще передать, чем объяснить')).not.toBeInTheDocument()
})

it('presents the ritual and opens the same truthful preorder form from both calls to action', () => {
  render(<App />)
  const ritual = screen.getByRole('region', { name: 'Три вопроса.Одна книга.' })
  expect(within(ritual).getAllByRole('listitem')).toHaveLength(3)
  expect(within(ritual).getByRole('heading', { name: 'Как открыть' })).toBeVisible()
  fireEvent.click(screen.getByRole('button', { name: /заказать.*4 900/i }))
  expect(screen.getByRole('heading', { name: 'Оставить заявку' })).toBeVisible()
  fireEvent.click(screen.getByRole('button', { name: 'Закрыть форму' }))
  expect(screen.queryByRole('heading', { name: 'Оставить заявку' })).not.toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'Выбрать выпуск №001' }))
  expect(screen.getByRole('heading', { name: 'Оставить заявку' })).toBeVisible()
  expect(screen.queryByLabelText(/карта/i)).not.toBeInTheDocument()
})

it('shows the unavailable state rather than pretending that a preorder was accepted', async () => {
  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: /заказать.*4 900/i }))
  fireEvent.change(screen.getByLabelText('Имя'), { target: { value: 'Рита' } })
  fireEvent.change(screen.getByLabelText('Telegram'), { target: { value: '@rita' } })
  fireEvent.click(screen.getByRole('checkbox'))
  fireEvent.click(screen.getByRole('button', { name: 'Оставить заявку' }))
  expect(await screen.findByRole('alert')).toHaveTextContent('Заявки пока не принимаются')
  expect(screen.getByLabelText('Telegram')).toHaveValue('@rita')
})
