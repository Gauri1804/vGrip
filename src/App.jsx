


import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import { EmailVerifyPage } from "./pages/EmailVerifyPage/EmailVerifyPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import { useAuthStore } from "./store/authStore";
import ForgotPasswordPage from "./pages/Forgot Password Page/ForgotPasswordPage";
import RestPasswordPage from "./pages/Rest Password Page/RestPasswordPage";

// Protect routes that require authentication
const ProtectRoutes = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

// Redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth(); // Ensure authentication status is checked on app load
  }, []);

  // Show a loading screen while authentication status is being checked
  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/signup"
        element={
          <RedirectAuthenticatedUser>
            <SignUpPage />
          </RedirectAuthenticatedUser>
        }
      />
      <Route
        path="/login"
        element={
          <RedirectAuthenticatedUser>
            <LoginPage />
          </RedirectAuthenticatedUser>
        }
      />
      <Route
        path="/"
        element={
          <ProtectRoutes>
            <HomePage />
          </ProtectRoutes>
        }
      />
      <Route path="/verify-email" element={<EmailVerifyPage />} />

      <Route path="/forgot-password" element={<RedirectAuthenticatedUser>
        <ForgotPasswordPage />
      </RedirectAuthenticatedUser>} />
      <Route
        path='/reset-password/:token'
        element={
          <RedirectAuthenticatedUser>
            <RestPasswordPage />
          </RedirectAuthenticatedUser>
        }
      />
      {/* catch all routes */}
      <Route path='*' element={<Navigate to='/' replace />} />


    </Routes>




  );
};

export default App;
