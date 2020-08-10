import React,  { useState } from 'react';

import Thumbnails from '../components/Thumbnails';
import AddImageForm from '../components/AddImageForm';
import PreviewImage from '../components/PreviewImage';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [previewing, setPreviewing] = useState({ viewing: false, imageUrl: "" });

  const addImage = (url) => {
    if(!images.includes(url))
      setImages(images => images.concat(url));
  }

  const viewImage = (url) => {
    setPreviewing({ viewing: true, imageUrl: url });
  }

  const unviewImage = () => {
    setPreviewing({ viewing: false, imageUrl: "" });
  }

  const nextImage = (currentUrl) => {
    let idx = images.findIndex(elem => elem === currentUrl);
    let newIdx = idx >= images.length - 1 ? 0 : idx + 1;
    setPreviewing({ viewing: true, imageUrl: images[newIdx] });
  }

  const previousImage = (currentUrl) => {
    let idx = images.findIndex(elem => elem === currentUrl);
    let newIdx = idx <= 0 ? images.length - 1 : idx - 1;
    setPreviewing({ viewing: true, imageUrl: images[newIdx] });
  }

  return (
    <div className="gallery" data-testid="gallery">
      <AddImageForm addImage={addImage}/>
      <Thumbnails images={images} viewImage={viewImage}/>
      {previewing && previewing.viewing && 
        <PreviewImage 
          unviewImage={unviewImage} 
          nextImage={nextImage} 
          previousImage={previousImage} 
          imageUrl={previewing.imageUrl} />
      }
    </div>
  )
}

export default Gallery;
