import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Public/Home";
import LearnMore from "./components/Public/LearnMore";
import Login from "./components/Public/Login";
import Register from "./components/Public/Register";
import Profile from "./components/Protected/Profile";
import Gallery from "./components/Protected/Gallery";
import MainComponent from "./components/Main/MainComponent";
import DonationMain from "./components/Protected/DonationMain";
import Donation from "./components/Protected/Donation";
import ThankYou from './components/Protected/ThankYou'; // Adjust path as necessary
import Photography from "./components/Protected/Photography";

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const currentUser = localStorage.getItem("currentUser");

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return children;
};

const App = () => {
  const currentUser = localStorage.getItem("currentUser");

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        {!currentUser && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/learn-more" element={<LearnMore />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
          </>
        )}



        {/* Protected Routes */}
        {currentUser && (
          <>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainComponent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/gallery"
              element={
                <ProtectedRoute>
                  <Gallery />
                </ProtectedRoute>
              }
            />
            <Route
              path="/donation"
              element={
                <ProtectedRoute>
                  <DonationMain />
                </ProtectedRoute>
              }
            />
            <Route
              path="/donation1"
              element={
                <ProtectedRoute>
                  <Donation />
                </ProtectedRoute>
              }
            />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route
              path="/photography"
              element={
                <ProtectedRoute>
                  <Photography />
                </ProtectedRoute>
              }
            />
          </>
        )}

        {/* Default fallback */}
        <Route path="*" element={<Navigate to={currentUser ? "/" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
