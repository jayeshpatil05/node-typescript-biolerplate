import { config as configDotenv } from 'dotenv';
import { url } from 'inspector';
import { resolve } from 'path';
const  { default: axios }  = require('axios');
const BASE_URL =  configDotenv().parsed.BASE_URL + "/api/users";
export default class User {
  constructor() {}

	 GetUsersList():any {
		return new Promise((resolve,reject) =>{
			axios.get(BASE_URL + "/list").then((resp) => {
				resolve(resp.data);
			}).catch((err) => {
				reject(err);
			})
		});
	}

	async CreateUser(data) {
		const resp = await this.CallHttpRequests(data,"/create").then((result) => {
			return result;
		}).catch((err) => {
			return err;
		})
		return resp;
	}

	
	async updateUser(data) {
		const resp = await this.CallHttpRequests(data,"/update").then((result) => {
			return result;
		}).catch((err) => {
			return err;
		})
		return resp;
	}

	async deleteUser(data) {
		const resp = await this.CallHttpRequests(data,"/delete").then((result) => {
			return result;
		}).catch((err) => {
			return err;
		})
		return resp;
	}

	CallHttpRequests(data, methodUrl) {
		const url  = BASE_URL + methodUrl;
		return new Promise((resolve,reject) =>{
			axios.post(url,data).then((resp) => {
				resolve(resp.data);
			}).catch((err) => {
				reject(err);
			})
		});
	}
}