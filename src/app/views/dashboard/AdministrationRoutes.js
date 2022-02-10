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
    {
        path: '/modifier-une-definition',
        component: React.lazy(() => import('../../pages/Modifier une Definition/SearchDef')),
        auth: authRoles.sa
    },
    {
        path: '/modifier-une-definition-write',
        component: React.lazy(() => import('../../pages/Modifier une Definition/ModifyDefWriting')),
        auth: authRoles.sa
    },
    {
        path: '/supprimer-une-definition',
        component: React.lazy(() => import('../../pages/Supprimer une definition/DeleteElasticDef')),
    },
    {
        path: '/modification-par-lot',
        component: React.lazy(() => import('../../pages/Modifier une Definition/ModificationLot')),
    },
    {
        path: '/reprise-des-definition',
        component: React.lazy(() => import('../../pages/Ajouter une definition/RepriseDef')),
    }
]

export default administrationRoutes
