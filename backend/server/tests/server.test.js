var {Users} = require('./../users')
var users = Users.credentials

const request = require('supertest')

const {app} = require('./../server')

describe('Authentication POST /login', () => {
    it('should return 400 for empty user', (done) => {
        let credentials = {userName:'', userPass:'whatever'}
        request(app)
            .post('/login')
            .send(credentials)
            .expect(400)
            .end(done)
    })
    it('should return 400 for empty password', (done) => {
        let credentials = {userName:'user', userPass:''}
        request(app)
            .post('/login')
            .send(credentials)
            .expect(400)
            .end(done)
    })
    it('should return 403 for bad credentials', (done) => {
        let credentials = {userName:'notexisting', userPass:'any'}
        request(app)
            .post('/login')
            .send(credentials)
            .expect(403)
            .end(done)
    })
    it('should properly authenticate non-admin user', (done) => {
        var nonAdminUser = users.find((item) => {
            return item.role === 'user'
        })

        if (nonAdminUser) {
            var credentials = {userName: nonAdminUser.userName, userPass: nonAdminUser.userPass}
        }
        
        request(app)
            .post('/login')
            .send(credentials)
            .expect(200)
            .expect(function(res) {
                res.body.status = 'OK';
                res.body.role = 'user';
                res.body.token = nonAdminUser.token;
              })
            .end(done)
    })
    it('should properly authenticate admin user', (done) => {
        var adminUser = users.find((item) => {
            return item.role === 'admin'
        })

        if (adminUser) {
            var credentials = {userName: adminUser.userName, userPass: adminUser.userPass}
        }
        
        request(app)
            .post('/login')
            .send(credentials)
            .expect(200)
            .expect(function(res) {
                res.body.status = 'OK';
                res.body.role = 'user';
                res.body.token = adminUser.token;
              })
            .end(done)
    })
})

describe('Authorization for GET /sensitive-data', () => {
    it('should return 400 for no token', (done) => {
        request(app)
        .get('/sensitive-data')
        .expect(400)
        .end(done)
    })
    it('should return 403 for non-admin user', (done) => {
        var nonAdminUser = users.find((item) => {
            return item.role === 'user'
        })

        if (nonAdminUser) {
            var credentials = {userName: nonAdminUser.userName, userPass: nonAdminUser.userPass}
        }

        request(app)
        .get('/sensitive-data')
        .set('x-auth', nonAdminUser.token)
        .expect(403)
        .expect(function(res) {
            res.body.data = '';
          })
        .end(done)
    })
    it('should return data for admin', (done) => {
        var adminUser = users.find((item) => {
            return item.role === 'admin'
        })

        if (adminUser) {
            var credentials = {userName: adminUser.userName, userPass: adminUser.userPass}
        }

        request(app)
        .get('/sensitive-data')
        .set('x-auth', adminUser.token)
        .expect(200)
        .expect(function(res) {
            res.body.data != '';
          })
        .end(done)
    })
})



