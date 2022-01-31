import axios from "axios";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import ScoopOption from "./ScoopOption";
import ToppingOptions from "./TooppingsOptions";
import AlertBanner from "../components/Alert";

import { pricePerItem } from "../../constants";
import { useOrderDetails } from "../../context/OrderDetails";
import { formatCurrency } from "../../utils";

export default function Options({ optionType }) {
	const [items, setItems] = useState([]);
	const [error, setError] = useState(false);


	const [orderDetails, updateItemCount] = useOrderDetails();

	// optionType is 'scoops' or 'toppings'
	useEffect(() => {
		axios
			.get(`http://localhost:3030/${optionType}`)
			.then((response) => setItems(response.data))
			.catch((error) => {
				setError(true);
			});
	}, [optionType]);

	if (error)
		return (
			<AlertBanner/>
		);

	// TODO: replace `null` with ToppingOption when available
	const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOptions;

	const optionItems = items.map((item) => (
		<ItemComponent
			key={item.name}
			name={item.name}
			imagePath={item.imagePath}
			updateItemCount={(itemName, newItemCount) =>
				updateItemCount(itemName, newItemCount, optionType)
			}
		/>
	));

	const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

	
	return (
		<>
			<h2>{title}</h2>
			<h4>{formatCurrency(pricePerItem[optionType])} each</h4>

			<h4>
				{title} total: {orderDetails.totals[optionType]}
			</h4>

			<Row>{optionItems}</Row>
		</>
	);
}
