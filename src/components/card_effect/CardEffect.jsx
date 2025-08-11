import { useRef, useState } from 'react'
import styles from './CardEffect.module.scss'

const POSSIBLE_VIEWS = ['neutral', 'left', 'right', 'top', 'bottom']

const CardEffect = ({ cardName, cardPrice }) => {
  const cardRef = useRef(null)

  const getImage = (view) => {
    try {
      return require(`../../pokemon/${cardName}/${view}.png`)
    } catch (e) {
      return null
    }
  }

  // Load only available images
  const availableImages = POSSIBLE_VIEWS.reduce((acc, view) => {
    const img = getImage(view)
    if (img) acc[view] = img
    return acc
  }, {})
 

  const [cardImage, setCardImage] = useState(availableImages.neutral || '')

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card || !availableImages.neutral) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const { width, height } = rect

    const left = width * 0.4
    const right = width * 0.6
    const top = height * 0.4
    const bottom = height * 0.6

    if (x < left && availableImages.left) {
      setCardImage(availableImages.left)
    } else if (x > right && availableImages.right) {
      setCardImage(availableImages.right)
    } else if (y < top && availableImages.top) {
      setCardImage(availableImages.top)
    } else if (y > bottom && availableImages.bottom) {
      setCardImage(availableImages.bottom)
    } else {
      setCardImage(availableImages.neutral)
    }
  }

  const handleMouseLeave = () => {
    if (availableImages.neutral) {
      setCardImage(availableImages.neutral)
    }
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}
    >
      <div className={styles.cardInfo}>
        <span>{cardName}</span>
        <span>${cardPrice}</span>
      </div>
      <img
        src={cardImage}
        alt={`${cardName} card`}
        className={styles.cardImage}
      />
    </div>
  )
}

export default CardEffect
