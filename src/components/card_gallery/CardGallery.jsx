import pokemonList from '../../pokemonList.json';
import { useState } from 'react';
import styles from './CardGallery.module.scss';
import Modal from '../card_modal/CardModal';
import CardEffect from '../card_effect/CardEffect';

const CardGallery = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowModal(true);
  };

  return (
    <>
      <div className={styles.gallery}>
        {pokemonList.map((card, index) => {
          let neutralImg;
          try {
            neutralImg = require(`../../assets/${card.name}/neutral.png`);
          } catch (e) {
            console.warn(`Image not found for ${card.name}`);
            neutralImg = ''; 
          }

          return (
            <div className={styles.card} key={index}>
              <img
                src={neutralImg}
                alt={`Card ${card.name}`}
                className={styles.cardThumbnail}
                onClick={() => handleCardClick(card)}
              />
              <div className={styles.cardInfo}>
                <div className={styles.cardName}>{card.name}</div>
                <div className={styles.cardPrice}>${card.price.toFixed(2)}</div>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && selectedCard && (
        <Modal cardName={selectedCard.name} onClose={() => setShowModal(false)}>
          <div className={styles.modalContent}>
            <CardEffect cardName={selectedCard.name} />
          </div>
        </Modal>
      )}
    </>
  );
};

export default CardGallery;
