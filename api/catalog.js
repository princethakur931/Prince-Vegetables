import { MongoClient } from 'mongodb';

const DEFAULT_DB_NAME = 'prince_vegetables';
const DEFAULT_COLLECTION_NAME = 'catalogs';
const DOCUMENT_ID = 'main';

let cachedClientPromise;

const getMongoClient = () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('Missing MONGODB_URI environment variable');
  }

  if (!cachedClientPromise) {
    const client = new MongoClient(mongoUri);
    cachedClientPromise = client.connect();
  }

  return cachedClientPromise;
};

const getCollection = async () => {
  const client = await getMongoClient();
  const dbName = process.env.MONGODB_DB || DEFAULT_DB_NAME;
  const collectionName = process.env.MONGODB_COLLECTION || DEFAULT_COLLECTION_NAME;

  return client.db(dbName).collection(collectionName);
};

const readBody = (req) => {
  if (!req.body) {
    return {};
  }

  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }

  return req.body;
};

const applyCorsHeaders = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
};

export default async function handler(req, res) {
  applyCorsHeaders(res);
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    const collection = await getCollection();

    if (req.method === 'GET') {
      const document = await collection.findOne({ _id: DOCUMENT_ID });

      if (!document) {
        return res.status(404).json({ message: 'Catalog not found' });
      }

      return res.status(200).json(document.catalog ?? { sections: [] });
    }

    if (req.method === 'PUT' || req.method === 'POST') {
      const body = readBody(req);
      const catalog = body.catalog ?? body;

      if (!catalog || typeof catalog !== 'object') {
        return res.status(400).json({ message: 'Invalid catalog payload' });
      }

      await collection.updateOne(
        { _id: DOCUMENT_ID },
        {
          $set: {
            catalog,
            updatedAt: new Date()
          },
          $setOnInsert: {
            createdAt: new Date()
          }
        },
        { upsert: true }
      );

      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', ['GET', 'PUT', 'POST']);
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to access catalog database',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}