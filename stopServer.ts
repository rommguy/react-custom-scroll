const stopServer = async () => {
  // @ts-expect-error not needed
  global.__VITE_SERVER__.kill();
};

export default stopServer;
