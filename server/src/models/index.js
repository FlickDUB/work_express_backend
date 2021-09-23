const sequelize = require('./database')

const Token = require('./token.model')
const User = require('./user.model')
const File = require('./file.model')



User.hasOne(Token, {
    onDelete: 'CASCADE',
    // onUpdate: 'CASCADE'
})
Token.belongsTo(User)



module.exports = sequelize
