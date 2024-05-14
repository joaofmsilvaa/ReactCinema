
export default function CastCard({castPerson}) {
  return (
    <div className="smallShadow">
      <img
        className="castImg"
        src={`https://image.tmdb.org/t/p/original${castPerson.profile_path}`}
        alt={castPerson.name}
      ></img>
      <div className="castInfo">
        <p className="castName">{castPerson.name}</p>
        <p className="characterName">{castPerson.character}</p>
      </div>
    </div>
  );
}
