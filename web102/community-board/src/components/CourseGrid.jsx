import React from "react";
import Course from "./Course"
import mlResources from "../mlresources";

const CourseGrid = () => {
    return (
        <div className="course-grid">
            {mlResources.map((course) => (
                <Course
                    key={course.name}
                    name={course.name}
                    description={course.description}
                    img={course.img}
                    url={course.url}
                />
            ))}
        </div>
    );
};

export default CourseGrid;