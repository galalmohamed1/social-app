import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignPage from "./pages/Auth/SignPage";
import { AppLayout } from "./layout/AppLayout";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import NotificationsPage from "./pages/NotificationsPage";
import { ToastContainer } from "react-toastify";
import SuggestionsList from "./pages/SuggestionsList";
function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<SignPage />} />
        <Route path="/" element={<AppLayout />}>
          <Route index element={ <HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/suggestions" element={<SuggestionsList />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
