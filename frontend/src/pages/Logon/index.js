import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {FiLogIn} from 'react-icons/fi'

import api from '../../services/api' 

import './styles.css'

import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'



export default function Logon(){

    //declaraoes

    const [id, setId] = useState('')

    const history = useHistory()

    //funçoes

    async function handleLogin(e){

        e.preventDefault()

        try{

            const res = await api.post('sessions', {id})
            
            //console.log(res.data.name)//nome da ong que retornara da query do metodo SessionController.create do backend
            
            localStorage.setItem('ongId', id)//salva no storage do navegador
            localStorage.setItem('ongName', res.data.name)

            

            history.push('/profile')



        }
        catch(err){
            alert("Falha no Login. Veja se digitou o ID corretamente")

        }




    }

    //conteudo

    return(

        <div className="logon-container">

            <section className="form">

                <img src={logoImg} alt="Be the hero"/>


                <form onSubmit={handleLogin}>

                    <h1>Faça seu Logon</h1>

                    <input 
                        type="text"
                        placeholder="Sua id"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />

                    <button className="button" type="submit"> ENTRAR </button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041" />    
                        Não tenho cadastro
                    </Link>

                </form>

            </section>


            <img src={heroesImg} alt="Heroes"/>


        </div>

    )

}