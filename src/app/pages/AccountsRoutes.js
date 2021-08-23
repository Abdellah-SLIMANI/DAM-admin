import React from 'react'
import { authRoles } from '../auth/authRoles'

const accountsRoutes = [
    {
        path: '/ajouter-un-utilisateur',
        component: React.lazy(() => import('./Ajouter un compte/AddAccount')),
        auth: authRoles.sa,
    },
    {
        path: '/liste-des-comptes',
        component: React.lazy(()=> import('./Liste des comptes/AccountsListe')),
        auth: authRoles.sa
    },
    // {
    //     path: './ajouter-une-defintion',
    //     component: React.lazy(()=> import('')),
    //     auth: authRoles.sa
    // }
]

export default accountsRoutes
