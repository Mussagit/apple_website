import React, { useState, useEffect } from "react";

const FALLBACK_VIDEOS = [
	{
		id: { videoId: "GC0GI4MgTyg" },
		snippet: {
			title: "New iPhone 18 Pro: The iPhone with the best camera and battery life ever",
			description:
				"Explore the latest iPhone 18 Pro with next-generation Apple Silicon, revolutionary camera sensors, and all-day battery performance.",
			publishedAt: "2026-03-01T00:00:00Z",
			thumbnails: {
				high: { url: "https://i.ytimg.com/vi/GC0GI4MgTyg/hqdefault.jpg" },
				medium: { url: "https://i.ytimg.com/vi/GC0GI4MgTyg/mqdefault.jpg" },
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
				high: { url: "https://i.ytimg.com/vi/ZlMvbjknrIg/hqdefault.jpg" },
				medium: { url: "https://i.ytimg.com/vi/ZlMvbjknrIg/mqdefault.jpg" },
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
				high: { url: "https://i.ytimg.com/vi/Pe2ugye7Ya4/hqdefault.jpg" },
				medium: { url: "https://i.ytimg.com/vi/Pe2ugye7Ya4/mqdefault.jpg" },
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
				high: { url: "https://i.ytimg.com/vi/XSiGaXPssd4/hqdefault.jpg" },
				medium: { url: "https://i.ytimg.com/vi/XSiGaXPssd4/mqdefault.jpg" },
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
				high: { url: "https://i.ytimg.com/vi/1WLqGs7c_yA/hqdefault.jpg" },
				medium: { url: "https://i.ytimg.com/vi/1WLqGs7c_yA/mqdefault.jpg" },
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
				high: { url: "https://i.ytimg.com/vi/c43tABiPIyQ/hqdefault.jpg" },
				medium: { url: "https://i.ytimg.com/vi/c43tABiPIyQ/mqdefault.jpg" },
			},
		},
	},
];

function YoutubeAPI() {
	const [youtubeData, setYoutubeData] = useState(FALLBACK_VIDEOS);
	const [loading] = useState(false);

	const API_KEY =
		process.env.REACT_APP_YOUTUBE_API_KEY ||
		"AIzaSyCpTF_yLNSD38RsC4Q8fszQZCJNZ6F8Kvc";
	const CHANNEL_ID =
		process.env.REACT_APP_YOUTUBE_CHANNEL_ID || "UCYFQ33UIPERYx8-ZHucZbDA";
	const MAX_RESULTS = 6;

	useEffect(() => {
		const fetchVideos = async () => {
			if (!API_KEY) {
				setYoutubeData(FALLBACK_VIDEOS);
				return;
			}
			try {
				const res = await fetch(
					`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`,
				);
				const data = await res.json();
				if (data.items && data.items.length > 0) {
					setYoutubeData(data.items);
				} else {
					setYoutubeData(FALLBACK_VIDEOS);
				}
			} catch (error) {
				console.warn("Using official Apple fallback videos:", error);
				setYoutubeData(FALLBACK_VIDEOS);
			}
		};

		fetchVideos();
	}, [API_KEY, CHANNEL_ID]);

	return (
		<div className="allVideosWrapper py-5" style={{ background: "#f5f5f7" }}>
			<div className="container">
				<div className="row justify-content-center text-center">
					<div className="col-12 mt-4 mb-4">
						<h2
							className="fw-bold text-dark"
							style={{
								fontSize: "38px",
								letterSpacing: "-0.5px",
								fontWeight: "700",
							}}
						>
							Latest Videos
						</h2>
						<p className="text-muted" style={{ fontSize: "16px" }}>
							Watch the latest announcements, feature walkthroughs, and stories from Apple.
						</p>
					</div>

					{loading && (
						<div className="col-12 text-center py-4">
							<div className="spinner-border text-primary" role="status"></div>
						</div>
					)}

					{youtubeData?.map((singleVideo, i) => {
						const vidId = singleVideo.id?.videoId || `video-${i}`;
						const snippet = singleVideo.snippet;
						if (!snippet) return null;

						const videoLink = `https://www.youtube.com/watch?v=${vidId}`;
						const thumbUrl =
							snippet.thumbnails?.high?.url ||
							snippet.thumbnails?.medium?.url ||
							`https://img.youtube.com/vi/${vidId}/hqdefault.jpg`;

						return (
							<div key={vidId || i} className="col-12 col-md-6 col-lg-4 mb-4 text-start">
								<div
									className="card h-100 shadow-sm border-0 d-flex flex-column overflow-hidden"
									style={{
										borderRadius: "18px",
										background: "#ffffff",
										transition: "transform 0.25s ease, box-shadow 0.25s ease",
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.transform = "translateY(-4px)";
										e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.12)";
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.transform = "translateY(0)";
										e.currentTarget.style.boxShadow = "0 .125rem .25rem rgba(0,0,0,.075)";
									}}
								>
									{/* Video Thumbnail with Play Button Overlay */}
									<div
										className="position-relative"
										style={{
											overflow: "hidden",
											aspectRatio: "16/9",
											background: "#000000",
										}}
									>
										<a
											href={videoLink}
											target="_blank"
											rel="noopener noreferrer"
											className="d-block w-100 h-100"
										>
											<img
												src={thumbUrl}
												alt={snippet.title}
												className="w-100 h-100"
												style={{
													objectFit: "cover",
													display: "block",
													transition: "transform 0.3s ease",
												}}
												onError={(e) => {
													e.target.onerror = null;
													e.target.src = `https://img.youtube.com/vi/${vidId}/mqdefault.jpg`;
												}}
											/>
											{/* Play Icon Badge */}
											<div
												className="position-absolute d-flex align-items-center justify-content-center"
												style={{
													top: "50%",
													left: "50%",
													transform: "translate(-50%, -50%)",
													width: "52px",
													height: "52px",
													borderRadius: "50%",
													backgroundColor: "rgba(0, 0, 0, 0.65)",
													backdropFilter: "blur(4px)",
													color: "#ffffff",
													fontSize: "20px",
													boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
												}}
											>
												▶
											</div>
										</a>
									</div>

									{/* Video Info */}
									<div className="card-body p-3 d-flex flex-column justify-content-between">
										<div>
											<h3
												className="card-title mb-2"
												style={{
													fontSize: "15px",
													fontWeight: "600",
													lineHeight: "1.35",
												}}
											>
												<a
													href={videoLink}
													target="_blank"
													rel="noopener noreferrer"
													style={{
														color: "#0071e3",
														textDecoration: "none",
														display: "-webkit-box",
														WebkitLineClamp: 2,
														WebkitBoxOrient: "vertical",
														overflow: "hidden",
													}}
												>
													{snippet.title}
												</a>
											</h3>
											<p
												className="card-text text-muted mb-0"
												style={{
													fontSize: "13px",
													lineHeight: "1.4",
													display: "-webkit-box",
													WebkitLineClamp: 2,
													WebkitBoxOrient: "vertical",
													overflow: "hidden",
												}}
											>
												{snippet.description}
											</p>
										</div>

										<div className="mt-3 pt-2 border-top d-flex justify-content-between align-items-center">
											<span className="badge bg-light text-dark border">
												Apple Official
											</span>
											<a
												href={videoLink}
												target="_blank"
												rel="noopener noreferrer"
												className="text-decoration-none small fw-semibold"
												style={{ color: "#0071e3" }}
											>
												Watch on YouTube &rarr;
											</a>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default YoutubeAPI;
