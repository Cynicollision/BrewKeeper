export class Config {
    static readonly mongo = process.env.MONGODB_URI || 'mongodb://localdev:l0cald3v@localhost:27017/brewkeeper'
    static readonly dev = (process.env.NODE_ENV || 'development') === 'development';
    static readonly port = process.env.PORT || '3000';
}