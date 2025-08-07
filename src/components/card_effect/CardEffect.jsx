import { useRef, useState } from 'react'
import styles from './CardEffect.module.scss'

const CardEffect = ({ cardName }) => {
  const cardRef = useRef(null)

  const getImage = (view) => {
    try {
      return require(`../../assets/${cardName}/${view}.png`)
    } catch (e) {
      console.warn(`Missing image: ${cardName}/${view}.png`)
      return ''
    }
  }

  const [cardImage, setCardImage] = useState(getImage('neutral'))

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const width = rect.width
    const height = rect.height

    const left = width * 0.2
    const right = width * 0.8
    const top = height * 0.3
    const bottom = height * 0.7

    if (x < left) setCardImage(getImage('left'))
    else if (x > right) setCardImage(getImage('right'))
    else if (y < top) setCardImage(getImage('top'))
    else if (y > bottom) setCardImage(getImage('bottom'))
    else setCardImage(getImage('neutral'))
  }

  const handleMouseLeave = () => setCardImage(getImage('neutral'))

  return (
    <div
      className={styles.cardWrapper}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}
    >
      <img src={cardImage} alt={`${cardName} card`} className={styles.cardImage} />
    </div>
  )
}

export default CardEffect
