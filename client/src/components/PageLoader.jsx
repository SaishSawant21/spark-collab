import { Spin } from "antd";

const PageLoader = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-slate-50">
			<Spin size="large" />
		</div>
	);
};
export default PageLoader;
