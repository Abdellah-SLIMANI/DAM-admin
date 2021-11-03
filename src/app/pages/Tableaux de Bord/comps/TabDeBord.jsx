import React ,{useState}from 'react'
import {IconButton,Icon, FormControlLabel, TextField, FormGroup, Chip, CircularProgress,Typography, TableCell, TableRow} from '@material-ui/core'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import useAuth from 'app/hooks/useAuth'
import MUIDataTable from "mui-datatables";
import DeleteItem from 'app/pages/Components/DeleteItem'
import { FormLabel } from 'react-bootstrap'

const TabDeBord = () => {
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [open, setOpen] = React.useState(false)
    const [page, setPage] = React.useState(0)
    const [definitions, setDefinitions] = useState([])
    const [modalDef, setModalDef] = useState([])
    const [action, setAction] = useState('')
    const [orderName, setOrderName] = useState('')
    const [orderDirection, setOrderDirection] = useState('')
    const [searchText, setSearchText] = useState('')
    const [loading, setLoading] = useState(false)
    const [typeFilter, setTypeFilter] = useState([])
    const [statusFilter, setStatusFilter] = useState([])
    const history = useHistory();
    let {user} = useAuth()

    function redirectToModify(def) {
        localStorage.setItem('modifyWord',def.id);
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
    
    React.useEffect(() => {
        setLoading(true)
        const urlWithSearch = 'http://13.36.215.163:8000/api/administration/article/?page='+page+'&titre='+searchText+'&type='+typeFilter.toString()+'&status='+statusFilter.toString()+'&page_size='+rowsPerPage+'&order_by='+orderDirection+'&order='+orderName 
        const urlWithoutSearch = 'http://13.36.215.163:8000/api/administration/article/?page='+page+'&type='+typeFilter.toString()+'&status='+statusFilter.toString()+'&page_size='+rowsPerPage+'&order_by='+orderDirection+'&order='+orderName
        axios.get(searchText == null ? urlWithoutSearch : urlWithSearch, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }})
        .then(res => {
            console.log(res.data)
            setDefinitions(res.data)
        }).finally(() => setLoading(false))
    }, [page,action,orderName,orderDirection,rowsPerPage,searchText,typeFilter,statusFilter])

    const handleChangePage = (event, newPage) => {
        setPage(event)
    }
    const handleChangeRowsPerPage = (event,newRPP) => {
        setRowsPerPage(event)
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
            name: "type",
            label: "Type",
            options: {
             filter: true,
             filterType: 'checkbox',
             filterOptions: ['Creation','Modification','Reprise'],
             sort: true,
             customBodyRender: (value) => {
                return (
                    <>
                  {
                      value == 'Creation' ? 
                          <small className="border-radius-4 bg-green text-white px-2 py-2px">
                              Création 
                          </small>
                       : value == 'Modification' ?
                          <small className="border-radius-4 bg-secondary text-white px-2 py-2px">
                              Modification 
                          </small>
                      
                    :   <small className="border-radius-4 bg-primary text-white px-2 py-2px">
                              Reprise 
                          </small>
                    }
                  </>
                )
            }
            }
        },
        {
         name: "titre",
         label: "Titre",
         options: {
        filter: false,
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
          filter: false,
          sort: true,
        //   customBodyRender: (value) => {
        //     return Array.isArray(value) ? value.map( (val, key) => {
        //         return <Chip label={val} key={key} />;
        //     }) : <>{value}</>;
        // }
         }
        },
        {
         name: `emetteur`,
         label: "Emetteur",
         options: {
          filter: false,
          sort: true,
         }
        },
        {
         name: "date_emission",
         label: "Date d'émission",
         options: {
          filter: false,
          sort: true,
         }
        },
                {
         name: "status",
         label: "Statut",
         options: {
            filter: true,
            filterType: 'checkbox',
            filterOptions: ['soumis','brouillon'],
            sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
              return (
                  <>
                {value ? (
                    value == 'soumis' ? (
                        <small className="border-radius-4 bg-green text-white px-2 py-2px">
                            {value}
                        </small>
                    ) : (
                        <small className="border-radius-4 bg-secondary text-white px-2 py-2px">
                            {value}
                        </small>
                    )
                ) : (
                    <small className="border-radius-4 bg-blue text-white px-2 py-2px">
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
          filter: false,
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
            filter: false,
            sort: false,
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
            rowsPerPage:rowsPerPage,
            onChangeRowsPerPage:handleChangeRowsPerPage,
            jumpToPage: true,
            serverSide: true,
            onTableChange: (action, tableState) => {
                console.log('onTableChange Action',action,'\nonTableChange state',tableState)
                switch (action) {
                    case 'sort':
                        setOrderName(tableState.sortOrder.name)
                        setOrderDirection(tableState.sortOrder.direction)
                        break;
                    case 'search':
                        setSearchText(tableState.searchText)
                        break;
                    case 'filterChange':    
                          setTypeFilter(tableState.filterList[0])
                          setStatusFilter(tableState.filterList[5])      
                    default:
                        break;
                }
            },
            onFilterChange: (changedColumn, filterList) => {
                console.log("FILTER VALUES",changedColumn, filterList);
              },
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
                    rowsPerPage: "Lignes",
                    jumpToPage: 'Page'
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
                    title={
                        <Typography variant="title" style={{display:'inline-flex'}}>
                          <h4>Liste des définitions</h4>{' '}
                          {loading && (
                            <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />
                          )}
                        </Typography>
                      }
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
