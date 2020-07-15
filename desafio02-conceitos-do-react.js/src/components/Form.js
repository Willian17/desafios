import React , {useState} from 'react'
import './Form.css'
import api from '../services/api'

export default function Form() {
    const [title , setTitle] = useState('')
    const [techs , setTechs] = useState('')
    const [url , setUrl] = useState('')

    function handleChangeTitle(e){
     const title =  e.target.value
     setTitle(title)
    }
    function handleChangeTechs(e){
        const techs =  e.target.value
        setTechs(techs)
    }
    function handleChangeUrl(e){
        const Url =  e.target.value
        setUrl(Url)
    }

   async function handleAddRepository(){
       await   api.post("repositories" , {
            title,
            techs,
            url
        })
    }
    return (
        <form className="form">
            <input type="text" onChange={handleChangeTitle} placeholder="title"/>
            <input type="text" onChange={handleChangeTechs} placeholder="tecnologias"/>
            <input type="url" onChange={handleChangeUrl} placeholder="url"/>
            <button type="submit" onClick={handleAddRepository} >Adicionar</button>
        </form>
    )
}