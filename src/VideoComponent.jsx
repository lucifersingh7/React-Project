import { useEffect, useState } from "react";

export default function VideoComponent({ movieId }) {
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchVideos = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          {
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNWQwM2ZmZTE3ZjhjNzM4MzU0ODU3NmMxZmQ0Njc5NSIsIm5iZiI6MTc1NDU0NDMzNC4wNTcsInN1YiI6IjY4OTQzOGNlMWQzNGY1MWY2Mzk5YTc3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.alDwkXuYavp6ZbZoVHtaJ1lpoJi4JyEUZT7VT_ho5hA",
            },
          }
        );
        const data = await res.json();
        setVideos(data.results || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchVideos();
  }, [movieId]);


  return (
    <div>
      {videos === undefined || videos === null ? (
        <p>Loading videos...</p>
      ) : videos.length > 0 ? (
        videos.map((video) => (
          <div key={video.id}>
            <h4>{video.name}</h4>
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${video.key}`}
              title={video.name}
            ></iframe>
          </div>
        ))
      ) : (
        <p>No videos found</p>
      )}
    </div>
  );
}
