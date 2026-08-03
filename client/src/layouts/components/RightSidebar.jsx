import { Divider, Flex, Layout, Typography } from "antd"
import { useContext } from "react";
import { BoardContext } from "../../context/BoardContext";
import PropertiesPanel from "../../components/properties/PropertiesPanel";
const { Sider } = Layout;
const RightSidebar = () => {
	const { selectedElementId,
		elements
	} = useContext(BoardContext);
	const selectedElement = elements.find(
		(item) => item.id === selectedElementId
	);
	return (
		<Sider width={320} theme="light" className="!bg-white border-l border-slate-200 overflow-y-auto">
			<div className="p-4">

				<Typography.Title level={5}>
					Properties
				</Typography.Title>

				<Divider />

				{
					selectedElement ? (
						<>
							<PropertiesPanel selectedElement={selectedElement} />
						</>
					) : (
						<Flex
							vertical
							justify="center"
							align="center"
							className="h-64 text-slate-500"
						>
							<Typography.Text strong>
								Nothing Selected
							</Typography.Text>

							<Typography.Text type="secondary">
								Select an element to edit its properties.
							</Typography.Text>
						</Flex>
					)
				}

			</div>
		</Sider>
	)
}

export default RightSidebar