import * as express from 'express';
import UsersController from './components/users/users.controller';

export function usersRoutes(app:express.Application):void { 
   new UsersController(app); 
}