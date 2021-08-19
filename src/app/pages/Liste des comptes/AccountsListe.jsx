import React from 'react'
import AccountsTable from './comps/AccountsTable'

export default function AccountsListe() {
    return (
        <div className='m-10'>
            {/* <Breadcrumb 
                routeSegments={[
                { name: "Gestions des Comptes" },
                ]} 
            /> */}
            <AccountsTable />
        </div>
    )
}
