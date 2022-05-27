import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Pages/Home/Home';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import { Toaster } from 'react-hot-toast';
import NotFound from './components/Pages/NotFound/NotFound';
import Register from './components/Pages/Authentication/Register';
import Login from './components/Pages/Authentication/Login';
import Dashboard from './components/Pages/Dashboard/Dashboard';
import MyOrders from './components/Pages/Dashboard/MyOrders';
import AddReview from './components/Pages/Dashboard/AddReview';
import MyProfile from './components/Pages/Dashboard/MyProfile';
import RequireAuth from './components/Pages/Authentication/RequireAuth';
import AllProduct from './components/Pages/AllProduct/AllProduct';
import Users from './components/Pages/Dashboard/Users';
import RequireAdmin from './components/Pages/Authentication/RequireAdmin';
import Product from './components/Pages/Product/Product';
import Checkout from './components/Pages/Dashboard/Checkout';
import Overview from './components/Pages/Dashboard/Overview';
import RequireCustomer from './components/Pages/Authentication/RequireCustomer';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={
          <RequireAuth>
            <AllProduct />
          </RequireAuth>
        } />

        <Route path='/product/:id' element={
          <RequireAuth>
            <RequireCustomer>
              <Product />
            </RequireCustomer>
          </RequireAuth>
        } />

        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>}>
          <Route index element={<Overview />} />
          <Route path='my-orders' element={
            <RequireCustomer>
              <MyOrders />
            </RequireCustomer>} />
          <Route path='add-review' element={
            <RequireCustomer>
              <AddReview />
            </RequireCustomer>} />
          <Route path='my-profile' element={<MyProfile />} />
          <Route path='checkout/:id' element={
            <RequireCustomer>
              <Checkout />
            </RequireCustomer>} />
          <Route path='users' element={<RequireAdmin><Users /></RequireAdmin>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster />
      <Footer />
    </>
  );
}

export default App;
