import React from 'react';
import { Bell, User } from 'lucide-react'; // Import User icon for profile
import { Link } from 'react-router-dom'; // Assuming you're using React Router

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        {/* Your logo or brand name */}
        <h2>MoveWell</h2>
      </div>
      <div className="navbar-right">
        <div className="notification-bell">
          <Bell size={20} />
        </div>
        <div className="profile-icon">
          <Link to="/profile">
            <User size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;