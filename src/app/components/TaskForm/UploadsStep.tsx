// import FileDropzone from "./FileDropzone";

// interface UploadsStepProps {
//   activeTab: "license" | "swiggy" | "zomato";
//   aadhaarFile: File[];
//   panFile: File[];
//   menuCardFiles: File[];
//   selfieFile: File[];
//   phone: string;
//   email: string;
//   shopName: string;
//   location: string;
//   accountNumber: string;
//   ifscCode: string;
//   setAadhaarFile: (files: File[]) => void;
//   setPanFile: (files: File[]) => void;
//   setMenuCardFiles: (files: File[]) => void;
//   setSelfieFile: (files: File[]) => void;
//   setPhone: (value: string) => void;
//   setEmail: (value: string) => void;
//   setShopName: (value: string) => void;
//   setLocation: (value: string) => void;
//   setAccountNumber: (value: string) => void;
//   setIfscCode: (value: string) => void;
// }

// export default function UploadsStep({
//   activeTab,
//   aadhaarFile,
//   panFile,
//   menuCardFiles,
//   selfieFile,
//   phone,
//   email,
//   shopName,
//   location,
//   accountNumber,
//   ifscCode,
//   setAadhaarFile,
//   setPanFile,
//   setMenuCardFiles,
//   setSelfieFile,
//   setPhone,
//   setEmail,
//   setShopName,
//   setLocation,
//   setAccountNumber,
//   setIfscCode,
// }: UploadsStepProps) {
//   const inputClass =
//     "input w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400";

//   return (
//     <>
//       {/* ✅ Section 1: Fill Information */}
//       <div className="mb-6">
//         <h3 className="font-semibold text-lg text-purple-700 mb-2">📄 Fill Information</h3>

//         {activeTab === "license" ? (
//           <>
//             <input
//               type="text"
//               value={shopName}
//               onChange={(e) => setShopName(e.target.value)}
//               placeholder="🏪 Shop Name"
//               className={inputClass}
//             />
//             <input
//               type="text"
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               placeholder="📍 Location"
//               className={inputClass}
//             />
//             <input
//               type="text"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               placeholder="📞 Phone"
//               className={inputClass}
//             />
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="📧 Email"
//               className={inputClass}
//             />
//           </>
//         ) : (
//           <>
//             <input
//               type="text"
//               value={shopName}
//               onChange={(e) => setShopName(e.target.value)}
//               placeholder="🏷️ Outlet Name"
//               className={inputClass}
//             />
//             <input
//               type="text"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               placeholder="📞 Phone"
//               className={inputClass}
//             />
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="📧 Email"
//               className={inputClass}
//             />
//             <input
//               type="text"
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               placeholder="📍 Address"
//               className={inputClass}
//             />
//             <input
//               type="text"
//               value={accountNumber}
//               onChange={(e) => setAccountNumber(e.target.value)}
//               placeholder="🏦 Bank Account Number"
//               className={inputClass}
//             />
//             <input
//               type="text"
//               value={ifscCode}
//               onChange={(e) => setIfscCode(e.target.value)}
//               placeholder="🔢 IFSC Code"
//               className={inputClass}
//             />
//           </>
//         )}
//       </div>

//       {/* ✅ Section 2: Upload Documents */}
//       <div>
//         <h3 className="font-semibold text-lg text-purple-700 mb-2">📤 Upload Documents</h3>

//         {activeTab === "license" ? (
//           <>
//             <FileDropzone onDrop={setAadhaarFile} acceptedFiles={aadhaarFile} label="🆔 Aadhaar Card" />
//             <FileDropzone onDrop={setPanFile} acceptedFiles={panFile} label="💳 PAN Card" />
//             <FileDropzone onDrop={setSelfieFile} acceptedFiles={selfieFile} label="🤳 Selfie" />
//           </>
//         ) : (
//           <>
//             <FileDropzone onDrop={setPanFile} acceptedFiles={panFile} label="💳 PAN Card" />
//             <FileDropzone onDrop={setMenuCardFiles} acceptedFiles={menuCardFiles} label="📄 Menu Card (PDF or Image)" />
//             <FileDropzone onDrop={setAadhaarFile} acceptedFiles={aadhaarFile} label="🍔 Food License" />
//           </>
//         )}
//       </div>
//     </>
//   );
// }










// // src/app/components/TaskForm/UploadsStep.tsx
// "use client";

// import React from "react";
// import FileDropzone from "./FileDropzone";

