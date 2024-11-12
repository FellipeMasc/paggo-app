import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { FC } from "react";
import "./styles.scss";

export const NavbarBaseV1 = () =>
{
	return (
		<div className="navbar d-flex justify-content-center p-0 mt-5">
			<div className="navbar-content d-flex justify-content-between align-items-center px-3 m-0">
				<NavbarLink titulo="Home" path="home" />
				<NavbarLink titulo="Treinos" path="treinos" />
				<NavbarLink titulo="Chat" path="chat" />
				<NavbarLink titulo="Conta" path="conta" />
			</div>
		</div>
	)
}

interface NavbarLinkProps {
	path: string;
	titulo: string;
}

const NavbarLink: FC<NavbarLinkProps> = ({ path, titulo }) =>
{
	const location = useLocation();
	return (
		<Link to={path} >
			<div className="navbar-item active d-flex flex-column align-items-center gap-2">
				<img className="animation_svgBase" alt="" src={`/assets/navbar/${path}.svg`} width={35} />
				<div className={"subtitle-text text-center" + (location.pathname.includes(path) ? " blue" : "")}>{titulo}</div>
			</div>
		</Link>
	)
}
