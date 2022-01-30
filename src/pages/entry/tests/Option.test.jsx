import { render, screen } from '../../../test-utils/testing-libray-utils'
import "@testing-library/jest-dom/extend-expect";

import Options from "../Options";
import ToppingOptions from "../TooppingsOptions";

test("displays image for each scoop option from server", async () => {
	render(<Options optionType="scoops" />);

	const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
	expect(scoopImages).toHaveLength(2);

	// array of alt text
	const altText = scoopImages.map((element) => element.alt);
	expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("display image for each topping from server", async () => {
	render(<Options optionType="toppings" />);

	const toppingsImages = await screen.findAllByRole("img", {
		name: /topping/i
	});
	expect(toppingsImages).toHaveLength(3);

	const altText = toppingsImages.map((element) => element.alt);
	expect(altText).toEqual([
		"Cherries topping",
		"M&Ms topping",
		"Hot fudge topping"
	]);
});
