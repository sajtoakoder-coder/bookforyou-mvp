import bookDetailUrl from '../assets/renders/book-client-v3-web.jpg'
import textileEnvelopeUrl from '../assets/renders/textile-envelope-client-v3-web.jpg'
import coordinatesCardUrl from '../assets/renders/coordinate-card-client-v3-web.jpg'
import envelopeDetailUrl from '../assets/renders/paper-envelope-client-v3-web.jpg'
import heroKitUrl from '../assets/renders/hero-client-v3-web.jpg'

export interface AssetSource {
  src: string
  width: number
  height: number
}

export interface EditionAssetPaths {
  hero: AssetSource
  book: AssetSource
  textileEnvelope: AssetSource
  envelope: AssetSource
  coordinatesCard: AssetSource
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

const renderAssets: EditionAssetPaths = {
  hero: { src: heroKitUrl, width: 2752, height: 1536 },
  book: { src: bookDetailUrl, width: 1792, height: 2400 },
  textileEnvelope: { src: textileEnvelopeUrl, width: 2752, height: 1536 },
  envelope: { src: envelopeDetailUrl, width: 2752, height: 1536 },
  coordinatesCard: { src: coordinatesCardUrl, width: 2752, height: 1536 },
}

export const collection: readonly Edition[] = [
  {
    slug: '001',
    number: '№001',
    // Book metadata comes from chapter 10 of the client's supplied storyboard.
    title: 'Гений',
    author: 'Теодор Драйзер',
    price: '4 900 ₽',
    // Audience line is also supplied in chapter 10 of the client storyboard.
    audienceLine: 'Для того, кто не хочет прожить чужую жизнь.',
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
