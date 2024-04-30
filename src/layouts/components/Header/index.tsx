import { Layout } from "antd";
import AvatarIcon from "./components/AvatarIcon";
import CollapseIcon from "./components/CollapseIcon";
import BreadcrumbNav from "./components/BreadcrumbNav";
import AssemblySize from "./components/AssemblySize";
import Language from "./components/Language";
import Theme from "./components/Theme";
import Fullscreen from "./components/Fullscreen";
import { connect } from "react-redux";
import "./index.less";

const LayoutHeader = (props: any) => {
	const { userInfo } = props;
	const { Header } = Layout;

	return (
		<Header>
			<div className="header-lf">
				<CollapseIcon />
				<BreadcrumbNav />
			</div>
			<div className="header-ri">
				<AssemblySize />
				<Language />
				<Theme />
				<Fullscreen />
				<span className="username">
					{userInfo.userName.replace(userInfo.userName[0], userInfo.userName[0].toUpperCase())}
				</span>
				<AvatarIcon />
			</div>
		</Header>
	);
};

const mapStateToProps = (state: any) => state.global;
export default connect(mapStateToProps, null)(LayoutHeader);
