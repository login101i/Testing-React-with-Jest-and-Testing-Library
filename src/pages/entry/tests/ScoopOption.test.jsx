import { render, screen } from "../../../test-utils/testing-libray-utils";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import ScoopOptions from "../ScoopOption";

test("Validation scoop inputs", () => {
	render(<ScoopOptions name="" imagePath="" updateItemCount={jest.fn()} />);

	// inputs invalid with negative number
	const vanillaInput = screen.getByRole("spinbutton");
	userEvent.clear(vanillaInput);
	userEvent.type(vanillaInput, "-1");
	expect(vanillaInput).toHaveClass("is-invalid");

	// invalid with negative numbers
	userEvent.clear(vanillaInput);
	userEvent.type(vanillaInput, "-3.8");
	expect(vanillaInput).toHaveClass("is-invalid");

	// invalid with too-hight number
	userEvent.clear(vanillaInput);
	userEvent.type(vanillaInput, "11");
	expect(vanillaInput).toHaveClass("is-invalid");

	// number is Valid

	// invalid with too-hight number
	userEvent.clear(vanillaInput);
	userEvent.type(vanillaInput, "7");
	expect(vanillaInput).not.toHaveClass("is-invalid");
});

