# AWS SMS API WITH SNS

### Pre-requisites

1. [NPM](https://docs.npmjs.com/cli/install), accessible through your CLI console.
2. [Serverless Framework](https://serverless.com/framework/docs/providers/aws/guide/installation/), installed globally and accessible through your CLI console.
3. Create an AWS account, and a IAM User with the credentials configured in your CLI console.
4. Create an AWS lambda execution role, with the following permissions:
    * AWS SNS access
    * AWS DynamoDB access
    * (optional) Cloudwatch Logs creation

### Usage

- duplicate `.env.example` and rename it `.env`
```sh
$ cp .env.example .env
```
- Replace `.env` values with yours

- Deploy
```sh
$ serverless deploy
```

1. Send Message:

After your serverless stack is deployed, copy the URL with the endpoint and do a POST request. Sending a JSON with the phone number and the message you want to send to `/message/send`:

```
{
    "phone_number": "+2773123456",
    "message": "Hello World!"
}
```
