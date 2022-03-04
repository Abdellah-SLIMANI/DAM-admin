import { authRoles } from './auth/authRoles'

export const navigations = [
    {
        name: 'Définitions',
        path: '/ajouter-une-definition',
        icon: 'book',
        children: [
            {
                name: 'Modifier une définition',
                iconText: 'SI',
                path: '/chercher-une-definition',
            },
            {
                name: 'Ajouter une définition',
                iconText: 'SI',
                path: '/ajouter-une-definition',
            }
        ]
    },
    {
        name: 'Gestion des comptes',
        path: '/',
        icon: 'list',
        children: [
            {
                name: 'Liste des comptes',
                iconText: 'SI',
                path: '/liste-des-comptes',
            },
            {
                name: 'Ajouter un compte',
                iconText: 'SI',
                path: '/ajouter-un-compte',
            }
        ]
    },
]
