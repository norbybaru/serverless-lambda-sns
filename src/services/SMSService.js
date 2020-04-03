'use strict';

const AWS = require('aws-sdk');

class SMSService
{
    /**
     * 
     * @param {Object} config 
     */
    constructor(config)
    {
        this.config = config;
        AWS.config.update({ region: this.config.aws.region })
        this.SNS = new AWS.SNS( { apiVersion: '2010-03-31' } );
    }

    /**
     * 
     * @param {String} message 
     * @param {String} phoneNumber 
     * @returns {Promise|String}
     */
    async sendSms(message, phoneNumber)
    {
        let data = {
            Message: message,
            PhoneNumber: phoneNumber,
        };

        console.log(data);

        try {
            let response = await this.SNS.publish(data).promise();
            return response.MessageId;
        } catch(e) {
            console.log("Error occured during process");
            console.log("sendSmsError", e);

            throw e;
        }
    }

    /**
     * @returns {Promise}
     */
    async getSmsAtrribute()
    {
        let data = {
            attributes: [
                'DefaultSMSType',
                'ATTRIBUTE_NAME'
                /* more items */
              ]
        };

        let response = await this.SNS.getSMSAttributes(data).promise();

        return response;
    }

    /**
     * @returns {Promise}
     */
    async setSmsAttribute()
    {
        let data = {
            attributes: { /* required */
                'DefaultSMSType': 'Transactional', /* highest reliability */
                //'DefaultSMSType': 'Promotional' /* lowest cost */
              }
        }

        let response = await this.SNS.setSMSAttributes(data).promise();

        return response;
    }
}

module.exports = SMSService;