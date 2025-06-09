import React from "react";

const Course = ({ name, description, img, url }) => {
  const handleClick = () => {
    window.open(url, '_blank');
  }
  return (
    <div className="course-card">
      <div className="course-image-wrap">
        <img src={img} alt={name} className="course-image" />
      </div>
      <div className="course-info">
        <h5 className="course-title">{name}</h5>
        <p className="course-desc">{description}</p>
        <button
            className="course-button"
            onClick={handleClick}
        >
            View
        </button>
      </div>
    </div>
  );
};

export default Course;