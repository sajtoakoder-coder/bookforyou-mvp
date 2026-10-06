import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { afterEach, expect, it } from 'vitest'
import App from '../App'

afterEach(() => { cleanup(); window.history.pushState({}, '', '/') })

it('shows the editorial story and every required physical object on the home page', () => {
  window.history.pushState({}, '', '/')
  render(<App />)
  expect(screen.getByRole('heading', { name: /эта книга для того, кто/i })).toBeVisible()
  expect(screen.getByRole('heading', { name: 'Почему эта книга здесь' })).toBeVisible()
  expect(screen.getByText('КНИГА')).toBeVisible()
  expect(screen.getByText('КОРОБКА')).toBeVisible()
  expect(screen.getByText('ЗАПЕЧАТАННЫЙ КОНВЕРТ')).toBeVisible()
  expect(screen.getByText('КАРТОЧКА С КООРДИНАТАМИ')).toBeVisible()
  expect(screen.getByRole('heading', { name: 'BOOKFORYOU для другого' })).toBeVisible()
  expect(screen.getByText('Рита Ленских')).toBeVisible()
})
