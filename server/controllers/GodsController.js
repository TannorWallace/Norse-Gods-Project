import express from 'express'
import GodsService from '../services/GodsService.js';
import { Authorize } from '../middleware/authorize.js'

let _godsService = new GodsService().repository

export default class GodsController {
    constructor() {
        this.router = express.Router()
            //NOTE all routes after the authenticate method will require the user to be logged in to access
            .get('', this.getAllGods)
            .get('/:id', this.getGodById)
            .post('', this.create)
            .put('/:id', this.edit)
            .delete('/:id', this.delete)
    }

    async getAllGods(req, res, next) {
        try {
            let data = await _godsService.find({})
            return res.send(data)
        } catch (error) { next(error) }

    }

    async getGodById(req, res, next) {
        try {
            let data = await _godsService.findById(req.params.id)
            if (!data) {
                throw new Error("Invalid Id")
            }
            res.send(data)
        } catch (error) { next(error) }
    }

    async create(req, res, next) {
        try {
            //NOTE the user id is accessable through req.body.uid, never trust the client to provide you this information
            // REVIEW req.body.authorId = req.session.uid??
            let data = await _godsService.create(req.body)
            res.send(data)
        } catch (error) { next(error) }
    }

    async edit(req, res, next) {
        try {
            let data = await _godsService.findOneAndUpdate({ _id: req.params.id, }, req.body, { new: true })
            if (data) {
                return res.send(data)
            }
            throw new Error("invalid id")
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            await _godsService.findOneAndRemove({ _id: req.params.id })
            res.send("deleted value")
        } catch (error) { next(error) }

    }

}