const db = require("../database/models");
const Op = db.Sequelize.Op;

var APIController = {
    getCurrencies : (req, res, next) => { 
        db.Currency.findAll({
        }).then( (result)=>{
            let response = {
                meta:{
                    status : 200,
                    state : "OK",
                    total : result.length,
                    url : "/api/currencies"                
                },
                data : result
            }
            res.json(response) 
        }).catch(function(error){
            console.log(error);
        })
    },
    getCurrenciesAndRates : (req, res, next) => { 
        db.Rate.findAll({
            where : {deleted_at : null},
            include :[ {association : "currency"}],
            order: [
                ['created_at', 'DESC']
                ]
        }).then( (result)=>{
            let response = {
                meta:{
                    status : 200,
                    state : "OK",
                    total : result.length,
                    url : "/api/rates"                
                },
                data : result
            }
            res.json(response) 
        }).catch(function(error){
            console.log(error);
        })
    },
    getCurrencieAndRates : (req, res, next) => { 
        console.log(req.paramas)
        db.Rate.findAll({
            include :[ {association : "currency", where:{id : req.params.id}}],
            order: [
                ['created_at', 'DESC']
                ],
            limit : (req.params.id ? Number(req.params.range) : 5),
        }).then( (result)=>{
            let response = {
                meta:{
                    status : 200,
                    state : "OK",
                    total : result.length,
                    url : "/api/rates"                
                },
                data : result
            }
            res.json(response) 
        }).catch(function(error){
            console.log(error);
        })
    },
    ratePost : (req, res, next) => { 
        db.Rate.create({
            id_currency : req.body.id_currency,
            value : req.body.value,
            created_at : Date()
        }).then(function(response){
            db.Rate.update({
                deleted_at : Date()
            },{
                where : {
                    id_currency : req.body.id_currency,
                    deleted_at: null,
                    [Op.not]: [{id : response.id}],  
                }
            }).then(function(result){
                let response = {
                    meta:{
                        status : 200,
                        state : "OK",
                        total : result.length,
                        url : "/api/rates"                
                    },
                    data : result
                }
                res.json(response) 
            }).catch(function(error){
                console.log(error);
            })
        }).catch(function(error){
            console.log(error);
        })
        
    },
    getCurrencYAndRateBySymbol : async (req, res, next) => { 
        try {
            var currencyBySymbol = await db.Rate.findOne({ where: { deleted_at : null } ,
                include :[ {association : "currency",
                where : {symbol : req.params.symbol}
            }]});

            let response = {
                meta:{
                    status : (currencyBySymbol? 200 : 201 ),
                    state : "OK",
                    total : (currencyBySymbol? 1 : 0 ),
                    url : "/api/rates/:symbol",
                    message:  (currencyBySymbol? "The symbol has been found" : "The symbol was not found or the coin was not valued yet." )               
                },
                data : currencyBySymbol
            }

            res.json(response) 

        } catch (error){
            console.log(error);
        }
    }
}
module.exports = APIController;