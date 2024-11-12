import * as React from "react";
import { FC, useState } from "react";
import "./styles.scss";
import Container from "../../components/Container";
import Axios from "axios";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import { useDummyRequest, usePost } from "../../utils/request";

interface RegisterProps {
	setAuthenticated: (authenticated: boolean) => void;
}

export const Register: FC<RegisterProps> = ({ setAuthenticated }) =>
{
	const isLoading = useDummyRequest()

	return (
		<Container topNav={false} centered width={false}>
			<div className="signup-page w-100">
				<Loading skeleton={{ height: 150 }} isLoading={isLoading}>
					<Header />
				</Loading>
				<Loading skeleton={{ height: 150, count: 2 }} isLoading={isLoading}>
					<InputFields setAuthenticated={setAuthenticated} />
				</Loading>
				{/* <Help /> */}
			</div>
		</Container>
	)
}

const Header = () =>
{
	return (
		<>
			<img src="/assets/images/register.svg" alt="" className="register" />
			<div className="content-init">
				<h1 className="f32 black fw-700 fw-bold text-start">Cadastro</h1>
				{/* <p className="grayaf f14 lh-1 text-start pt-0 mb-4">Faça o login utilizando as credenciais</p> */}
			</div>
		</>
	)
}

interface InputFieldsProps {
	setAuthenticated: Function
}

const InputFields: FC<InputFieldsProps> = ({ setAuthenticated }) =>
{
	const { isLoading, mutate } = usePost('auth/signup',{}, false)
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('')
	const [passwordConfirmation, setPasswordConfirmation] = useState('')
	const [error, setError] = useState(false)
	const [errorAuthorization, setErrorAuthorization] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

	const navigate = useNavigate()

	const loginHandler = (e: React.FormEvent<HTMLFormElement>): void =>
	{
		e.preventDefault();
		mutate({ email: login, password: password }, {
			onSuccess: (data) =>
			{
				console.log(data)
				Axios.defaults.headers.common = {
						Accept: "application/json",
						"Content-Type": "application/json",
						Authorization: `Bearer ${data.access_token}`,
				}
				localStorage.setItem('token', data.access_token);
				localStorage.setItem('user', JSON.stringify(data.id));
				setAuthenticated(true)
				navigate('/')
			},
			onError: () =>
			{
				setError(true)
			}
		})
	}

	return (
		<form onSubmit={loginHandler}>
			<div className="input-box col-12 mb-3">
				<img src="assets/email.svg" alt="" />
				<input id="email" className="form-login w-100" placeholder="Email"
					value={login} onChange={(e) => setLogin(e.target.value)}
					onKeyDown={() => { error && setError(false); setErrorAuthorization(false) }} />
			</div>
			<div className="input-box col-12 mb-3">
				<img src="assets/chave.svg" alt="" />
				<input id="password" type={`${showPassword ? "text" : "password"}`} className="form-login w-100" placeholder="Senha"
					value={password} onChange={(e) =>
					{
						setPassword(() =>
						{
							setErrorAuthorization(e.target.value != passwordConfirmation
							); return e.target.value
						});
					}}
					onKeyDown={() =>
					{
						error && setError(false);
					}} />
				<img src="assets/eye.svg" alt="" className="eye" onClick={() => { setShowPassword(e => !e) }} />
			</div>
			<div className="input-box col-12 mb-3">
				<img src="assets/chave.svg" alt="" />
				<input id="password-confirmation" type={`${showPasswordConfirmation ? "text" : "password"}`} className="form-login w-100" placeholder="Confirme sua senha"
					value={passwordConfirmation} onChange={(e) =>
					{
						setPasswordConfirmation(() =>
						{
							setErrorAuthorization(password != e.target.value
							); return e.target.value
						});
					}}
					onKeyDown={() =>
					{
						error && setError(false);
					}} />
				<img src="assets/eye.svg" alt="" className="eye" onClick={() => { setShowPasswordConfirmation(e => !e) }} />
			</div>
			{error && <div className="red text-start f12">Credenciais inválidas.</div>}
			{errorAuthorization && <div className="red f12">As senhas não coincidem.</div>}
			<button type="submit" className="btn btn-blue mt-1" /*disabled={!login || !password || isLoading}*/>
				Cadastro {isLoading && <img alt="" src="/assets/loading.svg" width={24} />}
			</button>
			<div className="f12 fw-400 mt-0 recovery">
				<Link to='/' className="esqueci-senha">Já tenho cadastro</Link>
			</div>
		</form>
	)
}

