// export async function uploadToCloudinary(file: File): Promise<string> {
//   const formData = new FormData();
//   formData.append("file", file);
//    formData.append("upload_preset", "magic_upload"); // replace with your actual preset

//   const res = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/upload", {
//     method: "POST",
//     body: formData,
//   });

//   if (!res.ok) throw new Error("Cloudinary upload failed");

//   const data = await res.json();
//   return data.secure_url; // or data.url based on your needs
// }




// export async function uploadToCloudinary(file: File): Promise<string> {
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", "magic_upload"); // 👈 your unsigned preset

//   // 👇 replace "your_cloud_name" with your actual Cloudinary cloud name
//   const res = await fetch("https://api.cloudinary.com/v1_1/dp2ta7xca/upload", {
//     method: "POST",
//     body: formData,
//   });

//   if (!res.ok) throw new Error("Cloudinary upload failed");

//   const data = await res.json();
//   return data.secure_url; // 👈 returns the uploaded file URL
// }



export async function uploadToCloudinary(
  file: File,
  setUploadStatus?: (msg: string) => void
): Promise<string> {
  setUploadStatus?.(`Uploading ${file.name}...`);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "magic_upload"); // ✅ Replace with your preset

  const res = await fetch("https://api.cloudinary.com/v1_1/dp2ta7xca/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    setUploadStatus?.(`❌ Failed to upload ${file.name}`);
    throw new Error("Cloudinary upload failed");
  }

  const data = await res.json();
  setUploadStatus?.(`✅ Uploaded ${file.name}`);
  return data.secure_url;
}
