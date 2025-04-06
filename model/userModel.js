const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,   //required: [true, "name is required"] the later is thrown if its false
        unique: true,
        trim: true,
        validate:{
            validator: async function (value) {                 
                const users = await this.constructor.findOne({
                    name: new RegExp(`^${value}$`, 'i')
                })
                return !users
            },
            message: "Username already exists, add a surname or nickname"
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        validate: {                                 //if validate was an arrow function, lets say validate: (value)=>/\S+@\S+\.\S+/.test(value)
            validator: function (value){            //error messages cant be set, since message is an key of the validate object
                return  /\S+@\S+\.\S+/.test(value)
            },
            message: "Invalid email format"
        }
    },
    //if the validator returns false the message is thrown
    password:{
        type: String,
        required: true,
        minlength: 6
    },
   
}, {timestamps: true})

UserSchema.pre('save', async function (next) {
    if(!this.isModified('password'))return next() //skips if the password isnt modified  

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    //await bcrypt.hash(this.password, 10) can be used alternative

    const existingUser = await this.constructor.findOne({email: this.email})
    if(existingUser){
        throw new Error("Email is already in use")
    }
    next()
})

UserSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

//the function about use the schema methods to avoid using bcrypt.compare everywhere we need to compare the passswords
//we can just call the method instead just like how we will call the save method


module.exports = mongoose.model("User", UserSchema);