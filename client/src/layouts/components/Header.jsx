import { Layout, Flex, Typography, Button, Avatar } from "antd";
import {
  DownloadOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header } = Layout;
const { Title } = Typography;

const AppHeader = () => {
  return (
    <Header className="!bg-white border-b border-slate-200 px-6">
      <Flex
        justify="space-between"
        align="center"
        className="h-full"
      >
        {/* Left */}
        <Flex align="center" gap={16}>
          <Title
            level={4}
            className="!m-0"
          >
            Spark Collab
          </Title>
        </Flex>

        <Flex align="center" gap={12}>
          <Button>
            100%
          </Button>

          <Button
            type="primary"
            icon={<DownloadOutlined />}
          >
            Export
          </Button>

          <Avatar
            icon={<UserOutlined />}
          />
        </Flex>
      </Flex>
    </Header>
  );
};

export default AppHeader;