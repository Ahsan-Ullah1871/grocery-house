import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import { LoggedInUserContext } from "../../App";
import "./Orders.css";
import AllOrders from "../AllOrders/AllOrders";
import SelectedOrder from "../SelectedOrder/SelectedOrder";
import Ellipsis from "../../LoadingGif/Ellipsis.gif";

const Orders = () => {
	const [LoggedInUser, setLoggedInUser] = useContext(LoggedInUserContext);
	const [orders, setOrders] = useState(null);
	useEffect(() => {
		axios({
			method: "get",
			url: `https://intense-spire-37690.herokuapp.com/my-orders?email=${LoggedInUser.email}`,
			responseType: "stream",
		}).then(function (response) {
			setOrders(response.data);
		});
	}, [LoggedInUser]);
	let { path, url } = useRouteMatch();

	return (
		<div className="container ordersPage">
			<div className="row ">
				<div className="col-md-5 allOrdersNav">
					{orders ? (
						<AllOrders orders={orders} />
					) : (
						<div className="text-center">
							<img src={Ellipsis} alt="" />
						</div>
					)}
				</div>
				<div className="col-md-7 ">
					<Switch>
						<Route exact path={path}>
							<h3>Please select a order.</h3>
						</Route>
						<Route
							path={`${path}/:selectedOrder`}
						>
							<SelectedOrder />
						</Route>
					</Switch>
				</div>
			</div>
		</div>
	);
};

export default Orders;
