import { useEffect, useState } from "react";
import "../../App.css";
import List from "../list";
import Search from "../Search";
import NotFound from "../NotFound";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Paginator from "../Paginator";
import Filters from "../Filters";
import GenresFilters from "../GenresFilters";
import useLocalStorage from "../../Hooks/useLocalStorage";

function HomePage() {
  const [numOfPages, setNumOfPages] = useState(1);
  const [genres, setGenres] = useLocalStorage("genres", []);
  const [genreFilter, setGenreFilter] = useState("");
  const [flag, setFlag] = useState(false);
  const [showLiked, setShowLiked] = useState(false);
  const [movies, setMovies] = useLocalStorage("movies", []);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useLocalStorage("filter", "");

  const apiKey = process.env.REACT_APP_APIKEY;

  useEffect(() => {
    if (filter.length > 0) {
      /* If the user dosen't want to see the liked movies and is 
        searching for something just return the searched movies
      */
      if (!showLiked) {
        searchMovies();
      } else if (
        /* If the user wants to see the liked movies, is logged 
        and is searching for something return the liked movies 
        ( they retrived in the getLiked method and filtered in the
          "filterSearch" method )
      */
        showLiked &&
        JSON.stringify(sessionStorage.getItem("session"))
      ) {
        getLiked();
      }
    } else {
      /* If the user isn't searching for anything and dosen't want
        to see the liked movies
      */
      if (!showLiked) {
        /* If the url dosen't contains a page number or its not a
          number just get the first page of movies 
        */
        if (page < 1) {
          getMovies(1);
        } else {
          /* Otherwise get the movies in the given page */
          getMovies(page + 1);
        }
      } else {
        /* If the user dosen't want to search anything and wants the
        liked movies just execute the "getLiked" method */
        getLiked();
      }
    }

    getGenres();
  }, [showLiked, filter, page, flag, genreFilter]);

  const getMovies = async (page) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNmI2ZTMzYTQ2MDE3NDc3Mzg4ODMzZDk0ODRhYmQwNiIsInN1YiI6IjY0ZGEzM2VjZDEwMGI2MDBjNWQyOTg0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o4lhbA4TAsTs9AJ9rRUOkWIvrcvbejACHpNHp1026yE",
      },
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}&with_genres=${genreFilter},`,
      options
    );
    const data = await response.json();
    setMovies(data.results);
    if (data.total_pages > 500) {
      setNumOfPages(500);
    } else {
      setNumOfPages(data.total_pages);
    }
  };

  const getGenres = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNmI2ZTMzYTQ2MDE3NDc3Mzg4ODMzZDk0ODRhYmQwNiIsInN1YiI6IjY0ZGEzM2VjZDEwMGI2MDBjNWQyOTg0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o4lhbA4TAsTs9AJ9rRUOkWIvrcvbejACHpNHp1026yE",
      },
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${apiKey}`,
      options
    );
    const data = await response.json();
    setGenres(data.genres);
  };

  const getLiked = async () => {
    const sessionInfos = sessionStorage.getItem("session");
    let session = JSON.parse(sessionInfos);

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNmI2ZTMzYTQ2MDE3NDc3Mzg4ODMzZDk0ODRhYmQwNiIsInN1YiI6IjY0ZGEzM2VjZDEwMGI2MDBjNWQyOTg0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o4lhbA4TAsTs9AJ9rRUOkWIvrcvbejACHpNHp1026yE",
      },
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/account/${session.username}/favorite/movies?language=en-US&page=1&sort_by=created_at.asc&api_key=${apiKey}&session_id=${session.sessionId}`,
      options
    );

    const data = await response.json();
    if (genreFilter.length > 0 || filter.length > 0) {
      filterSearch(data.results);
    } else {
      setMovies(data.results);
    }

    if (data.total_pages > 500) {
      setNumOfPages(500);
    } else {
      setNumOfPages(data.total_pages);
    }
  };

  const searchMovies = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNmI2ZTMzYTQ2MDE3NDc3Mzg4ODMzZDk0ODRhYmQwNiIsInN1YiI6IjY0ZGEzM2VjZDEwMGI2MDBjNWQyOTg0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o4lhbA4TAsTs9AJ9rRUOkWIvrcvbejACHpNHp1026yE",
      },
    };

    if (filter.trim().length > 0) {
      let data = "";

      if (page == 0) {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${filter}&page=1`,
          options
        );

        data = await response.json();
      } else {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${filter}&page=${page}`,
          options
        );

        data = await response.json();
      }

      if (genreFilter.length > 0 || filter.length > 0) {
        filterSearch(data.results);
      } else {
        setMovies(data.results);
      }

      if (data.total_pages > 500) {
        setNumOfPages(500);
      } else {
        setNumOfPages(data.total_pages);
      }
    }
  };

  function filterSearch(movies) {
    let genreFilteredArr = genreFilter.split(",");
    genreFilteredArr.pop();

    let result = movies;

    if (genreFilteredArr.length > 0 && filter.length < 1) {
      result = result.map((movie) => {
        if (
          movie.genre_ids
            .sort()
            .toString()
            .includes(genreFilteredArr.sort().toString())
        ) {
          return movie;
        }
      });
    }
    if (genreFilteredArr.length > 0 && filter.length > 0) {
      result = result.map((movie) => {
        if (
          movie.genre_ids
            .sort()
            .toString()
            .includes(genreFilteredArr.sort().toString()) &&
          movie.title.toLowerCase().includes(filter.toLowerCase())
        ) {
          return movie;
        }
      });
    }
    if (genreFilteredArr.length < 1 && filter.length > 0) {
      result = result.map((movie) => {
        if (
          movie.title
            .toLowerCase()
            .replaceAll(" ", "+")
            .includes(filter.toLowerCase().replaceAll(" ", ""))
        ) {
          return movie;
        }
      });
    }

    result = result.filter(function (element) {
      return element !== undefined;
    });

    setMovies(result);
  }

  function getGenreById(id) {
    return genres.filter((genre) => genre.id.toString() === id.toString())[0]
      .name;
  }

  return (
    <div>
      <header className="App-header">
        <h1 className="pagetitle">ReactCinema</h1>
        <p className="mediumText">Your Companionship For Movie Nights</p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            width: "100%",
          }}
        >
          <Search filter={filter} setFilter={setFilter} />
          {!JSON.parse(sessionStorage.getItem("session")) ? (
            <p className="notLoggedMessage">Log-in to see your liked movies</p>
          ) : (
            <Filters showLiked={showLiked} setShowLiked={setShowLiked} />
          )}
        </div>

        <GenresFilters
          genres={genres}
          setGenreFilter={setGenreFilter}
          genreFilter={genreFilter}
        />
      </header>

      <section>
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={movies.length}
            timeout={200}
            classNames="slide-vertical"
            unmountOnExit
            className="list-container"
          >
            {movies.length > 0 ? (
              <div>
                <List movies={movies} getGenreById={getGenreById} />
                <Paginator setPage={setPage} numOfPages={numOfPages} />
              </div>
            ) : (
              <NotFound />
            )}
          </CSSTransition>
        </SwitchTransition>
      </section>
    </div>
  );
}

export default HomePage;
