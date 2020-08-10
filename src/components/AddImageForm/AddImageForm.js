import React,  { useState } from 'react';

const AddImageForm = ({ addImage }) => {
  const [imageURL, setImageURL] = useState("");
  return (
    <div className="add-image-form">
      <input aria-label="add-image-input" type="text" placeholder="Paste Image URL" value={imageURL} onChange={e => setImageURL(e.target.value)}/>
      <button onClick={(e) => {
        e.preventDefault();
        addImage(imageURL);
        setImageURL("");
      }}>Add</button>
    </div>
  )
}

export default AddImageForm;