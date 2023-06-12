'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import FileUploader from '../../components/fileUploader';

export const HomePage = () => {
  const [campers, setCampers] = useState([]);
  const [staff, setStaff] = useState([]);
  const [sites, setSites] = useState([]);

  useEffect(() => {
    // Fetch campers
    axios.get('/campers')
      .then((response) => {
        setCampers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // Fetch staff
    axios.get('/staff')
      .then((response) => {
        setStaff(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // Fetch sites
    axios.get('/sites')
      .then((response) => {
        setSites(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Welcome to the Rookie League Management System</h1>
      <FileUploader />
      {/* Render the site, camper, and staff cards here */}
    </div>
  );
};

export default HomePage;