// interface UploadsStepProps {
//   activeTab: "license" | "swiggy" | "zomato";
//   aadhaarFile: File[];
//   panFile: File[];
//   menuCardFiles: File[];
//   selfieFile: File[];
//   chequeFile: File[];
//   phone: string;
//   email: string;
//   shopName: string;
//   location: string;
//   accountNumber: string;
//   ifscCode: string;
//   setAadhaarFile: (files: File[]) => void;
//   setPanFile: (files: File[]) => void;
//   setMenuCardFiles: (files: File[]) => void;
//   setSelfieFile: (files: File[]) => void;
//   setChequeFile: (files: File[]) => void;
//   setPhone: (value: string) => void;
//   setEmail: (value: string) => void;
//   setShopName: (value: string) => void;
//   setLocation: (value: string) => void;
//   setAccountNumber: (value: string) => void;
//   setIfscCode: (value: string) => void;
// }

// export default function UploadsStep({
//   activeTab,
//   aadhaarFile,
//   panFile,
//   menuCardFiles,
//   selfieFile,
//   chequeFile,
//   phone,
//   email,
//   shopName,
//   location,
//   accountNumber,
//   ifscCode,
//   setAadhaarFile,
//   setPanFile,
//   setMenuCardFiles,
//   setSelfieFile,
//   setChequeFile,
//   setPhone,
//   setEmail,
//   setShopName,
//   setLocation,
//   setAccountNumber,
//   setIfscCode,
// }: UploadsStepProps) {
//   const inputClass =
//     "w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400";

//   return (
//     <>
//       {/* Fill Information */}
//       <div className="mb-6">
//         <h3 className="font-semibold text-lg text-purple-700 mb-2">📄 Fill Information</h3>
//         {activeTab === "license" ? (
//           <>
//             <input
//               type="text"
//               value={shopName}
//               onChange={e => setShopName(e.target.value)}
//               placeholder="🏪 Shop Name"
//               className={inputClass}
//             />
//             <input
//               type="text"
//               value={location}
//               onChange={e => setLocation(e.target.value)}
//               placeholder="📍 Location"
//               className={inputClass}
//             />
//             <input
//               type="text"
//               value={phone}
//               onChange={e => setPhone(e.target.value)}
//               placeholder="📞 Phone"
//               className={inputClass}
//             />
//             <input
//               type="email"
//               value={email}
//               onChange={e => setEmail(e.target.value)}
//               placeholder="📧 Email"
//               className={inputClass}
//             />
//           </>
//         ) : (
//           <>
//             <input
//               type="text"
//               value={shopName}
//               onChange={e => setShopName(e.target.value)}
//               placeholder="🏷️ Outlet Name"
//               className={inputClass}
//             />
//             <input
//               type="text"
//               value={phone}
//               onChange={e => setPhone(e.target.value)}
//               placeholder="📞 Phone"
//               className={inputClass}
//             />
//             <input
//               type="email"
//               value={email}
//               onChange={e => setEmail(e.target.value)}
//               placeholder="📧 Email"
//               className={inputClass}
//             />
//             <input
//               type="text"
//               value={location}
//               onChange={e => setLocation(e.target.value)}
//               placeholder="📍 Address"
//               className={inputClass}
//             />
//             <input
//               type="text"
//               value={accountNumber}
//               onChange={e => setAccountNumber(e.target.value)}
//               placeholder="🏦 Bank Account Number"
//               className={inputClass}
//             />
//             <input
//               type="text"
//               value={ifscCode}
//               onChange={e => setIfscCode(e.target.value)}
//               placeholder="🔢 IFSC Code"
//               className={inputClass}
//             />
//           </>
//         )}
//       </div>

//       {/* Upload Documents */}
//       <div>
//         <h3 className="font-semibold text-lg text-purple-700 mb-2">📤 Upload Documents</h3>
//         {activeTab === "license" ? (
//           <>
//             <FileDropzone
//               onDrop={setAadhaarFile}
//               acceptedFiles={aadhaarFile}
//               label="🆔 Aadhaar Card"
//             />
//             <FileDropzone
//               onDrop={setPanFile}
//               acceptedFiles={panFile}
//               label="💳 PAN Card"
//             />
//             <FileDropzone
//               onDrop={setSelfieFile}
//               acceptedFiles={selfieFile}
//               label="🤳 Selfie Photo"
//             />
//             <FileDropzone
//               onDrop={setChequeFile}
//               acceptedFiles={chequeFile}
//               label="🏦 Cancelled Cheque"
//             />
//           </>
//         ) : (
//           <>
//             <FileDropzone
//               onDrop={setPanFile}
//               acceptedFiles={panFile}
//               label="💳 PAN Card"
//             />
//             <FileDropzone
//               onDrop={setMenuCardFiles}
//               acceptedFiles={menuCardFiles}
//               label="📄 Menu Card (PDF or Image)"
//             />
//             <FileDropzone
//               onDrop={setAadhaarFile}
//               acceptedFiles={aadhaarFile}
//               label="🍔 Food License"
//             />
//           </>
//         )}
//       </div>
//     </>
//   );
// }







