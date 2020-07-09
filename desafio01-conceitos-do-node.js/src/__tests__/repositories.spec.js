const request = require('supertest')
const app = require('../app')
const {isUuid} = require('uuidv4')

describe("Repositories" , ()=> {
    it("should be able to create a new repository" , async ()=>{
        const response = await request(app)
        .post('/repositories')
        .send({
            url: "https://github.com/Willian17/rich-text",
            title: "Rich-Text",
            techs: ["Node", "Express", "TypeScript"]
        })

        expect(isUuid(response.body.id)).toBe(true)

        expect(response.body).toMatchObject({
            url: "https://github.com/Willian17/rich-text",
            title: "Rich-Text",
            techs: ["Node", "Express", "TypeScript"],
            likes: 0
        })
    })

    it("should be able to list the repositories" , async () =>{
        const repository = await request(app)
        .post('/repositories')
        .send({
            url: "https://github.com/Willian17/crud",
            title: "crud",
            techs: ["Node.js", "Express", "TypeScript"]
        })

        const response = await request(app).get('/repositories')

        expect(response.body).toEqual(
            expect.arrayContaining([
                {
                    id: repository.body.id,
                    url: "https://github.com/Willian17/crud",
                    title: "crud",
                    techs: ["Node.js", "Express", "TypeScript"],
                    likes: 0
                }
            ])
        )
    })

    it("should be able to update the repository" , async ()=>{
        const repository = await request(app)
        .post('/repositories')
        .send({
            url: "https://github.com/Willian17/crud",
            title: "crud",
            techs: ["Node.js", "Express", "TypeScript"]
        })

        const response = await request(app)
        .put(`/repositories/${repository.body.id}`)
        .send({
            url: "https://github.com/Willian17/crud-node",
            title: "crud em node",
            techs: ["Node.js", "Express", "Jest"]
        })
        expect(isUuid(response.body.id)).toBe(true)

        expect(response.body).toMatchObject({
            url: "https://github.com/Willian17/crud-node",
            title: "crud em node",
            techs: ["Node.js", "Express", "Jest"]
        })
    })

    it("should not be able  to update a repository that does not exist" , async ()=>{
      const response =  await request(app).put('/repositories/123')

      expect(response.body.error).toBe("Invalid ID")
      expect(response.status).toBe(400)
    })

    it("should not be able to update repository likes manually" , async ()=> {
        const repository = await request(app)
        .post('/repositories')
        .send({
            url: "https://github.com/Willian17/crud",
            title: "crud",
            techs: ["Node.js", "Express", "TypeScript"]
        })

        const response = await request(app)
        .put(`/repositories/${repository.body.id}`)
        .send({
          likes: 15
        })

        expect(response.body.likes).toBe(0)

    })

    it("should be able to delete the repository" , async ()=>{
        const response = await request(app)
        .post('/repositories')
        .send({
            url: "https://github.com/Willian17/crud",
            title: "crud",
            techs: ["Node.js", "Express", "TypeScript"]
        })

        await request(app).delete(`/repositories/${response.body.id}`)

        const repositories = await request(app).get('/repositories')

        const repository = repositories.body.find((repository) => repository.id === response.body.id)

        expect(repository).toBe(undefined)
    })

    it("should not be able to delete the repository that does not exist" , async ()=>{
        await request(app).delete('/repositories/40b48af9-5935-4c49-8638-646a89efce37')
        .then(response => {
            expect(response.clientError).toBe(true)
            expect(response.body.error).toBe('repository not found')
        })
    })
})
