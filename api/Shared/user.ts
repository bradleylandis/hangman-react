export const getUserId = (header: string): string => {
  if (!header) return "";
  const encoded = Buffer.from(header, "base64");
  const decoded = encoded.toString("ascii");
  const parsedResult = JSON.parse(decoded);
  return parsedResult ? getUserString(parsedResult) : "";
};

const getUserString = (parsedResult: {
  identityProvider: string;
  userId: string;
}): string => {
  return `${parsedResult.identityProvider}|${parsedResult.userId}`;
};
