export interface LegalPage {
  slug: string
  title: string
  notice: string
}

const notice = 'Информация будет опубликована к запуску продаж.'

export const legalPages: readonly LegalPage[] = [
  { slug: 'requisites', title: 'Реквизиты', notice },
  { slug: 'privacy', title: 'Политика конфиденциальности', notice },
  { slug: 'terms', title: 'Условия продажи и возврата', notice },
  { slug: 'delivery', title: 'Доставка и оплата', notice },
]
