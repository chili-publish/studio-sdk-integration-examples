try {
    # set working directory
    Push-Location -Path "ts-npm-example"
    
    # execute    
    yarn
    yarn upgrade @chili-publish/editor-sdk --latest
    yarn build
}
finally {
    Pop-Location
}

try {
    # set working directory
    Push-Location -Path "ts-connector-example"
    
    # execute    
    yarn
    yarn upgrade @chili-publish/editor-sdk --latest
    yarn build
}
finally {
    Pop-Location
}

try {
    # set working directory
    Push-Location -Path "ts-sketchfab-example"
    
    # execute    
    yarn
    yarn upgrade @chili-publish/editor-sdk --latest
    yarn build
}
finally {
    Pop-Location
}