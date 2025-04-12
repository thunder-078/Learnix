'use client';
import { useRouter } from 'next/navigation';
import './sidebar.css';

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    localStorage.removeItem("userLogin");
    router.push('/signin');
  };

  return (
    <div className="sidebar">
      <img src="/lg.svg" alt="Small Logo" className="small-logo" />
      <img src="/logo.svg" alt="Full Logo" className="full-logo" />
      <div className="line"></div>
      <ul className="nav-links">
        <li onClick={() => router.push('/dashboard')}><img src="/home.svg" alt="home"/><span className="link-text" >Home</span></li>
        <li><img src="/profile.svg" alt="profile"/><span className="link-text">Profile</span></li>
        <li onClick={() => router.push('/notes')}><img src="/notes.svg" alt="notes"/><span className="link-text">My notes</span></li>
        <li onClick={() => router.push('/summarize')}><img src="/test.svg" alt="test"/><span className="link-text">Summarize</span></li>
      </ul>

      <div className="logout-button" onClick={handleLogout}>
        <img src="/logout.svg" alt="logout"/>
        <span className="link-text">Logout</span>
      </div>
    </div>
  );
}
