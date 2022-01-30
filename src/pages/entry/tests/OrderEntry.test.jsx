import {
	render,
	screen,
	waitFor
} from "../../../test-utils/testing-libray-utils";
import "@testing-library/jest-dom/extend-expect";
import { rest } from "msw";

import { server } from "../../../mocks/server";

import OrderEntry from "../OrderEntry";

test("handles error for scoops and topping routers", async () => {
	server.resetHandlers(
		rest.get("http://localhost:3030/scoops", (req, res, cts) => {
			res(ctx.status(500));
		}),
		rest.get("http://localhost:3030/toppings", (req, res, cts) => {
			res(ctx.status(500));
		}),
		rest.get("http://localhost:3030/order", (req, res, cts) => {
			res(ctx.status(500));
		})
	);

	render(<OrderEntry setOrderPhase={jest.fn()} />);
	// waitFor because we want two alerts. Test await, finds one and goes to next line but we must wait for all 'alerts'.
	waitFor(async () => {
		const alerts = await screen.findAllByRole("alert");
		expect(alerts).toHaveLength(2);
	});
});
