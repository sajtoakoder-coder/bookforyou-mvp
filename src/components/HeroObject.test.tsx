import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { afterEach, describe, expect, it } from 'vitest'
import { collection, fallbackAsset } from '../data/editions'
import HeroObject from './HeroObject'

const brokenAsset = { src: '/missing-render.png', width: 1600, height: 1200 }

afterEach(cleanup)

describe('HeroObject', () => {
  it('uses a distinct local fallback when the real hero fails', () => {
    const hero = collection[0].assetPaths.hero
    expect(fallbackAsset.src).toMatch(/^(?:data:image\/svg\+xml,|.*fallback-object\.svg)/)
    expect(fallbackAsset.src).not.toBe(hero.src)

    render(<HeroObject asset={hero} alt="Комплект BOOKFORYOU" priority />)
    const image = screen.getByRole('img', { name: /комплект/i })
    expect(image).toHaveAttribute('src', hero.src)

    fireEvent.error(image)
    expect(image).toHaveAttribute('src', fallbackAsset.src)
  })

  it('swaps to the static fallback when the render cannot load', () => {
    render(<HeroObject asset={brokenAsset} alt="Комплект BOOKFORYOU" />)
    const image = screen.getByRole('img', { name: /комплект/i })

    fireEvent.error(image)

    expect(image).toHaveAttribute('src', fallbackAsset.src)
    expect(image).toHaveAttribute('alt', 'Комплект BOOKFORYOU')
    fireEvent.error(image)
    expect(image).toHaveAttribute('src', fallbackAsset.src)
  })

  it('reserves image dimensions and lazily loads non-priority details', () => {
    render(<HeroObject asset={collection[0].assetPaths.book} alt="Бордовая книга" />)
    const image = screen.getByRole('img', { name: 'Бордовая книга' })

    expect(image).toHaveAttribute('width', '1024')
    expect(image).toHaveAttribute('height', '1536')
    expect(image).toHaveAttribute('loading', 'lazy')
  })

  it('loads the above-the-fold hero with high priority', () => {
    render(<HeroObject asset={collection[0].assetPaths.hero} alt="Комплект BOOKFORYOU" priority />)
    const image = screen.getByRole('img', { name: /комплект/i })

    expect(image).toHaveAttribute('loading', 'eager')
    expect(image).toHaveAttribute('fetchpriority', 'high')
  })
})
