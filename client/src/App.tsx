import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import FeedPage from './pages/FeedPage';
import ProfilePage from './pages/ProfilePage';
import { UserProvider } from './context/UserContext';

function App() {

	return (
		<UserProvider>
			<Router>
				<Routes>
					<Route path='/' element={<HomePage />}/>
					<Route path='/login' element={<LoginPage />}/>
					<Route path='/signup' element={<SignupPage />}/>
					<Route path='/feed' element={<FeedPage />}/>
					<Route path='/profile/:username' element={<ProfilePage />}/>
				</Routes>
			</Router>
		</UserProvider>
	);
}

export default App;
