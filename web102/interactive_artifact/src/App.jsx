import React, { useState, useCallback } from 'react';
import './App.css';

// Icon components (replacing lucide-react)
const RefreshIcon = ({ spinning }) => (
  <svg 
    className={`icon ${spinning ? 'spinning' : ''}`} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const PlusIcon = () => (
  <svg className="icon-small" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const XIcon = () => (
  <svg className="icon-small" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

function App() {
  const [currentArtwork, setCurrentArtwork] = useState(null);
  const [loading, setLoading] = useState(false);
  const [banList, setBanList] = useState([]);
  const [error, setError] = useState('');

  const fetchRandomArtwork = useCallback(async () => {
    setLoading(true);
    setError('');
    
    try {
      // Fetch random artwork using Met Museum API
      const searchResponse = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=painting');
      const searchData = await searchResponse.json();
      
      if (!searchData.objectIDs || searchData.objectIDs.length === 0) {
        throw new Error('No artworks found');
      }
      
      let artwork = null;
      let attempts = 0;
      const maxAttempts = 50;
      
      // Try to get an artwork that's not in the ban list
      while (!artwork && attempts < maxAttempts) {
        const randomId = searchData.objectIDs[Math.floor(Math.random() * searchData.objectIDs.length)];
        
        try {
          const artworkResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomId}`);
          const artworkData = await artworkResponse.json();
          
          // Check if has required information and not in ban list
          if (artworkData.primaryImage && 
              artworkData.title && 
              artworkData.artistDisplayName &&
              artworkData.culture &&
              !banList.includes(artworkData.artistDisplayName) &&
              !banList.includes(artworkData.culture) &&
              !banList.includes(artworkData.objectDate)) {
            
            artwork = {
              id: artworkData.objectID,
              title: artworkData.title,
              artist: artworkData.artistDisplayName || 'Unknown Artist',
              culture: artworkData.culture || 'Unknown Culture',
              period: artworkData.objectDate || 'Unknown Period',
              image: artworkData.primaryImage,
              medium: artworkData.medium || 'Unknown Medium',
              department: artworkData.department || 'Unknown Department'
            };
          }
        } catch (err) {
          // If single artwork fetch fails, continue to next one
          console.log('Failed to fetch artwork:', err);
        }
        
        attempts++;
      }
      
      if (!artwork) {
        throw new Error('Unable to find artwork matching criteria. Try reducing ban list items.');
      }
      
      setCurrentArtwork(artwork);
    } catch (err) {
      setError(err.message || 'Error fetching artwork');
    } finally {
      setLoading(false);
    }
  }, [banList]);

  const addToBanList = (attribute, value) => {
    if (!banList.includes(value) && value && value !== 'Unknown Artist' && value !== 'Unknown Culture' && value !== 'Unknown Period') {
      setBanList(prev => [...prev, value]);
    }
  };

  const removeFromBanList = (value) => {
    setBanList(prev => prev.filter(item => item !== value));
  };

  const isInBanList = (value) => banList.includes(value);

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <header className="header">
          <h1 className="title">🎨 Art Discovery Journey</h1>
          <p className="subtitle">Click the discover button to find amazing artworks from around the world!</p>
        </header>

        {/* Discover Button */}
        <div className="discover-section">
          <button
            onClick={fetchRandomArtwork}
            disabled={loading}
            className="discover-button"
          >
            <RefreshIcon spinning={loading} />
            {loading ? 'Discovering...' : 'Discover New Artwork'}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="main-content">
          {/* Artwork Display Area */}
          <div className="artwork-section">
            {currentArtwork ? (
              <div className="artwork-card">
                <div className="artwork-image-container">
                  <img
                    src={currentArtwork.image}
                    alt={currentArtwork.title}
                    className="artwork-image"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
                    }}
                  />
                </div>
                <div className="artwork-info">
                  <h2 className="artwork-title">{currentArtwork.title}</h2>
                  
                  <div className="artwork-attributes">
                    <div className="attribute-row">
                      <span className="attribute-label">Artist:</span>
                      <button
                        onClick={() => addToBanList('artist', currentArtwork.artist)}
                        className={`attribute-tag ${isInBanList(currentArtwork.artist) ? 'banned' : 'artist'}`}
                        disabled={currentArtwork.artist === 'Unknown Artist'}
                      >
                        {currentArtwork.artist}
                        {!isInBanList(currentArtwork.artist) && currentArtwork.artist !== 'Unknown Artist' && <PlusIcon />}
                      </button>
                    </div>
                    
                    <div className="attribute-row">
                      <span className="attribute-label">Culture:</span>
                      <button
                        onClick={() => addToBanList('culture', currentArtwork.culture)}
                        className={`attribute-tag ${isInBanList(currentArtwork.culture) ? 'banned' : 'culture'}`}
                        disabled={currentArtwork.culture === 'Unknown Culture'}
                      >
                        {currentArtwork.culture}
                        {!isInBanList(currentArtwork.culture) && currentArtwork.culture !== 'Unknown Culture' && <PlusIcon />}
                      </button>
                    </div>
                    
                    <div className="attribute-row">
                      <span className="attribute-label">Period:</span>
                      <button
                        onClick={() => addToBanList('period', currentArtwork.period)}
                        className={`attribute-tag ${isInBanList(currentArtwork.period) ? 'banned' : 'period'}`}
                        disabled={currentArtwork.period === 'Unknown Period'}
                      >
                        {currentArtwork.period}
                        {!isInBanList(currentArtwork.period) && currentArtwork.period !== 'Unknown Period' && <PlusIcon />}
                      </button>
                    </div>
                    
                    <div className="additional-info">
                      <p><strong>Medium:</strong> {currentArtwork.medium}</p>
                      <p><strong>Department:</strong> {currentArtwork.department}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="welcome-card">
                <div className="welcome-icon">🎭</div>
                <h3 className="welcome-title">Ready to start your art journey?</h3>
                <p className="welcome-text">Click the "Discover New Artwork" button to begin exploring amazing artworks</p>
              </div>
            )}
          </div>

          {/* Ban List Sidebar */}
          <div className="sidebar">
            <div className="ban-list-card">
              <h3 className="ban-list-title">
                🚫 Ban List
              </h3>
              
              {banList.length === 0 ? (
                <p className="ban-list-empty">
                  Click on artwork attribute tags to add them to the ban list
                </p>
              ) : (
                <div className="ban-list-items">
                  {banList.map((item, index) => (
                    <div key={index} className="ban-list-item">
                      <span className="ban-list-item-text">{item}</span>
                      <button
                        onClick={() => removeFromBanList(item)}
                        className="ban-list-remove-btn"
                        title="Remove"
                      >
                        <XIcon />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {banList.length > 0 && (
                <button
                  onClick={() => setBanList([])}
                  className="clear-ban-list-btn"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Instructions */}
            <div className="instructions-card">
              <h4 className="instructions-title">💡 How to Use</h4>
              <ul className="instructions-list">
                <li>• Click on artist, culture, or period tags to add to ban list</li>
                <li>• Items in ban list will not appear again</li>
                <li>• You can remove items from ban list anytime</li>
                <li>• Each discovery click shows a new artwork</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;