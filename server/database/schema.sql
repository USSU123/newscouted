{
  "content": "CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  displayName TEXT NOT NULL,
  passwordHash TEXT NOT NULL,
  avatar TEXT,
  coverPhoto TEXT,
  bio TEXT,
  location TEXT,
  birthday TEXT NOT NULL,
  createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
  lastLogin TEXT,
  isVerified INTEGER NOT NULL DEFAULT 0,
  firstName TEXT,
  lastName TEXT,
  socialLinks TEXT,
  settings TEXT DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  content TEXT NOT NULL,
  media TEXT,
  createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
  authorId TEXT NOT NULL,
  FOREIGN KEY (authorId) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_posts_authorId ON posts(authorId);

CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  content TEXT NOT NULL,
  createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  readAt TEXT,
  senderId TEXT NOT NULL,
  receiverId TEXT NOT NULL,
  FOREIGN KEY (senderId) REFERENCES users(id),
  FOREIGN KEY (receiverId) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_messages_senderId ON messages(senderId);
CREATE INDEX IF NOT EXISTS idx_messages_receiverId ON messages(receiverId);

CREATE TABLE IF NOT EXISTS follows (
  id TEXT PRIMARY KEY,
  followerId TEXT NOT NULL,
  followingId TEXT NOT NULL,
  createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (followerId) REFERENCES users(id),
  FOREIGN KEY (followingId) REFERENCES users(id),
  UNIQUE(followerId, followingId)
);

CREATE INDEX IF NOT EXISTS idx_follows_followerId ON follows(followerId);
CREATE INDEX IF NOT EXISTS idx_follows_followingId ON follows(followingId);

CREATE TABLE IF NOT EXISTS likes (
  id TEXT PRIMARY KEY,
  postId TEXT NOT NULL,
  userId TEXT NOT NULL,
  createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (postId) REFERENCES posts(id),
  FOREIGN KEY (userId) REFERENCES users(id),
  UNIQUE(postId, userId)
);

CREATE INDEX IF NOT EXISTS idx_likes_postId ON likes(postId);
CREATE INDEX IF NOT EXISTS idx_likes_userId ON likes(userId);

CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  content TEXT NOT NULL,
  postId TEXT NOT NULL,
  userId TEXT NOT NULL,
  createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (postId) REFERENCES posts(id),
  FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_comments_postId ON comments(postId);
CREATE INDEX IF NOT EXISTS idx_comments_userId ON comments(userId);

CREATE TABLE IF NOT EXISTS tags (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  value TEXT NOT NULL,
  UNIQUE(category, value)
);

CREATE TABLE IF NOT EXISTS user_tags (
  userId TEXT NOT NULL,
  tagId TEXT NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (tagId) REFERENCES tags(id),
  PRIMARY KEY (userId, tagId)
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id TEXT PRIMARY KEY,
  userId TEXT UNIQUE NOT NULL,
  tier TEXT NOT NULL,
  startDate TEXT NOT NULL DEFAULT (datetime('now')),
  endDate TEXT,
  autoRenew INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_userId ON subscriptions(userId);"
}