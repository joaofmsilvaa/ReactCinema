import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieRating from "../MovieRating";
import ReactVideoPlayer from "../ReactVideoPlayer";
import ReviewCard from "../ReviewCard";
import CastCard from "../CastCard";

export default function MovieInfos() {
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState({});
  const [videos, setVideos] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [rate, setRate] = useState(0);
  const [like, setLike] = useState(false);
  const [likeStatus, setLikeStatus] = useState({});

  const params = useParams();

  useEffect(() => {
    getDetails();
    getCredits();
    getVideos();
    getReviews();
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("session")) {
      movieStatus();
    }
  }, [like, likeStatus]);

  const apiKey = process.env.REACT_APP_APIKEY;

  const likeMovie = async () => {
    const sessionInfos = sessionStorage.getItem("session");
    let session = JSON.parse(sessionInfos);

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNmI2ZTMzYTQ2MDE3NDc3Mzg4ODMzZDk0ODRhYmQwNiIsInN1YiI6IjY0ZGEzM2VjZDEwMGI2MDBjNWQyOTg0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o4lhbA4TAsTs9AJ9rRUOkWIvrcvbejACHpNHp1026yE",
      },
      body: JSON.stringify({
        media_type: "movie",
        movie_id: params.id,
        favorite: !like,
      }),
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/account/${session.username}/favorite?session_id=${session.sessionId}`,
      options
    );

    const data = await response.json();

    setLikeStatus(data);
  };

  const getDetails = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNmI2ZTMzYTQ2MDE3NDc3Mzg4ODMzZDk0ODRhYmQwNiIsInN1YiI6IjY0ZGEzM2VjZDEwMGI2MDBjNWQyOTg0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o4lhbA4TAsTs9AJ9rRUOkWIvrcvbejACHpNHp1026yE",
      },
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${params.id}&api_key=${apiKey}`,
      options
    );

    const data = await response.json();
    setMovie(data);
  };

  const getVideos = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNmI2ZTMzYTQ2MDE3NDc3Mzg4ODMzZDk0ODRhYmQwNiIsInN1YiI6IjY0ZGEzM2VjZDEwMGI2MDBjNWQyOTg0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o4lhbA4TAsTs9AJ9rRUOkWIvrcvbejACHpNHp1026yE",
      },
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${params.id}/videos?language=en-US`,
      options
    );
    const data = await response.json();

    setVideos(data.results);
  };

  const getCredits = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNmI2ZTMzYTQ2MDE3NDc3Mzg4ODMzZDk0ODRhYmQwNiIsInN1YiI6IjY0ZGEzM2VjZDEwMGI2MDBjNWQyOTg0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o4lhbA4TAsTs9AJ9rRUOkWIvrcvbejACHpNHp1026yE",
      },
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=${apiKey}`,
      options
    );
    const data = await response.json();
    setCast(data.cast);
  };

  const getReviews = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNmI2ZTMzYTQ2MDE3NDc3Mzg4ODMzZDk0ODRhYmQwNiIsInN1YiI6IjY0ZGEzM2VjZDEwMGI2MDBjNWQyOTg0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o4lhbA4TAsTs9AJ9rRUOkWIvrcvbejACHpNHp1026yE",
      },
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${params.id}/reviews?language=en-US&page=1&api_key=${apiKey}`,
      options
    );

    const data = await response.json();
    setReviews(data.results);
  };

  const movieStatus = async () => {
    const sessionInfos = sessionStorage.getItem("session");
    let session = JSON.parse(sessionInfos);
    let sessionId = session.sessionId;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNmI2ZTMzYTQ2MDE3NDc3Mzg4ODMzZDk0ODRhYmQwNiIsInN1YiI6IjY0ZGEzM2VjZDEwMGI2MDBjNWQyOTg0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o4lhbA4TAsTs9AJ9rRUOkWIvrcvbejACHpNHp1026yE",
      },
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${Number(
        params.id
      )}/account_states?session_id=${sessionId}`,
      options
    );

    const data = await response.json();

    setRate(data.rated.value);
    setLike(data.favorite);
  };

  const rateMovie = async (value, movieId) => {
    let session = sessionStorage.getItem("session");
    let request = JSON.parse(session);
    let sessionId = request.sessionId;

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNmI2ZTMzYTQ2MDE3NDc3Mzg4ODMzZDk0ODRhYmQwNiIsInN1YiI6IjY0ZGEzM2VjZDEwMGI2MDBjNWQyOTg0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o4lhbA4TAsTs9AJ9rRUOkWIvrcvbejACHpNHp1026yE",
      },
      body: `{"value":${value.toString()}}`,
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?session_id=${sessionId}`,
      options
    );

    const data = await response.json();

    if (data.success) {
      alert(`Movie rated with the value of ${value}`);
    } else {
      alert(`There was an error rating this movie`);
    }
  };

  const movieBackdropImg = {
    backgroundSize: `cover`,
    backgroundPosition: `center center`,
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://image.tmdb.org/t/p/original/${movie.backdrop_path} `,
    backgroundRepeat: `no-repeat`,
    height: `fit-content`,
    display: `flex`,
    justifyContent: `center`,
  };

  function fixedDate() {
    if (movie.release_date) {
      return movie.release_date.toString().replaceAll("-", "/");
    }
  }

  console.log(reviews.length);
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div className="movieBackdrop" style={movieBackdropImg}>
        <div className="infos-card">
          <div className="infos-poster">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={`Poster for "${movie.title}"`}
            ></img>
          </div>
          <div className="infos">
            <div className="title-div">
              <h1 className="infos-title">
                {movie.title === movie.original_title
                  ? movie.title
                  : `${movie.title} (${movie.original_title})`}
              </h1>
              {sessionStorage.getItem("session") ? (
                <div className="infos-like" onClick={() => likeMovie()}>
                  <svg
                    className={`like-button ${like ? "active" : ""}`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"></path>
                  </svg>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="infosRateRelease">
              <MovieRating movie={movie} />
              <div className="date">{fixedDate()}</div>
            </div>
            {sessionStorage.getItem("session") != null ? (
              <div className="rateMovie">
                <input
                  className="ratingInput"
                  type="number"
                  max={10}
                  min={0}
                  value={rate}
                  onChange={(event) => {
                    setRate(parseInt(event.target.value));
                  }}
                ></input>
                <button
                  onClick={() => {
                    rateMovie(rate, Number(params.id));
                  }}
                >
                  Rate Movie
                </button>
              </div>
            ) : (
              <p>Log-in to rate this movie</p>
            )}

            <div className="genresDiv">
              {movie.genres != null &&
                movie.genres.map((genre) => (
                  <div className="genreCard" key={genre.id}>
                    {genre.name}
                  </div>
                ))}
            </div>

            {movie.tagline != "" ? (
              <i className="tagline">{movie.tagline}</i>
            ) : (
              ""
            )}

            {movie.overview != "" ? (
              <div>
                <h2 className="tagline">Synopsis</h2>
                <p className="infosDescription">{movie.overview}</p>
              </div>
            ) : (
              ""
            )}

            {movie.homepage != "" ? (
              <a className="homepage-a" target="_blank" href={movie.homepage}>
                VISIT HOMEPAGE
              </a>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <section className="infos-bottom" style={{ width: "90%" }}>
        <h2 className="sectionName">Main Cast</h2>

        <div className="castDiv">
          {cast.length > 0
            ? cast.map(
                (castPerson, index) =>
                  castPerson.profile_path != null && (
                    <CastCard key={index} castPerson={castPerson} />
                  )
              )
            : "Cast not found :("}
        </div>

        <h2 className="sectionName">Trailers</h2>
        <div className="videosDiv">
          {videos.length > 0
            ? videos.map((video) => {
                if (video.type === "Trailer") {
                  return (
                    <ReactVideoPlayer key={video.id} videoKey={video.key} />
                  );
                }
              })
            : "No videos found"}
        </div>

        <h2 className="sectionName review">Reviews</h2>
        <hr />
        <div className="reviewsDiv">
          {reviews.length > 0 && reviews.length < 5
            ? reviews.map((review, index) => {
                return <ReviewCard review={review} key={index} index={index} />;
              })
            : reviews.length > 5
            ? reviews.slice(0, 5).map((review, index) => {
                return <ReviewCard review={review} key={index} index={index} />;
              })
            : "No reviews yet"}
        </div>
      </section>
    </div>
  );
}
