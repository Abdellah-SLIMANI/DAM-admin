import NotFound from './NotFound'
import ForgotPassword from './ForgotPassword'
import JwtRegister from './register/JwtRegister'
import JwtLogin from './login/JwtLogin'
import ResetPassword from './ResetPassword'
import FirstLogin from './FirstLogin'

const sessionRoutes = [
    {
        path: '/session/signup',
        component: JwtRegister,
    },
    {
        path: '/session/signin',
        component: JwtLogin,
    },
    {
        path: '/session/forgot-password',
        component: ForgotPassword,
    },
    {
        path:'/session/first-login',
        component: FirstLogin
    },
    {
        path: '/session/reset-password',
        component: ResetPassword
    },
    {
        path: '/session/404',
        component: NotFound,
    },
]

export default sessionRoutes
