import { Stage, Layer } from 'react-konva';
import { useContext, useEffect, useRef, useState } from 'react'
import Rectangle from './elements/Rectangle';
import { BoardContext } from '../../context/BoardContext';
import { Transformer } from 'react-konva';
import useDrawing from '../hooks/useDrawing';
import useTransformer from '../hooks/useTransformer';
import useSelection from '../hooks/useSelection';
import useKeyboard from '../hooks/useKeyboard';
import elementRegistry from './elements/elementRegistry';
import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';

const Canvas = () => {
	const { currentElement,
		elements,
	} = useContext(BoardContext);
	const containerRef = useRef(null);

	const [stageSize, setStageSize] = useState({
		width: 0,
		height: 0,
	});
	const transformerRef = useRef(null);
	const elementRefs = useRef({});

	const { handleMouseDown, handleMouseMove, handleMouseUp } = useDrawing();
	const { handleStageDown } = useSelection();

	useKeyboard();
	useTransformer({ transformerRef, elementRefs });
	useKeyboardShortcuts();

	const renderCurrentElement = (elementData) => {
		const Component = elementRegistry[elementData.element_type].component;
		return Component ? <Component element={elementData} /> : <></>;
	}

	useEffect(() => {
		if (!containerRef.current) return;

		const resizeObserver = new ResizeObserver(([entry]) => {
			const { width, height } = entry.contentRect;

			setStageSize({
				width,
				height,
			});
		});

		resizeObserver.observe(containerRef.current);

		return () => resizeObserver.disconnect();
	}, []);

	return (
		<div
			className='w-full h-full bg-slate-100'
			ref={containerRef}
		>
			<Stage
				width={stageSize.width}
				height={stageSize.height}
				onMouseMove={handleMouseMove}
				onMouseDown={(e) => {
					handleMouseDown(e)
					handleStageDown(e)
				}}
				onMouseUp={handleMouseUp}>
				<Layer>
					<Transformer ref={transformerRef} rotateEnabled={false} />
					{
						elements.map((element) => {
							const Component = elementRegistry[element?.element_type].component;
							return Component ? <Component key={element?.id}
								element={element}
								ref={(node) => {
									if (node) {
										elementRefs.current[element.id] = node;
									} else {
										delete elementRefs.current[element.id];
									}
								}}
							/> : <></>
						})
					}
					{currentElement && renderCurrentElement(currentElement)}
				</Layer>
			</Stage>
		</div>
	)
}

export default Canvas