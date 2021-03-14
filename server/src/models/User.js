const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const Task = require('./Task')
const Project = require('./Project');
const Category = require('./Category');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Value must be a valid email address!")
            }
        }
    },
    password: {
        required: true,
        type: String,
        trim: true,
        validate(value){
            if(value.length < 8){
                throw new Error("Password must be greater than 7 characters!")
            } else if (value.toLowerCase().includes('password')){
                throw new Error("Password can not contain 'password'")
            }
        }
    },  
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be a positive number!')
            }
        }  
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    },
}, {
    timestamps: true
})

userSchema.virtual('tasks', { 
    ref: 'Task',
    localField: '_id',
    foreignField: 'creator'
 })

userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.tokens;
    delete userObject.password;
    delete userObject.avatar

    return userObject;
}

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user.id.toString() }, process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({ token });
    await user.save()

    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if(!user){
        throw new Error("Unable to log in")
    }

    const isValidPass = await bcrypt.compare(password, user.password);

    if(!isValidPass) {
        throw new Error("Unable to log in")
    }

    return user;
}

// HASH THE PLAIN TEXT PASS
userSchema.pre('save', async function (next){
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 10);
    }
    

    next();
})

//DELETE USER TASKS WHEN USER IS REMOVED
userSchema.pre('remove', async function(next){
    const user = this;
    await Task.deleteMany({ creator: user._id })

    next()
})

//DELETE USER PROJECTS WHEN USER IS REMOVED
userSchema.pre('remove', async function(next){
    const user = this;
    await Project.deleteMany({ creator: user._id })

    next()
})

userSchema.pre('remove', async function(next){
    const user = this;
    await Category.deleteMany({ creator: user._id })

    next()
})
const User = mongoose.model('User', userSchema)

module.exports = User;
    
    // const trev = new User({
    //     name: "  Trevor  ",
    //     email: '     MYEMAIL@aol.com    ',
    //     password: "pASSw0rd1234"
    // })
    
    // trev.save()
    // .then(() => console.log(trev))
    // .catch(err => console.log(err))