import React from 'react'
import { authRoles } from '../../auth/authRoles'

const administrationRoutes = [
    {
        path: '/Tableaux-de-bord',
        component: React.lazy(() => import('../../pages/Tableaux de Bord/TableauxDeBord')),
        auth: authRoles.sa,
    },
    {
        path: '/ajouter-une-definition',
        component: React.lazy(() => import('../../pages/Ajouter une definition/AddDef')),
        auth: authRoles.sa,
    },
    // {
    //     path: '/chercher-une-definition',
    //     component: React.lazy(() => import('../../pages/Chercher une definition/ChercherDef')),
    //     auth: authRoles.sa
    // },
    {
        path: '/modifier-une-defintion',
        component: React.lazy(() => import('../../pages/Modifier une Definition/SearchDef')),
        auth: authRoles.sa
    },
    {
        path: '/modifier-une-defintion-write',
        component: React.lazy(() => import('../../pages/Modifier une Definition/ModifyDefWriting')),
        auth: authRoles.sa
    }
    // ModifyDefWriting
]

export default administrationRoutes
