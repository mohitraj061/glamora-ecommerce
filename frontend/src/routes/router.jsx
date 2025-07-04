import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import CategoryPage from "../pages/category/CategoryPage";
import Search from "../pages/search/Search";
import ShopPage from "../pages/shop/ShopPage";
import SingleProduct from "../pages/shop/productDetails/SingleProduct";
import Login from "../components/Login";
import Register from "../components/Register";
import PaymentSuccess from "../components/PaymentSuccess";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import UserDMain from "../pages/dashboard/user/dashboard/UserDMain";
import UserOrders from "../pages/dashboard/user/UserOrders";
import OrderDetails from "../pages/dashboard/user/OrderDetails";
import UserPayments from "../pages/dashboard/user/UserPayments";
import UserProfile from "../pages/dashboard/user/UserProfile";
import UserReviews from "../pages/dashboard/user/UserReviews";
import AdminDMain from "../pages/dashboard/admin/dashboard/AdminDMain";
import AddProduct from "../pages/dashboard/admin/addProduct/AddProduct";
import ManageProducts from '../pages/dashboard/admin/manageProduct/ManageProducts';
import UpdateProduct from "../pages/dashboard/admin/manageProduct/UpdateProduct";
import ManageUsers from "../pages/dashboard/admin/manageUsers/ManageUsers";
import ManageOrders from "../pages/dashboard/admin/manageOrders/ManageOrders";
import ErrorPage from "../components/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/categories/:categoryName", element: <CategoryPage /> },
            { path: "/shop", element: <ShopPage /> },
            { path: "/search", element: <Search /> },
            { path: "/shop/:id", element: <SingleProduct /> },
            { path: "/success", element: <PaymentSuccess /> },
            { path: "/orders/:orderId", element: <OrderDetails /> },
        ],
    },

    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },

    // Dashboard routes
    {
        path: '/dashboard',
        element:
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>,
        children: [
            // USER ROUTES
            { path: '', element: <UserDMain /> },
            { path: 'orders', element: <UserOrders /> },
            { path: 'payments', element: <UserPayments /> },
            { path: 'profile', element: <UserProfile /> },
            { path: 'reviews', element: <UserReviews /> },

            // ADMIN ROUTES (only accessible by admins)
            {
                path: 'admin',
                element:
                    <PrivateRoute role="admin">
                        <AdminDMain />
                    </PrivateRoute>
            },
            {
                path: 'add-product',
                element:
                    <PrivateRoute role="admin">
                        <AddProduct />
                    </PrivateRoute>
            },
            {
                path: 'manage-products',
                element:
                    <PrivateRoute role="admin">
                        <ManageProducts />
                    </PrivateRoute>
            },
            {
                path: 'update-product/:id',
                element:
                    <PrivateRoute role="admin">
                        <UpdateProduct />
                    </PrivateRoute>
            },
            {
                path: 'users',
                element:
                    <PrivateRoute role="admin">
                        <ManageUsers />
                    </PrivateRoute>
            },
            {
                path: 'manage-orders',
                element:
                    <PrivateRoute role="admin">
                        <ManageOrders />
                    </PrivateRoute>
            },
        ],
    },
]);

export default router;
