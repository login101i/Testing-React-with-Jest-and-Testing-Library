import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const checkboxLabel = <span>I agree to terms and conditions</span>;

const SummaryForm = ({ setOrderPhase }) => {
	const [enabled, setEnabled] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		setOrderPhase("confirmation");
	};
	return (
		<>
			<Form onSubmit={handleSubmit}>
				<Button
					variant="primary"
					type="submit"
					disabled={!enabled}
					type="submit"
				>
					Confirm order
				</Button>

				<Form.Group className="mb-3" controlId="terms-and-conditions">
					<Form.Check
						type="checkbox"
						checked={enabled}
						onChange={(e) => setEnabled(e.target.checked)}
						label={checkboxLabel}
					/>
				</Form.Group>
			</Form>
		</>
	);
};

export default SummaryForm;
