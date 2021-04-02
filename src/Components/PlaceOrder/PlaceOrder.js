import React, { useContext, useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import "./PlaceOrder.css";
import { useForm } from "react-hook-form";
import { LoggedInUserContext } from "../../App";
import axios from "axios";
import OrderSummary from "../OrderSummary/OrderSummary";
import OrderSuccessText from "../OrderSuccessText/OrderSuccessText";

const PlaceOrder = ({ orderDetails }) => {
	const [LoggedInUser, setLoggedInUser] = useContext(LoggedInUserContext);
	const { displayName, email, photoURL } = LoggedInUser;
	const [orderPlace, setOrderPlace] = useState(false);

	const { productName, weight, price, photo_url, quantity } = orderDetails;
	const orderDetailsData = {
		productName,
		weight,
		price,
		photo_url,
		quantity,
	};
	const countPrice = Number(price) * quantity;
	const shippingCharge = 60;
	const tax = countPrice * 0.1;
	const totalCharge = countPrice + shippingCharge + tax;

	const { register, handleSubmit, errors } = useForm();
	const onSubmit = (data) => {
		const fullOrderInformation = {
			...data,
			...orderDetailsData,
			totalCharge,
		};
		fullOrderInformation.orderDate = new Date();
		fullOrderInformation.buyerPhoto = photoURL;
		fullOrderInformation.buyerEmail = email;
		axios({
			method: "post",
			url:
				"https://intense-spire-37690.herokuapp.com/fullOrderDetails",
			data: fullOrderInformation,
		});

		setOrderPlace(true);
	};

	return (
		<div>
			{orderPlace ? (
				<div className="orderSuccess d-flex justify-content-center ml-auto mr-auto">
					<OrderSuccessText />
				</div>
			) : (
				<div className="row">
					<div className="col-md-6 buyerInformation">
						<form
							onSubmit={handleSubmit(
								onSubmit
							)}
						>
							<Form.Group
								as={Col}
								controlId="formGridEmail"
							>
								<Form.Label>
									Name
								</Form.Label>
								<Form.Control
									type="text"
									placeholder="Price"
									name="name"
									ref={register({
										required: true,
									})}
									value={
										displayName
									}
									readOnly
								/>
							</Form.Group>
							<Form.Group
								as={Col}
								controlId="formGridEmail"
							>
								<Form.Label>
									Adrees
								</Form.Label>
								<Form.Control
									type="text"
									placeholder="Address"
									name="address"
									ref={register({
										required: true,
									})}
								/>
							</Form.Group>
							<Form.Group
								as={Col}
								controlId="formGridEmail"
							>
								<Form.Label>
									Mobile Number
								</Form.Label>
								<Form.Control
									type="text"
									placeholder="Mobile Number"
									name="mobileNumber"
									ref={register({
										required: true,
									})}
								/>
							</Form.Group>
							<div className="placeOrderButton text-center">
								<Button
									type="submit"
									variant="success"
								>
									Place Order
								</Button>
							</div>
						</form>
					</div>
					<div className="col-md-6 orderSummary">
						<OrderSummary
							price={price}
							quantityValue={quantity}
							productName={productName}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default PlaceOrder;
