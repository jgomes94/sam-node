exports.lambdaHandler = async (event, context) => {
    let result = '';
    try {
        console.log('connecting...');
        const data = await require('data-api-client')({
            secretArn: 'arn:aws:secretsmanager:us-east-1:1234567890:secret:dummy',
            resourceArn: 'arn:aws:rds:us-east-1:1234567890:cluster:dummy',
            database: 'test',
            region: 'us-east-1',
            endpoint: 'http://127.0.0.1:8080',
            options: {
                endpoint: 'http://127.0.0.1:8080',
            }
        })

        result = await data.query('show databases');
        console.log('result', result);
    } catch (err) {
        console.log(JSON.stringify(err));
        return err;
    }

    return { 'body:': JSON.stringify(result) }
};

