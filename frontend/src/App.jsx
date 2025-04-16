import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Tvshows from './pages/Tvshows';
import Movies from './pages/Movies';
import Home from './pages/Home';
import Footer from './components/Footer';
import Login from './pages/Login';
import Mylist from './pages/Mylist';
import { useState, useEffect } from 'react';
import userContext from './contexts/userContext';
import { MovieProvider } from './contexts/moviesContext.jsx';
import { TvProvider } from './contexts/TvContext.jsx';


function App() {
  const [user, setuser] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    return storedUser || { id: "", name: "", email: "", isLoggedIn: false };
  });

  console.log(user);

  return (
    
      <BrowserRouter>
        <TvProvider>
        <MovieProvider>
        <userContext.Provider value={{ user, setuser}}>
        <Navbar /> 

        <Routes>
          <Route path="*" element={user.isLoggedIn ? <Navigate to="/browse" /> : <Navigate to="/signin" />} />
          {!user.isLoggedIn && <Route path="/signup" element={<Login useCase="Sign up" />} />}
          {!user.isLoggedIn && <Route path="/signin" element={<Login useCase="Sign in" />} />}
          {user.isLoggedIn && <Route path="/browse" element={<Home />} />}
          {user.isLoggedIn && <Route path="/TVshows" element={<Tvshows />} />}
          {user.isLoggedIn && <Route path="/Movies" element={<Movies />} />}
          {user.isLoggedIn && <Route path="/mylist" element={<Mylist />} />}
        </Routes>

        {user.isLoggedIn && <Footer />} 
      
        </userContext.Provider>
        </MovieProvider>
        </TvProvider>
      </BrowserRouter>
 
  );
}

export default App;
