import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import DashboardPage from './DashboardPage';
import ProfilePage from './ProfilePage';
import SettingsPage from './SettingsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for login page as the default route */}
        <Route path="/" element={<LoginPage />} />
        {/* Other routes */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        {/* Add more routes here */}
        {/* Route for 404 page not found */}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
