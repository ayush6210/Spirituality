import React from "react";

const VideoGrid = ({ videos, onSelectVideo }) => {
  return (
    <div className="video-grid">
      {videos.map((video) => (
        <div
          key={video.id}
          className="video-card"
          onClick={() => onSelectVideo(video)}
        >
          <iframe
            src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
            title={video.snippet.title}
            allowFullScreen
          ></iframe>
          <h3>{video.snippet.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;
