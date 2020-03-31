import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'

import api from '../../services/api'

import './style.css'

import logoImg from '../../assets/logo.svg'


export default function Register(){

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')


    const history = useHistory();
    
    async function handleRegister(e){//e = evento de submit do formulario
        
        e.preventDefault()//previne que o formulario recarege a pagina

        const data = { 

            name,
            email,
            whatsapp,
            city,
            uf,

        }

        try{
            const res = await api.post('ongs', data) //acessa a rota'/ongs' pelo metodo post, mandando os dados de cadastro em JSON, que será usado pelo backend

            alert(`Seu id de acesso ${res.data.id}`)//retorna o id, esse id retorna do metodo OngContoller.create do backend, ele é criado pelo metodo antes de inserir a query no banco

            history.push('/')

        }catch(err){

            alert('erro no cadastro tente novamente')

        }

       
    }

    return(

        <div className="register-container">

            <div className="content">

                <section>

                    <img src={logoImg} alt="Be the hero"/>

                    <h1>Cadastro</h1>

                    <p>Faça seu cadastro, entra na plataforma e ajude pessoas a encontrarem os casos da sua ONG</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041" />    
                        Ja tenho cadastro
                    </Link>


                </section>

                <form onSubmit={handleRegister}>

                    <input type="text"
                           placeholder="Nome da ONG"
                           value={name}
                           onChange={e => setName(e.target.value)}
                    />

                    <input type="email"
                           placeholder="E-mail"
                           value={email}
                           onChange={e => setEmail(e.target.value)}
                    />

                    <input type="text"
                           placeholder="Whatsapp"
                           value={whatsapp}
                           onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">

                        <input type="text"
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />

                        <input type="text"
                            placeholder="UF"
                            style={{width: 80}}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />  

                        
                    </div>
                        
                    <button className="button" type="submit">Cadastrar</button>


                </form>

            </div>

        </div>

    )
    

}