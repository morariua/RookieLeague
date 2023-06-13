
import React, { useState } from 'react';
import connectToDatabase from './data';

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);


    app.post('/upload', upload.single('file'), async (req, res) => {
      try {
        const client = await connectToDatabase();
        const db = client.db('rookie_league'); // Database name
        const collection = db.collection('campers'); // Collection name
    
        // Process the Excel file and convert it to JSON
        const workbook = XLSX.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
    
        // Insert the JSON data into the MongoDB collection
        await collection.insertMany(jsonData);
    
        res.status(200).send('Campers inserted successfully');
      } catch (error) {
        console.error('Failed to insert campers:', error);
        res.status(500).send('Failed to insert campers');
      }
    });
    
  };

  return (
    <div>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default FileUploader;
