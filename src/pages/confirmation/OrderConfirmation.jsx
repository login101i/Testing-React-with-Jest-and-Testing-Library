import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useOrderDetails } from "../../context/OrderDetails";

import axios from "axios";

const OrderConfirmation = ({ setOrderPhase }) => {
	const [error, setError] = useState(false);
	const [orderNumber, setOrderNumber] = useState(null);
	const [loading, setLoading] = useState(true);

	const [, , clearOptionCounts] = useOrderDetails();

	const newOrderHandler = () => {
		clearOptionCounts();
		setOrderPhase("In progress");
	};

	useEffect(() => {
		axios
			.post(`http://localhost:3030/order`)
			.then((response) =>
				setTimeout(() => {
					setOrderNumber(response.data.orderNumber);
				}, 1200)
			)
			.catch((error) => {
				setError(true);
			});
	}, []);

	if (error) return <h1>Error</h1>;

	return (
		<Container xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
			{orderNumber ? (
				<h1>Loading</h1>
			) : (
				<>
					<h2>Thank You!</h2>
					<p>Your order number is {orderNumber}</p>
					<p>We are glad you bought stuff in our store :)</p>

					<button onClick={newOrderHandler}>Create new order</button>
				</>
			)}
		</Container>
	);
};

export default OrderConfirmation;
