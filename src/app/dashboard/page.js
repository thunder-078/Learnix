'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './dashboard.css';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const expiry = localStorage.getItem('authExpiry');
    if (!token || !expiry || new Date().getTime() > Number(expiry)) {
      router.push('/signin');
    }
  }, []);

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    localStorage.removeItem("userLogin");
    router.push('/signin');
  };

  return (
    <div className="dashboard-layout">
      <div className="sidebar">
        <img src="/lg.svg" alt="Small Logo" className="small-logo" />
        <img src="/logo.svg" alt="Full Logo" className="full-logo" />
        <div className="line"></div>
        <ul className="nav-links">
          <li><img src="/home.svg" alt="home"/><span className="link-text">Home</span></li>
          <li><img src="/profile.svg" alt="profile"/><span className="link-text">Profile</span></li>
          <li><img src="/notes.svg" alt="notes"/><span className="link-text">My notes</span></li>
          <li><img src="/test.svg" alt="test"/><span className="link-text">Test</span></li>
        </ul>

        <div className="logout-button" onClick={handleLogout}>
          <img src="/logout.svg" alt="logout"/>
          <span className="link-text">Logout</span>
        </div>
      </div>

      <div className="main-content">
        <div className="top-bar">
          <h1>Dashboard</h1>
          <div className="search-box">
            <input className="bg-clr" type="text" placeholder="Search..." />
            <button type="submit">
              <img src="/search.svg" alt="Search" />
            </button>
          </div>
        </div>
        <div className='long-line'></div>
      </div>

      <div className="floating-plus">
        <img src="/add.svg" alt="Add" />
      </div>
    </div>
  );

}
