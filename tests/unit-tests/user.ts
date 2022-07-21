import { config as configDotenv } from 'dotenv';
import 'mocha';
import nock from 'nock';
import User from './contoller/user';

const chai = require('chai'),
chaiHttp = require('chai-http');
chai.use(chaiHttp);
let expect = require('chai').expect;

const EnableNock = configDotenv().parsed.NOCK;
const userClass =  new User();

// Response Details
import  GetUsersListResponse from '../mockResponses/GetUsersListResponse';
import CreateUserResponse from '../mockResponses/CreateUserResponse';
import UpdateUserResponse from '../mockResponses/UpdateUserResponse';
import DeleteUserResponse from '../mockResponses/DeleteUserResponse';

let DeleteId = '';
const CreateUserData = {
	"name":"Abhishek singh",
	"email":"abhishek22@gmail.com",
	"password":"12345678"
}

let UpdateUserData = {
	"_id":"62d7a1c0808cb6f538b93e69",
	"name":"Jayesh test",
	"email":"test@gmail.com",
	"password":"123456"
}

const BASE_URL = configDotenv().parsed.BASE_URL;
describe('Users Module', () => {
	
	/**
	* Test cases for Gets Users List
	*/
	it('Gets a users list',(done) => {
		if(EnableNock === "true") {
			nock(BASE_URL)
			.get("/api/users/list")
			.reply(200,GetUsersListResponse)
		}

		userClass.GetUsersList().then((resp) => {
			expect(resp).to.not.equal(null);
			expect(resp.success).to.be.equal(true);
			expect(resp.message).to.equal("Gets a users list");
			done();
		}).catch((err) => {
			console.log(err, '--- Error 49');
		})
	});
	
	/**
	* Creates a Users
	*/
	it('Creates a user', (done) => {
		if(EnableNock === "true") {
			nock(BASE_URL)
			.post('/api/users/create')
			.reply(200,CreateUserResponse(CreateUserData, 20))
		}
	
		userClass.CreateUser(CreateUserData).then((resp:any) => {
			expect(resp).to.not.equal(null);
			expect(resp.success).to.be.equal(true);
			expect(resp.message).to.equal("User created Successfully");
			UpdateUserData._id =  resp.data[0]._id;
			done();
		}).catch((err) => {
			console.log(err, '--- Error 49');
		})
	});

	/**
	 * Updates a user
	 */
	it('Updates a user', (done) => {
		if(EnableNock === "true") {
			nock(BASE_URL)
			.post('/api/users/update')
			.reply(200,UpdateUserResponse(UpdateUserData))
		}

		userClass.updateUser(UpdateUserData).then((resp:any) => {
			expect(resp).to.not.equal(null);
			expect(resp.success).to.be.equal(true);
			expect(resp.message).to.equal("User udpated Successfully");
			done();
		}).catch((err) => {
			console.log(err, '--- Error 95');
		})
	});
	/**
	 * Deletes a user
	 */
	it('Deletes a user', (done) => {
		if(EnableNock === "true") {
			nock(BASE_URL)
			.post('/api/users/delete')
			.reply(200,DeleteUserResponse(UpdateUserData._id))
		}
		userClass.deleteUser({_id:UpdateUserData._id}).then((resp:any) => {
			expect(resp).to.not.equal(null);
			expect(resp.success).to.be.equal(true);
			expect(resp.message).to.equal("User deleted Successfully");
			done();
		}).catch((err) => {
			console.log(err, '--- Error 114');
		})
	});
});
