const adminRoutes = require('./routes/admin');
const cors = require('cors');

app.use(cors({
    origin: 'https://blueelephantsstudio.pages.dev',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use('/api/admin', adminRoutes); 