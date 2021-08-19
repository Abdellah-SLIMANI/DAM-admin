import React, { Component } from 'react'
import SearchBar from '../Chercher une definition/comps/SearchBar.jsx'
import ModifyDefTable from '../Tableaux de Bord/comps/TabDeBord'
import TableDesDefs from './comps/TableDesDefs'

export default class ModifyDef extends Component {
    render() {
        return (
            <div>
                <SearchBar />
                <TableDesDefs />
            </div>
        )
    }
}
