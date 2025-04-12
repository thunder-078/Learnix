'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/sidebar/sidebar';
import './dashboard.css';
import { v4 as uuidv4 } from 'uuid';

export default function Dashboard() {
  const [folders, setFolders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [description, setDescription] = useState('');
  const [hovered, setHovered] = useState(null);

  const router = useRouter();

  const loadFolders = () => {
    const all = { ...localStorage };
    const parsed = Object.entries(all)
      .filter(([key]) => key.startsWith('folder-'))
      .map(([key, val]) => ({ id: key, ...JSON.parse(val) }));
    setFolders(parsed);
  };

  useEffect(() => {
    loadFolders();
  }, []);

  const handleAddFolder = () => {
    if (!folderName.trim()) return;
    const id = `folder-${folderName}`;
    const folderData = {
      name: folderName,
      desc: description,
      createdAt: new Date().toLocaleString(),
      files: [],
    };
    localStorage.setItem(id, JSON.stringify(folderData));
    setFolderName('');
    setDescription('');
    setShowModal(false);
    loadFolders();
  };

  const handleRemove = (id) => {
    localStorage.removeItem(id);
    loadFolders();
  };

  const handleOpenFolder = (folderName) => {
    router.push(`/dashboard/${folderName}`);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
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

        <div className="long-line"></div>

        <div className="folder-container">
          {folders.map((folder) => (
            <div
              key={folder.id}
              className="folder-card"
              onClick={() => handleOpenFolder(folder.name)}
              onMouseEnter={() => setHovered(folder.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <img src="/folder.svg" alt="Folder Icon" />
              <h4>{folder.name}</h4>
              <p>{folder.desc}</p>
              <span className="timestamp">{folder.createdAt}</span>
              {hovered === folder.id && (
                <img
                  src="/remove.svg"
                  alt="Remove"
                  className="remove-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(folder.id);
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="floating-plus" onClick={() => setShowModal(true)}>
        <img src="/add.svg" alt="Add" />
      </div>

      {showModal && (
        <div className="modal">
          <input
            type="text"
            placeholder="Folder name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button onClick={handleAddFolder}>Create Folder</button>
        </div>
      )}
    </div>
  );
}
