import React ,{useState}from 'react'
import {IconButton,Icon,} from '@material-ui/core'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import useAuth from 'app/hooks/useAuth'
import MUIDataTable from "mui-datatables";
import DeleteItem from 'app/pages/Components/DeleteItem'

const TabDeBord = () => {
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [open, setOpen] = React.useState(false)
    const [page, setPage] = React.useState(0)
    const [definitions, setDefinitions] = useState([])
    const [modalDef, setModalDef] = useState([])
    const history = useHistory();
    let {user} = useAuth()

    function redirectToModify(def) {
        localStorage.setItem('modifyWord',def.titre);
        let queryString = "titre=" + def.titre;
        history.push(`/modifier-une-definition-write/?${queryString}`);
    }

    function handleClickOpen(def) {
        setModalDef(def)
        setOpen(true)
    }  

    function handleClose(){
        setOpen(false)
    }

    const count = definitions.count

    React.useEffect(() => {
        axios.get('http://13.36.215.163:8000/api/administration/article/?page='+page , {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }})
        .then(res => {
            console.log(res.data)
            setDefinitions(res.data)
        })
    }, [count,page])

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
             customBodyRender: (value) => {
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
         name: "",
         label: "Titre",
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
         name: "code",
         label: "Code",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: `created_by.last_name`,
         label: "Emetteur",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "date",
         label: "Date d'émission",
         options: {
          filter: true,
          sort: true,
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
         name: 'edition',
         label: "Edition",
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
         name: "action",
         label: "Action",
         options: {
          customBodyRenderLite: (dataIndex) => {
            return ( 
                <>
                <IconButton onClick={() => redirectToModify(definitions.results[dataIndex])}>
                <Icon>edit</Icon>
            </IconButton>
            <IconButton>
                <Icon color="error" onClick = {()=> handleClickOpen(definitions.results[dataIndex])}>close</Icon>
            </IconButton>
            <IconButton onClick={()=>ValidateWord(definitions.results[dataIndex])}>
                <Icon className='hover-bg-green'>done</Icon>
            </IconButton>
            </>
            )
          }
         }
        },
        
       ];

       const options = {
            count: definitions.count,
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
                    title={"Liste des définitions"}
                    data={definitions.results && definitions.results.map(item => {
                        return [
                            item.action,
                            item.data.titre,
                            item.data.domaines,
                            item.created_by.last_name+ " " + item.created_by.first_name,
                            item.created_date,
                            item.status,
                            item.data.edition, 
                    ]
                    })}
                    columns={columns}
                    options={options}
                    />
                    <DeleteItem 
                        open = {open}
                        handleClose={()=>handleClose()}
                        item={modalDef}
                        message='Confirmez-vous la suppression de la définition:'
                        url='http://13.36.215.163:8000/api/administration/article/'
                    />
        </>
    )
}

export default TabDeBord
