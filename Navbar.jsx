import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Submissions.css';
import './Navbar.css';
function Navbar({ searchQuery, setSearchQuery, setSortBy }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    console.log(searchQuery)
    setSearchQuery(e.target.value);
  };

  const handleAllSubmission = () => {
    navigate('/Submissions');
  };

  const handleFavSubmissions = () => {
    navigate('/FavSubmissions');
  };
  const handleSort = (e) => {
    console.log(e.target.value);
    setSortBy(e.target.value);
  };

  return (
    <div className='container'>
      <nav className='navbar'>
        <div className='navbar__left'>
          <a
            className={`navbar__link ${location.pathname === '/Submissions' ? 'active' : ''
              }`}
            onClick={handleAllSubmission}
          >
            All Submissions
            {location.pathname === '/Submissions' && (
              <span className="underline"></span>
            )}
          </a>
          <a
            className={`navbar__link ${location.pathname === '/FavSubmissions' ? 'active' : ''
              }`}
            onClick={handleFavSubmissions}
          >
            Favorite Submissions
            {location.pathname === '/FavSubmissions' && (
              <span className="underline"></span>
            )}
          </a>
        </div>
        <div className='navbar__right'>
          <form className='navbar__search'>
            <input
              value={searchQuery}
              onChange={handleSearch}
              type='text'
              placeholder='Search...'
              className='navbar__search-input'
            />
            <select className='navbar__search-select' onChange={handleSort}>
              <option value='newest'>Newest</option>
              <option value='oldest'>Oldest</option>
            </select>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;


