import { getServerSession } from "next-auth";
import { hashPassword, vertifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (req, res) => {
  if (req.method !== "PATCH") {
    return;
  }
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({
      message: "Not authentificated!",
    });
    return;
  }
  const { oldPassword, newPassword } = req.body;
  const client = await connectToDatabase();
  const db = client.db(process.env.MONGODB_DATABASE);
  const userCollection = db.collection("users");
  const user = await userCollection.findOne({ email: session.user.email });
  if (!user) {
    client.close();
    res.status(404).json({
      message: "User not found",
    });
    return;
  }
  const isValid = await vertifyPassword(oldPassword, user.password);
  if (!isValid) {
    client.close();
    res.status(422).json({
      message: "Password not correct",
    });
    return;
  }
  const hashedNewPassword = await hashPassword(newPassword);
  await userCollection.updateOne(
    { email: session.user.email },
    { $set: { password: hashedNewPassword } }
  );
  client.close();
  res.status(200).json({ message: "Uptate password successfully" });
};

export default handler;
