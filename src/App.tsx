// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/main/Navbar';
import MainPage from './components/main/MainPage';
import IntroductionPage from './components/main/IntroductionPage';
import ContactPage from './components/main/ContactPage';
import ProfilePage from './components/main/ProfilePage';
import Footer from './components/main/Footer';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import './App.css';  // Ensure this line is present to include your CSS
import CreateInvoice from './components/invoice/guide/CreateInvoice';
import ManageInvoice from './components/invoice/guide/ManageInvoice';
import SendInvoice from './components/invoice/guide/SendInvoice';
const App: React.FC = () => {
  return (
    <div className="app-container">
      <Router>
        <Navbar />
        <div className="content-wrap">
          <Routes>
            <Route path="/" element={<IntroductionPage />} />
            <Route path="/create/invoice" element={<CreateInvoice />} />
            <Route path="/manage/invoice" element={<ManageInvoice />} />
            <Route path="/send/invoice" element={<SendInvoice />} />
            <Route
              path="/main"
              element={
                <SignedIn>
                  <MainPage />
                </SignedIn>
              }
            />
            <Route path="/contact" element={<ContactPage />} />
            <Route
              path="/profile"
              element={
                <SignedIn>
                  <ProfilePage />
                </SignedIn>
              }
            />
            <Route
              path="/login"
              element={
                <SignedOut>
                  <IntroductionPage />
                </SignedOut>
              }
            />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
