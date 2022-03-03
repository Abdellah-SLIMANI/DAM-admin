import { Card, Grid, Icon, IconButton, Tooltip } from '@material-ui/core'
import React from 'react'
import AddDefComp from './comps/AddDefComp'
import Breadcrumb from '../../../app/components/Breadcrumb/Breadcrumb'

export default function AddDef() {
    return (
        <div className='m-10'>
            <Breadcrumb
                    routeSegments={[
                        { name: 'Gestion des définitions', path: '/tableaux-de-bord' },
                        { name: 'Ajouter une définition' },
                    ]}
            />
            <AddDefComp />
        </div>
    )
}
