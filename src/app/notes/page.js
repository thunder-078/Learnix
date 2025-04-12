import Sidebar from "@/components/sidebar/sidebar";
import './notes.css';

export default function Notes() {
  

  return (
    <div className="notes-layout">
      <Sidebar/>
      <div className="main-content">
        <div className="top-bar">
          <h1>My Notes</h1>
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