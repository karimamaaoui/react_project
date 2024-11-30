import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaChartBar, FaEye, FaShoppingCart, FaUserFriends } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { useCookies } from 'react-cookie';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;
  const { auth } = useContext(AuthContext);
  const [cookies] = useCookies(['jwt']);

  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLElement>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // Close on click outside
  useEffect(() => {

    const clickHandler = (event: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(event.target as Node) || trigger.current.contains(event.target as Node)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarOpen, setSidebarOpen,auth.token, cookies.jwt]);

  // Close if the esc key is pressed
  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (!sidebarOpen || event.key !== 'Escape') return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [sidebarOpen, setSidebarOpen]);

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    document.body.classList.toggle('sidebar-expanded', sidebarExpanded);
  }, [sidebarExpanded]);

  return (
    <aside   ref={sidebar}
    className={`sidebar w-64 bg-black text-white p-6 ${
      sidebarOpen ? "block" : "hidden"
    } lg:block`} >
      <div className="text-2xl font-bold mb-8">Menu</div>
      <nav aria-label="Main Navigation">
        <ul>
          
          <li className="py-2 hover:bg-blue-800 rounded">
            <a href="/post" className="flex items-center" aria-label="Dashboard">
              <FaChartBar className="h-6 w-6 mr-3" />
              Dashboard
            </a>
          </li>
          {auth.role === 'admin' && (
            <li className="py-2 hover:bg-blue-800 rounded">
              <a href="/tables" className="flex items-center" aria-label="eCommerce">
                <FaShoppingCart className="h-6 w-6 mr-3" />
                Users
              </a>
            </li>
          )}

          <li className="py-2 hover:bg-blue-800 rounded">
            <a href="/profile" className="flex items-center" aria-label="Profile">
              <FaUserFriends className="h-6 w-6 mr-3" />
              Profile
            </a>
          </li>
          <li className="py-2 hover:bg-blue-800 rounded">
            <a href="/settings" className="flex items-center" aria-label="Settings">
              <FaEye className="h-6 w-6 mr-3" />
              Settings
            </a>
          </li>

          {auth.role === 'user' && (
       
          <li className="py-2 hover:bg-blue-800 rounded">
            <a href="/post" className="flex items-center" aria-label="Settings">
              <FaEye className="h-6 w-6 mr-3" />
              Post
            </a>
          </li>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
