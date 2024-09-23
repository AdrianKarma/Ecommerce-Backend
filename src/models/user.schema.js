const {Schema, model}= require('monogoose')

const UserSchema = new Schema({
    userName:{
        type: String,
        required: true,
        unique:true,
        trim:true,
        minlength:[ 5, 'Minimum allowed 5 characters'],
        maxlength:[50, 'Maximum allowed is 50 characters']
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    rol:{
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    cart:{
        type: String,
    }
})

const UserModel = model('user', UserSchema)
module.exports= UserModel