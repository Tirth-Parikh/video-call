const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const roomRoutes = require('./routes/roomRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/room', roomRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
