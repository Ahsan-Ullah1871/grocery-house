import React, { useState } from "react";
import "./AddProduct.css";
import { useForm } from "react-hook-form";
import { Col, Form, Row } from "react-bootstrap";
import axios from "axios";

const AddProduct = () => {
	const [photoUrl, setPhotoUrl] = useState(null);

	const { register, handleSubmit } = useForm();
	const onSubmit = (data) => {
		const productData = { ...data };
		productData.photo_url = photoUrl;
		productData.date = new Date();

		console.log(productData);
		axios({
			method: "post",
			url:
				"https://intense-spire-37690.herokuapp.com/addNewProduct",
			data: productData,
		});
	};

	const handleUploadImage = (event) => {
		console.log(event.target.files[0]);
		const ImageData = new FormData();
		ImageData.set("key", "85dea4d9aec0e6e2a9113a6126e66123");
		ImageData.append("image", event.target.files[0]);

		axios.post("https://api.imgbb.com/1/upload", ImageData)
			.then(function (response) {
				setPhotoUrl(response.data.data.display_url);
				console.log(photoUrl);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Form.Row>
					<Form.Group
						as={Col}
						controlId="formGridEmail"
					>
						<Form.Label>Product Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Product Name"
							name="productName"
							ref={register({
								required: true,
							})}
						/>
					</Form.Group>

					<Form.Group
						as={Col}
						controlId="formGridPassword"
					>
						<Form.Label>Weight</Form.Label>
						<Form.Control
							type="text"
							placeholder="Weight"
							name="weight"
							ref={register({
								required: true,
							})}
						/>
					</Form.Group>
				</Form.Row>
				<Form.Row>
					<Form.Group
						as={Col}
						controlId="formGridEmail"
					>
						<Form.Label>Price</Form.Label>
						<Form.Control
							type="text"
							placeholder="Price"
							name="price"
							ref={register({
								required: true,
							})}
						/>
					</Form.Group>

					<Form.Group
						as={Col}
						controlId="formGridPassword"
					>
						<Form.Label>Photo</Form.Label>
						<Form.Control
							type="file"
							onChange={handleUploadImage}
						/>
					</Form.Group>
				</Form.Row>

				<input type="submit" />
			</form>
		</div>
	);
};

export default AddProduct;
