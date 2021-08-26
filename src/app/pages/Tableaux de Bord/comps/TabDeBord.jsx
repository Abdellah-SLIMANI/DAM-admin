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
} from '@material-ui/core'
import { SimpleCard } from 'app/components'
import axios from 'axios'
import { useHistory, useLocation } from 'react-router-dom'
import { User } from '@auth0/auth0-spa-js'
import useAuth from 'app/hooks/useAuth'

const TabDeBord = () => {
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)
    const [definitions, setDefinitions] = useState([])
    const history = useHistory();
    let {user} = useAuth()
    console.log("USER NOW", user)

    function redirectToModify(def) {
        localStorage.setItem('modifyWord',def.titre);
        let queryString = "titre=" + def.titre;
        history.push(`/modifier-une-definition-write/?${queryString}`);
    }

    React.useEffect(() => {
        axios.get('http://13.36.215.163:8000/api/administration/article/?page='+page , {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }})
        .then(res => {
            console.log(res.data)
            setDefinitions(res.data)
        })
    }, [page])
    console.log(definitions)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(1)
    }

    const ValidateWord = (word) =>{
        let data = user.role == 'Utilisateur' ? {
            titre: word.titre,
            status: 'soumis',
            data: word.data
        } : 
        {
            titre: word.titre,
            status: 'valide',
            data: word.data
        }
        axios.put('http://13.36.215.163:8000/api/administration/article/'+word.id+'/' , data , {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }})
            .then(
                (res)=> {console.log("PUT", res) ;
                window.location.reload()}
            )
    }

    return (
        <SimpleCard title="Liste des définitions">
        <div className="w-full overflow-auto">
            <Table className="whitespace-pre">
                <TableHead>
                    <TableRow>
                        <TableCell className="px-0">Titre</TableCell>
                        <TableCell className="px-0">Code</TableCell>
                        {user.role == 'Valideur' && <TableCell className="px-0">Emetteur</TableCell>}
                        <TableCell className="px-0">Date d'émission</TableCell>
                        <TableCell className="px-0">Statut</TableCell>
                        <TableCell className="px-0">Version</TableCell>
                        <TableCell className="px-0">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {definitions.results && definitions.results
                        .map((definition, index) => (
                            <TableRow key={index}>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                    dangerouslySetInnerHTML={{__html:definition.titre}}
                                >
                                </TableCell>

                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                    {definition.data.codes ? definition.data.code : '--'}
                                </TableCell>
{                                
                                user.role == 'Valideur' && 
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                    {definition.created_by.first_name} {definition.created_by.last_name}
                                </TableCell>}


                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                    {definition.last_updated_date}
                                </TableCell>

                                <TableCell
                                    className="px-0"
                                    align="left"
                                >
                                    {definition.status ? (
                                        definition.status == 'soumis' ? (
                                            <small className="border-radius-4 bg-green text-white px-2 py-2px">
                                                {definition.status}
                                            </small>
                                        ) : (
                                            <small className="border-radius-4 bg-secondary text-white px-2 py-2px">
                                                {definition.status}
                                            </small>
                                        )
                                    ) : (
                                        <small className="border-radius-4 bg-error text-white px-2 py-2px">
                                            {definition.status}
                                        </small>
                                    )}
                                </TableCell>


                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                    {definition.data.edition}
                                </TableCell>
                                <TableCell className="px-0">
                                    <IconButton onClick={() => redirectToModify(definition)}>
                                        <Icon>edit</Icon>
                                    </IconButton>
                                    <IconButton>
                                        <Icon color="error">close</Icon>
                                    </IconButton>
                                    <IconButton onClick={()=>ValidateWord(definition)}>
                                        <Icon className='hover-bg-green'>done</Icon>
                                    </IconButton>
                                           
                                </TableCell>                 
                            </TableRow>
                        ))}
                </TableBody>
            </Table>

            <TablePagination
                className="px-4"
                component="div"
                count={definitions.count}
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
        </SimpleCard>
    )
}

export default TabDeBord
