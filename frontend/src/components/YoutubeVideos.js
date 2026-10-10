// components/YoutubeVideos.js
import React, { useState, useEffect } from "react";
import "./YoutubeVideos.css";

const FALLBACK_VIDEOS = [
  {
    id: { videoId: "GC0GI4MgTyg" },
    snippet: {
      title: "New iPhone 18 Pro: The iPhone with the best camera and battery life ever",
      description:
        "Explore the latest iPhone 18 Pro with next-generation Apple Silicon, revolutionary camera sensors, and all-day battery performance.",
      publishedAt: "2026-03-01T00:00:00Z",
      thumbnails: {
        medium: { url: "https://i.ytimg.com/vi/GC0GI4MgTyg/hqdefault.jpg" },
      },
    },
  },
  {
    id: { videoId: "ZlMvbjknrIg" },
    snippet: {
      title: "iPhone Duo: Everything announced about the first foldable iPhone",
      description:
        "Introducing iPhone Duo — Apple's revolutionary dual-display foldable experience built with Ultra Thin Ceramic Glass.",
      publishedAt: "2026-03-01T00:00:00Z",
      thumbnails: {
        medium: { url: "https://i.ytimg.com/vi/ZlMvbjknrIg/hqdefault.jpg" },
      },
    },
  },
  {
    id: { videoId: "Pe2ugye7Ya4" },
    snippet: {
      title: "New Apple Watch Series 12 and Ultra 4: The ultimate wearable",
      description:
        "Advanced health sensors, non-invasive monitoring, multi-day battery life, and brightest micro-OLED display.",
      publishedAt: "2026-03-01T00:00:00Z",
      thumbnails: {
        medium: { url: "https://i.ytimg.com/vi/Pe2ugye7Ya4/hqdefault.jpg" },
      },
    },
  },
  {
    id: { videoId: "XSiGaXPssd4" },
    snippet: {
      title: "New AirPods 5: Active Noise Cancellation in an open-ear design",
      description:
        "Discover the next leap in personal audio with H3 computational acoustics and adaptive spatial audio.",
      publishedAt: "2026-03-01T00:00:00Z",
      thumbnails: {
        medium: { url: "https://i.ytimg.com/vi/XSiGaXPssd4/hqdefault.jpg" },
      },
    },
  },
  {
    id: { videoId: "1WLqGs7c_yA" },
    snippet: {
      title: 'Shot on iPhone 18 Pro: "new trick" by ROSÉ',
      description:
        "Experience cinematic 8K ProRes video and master-grade color grading shot entirely on iPhone 18 Pro.",
      publishedAt: "2026-03-01T00:00:00Z",
      thumbnails: {
        medium: { url: "https://i.ytimg.com/vi/1WLqGs7c_yA/hqdefault.jpg" },
      },
    },
  },
  {
    id: { videoId: "c43tABiPIyQ" },
    snippet: {
      title: "Apple Games: Behind the Scenes of Stop-Motion Animation",
      description:
        "Go behind the scenes with world-class animators using Apple Silicon Mac Studio and iPad Pro with Apple Pencil Pro.",
      publishedAt: "2026-03-01T00:00:00Z",
      thumbnails: {
        medium: { url: "https://i.ytimg.com/vi/c43tABiPIyQ/hqdefault.jpg" },
      },
    },
  },
];

const MAX_RESULTS = 6;
const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const SEARCH_QUERY = "Apple iPhone";

function YoutubeVideos() {
  const [videos, setVideos] = useState(FALLBACK_VIDEOS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchYoutubeVideos() {
      if (!API_KEY) {
        setVideos(FALLBACK_VIDEOS);
        return;
      }
      setLoading(true);
      try {
        const url =
          `https://www.googleapis.com/youtube/v3/search` +
          `?part=snippet&type=video&maxResults=${MAX_RESULTS}` +
          `&q=${encodeURIComponent(SEARCH_QUERY)}&key=${API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
          setVideos(data.items);
        } else {
          setVideos(FALLBACK_VIDEOS);
        }
      } catch (err) {
        console.warn("YouTube fetch error, using fallback:", err.message);
        setVideos(FALLBACK_VIDEOS);
      } finally {
        setLoading(false);
      }
    }

    fetchYoutubeVideos();
  }, []);

  if (loading) {
    return <p className="yt__status">Loading videos...</p>;
  }

  return (
    <section className="yt-section">
      <h2 className="yt-section__title">Latest Videos</h2>
      <div className="yt-grid">
        {videos.map((video, i) => {
          const videoId = video.id?.videoId || `vid-${i}`;
          const { title, description, publishedAt, thumbnails } =
            video.snippet;

          const thumbUrl =
            thumbnails?.high?.url ||
            thumbnails?.medium?.url ||
            `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

          return (
            <a
              key={videoId}
              className="yt-card"
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="yt-card__thumb"
                src={thumbUrl}
                alt={title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
                }}
              />
              <div className="yt-card__body">
                <h3 className="yt-card__title">{title}</h3>
                <p className="yt-card__desc">{description}</p>
                <span className="yt-card__date">
                  {publishedAt
                    ? new Date(publishedAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "Apple Official"}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

export default YoutubeVideos;
