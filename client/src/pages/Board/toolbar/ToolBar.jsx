import { useContext } from "react";
import { Button, Flex, Tooltip } from "antd";
import { BoardContext } from "../../../context/BoardContext";
import { TOOL_LIST } from "./tools";
import { TOOLS } from "../../../utils/constants";

const Toolbar = () => {
	const {
		selectedTool,
		setSelectedTool,
		setSelectedElementId,
	} = useContext(BoardContext);

	const handleToolSelect = (tool) => {
		if (tool !== TOOLS.SELECT) {
			setSelectedElementId(null);
		}

		setSelectedTool(tool);
	};

	return (
		<>
			<div className="hidden md:block">
				<Flex
					vertical
					align="center"
					gap={8}
					className="py-4"
				>
					{TOOL_LIST.map((tool) => {
						const Icon = tool.icon;
						const isSelected =
							selectedTool === tool.key;
						return (
							<Tooltip
								key={tool.key}
								placement="right"
								title={tool.label}
							>
								<Button
									type="text"
									size="large"
									onClick={() =>
										handleToolSelect(
											tool.key
										)
									}
									className={`
										!flex
										!h-11
										!w-11
										!items-center
										!justify-center
										!rounded-xl
										!border
										transition-all
										duration-150
										${isSelected
											? "!border-emerald-200 !bg-emerald-50 !text-emerald-600 shadow-sm"
											: "!border-transparent !text-slate-500 hover:!border-slate-200 hover:!bg-slate-50 hover:!text-emerald-600"
										}
									`}
								>
									<Icon
										size={21}
										strokeWidth={
											isSelected
												? 2.2
												: 1.8
										}
									/>
								</Button>
							</Tooltip>
						);
					})}
				</Flex>
			</div>
			<div className="block md:hidden">
				<div className="grid grid-cols-4 gap-2">
					{TOOL_LIST.map((tool) => {
						const Icon = tool.icon;
						const isSelected =
							selectedTool === tool.key;
						return (
							<Button
								key={tool.key}
								type="text"
								onClick={() =>
									handleToolSelect(
										tool.key
									)
								}
								className={`
									!m-0
									!flex
									!h-20
									!w-full
									!flex-col
									!items-center
									!justify-center
									!gap-1.5
									!rounded-xl
									!border
									!p-2
									${isSelected
										? "!border-emerald-200 !bg-emerald-50 !text-emerald-600"
										: "!border-slate-200 !bg-white !text-slate-500 active:!bg-slate-50"
									}
								`}
							>
								<Icon
									size={22}
									strokeWidth={
										isSelected
											? 2.2
											: 1.8
									}
								/>
								<span className="text-xs font-medium leading-tight">
									{tool.label}
								</span>
							</Button>
						);
					})}
				</div>
			</div>
		</>
	);
};
export default Toolbar;
