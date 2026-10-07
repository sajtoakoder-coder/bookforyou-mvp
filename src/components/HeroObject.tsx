import { useState, type JSX } from 'react'
import { fallbackAsset, type AssetSource } from '../data/editions'
import styles from './HeroObject.module.css'

interface HeroObjectProps {
  asset: AssetSource
  alt: string
  priority?: boolean
  ambient?: boolean
  onReady?: () => void
}

export default function HeroObject({ asset, alt, priority = false, ambient = false, onReady }: HeroObjectProps): JSX.Element {
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const showFallback = failedSrc === asset.src
  const image = showFallback ? fallbackAsset : asset

  return (
    <figure className={styles.object}>
      <img
        className={`${styles.image} ${ambient ? styles.ambient : ''}`}
        src={image.src}
        alt={alt}
        width={image.width}
        height={image.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        onLoad={onReady ? event => {
          const image = event.currentTarget
          if (typeof image.decode === 'function') void image.decode().then(onReady, onReady)
          else onReady()
        } : undefined}
        onError={() => {
          if (!showFallback && asset.src !== fallbackAsset.src) setFailedSrc(asset.src)
        }}
      />
    </figure>
  )
}
