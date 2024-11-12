import * as React from "react";
import { FC, useState } from "react";
import "./styles.scss";

import Container from "../../components/Container";
import Axios from "axios";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import { useDummyRequest, usePost } from "../../utils/request";

interface LoginProps {
	setAuthenticated: (authenticated: boolean) => void;
}

export const Login: FC<LoginProps> = ({ setAuthenticated }) =>
{
	const isLoading = useDummyRequest()

	return (
		<Container topNav={false} width={false}>
			<div className="login-page w-100">
				<Loading skeleton={{ height: 80 }} isLoading={isLoading}>
					<Header />
				</Loading>
				<Loading skeleton={{ height: 70, count: 2 }} isLoading={isLoading}>
					<InputFields setAuthenticated={setAuthenticated} />
				</Loading>
				<Help />
			</div>
		</Container>
	)
}

const Header = () =>
{
	return (
		<>
			<img src="/assets/images/workout-login.svg" alt="" className="workout-image" />
			<div className="content-init">
				<h1 className="f32 black fw-700 fw-bold text-start">Login</h1>
				{/* <p className="grayaf f14 lh-1 text-start pt-0 mb-4">Faça o login utilizando as credenciais</p> */}
			</div>
		</>
	)
}




const InputFields: FC<LoginProps> = ({ setAuthenticated }) => {

	const { isLoading, mutate } = usePost('auth/login',{}, false, true)
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('')
	const [error, setError] = useState(false)
	const [errorAuthorization, setErrorAuthorization] = useState(false)
	const [showPassword, setShowPassword] = useState(false)

	const navigate = useNavigate()

	const loginHandler = (e: React.FormEvent<HTMLFormElement>): void =>
	{
		e.preventDefault();
		const form_data = new FormData();
		form_data.append('username', login.trim());
		form_data.append('password', password.trim());
		mutate(form_data, {
			onSuccess: (data: { access_token: string }) =>
			{
				localStorage.setItem('token', data.access_token)
				Axios.defaults.headers.common = {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${data.access_token}`
				};
				setAuthenticated(true)
				navigate('/')
			},
			onError: (error: any) =>
			{
				if (error.response?.status === 401)
				{
					setErrorAuthorization(true)
				}
				else
				{
					setError(true)
				}
			}
		})
	}

	return (
		<form onSubmit={loginHandler}>
			<div className="input-box col-12 mb-3">
				<img src="assets/email.svg" alt="" />
				<input id="email" className="form-login w-100" placeholder="E-mail"
					value={login} onChange={(e) => setLogin(e.target.value)}
					onKeyDown={() => { error && setError(false); setErrorAuthorization(false) }} />
			</div>
			<div className="input-box col-12 mb-3">
				<img src="assets/chave.svg" alt="" />
				<input id="password" type={`${showPassword ? "text" : "password"}`} className="form-login w-100" placeholder="Senha"
					value={password} onChange={(e) => setPassword(e.target.value)}
					onKeyDown={() => { error && setError(false); setErrorAuthorization(false) }} />
				<img src="assets/eye.svg" alt="" className="eye" onClick={() => { setShowPassword(e => !e) }} />
			</div>
			{error && <div className="red text-start f12">Credenciais inválidas.</div>}
			{errorAuthorization && <div className="red text-start f12">Credenciais inválidas.</div>}
			<button type="submit" className="btn btn-blue mt-4" /*disabled={!login || !password || isLoading}*/>
				ENTRAR {isLoading && <img alt="" src="/assets/loading.svg" width={24} />}
			</button>
			<div className="f12 fw-400 mt-0 recovery">
				<Link to='recuperacao_senha' className="esqueci-senha">Esqueci minha senha</Link>
				<span className="hl">|</span>
				<Link to='cadastro' className="cadastro">Cadastre-se</Link>
			</div>
		</form>
	)
}

const Help = () =>
{
	return (
		<div className="d-flex justify-content-center f12 fw-500 flex-column mt-5 mb-2 help">
			<a href="" className="black text-center text-decoration-none">Contate nosso suporte</a>
			<a href="" target="_blank"
				className="black lh-1 text-center text-decoration-none mt-2">Política de privacidade</a>
		</div>
	)
}