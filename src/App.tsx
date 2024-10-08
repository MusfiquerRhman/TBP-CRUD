import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AllProducts, Create, Delete, LoginPage, Update } from './pages';

const isAuthenticated = () => {
  const localData = localStorage.getItem('userInformation');

  if(localData === null) return false;

  return !!JSON.parse(localData)?.user.token;
}

function App() {
  const isLoggedIn = isAuthenticated();

  return (
    <BrowserRouter>
      {isLoggedIn ? (
        <Routes>
          <Route path="/" element={<AllProducts />} />
          <Route path="/create" element={<Create />} />
          <Route path="/update" element={<Update />} />
          <Route path="/delete" element={<Delete />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      )}
    </BrowserRouter>
  )
}

export default App
