
import React from 'react';

const Header: React.FC = () => {
    return (
        <div className="header">
            <h1>Trip 1</h1>
            <div className="trip-info">
                <span>From IGI Airport, T3</span>
                <span>To Sector 28</span>
            </div>
            <div className="options">
                <button>...</button>
            </div>
        </div>
    );
};

export default Header;
