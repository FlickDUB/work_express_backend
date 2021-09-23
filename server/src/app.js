require('dotenv').config()

const sequelize = require('./models');
const app = require('./route')

const PORT = process.env.PORT || 3000
sequelize.authenticate().then((error) => {
    if (error) {
        console.log('Unable to connect to the database:');
        console.log(error.message);
        process.exit(1);
    }
    sequelize.sync().then(() => {
        console.log('Database connection OK!');
        console.log(`Starting Sequelize + Express example on port ${PORT}...`);
        app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`);
        });
    }).catch((error) => { console.log(error) })
})

console.log(process.env.DB_USERNAME)
