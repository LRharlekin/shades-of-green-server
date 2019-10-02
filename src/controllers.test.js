const fakeModels = require("./models");
const controllers = require("./controllers");

jest.mock("./models");
const mockGoogleId = 12345;

const req = {
  body: {
    username: "user_name",
    google_id: mockGoogleId
  }
};

const res = {
  send: jest.fn(),
  status: jest.fn()
};

const fakeUsers = { users: ["users"] };
const fakePlaces = { places: ["places"] };
// const fakeVote = {};
const emptyBody = {};

// Test for: getUsers
describe("getUsers", () => {
  it("should set correct success status", async () => {
    await controllers.getUsers(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });
  it("should return all users in the db", async () => {
    fakeModels.Users.findAll.mockResolvedValue(fakeUsers);
    await controllers.getUsers(req, res);
    expect(res.send).toHaveBeenCalledWith(fakeUsers);
  });
  it("should set correct error status", async () => {
    fakeModels.Users.findAll.mockRejectedValue(new Error('Async error'));
    await controllers.getUsers(emptyBody, res)
    expect(res.status).toHaveBeenCalledWith(500)
  });
});

// Test for: getPlaces
describe("getPlaces", () => {
  it("should set correct success status", async () => {
    await controllers.getPlaces(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });
  it("should return all places in the db", async () => {
    fakeModels.Places.findAll.mockResolvedValue(fakePlaces);
    await controllers.getPlaces(req, res);
    expect(res.send).toHaveBeenCalledWith(fakePlaces);
  });
  it("should set correct error status", async () => {
  fakeModels.Users.findAll.mockRejectedValue(new Error('Async error'));
  await controllers.getPlaces(emptyBody, res);
  expect(res.status).toHaveBeenCalledWith(500);
  });
});

// Test for: addVote
describe("addVote", () => {
  it("should set correct success status", async () => {
    await controllers.addVote(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });
  it("should add a vote in the db", async () => {
    // add the right test here
  });
  it("should set correct error status", async () => {
    fakeModels.Votes.findOne.mockRejectedValue(new Error('Async error'));
    await controllers.addVote(emptyBody, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

// Test for: getCurrentScore
describe("getCurrentScore", () => {
  it("should set correct success status", async () => {
    await controllers.getCurrentScore(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });
  it("should find the one with the correct google id", async () => {
    await controllers.getCurrentScore(req, res);
    expect(fakeModels.Places.findOne).toHaveBeenCalledWith({ where: { google_id: mockGoogleId } });
  });
  it("should find the correct place ", async () => {
    fakeModels.Places.findOne.mockResolvedValue('placeOne');
    await controllers.getCurrentScore(req, res);
    expect(res.send).toHaveBeenCalledWith('placeOne');

  });
  it("should set correct error status", async () => {
    fakeModels.Places.findOne.mockRejectedValue(new Error('Async error'));
    await controllers.getCurrentScore(emptyBody, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

