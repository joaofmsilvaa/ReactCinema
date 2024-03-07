import React from "react";
import Card from "./Card";

export default function List({ movies, getGenreById }) {
  return (

    <div className="list">
      {movies.map((movie) => (
        <Card
          key={movie.id}
          movie={movie}
          movies={movies}
          getGenreById={getGenreById}
        />
      ))}
    </div>
  );
}
