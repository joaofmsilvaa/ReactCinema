import React from "react";

export default function ReviewCard({review}) {
  return (
    <div className="reviewCard">
      <div className="authorDetails">
        <img
          src={
            review.author_details.avatar_path != null
              ? `https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}}`
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
          }
        ></img>
        <div>
          <p className="reviewAuthor">{review.author}</p>
          <p className="reviewRating">
            Rating: <span>{review.author_details.rating}</span>
          </p>
        </div>
      </div>

      <div className="reviewComment">{review.content}</div>
    </div>
  );
}
