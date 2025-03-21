import React from "react";

const VideoPlayer = ({ video }) => {
  if (!video) {
    // Return an empty fragment if no video is selected to avoid showing "Loading video..."
    return <></>;
  }

  const videoId = video.snippet.resourceId
    ? video.snippet.resourceId.videoId
    : video.id.videoId;

  return (
    <div className="video-player-container">
      <div className="video-player">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          title={video.snippet.title}
        ></iframe>
      </div>
      <div className="video-info">
        <h3>{video.snippet.title}</h3>
       
      </div>
    </div>
  );
};

export default VideoPlayer;
