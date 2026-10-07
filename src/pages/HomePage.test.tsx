import { cleanup, render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { afterEach, expect, it } from 'vitest'
import App from '../App'

afterEach(() => { cleanup(); window.history.pushState({}, '', '/') })

it('leads with the campaign title, release plaque and launch statement', () => {
  render(<App />)
  const title = screen.getByRole('heading', { level: 1, name: 'КНИГА ДЛЯ ТЕБЯ' })
  expect(title).toBeVisible()
  expect(title).toHaveTextContent('Книга.Для тебя.')
  const hero = screen.getByRole('region', { name: 'КНИГА ДЛЯ ТЕБЯ' })
  expect(within(hero).getByText('№001 · 4 900 ₽')).toBeVisible()
  expect(within(hero).getByText('СКОРО БУДЕТ ДОСТУПНО')).toBeVisible()
  expect(within(hero).getByRole('link', { name: 'Смотреть выпуск №001' })).toHaveAttribute('href', '/edition/001')
  expect(screen.getByRole('region', { name: 'Первый выпуск' })).toHaveTextContent('Книга приходит не с ответом, а в нужный момент.')
  expect(within(hero).queryByRole('button')).not.toBeInTheDocument()
})

it('shows the editorial story, gift destination and every required physical object', () => {
  window.history.pushState({}, '', '/')
  render(<App />)
  expect(screen.getByRole('heading', { name: 'Почему эта книга здесь' })).toBeVisible()
  expect(screen.getByRole('button', { name: '01 КНИГА' })).toBeVisible()
  expect(screen.getByText('ТЕКСТИЛЬНЫЙ КОНВЕРТ')).toBeVisible()
  expect(screen.queryByText(/коробк/i)).not.toBeInTheDocument()
  expect(screen.getByText('ЗАПЕЧАТАННЫЙ КОНВЕРТ')).toBeVisible()
  expect(screen.getByText('КАРТОЧКА С КООРДИНАТАМИ')).toBeVisible()
  expect(screen.getByRole('heading', { name: 'Книга, которую проще передать, чем объяснить' })).toBeVisible()
  expect(screen.getByRole('region', { name: 'Книга, которую проще передать, чем объяснить' })).toHaveAttribute('id', 'gift')
  expect(screen.getByText('Рита Ленских')).toBeVisible()
})
