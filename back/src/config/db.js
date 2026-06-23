import mssql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

export const getConnection = async () => {
  try {
    const pool = await mssql.connect(dbConfig);
    return pool;
  } catch (error) {
    console.error('Error al conectar con SQL Server:', error);
    throw error;
  }
};

export { mssql };