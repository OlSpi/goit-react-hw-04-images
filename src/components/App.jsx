import React, { useState, useEffect } from 'react';
import { Search } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { fetchImages } from './data/getImage';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [totalHits, setTotalHits] = useState('');

  useEffect(() => {
    const fetchImagesByQuery = () => {
      if (query !== '' || page !== 1) {
        setIsLoading(true);

        fetchImages(query, page)
          .then(data => {
            setImages(prevImages => [...prevImages, ...data.hits]);
            setTotalHits(data.totalHits);
            console.log(data);
          })

          .catch(error => {
            console.error(error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    };

    fetchImagesByQuery();
  }, [query, page]);

  const handleSearchSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setIsLoading(true);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = url => {
    setSelectedImage(url);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Search onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {images.length > 0 && images.length !== totalHits && !isLoading && (
        <Button onLoadMore={handleLoadMore} />
      )}
      {showModal && (
        <Modal selectedImage={selectedImage} onClose={closeModal} />
      )}
    </div>
  );
};
