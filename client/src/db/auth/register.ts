import {randomNumberGen} from "@/utils/otp";
import connectToDatabase from "@/db/connection";
import { sendVerificationCode } from "@/services/kavenegar";
import { TUser, TUserRegister } from "@/models/user";

export default async function userRegister(data: TUserRegister) {
  const { client } = await connectToDatabase();

  try {
    // Get a reference to the database and the users collection
    const db = client.db('jewelry');
    const usersCollection = db.collection('users');
    const otpCollection = db.collection('otp');

    const confirmCode = randomNumberGen()

    const result = await usersCollection.insertOne(
      {
        FirstName: data.FirstName,
        LastName: data.LastName,
        PhoneNumber: data.PhoneNumber,
        IDCode: data.IDCode,
        IDScan: data.IDScan,
        IsAdmin: false,
        CreatedAt: new Date(), 
        UpdatedAt: new Date(),
      }
    )

    if (!result.insertedId) {
      return { success: false, message: 'User registration failed' };
    }

    const result2 = await otpCollection.insertOne(
      {
        UserID: result.insertedId,
        ConfirmCode: confirmCode,
        Timestamp: new Date()
      }
    )

    if (!result2.insertedId) {
      return { success: false, message: 'User registration failed' };
    }

    return { success: true };

  } catch (error: any) {
    return { success: false, message: error.message };
  } finally {
    // Close the database connection
    client.close();
  }
}