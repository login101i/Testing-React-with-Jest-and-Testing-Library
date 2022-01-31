import {
	render,
	screen,
	
} from "../../../test-utils/testing-libray-utils";
import "@testing-library/jest-dom/extend-expect";
import { rest } from "msw";

import OrderConfirmation from "../OrderConfirmation";
import { server } from "../../../mocks/server";

test("testing alert when error from server appears", async () => {
	server.resetHandlers(
		rest.post("http://localhost:3030/order", (req, res, cts) => {
			res(ctx.status(500));
		})
	);

	render(<OrderConfirmation setOrderPhase={jest.fn()} />);


		const alert = await screen.findByRole("alert");
		expect(alert).toHaveTextContent("Unexpected error. Please try later");

});
