const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors=require('cors')
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

dotenv.config();


const app = express();
 

app.use(cors({
  origin:process.env.DEPLOYED_FRONTEND_URL,  
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  credentials: true  // if you want to allow cookies/auth headers
}))
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', bookRoutes);
app.use('/api', reviewRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.error('MongoDB connection error:', err));
app.listen(PORT,()=>{
  console.log("app running on",PORT)
})
