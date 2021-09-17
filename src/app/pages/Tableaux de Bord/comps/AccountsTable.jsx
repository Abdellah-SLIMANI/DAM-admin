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

const AccountsTable = () => {
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [page, setPage] = React.useState(1)
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
                noMatch: 'Aucune définition trouvée.'
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
        <MUIDataTable
            data={users.results}
            title={'Liste des utilisateurs'}
            options={options}
            columns={columns}
        />
        {/* <div className="w-full overflow-auto">
            <Table className="whitespace-pre">
                <TableHead>
                    <TableRow>
                        <TableCell className="w-100">
                            <Icon>account_circle</Icon>
                        </TableCell>
                        <TableCell className="px-0">Nom</TableCell>
                        <TableCell className="px-0">Prénom</TableCell>
                        <TableCell className="px-0">Email</TableCell>
                        <TableCell className="px-0">Rôle</TableCell>
                        <TableCell className= "px-0">Date de création</TableCell>
                        <TableCell className="px-0">Actions</TableCell>
                    </TableRow>
                </TableHead>
            <TableBody>
                    {users.results && users.results
                        .map((user, index) => (
                            <TableRow key={index}>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                        <Avatar
                                        className="cursor-pointer"
                                        src={user.avatar}
                                    />
                                </TableCell>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                    {user.last_name}
                                </TableCell>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                    {user.first_name}
                                </TableCell>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                    {user.email}
                                </TableCell>

                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                    {user.groups}
                                </TableCell>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                    {user.date_joined}
                                </TableCell>
                                <TableCell className="px-0 flex flex-row">
                                    <IconButton onClick={() => handleClickOpen(user)}>
                                        <Icon>Edit</Icon>
                                    </IconButton>
                                    <IconButton onClick={() => handleOpenDelete(user)}>
                                        <Icon color="error">close</Icon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody> 
            </Table>

            <TablePagination
                className="px-4"
                component="div"
                count={users.count}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                onChangePage={handleChangePage}
                rowsPerPage={rowsPerPage}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div> */}
        <ModifyUserDialog user= {modaluser} open={open} handleClose={() => handleClose()}/>
        <DeleteAccount user= {modaluser} open={openDelete} handleClose={() => handleClose()} />
        </>
    )
}

export default AccountsTable
