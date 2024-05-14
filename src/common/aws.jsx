import axios from 'axios';

export const uploadImage = async (image) => {
  let imgUrl = null;

  try {
    // Step 1: Fetch the pre-signed URL from the server
    const response = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/get-upload-url`);
    const { uploadURL } = response.data;

    // Step 2: Use the pre-signed URL to upload the image
    await axios.put(uploadURL, image, {
      headers: { 'Content-Type': 'image/jpeg' }  // Adjust the content type based on your image type
    });

    // Step 3: Extract the image URL without query parameters
    imgUrl = uploadURL.split("?")[0];
  } catch (error) {
    // Handle errors here
    console.error('Error uploading image:', error);
  }

  return imgUrl;
};