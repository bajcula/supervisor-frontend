import logo from './logo.svg';
import './App.css';
import WorkersContainerComp from './WorkersContainerComp/WorkersContainerComp';
import NavbarComp from './NavbarComp/NavbarComp';
import FooterComp from './FooterComp/FooterComp';

function App() {
  return (
    <div className="App">
      <NavbarComp></NavbarComp>
      <WorkersContainerComp />
      <FooterComp></FooterComp>
    </div>
  );
}

export default App;
