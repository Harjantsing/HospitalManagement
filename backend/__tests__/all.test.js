const request = require("supertest");
const {app} = require('../index');
const payload = {
    email: 'temp@email.com',
    password: '123456789',
};

function delay(time){
    return new Promise(function(resolve){
        setTimeout(()=>{
            resolve();
        },time);
    });
}

beforeAll(async () => {
    await request(app)
    process.env.NODE_ENV = 'test';
    await delay(4000);
});

jest.setTimeout(10000);
jest.retryTimes(3);

describe('Route /api/users', () => {
    describe('POST /api/users/login', () => {
        test('should return authorization token', () => {
            const user = payload;

           const response =   request(app)
                .post('/routes/userRoutes/login')
                .send(user)
                .expect(200)
                .expect(res => {
                    expect(res.body.success).toBeTruthy();
                    expect(res.body.token).toBeTruthy();
                })
                console.log("response.body.token: ", response);
        });
        test('should return 404 if user not found',  () => {
            const user = {
                email: 'does_not_exists@gmail.com',
                password: 'password'
            };

             request(app)
                .post('/routes/userRoutes/login')
                .send(user)
                .expect(404)
        });
    })

    describe('POST /api/users/register', () => {
        test('should not register the user if already exist', () => {
            const user = {
                email: 'mp.pathela@gmail.virginmojito',
                password: 'password',
                password2: 'password',
                name: 'Mayank'
            };

            request(app)
                .post('/routes/userRoutes/register')
                .send(user)
                .expect(400)
                .expect(res => {
                    expect(res.body.name).toBeFalsy();
                })
        });
    });
});
