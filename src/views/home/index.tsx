import welcome from "@/assets/images/welcome01.png";
import { connect } from 'react-redux';
import "./index.less";

const Home = (props: any) => {
	return (
		<div className="home card">
			<img src={welcome} alt="welcome" />
		</div>
	);
};

const mapStateToProps = (state: any) => state;
export default connect(mapStateToProps, null)(Home);
