import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import EventsPage from './pages/EventsPage';
import EventDetail from './pages/EventDetail';
import LogInPage from './pages/LogInPage';
import AccountPage from './pages/AccountPage';
import TicketsPage from './pages/TicketsPage';
import ChangePassword from './pages/ChangePassword';
import RegisterPage from './pages/RegisterPage';
import Checkout from './pages/Checkout';
import PaymentForm from './components/PaymentForm';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <AppContent />
      </Router>
    </ChakraProvider>
  );
}


function AppContent() {
  const location = useLocation();
  return (
    <>
      {location.pathname != "/login" && location.pathname != "/register" && <Navbar />}
      <Routes>
        <Route path="/events" element={<EventsPage />} />
        <Route path="/" element={<Navigate to="/events" replace />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}

export default App;