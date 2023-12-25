const redis = require('redis')


// 创建客户端
const redisClient = redis.createClient({
  url: `redis://127.0.0.1:6379`,
  legacyMode: false
})

// 连接
redisClient.connect()
    .then(() => console.log('redis connect success!'))
    .catch(console.error)

module.exports = redisClient