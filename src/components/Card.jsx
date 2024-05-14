import React from "react";
import { CSSTransition } from "react-transition-group";

export default function Card({ movie, movies, getGenreById }) {
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
                
                <div key={genre_ids} 
                 className={`genreCard ${getGenreById(genre_ids) == 'Science Fiction' && 'fontSmall'}`}
                >

                  {getGenreById(genre_ids)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}
