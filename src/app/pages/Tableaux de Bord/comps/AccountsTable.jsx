import React ,{useState}from 'react'
import {
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
    Avatar,
} from '@material-ui/core'
import { SimpleCard } from 'app/components'
import axios from 'axios'
import ModifyUserDialog from './ModifyUserDialog'
import DeleteAccount from './DeleteAccount'
import MUIDataTable from 'mui-datatables'
import Breadcrumb from 'app/components/Breadcrumb/Breadcrumb'

const AccountsTable = () => {
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [page, setPage] = React.useState(0)
    const [users, setUsers] = useState([])
    const [modaluser, setModalUser] = useState([])
    const [open, setOpen] = React.useState(false)
    const [openDelete, setOpenDelete] = React.useState(false)

    function handleClickOpen(user) {
        setModalUser(user)
        setOpen(true)
    }  

    function handleOpenDelete(user) {
        setModalUser(user)
        setOpenDelete(true)
    }  


    function handleClose(){
        setOpen(false)
        setOpenDelete(false)
    }

    React.useEffect(() => {
        axios.get('http://13.36.215.163:8000/api/administration/user/?page='+page, {headers: {"Authorization": `Bearer  ${localStorage.getItem('accessToken')}`}})
        .then(res => {
            console.log("USERS DATA",res.data)
            setUsers(res.data)
        })
    }, [page])
    console.log("USRES",users.results)

    const handleChangePage = (event, newPage) => {
        setPage(event)
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
    }


    const columns = [
        {
            name: "first_name",
            label: 'Prénom',
            options: {
             filter: true,
             sort: false
            }
        },
        {
            name: "last_name",
            label: 'Nom',
            options: {
             filter: true,
             sort: false
            }
        },
        {
            name: "email",
            label: 'Email',
            options: {
             filter: true,
             sort: false
            }
        },
        {
            name: "groups",
            label: 'Rôle',
            options: {
             filter: true,
             sort: false
            }
        },
        {
            name: "date_joined",
            label: 'Date de création',
            options: {
             filter: true,
             sort: false
            }
        },
        {
            name: 'Action',
            label: 'Action',
            options: {
             filter: true,
             sort: false,
             customBodyRenderLite: (dataIndex) => {
                return ( 
                    <>
                                    <IconButton onClick={() => handleClickOpen(users.results[dataIndex])}>
                                        <Icon>edit</Icon>
                                    </IconButton>
                                    <IconButton onClick={() => handleOpenDelete(users.results[dataIndex])}>
                                        <Icon color="error">close</Icon>
                                    </IconButton>
                </>
                )
              }
            }
        }
    ]
    

    const options = {
        count: users.count,
        download: false,
        print: false,
        page: page,
        selectableRows: 'none',
        onChangePage:handleChangePage,
        rowsPerPage:10,
        onChangeRowsPerPage:handleChangeRowsPerPage,
        serverSide: true,
        textLabels: {
            body: {
                noMatch: 'Aucun utilisateur trouvé.'
            },
            toolbar: {
                search: 'Recherche',
                viewColumns: 'Voir les colonnes',
                filterTable: 'Tableau des filtres',
              },
              pagination: {
                rowsPerPage: " "
              },
              filter: {
                all: "TOUS",
                title: "FILTRES",
                reset: "REINITIALISER",
              },
        }
   }

    return (
        <>
        {/* <Breadcrumb
                    routeSegments={[
                        { name: 'Gestion des utilisateurs', path: '/tableaux-de-bord' },
                        { name: 'Tableaux de bord des Utilisateurs' },
                    ]}
            /> */}
        <MUIDataTable
            data={users.results}
            title={'Liste des utilisateurs'}
            options={options}
            columns={columns}
        />

        <ModifyUserDialog user= {modaluser} open={open} handleClose={() => handleClose()}/>
        <DeleteAccount user= {modaluser} open={openDelete} handleClose={() => handleClose()} />
        </>
    )
}

export default AccountsTable
