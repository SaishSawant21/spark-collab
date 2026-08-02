import { Layout } from "antd";
import Toolbar from "../../pages/Board/toolbar/ToolBar";
import { LAYOUT } from "../../utils/layout";

const { Sider } = Layout;

const LeftSidebar = () => {
  return (
    <Sider
      width={LAYOUT.LEFT_SIDEBAR_WIDTH}
      theme="light"
      className="!bg-white border-r border-slate-200"
    >
      <Toolbar />
    </Sider>
  );
};

export default LeftSidebar;