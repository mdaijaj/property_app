import './App.css';
import Routing from './component/menubar'
import Navbar from './component/navbar'

const App=()=> {


  return (
    <>
    <div className="App">
      <Navbar/>
      <Routing/>
    </div>
    </>
  );
}

export default App;



