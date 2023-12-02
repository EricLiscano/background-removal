/**
 * @param {*} apiKey 
 * @param {*} imageFile 
 * @returns 
 */
export const removeBackground = async (apiKey, imageFile) => {
    const formData = new FormData();
    formData.append('image_file', imageFile);
    formData.append('size', 'auto');
    const response = await fetch(`https://api.remove.bg/v1.0/removebg`, {
        method: 'POST',
        headers: {
            'X-Api-Key': apiKey,
        },
        body: formData,
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const blob = await response.blob();
    return URL.createObjectURL(blob);
};