import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import user from '../../assets/users/user-06.png';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
const DropdownUser = () => {


  const [profile, setProfile] = useState([]); 

  const fetchProfile = async () => {
      try {
          const response = await axios.get("http://localhost:8000/api/auth/profile", {
              withCredentials: true,
          });
          setProfile(response.data);
      } catch (error) {
          console.error("Error fetching Profile:", error);
      }
  };

  const { auth } = useContext(AuthContext);


  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie('jwt');
    navigate('/');
  };



  useEffect(() => {
    fetchProfile();
}, [auth.token, cookies.jwt]);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="flex items-center justify-between w-full rounded-md  px-4 py-2 bg-white text-sm font-medium text-gray-700 "
          onClick={toggleDropdown}
        >
          <img
            src={profile.profilePicture || user} 
            alt="User Avatar"
            className="h-8 w-8 rounded-full mr-2"
          />
          <span>{profile.firstname}</span>
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <Link
              to="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Profile
            </Link>
            <Link
              to="/settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Settings
            </Link>
            <Link
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Logout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownUser;
