#Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process


Compress-Archive api/* "api.zip" -Update -Verbose:$false
aws s3 sync . s3://ssspa-dev.claurin.net/owner1/app1 `
    --exclude "*" `
    --include "index.html" `
    --include "assets/*" `
    --include "api.zip" `
    --quiet
