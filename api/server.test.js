const request = require('supertest');
const server = require('./server.js');
const db = require('../database/dbConfig.js');

let token = null;

describe('server', function () {
    it('should run the tests', function () {
        expect(true).toBe(true);
    })
})

describe('/api/login', function () {

    beforeEach(async () => {
        await db('users').truncate();
        await db('items').truncate();
        await request(server)
            .post('/api/register')
            .send({
                "username": "usertest",
                "password": "testpw",
                "firstName": "jest",
                "lastName": "tester"
            })
    })

    it('should respond with status 200', function () {
        return request(server)
            .post('/api/login')
            .send({
                'username': 'usertest',
                'password': 'testpw'
            })
            .then(res => {
                expect(res.status).toBe(200)
            })
    })

    it('should respond with message welcome to our api', function () {
        return request(server)
            .post('/api/login')
            .send({
                'username': 'usertest',
                'password': 'testpw'
            })
            .then(res => {
                expect(res.body.message).toBe("Welcome to our API")
            })
    })

    it('should respond with status 400', function () {
        return request(server)
            .post('/api/login')
            .send({
                'username': 'usertest'
            })
            .then(res => {
                expect(res.status).toBe(400)
            })
    })

    it('should respond with message invalid credentials', function () {
        return request(server)
            .post('/api/login')
            .send({
                'username': 'usertest',
                'password': 'testpw123'
            })
            .then(res => {
                expect(res.body.message).toBe("Invalid credentials")
            })
    })
})

describe('/api/register', function () {

    beforeEach(async () => {
        await db("users").truncate();
    })

    it('should respond with status 400', function () {
        return request(server)
            .post('/api/register')
            .send({
                "username": "jesttest"
            })
            .then(res => {
                expect(res.status).toBe(400);
            })
    })

    it('should respond with an err', function () {
        return request(server)
            .post('/api/register')
            .send({
                "username": "jesttest"
            })
            .then(res => {
                token = res.body.token;
                expect(res.body.message).toBe("please provide username and password and the password shoud be alphanumeric")
            })
    })

    it('should respond with status 201', function () {
        return request(server)
            .post('/api/register')
            .send({
                "username": "jesttest",
                "password": "testpw",
                "firstName": "jest",
                "lastName": "tester"
            })
            .then(res => {
                expect(res.status).toBe(201);
            })
    })

    it('should respond with a username', function () {
        return request(server)
            .post('/api/register')
            .send({
                "username": "jesttest12345",
                "password": "testpw",
                "firstName": "jest",
                "lastName": "tester"
            })
            .then(res => {
                token = res.body.token;
                expect(token).toEqual(expect.anything());
            })
    })
})

describe('/api/users', function () {

    it('should respond with status 200', function () {
        return request(server)
            .get('/api/users')
            .set('token', token)
            .then(res => {
                expect(res.status).toBe(200);
            })
    })

    it('should respond with an array', function () {
        return request(server)
            .get('/api/users')
            .set('token', token)
            .then(res => {
                expect(Array.isArray(res.body)).toBe(true);
            })
    })

    it('should respond with status 401', function () {
        return request(server)
            .get('/api/users')
            .then(res => {
                expect(res.status).toBe(401);
            })
    })

    it('should respond with antientication', function () {
        return request(server)
            .get('/api/users')
            .then(res => {
                expect(res.body.you).toBe("shall not pass!");
            })
    })
})

