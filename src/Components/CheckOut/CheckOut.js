import React from "react";
import "./CheckOut.css";
import { Button, Table } from "react-bootstrap";
import Header from "../Header/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

const CheckOut = () => {
	let { name } = useParams();

	const [product, setProduct] = useState(null);
	useEffect(() => {
		axios({
			method: "get",
			url:
				"https://intense-spire-37690.herokuapp.com/selectedProduct/" +
				name,
			responseType: "stream",
		}).then(function (response) {
			setProduct(response.data);
		});
	}, [name]);
	console.log(product);
	// const { productName, weight, price, photo_url } = product;

	return (
		<div className="container">
			<Header />

			<h3 className="text-center mt-5">Check Out</h3>
			<div className="descriptionPart">
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Description</th>
							<th>Photo</th>
							<th>Quantity</th>
							<th>Price</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								{product?.productName}-
								{product?.weight}
							</td>
							<td>{product?.productName}</td>
							<td>1</td>
							<td>{product?.price}</td>
						</tr>
					</tbody>
				</Table>
			</div>

			<div className="  checkOutPart  w-25 ml-auto ">
				<table class="table">
					<tr>
						<th scope="row">Name</th>
						<td>Mango</td>
					</tr>
					<tr>
						<th scope="row">Price</th>
						<td>100</td>
					</tr>
					<tr>
						<th scope="row">Shipping Charge</th>
						<td>10</td>
					</tr>
					<tr>
						<th scope="row">Tax</th>
						<td>10</td>
					</tr>
					<tr>
						<th scope="row">Total Charge</th>
						<td>100</td>
					</tr>
				</table>
				<Button className="checkOutButton" variant="info">
					Check Out
				</Button>
			</div>
		</div>
	);
};

export default CheckOut;
