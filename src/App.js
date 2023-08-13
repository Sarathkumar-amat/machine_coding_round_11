import './App.css';
import {Routes,Route} from "react-router-dom";
import { MovieListing } from './pages/MovieListing';
import { WatchLater } from './pages/WatchLater';
import { NavBar } from './components/NavBar';
import { MovieDetails } from './pages/MovieDetails';

function App() {
  return (
    <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<MovieListing />} />
          <Route path="watchLater" element={<WatchLater />} />
          <Route path="/movieDetails/:movieId" element={<MovieDetails />} />
          
        </Routes>
    </div>
  );
}

export default App;
