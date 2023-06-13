'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import FileUploader from '../../components/fileUploader';

import Home from '../pages/home';
import SiteList from '../pages/SiteList';
import CamperList from '../pages/CamperList';

const HomePage = () => {
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
    <>
      <FileUploader />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sites" element={<SiteList sites={sites} />} />
          <Route path="/campers" element={<CamperList campers={campers} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default HomePage;

