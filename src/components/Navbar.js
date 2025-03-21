import React from "react";

const Navbar = ({ onHomeClick, onToggleCategories, onQuizClick, onAboutUsClick }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="home-button" onClick={onHomeClick}>
          Home
        </button>
        <button className="categories-toggle" onClick={onToggleCategories}>
          Categories
        </button>
      </div>
      <h1 className="navbar-title">Adhyatma Setu</h1>
      <div className="navbar-right">
        <button className="take-quiz-button" onClick={onQuizClick}>
          Take Quiz
        </button>
        <button className="take-quiz-button" onClick={onAboutUsClick}>
          About Us
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
