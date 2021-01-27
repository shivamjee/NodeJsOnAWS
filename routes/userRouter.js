var express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Users = require("../models/userModel.js");

var userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.route('/')
.get((req,res,next)=>{
	if(req.query.userName == null)
	{
		Users.find({})
		.then((userList)=>{
			if(userList.length == 0)
			{
				res.statusCode = 404;
				res.setHeader('Content-Type',"text/html");
				res.end('<html><body><h1> Error 404:</h1><br><p>'+'No Users Found'+'</p></body></html>');
			}
			else
			{
				res.statusCode = 200;
				res.setHeader('Content-Type','application/json');
				res.json(userList);
			}
		},(err)=> next(err))
		.catch((err)=>next(err));
	}
	else
	{
		Users.find({name: req.query.userName})
		.then((userList)=>{
			if(userList.length == 0)
			{
				Users.find({})
				.then((userList2)=>{
					var list = [];
					userList2.forEach((entry)=>{
						if(entry.location.address === req.query.userName)
						{list.push(entry);}
					});
					if(list.length == 0){
						res.statusCode = 404;
						res.setHeader('Content-Type',"text/html");
						res.end('<html><body><h1> Error 404:</h1><br><p>'+'No Users Found'+'</p></body></html>');	
					}
					else{
						res.statusCode = 200;
						res.setHeader('Content-Type','application/json');
						res.json(list);
					}
				},(err)=> next(err))
			}
			else
			{
				res.statusCode = 200;
				res.setHeader('Content-Type','application/json');
				res.json(userList);
			}
		},(err)=> next(err))
		.catch((err)=>next(err));
	}	
})
.post((req,res,next)=>{
	if(req.body.userName != '')
	{
		Users.create(
			new Users({
				name: req.body.userName,
				location:{
					address: req.body.userLocAddrs,
					lat: req.body.userLocLat,
					long: req.body.userLocLong
				}
			})
		)
		//Users.create(req.body)
		.then((user)=>{
			res.statusCode = 200;
			res.setHeader('Content-Type','application/json');
			res.json(user);
		},(err)=> next(err))
		.catch((err)=>next(err));
	}
	else
	{
		res.statusCode = 403;
		res.setHeader('Content-Type',"text/html");
		res.end('<html><body><h1> Error 403:</h1><br><p>'+'User Fields Empty'+'</p></body></html>');	
	}

	
})
.put((req,res,next)=>{
	res.statusCode = 403
	res.end("PUT not supported");
})
.delete((req,res,next)=>{
	res.statusCode = 403
	res.end("DELETE not supported");
});





module.exports = userRouter;
