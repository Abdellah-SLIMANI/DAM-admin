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

const AccountsTable = () => {
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [page, setPage] = React.useState(0)
    const [users, setUsers] = useState([])
    const [modaluser, setModalUser] = useState([])
    const [open, setOpen] = React.useState(false)
    const [openDelete, setOpenDelete] = React.useState(false)

    function handleClickOpen(user) {
        console.log("MODALUSER", user)
        setModalUser(user)
        setOpen(true)
    }  

    function handleOpenDelete(user) {
        console.log("MODALUSER", user)
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
    }, [])
    console.log("USRES",users)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    return (
        <SimpleCard title="La liste des Comptes">
        <div className="w-full overflow-auto">
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
        </div>
        <ModifyUserDialog user= {modaluser} open={open} handleClose={() => handleClose()}/>
        <DeleteAccount user= {modaluser} open={openDelete} handleClose={() => handleClose()} />
        </SimpleCard>
    )
}

export default AccountsTable
