import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Pages/Home/Home';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import { Toaster } from 'react-hot-toast';
import NotFound from './components/Pages/NotFound/NotFound';
import Register from './components/Pages/Authentication/Register';
import Login from './components/Pages/Authentication/Login';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster />
      <Footer />
    </>
  );
}

export default App;
