const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Contacts']
    const result = await mongodb.getDb().db().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
}

const getSingle = async (req, res) => {
    //#swagger.tags=['Contacts']
    const contactId = ObjectId.createFromHexString(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').find({ _id: contactId});
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    });
}

const createContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
        email: req.body.email
    };
    const response = await mongodb.getDb().db().collection('contacts').insertOne(contact);
    response.acknowledged ? res.status(204).send() : res.status(500).json(response.error || 'An error ocurred while creating the contact');
}

const updateContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    const contactId = ObjectId.createFromHexString(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
        email: req.body.email,
    };
    const response = await mongodb.getDb().db().collection('contacts').replaceOne({_id: contactId}, contact);
    response.modifiedCount > 0 ? res.status(204).send() : res.status(500).json(response.error || 'An error ocurred while updating the contact');
}

const deleteContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    const contactId = ObjectId.createFromHexString(req.params.id);
    const response = await mongodb.getDb().db().collection('contacts').deleteOne({_id: contactId}, true);
    response.deletedCount > 0 ? res.status(204).send() : res.status(500).json(response.error || 'An error ocurred while deleting the contact');
}

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact,
}