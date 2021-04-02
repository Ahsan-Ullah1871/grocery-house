import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LoggedInUserContext } from "../../App";
import { signOut } from "../FirebaseManegment/FirebaseManegment";
import "./Header.css";

const Header = () => {
	const [LoggedInUser, setLoggedInUser] = useContext(LoggedInUserContext);
	const [toggle, setToggle] = useState("none");

	const profileOpen = () => {
		toggle === "none" ? setToggle(" ") : setToggle("none");
	};
	const logOut = () => {
		signOut();
		setToggle("none");
	};
	return (
		<>
			<div className="headerPart">
				<div className="container mb-5 d-flex justify-content-between align-items-center  ">
					<div className="logo ">
						<h2>Grocery-House</h2>
					</div>
					<div className="navPart">
						<Link to="/home">Home</Link>
						<Link to="/orders">Orders</Link>
						<Link to="/admin">Admin</Link>

						{LoggedInUser.displayName ? (
							<Button onClick={profileOpen}>
								{
									LoggedInUser.displayName
								}
								<img
									src={
										LoggedInUser.photoURL
									}
									alt=""
								/>
							</Button>
						) : (
							<Link
								to="/logIn"
								style={{
									border: "none",
								}}
							>
								{" "}
								<Button>
									Log In
								</Button>{" "}
							</Link>
						)}
					</div>
					<div
						className="profilePart  "
						id="profilePart"
						style={{ display: toggle }}
					>
						<div className="col">
							<Button onClick={logOut}>
								Sign Out
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Header;
