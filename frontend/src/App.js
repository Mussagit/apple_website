import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home.jsx";
import Mac from "./pages/Mac.jsx";
import Iphone from "./pages/Iphone";
import SingleAppleProduct from "./pages/SingleAppleProduct";
import Ipad from "./pages/Ipad.jsx";
import Watch from "./pages/Watch.jsx";
import Tv from "./pages/Tv.jsx";
import Music from "./pages/Music.jsx";
import Support from "./pages/Support.jsx";
import AddProduct from "./pages/AddProduct";
import Login from "./pages/Login.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Cart from "./pages/Cart.jsx";
import Search from "./pages/Search.jsx";
import Four04 from "./pages/Four04";

import "./css/bootstrap.css";
import "./css/styles.css";

function App() {
	return (
		<div className="App">
			<ScrollToTop />
			<Header />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/mac" element={<Mac />} />
				<Route path="/iphone" element={<Iphone />} />
				<Route path="/iphone/:id" element={<SingleAppleProduct />} />
				<Route path="/ipad" element={<Ipad />} />
				<Route path="/watch" element={<Watch />} />
				<Route path="/tv" element={<Tv />} />
				<Route path="/music" element={<Music />} />
				<Route path="/support" element={<Support />} />
				<Route path="/login" element={<Login />} />
				<Route path="/add-product" element={<AddProduct />} />
				<Route path="/reset-password" element={<ResetPassword />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/search" element={<Search />} />
				<Route path="*" element={<Four04 />} />
			</Routes>

			<Footer />
		</div>
	);
}

export default App;

