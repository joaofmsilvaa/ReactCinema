import React from "react";

export default function GenresFilters({ genres, setGenreFilter, genreFilter }) {
  
  function addGenreFilter(id) {
    if (genreFilter.includes(id.toString())) {
      const updatedGenreFilter = genreFilter
        .replace(`${id},` + "")
        .replace("undefined", "");
      setGenreFilter(updatedGenreFilter);
    } else {
      setGenreFilter(`${id},${genreFilter}`);
    }
  }

  return (
    <div className="genresFilterContainer">
      <div className="genreListFilter">
        {genres.map((genre) => (
          <div
            key={genre.id}
            className={`${
              genreFilter.includes(genre.id.toString())
                ? "genreCard-active"
                : "genreCard"
            }`}
            onClick={() => {
              addGenreFilter(genre.id);
            }}
          >
            {genre.name}
          </div>
        ))}
      </div>
    </div>
  );
}
