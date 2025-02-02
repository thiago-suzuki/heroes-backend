import * as mongoose from "mongoose";

const KnightSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter Knight name"]
        },
        nickname: {
            type: String,
            required: [true, "Please enter Knight nickname"]
        },
        age: {
            type: Number,
            required: true,
            default: 0
        },
        birthday: {
            type: String,
            required: [true, "Please enter Knight birthday"]
        },
        attack: {
            type: Number,
            required: false,
            default: 0
        },
        exp: {
            type: Number,
            required: false,
            default: 0
        },
        weapons: [
            {
                name: String,
                mod: Number,
                attr: String,
                equipped: Boolean
            }
        ],
        attributes: {
            strength: Number,
            dexterity: Number,
            constitution: Number,
            intelligence: Number,
            wisdom: Number,
            charisma: Number,
        },
        keyAttribute: {
            type: String,
            required: [true, "Please enter Knight keyAttribute"]
        },
        deletedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                return ret;
            }
        },
        toObject: {
            virtuals: true
        }    
    }
)

export const Knight = mongoose.model("Knight", KnightSchema);