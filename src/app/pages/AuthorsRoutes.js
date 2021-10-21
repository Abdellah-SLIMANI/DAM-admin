import React from 'react'
import { authRoles } from '../auth/authRoles'

const authorRoutes = [
    {
        path: '/ajouter-un-auteur',
        component: React.lazy(() => import('./Ajouter un auteur/AddAuthorPage')),
        auth: authRoles.sa,
    },
    {
        path: '/Tableaux-de-bord-auteurs',
        component: React.lazy(()=> import('./Tableaux de Bords des auteurs/TabDeBordAuteurs')),
        auth: authRoles.sa
    },
    {
        path: '/modifier-un-auteur',
        component: React.lazy(()=> import('./Chercher un auteur (modify)/SearchAuthorToModify')),
        auth: authRoles.sa
    },
    {
        path: '/modifier-un-auteur-write',
        component: React.lazy(()=> import('./Modifier un auteur/ModifyAuthorPage')),
        auth: authRoles.sa
    },
    {
        path: '/supprimer-un-auteur',
        component: React.lazy(()=> import('./supprimer un auteur/supprimer un auteur')),
        auth: authRoles.sa
    },
]

export default authorRoutes
