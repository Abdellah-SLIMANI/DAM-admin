import React ,{useState}from 'react'
import {IconButton,Icon,} from '@material-ui/core'

import axios from 'axios'
import { useHistory } from 'react-router-dom'
import useAuth from 'app/hooks/useAuth'
import MUIDataTable from "mui-datatables";
import { Breadcrumb } from 'app/components'
import DeleteItem from '../Components/DeleteItem'

const TabDeBordAuteurs = () => {
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [open, setOpen] = React.useState(false)
    const [page, setPage] = React.useState(0)
    const [authors, setAuthors] = useState([])
    const [modalDef, setModalDef] = useState([])
    const history = useHistory();
    let {user} = useAuth()

    function redirectToModify(def) {
        console.log("HEEEEEEEEEEEE",def)
        localStorage.setItem('modifyAuthor',def.nom);
        let queryString = "nom=" + def.nom;
        history.push(`/modifier-un-auteur-write/?${queryString}`);
    }

    function handleClickOpen(def) {
        setModalDef(def)
        setOpen(true)
    }  

    function handleClose(){
        setOpen(false)
    }

    React.useEffect(() => {
        axios.get('http://13.36.215.163:8000/api/administration/auteur/' , {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }})
        .then(res => {
            console.log("DAAAAAAAAAATA",res.data)
            setAuthors(res.data)
        })
    }, [page])
    console.log(page)

    const handleChangePage = (event, newPage) => {
        setPage(event)
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
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
            .then(res=> res.status == 200 ? window.location.reload() : alert("server Problem") )
    }
    const columns = [
        {
            name: "action",
            label: "Type",
            options: {
             filter: true,
             sort: true,
             customBodyRender: (value, tableMeta, updateValue) => {
                return (
                    <>
                  {value ? (
                      value == 'Creation' ? (
                          <small className="border-radius-4 bg-green text-white px-2 py-2px">
                              Création 
                          </small>
                      ) : (
                          <small className="border-radius-4 bg-secondary text-white px-2 py-2px">
                              Modification 
                          </small>
                      )
                  ) : (null)}
                  </>
                )
            }
            }
        },
        {
         name: "nom",
         label: "Nom",
         options: {
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
                <div dangerouslySetInnerHTML={{__html: value}} style={{margin: 0}}>
                </div>
            )}
         }
        },
        {
         name: "prenom",
         label: "Prénom",
         options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
                <div dangerouslySetInnerHTML={{__html: value}} style={{margin: 0}}>
                </div>
            )}
         }
        },
        {
         name: 'naissance',
         label: "Date de naissance",
         options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
                <div dangerouslySetInnerHTML={{__html: value}} style={{margin: 0}}>
                </div>
            )}
         }
        },
        {
         name: "deces",
         label: "Date de décès",
         options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
                <div dangerouslySetInnerHTML={{__html: value}} style={{margin: 0}}>
                </div>
            )}
         }
        },
                {
         name: "status",
         label: "Statut",
         options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
              return (
                  <>
                {value ? (
                    value== 'soumis' ? (
                        <small className="border-radius-4 bg-green text-white px-2 py-2px">
                            {value}
                        </small>
                    ) : (
                        <small className="border-radius-4 bg-secondary text-white px-2 py-2px">
                            {value}
                        </small>
                    )
                ) : (
                    <small className="border-radius-4 bg-error text-white px-2 py-2px">
                        {value}
                    </small>
                )}
                </>
              )
          }
         }
        },
        {
         name: "action",
         label: "Action",
         options: {
          customBodyRenderLite: (dataIndex) => {
            return ( 
                <>
                <IconButton onClick={() => redirectToModify(authors.results[dataIndex])}>
                <Icon>edit</Icon>
            </IconButton>
            <IconButton>
                <Icon color="error" onClick = {()=> handleClickOpen(authors.results[dataIndex])}>close</Icon>
            </IconButton>
            <IconButton onClick={()=>ValidateWord(authors.results[dataIndex])}>
                <Icon className='hover-bg-green'>done</Icon>
            </IconButton>
            </>
            )
          }
         }
        },
        
       ];

       const options = {
            count: authors.count,
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
                    noMatch: 'Aucun auteur trouvé.'
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
                    title={"Liste des auteurs"}
                    data={authors.results && authors.results}
                    columns={columns}
                    options={options}
                />
            <DeleteItem 
                open = {open}
                handleClose={()=>handleClose()}
                item={modalDef}
                message="Confirmez-vous la suppression de l'auteur:"
                url='http://13.36.215.163:8000/api/administration/auteur/'
            />
        </>
    )
}

export default TabDeBordAuteurs
