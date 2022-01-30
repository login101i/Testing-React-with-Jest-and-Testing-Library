import { createContext, useState, useEffect, useMemo, useContext } from "react";
import { pricePerItem } from "../../src/constants";
import { formatCurrency } from "../utils";

const OrderDetails = createContext();

// custom hook

export function useOrderDetails() {
	const context = useContext(OrderDetails);

	if (!context) {
		throw new Error(
			"useOrderDetails must be used within useOrderDetailsProvider"
		);
	}

	return context;
}

function calculateSubtotal(optionType, optionCounts) {
	let optionCount = 0;
	for (const count of optionCounts[optionType].values()) {
		optionCount += count;
	}
	return optionCount * pricePerItem[optionType];
}

export function OrderDetailsProvider(props) {
	const [optionCounts, setOptionCounts] = useState({
		scoops: new Map(),
		toppings: new Map()
	});
	const zeroCurrency = formatCurrency(0);
	const [totals, setTotals] = useState({
		scoops: zeroCurrency,
		toppings: zeroCurrency,
		grandTotal: zeroCurrency
	});

	useEffect(() => {
		const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
		const toppingsSubtotal = calculateSubtotal("toppings", optionCounts);
		const grandTotal = scoopsSubtotal + toppingsSubtotal;
		setTotals({
			scoops: formatCurrency(scoopsSubtotal),
			toppings: formatCurrency(toppingsSubtotal),
			grandTotal: formatCurrency(grandTotal)
		});
		console.log(typeof grandTotal);
	}, [optionCounts]);

	// console.log(totals);
	function updateItemCount(itemName, newItemCount, optionType) {
		// const newOptionCounts = { ...optionCounts };

		// const optionCountsMapping = newOptionCounts[optionType];

		// optionCountsMapping.set(itemName, parseInt(newItemCount));

		// setOptionCounts(optionCountsMapping);

		// u góry moje, nie czaję czemu nie działa

		const newOptionCounts = { ...optionCounts };

		// update option count for this item with the new value
		const optionCountsMap = optionCounts[optionType];
		optionCountsMap.set(itemName, parseInt(newItemCount));

		setOptionCounts(newOptionCounts);
	}

	function clearOptionCounts() {
		setOptionCounts({ scoops: new Map(), toppings: new Map() });
		setTotals({
			scoops: zeroCurrency,
			toppings: zeroCurrency,
			grandTotal: zeroCurrency
		});
	}

	const value = useMemo(() => {
		return [{ ...optionCounts, totals }, updateItemCount, clearOptionCounts];
	}, [optionCounts, totals]);

	return <OrderDetails.Provider value={value} {...props} />;
}
