import { useContext } from "react";
import { BoardContext } from "../BoardContext";
import offsetElement from "../../utils/offsetElement";
import { socket } from "../../socket";
import { addBoardElement, saveBoardElement } from "../../services/boardElementService";
import { message } from "antd";
import { messageContants } from "../../utils/constants";

const useElementActions = ({
	updateElements,
	elements,
	selectedElementId,
	setSelectedElementId,
}) => {

	const exceptionHandling = async (updatedElement) => {
		try {
			await saveBoardElement(updatedElement);
			socket.emit("element-updated", updatedElement);
		} catch (error) {
			message.error(
				error?.response?.data?.message ||
				messageContants.somethingWerntWrong
			);
			console.log("Error:", error);
		}
	}

	const bringForward = async (id) => {
		const element = elements.find((item) => item.id === id);
		if (!element) return;

		const updatedElement = {
			...element,
			element_data: {
				...element.element_data,
				zIndex: (element.element_data.zIndex ?? 0) + 1,
			},
		};

		updateElements((prev) =>
			prev.map((item) =>
				item.id === id ? updatedElement : item
			)
		);
		exceptionHandling(updatedElement);
	};

	const sendBackward = async (id) => {
		const element = elements.find((item) => item.id === id);
		if (!element) return;

		const updatedElement = {
			...element,
			element_data: {
				...element.element_data,
				zIndex: Math.max(
					-1,
					(element.element_data.zIndex ?? 0) - 1
				),
			},
		};

		updateElements((prev) =>
			prev.map((item) =>
				item.id === id ? updatedElement : item
			)
		);
		exceptionHandling(updatedElement);
	};

	const bringToFront = async (id) => {
		const element = elements.find((item) => item.id === id);
		if (!element) return;

		const maxZIndex = Math.max(
			...elements.map(
				(item) => item.element_data?.zIndex ?? 0
			)
		);

		const updatedElement = {
			...element,
			element_data: {
				...element.element_data,
				zIndex: maxZIndex + 1,
			},
		};

		updateElements((prev) =>
			prev.map((item) =>
				item.id === id ? updatedElement : item
			)
		);

		exceptionHandling(updatedElement);
	};

	const sendToBack = async (id) => {
		const element = elements.find((item) => item.id === id);
		if (!element) return;

		const minZIndex = Math.min(
			...elements.map(
				(item) => item.element_data?.zIndex ?? 0
			)
		);

		const updatedElement = {
			...element,
			element_data: {
				...element.element_data,
				zIndex: minZIndex - 1 < -1 ? -1 : minZIndex - 1,
			},
		};

		updateElements((prev) =>
			prev.map((item) =>
				item.id === id ? updatedElement : item
			)
		);
		exceptionHandling(updatedElement);
	};

	const duplicateSelectedElement = async () => {
		if (!selectedElementId) return;

		const selectedElement = elements.find(
			(item) => item.id === selectedElementId
		);

		if (!selectedElement) return;

		const clone = structuredClone(selectedElement);

		// Don't copy the database ID
		delete clone.id;

		const duplicatedElement = offsetElement(clone, 20, 20);

		try {
			const response = await addBoardElement(boardId, {
				elementType: duplicatedElement.element_type,
				elementData: duplicatedElement.element_data,
			});

			if (response?.code === 201) {
				const savedElement = response.element;

				updateElements((prev) => [
					...prev,
					savedElement,
				]);

				socket.emit("element-created", savedElement);

				setSelectedElementId(savedElement.id);
			}
		} catch (error) {
			console.log("Error duplicating element:", error);
		}
	};
	return { bringForward, sendBackward, bringToFront, sendToBack, duplicateSelectedElement };
}

export default useElementActions;