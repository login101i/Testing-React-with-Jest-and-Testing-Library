import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../context/OrderDetails";

const OrderSummary = ({ setOrderPhase }) => {
	const [orderDetails] = useOrderDetails();

	console.log(orderDetails.scoops);

	const scoopArray = Array.from(orderDetails.scoops.entries());
	console.log(scoopArray);

	const scoopList = scoopArray.map(([key, value]) => (
		<li key={key}>
			{value} {key}
		</li>
	));

	let displayToppings;
	const hasToppings = orderDetails.toppings;
	const toppingArray = Array.from(orderDetails.toppings.keys());
	const toppingList = toppingArray.map((key) => <li key={key}>{key}</li>);

	if (hasToppings) {
		displayToppings = (
			<>
				<h3>Toppings {orderDetails.totals.toppings}</h3>
				{toppingList}
			</>
		);
	}

	return (
		<Container xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
			<Col>
				<Col>
					<h2>Order Summary</h2>
					<h3>Scoops {orderDetails.totals.scoops}</h3>
					{scoopList}

					{displayToppings}
				</Col>
				<h2>Total: {orderDetails.totals.grandTotal}</h2>

				<SummaryForm setOrderPhase={setOrderPhase} />
			</Col>
		</Container>
	);
};

export default OrderSummary;
