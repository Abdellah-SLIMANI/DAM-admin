import React ,{useRef, useState}from 'react'
import {
    IconButton,
    Icon,
    Card,
    Tooltip,
    CircularProgress,
} from '@material-ui/core'
import axios from 'axios'
import { useHistory, useLocation } from 'react-router-dom'
import DeleteItem from 'app/pages/Components/DeleteItem'

const DeleteAuthor = () => {
    const [open, setOpen] = React.useState(false)
    const [currentWord, setCurrentWord] = useState({})
    const [authors, setAuthors] = useState([])
    const history = useHistory();
    const [loading, setLoading] = useState(false)

    function handleClose(){
        setOpen(false)
    }

    function handleDeleteClick(word){
        setOpen(true)
        setCurrentWord(word)
    }

      function useQuery() {
        return new URLSearchParams(useLocation().search);
      }
      let query = useQuery();

    React.useEffect(() => { 
        if(query.get('nom') != null){
            setLoading(true)
            axios.get(`http://13.36.215.163:8000/api/elastic/auteur/?nom=${query.get('nom')}`)
            .then(res => {
                console.log(res.data)
                setAuthors(res.data)
            })
            .finally(() => {setLoading(false)})
        }
    }, [query.get('nom')])
    console.log("Authors",authors)
    
    return (
        <>
                                {!!authors.length && loading && (
                                    <div className='m-auto' style={{height: '50vh',transform: 'translate(0,10%)', textAlign: 'center'}}>
                                    <CircularProgress
                                        color="inherit"
                                        size={20}
                                    />
                                    </div>
                                )}
                                       <div className='grid'>
                     {authors && authors
                        .map((author, index) => (

                <Card
                    className="flex flex-wrap flex-row justify-between items-center p-sm-24 bg-paper m-10"
                    elevation={6}
                >
                    {/* {actualWord} */}
                    <div className='flex-row'>
                    <div className="flex items-center">
                        {/* <Icon>group</Icon> */}
                        <div className="ml-3 flex-column">
                        <h6 className="m-0 mt-1 text-primary font-medium" dangerouslySetInnerHTML={{__html: author.nom}}>
                            </h6>
                            <small className="text-muted" dangerouslySetInnerHTML={{__html: author.prenom}}></small>
                            <small className="text-muted" dangerouslySetInnerHTML={{__html: author.biographie}}></small>
                        </div>
                    </div>
                    <Tooltip title="View Details" placement="top">
                        <IconButton onClick={()=>{handleDeleteClick(author)}}>
                            <Icon>delete</Icon>
                        </IconButton>
                    </Tooltip>
                    </div>
                </Card>

             ))}
             </div>
             <DeleteItem
                open = {open}
                handleClose={()=>handleClose()}
                item={currentWord}
                message="Confirmez-vous la suppression définitive de l'auteur:"
                url='http://13.36.215.163:8000/api/administration/delete_auteur_es/'
             />
            </>
    )
}

export default DeleteAuthor
