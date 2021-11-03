import useAuth from 'app/hooks/useAuth'
import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router'
import AccountsTable from '../Tableaux de Bord/comps/AccountsTable'
import TabDeBordAuteurs from '../Tableaux de Bords des auteurs/TabDeBordAuteurs'
import TabDeBord from './comps/TabDeBord'

export default function TableauxDeBord() {
    const history = useHistory();
    const {user} = useAuth()
    function useQuery() {
        return new URLSearchParams(useLocation().search);
      }
      let query = useQuery();
      let tableaux = query.get('tableaux')
    return (
        <div className='m-10'>
            {
                user.role == 'Administrateur'?
                <AccountsTable />
                :
                <>
                <Tabs defaultActiveKey={tableaux ? tableaux : "definitions"} className="mb-3" unmountOnExit onSelect={(eventKey)=>{history.push(`/Tableaux-de-bord/?tableaux=${eventKey}`)}}>
                    <Tab eventKey="definitions" title="Definitions">
                        <TabDeBord />
                    </Tab>
                    <Tab eventKey="auteurs" title="Auteurs">
                        <TabDeBordAuteurs />
                    </Tab>
                </Tabs>
                </>
            }
        </div>
    )
}
