import mongoose from "mongoose"
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const _model = new Schema({
    image: { type: String, required: true },
    // godId: { type: ObjectId, ref: 'name', required: true },
    name: { type: String, required: true },
    // description: { type: String, required: true },
    godsStory: { type: String, required: true },
    godOfWhat: { type: String, required: true },
    siblings: { type: String },
    children: { type: String },
    aesir: { type: Boolean, required: true },
    vanir: { type: Boolean, required: true }
})

export default class GodsService {
    get repository() {
        return mongoose.model('Gods', _model)
    }
}