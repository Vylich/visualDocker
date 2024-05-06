import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './App.jsx'
import './index.scss'
import './assets/themes/theme.css'
import { BrowserRouter, HashRouter, useLocation } from 'react-router-dom'
import store from './redux/store';
import { useEffect } from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'))

function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null
}

root.render(
	<>
		<HashRouter>
			<Provider store={store}>
				<ScrollToTop />
				<App />
			</Provider>
		</HashRouter>
	</>
)
