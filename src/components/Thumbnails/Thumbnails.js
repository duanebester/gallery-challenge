import React from 'react';

const Thumbnails = ({ images, viewImage }) => {
  const renderThumbnail = (url, callback) => (
    <div key={url} className="thumbnail">
      <img src={url} alt="Custom" onClick={() => callback(url)} />
    </div>
  )
  
  let thumbnails = images.map(image => renderThumbnail(image, viewImage));
  return (
    <div className="thumbnails">
      {thumbnails}
    </div>
  )
}

export default Thumbnails;