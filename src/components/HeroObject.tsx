import { useState, type JSX } from 'react'
import type { AssetSource } from '../data/editions'
import styles from './HeroObject.module.css'

interface HeroObjectProps {
  asset: AssetSource
  alt: string
  priority?: boolean
  ambient?: boolean
  onReady?: () => void
}

export default function HeroObject({ asset, alt, priority = false, ambient = false, onReady }: HeroObjectProps): JSX.Element {
  return <Photograph key={asset.src} asset={asset} alt={alt} priority={priority} ambient={ambient} onReady={onReady} />
}

function Photograph({ asset, alt, priority, ambient, onReady }: HeroObjectProps): JSX.Element {
  const [attempt, setAttempt] = useState(0)
  const [failed, setFailed] = useState(false)
  const [generation, setGeneration] = useState(0)
  const retry = generation * 2 + attempt
  const src = retry ? `${asset.src}${asset.src.includes('?') ? '&' : '?'}photo_retry=${retry}` : asset.src

  return (
    <figure className={styles.object} data-failed={failed || undefined} style={failed ? { aspectRatio: `${asset.width} / ${asset.height}` } : undefined}>
      {failed ? <div className={styles.error} role="status">
        <p>{alt}</p><p>Фото не загрузилось.</p>
        <button type="button" onClick={() => { setGeneration(value => value + 1); setAttempt(0); setFailed(false) }}>Загрузить фото ещё раз</button>
      </div> : <img
        className={`${styles.image} ${ambient ? styles.ambient : ''}`}
        src={src}
        alt={alt}
        width={asset.width}
        height={asset.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        onLoad={onReady ? event => {
          const image = event.currentTarget
          if (typeof image.decode === 'function') void image.decode().then(onReady, onReady)
          else onReady()
        } : undefined}
        onError={() => {
          if (attempt === 0) setAttempt(1)
          else { setFailed(true); onReady?.() }
        }}
      />}
    </figure>
  )
}
