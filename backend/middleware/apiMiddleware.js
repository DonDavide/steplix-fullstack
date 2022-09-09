const db = require("../database/models");
const Op = db.Sequelize.Op;


const APIMiddleware = {
    checkIsNumber: (req,res,next) => {
        if(isNaN(req.body.value)){
            console.log(req);
            let response={
                meta:{
                    status : 403,
                    state : false,
                    url : "/api/rate",
                    message : "Invalid value, is not a number"                
                },
                data : {}
            }
            console.log(response);
            res.json(response)  
        }else{
            console.log(req.body.value);

            next();
        }
        
    },
    checkCurrencyExist: (req,res,next) => {
        db.Currency.findByPk(req.body.id_currency)
        .then((result)=>{
            if(result == null){
                let response={
                    meta:{
                        status : 404,
                        state : false,
                        url : "/api/rate",
                        message : "Invalid currency ID"                
                    },
                    data : result
                }
                console.log(response);
                res.json(response)   
            }else{
                next();
            }
        })
    }
}

module.exports = APIMiddleware;