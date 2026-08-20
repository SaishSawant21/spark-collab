import { Button, Flex, Form, Input, message, Typography } from "antd";
import { messageContants } from "../../utils/constants";
import { getProfile, updateUserProfile } from "../../services/authService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileUpdate = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [initialProfile, setInitialProfile] = useState({});
  const navigate = useNavigate();

  const requiredRule = {
    required: true,
    message: messageContants.requiredMsg,
  };

  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      if (res?.code === 200) {
        const userData = res?.data;
        const profileData = {
          username: userData?.username,
          email: userData?.email,
        };
        // Store initial values for comparison later
        setInitialProfile(profileData);
        form.setFieldsValue(profileData);
      }
    } catch (error) {
      console.log(error)
      message.error(error?.response?.data?.message || messageContants.somethingWerntWrong);
    }
  };

  const updateProfile = async (values) => {
    try {
      setLoading(true);

      // Build payload containing only changed or newly entered fields
      const payload = {};

      if (values.username !== initialProfile.username) {
        payload.username = values.username;
      }
      if (values.email !== initialProfile.email) {
        payload.email = values.email;
      }
      if (values.password) {
        payload.password = values.password;
      }

      // Stop API call if nothing was modified
      if (Object.keys(payload).length === 0) {
        message.info("No changes made to update");
        return;
      }

      const res = await updateUserProfile(payload);
      if (res?.code === 200) {
        message.success(res?.message || "Profile updated successfully");
        // Refresh component state with new saved profile values
        setInitialProfile((prev) => ({ ...prev, ...payload }));
        form.setFieldsValue({ password: "", confirm_password: "" });
        fetchProfile();
      }
    } catch (error) {
      message.error(error?.response?.data?.message || messageContants.somethingWerntWrong);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <Flex className="h-screen" justify="center" align="center">
      <div className="w-96">
        <Typography.Title level={2}>Profile</Typography.Title>

        <Form form={form} onFinish={updateProfile} layout="vertical">
          <Form.Item name="username" label="Username" rules={[requiredRule]}>
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              requiredRule,
              {
                type: "email",
                message: messageContants.InavlidEmail,
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item name="password" label="Password">
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="confirm_password"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const password = getFieldValue("password");

                  if (password && !value) {
                    return Promise.reject(new Error(messageContants.requiredMsg));
                  }

                  if (value && password !== value) {
                    return Promise.reject(new Error("Passwords do not match"));
                  }

                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>

          <Button htmlType="submit" type="primary" block loading={loading}>
            Save
          </Button>
        </Form>
      </div>
    </Flex>
  );
};

export default ProfileUpdate;