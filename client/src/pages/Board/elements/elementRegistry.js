import { TOOLS } from "../../../utils/constants";
import ArrowElement from "./ArrowElement";
import CircleElement from "./CircleElement";
import EllipseElement from "./EllipseElement";
import LineElement from "./LineElement";
import Rectangle from "./Rectangle";
import Text from "./Text";

const elementRegistry = {
	rectangle: {
		component: Rectangle,
		isValid: (element) => {
			return (
				Math.abs(element.element_data.width) > 5 &&
				Math.abs(element.element_data.height) > 5
			);
		},
	},

	line: {
		component: LineElement,
		isValid: (element) => {
			const [x1, y1, x2, y2] = element.element_data.points;
			return !(x1 === x2 && y1 === y2)
		},
	},

	circle: {
		component: CircleElement,
		isValid: (element) => {
			return element.element_data.radius > 5;
		},
	},
	arrow: {
		component: ArrowElement,
		isValid: (element) => {
			const [x1, y1, x2, y2] = element.element_data.points;
			return !(x1 === x2 && y1 === y2)
		},
	},
	ellipse: {
		component: EllipseElement,
		isValid: (element) =>
			element.element_data.radiusX > 5 &&
			element.element_data.radiusY > 5,
	},
	[TOOLS.TEXT]: {
		component: Text,
		isValid: (element) => {
			return Boolean(
				element?.element_data?.text?.trim()
			);
		},
	},
};
export default elementRegistry;
