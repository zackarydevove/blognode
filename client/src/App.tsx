import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import FeedPage from './pages/FeedPage';
import ProfilePage from './pages/ProfilePage';

function App() {

	return (
		<Router>
			<Routes>
				<Route path='/' element={<HomePage />}/>
				<Route path='/login' element={<LoginPage />}/>
				<Route path='/signup' element={<SignupPage />}/>
				<Route path='/feed' element={<FeedPage />}/>
				<Route path='/profile' element={<ProfilePage />}/>
			</Routes>
		</Router>
	);
}

export default App;
