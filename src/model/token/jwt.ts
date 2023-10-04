import jwt, { JwtPayload } from "jsonwebtoken";
export const signJWT = (payload: object, key: string): string => {
  const token = jwt.sign(payload, key, {
    expiresIn: "1h",
  });
  return token;
};
export const verifyJWT = (token: string, key: string): string | JwtPayload => {
  console.log("TOKEN VERIFYJWT ", token);
  const verification = jwt.verify(token, key);
  return verification;
};
