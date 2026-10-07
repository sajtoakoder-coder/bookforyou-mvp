import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import { collection } from '../data/editions'
import { legalPages } from '../data/legalPages'
import EditorialSection from './EditorialSection'
import Footer from './Footer'
import ObjectDetails from './ObjectDetails'

afterEach(cleanup)

describe('shared editorial components', () => {
  it('shows exactly the four legal links and their routes', () => {
    render(<MemoryRouter><Footer /></MemoryRouter>)
    const links = screen.getByRole('navigation', { name: 'Юридическая информация' }).querySelectorAll('a')
    expect(links).toHaveLength(4)
    legalPages.forEach(({ slug, title }) => {
      expect(screen.getByRole('link', { name: title })).toHaveAttribute('href', `/legal/${slug}`)
    })
  })

  it('renders supplied editorial copy without hardcoding edition content', () => {
    render(<EditorialSection title="Почему эта книга здесь" eyebrow="Выпуск №001"><p>{collection[0].curatorText}</p></EditorialSection>)
    expect(screen.getByRole('heading', { name: 'Почему эта книга здесь' })).toBeVisible()
    expect(screen.getByText(collection[0].curatorText)).toBeVisible()
  })

  it('shows the four physical objects with meaningful image names', () => {
    render(<ObjectDetails edition={collection[0]} />)
    for (const [index, name] of ['КНИГА', 'ТЕКСТИЛЬНЫЙ КОНВЕРТ', 'ЗАПЕЧАТАННЫЙ КОНВЕРТ', 'КАРТОЧКА С КООРДИНАТАМИ'].entries()) {
      expect(screen.getByRole('heading', { name: `${String(index + 1).padStart(2, '0')} ${name}` })).toBeVisible()
    }
    expect(screen.getAllByRole('img')).toHaveLength(4)
    const articles = document.querySelectorAll('section[aria-labelledby="object-details-heading"] article')
    expect(articles).toHaveLength(4)
    articles.forEach((article, index) => {
      const number = String(index + 1).padStart(2, '0')
      expect(article.querySelector('h3')).toHaveTextContent(new RegExp(`^${number}\\s`))
    })
  })
})
