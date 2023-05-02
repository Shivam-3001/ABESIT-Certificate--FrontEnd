import './App.css';
import CertificateForm from './components/CertificateForm';
import Logo from './assets/logo.png'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
function App() {
  return (
    <>
      <div className='header'>
        <img src={Logo} alt='logo' />
      </div>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<CertificateForm />} />
          <Route exact path="/admin" element={<Login />} />
          {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
    </>

  );
}

export default App;
