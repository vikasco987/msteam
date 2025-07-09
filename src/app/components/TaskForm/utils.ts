

// export async function uploadToCloudinary(
//   file: File,
//   setUploadStatus?: (msg: string) => void
// ): Promise<string> {
//   setUploadStatus?.(`Uploading ${file.name}...`);

//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", "magic_upload"); // ✅ Replace with your preset

//   const res = await fetch("https://api.cloudinary.com/v1_1/dp2ta7xca/upload", {
//     method: "POST",
//     body: formData,
//   });

//   if (!res.ok) {
//     setUploadStatus?.(`❌ Failed to upload ${file.name}`);
//     throw new Error("Cloudinary upload failed");
//   }

//   const data = await res.json();
//   setUploadStatus?.(`✅ Uploaded ${file.name}`);
//   return data.secure_url;
// }












// export async function uploadToCloudinary(
//   file: File,
//   setUploadStatus?: (msg: string) => void
// ): Promise<string> {
//   setUploadStatus?.(`Uploading ${file.name}...`);

//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", "magic_upload"); // ✅ Your unsigned preset

//   // ✅ Use "auto" to support both images and PDFs (and other types too)
//   const res = await fetch("https://api.cloudinary.com/v1_1/dp2ta7xca/auto/upload", {
//     method: "POST",
//     body: formData,
//   });

//   if (!res.ok) {
//     setUploadStatus?.(`❌ Failed to upload ${file.name}`);
//     throw new Error("Cloudinary upload failed");
//   }

//   const data = await res.json();
//   setUploadStatus?.(`✅ Uploaded ${file.name}`);
//   return data.secure_url;
// }




// export async function uploadToCloudinary(
//   file: File,
//   setUploadStatus?: (msg: string) => void
// ): Promise<string> {
//   try {
//     setUploadStatus?.(`📤 Uploading ${file.name}...`);

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "magic_upload"); // Your unsigned preset

//     // Use resource_type "auto" to support images, PDFs, videos, etc.
//     const res = await fetch("https://api.cloudinary.com/v1_1/dp2ta7xca/auto/upload", {
//       method: "POST",
//       body: formData,
//     });

//     if (!res.ok) {
//       setUploadStatus?.(`❌ Failed to upload ${file.name}`);
//       throw new Error(`Upload failed with status: ${res.status}`);
//     }

//     const data = await res.json();
//     setUploadStatus?.(`✅ Uploaded ${file.name}`);
//     return data.secure_url;
//   } catch (error) {
//     console.error("Upload Error:", error);
//     setUploadStatus?.(`❌ Upload error: ${file.name}`);
//     throw error;
//   }
// }










// // utils.ts or wherever uploadToCloudinary is defined
// export async function uploadToCloudinary(
//   file: File,
//   setUploadStatus?: (msg: string) => void
// ): Promise<string> {
//   try {
//     setUploadStatus?.(`📤 Uploading ${file.name}...`);

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "magic_upload"); // Must match preset in Cloudinary
//     formData.append("resource_type", "auto"); // handles image, video, raw (pdf)

//     const res = await fetch("https://api.cloudinary.com/v1_1/dp2ta7xca/auto/upload", {
//       method: "POST",
//       body: formData,
//     });

//     if (!res.ok) {
//       const error = await res.text();
//       throw new Error(`Upload failed: ${error}`);
//     }

//     const data = await res.json();

//     // ✅ This URL forces file download (fl_attachment ensures downloadable PDF)
//     const downloadUrl = data.secure_url.replace("/upload/", "/upload/fl_attachment/");

//     setUploadStatus?.(`✅ Uploaded ${file.name}`);
//     return downloadUrl;
//   } catch (error) {
//     console.error("Upload Error:", error);
//     setUploadStatus?.(`❌ Upload error: ${file.name}`);
//     throw error;
//   }
// }
// // utils/uploadToCloudinary.ts

// export async function uploadToCloudinary(
//   file: File,
//   setUploadStatus?: (msg: string) => void
// ): Promise<string> {
//   try {
//     setUploadStatus?.(`📤 Uploading ${file.name}...`);
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "magic_upload"); // Ensure this is signed unsigned version
//     formData.append("resource_type", "auto");

