export interface PreorderRequest {
  name: string
  telegram: string
  phone: string
  email: string
  consent: true
}

export type PreorderResult = { ok: true } | { ok: false; code: 'unconfigured' | 'network' }

export type PreorderReceiver = (request: PreorderRequest) => Promise<PreorderResult>
