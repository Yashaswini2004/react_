import React, { useState } from 'react';

const PatholeDetectionApp = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const detectPatholes = async () => {
    // Replace 'http://your-backend-url' with the actual URL of your pathole detection backend
    const backendUrl = 'http://your-backend-url';

    try {
      const response = await fetch(`${backendUrl}/detect-patholes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: image }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.result);
      } else {
        console.error('Error detecting patholes:', response.statusText);
      }
    } catch (error) {
      console.error('Error detecting patholes:', error.message);
    }
  };

  return (
    <div>
      <h1>Pathole Detection App</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && <img src={image} alt="Uploaded" style={{ maxWidth: '100%' }} />}
      <button onClick={detectPatholes}>Detect Patholes</button>
      {result && <p>Pathole detection result: {result}</p>}
    </div>
  );
};

export default PatholeDetectionApp;
