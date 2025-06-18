import  { lazy } from 'react'
import DefaultLayout from '../layouts/DefaultLayout';
import AuthLayout from '../layouts/AuthLayout';

const Login = lazy(() => import("../pages/auth/Login"));
const Payment = lazy(() => import("../pages/payment/Payment"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));

const Customers = lazy(() => import("../pages/customer/Customer"));
const CreateTicket = lazy(() => import("../pages/customer/CreateTicket"));
const ViewTicket = lazy(() => import("../pages/customer/ViewTicket"));
const ViewFeedback = lazy(() => import("../pages/customer/ViewFeedback"));

const UserManagement = lazy(() => import("../pages/user/User"));
const AddUserManagement = lazy(() => import("../pages/user/AddUser"));
const EditUserManagement = lazy(() => import("../pages/user/EditUser"));

const OrderManagement = lazy(() => import("../pages/order/Order"));
const ViewOrderManagement = lazy(() => import("../pages/order/ViewOrder"));

const ProductManagement = lazy(() => import("../pages/product/Product"));
const AddProductManagement = lazy(() => import("../pages/product/AddProduct"))
const EditProductManagement = lazy(() => import("../pages/product/EditProduct"))
const ViewProductManagement = lazy(() => import("../pages/product/ViewProduct"))

const routeConfig = [
    {
        path: "/auth/login",
        component: Login,
        auth: false,
        layout: DefaultLayout,
    },
    {
        path: "/",
        component: Dashboard,
        auth: true,
        layout: AuthLayout,
    },
    {
        path: "/main/product-management",
        component: ProductManagement,
        auth: true,
        layout: AuthLayout,
    },
    {
        path: "/main/product-management/add",
        component: AddProductManagement,
        auth: true,
        layout: AuthLayout,
    },
    {
        path: "/main/product-management/edit/:id",
        component: EditProductManagement,
        auth: true,
        layout: AuthLayout,
    },
    {
        path: "/main/product-management/view/:id",
        component: ViewProductManagement,
        auth: true,
        layout: AuthLayout,
    },
    {
        path: "/main/order-management",
        component: OrderManagement,
        auth: true,
        layout: AuthLayout,
    },
    {
        path: "/main/order-management/view/:id",
        component: ViewOrderManagement,
        auth: true,
        layout: AuthLayout,
    },
    {
        path: "/main/payments",
        component: Payment,
        auth: true,
        layout: AuthLayout,
    },
    {
        path: "/main/user-management",
        component: UserManagement,
        auth: true,
        layout: AuthLayout,
    },
    {
        path: "/main/user-management/add",
        component: AddUserManagement,
        auth: true,
        layout: AuthLayout,
    },
    {
        path: "/main/user-management/edit/:id",
        component: EditUserManagement,
        auth: true,
        layout: AuthLayout,
    },
    {
        path: "/main/customer-support",
        component: Customers,
        auth: true,
        layout: AuthLayout,
    },
        {
        path: "/main/customer-support/ticket/create",
        component: CreateTicket,
        auth: true,
        layout: AuthLayout,
    },
    {
        path: "/main/customer-support/ticket/view/:id",
        component: ViewTicket,
        auth: true,
        layout: AuthLayout,
    },
    {
        path: "/main/customer-support/feedback/view/:id",
        component: ViewFeedback,
        auth: true,
        layout: AuthLayout,
    },
]

export default routeConfig