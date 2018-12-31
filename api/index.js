'use strict';

const fetchResponse = async data => {

    data.custom = "AAA";


    return {
        "isBase64Encoded": false,
        "statusCode": 200,
        "headers": { "Content-Type": "application/json" },
        "body": JSON.stringify(data,null,2)
    };
};
const errorResponse = error => {

    // https://docs.aws.amazon.com/AmazonS3/latest/API/ErrorResponses.html#ErrorCodeList
    const customError = {
        AccessDenied:               { message: "AWS access denied" },
        AccountProblem:             { message: "AWS account problem" },
        AllAccessDisabled:          { message: "AWS access disabled" },
        NoSuchKey:                  { message: "File does not exist." },
        NoSuchBucket:               { message: "Host does not exist." },
        NoSuchBucketPolicy:         { message: "Host does not have an ACL policy." },
        MissingRequiredParameter:   { message: "Missing required parameter." },
        None:                       { message: "Unspecified server error. Please notify a System Admin" },
    }[error.code || "None"];

    const errorMessage = customError ? customError.message : error.message;
    const statusCode = error.statusCode ? error.statusCode : 500;

    console.error(`\nClient: ${errorMessage} [${statusCode}]\nConsole: ${error.stack}`);
    //console.error(JSON.stringify(error.stack));

    return {
        "isBase64Encoded": false,
        "statusCode": statusCode,
        "headers": { "Content-Type": "text/plain" },
        "body": errorMessage
    };
};
const eventResponse = async (event,context) => {

    try {
        return fetchResponse(event);
    }
    catch (err) {
        return errorResponse(err);
    }
};
exports.handler = eventResponse;