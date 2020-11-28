require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: process.env.POSTGRES_PORT,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
