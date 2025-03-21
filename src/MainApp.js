import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import Subcategories from "./components/Subcategories";
import VideoGrid from "./components/VideoGrid";
import VideoPlayer from "./components/VideoPlayer";
import Footer from "./components/Footer";
import Quiz from "./components/Quiz"; // Import the Quiz component
import "./styles.css";
import AboutUs from "./components/AboutUs";

const MAIN_API_KEY = "AIzaSyCe9OY4__e56AwQ9pa8PV3f0qoxK69ey5E"; // Replace with your main API key
const MAIN_CATEGORY_PLAYLISTS = {
  "Purpose of Human Life": "PLnLHUwsab6ZOz7wChgbPsTOVWu78qAIXi",
  "Does God exist?": "PLnLHUwsab6ZPC_NT8HeVXUp5Oq9h3z6Wg",
  "Why bad things happen to good people and vice-versa?": "PLnLHUwsab6ZM7mNfB7jwi2UHrevsUshsI",
  "What is material and spiritual nature?": "PLnLHUwsab6ZP_ue1vnknPEW68A485h7g1",
  "What is evolution?": "PLnLHUwsab6ZPYBUN-nhY9kf2GJHlkuvX4",
  "Do materialistic things hold importance in our life?": "PLnLHUwsab6ZMkcMsn79xHaDEgH_y1epoS",
  "What is action, forbidden action and inaction?": "PLnLHUwsab6ZNtK2dwaqIar2SGQATq9iqy",
  "What is Dharma or religion or moral codes?": "PLnLHUwsab6ZMmxCufpySqLcs9kmVoNrWo",
  "Difference between living beings and God?": "PLnLHUwsab6ZN-aMXUtUieunxDhjNtKwVF",
  "Who guides our destiny?": "PLnLHUwsab6ZMHEP86E7RjeVrRVceuX2aB",
  "Who am I?": "PLnLHUwsab6ZN8-Br5OPh_ocfdMAbW-sOX",
  "What is consciousness?": "PLnLHUwsab6ZPwOFpFPYqEkA6kwBTdr1Nb",
  "Connection between science and spirituality.": "PLnLHUwsab6ZPX6gVkWVgQYLLlcXOWf36P",
  "What is the time factor?": "PLnLHUwsab6ZOTjiz5gHKNuthdOK6XqQba",
  "Nature of this world and beyond this world.": "PLnLHUwsab6ZP-in4k65mWLKIkwM670jCs",
};

const MainApp = () => {
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState(null);
  const [nextPageToken, setNextPageToken] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showCategories, setShowCategories] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false); // State to show/hide quiz instructions
  const [quizStarted, setQuizStarted] = useState(false); // Track quiz start

  // Fetch videos from a playlist
  const fetchVideos = async (playlistId, pageToken = "") => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=6&pageToken=${pageToken}&key=${MAIN_API_KEY}`
      );
      setVideos((prev) => [...prev, ...response.data.items]);
      setNextPageToken(response.data.nextPageToken || "");
    } catch (error) {
      console.error("Error fetching videos:", error.response?.data || error.message);
    }
  };

  // Fetch a random video
  const fetchRandomVideo = async () => {
    try {
      const playlists = Object.values(MAIN_CATEGORY_PLAYLISTS);
      const randomPlaylist = playlists[Math.floor(Math.random() * playlists.length)];
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${randomPlaylist}&maxResults=1&key=${MAIN_API_KEY}`
      );
      if (response.data.items.length > 0) {
        setSelectedVideo(response.data.items[0]);
        setVideos([]); // Clear the videos when selecting a random video
      }
    } catch (error) {
      console.error("Error fetching random video:", error.response?.data || error.message);
    }
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    if (typeof MAIN_CATEGORY_PLAYLISTS[category] === "object") {
      setSubcategories(MAIN_CATEGORY_PLAYLISTS[category]);
    } else {
      setSelectedCategory(category);
      setSubcategories(null);
      setSelectedVideo(null);
      setVideos([]);
      fetchVideos(MAIN_CATEGORY_PLAYLISTS[category]);
    }
    setShowCategories(false);
  };

  // Handle subcategory selection
  const handleSubcategorySelect = (playlistId) => {
    setSelectedVideo(null);
    setVideos([]);
    fetchVideos(playlistId);
  };

  // Handle showing quiz instructions
  const handleQuizClick = () => {
    setShowInstructions(true); // Show instructions when quiz is clicked
  };

  const startQuiz = () => {
    setQuizStarted(true); // Begin the quiz
    setShowInstructions(false); // Hide instructions
  };
  
  const handleAboutUsClick = () => {
    setShowAboutUs(true);
    setVideos([]);
    setSelectedVideo(null);
  };

  // Infinite scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        nextPageToken
      ) {
        fetchVideos(MAIN_CATEGORY_PLAYLISTS[selectedCategory], nextPageToken);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [nextPageToken, selectedCategory]);

  // Load a random video on initial render
  useEffect(() => {
    fetchRandomVideo();
  }, []);

  return (
    <div className="MainApp">
      <Navbar
         onHomeClick={() => {
          setShowAboutUs(false);
          fetchRandomVideo();
        }}
        onToggleCategories={() => setShowCategories((prev) => !prev)}
        onQuizClick={handleQuizClick}
        onAboutUsClick={handleAboutUsClick}// Pass handleQuizClick to Navbar
      />
      {showAboutUs && <AboutUs />}

      {/* Show the categories or subcategories */}
      {showCategories && !subcategories && (
        <Categories
          categories={MAIN_CATEGORY_PLAYLISTS}
          onSelectCategory={handleCategorySelect}
        />
      )}
      {subcategories && (
        <Subcategories
          subcategories={subcategories}
          onSelectSubcategory={handleSubcategorySelect}
        />
      )}

      {/* Main Content */}
      <main>
        {quizStarted ? (
          <Quiz /> // If quiz has started, render the Quiz component
        ) : (
          <>
            <VideoPlayer video={selectedVideo} />
            <VideoGrid videos={videos} onSelectVideo={setSelectedVideo} />
          </>
        )}
      </main>

      {/* Show instructions when the state is set to true */}
      {showInstructions && (
        <div className="quiz-instructions-modal">
          <div className="quiz-instructions-box">
            <h2>Quiz Instructions</h2>
            <p>
            1. Watch the videos related to all categories.<br />
            2. After watching the video, answer the questions that follow.<br />
            3. To Avail Certificate, score more than 90% .<br />
            4. Enjoy and learn!    
            </p>
            <button onClick={startQuiz}>Start Quiz</button>
          </div>
        </div>
      )}




      <Footer />
    </div>
  );
};

export default MainApp;
