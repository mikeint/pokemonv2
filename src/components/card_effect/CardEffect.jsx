import { useRef, useState } from 'react'
import styles from './CardEffect.module.scss'

const REQUIRED_VIEWS = ['neutral', 'left', 'right', 'top', 'bottom']

const CardEffect = ({ cardName }) => {
  const cardRef = useRef(null)

  const getImage = (view) => {
    try {
      return require(`../../pokemon/${cardName}/${view}.png`)
    } catch (e) {
      console.warn(`Missing image: ${cardName}/${view}.png`)
      return null
    }
  }
 
  const availableImages = REQUIRED_VIEWS.reduce((acc, view) => {
    const img = getImage(view)
    if (img) acc[view] = img
    return acc
  }, {})

  const animationEnabled = REQUIRED_VIEWS.every(view => availableImages[view])

  const [cardImage, setCardImage] = useState(availableImages.neutral || '')

  const handleMouseMove = (e) => {
    if (!animationEnabled) return

    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const { width, height } = rect

    const left = width * 0.4
    const right = width * 0.6
    const top = height * 0.4
    const bottom = height * 0.6

    if (x < left) setCardImage(availableImages.left)
    else if (x > right) setCardImage(availableImages.right)
    else if (y < top) setCardImage(availableImages.top)
    else if (y > bottom) setCardImage(availableImages.bottom)
    else setCardImage(availableImages.neutral)
  }

  const handleMouseLeave = () => {
    if (!animationEnabled) return
    setCardImage(availableImages.neutral)
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}
    >
      <img
        src={cardImage}
        alt={`${cardName} card`}
        className={styles.cardImage}
      />
    </div>
  )
}

export default CardEffect
