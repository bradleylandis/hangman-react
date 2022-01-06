import { Context } from "@azure/functions";
import {
  GetPublicKeyOrSecret,
  JwtPayload,
  verify as jsonVerify,
  VerifyOptions,
} from "jsonwebtoken";
import { JwksClient } from "jwks-rsa";

export const verify = async (
  context: Context,
  jwtToken: string
): Promise<JwtPayload> => {
  const url = `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`;
  const client = new JwksClient({
    jwksUri: url,
  });

  var verifyOptions: VerifyOptions = {
    algorithms: ["HS256"],
  };

  const getKey: GetPublicKeyOrSecret = (header, callback) => {
    context.log(`header: ${JSON.stringify(header)}`);
    client.getSigningKey(header.kid, function (err, key) {
      if (err) {
        callback(err, null);
        return;
      }
      const signingKey = key["publicKey"] || key["rsaPublicKey"];
      callback(null, signingKey);
    });
  };

  return new Promise((resolve, reject) => {
    jsonVerify(jwtToken, getKey, verifyOptions, (err, result) =>
      err ? reject(err) : resolve(result)
    );
  });
};
