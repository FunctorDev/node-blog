import path from 'path';

export const PORT = process.env.PORT || 2345;

export const FILE_STORAGE_HOSTING = process.env.FILE_STORAGE_HOSTING;

export const BASE_PATH = process.env.BASE_PATH;

export const PATH_ROOT = path.resolve(__dirname, '..', '..');

export const API_PREFIX = process.env.API_PREFIX;

export const JWT_SECRET = 'lanhkhoc';

export const IS_LOCAL = process.env.IS_LOCAL === 'true';

export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_DATABASE = process.env.DB_DATABASE;
export const DB_PORT = process.env.DB_PORT || 5432;
