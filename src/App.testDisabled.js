import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { replaceCamelWithSpaces } from "./App";

import App from "./App";

test("Initial test of button color", () => {
	render(<App />);
	const buttonColor = screen.getByRole("button", {
		name: "Change to Midnight Blue"
	});
	expect(buttonColor).toHaveStyle({ backgroundColor: "MediumVioletRed" });
});

test("Button turns MidnightBlue when button is clicked", () => {
	render(<App />);
	const buttonColor = screen.getByRole("button", {
		name: "Change to Midnight Blue"
	});
	expect(buttonColor).toBeInTheDocument();
	expect(buttonColor).toHaveStyle({ backgroundColor: "MediumVioletRed" });

	fireEvent.click(buttonColor);
	expect(buttonColor).toHaveStyle({ backgroundColor: "MidnightBlue" });
	expect(buttonColor).toHaveTextContent("Change to Medium Violet Red");
});

test("checkbox initial conditions", () => {
	render(<App />);
	const colorButton = screen.getByRole("button", {
		name: "Change to Midnight Blue"
	});
	expect(colorButton).toBeEnabled();

	const checkbox = screen.getByRole("checkbox");
	expect(checkbox).not.toBeChecked();
});

test("disabled button after clicking on checkbox", () => {
	render(<App />);

	const colorButton = screen.getByRole("button", {
		name: "Change to Midnight Blue"
	});
	const checkbox = screen.getByRole("checkbox", { name: "Disable button" });

	fireEvent.click(checkbox);
	expect(colorButton).toBeDisabled();
});

test("check whether by clicking on checkbox, button background turns from Medium Violet Red to grey", () => {
	render(<App />);
	const colorButton = screen.getByRole("button", {
		name: "Change to Midnight Blue"
	});

	const checkbox = screen.getByRole("checkbox", { name: "Disable button" });

	fireEvent.click(checkbox);
	expect(colorButton).toHaveStyle({ backgroundColor: "grey" });

	fireEvent.click(checkbox);
	expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });
});

test("check whether by clicking on checkbox, button background turns from MidnightBlue to grey", () => {
	render(<App />);
	const colorButton = screen.getByRole("button", {
		name: "Change to Midnight Blue"
	});
	const checkbox = screen.getByRole("checkbox", { name: "Disable button" });

	fireEvent.click(colorButton);

	fireEvent.click(checkbox);
	expect(colorButton).toHaveStyle({ backgroundColor: "grey" });

	fireEvent.click(checkbox);
	expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });
});

describe("Spaces bofore camel-case capital letters", () => {
	test("Works for no inner capital letters", () => {
		expect(replaceCamelWithSpaces("Red")).toBe("Red");
	});
	test("Works for one inner capital letter", () => {
		expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
	});
	test("Works for multiple inner capital letters", () => {
		expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
	});
});
