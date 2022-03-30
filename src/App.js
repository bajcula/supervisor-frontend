import { Outlet } from 'react-router-dom';
import './App.css';
import FooterComp from './FooterComp/FooterComp';
import NavbarComp from './NavbarComp/NavbarComp';

function App() {
  return (
    <div className="App">
      <NavbarComp></NavbarComp>
      <Outlet></Outlet> 
      <FooterComp></FooterComp> 
    </div>
  );
}

export default App;
