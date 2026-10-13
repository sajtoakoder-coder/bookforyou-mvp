import type { PreorderReceiver } from './types'

// Contacts must never be silently discarded before a real receiver is selected.
export const unconfiguredReceiver: PreorderReceiver = async () => ({ ok: false, code: 'unconfigured' })
