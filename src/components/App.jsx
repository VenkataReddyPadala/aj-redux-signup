import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Signup";
import Profile from "./Profile";
import Nav from "./Nav";
import AppLayout from "./AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="signup" replace />} />
          <Route path="signup" element={<Signup />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<h1 className="content">404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
