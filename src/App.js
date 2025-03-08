import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Properties from './pages/Properties';
import Contact from './pages/Contact';
import PropertyDetails from './pages/PropertyDetails';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/authentication/Login';
import Register from './pages/authentication/Register';
import MyProperties from './pages/admin/MyProperties';

export const AuthContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <div className="App">
          <NavigationBar />
          <main className="my-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/properties/:id" element={<PropertyDetails />} />
              <Route path="/MyProperties" element={<MyProperties />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;