// This helper uploads an image to Cloudinary and returns the hosted URL.
// I'm using this method across my project so I want it clean, simple,
// and easy for future me to understand.

export const uploadToCloudinary = async (fileInput) => {

  // If a file exists, then only we proceed;
  // otherwise there is nothing to upload.
  if (fileInput) {

    // Creating form data because Cloudinary expects a multipart/form-data request.
    const payload = new FormData();
    payload.append("file", fileInput);

    // These values are tied to my Cloudinary preset and account.
    payload.append("upload_preset", "zosh-social");
    payload.append("cloud_name", "dcpesbd8q");

    // I'm calling Cloudinary's upload API with the required data.
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dcpesbd8q/image/upload`,
      {
        method: "POST",
        body: payload,
      }
    );

    // Cloudinary returns JSON with multiple fields; I only care about the URL.
    const cloudinaryResult = await response.json();

    console.log("Uploaded file URL: ", cloudinaryResult);

    // Returning the hosted image URL so I can store it in DB or state.
    return cloudinaryResult.url;

  } else {
    // If no image was selected, I simply log an error for debugging.
    console.log("No file found to upload");
  }
};
