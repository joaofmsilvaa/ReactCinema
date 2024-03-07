import React, { useState } from "react";
import ReactPlayer from "react-player";

export default function ReactVideo(props) {
  const key = props.key;
  const platform = props.platform;
  const { baseURL, setBaseURL } = useState("");

  return (
    <div>
      {platform === "Youtube"
        ? setBaseURL("https://www.youtube.com/watch?v")
        : setBaseURL("https://vimeo.com/")}
      <ReactPlayer url={baseURL + key} />
    </div>
  );
}
