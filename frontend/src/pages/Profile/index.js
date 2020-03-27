import React, {useState, useEffect} from'react'
import {Link, useHistory} from 'react-router-dom'
import {FiPower, FiTrash2} from 'react-icons/fi'

import api from '../../services/api'


import './style.css'

import logoImg from '../../assets/logo.svg'


export default function Profile(){

    const [incidents, setIncidents] = useState([])//vai retornar um array de resultados
    
    const history = useHistory()

    const ongName = localStorage.getItem('ongName')
    const ongId = localStorage.getItem('ongId')

    
    
    

    //pegando o nome no storge, colocado la na hora do login
    
    useEffect(() => {//vai executar a funçao de listagem de casos
        api.get('/profile', {//vai executar a rota /profile por GET
            headers: {//colocando o id da ong no header da pagina, meio que o backend usa para procurar os casos de uma ong
                Authorization: ongId, //nome desse header
            }
        }).then(res => {//usando o .then()
            setIncidents(res.data)//colocando o reultado da  query no incidents, pelo useState()
        })

    }, [ongId])//toda vez que o id da ong mudar, como ele nao muda a nao ser que troque de user, mudara só uma vez

    async function handleDeleteIncident(id){

        try{

            await api.delete(`incidents/${id}`, { 
                headers: {
                    Authorization: ongId,
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))
            //vai remover da page os casos que sao deletados, vai manter todos os casos tiverem o id diferente do id do caso deletado
        }
        catch(err){
            alert('erro ao deletar')
        }

    }


    function handleLogout(){

        localStorage.clear()

        history.push('/')
        


    }


    return(

        <div className="profile-container">

            <header>

                <img src={logoImg} alt="Be the Hero"/>

                <span>Bem vinda, {ongName}</span>



                <Link className="button" to="/incidents/new">
                    Cadastrar novo caso
                </Link>

                <button onClick={handleLogout}
                        type="button"> 
                    <FiPower size={18} color="#e02041"/> 
                </button>

            </header>

            <h1>Casos Cadastrados</h1>

            <div className="list">
                <ul>
                    
                    {incidents.map(incident => (

                        <li key={incident.id}>
                            <p className="title">Caso:</p>
                            <p>{incident.title}</p>

                            <p className="title">Descriçao</p>
                            <p>{incident.description}</p>

                            <p className="title">Valor:</p>
                            <p>{Intl.NumberFormat('pr-BR', {   style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                            <button onClick={() => handleDeleteIncident(incident.id)}//quando passar uma func em
                                    type="button"
                                    
                            >
                                    <FiTrash2 size={20} color="#a8a8b3"/>
                            </button>
                        </li>

                    ))}

                </ul>
            
                
            </div>
        </div>

    )


}