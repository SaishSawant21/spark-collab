import { useContext } from "react";
import { TOOLS } from "../../utils/constants";
import { BoardContext } from "../../context/BoardContext";
import { setCanvasCursor } from "../../utils/canvasUtils";

const useSelection = () => {
	const {
		selectedTool,
		setSelectedElementId,
	} = useContext(BoardContext);

	const handleStageDown = (e) => {
		if (selectedTool !== TOOLS.SELECT) return;

		const stage = e.target.getStage();

		if (e.target !== stage) return;

		setSelectedElementId(null);

		// Restore normal select cursor
		setCanvasCursor(stage, "grab");
	};

	return {
		handleStageDown,
	};
};

export default useSelection;