import logo from './logo.svg';
import './App.css';
import WorkersContainerComp from './WorkersContainerComp/WorkersContainerComp';
import NavbarComp from './NavbarComp/NavbarComp';

function App() {
 
  return (
    <div className="App">
      <NavbarComp></NavbarComp>
      <WorkersContainerComp />
    </div>
  );
}

export default App;
