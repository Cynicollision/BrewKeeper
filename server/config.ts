export class Config {
    static readonly isDev = (process.env.NODE_ENV || 'development') === 'development';
    static readonly serverPort = 3000;
}