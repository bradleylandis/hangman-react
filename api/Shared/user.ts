import { Context } from "@azure/functions";

export const getUserId = (header: string, context: Context): string => {
  if (!header) return "";
  const encoded = Buffer.from(header, "base64");
  const decoded = encoded.toString("ascii");
  context.log(`decoded: ${decoded}`);
  const parsedResult = JSON.parse(decoded);
  context.log(`parsedResult: ${parsedResult}`);
  return parsedResult ? getUserString(parsedResult) : "";
};

const getUserString = (parsedResult: {
  identityProvider: string;
  userId: string;
}): string => {
  return `${parsedResult.identityProvider}|${parsedResult.userId}`;
};
