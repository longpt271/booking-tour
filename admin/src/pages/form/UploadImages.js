import React, { useState } from 'react';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebase.js';

const UploadImages = ({ onUploadComplete }) => {
  const [progressPercent, setProgressPercent] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = event => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleSubmit = async () => {
    if (selectedFiles.length !== 4) {
      alert('Vui lòng chọn đúng 4 file để upload.');
      return;
    }

    const uploadPromises = selectedFiles.map(file => {
      return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          'state_changed',
          snapshot => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgressPercent(progress);
          },
          error => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then(downloadURL => {
                resolve(downloadURL);
              })
              .catch(error => {
                reject(error);
              });
          }
        );
      });
    });

    try {
      const urls = await Promise.all(uploadPromises);
      onUploadComplete(urls);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
      />
      <button
        type="button"
        className="m-0 px-3 py-1 bg-secondary"
        onClick={handleSubmit}
      >
        Upload
      </button>
      <span className="innerBar mx-3" style={{ width: `${progressPercent}%` }}>
        {progressPercent}%
      </span>
    </div>
  );
};

export default UploadImages;
