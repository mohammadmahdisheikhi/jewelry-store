import {randomNumberGen} from "@/utils/otp";
import connectToDatabase from "@/db/connection";
import { sendVerificationCode } from "@/services/kavenegar";
import { TUserLogin, TUserRegister } from "@/models/user";

export default async function userLogin(data: TUserLogin) {
  const { client } = await connectToDatabase();

  try {
    // Get a reference to the database and the users collection
    const db = client.db('jewelry');
    const usersCollection = db.collection('users');
    const otpCollection = db.collection('otp');

    // Step 1: Check if the phone already exists
    const phone = data.PhoneNumber
    const existingUser = await usersCollection.findOne({ phone });
    
    // generate confirmCode
    const confirmCode = randomNumberGen()
    
    if (existingUser) {
      // User with this phone number already exists
      // Implement your login and cookie logic here
      const userID = existingUser?._id

      const result = await otpCollection.updateOne(
        { "_id": userID }, // Query parameter: find user with this phone number
        {
          $set: {
            ConfirmCode: confirmCode,
            Timestamp: new Date()
          },
        }
      );

      if (result.modifiedCount === 0) {
        return { success: false, message: 'User creation failed' };
      }
      
      // send sms
      sendVerificationCode(existingUser.phone, confirmCode)

      return { 
        success: true, 
      };
    }

  } catch (error: any) {
    return { success: false, message: error.message };
  } finally {
    // Close the database connection
    client.close();
  }
}