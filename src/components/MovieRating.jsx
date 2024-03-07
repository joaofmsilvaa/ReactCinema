import React from "react";

export default function MovieRating(props) {
    const movie = props.movie;

    function fixedAverage(){
        return Number(movie.vote_average).toFixed();
    }

    function voteColor(vote_average){
        const numVoteaverage = fixedAverage(vote_average);
        if(numVoteaverage <= 3){
            return "rating-div-low";
        }
        else if(numVoteaverage <= 6){
            return "rating-div-med";
        }
        else{
            return "rating-div-hight";
        }
    }

  return (
    <div
      className={`rating-div ${voteColor(movie.vote_average)}`}
    >
      <span className="rating">{fixedAverage(movie.vote_average)}/10</span>
    </div>
  );
}