"use client";

import React from "react";
import FileDropzone from "./FileDropzone";

interface UploadsStepProps {
  activeTab: "license" | "swiggy" | "zomato";
  aadhaarFile: File[];
  panFile: File[];
  menuCardFiles: File[];
  selfieFile: File[];
  chequeFile: File[];
  phone: string;
  email: string;
  shopName: string;
  location: string;
  accountNumber: string;
  ifscCode: string;
  setAadhaarFile: (files: File[]) => void;
  setPanFile: (files: File[]) => void;
  setMenuCardFiles: (files: File[]) => void;
  setSelfieFile: (files: File[]) => void;
  setChequeFile: (files: File[]) => void;
  setPhone: (value: string) => void;
  setEmail: (value: string) => void;
  setShopName: (value: string) => void;
  setLocation: (value: string) => void;
  setAccountNumber: (value: string) => void;
  setIfscCode: (value: string) => void;
}

export default function UploadsStep({
  activeTab,
  aadhaarFile,
  panFile,
  menuCardFiles,
  selfieFile,
  chequeFile,
  phone,
  email,
  shopName,
  location,
  accountNumber,
  ifscCode,
  setAadhaarFile,
  setPanFile,
  setMenuCardFiles,
  setSelfieFile,
  setChequeFile,
  setPhone,
  setEmail,
  setShopName,
  setLocation,
  setAccountNumber,
  setIfscCode,
}: UploadsStepProps) {
  const inputClass =
    "w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400";

  const isValidUrl = (str: string) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <>
      {/* Fill Information */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg text-purple-700 mb-2">📄 Fill Information</h3>
        {activeTab === "license" ? (
          <>
            <input
              type="text"
              value={shopName}
              onChange={e => setShopName(e.target.value)}
              placeholder="🏪 Shop Name"
              className={inputClass}
            />
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="📍 Location"
              className={inputClass}
            />
            {isValidUrl(location) && (
              <div className="border border-purple-300 bg-purple-50 p-4 rounded-lg shadow-sm mb-4">
                <p className="text-sm text-gray-600 mb-1">📍 Location Link:</p>
                <a
                  href={location}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                >
                  🔗 View on Map
                </a>
              </div>
            )}
            <input
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="📞 Phone"
              className={inputClass}
            />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="📧 Email"
              className={inputClass}
            />
          </>
        ) : (
          <>
            <input
              type="text"
              value={shopName}
              onChange={e => setShopName(e.target.value)}
              placeholder="🏷️ Outlet Name"
              className={inputClass}
            />
            <input
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="📞 Phone"
              className={inputClass}
            />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="📧 Email"
              className={inputClass}
            />
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="📍 Address (Google Maps link allowed)"
              className={inputClass}
            />
            {isValidUrl(location) && (
              <div className="border border-purple-300 bg-purple-50 p-4 rounded-lg shadow-sm mb-4">
                <p className="text-sm text-gray-600 mb-1">📍 Location Link:</p>
                <a
                  href={location}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                >
                  🔗 View on Map
                </a>
              </div>
            )}
            <input
              type="text"
              value={accountNumber}
              onChange={e => setAccountNumber(e.target.value)}
              placeholder="🏦 Bank Account Number"
              className={inputClass}
            />
            <input
              type="text"
              value={ifscCode}
              onChange={e => setIfscCode(e.target.value)}
              placeholder="🔢 IFSC Code"
              className={inputClass}
            />
          </>
        )}
      </div>

      {/* Upload Documents */}
      <div>
        <h3 className="font-semibold text-lg text-purple-700 mb-2">📤 Upload Documents</h3>
        {activeTab === "license" ? (
          <>
            <FileDropzone
              onDrop={setAadhaarFile}
              acceptedFiles={aadhaarFile}
              label="🆔 Aadhaar Card"
            />
            <FileDropzone
              onDrop={setPanFile}
              acceptedFiles={panFile}
              label="💳 PAN Card"
            />
            <FileDropzone
              onDrop={setSelfieFile}
              acceptedFiles={selfieFile}
              label="🤳 Selfie Photo"
            />
            <FileDropzone
              onDrop={setChequeFile}
              acceptedFiles={chequeFile}
              label="🏦 Cancelled Cheque"
            />
          </>
        ) : (
          <>
            <FileDropzone
              onDrop={setPanFile}
              acceptedFiles={panFile}
              label="💳 PAN Card"
            />
            <FileDropzone
              onDrop={setMenuCardFiles}
              acceptedFiles={menuCardFiles}
              label="📄 Menu Card (PDF or Image)"
            />
            <FileDropzone
              onDrop={setAadhaarFile}
              acceptedFiles={aadhaarFile}
              label="🍔 Food License"
            />
          </>
        )}
      </div>
    </>
  );
}
