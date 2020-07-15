import React , {useState , useEffect} from 'react'
import RepositoryItem from './RepositoryItem'
import api from '../services/api'


export default function ListRepositories(){
    const [repositories , setRepositories] = useState([])
    useEffect(()=>{
        api.get('repositories').then(response => {
            setRepositories(response.data)
            console.log(response.data)
        })
    } , [])
    return (
       <ul>
          {repositories.map(repository => <RepositoryItem key={repository.id} repository={repository}/>)}
       </ul>
    )
}