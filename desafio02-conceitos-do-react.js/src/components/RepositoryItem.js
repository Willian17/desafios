import React from 'react'
import './repository.css'

export default function RepositoryItem({ repository }) {
    return (
        <div className="repository-item">
            <li key={repository.id}>
                <h1 className="repositoryTitle">{repository.title}</h1>
                <span className="techs">{repository.techs}</span>
                <span className="likes">{repository.likes} likes</span>
                 <button className="openButton"><a href={repository.url}> Abrir </a> </button>
            </li>

        </div>
    )
}
