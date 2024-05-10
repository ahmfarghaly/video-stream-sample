import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadUrl, setUploadUrl] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    try {
      // Request pre-signed upload URL from the server
      const response = await axios.post('http://localhost:3030/generateUploadUrl', {
        objectKey: selectedFile.name,
        contentType: selectedFile.type
      });

      const uploadUrl = response.data.uploadUrl;

      // Upload the file directly to the pre-signed URL
      await axios.put(uploadUrl, selectedFile, {
        headers: {
          'Content-Type': selectedFile.type
        }
      });

      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  return (
    <div>
      <h1>Upload Video</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default App;