import { useState } from "react";

import "./App.css";
import Options from "./pages/entry/Options";
// import EffectTutorial from "./UseEffect/EffectTutorial";

export function replaceCamelWithSpaces(colorName) {
	return colorName.replace(/\B([A-Z])\B/g, " $1");
}
function App() {
	const [disabled, setDisabled] = useState(false);
	const [buttonGrey, setButtonGrey] = useState(false);
	const [buttonColor, setButtonColor] = useState("MediumVioletRed");

	console.log(disabled);
	console.log(buttonGrey);

	const newButtonColor =
		buttonColor === "MediumVioletRed" ? "MidnightBlue" : "MediumVioletRed";

	return (
		<div>
			<button
				style={{
					backgroundColor: buttonGrey ? "grey" : buttonColor,
					color: "white"
				}}
				onClick={() => setButtonColor(newButtonColor)}
				disabled={disabled}
			>
				Change to {replaceCamelWithSpaces(newButtonColor)}
			</button>
			<input
				type="checkbox"
				defaultChecked={disabled}
				onChange={(e) => {
					setDisabled(e.target.checked);
					setButtonGrey(!buttonGrey);
				}}
				aria-checked={disabled}
				id="disable-button-checkbox"
			/>
			<label htmlFor="disable-button-checkbox">Disable button</label>
			<Options>Here are options</Options>
		</div>
	);
}

export default App;
