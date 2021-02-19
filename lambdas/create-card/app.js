const client = require('data-api-client');

exports.lambdaHandler = async (event, context) => {
    let result = '';
    try {
        console.log('connecting...');
        const data = await client({
            secretArn: 'arn:aws:secretsmanager:us-east-1:1234567890:secret:dummy',
            resourceArn: 'arn:aws:rds:us-east-1:1234567890:cluster:dummy',
            database: 'test',
            region: 'us-east-1',
            endpoint: 'http://local-data-api:80',
            options: {
                endpoint: 'http://local-data-api:80',
            }
        })

        result = await data.query('show databases');
        console.log('result', result);
    } catch (err) {
        console.log(JSON.stringify(err));
        return err;
    }

    return { statusCode: 200, body: JSON.stringify(result) }
};
