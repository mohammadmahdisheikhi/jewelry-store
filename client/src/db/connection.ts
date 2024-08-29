import { error } from "console";
import { MongoClient } from "mongodb";

let cachedClient: MongoClient | null = null;

export default async function connectToDatabse() {
    if (!process.env.MONGODB_URL) {
        throw error('No mongo uri in env');
    }

    const client = await MongoClient.connect(process.env.MONGODB_URL)

    cachedClient = client;
    return {client};
}