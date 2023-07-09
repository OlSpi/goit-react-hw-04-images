import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({ selectedImage, onClose }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleCloseModal = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div className={css.overlay} onClick={handleCloseModal}>
        <div className={css.modal}>
          <img src={selectedImage} alt="" />
        </div>
      </div>
    </>
  );
};

Modal.propTypes = {
  selectedImage: PropTypes.string,
  onClose: PropTypes.func,
};
