import { exec } from "child_process";

const startServer = async () => {
  // @ts-expect-error not needed
  global.__VITE_SERVER__ = exec("npm run dev"); // Replace 'npm run dev' with your Vite start script
  await new Promise((resolve) => setTimeout(resolve, 4000)); // Wait for the server to start
};

export default startServer;
