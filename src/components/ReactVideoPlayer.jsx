import React, { useState } from "react";
import ReactPlayer from "react-player";

export default function ReactVideoPlayer({videoKey}) {

  return (
    <div>
      <ReactPlayer url={`https://www.youtube.com/watch?v=${videoKey}`} />
    </div>
  );
}
