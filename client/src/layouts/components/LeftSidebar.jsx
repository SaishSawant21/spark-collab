import { Layout } from "antd";
import Toolbar from "../../pages/Board/toolbar/ToolBar";
import { LAYOUT } from "../../utils/layout";

const { Sider } = Layout;

const LeftSidebar = () => {
  return (
    <Sider
      width={LAYOUT.LEFT_SIDEBAR_WIDTH}
      theme="light"
      className="
        hidden
        md:block
        !bg-white
        border-r
        border-slate-200
      "
    >
      <div className="flex h-full flex-col">
        <div className="flex h-12 items-center border-b border-slate-100 px-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Tools
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <Toolbar />
        </div>
      </div>
    </Sider>
  );
};
export default LeftSidebar;
