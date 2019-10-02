'use strict';

const db = require('./models');


exports.getUsers = async (req, res) => {
  try {
    const users = await db.Users.findAll();    
    res.status(201);
    res.send(users);
  } catch (e) {
    res.status(500);
    res.send(e);
  }
};

exports.getPlaces = async (req, res) => {
  try {
    const places = await db.Places.findAll();
    res.status(201);
    res.send(places);
  } catch (e) {
    res.status(500);
    res.send(e);
  }
};

exports.addVote = async (req, res) => {
  try {
    const { place_google_id, score, user_id } = req.body
    let place = await db.Places.findOne({ where: { google_id: place_google_id } })
    if (!place) {
      place = await db.Places.create({ google_id: place_google_id})
    }
    const vote = await db.Votes.create({
      PlaceGoogleId: place_google_id,
      UserId: user_id,
      score
    });
    const [_, [updatedSumNTotal]] = await db.Places.update({ total_score: place.total_score + score, num_of_votes: place.num_of_votes + 1 }, { where: { google_id: place_google_id }, returning: true });
    const updatedScore = await db.Places.update({ average_score: updatedSumNTotal.total_score / updatedSumNTotal.num_of_votes }, { where: { google_id: place_google_id }, returning: true });
    res.status(201);
    res.send(updatedScore);
  } catch (e) {
    res.status(500);
    res.send(e);
  }
};

exports.getCurrentScore = async (req, res) => {
  try {
    const { google_id } = req.body;
    const currentScore = await db.Places.findOne({ where: { google_id: google_id } })
    res.status(201); 
    res.send(currentScore);
  } catch (e) {
    res.status(500);
    res.send(e);
  }
};

