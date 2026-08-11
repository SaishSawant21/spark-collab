import { Button, Flex, Form, Input, message, Typography } from "antd"
import { messageContants } from "../../utils/constants"
import { useContext, useState } from "react"
import { authenticateUser } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [loading, setLoading] = useState(false);
	const { setUser } = useContext(AuthContext);
	const navigate = useNavigate();
	const onSubmit = async (values) => {
		try {
			setLoading(true);
			const res = await authenticateUser(values);
			if (res.code === 200) {
				message.success(res?.message);
				setUser({
					username: values?.username
				})
				navigate('/board');
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
		<Flex justify="center" align="center" className="min-h-screen">
			<div className="w-full max-w-sm">
				<Typography.Title level={2}>
					Login
				</Typography.Title>
				<Form layout='vertical' onFinish={onSubmit}>
					<Form.Item name={'username'} label='Username'
						rules={[
							rules
						]}>
						<Input />
					</Form.Item>
					<Form.Item name={'password'} label='Password'
						rules={[
							rules
						]}>
						<Input type={'password'} />
					</Form.Item>
					<Button htmlType="submit" type="primary" block loading={loading}>
						Login
					</Button>
				</Form>
			</div>
		</Flex>
	)
}
export default Login;
