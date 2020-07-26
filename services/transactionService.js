const mongoose = require('mongoose');
const express = require('express');
const ObjectId = mongoose.Types.ObjectId;

const TransactionModel = require('../models/TransactionModel');

exports.insert = async (req, res) => {
  const {
    description,
    value,
    category,
    year,
    month,
    day,
    yearMonth,
    yearMonthDay,
    type,
  } = req.body;
  const transaction = new TransactionModel({
    description: description,
    value: value,
    category: category,
    year: year,
    month: month,
    day: day,
    yearMonth: yearMonth,
    yearMonthDay: yearMonthDay,
    type: type,
  });

  try {
    const data = await transaction.save(transaction);

    if (!data) {
      res.status(400).send({ message: 'Não foi possível inserir a transação' });
    } else {
      res.send(data);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    console.log(error);
  }
};

exports.getPeriods = async (_, res) => {
  try {
    const data = await TransactionModel.find({}, { year: 1 }).distinct('year');

    if (!data) {
      res.status(404).send({ message: 'Nenhuma transação encontrada' });
    } else {
      res.send(data);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
  }
};

exports.getByPeriod = async (req, res) => {
  const period = req.query.period;
  if (period === undefined) {
    res.status(404).send({
      error: `É necessário informar a query "period", cujo valor deve estar no formato yyyy-mm`,
    });
    return;
  }

  try {
    const condition = {
      yearMonth: { $regex: new RegExp(period), $options: 'i' },
    };

    const data = await TransactionModel.find(condition);

    if (!data) {
      res.status(404).send({ message: 'Nenhuma transação encontrada' });
    } else {
      res.send(data);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
  }
};

exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  try {
    const id = req.body._id;
    const data = await TransactionModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );

    if (!data) {
      res.status(404).send({ message: 'Transação não encontrada' });
    } else {
      res.send({ message: 'Transação atualizada com sucesso' });
    }

    // logger.info(`PUT /transaction - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    //logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

exports.remove = async (req, res) => {
  const id = req.params.id;

  const data = await TransactionModel.findByIdAndRemove({ _id: id });

  try {
    if (!data) {
      res.status(404).send({ message: 'Transação não encontrada' });
    } else {
      res.send({ message: 'Transação excluida com sucesso' });
    }

    // logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    // logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};
