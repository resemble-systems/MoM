const { app } = require('@azure/functions');
const { getAboutMoM } = require('../Util/AboutMoMUtil');

app.http('AboutMoMGET', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        let momContent = await getAboutMoM()
        return {
            headers: {
              "content-type": "application/json",
            },
            status: momContent.status,
            body: JSON.stringify(momContent.message),
          };
    }
});
