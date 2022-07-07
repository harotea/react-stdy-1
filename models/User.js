const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        //maxlength: 50
    },
    email: {
        type: String,
        //공백 없애주는 기능
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        //maxlength: 8
    },
    lastname: {
        type: String,
        //maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})
//user 정보를 저장하기 전에 실행하는 코드 -> 비밀번호 암호화
userSchema.pre('save', function(next){
    var user = this;
    //user 정보 중 비밀번호를 바꿀 때만!!
    if(user.isModified('password')) {
    //비밀번호를 암호화 시킨다
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) return next(err)
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err)
            user.password = hash
            next()
         })
     })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function(planePassword, callback) {
    //planePassword : 실제 입력하는 패스워드
    //암호화된 패스워드 <-> planePassword 맞는지 비교하기
    bcrypt.compare(planePassword, this.password, function(err, isMatch) {
        if(err) return callback(err);
        callback(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {

    var user = this;

    //jsonwebtoken을 이용해서 token 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    // user._id + 'secretToken' = token
    // -> 'secretToken' -> user._id

    user.token = token
    user.save(function(err, user){
        if(err) return cb(err);
        cb(null, user)
    })
    
}

const User = mongoose.model('User', userSchema)

module.exports = { User };