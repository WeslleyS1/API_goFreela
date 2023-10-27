import { config } from "dotenv";
import { Request, Response } from "express";
import { getGoogleOAuthTokens } from "services/user.service";
import jwt from "jsonwebtoken";

export async function googleOAuthHandler(req: Request, res: Response) {
  try {
    // get the code from the qs
    const code = req.query.code as string;

    // get the id and acess token with the code
    const { id, access_token } = await getGoogleOAuthTokens({ code });

    // get the user info with the access token
    const googleUser = jwt.decode(id);

    console.log({ googleUser });

    // upsert the user info into the db

    // create a session for the user

    // create acess and refresh tokens

    // send the tokens back to the user
  } catch (error) {
    console.error(error, "Error getting google oauth tokens");
    return res.redirect(`${config().parsed.origin}/oauth/error`);
  }
}
