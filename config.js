export const serverConfig = {
  port : process.env.PORT || 8080,
  host : process.env.HOST || '0.0.0.0',
  get serverUrl(){
    return `http://${this.host}:${this.port}`;
  }
};

export const consoleConfig = () => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  console.log('***********');
  console.log('Configuration file loaded');
  console.log('Environment : ', nodeEnv);
  console.log('***********');

};

// To change with your Environment PYG API
export const configApi = {
  port : 3333,
  host: 'localhost',
  get apiUrl(){
    return `http://${this.host}:${this.port}`;
  }
};
