import { Stage, Layer } from 'react-konva';
import { useContext, useRef } from 'react'
import Rectangle from './elements/Rectangle';
import { BoardContext } from './context/BoardContext';
import { Transformer } from 'react-konva';
import useDrawing from '../hooks/useDrawing';
import useTransformer from '../hooks/useTransformer';
import useSelection from '../hooks/useSelection';
import useKeyboard from '../hooks/useKeyboard';

const Canvas = () => {
	const { currentElement,
		elements,
	} = useContext(BoardContext);
	const transformerRef = useRef(null);
	const rectangleRefs = useRef({});
	const { handleMouseDown, handleMouseMove, handleMouseUp } = useDrawing();
	const { handleStageDown } = useSelection();

	useKeyboard({ rectangleRefs });
	useTransformer({ transformerRef, rectangleRefs });

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
						elements.map((element) => (
							<Rectangle key={element.id}
								element={element}
								ref={(node) => {
									if (node) {
										rectangleRefs.current[element.id] = node;
									}
								}}
							/>
						))
					}
					{
						currentElement &&
						<Rectangle element={currentElement} />
					}
				</Layer>
			</Stage>
		</div>
	)
}

export default Canvas