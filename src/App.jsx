
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import MovieDetails from './MovieDetails';
import Navbar from './Navbar';
import Upcoming from './Upcoming';
import Trending from './Trending';
import VideoPage from './VideoPage';

function App() {
  
  return (
    <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/movie/:id" element={<MovieDetails/>} />
          <Route path="/upcoming" element={<Upcoming/>} />
          <Route path="/trending" element={<Trending/>} />
          <Route path="/movie/:id/videos" element={<VideoPage/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
