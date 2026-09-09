import {
	Button,
	Flex,
	Form,
	Input,
	message,
	Typography,
} from "antd";
import { useNavigate } from "react-router-dom";
import { messageContants } from "../../utils/constants";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useState } from "react";
import { sendForgotPasswordEmail } from "../../services/authService";
const ForgotPassword = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const rules = {
		required: true,
		message: messageContants.requiredMsg,
	};

	const onSubmit = async (values) => {
		try {
			setLoading(true);
			let payload = {
				email: values?.email
			}
			const res = await sendForgotPasswordEmail(payload);
			if (res?.code === 200) {
				message.success(res?.message);
				navigate('/login');
			}
		} catch (error) {
			message.error(res?.message || error?.response?.data?.message);
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Flex
			justify="center"
			align="center"
			className="min-h-screen bg-slate-50 px-4"
		>
			<div className="w-full max-w-md">
				<div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
					<div className="mb-8 text-center">
						<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
							<span className="text-2xl font-bold">✦</span>
						</div>

						<Typography.Title
							level={2}
							className="!mb-2 !text-slate-900"
						>
							Forgot your password?
						</Typography.Title>

						<Typography.Text className="text-slate-500">
							Enter your email address and we'll send you a link to reset
							your password.
						</Typography.Text>
					</div>

					{/* Form */}
					<Form
						layout="vertical"
						onFinish={onSubmit}
						requiredMark={false}
					>
						<Form.Item
							name="email"
							label={
								<span className="font-medium text-slate-700">
									Email
								</span>
							}
							rules={[
								rules,
								{
									type: "email",
									message: "Please enter a valid email address",
								},
							]}
						>
							<Input
								size="large"
								placeholder="Enter your email"
								className="!rounded-lg"
							/>
						</Form.Item>

						<Button
							htmlType="submit"
							type="primary"
							block
							size="large"
							loading={loading}
							className="!mt-2 !h-11 !rounded-lg !border-emerald-600 !bg-emerald-600 !font-medium hover:!border-emerald-700 hover:!bg-emerald-700"
						>
							Send Reset Link
						</Button>
					</Form>

					<div className="mt-6 text-center">
						<Button
							type="link"
							icon={<ArrowLeftOutlined />}
							onClick={() => navigate("/login")}
							className="!text-slate-500 hover:!text-emerald-600"
						>
							Back to Login
						</Button>
					</div>

					<div className="mt-4 text-center">
						<Typography.Text className="text-xs text-slate-400">
							Collaborate. Create. Connect.
						</Typography.Text>
					</div>
				</div>
			</div>
		</Flex>
	);
};
export default ForgotPassword;
