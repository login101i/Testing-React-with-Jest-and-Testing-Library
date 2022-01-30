import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import SummaryForm from "./SummaryForm";

test("initial test of checkbox", () => {
	render(<SummaryForm />);
	const confirmButton = screen.getByRole("button", { name: /confirm order/i });
	expect(confirmButton).toBeDisabled();

	const checkbox = screen.getByRole("checkbox", {
		name: /terms and conditions/i
	});
	expect(checkbox).not.toBeChecked();
	fireEvent.click(checkbox);
	expect(confirmButton).toBeEnabled();
	fireEvent.click(checkbox);
	expect(confirmButton).toBeDisabled();
});
