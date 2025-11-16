import Footer from './Footer';
import MovieList from './MovieList';

const Trending = () => {
  return (
    <>
      <MovieList
        title="Trending Movies"
        endpoint="https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200"
      />
      <Footer /></>
  );
};

export default Trending;
