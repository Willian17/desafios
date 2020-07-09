const request = require('supertest')
const app = require('../app')

describe("Likes" , ()=>{
    it("should be able to give a like to the repository" , async ()=> {
        const repository = await request(app)
        .post('/repositories')
        .send({
            url: "https://github.com/Willian17/crud",
            title: "crud",
            techs: ["Node.js", "Express", "TypeScript"]
        })

        let response = await request(app)
        .post(`/repositories/${repository.body.id}/like`)

        expect(response.body.likes).toEqual(1)

        response = await request(app)
        .post(`/repositories/${repository.body.id}/like`)

        expect(response.body.likes).toEqual(2)
    })

    it("should not be able to give like a repository that does not exists" , async ()=>{
        await request(app).post('/repositories/123/like')
        .then(response => {
            expect(response.clientError).toBe(true)
            expect(response.body.error).toBe('Invalid ID')
        })
    })


})