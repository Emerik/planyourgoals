const env = process.env;


export const nodeEnv = env.NODE_ENV || 'development';


export default {
  port : env.PORT || 8080,
  host : env.HOST || '0.0.0.0',
  get serverUrl(){
    return `http://${this.host}:${this.port}`;
  }
};

console.log('***********');
console.log('Configuration file loaded');
console.log('Environment : ', nodeEnv);
console.log('***********');
