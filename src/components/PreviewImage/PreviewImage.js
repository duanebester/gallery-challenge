import React from 'react';

const PreviewImage = ({ imageUrl, unviewImage, nextImage, previousImage }) => {
  return (
    <div className="preview-image">
      <div className="preview-actions">
        <div className="previous">
          <button aria-label="previous-image" className="previous-btn" onClick={() => previousImage(imageUrl)}>{`<`}</button>
        </div>
        <div className="close">
          <button aria-label="close-preview" className="close-btn" onClick={unviewImage}>{`Close`}</button>
        </div>
        <div className="next">
          <button aria-label="next-image" className="next-btn" onClick={() => nextImage(imageUrl)}>{`>`}</button>
        </div>
      </div>
      <img aria-label="preview-image-src" src={imageUrl} alt="Expanded" />
    </div>
  )
};

export default PreviewImage;