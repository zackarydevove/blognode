import React, { useState, useEffect } from 'react'
import { register } from '../api/auth'
import { useNavigate } from 'react-router-dom';

const SignupPage: React.FC = () => {
	const [email, setEmail] = useState<string>('');
	const [firstname, setFirstname] = useState<string>('');
	const [lastname, setLastname] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("hey");
		try {
			const res = await register(email, password, confirmPassword, firstname, lastname);
			if (res && res.data.token)  {
				localStorage.setItem("jwtAuth", res.data.token);
				navigate('/feed');
			}
			console.log("res:", res);
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		if (localStorage.getItem("jwtAuth")) {
			navigate('/feed');
		}
	}, []);

  return (
	<div className='flex justify-center items-center h-screen bg-[#f8f9fa] relative'>
		<div className='flex flex-col w-[500px]'>
			<h1 className='text-lg text-[#3e5fd9] font-bold mb-5'>Sign up</h1>
			<form className='flex flex-col gap-5' onSubmit={handleSubmit}>
				<div>
					<label></label>
					<input
						className='bg-white p-3 w-full rounded-md border border-[#c0cad8] placeholder-[#c0cad8] placeholder:font-bold'
						placeholder='Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}>
					</input>
				</div>

				<div>
					<label></label>
					<input
						className='bg-white p-3 w-full rounded-md border border-[#c0cad8] placeholder-[#c0cad8] placeholder:font-bold'
						placeholder='First name'
						value={firstname}
						onChange={(e) => setFirstname(e.target.value)}>
					</input>
				</div>

				<div>
					<label></label>
					<input
						className='bg-white p-3 w-full rounded-md border border-[#c0cad8] placeholder-[#c0cad8] placeholder:font-bold'
						placeholder='Last name'
						value={lastname}
						onChange={(e) => setLastname(e.target.value)}>
					</input>
				</div>

				<div>
					<label></label>
					<input 
						className='bg-white p-3 w-full rounded-md border border-[#c0cad8] placeholder-[#c0cad8] placeholder:font-bold'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}>
					</input>
				</div>

				<div>
					<label></label>
					<input 
						className='bg-white p-3 w-full rounded-md border border-[#c0cad8] placeholder-[#c0cad8] placeholder:font-bold'
						placeholder='Confirm Password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}>
					</input>
				</div>

				<button className='rounded-full bg-[#3e5fd9] text-white mt-7 p-4 font-bold'>SIGN UP</button>
			</form>
			<div className='flex justify-center items-center mt-5'>
				<a href="/login" className='text-lg text-[#3e5fd9] font-bold'>Already have an account? Sign in</a>
			</div>
		</div>
		<div className='absolute bottom-12 right-12 w-[500px] h-[500px] bg-home_img1 bg-no-repeat bg-center'/>
		<div className='absolute bottom-12 left-12 w-[500px] h-[500px] bg-home_img2 bg-no-repeat bg-center'/>
		<div className='absolute top-12 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-brand_name bg-no-repeat bg-center'/>
	</div>
  )
}

export default SignupPage
