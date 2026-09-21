import { ArrowLeftOutlined } from "@ant-design/icons";
import {
	Button,
	Flex,
	Form,
	Input,
	message,
	Typography,
} from "antd";
import { messageContants } from "../../utils/constants";
import { registerUser } from "../../services/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const Registration = () => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const onSubmit = async (values) => {
		try {
			setLoading(true);

			const payload = {
				username: values.username,
				email: values.email,
				password: values.password,
			};

			const res = await registerUser(payload);

			if (res?.code === 201) {
				message.success(res?.message);
				form.resetFields();
				navigate("/login");
			}
		} catch (error) {
			message.error(
				error?.response?.data?.message ||
				messageContants.somethingWerntWrong
			);
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
			className="min-h-screen bg-slate-50 px-4"
			justify="center"
			align="center"
		>
			<div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
				<div className="mb-6">
					<Button
						type="text"
						icon={<ArrowLeftOutlined />}
						className="mb-4 !px-0 text-slate-500 hover:!text-emerald-600"
						onClick={() => navigate("/login")}
					>
						Back to Login
					</Button>

					<Title
						level={2}
						className="!mb-1 !text-slate-800"
					>
						Create your account
					</Title>

					<Text className="text-slate-500">
						Join Spark Collab and start collaborating.
					</Text>
				</div>

				<Form
					form={form}
					onFinish={onSubmit}
					layout="vertical"
					requiredMark={false}
				>
					<Form.Item
						name="username"
						label="Username"
						rules={[requiredRule]}
					>
						<Input
							size="large"
							placeholder="Enter your username"
						/>
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
						<Input
							size="large"
							placeholder="Enter your email"
						/>
					</Form.Item>

					<Form.Item
						name="password"
						label="Password"
						rules={[requiredRule]}
					>
						<Input.Password
							size="large"
							placeholder="Enter your password"
						/>
					</Form.Item>

					<Form.Item
						name="confirm_password"
						label="Confirm Password"
						dependencies={["password"]}
						rules={[
							requiredRule,
							({ getFieldValue }) => ({
								validator(_, value) {
									if (
										!value ||
										getFieldValue("password") === value
									) {
										return Promise.resolve();
									}

									return Promise.reject(
										new Error("Passwords do not match")
									);
								},
							}),
						]}
					>
						<Input.Password
							size="large"
							placeholder="Confirm your password"
						/>
					</Form.Item>

					<Button
						htmlType="submit"
						type="primary"
						size="large"
						block
						loading={loading}
						className="!h-11 !rounded-lg !bg-emerald-600 hover:!bg-emerald-700"
					>
						Create Account
					</Button>
				</Form>

				<div className="mt-5 text-center">
					<Text className="text-slate-500">
						Already have an account?{" "}
						<Button
							type="link"
							className="!p-0 !text-emerald-600"
							onClick={() => navigate("/login")}
						>
							Sign in
						</Button>
					</Text>
				</div>
			</div>
		</Flex>
	);
};

export default Registration;
