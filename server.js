const express=require('express');
const FootballModel=require('./FootballModel');
const cors = require('cors');
const db=require('./MongoDBconnection');

const bodyParser = require('body-parser'); // Import body-parser middleware

const app = express();
app.use(cors()); 

// Use body-parser middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// POST route to add a new team
app.post('/add-team', async (req, res) => {
  try {
    // Create a new team document from the request body
    const newTeam = new FootballModel({
      Team: req.body.Team,
      'Games Played': req.body.gamesPlayed,
      Win: req.body.win,
      Draw: req.body.draw,
      Loss: req.body.loss,
      'Goals For': req.body.goalsFor,
      'Goals Against': req.body.goalsAgainst,
      Points: req.body.points,
      Year: req.body.year
    });

    // Save the new team to the database
    const savedTeam = await newTeam.save();
    res.status(201).json(savedTeam);  // Respond with the saved team

  } catch (error) {
    console.error('Error saving team:', error);
    res.status(500).json({ message: 'Failed to add team', error: error.message });
  }
});

// PUT route to update Team

app.put('/update-team/:id', async (req, res) => {
  try {
    const teamId = req.params.id;

    const updatedTeam = await FootballModel.findByIdAndUpdate(
      teamId,
      {
        $set: {
          Team: req.body.Team,
          'Games Played': req.body['Games Played'],
          Win: req.body.Win,
          Draw: req.body.Draw,
          Loss: req.body.Loss,
          'Goals For': req.body['Goals For'],
          'Goals Against': req.body['Goals Against'],
          Points: req.body.Points,
          Year: req.body.Year,
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedTeam) {
      return res.status(404).json({ message: 'Team not found' });
    }

    res.status(200).json(updatedTeam);

  } catch (error) {
    console.error('Error updating team:', error);
    res.status(500).json({ message: 'Failed to update team', error: error.message });
  }
});

// GET route for team-stats
app.get('/team-stats/:teamName', async (req, res) => {
  try {
    const team = await Team.findOne({ Team: req.params.teamName });

    if (!team) return res.status(404).json({ message: 'Team not found' });

    const stats = {
      gamesPlayed: team['Games Played'],
      wins: team.Win,
      draws: team.Draw,
    };

    res.json(stats);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: err.message });
  }
});

// Delete Team

app.delete('/delete-team/:id', async (req, res) => {
  try {
    const teamId = req.params.id; // Extract the team ID from the URL
    const deletedTeam = await FootballModel.findByIdAndDelete(teamId); // Use Mongoose to delete the document
    
    if (!deletedTeam) {
      return res.status(404).json({ error: 'Team not found' }); // Handle case where team ID does not exist
    }

    res.status(200).json({ message: 'Team deleted successfully', deletedTeam });
  } catch (error) {
    console.error('Error deleting team:', error);
    res.status(500).send({ error: 'Failed to delete team', details: error.message });
  }
});

// Route to get all the records from the Football database
app.get('/view-all-teams', async (req, res) => {
  try {
    // Query the database to retrieve all teams
    const teams = await FootballModel.find();

    // Check if any teams are found
    if (!teams || teams.length === 0) {
      return res.status(404).json({ message: 'No teams found in the database.' });
    }

    // Return the list of teams as JSON
    res.status(200).json(teams);
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({
      error: 'Failed to fetch teams',
      details: error.message,
    });
  }
});




app.get('/view-teams', async (req, res) => {
  // const { wins } = req.query; // Get the query parameter for wins

  // try {
  //   let filter = {};
  //   if (wins) {
  //     filter = { Win: { $gte: Number(wins) } }; // Filter teams where Win >= provided value
  //   }

  //   const teams = await Team.find(filter).limit(10); // Get first 10 teams based on filter

  //   if (teams.length === 0) {
  //     return res.status(404).json({ message: 'No teams found matching the criteria.' });
  //   }res.json(teams); // Return the teams as a JSON response
  // } catch (err) {
  //   console.error('Error fetching teams:', err);
  //   res.status(500).json({ message: 'Error fetching teams', error: err.message });
  // }

  try {
    // Query the database to retrieve all teams
    const teams = await FootballModel.find();

    // Check if any teams are found
    if (!teams || teams.length === 0) {
      return res.status(404).json({ message: 'No teams found in the database.' });
    }

    // Return the list of teams as JSON
    res.status(200).json(teams);
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({
      error: 'Failed to fetch teams',
      details: error.message,
    });
  }
});



app.get('/teams-by-year', async (req, res) => {
  const { year } = req.query;

  try {
    const teams = await FootballModel.find({ Year: year });
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching teams' });
  }
});


  
const PORT=9000;


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));