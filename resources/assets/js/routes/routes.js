//import Home from '../pages/home'
import Login from '../pages/login'
import Master from '../pages/master'
//import Register from '../pages/register'
//import ForgotPassword from '../pages/forgotPassword'
//import ResetPassword from '../pages/resetPassword'
import Dashboard from '../pages/dashboard'
import DashboardBlack from '../pages/dashboard-black'
import MasterBlack from '../pages/master-black'
import LoginBlack from '../pages/login-black'
import IndexBlack from '../pages/index-black'
//import NoMatch from '../pages/noMatch'

const routes = [
    
    {
        path: '/login',
        exact: true,
        auth: false,
        icon: "tim-icons icon-coin",
        component: LoginBlack,
        hide: true,
    },
    {
        path: '/',
        exact: true,
        auth: false,
        icon: "tim-icons icon-coin",
        component: IndexBlack,
        hide: true,
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: "tim-icons icon-chart-pie-36",
        component: DashboardBlack,
        layout: "/admin",
        exact: true,
        auth: true,
    },
    {
        path: '/barang',
        name: "Barang",
        exact: true,
        auth: true,
        icon: "tim-icons icon-chart-pie-36",
        component: MasterBlack,
        layout: "/admin"
    }
];

export default routes;