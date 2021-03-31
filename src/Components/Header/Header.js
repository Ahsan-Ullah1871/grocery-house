import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
	return (
		<div className="container d-flex justify-content-between align-items-center">
			<div className="logo ">
				<h2>Grocery-House</h2>
			</div>
			<div className="navPart">
				<Link to="/home">Home</Link>
				<Link to="/orders">Orders</Link>
				<Link to="/admin">Admin</Link>
				<Link to="/deals">Deals</Link>
				<Link to="/logIn">Log In</Link>
			</div>
		</div>
	);
};

export default Header;
