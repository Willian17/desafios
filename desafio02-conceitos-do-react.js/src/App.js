import React from 'react'
import './App.css'

import Form from './components/Form'
import ListRepositories from './components/ListRepositories'
export default function App() {
    return (
        <div className="app">
            <h1 className="title">Repositórios</h1>
            <div className="content">
                <Form />
                <ListRepositories className="item" />
            </div>
        </div>
    )
}