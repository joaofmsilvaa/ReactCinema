import React from "react";

export default function Search({ filter, setFilter }) {
  return (
    <div className="search-div">
      <div className="search-button" onClick={() => {}}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
        </svg>
      </div>

      <input
        onChange={(event) => {
          setFilter(event.target.value.replaceAll(" ", "+"));
        }}
        name="title"
        className="searchBar"
        type="text"
        placeholder={"Search"}
        value={filter.replaceAll("+", " ")}
      />
    </div>
  );
}
