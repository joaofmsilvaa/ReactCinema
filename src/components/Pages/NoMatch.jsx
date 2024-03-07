import React from "react";

export default function NoMatch() {
  const onPage = {
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={onPage}>
      <h1>404 Page not found :(</h1>
    </div>
  );
}
