import { useContext } from 'react';
import { Button, Card, Flex } from 'antd';
import {
	SelectOutlined,
	BorderOutlined,
	RadiusUprightOutlined
} from "@ant-design/icons";
import { BoardContext } from '../context/BoardContext';
import { TOOLS } from '../../../utils/constants';

const ToolBar = () => {
	const { selectedTool, setSelectedTool,
		setSelectedElementId
	} = useContext(BoardContext);

	const buttonTypeSetter = (type) => {
		if (type === selectedTool) return 'primary';
		else return 'default';
	}
	return (
		<Card className='fixed top-4 left-1/2 -translate-x-1/2 z-50'
			styles={{
				body: {
					padding: 8,
				},
			}}>
			<Flex gap={8}>
				<Button
					icon={<SelectOutlined />}
					type={buttonTypeSetter(TOOLS.SELECT)}
					onClick={() => setSelectedTool(TOOLS.SELECT)} >
					Select
				</Button>
				<Button
					icon={<BorderOutlined />}
					type={buttonTypeSetter(TOOLS.RECTANGLE)}
					onClick={() => {
						setSelectedElementId(null);
						setSelectedTool(TOOLS.RECTANGLE)
					}}>
					Rectangle
				</Button>
				<Button
					type={buttonTypeSetter(TOOLS.LINE)}
					onClick={() => setSelectedTool(TOOLS.LINE)} >
					Line
				</Button>
				<Button
					icon={<RadiusUprightOutlined />}
					type={buttonTypeSetter(TOOLS.CIRCLE)}
					onClick={() => setSelectedTool(TOOLS.CIRCLE)} >
					Circle
				</Button>
				<Button
					type={buttonTypeSetter(TOOLS.ARROW)}
					onClick={() => setSelectedTool(TOOLS.ARROW)} >
					Arrow
				</Button>
			</Flex>
		</Card>
	)
}
export default ToolBar;
