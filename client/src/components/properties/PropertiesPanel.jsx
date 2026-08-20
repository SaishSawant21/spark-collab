import {
	Button,
	Collapse,
	ColorPicker,
	Flex,
	InputNumber,
	message,
	Space,
	Typography,
} from "antd";
import { useContext } from "react";
import { BoardContext } from "../../context/BoardContext";
import { messageContants, TOOLS } from "../../utils/constants";
import PropertyField from "./PropertyField";
import { socket } from "../../socket";
import { saveBoardElement } from "../../services/boardElementService";

const PropertiesPanel = ({ selectedElement }) => {
	const {
		updateElements,
		bringForward,
		sendBackward,
		bringToFront,
		sendToBack,
	} = useContext(BoardContext);

	if (!selectedElement) {
		return null;
	}

	const elementData = selectedElement.element_data;

	const elementType =
		selectedElement.element_type.charAt(0).toUpperCase() +
		selectedElement.element_type.slice(1);

	const updateElementProperty = async (property, value) => {
		if (value == null) return;

		const updatedElement = {
			...selectedElement,
			element_data: {
				...selectedElement.element_data,
				[property]: value,
			},
		};

		updateElements((prev) =>
			prev.map((element) =>
				element.id === selectedElement.id
					? updatedElement
					: element
			)
		);

		try {
			await saveBoardElement(updatedElement);
			socket.emit("element-updated", updatedElement);
		} catch (error) {
			message.error(
				error?.response?.data?.message ||
				messageContants.somethingWerntWrong
			);

			console.log("Error:", error);
		}
	};

	const updatePoint = async (index, value) => {
		if (value == null) return;

		const points = [...selectedElement.element_data.points];
		points[index] = value;

		const updatedElement = {
			...selectedElement,
			element_data: {
				...selectedElement.element_data,
				points,
			},
		};

		updateElements((prev) =>
			prev.map((element) =>
				element.id === selectedElement.id
					? updatedElement
					: element
			)
		);

		try {
			await saveBoardElement(updatedElement);
			socket.emit("element-updated", updatedElement);
		} catch (error) {
			message.error(
				error?.response?.data?.message ||
				messageContants.somethingWerntWrong
			);

			console.log("Error:", error);
		}
	};

	const numberInput = (value, onChange, min = undefined, max = undefined) => (
		<InputNumber
			size="middle"
			min={min}
			max={max}
			value={value}
			onChange={onChange}
			className="!w-full !rounded-lg"
		/>
	);

	const renderGeometry = () => {
		switch (selectedElement.element_type) {
			case TOOLS.RECTANGLE:
				return (
					<div className="grid grid-cols-2 gap-x-3">
						<PropertyField label="X">
							{numberInput(elementData.x, (value) =>
								updateElementProperty("x", value)
							)}
						</PropertyField>

						<PropertyField label="Y">
							{numberInput(elementData.y, (value) =>
								updateElementProperty("y", value)
							)}
						</PropertyField>

						<PropertyField label="Width">
							{numberInput(
								elementData.width,
								(value) =>
									updateElementProperty(
										"width",
										value
									),
								1
							)}
						</PropertyField>

						<PropertyField label="Height">
							{numberInput(
								elementData.height,
								(value) =>
									updateElementProperty(
										"height",
										value
									),
								1
							)}
						</PropertyField>
					</div>
				);

			case TOOLS.CIRCLE:
				return (
					<div className="grid grid-cols-2 gap-x-3">
						<PropertyField label="X">
							{numberInput(elementData.x, (value) =>
								updateElementProperty("x", value)
							)}
						</PropertyField>

						<PropertyField label="Y">
							{numberInput(elementData.y, (value) =>
								updateElementProperty("y", value)
							)}
						</PropertyField>

						<PropertyField label="Radius">
							{numberInput(
								elementData.radius,
								(value) =>
									updateElementProperty(
										"radius",
										value
									),
								1
							)}
						</PropertyField>
					</div>
				);

			case TOOLS.ELLIPSE:
				return (
					<div className="grid grid-cols-2 gap-x-3">
						<PropertyField label="X">
							{numberInput(elementData.x, (value) =>
								updateElementProperty("x", value)
							)}
						</PropertyField>

						<PropertyField label="Y">
							{numberInput(elementData.y, (value) =>
								updateElementProperty("y", value)
							)}
						</PropertyField>

						<PropertyField label="Radius X">
							{numberInput(
								elementData.radiusX,
								(value) =>
									updateElementProperty(
										"radiusX",
										value
									),
								1
							)}
						</PropertyField>

						<PropertyField label="Radius Y">
							{numberInput(
								elementData.radiusY,
								(value) =>
									updateElementProperty(
										"radiusY",
										value
									),
								1
							)}
						</PropertyField>
					</div>
				);

			case TOOLS.LINE:
			case TOOLS.ARROW: {
				const [x1, y1, x2, y2] = elementData.points;

				return (
					<div className="grid grid-cols-2 gap-x-3">
						<PropertyField label="Start X">
							{numberInput(x1, (value) =>
								updatePoint(0, value)
							)}
						</PropertyField>

						<PropertyField label="Start Y">
							{numberInput(y1, (value) =>
								updatePoint(1, value)
							)}
						</PropertyField>

						<PropertyField label="End X">
							{numberInput(x2, (value) =>
								updatePoint(2, value)
							)}
						</PropertyField>

						<PropertyField label="End Y">
							{numberInput(y2, (value) =>
								updatePoint(3, value)
							)}
						</PropertyField>
					</div>
				);
			}

			default:
				return null;
		}
	};

	const renderArrange = () => {
		return (
			<Space
				direction="vertical"
				size={8}
				className="!flex !w-full"
			>
				<Button
					block
					onClick={() => bringForward(selectedElement.id)}
					className="!h-9 !rounded-lg !text-sm !text-slate-600 hover:!border-emerald-300 hover:!text-emerald-600"
				>
					Bring Forward
				</Button>

				<Button
					block
					onClick={() => sendBackward(selectedElement.id)}
					className="!h-9 !rounded-lg !text-sm !text-slate-600 hover:!border-emerald-300 hover:!text-emerald-600"
				>
					Send Backward
				</Button>

				<Button
					block
					onClick={() => bringToFront(selectedElement.id)}
					className="!h-9 !rounded-lg !text-sm !text-slate-600 hover:!border-emerald-300 hover:!text-emerald-600"
				>
					Bring To Front
				</Button>

				<Button
					block
					onClick={() => sendToBack(selectedElement.id)}
					className="!h-9 !rounded-lg !text-sm !text-slate-600 hover:!border-emerald-300 hover:!text-emerald-600"
				>
					Send To Back
				</Button>
			</Space>
		);
	};

	return (
		<div>
			{/* Selected element */}
			<div className="mb-4 flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
				<div>
					<Typography.Text className="!block !text-[11px] !font-medium !uppercase !tracking-wider !text-slate-400">
						Selected
					</Typography.Text>

					<Typography.Text className="!text-sm !font-semibold !text-slate-700">
						{elementType}
					</Typography.Text>
				</div>

				<div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-50">
					<span className="text-sm font-semibold text-emerald-600">
						✦
					</span>
				</div>
			</div>

			{/* Properties */}
			<Collapse
				bordered={false}
				defaultActiveKey={["appearance", "geometry"]}
				className="!bg-transparent"
				items={[
					{
						key: "appearance",
						label: (
							<span className="font-medium text-slate-700">
								Appearance
							</span>
						),
						children: (
							<div className="space-y-1">
								<PropertyField label="Fill">
									<Flex align="center" gap={8}>
										<ColorPicker
											value={elementData.fill}
											onChange={(value) =>
												updateElementProperty(
													"fill",
													value.toHexString()
												)
											}
											showText
										/>
									</Flex>
								</PropertyField>

								<PropertyField label="Stroke">
									<Flex align="center" gap={8}>
										<ColorPicker
											value={elementData.stroke}
											onChange={(value) =>
												updateElementProperty(
													"stroke",
													value.toHexString()
												)
											}
											showText
										/>
									</Flex>
								</PropertyField>

								<PropertyField label="Stroke Width">
									{numberInput(
										elementData.strokeWidth,
										(value) =>
											updateElementProperty(
												"strokeWidth",
												value
											),
										1,
										20
									)}
								</PropertyField>
							</div>
						),
					},
					{
						key: "geometry",
						label: (
							<span className="font-medium text-slate-700">
								Geometry
							</span>
						),
						children: renderGeometry(),
					},
					{
						key: "arrange",
						label: (
							<span className="font-medium text-slate-700">
								Arrange
							</span>
						),
						children: renderArrange(),
					},
				]}
			/>
		</div>
	);
};
export default PropertiesPanel;
