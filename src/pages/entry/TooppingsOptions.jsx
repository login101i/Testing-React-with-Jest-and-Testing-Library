import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const ToopingOptions = ({ name, imagePath, updateItemCount }) => {
	const handleChange = (event) => {
		updateItemCount(name, event.target.checked ? 1 : 0);
	};
	return (
		<Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
			<img
				alt={`${name} topping`}
				src={`http://localhost:3030/${imagePath}`}
				style={{ width: "75%" }}
			/>

			<Form.Group className="mb-3" controlId={`${name}-topping-checkbox`}>
				<Form.Check type="checkbox" label={name} onChange={handleChange} />
			</Form.Group>
		</Col>
	);
};

export default ToopingOptions;
