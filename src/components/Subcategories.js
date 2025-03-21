import React from "react";

const Subcategories = ({ subcategories, onSelectSubcategory }) => {
  return (
    <div className="subcategories">
      {Object.keys(subcategories).map((subcategory) => (
        <button
          key={subcategory}
          className="subcategory-button"
          onClick={() => onSelectSubcategory(subcategories[subcategory])}
        >
          {subcategory}
        </button>
      ))}
    </div>
  );
};

export default Subcategories;
