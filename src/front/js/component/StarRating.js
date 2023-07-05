import React, { useState } from 'react';

export const StarRating = ({ rating, editable, onRatingChange }) => {
    const [hoveredRating, setHoveredRating] = useState(0);
    const [currentRating, setCurrentRating] = useState(rating);

    const handleMouseEnter = (hoveredRating) => {
        if (editable) {
            setHoveredRating(hoveredRating);
        }
    };

    const handleMouseLeave = () => {
        if (editable) {
            setHoveredRating(0);
        }
    };

    const handleClick = (selectedRating) => {
        if (editable) {
            setCurrentRating(selectedRating);
            onRatingChange(selectedRating);
        }
    };

    const renderStar = (starPosition) => {
        const filledStarClass =
            (hoveredRating >= starPosition || currentRating >= starPosition
                ? 'fas'
                : 'far') + ' fa-star text-warning';

        return (
            <i
                className={filledStarClass}
                onMouseEnter={() => handleMouseEnter(starPosition)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(starPosition)}
                style={{ cursor: editable ? 'pointer' : 'auto' }}
            ></i>
        );
    };

    return (
        <div>
            {[1, 2, 3, 4, 5].map((position) => (
                <span key={position}>{renderStar(position)}</span>
            ))}
            <span className="ml-2">{currentRating}/5</span>
        </div>
    );
};

