interface ParsedResult {
  identityProvider: string;
  userId: string;
}

export const getUserId = (header: string): string => {
  if (!header) return "";
  const encoded = Buffer.from(header, "base64");
  const decoded = encoded.toString("ascii");
  const parsedResult: ParsedResult = JSON.parse(decoded);
  return parsedResult ? getUserString(parsedResult) : "";
};

const getUserString = (parsedResult: ParsedResult): string => {
  return `${parsedResult.identityProvider}|${parsedResult.userId}`;
};
