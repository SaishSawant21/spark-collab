import { useContext, useEffect } from 'react'
import { BoardContext } from '../Board/context/BoardContext';

const useTransformer = ({ transformerRef, elementRefs }) => {
	const { selectedElementId } = useContext(BoardContext);
	useEffect(() => {
		if (!selectedElementId) {
			transformerRef.current.nodes([]);
			transformerRef.current.getLayer().batchDraw();
			return;
		}
		const selectedNode = elementRefs.current[selectedElementId];
		if (!selectedNode) return;
		transformerRef.current.nodes([selectedNode]);
		transformerRef.current.getLayer().batchDraw();
	}, [selectedElementId,
		elementRefs,
		transformerRef,])
}

export default useTransformer