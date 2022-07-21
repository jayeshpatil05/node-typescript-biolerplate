import { Application, NextFunction, Request, Response } from 'express';
import { User, UserDocument, AuthToken } from "../../models/User";
import BaseApi from "../BaseApi";

export default class UsersController extends BaseApi {
	public user(express: Application): void {
		express.use('/api/users', this.router);
		this.router.post("/create",this.CreateUser);
		this.router.get("/list",this.GetUsersList);
		this.router.post("/update",this.UpdateUser);
		this.router.post("/delete",this.DeleteUser);
	}

	constructor(express: Application) {
		super();
		this.user(express);
	}

	public CreateUser(req: Request, res: Response, next: NextFunction): void {
		const user = new User({
			email: req.body.email,
			name:req.body.name,
			password:req.body.password ? req.body.password:'12345' 
		});

		User.insertMany(user).then((result) => {
		  return res.send({success:true,message:"User created Successfully",data:result});
		}).catch((err) => {
			return res.send({success:false,message:"Error in User create",data:err});
		});
	}

	public GetUsersList = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
		User.find({},(err,result) => {
			if(err){
				const resp = { success:false, message:"Error in User list", data:err }
				return res.send(resp);
			} else {
				const resp = {success:true, message:"Gets a users list",data:result };
				return res.send(resp);
			}
		});
	};

	public UpdateUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
		const user = req.body;
		User.findByIdAndUpdate({_id:user._id},{$set:user}).then((result) => {
		  return res.send({success:true,message:"User udpated Successfully",data:result});
		}).catch((err) => {
			return res.send({success:false,message:"Error in User create",data:err});
		})
	};

	public DeleteUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
		const user = req.body;
		User.findByIdAndRemove({_id:user._id}).then((result) => {
		  return res.send({success:true,message:"User deleted Successfully",data:result});
		}).catch((err) => {
			return res.send({success:false,message:"Error in User create",data:err});
		})
	};
}