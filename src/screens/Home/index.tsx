import Container from "../../components/Container";
import { Outlet} from "react-router-dom";
import Loading from "../../components/Loading";
import { useDummyRequest } from "../../utils/request";
import "./styles.scss";
import {CardAccount} from "./CardAccount";
import { RequestCard } from "./Upload";
import { Documents } from "./Documents";


export const Home = () =>
{
	const isLoading = useDummyRequest()


	return (
		<>
			<Container topNav={false}>
				<div className="home-page w-100 d-flex flex-column align-items-center">
					<Loading skeleton={{ height: 150 }} isLoading={isLoading}>
					</Loading>
					<CardAccount />
					<RequestCard />
					<Documents/>
				</div>
			</Container>
		</>
	)
}
