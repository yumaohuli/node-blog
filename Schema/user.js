const { Schema } = require('./config')

// 定义参数类型
const UserSchema = new Schema({
    username:String,
    password:String
},{versionKey:false})


// 导出模块
module.exports = UserSchema