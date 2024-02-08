import React, { useEffect, useState, useRef } from "react";
import { useGlobalContext } from '../contexts/GlobalContext'; // Ensure this is the correct path to your context
import "./LeadingNews.css";

const LeadingNews = () => {
  const [mynews, setMyNews] = useState([]);
  const { user } = useGlobalContext(); // Use global context to access user info
  const [visibleArticles, setVisibleArticles] = useState([]);
  const articleRefs = useRef([]);

  const fetchData = async () => {
    const response = await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=714ef9b8a6ef47d19b4bda6f4f0d100f");
    const data = await response.json();
    setMyNews(data.articles);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleArticles((prevVisibleArticles) => [
              ...prevVisibleArticles,
              entry.target.getAttribute('data-url'),
            ]);
          }
        });
      },
      { threshold: 0.1 }
    );

    mynews.forEach((article, index) => {
      if (articleRefs.current[index]) {
        observer.observe(articleRefs.current[index]);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [mynews]);

  const bookmarkArticle = async (article) => {
    if (!user) {
      alert("Please log in to bookmark articles");
      return;
    }
    const articleId = encodeURIComponent(article.title);
    const bookmarkUrl = `https://newroom-1a460-default-rtdb.firebaseio.com/users/${user.id}/bookmarks/${articleId}.json`;
    await fetch(bookmarkUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(article),
    });
    alert("Article bookmarked!");
  };

  const addToHistory = async (article, event) => {
    event.preventDefault(); // Prevent default link behavior

    if (!user) {
      alert("Please log in to track reading history");
      return;
    }

    const articleId = encodeURIComponent(article.title);
    const historyUrl = `https://newroom-1a460-default-rtdb.firebaseio.com/users/${user.id}/history/${articleId}.json`;

    await fetch(historyUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(article),
    });

    window.open(article.url, "_blank");
  };

  return (
    <>
      <h1 className="text-center my-3">Enjoy Daily Top - Headlines</h1>
      <div className="mainDiv">
        {mynews.map((article, index) => (
          <div 
            key={article.title} 
            className="card" 
            style={{ marginTop: "2rem", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
            ref={(el) => (articleRefs.current[index] = el)}
            data-url={article.url}
          >
            {visibleArticles.includes(article.url) && (
              <>
                <img src={article.urlToImage || "https://via.placeholder.com/150"} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{article.author || "Unknown Author"}</h5>
                  <p className="card-text">{article.title}</p>
                  <a href={article.url} target="_blank" rel="noreferrer noopener" className="btn btn-primary" onClick={(e) => addToHistory(article, e)}>Read More</a>
                  <button onClick={() => bookmarkArticle(article)} className="btn btn-secondary">Bookmark</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default LeadingNews;
