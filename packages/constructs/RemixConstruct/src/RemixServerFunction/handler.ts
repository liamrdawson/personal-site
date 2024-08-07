export const getEnvVar = (prop: string): string => {
  const value = process.env[prop];

  if (!value) {
    throw new Error(`${prop} environment variable is not defined`);
  }

  return value;
};

export async function handler() {
  const remixServerBuild = getEnvVar("REMIX_SERVER_BUILD");
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({ message: "Hello, World!", remixServerBuild }),
  };
}
