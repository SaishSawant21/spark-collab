import { Button, Flex, Form, Input, message, Typography } from "antd";
import { messageContants } from "../../utils/constants";
import { registerUser } from "../../services/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const onSubmit = async (values) => {
		try {
			setLoading(true);
			let payload = {
				username: values.username,
				email: values.email,
				password: values.password
			};
			const res = await registerUser(payload);
			if (res?.code === 201) {
				message.success(res?.message);
				form.resetFields();
				navigate('/login');
			}
		} catch (error) {
			message.error(error?.response?.data?.message ||
				messageContants.somethingWerntWrong);
		} finally {
			setLoading(false);
		}
	};

	const requiredRule = {
		required: true,
		message: messageContants.requiredMsg,
	};

	return (
		<Flex
			className="h-screen"
			justify="center"
			align="center"
		>
			<div className="w-96">
				<Typography.Title level={2}>
					Register
				</Typography.Title>

				<Form
					form={form}
					onFinish={onSubmit}
					layout="vertical"
				>
					<Form.Item
						name="username"
						label="Username"
						rules={[requiredRule]}
					>
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

					<Form.Item
						name="password"
						label="Password"
						rules={[requiredRule]}
					>
						<Input.Password placeholder="Password" />
					</Form.Item>

					<Form.Item
						name="confirm_password"
						label="Confirm Password"
						dependencies={["password"]}
						rules={[
							requiredRule,
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue("password") === value) {
										return Promise.resolve();
									}

									return Promise.reject(
										new Error("Passwords do not match")
									);
								},
							}),
						]}
					>
						<Input.Password placeholder="Confirm Password" />
					</Form.Item>

					<Button
						htmlType="submit"
						type="primary"
						block
						loading={loading}
					>
						Register
					</Button>
				</Form>
			</div>
		</Flex>
	);
};
export default Registration;

