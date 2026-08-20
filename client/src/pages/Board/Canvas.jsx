import { Stage, Layer } from "react-konva";
import { useContext, useEffect, useRef, useState } from "react";
import { Transformer } from "react-konva";

import { BoardContext } from "../../context/BoardContext";

import useDrawing from "../hooks/useDrawing";
import useTransformer from "../hooks/useTransformer";
import useSelection from "../hooks/useSelection";
import useKeyboard from "../hooks/useKeyboard";
import useKeyboardShortcuts from "../hooks/useKeyboardShortcuts";

import elementRegistry from "./elements/elementRegistry";

import { TOOLS } from "../../utils/constants";
import {
	getCanvasCursor,
	getZoomedStagePosition,
} from "../../utils/canvasUtils";
import TextEditor from "./elements/TextEditor";
const Canvas = () => {
	const {
		currentElement,
		elements,
		scale,
		stagePosition,
		selectedTool,
		setScale,
		setStagePosition,
		stageRef,
	} = useContext(BoardContext);

	const containerRef = useRef(null);

	const [stageSize, setStageSize] = useState({
		width: 0,
		height: 0,
	});

	const transformerRef = useRef(null);
	const elementRefs = useRef({});

	const {
		handleMouseDown,
		handleMouseMove,
		handleMouseUp,
	} = useDrawing();

	const { handleStageDown } = useSelection();

	useKeyboard();
	useTransformer({
		transformerRef,
		elementRefs,
	});
	useKeyboardShortcuts();

	const renderCurrentElement = (elementData) => {
		const Component =
			elementRegistry[
				elementData?.element_type
			]?.component;

		return Component ? (
			<Component element={elementData} />
		) : null;
	};

	const handleWheel = (e) => {
		e.evt.preventDefault();

		const stage = e.target.getStage();

		const oldScale = scale;

		const scaleBy = 1.05;

		let newScale;

		if (e.evt.deltaY < 0) {
			newScale = oldScale * scaleBy;
		} else {
			newScale = oldScale / scaleBy;
		}

		// Keep zoom within limits
		newScale = Math.max(
			0.2,
			Math.min(3, newScale)
		);

		const newPosition =
			getZoomedStagePosition(
				stage,
				newScale
			);

		setScale(newScale);
		setStagePosition(newPosition);
	};

	useEffect(() => {
		if (!containerRef.current) return;

		const resizeObserver =
			new ResizeObserver(([entry]) => {
				const {
					width,
					height,
				} = entry.contentRect;

				setStageSize({
					width,
					height,
				});
			});

		resizeObserver.observe(
			containerRef.current
		);

		return () =>
			resizeObserver.disconnect();
	}, []);

	return (
		<div
			className="relative w-full h-full bg-slate-100"
			ref={containerRef}
			style={{
				cursor: getCanvasCursor(
					selectedTool
				),
			}}
		>
			<Stage
				width={stageSize.width}
				height={stageSize.height}
				onMouseMove={handleMouseMove}
				ref={stageRef}
				onMouseDown={(e) => {
					if (e.evt.button === 1) {
						e.evt.preventDefault();
						handleMouseDown(e);
						return;
					}

					handleMouseDown(e);
					handleStageDown(e);
				}}
				scaleX={scale}
				scaleY={scale}
				x={stagePosition.x}
				y={stagePosition.y}
				onMouseUp={handleMouseUp}
				draggable={
					selectedTool === TOOLS.SELECT
				}
				onWheel={handleWheel}
			>
				<Layer>
					<Transformer
						ref={transformerRef}
						rotateEnabled={false}
					/>
					{[...elements]
						.sort(
							(a, b) =>
								(a.element_data?.zIndex ??
									0) -
								(b.element_data?.zIndex ??
									0)
						)
						.map((element) => {
							const Component =
								elementRegistry[
									element?.element_type
								]?.component;

							return Component ? (
								<Component
									key={element.id}
									element={element}
									ref={(node) => {
										if (node) {
											elementRefs.current[
												element.id
											] = node;
										} else {
											delete elementRefs
												.current[
												element.id
											];
										}
									}}
								/>
							) : null;
						})}
					{currentElement &&
						renderCurrentElement(
							currentElement
						)}
				</Layer>
			</Stage>
			<TextEditor />
		</div>
	);
};
export default Canvas;
