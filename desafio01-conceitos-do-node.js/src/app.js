const express = require('express')
const cors = require('cors')
const { uuid , isUuid } = require('uuidv4')

const app = express()

app.use(cors())
app.use(express.json())

const repositories = []

function validadeRepositoryId(request , response , next){
    const {id} = request.params

    if(!isUuid(id)){
        return response.status(400).json({error:  'Invalid ID'})
    }
    return next()

}

app.post('/repositories', (request, response) => {
    const { url, title, techs } = request.body

    const repository = {
        id: uuid(),
        url,
        title,
        techs,
        likes: 0
    }
    repositories.push(repository)

    return response.json(repository)

})
app.get('/repositories', (request, response) => {
    return response.json(repositories)
})

app.use('/repositories/:id' , validadeRepositoryId)

app.put('/repositories/:id', (request, response) => {
    const { id } = request.params
    const { url, title, techs } = request.body

    const repositoryIndex = repositories.findIndex(repository => repository.id === id)
    if (repositoryIndex < 0) {
        return response.status(400).json({ message: 'repository not found' })
    }


    const repository = repositories[repositoryIndex]

    const updateRepository = {
        id,
        url,
        title,
        techs,
        likes: repository.likes
    }
    repositories[repositoryIndex] = updateRepository

    return response.json(repositories[repositoryIndex])
})
app.delete('/repositories/:id', (request, response) => {
    const {id} = request.params

    const repositoryIndex = repositories.findIndex(repository => repository.id === id)

    if(repositoryIndex < 0){
        return response.status(400).json({error: 'repository not found'})
    }

    repositories.splice(repositoryIndex , 1)

    return response.status(204).send()
})
app.post('/repositories/:id/like', (request, response) => {
    const {id} = request.params

    const repositoryIndex = repositories.findIndex(repository => repository.id === id)

    if(repositoryIndex < 0){
        return response.status(400).json({error: 'repository not found'})
    }
    repositories[repositoryIndex].likes++

    return response.json({likes:  repositories[repositoryIndex].likes })
})


module.exports = app