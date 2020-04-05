'use stric';

const SMSService = require('../services/SMSService.js');

module.exports.handle = async (data) => {

    console.log(data);

    const config = {
        aws: {
            region: process.env.region
        },
        db: {
            tables: {
                smsRecords : process.env.tableSmsRecords
            }
        }
    };

    const smsService = new SMSService(config);
    const parsedData = JSON.parse( data.body );

    try {
        if ( !( 'phone_number' in parsedData) || !( 'message' in parsedData)) {
            return {
                statusCode: 400
            }
        }
    
        let sms = {
            phoneNumber: parsedData.phone_number,
            message    : parsedData.message
        };

        sms.id = await smsService.sendSms( sms.message, sms.phoneNumber );

        console.log("Message ID ", sms.id);

        return {
            statusCode: 201
        };
    } catch(e) {
        return {
            statusCode: 500,
            body: e
        };
    }
    
};