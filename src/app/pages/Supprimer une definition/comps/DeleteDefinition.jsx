import React ,{useRef, useState}from 'react'
import {
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
    Grid,
    Card,
    Tooltip,
    CircularProgress,
} from '@material-ui/core'
import { SimpleCard } from 'app/components'
import axios from 'axios'
import { useHistory, useLocation } from 'react-router-dom'

const DeleteDefinition = () => {
    const [definitions, setDefinitions] = useState([])
    const history = useHistory();
    const [loading, setLoading] = useState(false)

    function redirectToModify(def) {
        localStorage.setItem('modifyWord',def.titre);
        let queryString = "titre=" + def.titre;
        history.push(`/modifier-une-definition-write/?${queryString}`);
      }

      function useQuery() {
        return new URLSearchParams(useLocation().search);
      }
      let query = useQuery();

    React.useEffect(() => { 
        if(query.get('titre') != null){
            setLoading(true)
            axios.get(`http://13.36.215.163:8000/api/elastic/search/?titre=${query.get('titre')}`)
            .then(res => {
                console.log(res.data)
                setDefinitions(res.data)
            })
            .finally(() => {setLoading(false)})
        }
    }, [query.get('titre')])
    console.log(definitions)
    
    return (
        <>
                                {!!definitions.length && loading && (
                                    <div className='m-auto' style={{height: '50vh',transform: 'translate(0,10%)', textAlign: 'center'}}>
                                    <CircularProgress
                                        color="inherit"
                                        size={20}
                                    />
                                    </div>
                                )}
                                       <div className='grid'>
                     {definitions && definitions
                        .map((definition, index) => (

                <Card
                    className="flex flex-wrap flex-row justify-between items-center p-sm-24 bg-paper m-10"
                    elevation={6}
                >
                    {/* {actualWord} */}
                    <div className='flex-row'>
                    <div className="flex items-center">
                        {/* <Icon>group</Icon> */}
                        <div className="ml-3 flex-column">
                        <h6 className="m-0 mt-1 text-primary font-medium">
                                {definition.titre}
                            </h6>
                            <small>{definition.definition.map(def => def.definition)}</small>
                            <small className="text-muted">{definition.edition}</small>
                        </div>
                    </div>
                    <Tooltip title="View Details" placement="top">
                        <IconButton onClick={()=>{redirectToModify(definition)}}>
                            <Icon>delete</Icon>
                        </IconButton>
                    </Tooltip>
                    </div>
                </Card>

             ))}
             </div>
            </>
    )
}

export default DeleteDefinition
