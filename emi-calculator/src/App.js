import HomePage from './Components/HomePage';
import './App.css';
import { intialLizeFirebase } from './firebase';
intialLizeFirebase();
function App() {
  return (
    <div className='App'>
      <HomePage />
    </div>
  );
}

export default App;
