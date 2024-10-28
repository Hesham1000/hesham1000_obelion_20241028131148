import React from 'react';
import Header from './Header';
import Footer from './Footer';
import RegistrationForm from './components/RegistrationForm.js';
import LoginForm from './components/LoginForm.js';


function App() {
  return (
    <div className="App">
      <Header />
      <RegistrationForm />
      <LoginForm />
      <Footer />
    </div>
  );
}

export default App;
