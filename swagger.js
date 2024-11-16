const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API - CSE341',
        description: 'Contacts API - Week 2 Activity'
    },
    host: 'localhost:3000',
    schemes: ['http','https'],
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointFiles, doc);