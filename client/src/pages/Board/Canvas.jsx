import { Stage, Layer } from 'react-konva';
import { useContext, useEffect, useRef } from 'react'
import Rectangle from './elements/Rectangle';
import { BoardContext } from './context/BoardContext';
import { Transformer } from 'react-konva';
import useDrawing from '../hooks/useDrawing';
import useTransformer from '../hooks/useTransformer';
import useSelection from '../hooks/useSelection';
import useKeyboard from '../hooks/useKeyboard';
import elementRegistry from './elements/elementRegistry';

const Canvas = () => {
	const { currentElement,
		elements,
	} = useContext(BoardContext);
	const transformerRef = useRef(null);
	const rectangleRefs = useRef({});
	const { handleMouseDown, handleMouseMove, handleMouseUp } = useDrawing();
	const { handleStageDown } = useSelection();

	useKeyboard();
	useTransformer({ transformerRef, rectangleRefs });

	const renderCurrentElement = (elementData) => {
		const Component = elementRegistry[elementData.element_type].component;
		return Component ? <Component element={elementData} /> : <></>;
	}

	useEffect(() => {
		console.log(elements)
	}, [elements])
	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
				background: "#f5f5f5",
			}}
		>
			<Stage
				width={window.innerWidth}
				height={window.innerHeight}
				onMouseMove={handleMouseMove}
				onMouseDown={(e) => {
					handleMouseDown(e)
					handleStageDown(e)
				}}
				onMouseUp={handleMouseUp}>
				<Layer>
					<Transformer ref={transformerRef} />
					{
						elements.map((element) => {
							const Component = elementRegistry[element?.element_type].component;
							return Component ? <Component key={element?.id}
								element={element}
								ref={(node) => {
									if (node) {
										rectangleRefs.current[element.id] = node;
									} else {
										delete rectangleRefs.current[element.id];
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