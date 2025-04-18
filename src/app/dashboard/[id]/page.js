'use client';
import Sidebar from '@/components/sidebar/sidebar';
import './folder.css';
import { use, useRef, useState, useEffect } from 'react';

export default function FolderPage({ params }) {
  const { id } = use(params);
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [previewType, setPreviewType] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [currentPreview, setCurrentPreview] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(`files_${id}`);
    if (stored) setFiles(JSON.parse(stored));
  }, [id]);

  useEffect(() => {
    localStorage.setItem(`files_${id}`, JSON.stringify(files));
  }, [files, id]);

  const handleAddFile = () => fileInputRef.current.click();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileType = file.type;
    const newFile = {
      id: Date.now(),
      name: file.name,
      desc: '',
      type: fileType,
      content: '',
      locked: false,
    };

    const reader = new FileReader();
    if (fileType === 'application/pdf') {
      reader.onload = () => {
        newFile.content = reader.result;
        setFiles((prev) => [...prev, newFile]);
      };
      reader.readAsDataURL(file);
    } else if (fileType.startsWith('text/')) {
      reader.onload = () => {
        newFile.content = reader.result;
        setFiles((prev) => [...prev, newFile]);
      };
      reader.readAsText(file);
    } else {
      alert('Only text or PDF files supported.');
    }
  };

  const openPreview = (file) => {
    setCurrentPreview(file);
    setFileContent(file.content);
    setPreviewType(file.type.startsWith('text/') ? 'text' : 'pdf');
    setShowModal(true);
  };

  const closePreview = () => {
    setShowModal(false);
    setCurrentPreview(null);
    setFileContent('');
  };

  const updateDesc = (fileId, value) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === fileId ? { ...f, desc: value, locked: true } : f
      )
    );
  };

  const removeFile = (fileId) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <div className="top-bar">
          <h1>{id}</h1>
          <button onClick={handleAddFile}>➕ Add File</button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>

        <div className="file-grid">
          {files.map((file) => (
            <div key={file.id} className="file-card">
              <h3>{file.name}</h3>
              {!file.locked ? (
                <p
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => updateDesc(file.id, e.target.textContent)}
                >
                  {file.desc || 'Click to add description'}
                </p>
              ) : (
                <p>{file.desc}</p>
              )}
              <div className="hover-buttons">
                <button onClick={() => openPreview(file)}>👁 Preview</button>
                <button onClick={() => removeFile(file.id)}>🗑 Remove</button>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="modal-backdrop" onClick={closePreview}>
            <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={closePreview}>✖</button>
              <h2>{currentPreview?.name}</h2>
              {previewType === 'text' ? (
                <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{fileContent}</pre>
              ) : (
                <iframe src={fileContent} width="100%" height="500px" title="PDF Preview" />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
