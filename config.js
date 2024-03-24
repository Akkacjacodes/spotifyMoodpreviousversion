// config.js
const dev = {
    API_BASE_URL: "http://localhost:3000",
  };
  
  const prod = {
    API_BASE_URL: "https://a3e2d23b-5002-4170-8367-7eff2bf885dd.e1-us-cdp-2.choreoapps.dev",
  };
  
  const config = process.env.NODE_ENV === 'development' ? dev : prod;
  
  export default config;
  