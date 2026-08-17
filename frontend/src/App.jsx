import React, { useState } from 'react';
import Header from './Components/Header';
import Hero from './Components/Hero';
import About from './Components/About';
import Login from './Components/Login';
import Lenopage from './Components/Lenopage';
import Pricing from './Components/Pricing';

function App() {
  const [activeScreen, setActiveScreen] = useState('home');

  return (
    <>
      {activeScreen !== 'login' && <Header activeScreen={activeScreen} onNavigate={setActiveScreen} />}
      {activeScreen === 'about' ? (
        <About />
      ) : activeScreen === 'login' ? (
        <Login onLogin={setActiveScreen} />
      ) : activeScreen === 'leno' ? (
        <Lenopage onNavigate={setActiveScreen} />
      ) : (
        <>
          <Hero />
          <Pricing />
        </>
      )}
    </>
  );
}

export default App;
