import { Button, Flex, Form, Input, message, Typography } from "antd"
import { messageContants } from "../../utils/constants"
import { useContext, useState } from "react"
import { authenticateUser } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [loading, setLoading] = useState(false);
	const { setIsLoggedIn } = useContext(AuthContext);
	const navigate = useNavigate();
	const onSubmit = async (values) => {
		try {
			setLoading(true);
			const res = await authenticateUser(values);
			if (res.code === 200) {
				message.success(res?.message);
				setIsLoggedIn(true);
				navigate('/dashboard');
			}
		} catch (error) {
			message.error(error?.response?.data?.message || messageContants.somethingWerntWrong);
		} finally {
			setLoading(false);
		}

	}
	const rules = {
		required: true,
		message: messageContants.requiredMsg
	}
	return (
		<Flex
			justify="center"
			align="center"
			className="min-h-screen bg-slate-50 px-4"
		>
			<div className="w-full max-w-md">
				<div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
					{/* Branding */}
					<div className="mb-8 text-center">
						<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
							<span className="text-2xl font-bold">✦</span>
						</div>

						<Typography.Title
							level={2}
							className="!mb-2 !text-slate-900"
						>
							Welcome back
						</Typography.Title>

						<Typography.Text className="text-slate-500">
							Sign in to continue to Spark Collab
						</Typography.Text>
					</div>

					<Form
						layout="vertical"
						onFinish={onSubmit}
						requiredMark={false}
					>
						<Form.Item
							name="username"
							label={
								<span className="font-medium text-slate-700">
									Username
								</span>
							}
							rules={[rules]}
						>
							<Input
								size="large"
								placeholder="Enter your username"
								className="!rounded-lg"
							/>
						</Form.Item>

						<Form.Item
							name="password"
							label={
								<span className="font-medium text-slate-700">
									Password
								</span>
							}
							rules={[rules]}
						>
							<Input.Password
								size="large"
								placeholder="Enter your password"
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
							Sign in
						</Button>
					</Form>

					<div className="mt-6 text-center">
						<Typography.Text className="text-xs text-slate-400">
							Collaborate. Create. Connect.
						</Typography.Text>
					</div>
				</div>
			</div>
		</Flex>
	)
}
export default Login;
