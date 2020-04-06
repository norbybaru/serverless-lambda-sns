'use stric';

const SMSService = require('../services/SMSService.js');

module.exports.handle = async (data) => {

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
                statusCode: 400,
                body: JSON.stringify(
                    {
                      message: 'Invalid parameters',
                      erros: {
                          'phone_number': 'required',
                          'message': 'required'
                      },
                    },
                    null,
                    2
                ),
            }
        }
    
        let sms = {
            phoneNumber: parsedData.phone_number,
            message    : parsedData.message
        };

        sms.id = await smsService.sendSms( sms.message, sms.phoneNumber );

        console.log("Message ID ", sms.id);

        return {
            statusCode: 201,
            body: JSON.stringify(
                {
                  message: 'Message sent to ' + sms.phoneNumber
                },
                null,
                2
            ),
        };
    } catch(e) {
        return {
            statusCode: 500,
            body: e
        };
    }
    
};