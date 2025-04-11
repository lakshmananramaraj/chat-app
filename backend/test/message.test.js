const request = require('supertest');
const app = require('../app');
const { User, Message, sequelize } = require('../models');
const jwt = require('jsonwebtoken');

describe('Message API', () => {
  let userToken1, userToken2;
  let user1Id, user2Id;

  beforeAll(async () => {
    // Sync database with force: true to clear all data
    await sequelize.sync({ force: true });

    // Create test users
    const user1 = await User.create({
      username: 'user1',
      password: 'password123'
    });
    
    const user2 = await User.create({
      username: 'user2',
      password: 'password123'
    });

    user1Id = user1.id;
    user2Id = user2.id;

    // Create tokens
    userToken1 = jwt.sign(
      { id: user1.id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );
    
    userToken2 = jwt.sign(
      { id: user2.id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('POST /api/messages', () => {
    it('should send a message', async () => {
      const res = await request(app)
        .post('/api/messages')
        .set('Authorization', `Bearer ${userToken1}`)
        .send({
          receiverId: user2Id,
          content: 'Hello, this is a test message'
        });
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.content).toEqual('Hello, this is a test message');
      expect(res.body.senderId).toEqual(user1Id);
      expect(res.body.receiverId).toEqual(user2Id);
    });

    it('should not send a message without authentication', async () => {
      const res = await request(app)
        .post('/api/messages')
        .send({
          receiverId: user2Id,
          content: 'Hello, this is a test message'
        });
      
      expect(res.statusCode).toEqual(401);
    });
  });

  describe('GET /api/messages/:userId', () => {
    it('should get messages between two users', async () => {
      // Send another message
      await Message.create({
        senderId: user2Id,
        receiverId: user1Id,
        content: 'Hello, this is a response'
      });
      
      const res = await request(app)
        .get(`/api/messages/${user2Id}`)
        .set('Authorization', `Bearer ${userToken1}`);
      
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toEqual(2);
      expect(res.body[0].content).toEqual('Hello, this is a test message');
      expect(res.body[1].content).toEqual('Hello, this is a response');
    });

    it('should not get messages without authentication', async () => {
      const res = await request(app)
        .get(`/api/messages/${user2Id}`);
      
      expect(res.statusCode).toEqual(401);
    });
  });
});