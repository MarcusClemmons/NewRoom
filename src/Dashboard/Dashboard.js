import React, { useState, useEffect,useCallback } from "react";
import { useGlobalContext } from "../contexts/GlobalContext"; // Import useGlobalContext



function Dashboard() {
  
  const { user } = useGlobalContext(); 
  const [preferences, setPreferences] = useState({
    theme: "light",
    categories: [],
  });
  const [bookmarks, setBookmarks] = useState([]);
  const [history, setHistory] = useState([]);



  const fetchPreferences = useCallback(async () => {
    const prefsUrl = `https://newroom-1a460-default-rtdb.firebaseio.com/users/${user.id}/preferences.json`;
    const response = await fetch(prefsUrl);
    const data = await response.json();
    if (data) setPreferences(data);
  },[user]);

  const fetchBookmarks = useCallback(async () => {
    const bookmarksUrl = `https://newroom-1a460-default-rtdb.firebaseio.com/users/${user.id}/bookmarks.json`;
    const response = await fetch(bookmarksUrl);
    const data = await response.json();
    if (data) setBookmarks(Object.values(data));
  },[user]);

  const fetchHistory = useCallback(async () => {
    const historyUrl = `https://newroom-1a460-default-rtdb.firebaseio.com/users/${user.id}/history.json`;
    const response = await fetch(historyUrl);
    const data = await response.json();
    if (data) setHistory(Object.values(data));
  },[user]);

  useEffect(() => {
    if (!user) return;
    if (user) {
      fetchPreferences();
      fetchBookmarks();
      fetchHistory();
    }
  }, [user, fetchPreferences, fetchBookmarks, fetchHistory]);

  const updatePreferences = async (newPreferences) => {
    const prefsUrl = `https://newroom-1a460-default-rtdb.firebaseio.com/users/${user.id}/preferences.json`;
    await fetch(prefsUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPreferences),
    });
    setPreferences(newPreferences);
  };

  const handleThemeChange = (newTheme) => {
    updatePreferences({ ...preferences, theme: newTheme });
  };


  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Preferences</h2>
        <div>
        <label>
          <input
            type="radio"
            value="light"
            checked={preferences.theme === 'light'}
            onChange={() => handleThemeChange('light')}
          />
          Light Theme
        </label>
        <label>
          <input
            type="radio"
            value="dark"
            checked={preferences.theme === 'dark'}
            onChange={() => handleThemeChange('dark')}
          />
          Dark Theme
        </label>
      </div>
      </div>
      <div>
      <br></br>
        <h2>Bookmarked Articles</h2>
        <br></br>
        {bookmarks.map((bookmark, index) => (
       
          <div key={index} className="bookmark" >
            <h3>{bookmark.title}</h3>
            <p>Author: {bookmark.author || "Unknown"}</p>
            <a href={bookmark.url} target="_blank" rel="noreferrer noopener">Read More</a>
          </div>
         
         
        ))}
        
      </div>
      
      <br></br>
      
      <div>
    <h2>Reading History</h2>
    {history.map((article, index) => (
    <div key={index} className="history-item">
      <h3>{article.title}</h3>
      <p>Author: {article.author || "Unknown"}</p>
      <a href={article.url} target="_blank" rel="noreferrer noopener">Read Article</a>
    </div>
  ))}
      </div>
    </div>
  );
}

export default Dashboard;
