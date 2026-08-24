import './styles/normalize.css';
import './styles/styles.css';
import { Outlet } from 'react-router-dom';
import { Header } from 'widgets/Header';
import { Footer } from 'widgets/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './app.module.css';

export const App = () => {
	return (
		<>
			<div className={styles.app}>
				<header className={styles.header}>
					<Header />
				</header>
				<main className={styles.main}>
					<Outlet />
				</main>
				<footer className={styles.footer}>
					<Footer />
				</footer>
			</div>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				pauseOnHover
				theme='colored'
			/>
		</>
	);
};
