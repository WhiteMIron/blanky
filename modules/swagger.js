const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');


const swaggerOptions ={
    swaggerDefinition:{
      openapi: '3.0.0', // 꼭 작성함
      components: {
        // securitySchemes: {
        // bearerAuth: {
        //   type: 'apiKey',
        //   scheme: 'apiKey',
        //  }
        // }
      },
           // 꼭 작성
      info:{
          title : 'Api Documentation',
          version:'1.0.0',
          description : '',
          contact: {
            name: "blanky", // your name
            email: "blanky@gmail.com", // your email
            // url: "", // your website
          },   
        },
        servers: [
          {
            url: "http://3.37.119.81:8000/api", // url
            description: "Remote server", // name
          },
         {
          url: "http://localhost:8000/api", // url
          description: "Local server", // name

         }
        ],

      },

    // apis : ['./routes/api/*.js', './swagger/*'] './components/schemas/*.js
    apis:['./schemas/*.js']
  }

const specs = swaggereJsdoc(swaggerOptions);

module.exports = {
    swaggerUi,
    specs
};