//     const res = await fetch("https://api.cloudinary.com/v1_1/dp2ta7xca/auto/upload", {
//       method: "POST",
//       body: formData,
//     });

//     if (!res.ok) {
//       const err = await res.text();
//       throw new Error(`Upload failed: ${err}`);
//     }

//     const data = await res.json();

//     // ✅ Use fl_attachment exactly once — do NOT prepend or modify the resource type (image/raw)
//     const downloadUrl = data.secure_url.replace(
//       "/upload/",
//       "/upload/fl_attachment/"
//     );

//     setUploadStatus?.(`✅ Uploaded ${file.name}`);
//     return downloadUrl;
//   } catch (error) {
//     console.error("Upload Error:", error);
//     setUploadStatus?.(`❌ Upload error for ${file.name}`);
//     throw error;
//   }
// }













// export async function uploadToCloudinary(
//   file: File,
//   setUploadStatus?: (msg: string) => void
// ): Promise<string> {
//   try {
//     setUploadStatus?.(`📤 Uploading ${file.name}...`);

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "magic_upload");
//     formData.append("resource_type", "auto"); // Let Cloudinary detect type

//     const res = await fetch("https://api.cloudinary.com/v1_1/dp2ta7xca/auto/upload", {
//       method: "POST",
//       body: formData,
//     });

//     if (!res.ok) {
//       const error = await res.text();
//       throw new Error(`Upload failed: ${error}`);
//     }

//     const data = await res.json();
//     const originalUrl = data.secure_url;

//     // ✅ Inject fl_attachment ONLY ONCE
//     const downloadUrl = originalUrl.includes("/upload/fl_attachment/")
//       ? originalUrl
//       : originalUrl.replace("/upload/", "/upload/fl_attachment/");

//     setUploadStatus?.(`✅ Uploaded ${file.name}`);
//     return downloadUrl;
//   } catch (error) {
//     console.error("Upload Error:", error);
//     setUploadStatus?.(`❌ Upload error: ${file.name}`);
//     throw error;
//   }
// }








// export async function uploadToCloudinary(file: File): Promise<string> {
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", "magic_upload");

//   // Set resource_type = raw if uploading PDF
//   const isPdf = file.name.toLowerCase().endsWith(".pdf");
//   const resourceType = isPdf ? "raw" : "auto";

//   const res = await fetch(`https://api.cloudinary.com/v1_1/dp2ta7xca/${resourceType}/upload`, {
//     method: "POST",
//     body: formData,
//   });

//   if (!res.ok) throw new Error("Cloudinary upload failed");
//   const data = await res.json();
//   return data.secure_url;
// }






// export async function uploadToCloudinary(
//   file: File,
//   setUploadStatus?: (msg: string) => void
// ): Promise<string> {
//   setUploadStatus?.(`Uploading ${file.name}...`);

//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", "magic_upload");

//   const isPdf = file.name.toLowerCase().endsWith(".pdf");

//   const uploadUrl = isPdf
//     ? "https://api.cloudinary.com/v1_1/dp2ta7xca/raw/upload"
//     : "https://api.cloudinary.com/v1_1/dp2ta7xca/auto/upload";

//   const res = await fetch(uploadUrl, {
//     method: "POST",
//     body: formData,
//   });

//   if (!res.ok) {
//     setUploadStatus?.(`❌ Failed to upload ${file.name}`);
//     throw new Error("Cloudinary upload failed");
//   }

//   const data = await res.json();
//   setUploadStatus?.(`✅ Uploaded ${file.name}`);
//   return data.secure_url;
// }










export async function uploadToCloudinary(
  file: File,
  setUploadStatus?: (msg: string) => void
): Promise<string> {
  setUploadStatus?.(`Uploading ${file.name}...`);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "magic_upload");

  const isPdf = file.name.toLowerCase().endsWith(".pdf");

  const res = await fetch(
    isPdf
      ? "https://api.cloudinary.com/v1_1/dp2ta7xca/raw/upload"
      : "https://api.cloudinary.com/v1_1/dp2ta7xca/auto/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    setUploadStatus?.(`❌ Failed to upload ${file.name}`);
    throw new Error("Cloudinary upload failed");
  }

  const data = await res.json();
  setUploadStatus?.(`✅ Uploaded ${file.name}`);
  return data.secure_url; // safe to save
}
