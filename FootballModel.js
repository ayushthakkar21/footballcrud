const mongoose = require('mongoose');

// Schema for Football Data
const FootballSchema = new mongoose.Schema({
    Team: {
        type: String,
        required: true
    },
    'Games Played': { 
        type: Number,
        required: true 
    }, // Number of games played
    Win: { 
        type: Number, 
        required: true 
    }, // Number of wins
    Draw: {
        type: Number, 
        required: true 
    }, // Number of draws
    Loss: {
        type: Number, 
        required: true 
    }, // Number of losses
    'Goals For': {
        type: Number, 
        required: true 
    }, // Goals scored by the team
    'Goals Against': {
        type: Number, 
        required: true 
    }, // Goals conceded by the team
    Points: {
        type: Number, 
        required: true 
    }, // Total points
    Year: {
        type: Number,
        required: true
    }
}, { collection: 'FootballData' });

// Create Model
const FootballModel = mongoose.model('FootballModel', FootballSchema);

// Export FootballModel
module.exports = FootballModel;
