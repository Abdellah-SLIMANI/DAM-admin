import { MatxSuspense } from 'app/components'
import Breadcrumb from 'app/components/Breadcrumb/Breadcrumb'
import useAuth from 'app/hooks/useAuth'
import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import AccountsTable from '../Tableaux de Bord/comps/AccountsTable'
import TabDeBordAuteurs from '../Tableaux de Bords des auteurs/TabDeBordAuteurs'
import TabDeBord from './comps/TabDeBord'

export default function TableauxDeBord() {

    const {user} = useAuth()
    return (
        <div className='m-10'>
            {
                user.role == 'Administrateur'?
                <AccountsTable />
                :
                <>
                <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="home" title="Definitions">
                        <TabDeBord />
                    </Tab>
                    <Tab eventKey="profile" title="Auteurs">
                        <TabDeBordAuteurs />
                    </Tab>
                </Tabs>
                </>

            }
        </div>
    )
}
