// pages/Home.jsx
import React from "react";
import Alert from "../components/Alert/Alert";
import FirstSection from "../components/FirstSection/FirstSection";
import SecondSection from "../components/SecondSection/SecondSection";
import ThirdSction from "../components/ThirdSction/ThirdSction";
import FouthSection from "../components/FouthSection/FouthSection";
import FifthSection from "../components/FifthSection/FifthSection";
import SixthSection from "../components/sixthSection/SixthSection";
import YoutubeAPI from "../components/Youtub/YoutubeAPI";

function Home() {
	return (
		<>
			<Alert />
			<FirstSection />
			<SecondSection />
			<ThirdSction />
			<FouthSection />
			<FifthSection />
			<SixthSection />
			<YoutubeAPI />
		</>
	);
}

export default Home;
