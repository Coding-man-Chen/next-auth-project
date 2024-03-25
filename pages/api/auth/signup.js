import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = req.body;
    if (!EMAIL_REGEX.test(email) || password.trim().length <= 7) {
      res.status(422).json({
        message: "Invalid input - password at least 7 characters",
      });
      return;
    }
    const client = await connectToDatabase();
    const existingUser = await client
      .db(process.env.MONGODB_DATABASE)
      .collection("users")
      .findOne({ email: email });
    if (existingUser) {
      client.close();
      res.status(422).json({
        message: "User exists already!",
      });
      return;
    }
    const hashedPassword = await hashPassword(password);
    await client
      .db(process.env.MONGODB_DATABASE)
      .collection("users")
      .insertOne({
        email,
        password: hashedPassword,
      });
    client.close();
    res.status(201).json({
      message: "User signed up!",
    });
  }
};

export default handler;
