import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'

import api from '../../services/api'

import './style.css'

import logoImg from '../../assets/logo.svg'

export default function NewIncident(){

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')

    const history = useHistory()

    const ongId = localStorage.getItem('ongId')


    async function handleCrateIncident(e){

        e.preventDefault()

        const data = {

            title,
            description,
            value,

        }

        try{
            api.post('/incidents', data, {
                headers:{

                Authorization: ongId

                }

            })

            history.push("/Profile")

        }
        catch(err){
            alert("Erro ao cadastrar caso")

        }

        


    } 

    return(

        <div className="newIncident-container">

        <div className="content">

            <section>

                <img src={logoImg} alt="Be the hero"/>

                <h1>Cadastrar novo caso</h1>

                <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso</p>

                <Link className="back-link" to="/Profile">
                    <FiArrowLeft size={16} color="#e02041" />    
                    Voltar para home
                </Link>


            </section>

            <form onSubmit={handleCrateIncident}>

                <input type="text"
                       placeholder="Titulo do cado"
                       value={title}
                       onChange={e => setTitle(e.target.value) }

                />

                <textarea
                       placeholder="Descrição"
                       value={description}
                       onChange={e => setDescription(e.target.value)}
                       
                />

                <input type="text"
                       placeholder="Valor em reais"
                       value={value}
                       onChange={e => setValue(e.target.value)}
                       
                />

               
                    
                <button className="button" type="submit">Cadastrar</button>


            </form>

        </div>

    </div>

        

    )


}