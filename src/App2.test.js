import { render, screen, jest } from "./test-utils/testing-libray-utils";
import "@testing-library/jest-dom/extend-expect";

import App2 from "./App2";
import userEvent from "@testing-library/user-event";

test("Order phases for happy path", async () => {

	render(<App2 />);
	// OrderEntry page----------------
	const VanillaInput = await screen.findByRole("spinbutton", {
		name: "Vanilla"
	});
	userEvent.clear(VanillaInput);
	userEvent.type(VanillaInput, "1");

	const ChocolateInput = await screen.findByRole("spinbutton", {
		name: "Chocolate"
	});
	userEvent.clear(ChocolateInput);
	userEvent.type(ChocolateInput, "2");

	const cherriesCheckbox = await screen.findByRole("checkbox", {
		name: "Cherries"
	});
	userEvent.click(cherriesCheckbox);

	// find and click order button
	const orderButton = screen.getByRole("button", { name: "Order now" });
	userEvent.click(orderButton);

	// check summary information
	const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
	expect(summaryHeading).toBeInTheDocument();

	const scoopsHeading = screen.getByRole("heading", { name: "Scoops $27.00" });
	expect(scoopsHeading).toBeInTheDocument();

	const toppingsHeading = screen.getByRole("heading", {
		name: "Toppings $1.00"
	});
	expect(toppingsHeading).toBeInTheDocument();

	// Summary page-------------

	// SummaryOption
	expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
	expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
	expect(screen.getByText("Cherries")).toBeInTheDocument();

	// or I can do this also
	// const optionItems = screen.getAllByRole("listItem");
	// const optionItemsText = optionItems.map((item) => item.textContent);
	// expect(optionItemsText).toEqual(["1 Valilla", "2 Chocolate", "Cherries"]);

	// terms and conditions

	const tcCheckbox = screen.getByRole("checkbox", {
		name: /I agree to terms and conditions/i
	});

	userEvent.click(tcCheckbox);

	const confirmButton = screen.getByRole("button", { name: /confirm order/i });
	userEvent.click(confirmButton);

	// confirmation page----------------

	const thankYouHeader = await screen.findByRole("heading", {
		name: /Thank You!/i
	});
	expect(thankYouHeader).toBeInTheDocument();

	const orderNumber = await screen.findByText(/order number is/i);
	expect(orderNumber).toBeInTheDocument();

	const newOrderButton = screen.getByRole("button", {
		name: /Create new order/i
	});
	userEvent.click(newOrderButton);

	//orderEntry page -------------

	const ScoopsTotal = screen.getByText("Scoops total: $0.00");
	expect(ScoopsTotal).toBeInTheDocument();
	const ToppingTotal = screen.getByText("Toppings total: $0.00");
	expect(ToppingTotal).toBeInTheDocument();

	await screen.findByRole("spinbutton", { name: "Vanilla" });
	await screen.findByRole("checkbox", { name: "Cherries" });

});
