import axios from "axios";
import qs from "qs";

interface GoogleOAuthTokens {
  id: string;
  access_token: string;
  expires_in: number;
  token_type: string;
  refresh_token: string;
}

export async function getGoogleOAuthTokens({
  code,
}: {
  code: string;
}): Promise<GoogleOAuthTokens> {
  const url = "https://oauth2.googleapis.com/token";

  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    grant_type: "authorization_code",
  };

  try {
    const response = await axios.post<GoogleOAuthTokens>(
      url,
      qs.stringify(values),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error, "Error getting google oauth tokens");
    throw new Error(error.message);
  }
}

interface GoogleUserProfile {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export async function getGoogleUserProfile({
  id_token,
  access_token,
}): Promise<GoogleUserProfile> {
  try {
    const res = await axios.get<GoogleUserProfile>(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error(error, "Error getting google user profile");
    throw new Error(error.message);
  }
}
