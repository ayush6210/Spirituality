import React from "react";

const Categories = ({ categories, onSelectCategory }) => {
  return (
    <div className="categories-container">
      {Object.keys(categories).map((category) => (
        <button
          key={category}
          className="category-button"
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Categories;
