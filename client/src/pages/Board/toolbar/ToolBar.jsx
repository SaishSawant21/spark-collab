import { useContext } from "react";
import { Button, Flex, Tooltip } from "antd";
import { UndoOutlined, RedoOutlined } from "@ant-design/icons";

import { BoardContext } from "../../../context/BoardContext";
import { TOOL_LIST } from "./tools";
import { TOOLS } from "../../../utils/constants";

const Toolbar = () => {
	const {
		selectedTool,
		setSelectedTool,
		setSelectedElementId,
		undo,
		redo,
	} = useContext(BoardContext);

	const handleToolSelect = (tool) => {
		if (tool !== TOOLS.SELECT) {
			setSelectedElementId(null);
		}

		setSelectedTool(tool);
	};

	return (
		<Flex
			vertical
			align="center"
			gap={12}
			className="py-4"
		>
			{TOOL_LIST.map((tool) => {
				const Icon = tool.icon;

				return (
					<Tooltip
						key={tool.key}
						placement="right"
						title={tool.label}
					>
						<Button
							type={selectedTool === tool.key ? "primary" : "text"}
							shape="default"
							size="large"
							className="!w-12 !h-12 rounded-xl flex items-center justify-center"
							onClick={() => handleToolSelect(tool.key)}
						>
							<Icon size={22} />
						</Button>
					</Tooltip>
				);
			})}

			<div className="w-8 border-t border-slate-300 my-2" />

			<Tooltip title="Undo" placement="right">
				<Button
					type="text"
					size="large"
					className="!w-10 !h-10"
					icon={<UndoOutlined />}
					onClick={undo}
				/>
			</Tooltip>

			<Tooltip title="Redo" placement="right">
				<Button
					type="text"
					size="large"
					className="!w-10 !h-10"
					icon={<RedoOutlined />}
					onClick={redo}
				/>
			</Tooltip>
		</Flex>
	);
};

export default Toolbar;