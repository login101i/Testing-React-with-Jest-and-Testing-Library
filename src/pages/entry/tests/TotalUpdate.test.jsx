import {
	render,
	screen,
	waitFor
} from "../../../test-utils/testing-libray-utils";
import userEvent from "@testing-library/user-event";

import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
	render(<Options optionType="scoops" />);

	// make sure total starts out $0.00
	const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
	expect(scoopsSubtotal).toHaveTextContent("0.00");

	// update vanilla scoops to 1 and check the subtotal
	const vanillaInput = await screen.findByRole("spinbutton", {
		name: "Vanilla"
	});
	userEvent.clear(vanillaInput);
	userEvent.type(vanillaInput, "1");
	expect(scoopsSubtotal).toHaveTextContent("9.00");

	// update chocolate scoops to 2 and check subtotal
	const chocolateInput = await screen.findByRole("spinbutton", {
		name: "Chocolate"
	});
	userEvent.clear(chocolateInput);
	userEvent.type(chocolateInput, "2");
	expect(scoopsSubtotal).toHaveTextContent("27.00");
});

// ----------------------------------------------------------------
test("update toppings subtotal when toppings are added", async () => {
	render(<Options optionType="toppings" />);

	const toppingsSubtotal = screen.getByText("Toppings total: $", {
		exact: false
	});
	expect(toppingsSubtotal).toHaveTextContent("0.00");

	const MMsCheckbox = await screen.findByRole("checkbox", { name: "M&Ms" });
	userEvent.click(MMsCheckbox);
	expect(toppingsSubtotal).toHaveTextContent("1.00");

	const CherriesCheckbox = await screen.findByRole("checkbox", {
		name: "Cherries"
	});
	userEvent.click(CherriesCheckbox);
	expect(toppingsSubtotal).toHaveTextContent("2.00");

	userEvent.click(MMsCheckbox);
	expect(toppingsSubtotal).toHaveTextContent("1.00");
});

describe("grand total", () => {
	test("GrandTodal updates properly if scoop is added first", async () => {
		render(<OrderEntry />);

		const grandTotal = screen.getByRole("heading", { name: /Grand total:\$/ });
		expect(grandTotal).toHaveTextContent("0.00");

		const vanillaInput = await screen.findByRole("spinbutton", {
			name: "Vanilla"
		});

		userEvent.clear(vanillaInput);
		userEvent.type(vanillaInput, "1");
		expect(grandTotal).toHaveTextContent("9.00");

		const CherriesCheckbox = await screen.findByRole("checkbox", {
			name: "Cherries"
		});
		userEvent.click(CherriesCheckbox);
		expect(grandTotal).toHaveTextContent("10.00");
	});

	test("GrandTodal updates properly if toppings is added first", async () => {
		render(<OrderEntry />);
		const grandTotal = screen.getByRole("heading", { name: /Grand total:\$/ });
		expect(grandTotal).toHaveTextContent("0.00");

		const CherriesCheckbox = await screen.findByRole("checkbox", {
			name: "Cherries"
		});

		userEvent.click(CherriesCheckbox);

		expect(grandTotal).toHaveTextContent("1.00");

		const vanillaInput = await screen.findByRole("spinbutton", {
			name: "Vanilla"
		});

		userEvent.clear(vanillaInput);
		userEvent.type(vanillaInput, "2");
		expect(grandTotal).toHaveTextContent("19.00");
	});
});
