import { useContext, useEffect } from 'react'
import { BoardContext } from '../Board/context/BoardContext';

const useTransformer = ({ transformerRef, rectangleRefs }) => {
	const { selectedElementId } = useContext(BoardContext);
	useEffect(() => {
		if (!selectedElementId) {
			transformerRef.current.nodes([]);
			transformerRef.current.getLayer().batchDraw();
			return;
		}
		const selectedNode = rectangleRefs.current[selectedElementId];
		if (!selectedNode) return;
		transformerRef.current.nodes([selectedNode]);
		transformerRef.current.getLayer().batchDraw();
	}, [selectedElementId,
		rectangleRefs,
		transformerRef,])
}

export default useTransformer