describe('/api/users/:id', function () {

    beforeEach(async () => {
        await request(server)
            .post('/api/register')
            .send({
                "username": "usertest",
                "password": "testpw",
                "firstName": "jest",
                "lastName": "tester"
            })
    })

    it('GET should respond with status 200', function () {
        return request(server)
            .get(`/api/users/1`)
            .set('token', token)
            .then(res => {
                expect(res.status).toBe(200);
            })
    })
    it('GET should return user information', function () {
        return request(server)
            .get(`/api/users/1`)
            .set('token', token)
            .then(res => {
                expect(res.body.username).toBe('jesttest12345');
            })
    })

    it('POST should respond with 201', function () {
        return request(server)
            .post(`/api/users/1`)
            .set('token', token)
            .send({
                "name": "Samsung Galaxy S10",
                "description": "phone things",
                "condition": "like new",
                "price": 30,
                "period": 4
            })
            .then(res => {
                expect(res.status).toBe(201);
            })
    })
    it('POST should return new item information', function () {
        return request(server)
            .post(`/api/users/1`)
            .set('token', token)
            .send({
                "name": "Nintendo Switch",
                "description": "Animal Crossing Edition",
                "condition": "Open Box",
                "price": 25,
                "period": 6
            })
            .then(res => {
                expect(res.body.name).toBe('Nintendo Switch');
            })
    })

    it('PUT should respond with status 200', function () {
        return request(server)
            .put('/api/users/1')
            .set('token', token)
            .send({
                'firstName': "simon"
            })
            .then(res => {
                expect(res.status).toBe(200);
            })
    })
    it('PUT should return changed item', function () {
        return request(server)
            .put('/api/users/1')
            .set('token', token)
            .send({
                'firstName': 'simon'
            })
            .then(res => {
                expect(res.body.firstName).toBe('simon');
            })
    })

    it('DELETE should respond with status 200 and return removed item', function () {
        return request(server)
            .delete('/api/users/2')
            .set('token', token)
            .then(res => {
                expect(res.status).toBe(200)
                expect(res.body.remove.username).toBe('usertest');
            })
    })
})

describe('/api/users/:id/owned', function () {
    it('should respond with status 200', function () {
        return request(server)
            .get('/api/users/1/owned')
            .set('token', token)
            .then(res => {
                expect(res.status).toBe(200);
            })
    })

    it('should respond with an array', function () {
        return request(server)
            .get('/api/users/1/owned')
            .set('token', token)
            .then(res => {
                expect(Array.isArray(res.body)).toBe(true);
            })
    })
})

describe('/api/users/:id/rented', function () {
    it('should respond with status 200', function () {
        return request(server)
            .get('/api/users/1/rented')
            .set('token', token)
            .then(res => {
                expect(res.status).toBe(200);
            })
    })

    it('should respond with an array', function () {
        return request(server)
            .get('/api/users/1/rented')
            .set('token', token)
            .then(res => {
                expect(Array.isArray(res.body)).toBe(true);
            })
    })
})

describe('/api/items', function () {
    it('should respond with status 200', function () {
        return request(server)
            .get('/api/items')
            .set('token', token)
            .then(res => {
                expect(res.status).toBe(200);
            })
    })

    it('should respond with an array', function () {
        return request(server)
            .get('/api/items')
            .set('token', token)
            .then(res => {
                expect(Array.isArray(res.body)).toBe(true);
            })
    })
})

describe('/api/items/:id', function () {
    it('GET should respond with status 200', function () {
        return request(server)
            .get('/api/items/1')
            .set('token', token)
            .then(res => {
                expect(res.status).toBe(200);
            })
    })
    it('GET should respond with an item', function () {
        return request(server)
            .get('/api/items/1')
            .set('token', token)
            .then(res => {
                expect(res.body.name).toBe('Samsung Galaxy S10');
            })
    })

    it('PUT should respond with status 200 and return changed item', function () {
        return request(server)
            .put('/api/items/1')
            .set('token', token)
            .send({
                "name": "Samsung Galaxy S10 Plus"
            })
            .then(res => {
                expect(res.status).toBe(200);
                expect(res.body.name).toBe('Samsung Galaxy S10 Plus')
            })
    })

    it('DELETE should respond with status 200 and return removed item', function () {
        return request(server)
            .delete('/api/items/2')
            .set('token', token)
            .then(res => {
                expect(res.status).toBe(200);
                expect(res.body.remove.name).toBe('Nintendo Switch')
            })
    })
})

describe('/api/random', function () {
    it('GET should respond with status 200', function () {
        return request(server)
            .get('/api/random')
            .then(res => {
                expect(res.status).toBe(200);
            })
    })
    it('GET should return the item of the day', function () {
        return request(server)
            .get('/api/random')
            .then(res => {
                expect(res.body.name).toBeDefined();
            })
    })
})