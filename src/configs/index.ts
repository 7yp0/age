const config: Config = {
  buildServerUrl: 'http://localhost:8081/build',
  canvasWidth: 640,
  canvasHeight: 360,
  imageSmoothingEnabled: false,
  isProduction: String(process.env.NODE_ENV) === 'production',
  isDevelopment: String(process.env.NODE_ENV) === 'development',
};

export default config;
