// 
import Footer from "./Footer";
import HomeShow from "./HomeShow";

const Home = () => {
  return (
    <div>
      <HomeShow
        title="Popular Movies"
        endpoint="https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc"
      />
      <HomeShow
        title="Trending Movies"
        endpoint="https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200"
      />
      <HomeShow
        title="Upcoming Movies"
        endpoint="https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}"
      />
      <Footer/>
    </div>
  );
};

export default Home;
