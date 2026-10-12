import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Routes,Route,useLocation} from 'react-router-dom';
import {MotionConfig,motion} from 'motion/react';
import '@fontsource/dm-sans/latin-400.css';
import '@fontsource/dm-sans/latin-500.css';
import '@fontsource/dm-sans/latin-600.css';
import '@fontsource/fraunces/latin-400.css';
import '@fontsource/fraunces/latin-400-italic.css';
import './styles.css';
import './refinements.css';
import {Store} from './context/Store';
import {SiteHeader,SiteFooter} from './components/Layout';
import {CartDrawer} from './components/Order';
import Home from './pages/Home';
import {MenuPage,CheckoutForm,Confirmation,ReservationForm,SpecialsPage,AboutPage,ContactPage,NotFound} from './pages/Pages';
function App(){const location=useLocation();return <><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader/><div id="main-content" tabIndex={-1}><motion.div key={location.pathname} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.2}}><Routes><Route path="/" element={<Home/>}/><Route path="/menu" element={<MenuPage/>}/><Route path="/order" element={<MenuPage ordering/>}/><Route path="/order/checkout" element={<CheckoutForm/>}/><Route path="/order/confirmation" element={<Confirmation/>}/><Route path="/specials" element={<SpecialsPage/>}/><Route path="/reservations" element={<ReservationForm/>}/><Route path="/about" element={<AboutPage/>}/><Route path="/contact" element={<ContactPage/>}/><Route path="*" element={<NotFound/>}/></Routes></motion.div></div><SiteFooter/><CartDrawer/></>}
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><MotionConfig reducedMotion="user"><BrowserRouter><Store><App/></Store></BrowserRouter></MotionConfig></React.StrictMode>);

