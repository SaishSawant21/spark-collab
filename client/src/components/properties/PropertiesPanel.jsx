import { Button, Collapse, ColorPicker, Form, InputNumber, Space, Typography } from "antd";
import { useContext } from "react";
import { BoardContext } from "../../context/BoardContext";
import { TOOLS } from "../../utils/constants";
import PropertyField from "./PropertyField";

const PropertiesPanel = ({ selectedElement }) => {
	const { updateElements, bringForward, sendBackward } = useContext(BoardContext);

	if (!selectedElement) {
		return <>Empty State</>;
	}

	const elementData = selectedElement.element_data;

	const updateElementProperty = (property, value) => {
		if (value == null) return;

		updateElements((prev) =>
			prev.map((element) => {
				if (element.id !== selectedElement.id) return element;

				return {
					...element,
					element_data: {
						...element.element_data,
						[property]: value,
					},
				};
			})
		);
	};

	const updatePoint = (index, value) => {
		if (value == null) return;

		updateElements((prev) =>
			prev.map((element) => {
				if (element.id !== selectedElement.id) return element;

				const points = [...element.element_data.points];
				points[index] = value;

				return {
					...element,
					element_data: {
						...element.element_data,
						points,
					},
				};
			})
		);
	};

	const renderGeometry = () => {
		switch (selectedElement.element_type) {
			case TOOLS.RECTANGLE:
				return (
					<Form layout="vertical">
						<PropertyField label="X">
							<InputNumber
								value={elementData.x}
								onChange={(value) =>
									updateElementProperty("x", value)
								}
							/>
						</PropertyField>

						<PropertyField label="Y">
							<InputNumber
								value={elementData.y}
								onChange={(value) =>
									updateElementProperty("y", value)
								}
							/>
						</PropertyField>

						<PropertyField label="Width">
							<InputNumber
								min={1}
								value={elementData.width}
								onChange={(value) =>
									updateElementProperty("width", value)
								}
							/>
						</PropertyField>

						<PropertyField label="Height">
							<InputNumber
								min={1}
								value={elementData.height}
								onChange={(value) =>
									updateElementProperty("height", value)
								}
							/>
						</PropertyField>
					</Form>
				);

			case TOOLS.CIRCLE:
				return (
					<Form layout="vertical">
						<PropertyField label="X">
							<InputNumber
								value={elementData.x}
								onChange={(value) =>
									updateElementProperty("x", value)
								}
							/>
						</PropertyField>

						<PropertyField label="Y">
							<InputNumber
								value={elementData.y}
								onChange={(value) =>
									updateElementProperty("y", value)
								}
							/>
						</PropertyField>

						<PropertyField label="Radius">
							<InputNumber
								min={1}
								value={elementData.radius}
								onChange={(value) =>
									updateElementProperty("radius", value)
								}
							/>
						</PropertyField>
					</Form>
				);

			case TOOLS.ELLIPSE:
				return (
					<Form layout="vertical">
						<PropertyField label="X">
							<InputNumber
								value={elementData.x}
								onChange={(value) =>
									updateElementProperty("x", value)
								}
							/>
						</PropertyField>

						<PropertyField label="Y">
							<InputNumber
								value={elementData.y}
								onChange={(value) =>
									updateElementProperty("y", value)
								}
							/>
						</PropertyField>

						<PropertyField label="Radius X">
							<InputNumber
								min={1}
								value={elementData.radiusX}
								onChange={(value) =>
									updateElementProperty("radiusX", value)
								}
							/>
						</PropertyField>

						<PropertyField label="Radius Y">
							<InputNumber
								min={1}
								value={elementData.radiusY}
								onChange={(value) =>
									updateElementProperty("radiusY", value)
								}
							/>
						</PropertyField>
					</Form>
				);

			case TOOLS.LINE:
			case TOOLS.ARROW: {
				const [x1, y1, x2, y2] = elementData.points;

				return (
					<Form layout="vertical">
						<PropertyField label="Start X">
							<InputNumber
								value={x1}
								onChange={(value) => updatePoint(0, value)}
							/>
						</PropertyField>

						<PropertyField label="Start Y">
							<InputNumber
								value={y1}
								onChange={(value) => updatePoint(1, value)}
							/>
						</PropertyField>

						<PropertyField label="End X">
							<InputNumber
								value={x2}
								onChange={(value) => updatePoint(2, value)}
							/>
						</PropertyField>

						<PropertyField label="End Y">
							<InputNumber
								value={y2}
								onChange={(value) => updatePoint(3, value)}
							/>
						</PropertyField>
					</Form>
				);
			}

			default:
				return null;
		}
	};
	const renderArrange = () => {
		return (
			<Form layout="vertical">
				<PropertyField>
					<Space>
						<Button
							block
							onClick={() =>
								bringForward(selectedElement.id)
							}
						>
							Bring Forward
						</Button>
						<Button
							block
							onClick={() => sendBackward(selectedElement.id)}
						>
							Send Backward
						</Button>
					</Space>
				</PropertyField>
			</Form>
		);
	};

	return (
		<>
			<Typography.Title level={5} className="!mb-3">
				{selectedElement.element_type.charAt(0).toUpperCase() +
					selectedElement.element_type.slice(1)}
			</Typography.Title>

			<Collapse
				// defaultActiveKey={["appearance", "geometry"]}
				ghost
				items={[
					{
						key: "appearance",
						label: "Appearance",
						children: (
							<Form layout="vertical">
								<PropertyField label="Fill">
									<ColorPicker
										value={elementData.fill}
										onChange={(value) =>
											updateElementProperty(
												"fill",
												value.toHexString()
											)
										}
									/>
								</PropertyField>

								<PropertyField label="Stroke">
									<ColorPicker
										value={elementData.stroke}
										onChange={(value) =>
											updateElementProperty(
												"stroke",
												value.toHexString()
											)
										}
									/>
								</PropertyField>

								<PropertyField label="Stroke Width">
									<InputNumber
										min={1}
										max={20}
										value={elementData.strokeWidth}
										onChange={(value) =>
											updateElementProperty(
												"strokeWidth",
												value
											)
										}
									/>
								</PropertyField>
							</Form>
						),
					},
					{
						key: "geometry",
						label: "Geometry",
						children: renderGeometry(),
					},
					{
						key: "arrange",
						label: "Arrange",
						children: renderArrange(),
					}
				]}
			/>
		</>
	);
};

export default PropertiesPanel;