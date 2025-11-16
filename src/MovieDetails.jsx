import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './App.css';
import { Rating } from '@mui/material';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userMobile, setUserMobile] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [savedRating, setSavedRating] = useState(0);
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
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then(res => res.json())
      .then(data => {
        setMovie(data);
      })
      .catch(err => console.error(err));

    const storedRating = sessionStorage.getItem(`rating_${id}`);
    if (storedRating) {
      setSavedRating(Number(storedRating));
    }
  }, [id]);

  const handleRateClick = () => {
    if (sessionStorage.getItem("Details")) {
      setShowRatingModal(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (userEmail || userMobile) {
      setShowLoginModal(false);
      setShowRatingModal(true);
      sessionStorage.setItem("Details", (userEmail || userMobile));
    } else {
      alert('Please enter either email or mobile number');
    }
  };

  const handleRatingSubmit = async () => {
    if (userRating > 0) {
      try {
        const ratingData = {
          value: 5
        };
        await fetch(`https://api.themoviedb.org/3/movie/${id}/rating`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNWQwM2ZmZTE3ZjhjNzM4MzU0ODU3NmMxZmQ0Njc5NSIsIm5iZiI6MTc1NDU0NDMzNC4wNTcsInN1YiI6IjY4OTQzOGNlMWQzNGY1MWY2Mzk5YTc3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.alDwkXuYavp6ZbZoVHtaJ1lpoJi4JyEUZT7VT_ho5hA'
          },
          body: JSON.stringify(ratingData)
        });
        setSavedRating(userRating);
        sessionStorage.setItem(`rating_${id}`, userRating);
        setShowRatingModal(false);
        setUserRating(0);
        alert('Rating saved successfully!');

      } catch (error) {
        alert('Error saving rating', error);
        setSavedRating(userRating);
        setShowRatingModal(false);
        setUserRating(0);
      }
    } else {
      alert('Please select a rating');
    }
  };

  if (!movie) return <div className="p-4" style={{ fontSize: '20px' }}>Loading...</div>;

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-4">
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-8">
          <h2>{movie.title}</h2>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
          {(savedRating > 0 || sessionStorage.getItem(`rating_${id}`)) && (
            <p>
              <strong>Your Rating:</strong>
              <p style={{ margin: 0 }}><Rating value={savedRating} readOnly size="md" color="yellow" /></p>
              <p>({savedRating}/5)</p>
            </p>
          )}
          <p><strong>Overview:</strong></p>
          <p>{movie.overview}</p>
          {movie.genres && (
            <p>
              <strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}
            </p>
          )}
          <div className="mt-3" style={{ display: "flex", gap: '10px' }}>
            <button
              className="btn btn-primary me-3"
              onClick={() => navigate(`/movie/${id}/videos`)}
            >
              Watch Videos
            </button>
            <button
              className="btn btn-warning"
              onClick={handleRateClick}
            >
              {(savedRating > 0 || sessionStorage.getItem(`rating_${id}`)) ? 'Update Rating' : 'Rate Movie'}
            </button>
          </div>
        </div>
      </div>
      <div
        className={`modal fade ${showLoginModal ? 'show' : ''}`}
        style={{ display: showLoginModal ? 'block' : 'none', zIndex: 1060 }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Login to Rate</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  setShowLoginModal(false);
                  setUserEmail('');
                  setUserMobile('');
                }}
                aria-label="Close"
              >X</button>
            </div>
            <form onSubmit={handleLogin}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">Mobile Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="mobile"
                    value={userMobile}
                    onChange={(e) => setUserMobile(e.target.value)}
                    placeholder="Enter your mobile number"
                  />
                </div>
                <p className="text-muted small">Please provide either email or mobile number to continue.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowLoginModal(false);
                    setUserEmail('');
                    setUserMobile('');
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showLoginModal && <div className="modal-backdrop fade show" style={{ zIndex: 1059 }}></div>}
      <div
        className={`modal fade ${showRatingModal ? 'show' : ''}`}
        style={{ display: showRatingModal ? 'block' : 'none', zIndex: 1060 }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Rate "{movie.title}"</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  setShowRatingModal(false);
                  setUserRating(0);
                }}
                aria-label="Close"
              >X</button>
            </div>
            <div className="modal-body text-center">
              <p>How would you rate this movie?</p>
              <div className="rating-container mb-3" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '10px',
                position: 'relative',
                zIndex: 1070
              }}>
                <div style={{ pointerEvents: 'auto', position: 'relative', zIndex: 1071 }}>
                  <Rating
                    value={userRating}
                    onChange={(event, newValue) => {
                      setUserRating(newValue);
                    }}
                    size="xl"
                    color="yellow"
                    count={5}
                  />
                </div>
                {userRating > 0 && (
                  <p className="text-muted mb-0">
                    {userRating} out of 5 stars
                  </p>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setShowRatingModal(false);
                  setUserRating(0);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleRatingSubmit}
                disabled={userRating === 0}
              >
                Save Rating
              </button>
            </div>
          </div>
        </div>
      </div>
      {showRatingModal && <div className="modal-backdrop fade show" style={{ zIndex: 1059 }}></div>}
    </div>
  );
};

export default MovieDetails;