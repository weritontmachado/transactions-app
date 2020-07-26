const express = require('express');
const transactionService = require('../services/transactionService.js');
const transactionRouter = express.Router();

transactionRouter.get('/', transactionService.getByPeriod);
transactionRouter.post('/', transactionService.insert);
transactionRouter.put('/', transactionService.update);
transactionRouter.delete('/:id', transactionService.remove);
transactionRouter.get('/periods', transactionService.getPeriods);

module.exports = transactionRouter;
