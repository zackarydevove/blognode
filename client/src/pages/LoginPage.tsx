import React, { useState, useEffect} from 'react'
import { login } from '../api/auth'
import { useNavigate } from 'react-router-dom'

const LoginPage: React.FC = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const navigate = useNavigate();

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const token = await login(email, password);
			if (token === "Incorrect email or password" || token === "Failed to login.") {
				return ;
			}
			localStorage.setItem("jwtAuth", token);
			navigate('/feed');
			console.log("token:", token);
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		if (localStorage.getItem("jwtAuth")) {
			navigate('/feed');
		}
	}, [navigate]);

  return (
	<div className='flex justify-center items-center h-screen bg-[#f8f9fa] relative'>
		<div className='flex flex-col w-[500px]'>
			<h1 className='text-lg text-[#3e5fd9] font-bold mb-5'>Login</h1>
			<form className='flex flex-col gap-5'
				onSubmit={handleLogin}>
				<div>
					<label></label>
					<input
						className='bg-white p-3 w-full rounded-md border border-[#c0cad8] placeholder-[#c0cad8] placeholder:font-bold'
						placeholder='Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}>
					</input>
				</div>

				<div className='relative'>
					<label></label>
					<input 
						className='bg-white p-3 w-full rounded-md border border-[#c0cad8] placeholder-[#c0cad8] placeholder:font-bold'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}>
					</input>
					<a href="/passwordforgot" className='absolute -bottom-9 right-0 text-lg text-[#3e5fd9] font-bold'>Forgot password?</a>
				</div>

				<button className='rounded-full bg-[#3e5fd9] text-white mt-7 p-4 font-bold'>SIGN IN</button>
			</form>
			<div className='flex justify-center items-center mt-5'>
				<a href="/signup" className='text-lg text-[#3e5fd9] font-bold'>Don't have an account? Sign up</a>
			</div>
		</div>
		<div className='absolute bottom-12 right-12 w-[500px] h-[500px] bg-home_img1 bg-no-repeat bg-center'/>
		<div className='absolute bottom-12 left-12 w-[500px] h-[500px] bg-home_img2 bg-no-repeat bg-center'/>
		<div className='absolute top-12 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-brand_name bg-no-repeat bg-center'/>
	</div>
  )
}

export default LoginPage
