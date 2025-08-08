import { useState } from 'react'
import styles from './CardModal.module.scss'
import CardEffect from '../card_effect/CardEffect'

const CardModal = ({ cardName, cardPrice, onClose }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => setIsFlipped(!isFlipped)

  const getBackImage = () => {
    try {
      return require(`../../pokemon/${cardName}/back.png`)
    } catch (e) {
      console.warn(`Back image not found for ${cardName}`)
      return ''
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}></button>
        <button className={styles.flipButton} onClick={handleFlip}>{isFlipped ? 'Show Front' : 'Flip to Back'} </button>
 
          {isFlipped ? (
            <img
              src={getBackImage()}
              alt={`${cardName} back`}
              className={styles.cardImage}
            />
          ) : (
            <CardEffect cardName={cardName} cardPrice={cardPrice} />
          )} 
      </div>
    </div>
  )
}

export default CardModal
