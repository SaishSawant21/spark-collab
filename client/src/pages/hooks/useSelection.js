import { useContext } from 'react'
import { TOOLS } from '../../utils/constants';
import { BoardContext } from '../../context/BoardContext';

const useSelection = () => {
	const { selectedTool,
		setSelectedElementId } = useContext(BoardContext);

	const handleStageDown = (e) => {
		if (selectedTool !== TOOLS.SELECT) return;
		if (e.target !== e.target.getStage()) return;
		setSelectedElementId(null);
	}
	return { handleStageDown };
}

export default useSelection