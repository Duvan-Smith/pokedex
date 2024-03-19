export const EnvConfiguration = () => ({
    environment: process.env.NODE_ENV || 'dev',
    mongodbpokemon: process.env.MONGODBPOKEMON,
    mongodbtienda: process.env.MONGODBTIENDA,
    port: +process.env.PORT || 3002,
    defaultlimit: +process.env.DEFAULT_LIMIT || 5,
});