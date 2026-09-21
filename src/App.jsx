import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './pages/Home/Home';
import { site } from './config/site';

const { shop: SHOP, accounts: ACCOUNTS, recipes: RECIPES } = site.features;
const toHome = <Navigate to="/" replace />;

// Home loads eagerly (first paint); every other page is code-split.
const Shop = lazy(() => import('./pages/Shop/Shop'));
const ProductDetails = lazy(() => import('./pages/ProductDetails/ProductDetails'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const Checkout = lazy(() => import('./pages/Checkout/Checkout'));
const OrderSuccess = lazy(() => import('./pages/Checkout/OrderSuccess'));
const OurFarm = lazy(() => import('./pages/OurFarm/OurFarm'));
const WhyUs = lazy(() => import('./pages/WhyUs/WhyUs'));
const Recipes = lazy(() => import('./pages/Recipes/Recipes'));
const RecipeDetails = lazy(() => import('./pages/Recipes/RecipeDetails'));
const About = lazy(() => import('./pages/About/About'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const FAQ = lazy(() => import('./pages/FAQ/FAQ'));
const Wishlist = lazy(() => import('./pages/Wishlist/Wishlist'));
const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));
const Account = lazy(() => import('./pages/Account/Account'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));
const WhatAreMicrogreens = lazy(() => import('./pages/Learn/WhatAreMicrogreens'));
const HowWeGrow = lazy(() => import('./pages/Learn/HowWeGrow'));
const HowToEat = lazy(() => import('./pages/Learn/HowToEat'));
const FindMyMicrogreen = lazy(() => import('./pages/Learn/FindMyMicrogreen'));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="what-are-microgreens" element={<WhatAreMicrogreens />} />
        <Route path="how-we-grow" element={<HowWeGrow />} />
        <Route path="how-to-eat" element={<HowToEat />} />
        <Route path="find-my-microgreen" element={<FindMyMicrogreen />} />
        <Route path="shop" element={<Shop />} />
        <Route path="product/:id" element={<ProductDetails />} />
        {/* Selling (site.features.shop). /shop and /product stay as "Our Greens" info pages when off. */}
        <Route path="cart" element={SHOP ? <Cart /> : toHome} />
        <Route path="checkout" element={SHOP ? <Checkout /> : toHome} />
        <Route path="checkout/success/:orderId" element={SHOP ? <OrderSuccess /> : toHome} />
        <Route path="our-farm" element={<OurFarm />} />
        <Route path="why-us" element={<WhyUs />} />
        {/* Recipes (site.features.recipes) */}
        <Route path="recipes" element={RECIPES ? <Recipes /> : toHome} />
        <Route path="recipes/:id" element={RECIPES ? <RecipeDetails /> : toHome} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="wishlist" element={SHOP ? <Wishlist /> : toHome} />
        {/* Accounts (site.features.accounts) */}
        <Route path="login" element={ACCOUNTS ? <Login /> : toHome} />
        <Route path="register" element={ACCOUNTS ? <Register /> : toHome} />
        <Route path="account" element={ACCOUNTS ? <Account /> : toHome} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
