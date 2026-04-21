import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useCallback, useState } from "react";

import SignPage from "./pages/Auth/SignPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import NotificationsPage from "./pages/NotificationsPage";
import SuggestionsList from "./pages/SuggestionsList";
import UserProfilePage from "./pages/UserProfilePage";

import { AppLayout } from "./layout/AppLayout";
import useNotesAPI from "@/hooks/useNotesAPI";

import { NotFoundPage } from "./pages/NotFoundPage";
import AuthRedirect from "@/components/common/Routes/AuthRedirect";
import PublicRoute from "@/components/common/Routes/PublicRoute";
import ProtectedRoute from "@/components/common/Routes/ProtectedRoute";

function App() {
  const { getNotificationCount } = useNotesAPI();
  const [unreadCount, setUnreadCount] = useState(0);

  const refreshUnreadCount = useCallback(async () => {
    const data = await getNotificationCount();
    setUnreadCount(data || 0);
  }, [getNotificationCount]);

  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthRedirect />} />

        <Route
          path="/auth"
          element={
            <PublicRoute>
              <SignPage />
            </PublicRoute>
          }
        />

        <Route
          element={
            <ProtectedRoute>
              <AppLayout unreadCount={unreadCount} />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/:userId" element={<UserProfilePage />} />
          <Route
            path="/notifications"
            element={
              <NotificationsPage refreshUnreadCount={refreshUnreadCount} />
            }
          />
          <Route path="/suggestions" element={<SuggestionsList />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
