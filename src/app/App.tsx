import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignPage from "./pages/Auth/SignPage";
import { AppLayout } from "./layout/AppLayout";
import HomePage from "./pages/HomePage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<SignPage />} />
        <Route path="/" element={<AppLayout />}>
         <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
