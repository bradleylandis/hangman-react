import {
  GetPublicKeyOrSecret,
  JwtPayload,
  verify as jsonVerify,
} from "jsonwebtoken";
import { JwksClient } from "jwks-rsa";

export const verify = async (jwtToken): Promise<JwtPayload> => {
  const url = `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`;
  console.log(`url: ${url}`);
  const client = new JwksClient({
    jwksUri: url,
  });

  const getKey: GetPublicKeyOrSecret = (header, callback) => {
    client.getSigningKey(header.kid, function (err, key) {
      const signingKey = key["publicKey"] || key["rsaPublicKey"];
      callback(err, signingKey);
    });
  };

  return new Promise((resolve, reject) => {
    jsonVerify(jwtToken, getKey, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
