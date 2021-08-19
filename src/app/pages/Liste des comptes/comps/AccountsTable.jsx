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

const AccountsTable = () => {
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)
    const [users, setUsers] = useState([])

    

    React.useEffect(() => {
        axios.get('http://13.36.215.163:8000/api/administration/user/')
        .then(res => {
            console.log(res.data)
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
                        <TableCell className="px-0">
                            <Icon>account_circle</Icon>
                        </TableCell>
                        <TableCell className="px-0">Prenom</TableCell>
                        <TableCell className="px-0">Nom</TableCell>
                        <TableCell className="px-0">Email</TableCell>
                        <TableCell className="px-0">Role</TableCell>
                        <TableCell className="px-0">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users && users
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((user, index) => (
                            <TableRow key={index}>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                        <Avatar
                                        className="cursor-pointer"
                                        src={user && user.avatar}
                                    />
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
                                    {user.last_name}
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
                                <TableCell className="px-0">
                                    <IconButton>
                                        <Icon>edit</Icon>
                                    </IconButton>
                                    <IconButton>
                                        <Icon color="error">close</Icon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>

            <TablePagination
                className="px-4"
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
        </SimpleCard>
    )
}

export default AccountsTable
