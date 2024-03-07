import React from "react";
import { CSSTransition } from "react-transition-group";

export default function Card({
  movie,
  movies,
  getGenreById,
}) {
  function fixedDate() {
    if (movie.release_date) {
      return movie.release_date.toString().replaceAll("-", "/");
    }
  }

  return (
    <CSSTransition
      in={movies.length > 0}
      timeout={300}
      classNames="slide-vertical"
      unmountOnExit
    >
      <div className="card" key={movie.id}>
        <div className="image-div">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt="Movie-poster"
            onError={(event) => {
              event.target.src =
                "https://cdni.iconscout.com/illustration/free/thumb/free-error-2103590-1768082.png";
            }}
          />
        </div>
        <div>
          <div className="top-div">
            <a href={`/movies/${movie.id}`} className="title">
              {movie.title}
            </a>

            <div className="genresDiv">
              {movie.genre_ids.map((genre_ids) => (
                <div className="genre" key={genre_ids}>
                  {getGenreById(genre_ids)}
                </div>
              ))}
            </div>

            <div className="infos-div">
              <p className="description-div">{movie.overview}</p>
            </div>
            <div className="date">
              <div>{fixedDate()}</div>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}
