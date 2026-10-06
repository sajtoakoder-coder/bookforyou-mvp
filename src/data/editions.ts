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

const placeholderAssets: EditionAssetPaths = {
  hero: { src: '/src/assets/renders/hero-kit.webp', width: 1600, height: 1200 },
  book: { src: '/src/assets/renders/book-detail.webp', width: 1000, height: 1200 },
  box: { src: '/src/assets/renders/box-detail.webp', width: 1000, height: 1200 },
  envelope: { src: '/src/assets/renders/envelope-detail.webp', width: 1000, height: 1200 },
  coordinatesCard: { src: '/src/assets/renders/coordinates-card.webp', width: 1000, height: 1200 },
  fallback: { src: '/src/assets/renders/fallback-object.webp', width: 1600, height: 1200 },
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
    assetPaths: placeholderAssets,
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
    assetPaths: placeholderAssets,
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
    assetPaths: placeholderAssets,
    isCurrent: false,
  },
]

export function getEditionBySlug(slug: string): Edition | undefined {
  return collection.find((edition) => edition.slug === slug)
}
