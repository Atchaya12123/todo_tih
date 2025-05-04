const mongoose = require('mongoose');
mongoose.set('debug', true);
const PASSWORD = "admin"
const DATABASE_NAME = 'TIH';
const CONNECTION_URI = `mongodb+srv://admin:admin@todotih.4mqs2eb.mongodb.net/`
async function main() {
    await mongoose.connect(CONNECTION_URI, {
        dbName: DATABASE_NAME,
        user: 'admin',
        pass: PASSWORD
    });
}

main().then(() => {
    console.log('MongoDB connected successfully!')
}).catch((err) => {
    console.error('MongoDB connection error:', err)
})