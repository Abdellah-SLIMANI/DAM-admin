import { MatxSuspense } from 'app/components'
import Breadcrumb from 'app/components/Breadcrumb/Breadcrumb'
import useAuth from 'app/hooks/useAuth'
import React from 'react'
import AccountsTable from '../Tableaux de Bord/comps/AccountsTable'
import TabDeBord from './comps/TabDeBord'

export default function TableauxDeBord() {

    const {user} = useAuth()
    return (
        <div className='m-10'>
            {
                user.role == 'Administrateur'?
                <AccountsTable />
                :
                <TabDeBord />
            }
        </div>
    )
}
