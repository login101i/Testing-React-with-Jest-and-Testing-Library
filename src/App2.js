import React, { useState } from "react";
import Container from "react-bootstrap/Container";

import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";

import { OrderDetailsProvider } from "./context/OrderDetails";

const App2 = () => {
	const [orderPhase, setOrderPhase] = useState("In progress");
	console.log(orderPhase);

	let Component = OrderEntry;
	switch (orderPhase) {
		case "In progress":
			Component = OrderEntry;
			break;
		case "review":
			Component = OrderSummary;
			break;
		case "confirmation":
			Component = OrderConfirmation;
			break;
	}

	return (
		<Container>
			<OrderDetailsProvider>
				<Component setOrderPhase={setOrderPhase} />
			</OrderDetailsProvider>
		</Container>
	);
};

export default App2;
