import {
  Modal,
  Table,
  Select,
  Button,
  Typography,
  Form,
  message,
} from "antd";
import { useState } from "react";
import { fetchAllUsers } from "../services/authService";
import { messageContants } from "../utils/constants";
import { useEffect } from "react";
import { addBoardMember, fetchBoardMembers } from "../services/boardMemberService";

const { Text } = Typography;

const AddMemberModal = ({
  open,
  board,
  onClose,
}) => {
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);
  const handleAddMember = async (values) => {
    try {
      setSubmitLoader(true);
      let payload = {
        userId: values.userId,
        role: values.role
      }
      const res = await addBoardMember(payload, board?.id);
      if (res?.code === 201) {
        form.resetFields();
        message.success(res?.message);
        fetchMembers();
      }
    } catch (error) {
      console.error(error);
      message.error(error?.response?.data?.message || messageContants.somethingWerntWrong);
    } finally {
      setSubmitLoader(false);
    }
  };

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await fetchBoardMembers(board?.id);
      if (res?.code === 200) {
        setMembers(res?.boardMembers);
      }
    } catch (error) {
      setMembers([]);
      message.error(error.response.message || messageContants.somethingWerntWrong);
    } finally {
      setLoading(false);
    }
  }

  const fetchUsers = async () => {
    try {
      const res = await fetchAllUsers();
      if (res?.code === 200) {
        setUsers(res?.users);
      }
    } catch (error) {
      setUsers([]);
      console.log(error);
      message.error(messageContants.somethingWerntWrong);
    }
  }

  useEffect(() => {
    if (open) fetchUsers();
  }, [open]);

  useEffect(() => {
    if (board) {
      fetchMembers();
    }
  }, [board])

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <span className="capitalize">
          {role}
        </span>
      ),
    },
  ];

  const memberIds = new Set(
    members.map((member) => member.user_id)
  );

  const availableUsers = users.filter(
    (user) => !memberIds.has(user.id)
  );

  return (
    <Modal
      title={
        <span className="text-lg font-semibold text-slate-800">
          Share {board?.title}
        </span>
      }
      open={open}
      onCancel={handleClose}
      footer={null}
      width={600}
    >
      <div className="pt-3">
        <Form
          form={form}
          layout="inline"
          onFinish={handleAddMember}
          className="mb-6"
        >
          <Form.Item
            name="userId"
            className="!mb-0"
            rules={[
              {
                required: true,
                message: "Please select a user",
              },
            ]}
          >
            <Select
              loading={loading}
              showSearch
              placeholder="Select a user"
              optionFilterProp="label"
              options={availableUsers.map((user) => ({
                label: user.username,
                value: user.id,
              }))}
              allowClear
              style={{ width: 300 }}
            />
          </Form.Item>

          <Form.Item
            name="role"
            className="!mb-0"
          >
            <Select
              placeholder="Select role"
              options={[
                {
                  label: "Viewer",
                  value: "viewer",
                },
                {
                  label: "Editor",
                  value: "editor",
                },
              ]}
              style={{ width: 120 }}
            />
          </Form.Item>

          <Form.Item className="!mb-0">
            <Button
              type="primary"
              htmlType="submit"
              loading={submitLoader}
            >
              Add
            </Button>
          </Form.Item>
        </Form>

        <div className="my-3">
          <Text className="!text-sm !text-slate-500">
            Current members
          </Text>
        </div>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={members}
          loading={loading}
          pagination={false}
          size="small"
        />
      </div>
    </Modal>
  );
};
export default AddMemberModal;
