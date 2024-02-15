const { app } = require('@azure/functions');
const { updateAboutMoM } = require('../Util/AboutMoMUtil');

app.http('AboutMoMPOST', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const body = await request.json();
        let momContent = await updateAboutMoM(body)
        return {
            headers: {
              "content-type": "application/json",
            },
            status: momContent.status,
            body: JSON.stringify(momContent.message),
          };
    }
});
