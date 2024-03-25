import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@next-js.5n9mkn5.mongodb.net/?retryWrites=true&w=majority&appName=Next-js`
  );
  return client
};
