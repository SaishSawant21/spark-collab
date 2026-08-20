import { Text as KonvaText } from "react-konva";
import { forwardRef, useContext } from "react";
import { BoardContext } from "../../../context/BoardContext";
import useElementInteractions from "../../hooks/useElementInteractions";
import useTextEditor from "../../hooks/useTextEditor";

const Text = forwardRef(({ element }, ref) => {
	const { selectedElementId,
		editingTextId,
	} = useContext(BoardContext);

	const interactions = useElementInteractions(element);

	const { startEditing } = useTextEditor();

	const data = element.element_data;
	if (editingTextId === element.id) {
		return null;
	}
	return (
		<KonvaText
			ref={ref}
			x={data.x}
			y={data.y}
			text={data.text}
			fontSize={data.fontSize}
			fill={
				selectedElementId === element.id
					? "#1677ff"
					: data.fill
			}
			width={data.width}
			draggable={interactions.draggable}
			onMouseDown={interactions.handleSelect}
			onDblClick={() => {
				startEditing(element)
			}}
			onDragEnd={interactions.handleDragEnd}
			onTransformEnd={interactions.transformElement}
			draggable={interactions.draggable}
			onMouseDown={interactions.handleSelect}
			onDragEnd={interactions.handleDragEnd}
		/>
	);
});
export default Text;
