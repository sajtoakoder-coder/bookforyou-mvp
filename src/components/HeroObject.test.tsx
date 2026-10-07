import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { afterEach, describe, expect, it } from 'vitest'
import { collection } from '../data/editions'
import HeroObject from './HeroObject'

const brokenAsset = { src: '/missing-render.png', width: 1600, height: 1200 }

afterEach(cleanup)

describe('HeroObject', () => {
  it('retries the real photograph once after a transient failure', () => {
    const hero = collection[0].assetPaths.hero

    render(<HeroObject asset={hero} alt="Комплект BOOKFORYOU" priority />)
    const image = screen.getByRole('img', { name: /комплект/i })
    expect(image).toHaveAttribute('src', hero.src)

    fireEvent.error(image)
    expect(image).toHaveAttribute('src', `${hero.src}?photo_retry=1`)
  })

  it('offers a labelled retry instead of a misleading illustration after two failures', () => {
    render(<HeroObject asset={brokenAsset} alt="Комплект BOOKFORYOU" />)
    const image = screen.getByRole('img', { name: /комплект/i })

    fireEvent.error(image)

    fireEvent.error(image)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.getByText('Комплект BOOKFORYOU')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Загрузить фото ещё раз' }))
    expect(screen.getByRole('img')).toHaveAttribute('src', `${brokenAsset.src}?photo_retry=2`)
  })

  it('reserves image dimensions and lazily loads non-priority details', () => {
    render(<HeroObject asset={collection[0].assetPaths.book} alt="Бордовая книга" />)
    const image = screen.getByRole('img', { name: 'Бордовая книга' })

    expect(image).toHaveAttribute('width', '1792')
    expect(image).toHaveAttribute('height', '2400')
    expect(image).toHaveAttribute('loading', 'lazy')
  })

  it('loads the above-the-fold hero with high priority', () => {
    render(<HeroObject asset={collection[0].assetPaths.hero} alt="Комплект BOOKFORYOU" priority />)
    const image = screen.getByRole('img', { name: /комплект/i })

    expect(image).toHaveAttribute('loading', 'eager')
    expect(image).toHaveAttribute('fetchpriority', 'high')
  })
})
