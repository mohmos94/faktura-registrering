// src/App.tsx
import React, { useEffect } from 'react';
import './App.css';
import { fetchBrregData } from './service/BrregApi'; // Import the fetch function
import { BrregEnhet } from './service/Interface'; // Import the interface
import Invoice from './components/invoice/Invoice';
import Header from './components/main/Header';
import Footer from './components/main/Footer';
import { Container } from '@mui/material';

function App() {
  useEffect(() => {
    const orgnr = '916880928'; // Example organization number
    fetchBrregData(orgnr)
      .then((data: BrregEnhet) => {
        console.log('Fetched Brreg Data:', data); // Log the fetched data
      })
      .catch((error) => {
        console.error('Error fetching Brreg data:', error);
      });
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="App">
      <Container>
        <Header />
        <Invoice />
        <Footer />
      </Container>
    </div>
  );
}

export default App;
