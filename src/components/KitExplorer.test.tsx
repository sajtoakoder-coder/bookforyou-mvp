import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { afterEach, expect, it } from 'vitest'
import { collection } from '../data/editions'
import KitExplorer from './KitExplorer'

afterEach(cleanup)

it('retains the current photograph and caption until the selected photograph loads', async () => {
  render(<KitExplorer edition={collection[0]} />)
  const preview = screen.getByRole('region', { name: 'Деталь комплекта' })
  fireEvent.click(screen.getByRole('button', { name: '02 ТЕКСТИЛЬНЫЙ КОНВЕРТ' }))
  expect(preview).toHaveAttribute('aria-busy', 'true')
  expect(within(preview).getByRole('img')).toHaveAttribute('alt', 'Книга BOOKFORYOU')
  expect(preview).toHaveTextContent('История, к которой возвращаются.')

  fireEvent.load(within(preview).getByRole('img', { name: 'Текстильный конверт для книги BOOKFORYOU', hidden: true }))
  expect(await within(preview).findByRole('img', { name: 'Текстильный конверт для книги BOOKFORYOU' })).toBeVisible()
  expect(preview).toHaveAttribute('aria-busy', 'false')
  expect(preview).toHaveTextContent('02 / 04')
  expect(preview).toHaveTextContent('Вещь, которая остаётся.')
  expect(within(preview).getAllByRole('img')).toHaveLength(1)
})

it('late loads cannot overwrite a newer selection', async () => {
  render(<KitExplorer edition={collection[0]} />)
  const preview = screen.getByRole('region', { name: 'Деталь комплекта' })
  fireEvent.click(screen.getByRole('button', { name: '02 ТЕКСТИЛЬНЫЙ КОНВЕРТ' }))
  fireEvent.click(screen.getByRole('button', { name: '04 КАРТОЧКА С КООРДИНАТАМИ' }))
  fireEvent.load(within(preview).getByRole('img', { name: 'Текстильный конверт для книги BOOKFORYOU', hidden: true }))
  expect(within(preview).getByRole('img')).toHaveAttribute('alt', 'Книга BOOKFORYOU')
  fireEvent.load(within(preview).getByRole('img', { name: 'Карточка с координатами BOOKFORYOU', hidden: true }))
  expect(await within(preview).findByRole('img', { name: 'Карточка с координатами BOOKFORYOU' })).toBeVisible()
  expect(preview).toHaveTextContent('04 / 04')
  expect(screen.getByRole('button', { name: '04 КАРТОЧКА С КООРДИНАТАМИ' })).toHaveAttribute('aria-pressed', 'true')
})
