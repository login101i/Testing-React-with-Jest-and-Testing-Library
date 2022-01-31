import React, { useState } from "react";

import Options from "./Options";
import { useOrderDetails } from "../../context/OrderDetails";

const OrderEntry = ({ setOrderPhase }) => {
	const [orderDetails] = useOrderDetails();

	const buttonDisabled = orderDetails.totals.scoops === "$0.00";
	return (
		<div>
			<Options optionType="scoops" />
			<Options optionType="toppings" />

			<h2>Grand total:{orderDetails.totals.grandTotal}</h2>
			<button onClick={() => setOrderPhase("review")} disabled={buttonDisabled}>
				Order now
			</button>
		</div>
	);
};

export default OrderEntry;
