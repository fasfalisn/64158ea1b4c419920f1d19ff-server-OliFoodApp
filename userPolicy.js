const Controller = require('./controllers/Controller');
const Service = require('./services/Service');
let service;
try {
    service = require('./services/UserService');
} catch (e) {
    console.log('User does not exist.');
}
const jwt = require('jsonwebtoken');


async function userPolicy(request, response, userAction) {

    const authHeader = request.headers.authorization;
    const bearer = 'Bearer ';

    if (!authHeader || !authHeader.startsWith(bearer)) {
        Controller.sendResponse(response,Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
    }

    const token = authHeader.replace(bearer, '');
    const secretKey = "secretKey";

    // Verify Token
    try{
        const decoded = await jwt.verify(token, secretKey);
        const user = await service.getuser({userId: decoded.userid });

        if (!user) {
            Controller.sendResponse(response,Service.rejectResponse(
                e.message || 'Invalid input',
                e.status || 405,
              ));
        }
        else{
            await Controller.handleRequest(request, response, userAction);
        }

    }
    catch (e){
        Controller.sendResponse(response,Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        
    }
            
   

}

module.exports = { userPolicy }