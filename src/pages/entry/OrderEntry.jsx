import React from "react";

import Options from "./Options";
import { useOrderDetails } from "../../context/OrderDetails";

const OrderEntry = ({ setOrderPhase }) => {
	const [orderDetails] = useOrderDetails();

	return (
		<div>
			<Options optionType="scoops" />
			<Options optionType="toppings" />

			<h2>Grand total:{orderDetails.totals.grandTotal}</h2>
			<button onClick={() => setOrderPhase("review")}>Order now</button>
		</div>
	);
};

export default OrderEntry;
