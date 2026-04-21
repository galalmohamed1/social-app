import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignPage from "./pages/Auth/SignPage";
import { AppLayout } from "./layout/AppLayout";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import NotificationsPage from "./pages/NotificationsPage";
import { ToastContainer } from "react-toastify";
import SuggestionsList from "./pages/SuggestionsList";
import { useState } from "react";
import useNotesAPI from "@/hooks/useNotesAPI";
import UserProfilePage from "./pages/UserProfilePage";
function App() {
  const { getNotificationCount } = useNotesAPI();
  const [unreadCount, setUnreadCount] = useState(0);

const refreshUnreadCount = async () => {
  const data = await getNotificationCount();
  setUnreadCount(data);
};
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<SignPage />} />
        <Route path="/" element={<AppLayout unreadCount={unreadCount}/>}>
          <Route index element={ <HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/:userId" element={<UserProfilePage />} />
          <Route path="/notifications" element={<NotificationsPage refreshUnreadCount={refreshUnreadCount}/>} />
          <Route path="/suggestions" element={<SuggestionsList />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
