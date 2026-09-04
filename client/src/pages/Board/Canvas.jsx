import { Stage, Layer, Transformer } from "react-konva";
import { useContext, useEffect, useRef, useState } from "react";

import { BoardContext } from "../../context/BoardContext";

import useDrawing from "../hooks/useDrawing";
import useTransformer from "../hooks/useTransformer";
import useSelection from "../hooks/useSelection";
import useKeyboardShortcuts from "../hooks/useKeyboardShortcuts";

import elementRegistry from "./elements/elementRegistry";

import { TOOLS } from "../../utils/constants";
import {
	getCanvasCursor,
	getZoomedStagePosition,
} from "../../utils/canvasUtils";
import TextEditor from "./elements/TextEditor";
import MobileCanvasControllers from "./MobileCanvasControllers";
import { useLocation } from "react-router-dom";
/* eslint-disable react-hooks/exhaustive-deps */
const Canvas = () => {
	const location = useLocation();
	const isViewer = location?.state?.role === 'viewer';
	const {
		currentElement,
		selectedElementId,
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

	const [mobileControlsOpen, setMobileControlsOpen] = useState(false);
	const transformerRef = useRef(null);
	const elementRefs = useRef({});
	const {
		handleMouseDown,
		handleMouseMove,
		handleMouseUp,
	} = useDrawing();

	const { handleStageDown } = useSelection();
	const selectedElement = elements.find(
		(element) =>
			String(element.id) ===
			String(selectedElementId)
	);

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

	useEffect(() => {
		if (!stageRef.current) return;

		stageRef.current.container().style.cursor =
			getCanvasCursor(selectedTool);
	}, [selectedTool]);

	useEffect(() => {
		if (
			selectedElement &&
			window.innerWidth < 768
		) {
			setMobileControlsOpen(true);
		}
	}, [selectedElement]);

	return (
		<div
			ref={containerRef}
			className="relative h-full w-full overflow-hidden bg-slate-50"
		>
			<div
				className="pointer-events-none absolute inset-0 opacity-60"
				style={{
					backgroundImage:
						"radial-gradient(circle, #CBD5E1 1px, transparent 1px)",
					backgroundSize: "24px 24px",
				}}
			/>

			<Stage
				width={stageSize.width}
				height={stageSize.height}
				ref={stageRef}
				scaleX={scale}
				scaleY={scale}
				x={stagePosition.x}
				y={stagePosition.y}
				draggable={
					selectedTool === TOOLS.SELECT
				}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onWheel={handleWheel}
				onMouseDown={(e) => {
					if (e.evt.button === 1) {
						e.evt.preventDefault();
						handleMouseDown(e);
						return;
					}

					handleMouseDown(e);
					handleStageDown(e);
				}}
			>
				<Layer>
					<Transformer
						ref={transformerRef}
						rotateEnabled={false}
					/>

					{[...elements]
						.sort(
							(a, b) =>
								(a.element_data?.zIndex ?? 0) -
								(b.element_data?.zIndex ?? 0)
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
											delete elementRefs.current[
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
			{!isViewer && <MobileCanvasControllers
				open={mobileControlsOpen}
				setOpen={setMobileControlsOpen}
				selectedElement={selectedElement}
			/>
			}
		</div>
	);
};
export default Canvas;
