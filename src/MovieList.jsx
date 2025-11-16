import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MovieList = ({ title, endpoint }) => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNWQwM2ZmZTE3ZjhjNzM4MzU0ODU3NmMxZmQ0Njc5NSIsIm5iZiI6MTc1NDU0NDMzNC4wNTcsInN1YiI6IjY4OTQzOGNlMWQzNGY1MWY2Mzk5YTc3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.alDwkXuYavp6ZbZoVHtaJ1lpoJi4JyEUZT7VT_ho5hA'
    }
  };

  useEffect(() => {
    fetch(endpoint, options)
      .then(res => res.json())
      .then(data => {
        setMovies(data.results || []);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="mt-4">
      <h2 style={{ padding: '1rem' }}>{title}</h2>
      <div
        style={{
          width: '100%',
          padding: '1rem'
        }}
      >
        <div className="d-flex" style={{ overflowX: 'auto', gap: '1rem' }}>
          {movies.map(movie => (
            <div key={movie.id} style={{ minWidth: '160px' }}>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                className="img-fluid rounded"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/movie/${movie.id}`)}
              />
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                {movie.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
