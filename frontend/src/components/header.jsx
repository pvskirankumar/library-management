import React from "react";

export const Header = ({ onBooksClick, loggedIn, toggleLogin }) => {
    return (
        <header className="flex justify-between items-center bg-blue-600 text-white px-6 py-4 shadow-md">
          <div>
            <button onClick={onBooksClick} className="text-lg font-semibold hover:underline">
              Books
            </button>
          </div>
          <div>
            <button onClick={toggleLogin} className="bg-white text-blue-600 px-4 py-1 rounded-md hover:bg-gray-200">
              {loggedIn ? "Logout" : "Login"}
            </button>
          </div>
        </header>
      );
};

export default Header;