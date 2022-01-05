import {
  GetPublicKeyOrSecret,
  JwtPayload,
  verify as jsonVerify,
} from "jsonwebtoken";
import { JwksClient } from "jwks-rsa";

export const verify = async (jwtToken): Promise<JwtPayload> => {
  var client = new JwksClient({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  });

  const getKey: GetPublicKeyOrSecret = (header, callback) => {
    client.getSigningKey(header.kid, function (err, key) {
      var signingKey = key["publicKey"] || key["rsaPublicKey"];
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
