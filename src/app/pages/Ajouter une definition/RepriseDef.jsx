import React from 'react'
import Breadcrumb from '../../../app/components/Breadcrumb/Breadcrumb'
import RepriseDefComp from './comps/RepriseDefComp'

export default function AddDef() {
    return (
        <div className='m-10'>
            <Breadcrumb
                    routeSegments={[
                        { name: 'Gestion des définitions', path: '/tableaux-de-bord' },
                        { name: 'Reprise des définitions' },
                    ]}
            />
            <RepriseDefComp />
        </div>
    )
}
