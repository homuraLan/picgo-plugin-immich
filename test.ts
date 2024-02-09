function info() {
    const formData = new FormData();
    const deviceAssetId: string = Date.now().toString();

    formData.append('deviceAssetId', deviceAssetId);
    formData.append('deviceId', 'typescript');
    
    // Use the actual date for fileCreatedAt and fileModifiedAt
    const currentDate = new Date();
    formData.append('fileCreatedAt', currentDate.toISOString());
    formData.append('fileModifiedAt', currentDate.toISOString());

    // Use boolean value instead of string for isFavorite
    formData.append('isFavorite', 'false');

    console.log(formData);
}

// Call the function to execute the code
info();
