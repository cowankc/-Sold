const fs   = require('fs');
const jwt   = require('jsonwebtoken');

// use 'utf8' to get string instead of byte array  (512 bit key)
var privateKEY  = fs.readFileSync('./env/private.key', 'utf8');
var publicKEY  = fs.readFileSync('./env/public.key', 'utf8');  

module.exports = {
    sign: (userId) => {

        var payload = {
            userId
        };

        // Token signing options
        var signOptions = {
            issuer:  "Whats Cookin",
            expiresIn:  "1h",    // 1 hour validity
            algorithm:  "RS256"    
        };

        let token = jwt.sign(payload, privateKEY, signOptions);
        return token;
    },

    verify: (token,userId) => {
        var verifyOptions = {
            issuer:  "Whats Cookin",
            expiresIn:  "1h",
            algorithm:  ["RS256"]
        };

        try{
            let verification = jwt.verify(token, publicKEY, verifyOptions);
            return verification;
        }catch (err){
            return false;
        }
    },

    decode: (token) => {
        let decoded = jwt.decode(token, {complete: true});
        return decoded;
    }
}