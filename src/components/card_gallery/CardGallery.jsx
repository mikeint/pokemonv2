import pokemonList from '../../pokemonList.json';
import pokemonListEx from '../../pokemonListEx.json';
import { useState } from 'react';
import styles from './CardGallery.module.scss';
import Modal from '../card_modal/CardModal';
import CardEffect from '../card_effect/CardEffect';

const CardGallery = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [activeTab, setActiveTab] = useState('main');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowModal(true);
  };

  const cardList = activeTab === 'main' ? pokemonList : pokemonListEx;

  const filteredCards = cardList.filter((card) =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalValue = filteredCards.reduce((acc, card) => acc + card.price, 0).toFixed(2);

  return (
    <>
      {/* Tab Navigation & Search */}
      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tabButton} ${activeTab === 'main' ? styles.active : ''}`}
            onClick={() => setActiveTab('main')}
          >
            Base Set
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'extra' ? styles.active : ''}`}
            onClick={() => setActiveTab('extra')}
          >
            Extra Cards
          </button>
        </div> 
      </div>

      {/* Card Gallery */}
      <div className={styles.galleryContainer}>
        <div className={styles.searchHeader}>
          <input
            type="text"
            placeholder="Search Pokémon..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className={styles.totalValue}>
            ${totalValue}
          </div>
        </div>

        <div className={styles.gallery}>
          {filteredCards.map((card, index) => {
            let neutralImg;
            try {
              neutralImg = require(`../../pokemon/${card.name}/neutral.png`);
            } catch (e) {
              console.warn(`Image not found for ${card.name}`);
              neutralImg = '';
            }

            return (
              <div className={styles.card} key={index}>
                <span className={styles.cardNumber}>#{card.number}</span>
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
      </div>

      {/* Modal */}
      {showModal && selectedCard && (
        <Modal cardName={selectedCard.name} onClose={() => setShowModal(false)}>
          <CardEffect cardName={selectedCard.name} />
        </Modal>
      )}
    </>
  );
};

export default CardGallery;
