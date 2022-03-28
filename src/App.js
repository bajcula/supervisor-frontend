import logo from './logo.svg';
import './App.css';
import WorkersContainerComp from './WorkersContainerComp/WorkersContainerComp';

function App() {
 
  return (
    <div className="App">
      <h1 id='title'><b>SUPERVISOR</b></h1>
      <h2>A place for all your supervising needs.</h2>
      <WorkersContainerComp />
    </div>
  );
}

export default App;
