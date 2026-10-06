import bookDetailUrl from '../assets/renders/book-detail.png'
import boxDetailUrl from '../assets/renders/box-detail.png'
import coordinatesCardUrl from '../assets/renders/coordinates-card.png'
import envelopeDetailUrl from '../assets/renders/envelope-detail.png'
import fallbackObjectUrl from '../assets/renders/fallback-object.png'
import heroKitUrl from '../assets/renders/hero-kit.png'

export interface AssetSource {
  src: string
  width: number
  height: number
}

export interface EditionAssetPaths {
  hero: AssetSource
  book: AssetSource
  box: AssetSource
  envelope: AssetSource
  coordinatesCard: AssetSource
  fallback: AssetSource
}

export interface Edition {
  slug: string
  number: string
  title: string
  author: string
  price: string
  audienceLine: string
  curatorText: string
  assetPaths: EditionAssetPaths
  isCurrent: boolean
}

export const fallbackAsset: AssetSource = {
  src: fallbackObjectUrl,
  width: 1774,
  height: 887,
}

const renderAssets: EditionAssetPaths = {
  hero: { src: heroKitUrl, width: 1774, height: 887 },
  book: { src: bookDetailUrl, width: 1024, height: 1536 },
  box: { src: boxDetailUrl, width: 1774, height: 887 },
  envelope: { src: envelopeDetailUrl, width: 1536, height: 1024 },
  coordinatesCard: { src: coordinatesCardUrl, width: 1536, height: 1024 },
  fallback: fallbackAsset,
}

export const collection: readonly Edition[] = [
  {
    slug: '001',
    number: '№001',
    title: 'Название книги будет объявлено',
    author: 'Автор будет объявлен',
    price: '4 900 ₽',
    audienceLine: 'Описание выпуска будет добавлено',
    curatorText: 'Текст куратора будет добавлен',
    assetPaths: renderAssets,
    isCurrent: true,
  },
  {
    slug: '002',
    number: '№002',
    title: 'Название книги будет объявлено',
    author: 'Автор будет объявлен',
    price: 'Цена будет объявлена',
    audienceLine: 'Описание выпуска будет добавлено',
    curatorText: 'Текст куратора будет добавлен',
    assetPaths: renderAssets,
    isCurrent: false,
  },
  {
    slug: '003',
    number: '№003',
    title: 'Название книги будет объявлено',
    author: 'Автор будет объявлен',
    price: 'Цена будет объявлена',
    audienceLine: 'Описание выпуска будет добавлено',
    curatorText: 'Текст куратора будет добавлен',
    assetPaths: renderAssets,
    isCurrent: false,
  },
]

export function getEditionBySlug(slug: string): Edition | undefined {
  return collection.find((edition) => edition.slug === slug)
}
