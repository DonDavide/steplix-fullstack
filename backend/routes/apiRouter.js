var express = require('express');
var router = express.Router();
var APIController = require('../controllers/apiController');
var APIMiddleware = require('../middleware/apiMiddleware');
/* GET users listing. */

router.get('/currencies', APIController.getCurrencies);
router.get('/currencieAndRates/:id/:range?', APIController.getCurrencieAndRates);

router.get('/rates', APIController.getCurrenciesAndRates);
router.get('/rates/:symbol', APIController.getCurrencYAndRateBySymbol);

router.post('/rates', APIMiddleware.checkIsNumber, APIMiddleware.checkCurrencyExist, APIController.ratePost);

module.exports = router;
