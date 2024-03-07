import React from "react";

export default function CastCard({castIndex}) {
  return (
    <div>
      <img
        className="castImg"
        src={`https://image.tmdb.org/t/p/original${castIndex.profile_path}`}
        alt={castIndex.name}
      ></img>
      <div className="castInfo">
        <p className="castName">{castIndex.name}</p>
        <p className="characterName">{castIndex.character}</p>
      </div>
    </div>
  );
}
