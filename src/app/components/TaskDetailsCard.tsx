// "use client";

// import React from "react";
// import Image from "next/image";

// interface Props {
//   task: {
//     title: string;
//     description?: string;
//     dueDate?: string;
//     priority?: string;
//     tags?: string[];
//     assigner?: { name?: string; email?: string };
//     assignee?: { name?: string; email?: string };
//     customFields?: {
//       phone?: string;
//       email?: string;
//       shopName?: string;
//       outletName?: string;
//       location?: string;
//       accountNumber?: string;
//       ifscCode?: string;
//       fields?: {
//         label: string;
//         value: string;
//         files?: string[];
//       }[];
//     };
//     attachments?: string[];
//   };
// }

// // ✅ Get a label from file name
// const getLabelFromUrl = (url: string): string => {
//   try {
//     const fileName = url.split("/").pop()?.toLowerCase() || "";
//     if (fileName.includes("aadhaar")) return "🆔 Aadhaar Card";
//     if (fileName.includes("pan")) return "💳 PAN Card";
//     if (fileName.includes("selfie")) return "🤳 Selfie Photo";
//     if (fileName.includes("cheque")) return "🏦 Cancelled Cheque";
//     if (fileName.includes("license")) return "🍔 Food License";
//     return "📎 Attachment";
//   } catch {
//     return "📎 Attachment";
//   }
// };

// // ✅ Force download for Cloudinary
// const getDownloadUrl = (url: string): string => {
//   if (!url.includes("/upload/")) return url;
//   const [base, rest] = url.split("/upload/");
//   return `${base}/upload/fl_attachment/${rest}`;
// };

// export default function TaskDetailsCard({ task }: Props) {
//   const custom = task.customFields || {};
//   const showTitle =
//     task.title !== custom.shopName && task.title !== custom.outletName;

//   return (
//     <div className="text-sm text-gray-700 space-y-2">
//       {showTitle && (
//         <p className="font-semibold text-purple-800 text-lg">{task.title}</p>
//       )}

//       {task.description && (
//         <p>
//           <strong>📝 Description:</strong> {task.description}
//         </p>
//       )}

//       {task.dueDate && (
//         <p>
//           <strong>📅 Due Date:</strong>{" "}
//           {new Date(task.dueDate).toLocaleDateString()}
//         </p>
//       )}

//       {task.priority && (
//         <p>
//           <strong>🔥 Priority:</strong> {task.priority}
//         </p>
//       )}

//       {/* ✅ Custom fields */}
//       {custom.shopName && <p><strong>🏪 Shop Name:</strong> {custom.shopName}</p>}
//       {custom.outletName && <p><strong>🏷️ Outlet Name:</strong> {custom.outletName}</p>}
//       {custom.phone && <p><strong>📞 Phone:</strong> {custom.phone}</p>}
//       {custom.email && <p><strong>📧 Email:</strong> {custom.email}</p>}
//       {custom.location && <p><strong>📍 Location:</strong> {custom.location}</p>}
//       {custom.accountNumber && <p><strong>🏦 Account No.:</strong> {custom.accountNumber}</p>}
//       {custom.ifscCode && <p><strong>🔢 IFSC Code:</strong> {custom.ifscCode}</p>}

//       {task.tags && task.tags.length > 0 && (
//         <p><strong>🏷️ Tags:</strong> {task.tags.join(", ")}</p>
//       )}

//       {/* ✅ Static Attachments */}
//       {task.attachments && task.attachments.length > 0 && (
//         <div>
//           <strong>📎 Attachments:</strong>
//           <ul className="list-disc ml-6 space-y-2">
//             {task.attachments.map((url, i) => {
//               const label = getLabelFromUrl(url);
//               const downloadUrl = getDownloadUrl(url);
//               const fileName = url.split("/").pop() || `attachment-${i}`;
//               return (
//                 <li key={i}>
//                   <a
//                     href={downloadUrl}
//                     download={fileName}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 underline hover:text-blue-800"
//                   >
//                     {label}
//                   </a>
//                   {url.match(/\.(jpeg|jpg|png|webp|gif)$/i) && (
//                     <div className="mt-1">
//                       <Image
//                         src={url}
//                         alt="Attachment Preview"
//                         width={128}
//                         height={96}
//                         className="rounded shadow"
//                       />
//                     </div>
//                   )}
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       )}

//       {/* ✅ Dynamic Custom Field Files */}
//       {custom.fields && custom.fields.length > 0 && (
//         <div>
//           <strong>📎 Custom Field Files:</strong>
//           <ul className="list-disc ml-6 space-y-2">
//             {custom.fields.map((field, i) => (
//               <li key={i}>
//                 <p className="font-medium">{field.label}:</p>
//                 {field.files && field.files.length > 0 ? (
//                   <ul className="ml-4">
//                     {field.files.map((url, j) => (
//                       <li key={j}>
//                         <a
//                           href={getDownloadUrl(url)}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           download
//                           className="text-blue-600 underline hover:text-blue-800"
//                         >
//                           {url.split("/").pop()}
//                         </a>
//                         {url.match(/\.(jpeg|jpg|png|webp|gif)$/i) && (
//                           <div className="mt-1">
//                             <Image
//                               src={url}
//                               alt="Custom Field Preview"
//                               width={128}
//                               height={96}
//                               className="rounded shadow"
//                             />
//                           </div>
//                         )}
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p className="text-gray-500 text-sm">No files</p>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* ✅ Assigner / Assignee */}
//       {(task.assigner?.name || task.assignee?.name) && (
//         <div>
//           {task.assigner?.name && (
//             <p>
//               <strong>🧑‍💼 Assigned By:</strong> {task.assigner.name}
//             </p>
//           )}
//           {task.assignee?.name && (
//             <p>
//               <strong>🙋 Assigned To:</strong> {task.assignee.name}
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }












// // src/app/components/TaskDetailsCard.tsx
// "use client";

// import React from "react";

// // props shape
// interface Props {
//   task: {
//     title: string;
//     description?: string;
//     dueDate?: string;
//     priority?: string;
//     tags?: string[];
//     assigner?: { name?: string; email?: string };
//     assignee?: { name?: string; email?: string };
//     customFields?: {
//       shopName?: string;
//       outletName?: string;
//       phone?: string;
//       email?: string;
//       location?: string;
//       accountNumber?: string;
//       ifscCode?: string;
//     };
//     attachments?: string[]; // array of Cloudinary URLs
//   };
// }

// // derive a friendly label from the filename
// const getLabelFromUrl = (url: string): string => {
//   const fileName = url.split("/").pop()?.toLowerCase() || "";
//   if (fileName.includes("aadhaar")) return "🆔 Aadhaar Card";
//   if (fileName.includes("pan"))      return "💳 PAN Card";
//   if (fileName.includes("selfie"))   return "🤳 Selfie Photo";
//   if (fileName.includes("license"))  return "🍔 Food License";
//   if (fileName.includes("menu"))     return "📄 Menu Card";
//   return "📎 Attachment";
// };

// // force Cloudinary download flag
// const getDownloadUrl = (url: string): string => {
//   if (!url.includes("/upload/")) return url;
//   const [base, rest] = url.split("/upload/");
//   return `${base}/upload/fl_attachment/${rest}`;
// };

// export default function TaskDetailsCard({ task }: Props) {
//   const cf = task.customFields || {};

//   // only show the main title if it isn't just the same as the shop/outlet name
//   const showTitle =
//     task.title !== cf.shopName && task.title !== cf.outletName;

//   return (
//     <div className="text-sm text-gray-700 space-y-2">
//       {showTitle && (
//         <h3 className="text-lg font-semibold text-purple-800">{task.title}</h3>
//       )}

//       {task.description && (
//         <p><strong>📝 Description:</strong> {task.description}</p>
//       )}

//       {task.dueDate && (
//         <p><strong>📅 Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
//       )}

//       {task.priority && (
//         <p><strong>🔥 Priority:</strong> {task.priority}</p>
//       )}

//       {/* filled details */}
//       {cf.shopName && (
//         <p><strong>🏪 Shop Name:</strong> {cf.shopName}</p>
//       )}
//       {cf.outletName && (
//         <p><strong>🏷️ Outlet Name:</strong> {cf.outletName}</p>
//       )}
//       {cf.phone && (
//         <p><strong>📞 Phone:</strong> {cf.phone}</p>
//       )}
//       {cf.email && (
//         <p><strong>📧 Email:</strong> {cf.email}</p>
//       )}
//       {cf.location && (
//         <p><strong>📍 Address:</strong> {cf.location}</p>
//       )}
//       {cf.accountNumber && (
//         <p><strong>🏦 Bank Account No.:</strong> {cf.accountNumber}</p>
//       )}
//       {cf.ifscCode && (
//         <p><strong>🔢 IFSC Code:</strong> {cf.ifscCode}</p>
//       )}

//       {task.tags && task.tags.length > 0 && (
//         <p><strong>🏷️ Tags:</strong> {task.tags.join(", ")}</p>
//       )}

//       {/* attachments list */}
//       {task.attachments && task.attachments.length > 0 && (
//         <div>
//           <strong>📎 Attachments:</strong>
//           <ul className="list-disc ml-6 space-y-1">
//             {task.attachments.map((url, i) => {
//               const fileName = url.split("/").pop() || `file-${i}`;
//               const downloadUrl = getDownloadUrl(url);
//               return (
//                 <li key={i}>
//                   <a
//                     href={downloadUrl}
//                     download={fileName}
//                     className="text-blue-600 underline hover:text-blue-800 transition"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     {getLabelFromUrl(url)}
//                   </a>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       )}

//       {/* who assigned/owns */}
//       {(task.assigner?.name || task.assignee?.name) && (
//         <div>
//           {task.assigner?.name && (
//             <p><strong>🧑‍💼 Assigned By:</strong> {task.assigner.name}</p>
//           )}
//           {task.assignee?.name && (
//             <p><strong>🙋 Assigned To:</strong> {task.assignee.name}</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }















// "use client";

// import React from "react";

// // props shape
// interface Props {
//   task: {
//     title: string;
//     description?: string;
//     dueDate?: string;
//     priority?: string;
//     tags?: string[];
//     assigner?: { name?: string; email?: string };
//     assignee?: { name?: string; email?: string };
//     customFields?: {
//       shopName?: string;
//       outletName?: string;
//       phone?: string;
//       email?: string;
//       location?: string;
//       accountNumber?: string;
//       ifscCode?: string;
//     };
//     attachments?: string[]; // array of Cloudinary URLs
//   };
// }

// // derive a friendly label from the filename
// const getLabelFromUrl = (url: string): string => {
//   const fileName = url.split("/").pop()?.toLowerCase() || "";
//   if (fileName.includes("aadhaar")) return "🆔 Aadhaar Card";
//   if (fileName.includes("pan")) return "💳 PAN Card";
//   if (fileName.includes("selfie")) return "🤳 Selfie Photo";
//   if (fileName.includes("license")) return "🍔 Food License";
//   if (fileName.includes("menu")) return "📄 Menu Card";
//   return "📎 Attachment";
// };

// // force Cloudinary download flag
// const getDownloadUrl = (url: string): string => {
//   if (!url.includes("/upload/")) return url;
//   const [base, rest] = url.split("/upload/");
//   return `${base}/upload/fl_attachment/${rest}`;
// };

// // helper to validate URL
// const isValidUrl = (str: string): boolean => {
//   try {
//     new URL(str);
//     return true;
//   } catch {
//     return false;
//   }
// };

// export default function TaskDetailsCard({ task }: Props) {
//   const cf = task.customFields || {};

//   // only show the main title if it isn't just the same as the shop/outlet name
//   const showTitle =
//     task.title !== cf.shopName && task.title !== cf.outletName;

//   return (
//     <div className="text-sm text-gray-700 space-y-2">
//       {showTitle && (
//         <h3 className="text-lg font-semibold text-purple-800">{task.title}</h3>
//       )}

//       {task.description && (
//         <p><strong>📝 Description:</strong> {task.description}</p>
//       )}

//       {task.dueDate && (
//         <p><strong>📅 Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
//       )}

//       {task.priority && (
//         <p><strong>🔥 Priority:</strong> {task.priority}</p>
//       )}

//       {/* filled details */}
//       {cf.shopName && (
//         <p><strong>🏪 Shop Name:</strong> {cf.shopName}</p>
//       )}
//       {cf.outletName && (
//         <p><strong>🏷️ Outlet Name:</strong> {cf.outletName}</p>
//       )}
//       {cf.phone && (
//         <p><strong>📞 Phone:</strong> {cf.phone}</p>
//       )}
//       {cf.email && (
//         <p><strong>📧 Email:</strong> {cf.email}</p>
//       )}
//       {cf.location && (
//         isValidUrl(cf.location) ? (
//           <p>
//             <strong>📍 Address:</strong>{" "}
//             <a
//               href={cf.location}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-block px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
//             >
//               🔗 View on Map
//             </a>
//           </p>
//         ) : (
//           <p><strong>📍 Address:</strong> {cf.location}</p>
//         )
//       )}
//       {cf.accountNumber && (
//         <p><strong>🏦 Bank Account No.:</strong> {cf.accountNumber}</p>
//       )}
//       {cf.ifscCode && (
//         <p><strong>🔢 IFSC Code:</strong> {cf.ifscCode}</p>
//       )}

//       {task.tags && task.tags.length > 0 && (
//         <p><strong>🏷️ Tags:</strong> {task.tags.join(", ")}</p>
//       )}

//       {/* attachments list */}
//       {task.attachments && task.attachments.length > 0 && (
//         <div>
//           <strong>📎 Attachments:</strong>
//           <ul className="list-disc ml-6 space-y-1">
//             {task.attachments.map((url, i) => {
//               const fileName = url.split("/").pop() || `file-${i}`;
//               const downloadUrl = getDownloadUrl(url);
//               return (
//                 <li key={i}>
//                   <a
//                     href={downloadUrl}
//                     download={fileName}
//                     className="text-blue-600 underline hover:text-blue-800 transition"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     {getLabelFromUrl(url)}
//                   </a>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       )}

//       {/* who assigned/owns */}
//       {(task.assigner?.name || task.assignee?.name) && (
//         <div>
//           {task.assigner?.name && (
//             <p><strong>🧑‍💼 Assigned By:</strong> {task.assigner.name}</p>
//           )}
//           {task.assignee?.name && (
//             <p><strong>🙋 Assigned To:</strong> {task.assignee.name}</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }












// "use client";

// import React from "react";
// import { FaRegClipboard } from "react-icons/fa";
// import toast from "react-hot-toast";

// interface Props {
//   task: {
//     title: string;
//     description?: string;
//     dueDate?: string;
//     priority?: string;
//     tags?: string[];
//     assigner?: { name?: string; email?: string };
//     assignee?: { name?: string; email?: string };
//     customFields?: {
//       shopName?: string;
//       outletName?: string;
//       phone?: string;
//       email?: string;
//       location?: string;
//       accountNumber?: string;
//       ifscCode?: string;
//     };
//     attachments?: string[];
//   };
// }

// const getLabelFromUrl = (url: string): string => {
//   const fileName = url.split("/").pop()?.toLowerCase() || "";
//   if (fileName.includes("aadhaar")) return "🆔 Aadhaar Card";
//   if (fileName.includes("pan")) return "💳 PAN Card";
//   if (fileName.includes("selfie")) return "🤳 Selfie Photo";
//   if (fileName.includes("license")) return "🍔 Food License";
//   if (fileName.includes("menu")) return "📄 Menu Card";
//   return "📎 Attachment";
// };

// const getDownloadUrl = (url: string): string => {
//   if (!url.includes("/upload/")) return url;
//   const [base, rest] = url.split("/upload/");
//   return `${base}/upload/fl_attachment/${rest}`;
// };

// const isValidUrl = (str: string): boolean => {
//   try {
//     new URL(str);
//     return true;
//   } catch {
//     return false;
//   }
// };

// const CopyIcon = ({ text }: { text: string }) => (
//   <FaRegClipboard
//     onClick={() => {
//       navigator.clipboard.writeText(text);
//       toast.success("Copied!");
//     }}
//     className="inline ml-2 text-gray-500 cursor-pointer hover:text-purple-600"
//     title="Copy"
//   />
// );

// export default function TaskDetailsCard({ task }: Props) {
//   const cf = task.customFields || {};
//   const showTitle = task.title !== cf.shopName && task.title !== cf.outletName;

//   return (
//     <div className="text-sm text-gray-700 space-y-2">
//       {showTitle && (
//         <h3 className="text-lg font-semibold text-purple-800">
//           {task.title} <CopyIcon text={task.title} />
//         </h3>
//       )}

//       {task.description && (
//         <p>
//           <strong>📝 Description:</strong> {task.description}
//           <CopyIcon text={task.description} />
//         </p>
//       )}

//       {task.dueDate && (
//         <p>
//           <strong>📅 Due Date:</strong>{" "}
//           {new Date(task.dueDate).toLocaleDateString()}
//         </p>
//       )}

//       {task.priority && (
//         <p>
//           <strong>🔥 Priority:</strong> {task.priority}
//           <CopyIcon text={task.priority} />
//         </p>
//       )}

//       {cf.shopName && (
//         <p>
//           <strong>🏪 Shop Name:</strong> {cf.shopName}
//           <CopyIcon text={cf.shopName} />
//         </p>
//       )}
//       {cf.outletName && (
//         <p>
//           <strong>🏷️ Outlet Name:</strong> {cf.outletName}
//           <CopyIcon text={cf.outletName} />
//         </p>
//       )}
//       {cf.phone && (
//         <p>
//           <strong>📞 Phone:</strong> {cf.phone}
//           <CopyIcon text={cf.phone} />
//         </p>
//       )}
//       {cf.email && (
//         <p>
//           <strong>📧 Email:</strong> {cf.email}
//           <CopyIcon text={cf.email} />
//         </p>
//       )}
//       {cf.location &&
//         (isValidUrl(cf.location) ? (
//           <p>
//             <strong>📍 Address:</strong>{" "}
//             <a
//               href={cf.location}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-block px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
//             >
//               🔗 View on Map
//             </a>
//             <CopyIcon text={cf.location} />
//           </p>
//         ) : (
//           <p>
//             <strong>📍 Address:</strong> {cf.location}
//             <CopyIcon text={cf.location} />
//           </p>
//         ))}

//       {cf.accountNumber && (
//         <p>
//           <strong>🏦 Account No.:</strong> {cf.accountNumber}
//           <CopyIcon text={cf.accountNumber} />
//         </p>
//       )}
//       {cf.ifscCode && (
//         <p>
//           <strong>🔢 IFSC Code:</strong> {cf.ifscCode}
//           <CopyIcon text={cf.ifscCode} />
//         </p>
//       )}

//       {task.tags && task.tags.length > 0 && (
//         <p>
//           <strong>🏷️ Tags:</strong> {task.tags.join(", ")}
//           <CopyIcon text={task.tags.join(", ")} />
//         </p>
//       )}

//       {task.attachments && task.attachments.length > 0 && (
//         <div>
//           <strong>📎 Attachments:</strong>
//           <ul className="list-disc ml-6 space-y-1">
//             {task.attachments.map((url, i) => {
//               const fileName = url.split("/").pop() || `file-${i}`;
//               const downloadUrl = getDownloadUrl(url);
//               return (
//                 <li key={i}>
//                   <a
//                     href={downloadUrl}
//                     download={fileName}
//                     className="text-blue-600 underline hover:text-blue-800 transition"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     {getLabelFromUrl(url)}
//                   </a>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       )}

//       {(task.assigner?.name || task.assignee?.name) && (
//         <div>
//           {task.assigner?.name && (
//             <p>
//               <strong>🧑‍💼 Assigned By:</strong> {task.assigner.name}
//               <CopyIcon text={task.assigner.name} />
//             </p>
//           )}
//           {task.assignee?.name && (
//             <p>
//               <strong>🙋 Assigned To:</strong> {task.assignee.name}
//               <CopyIcon text={task.assignee.name} />
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }











"use client";

import React from "react";
import { FaRegClipboard } from "react-icons/fa";
import toast from "react-hot-toast";

interface Props {
  task: {
    title: string;
    description?: string;
    dueDate?: string;
    priority?: string;
    tags?: string[];
    assigner?: { name?: string; email?: string };
    assignee?: { name?: string; email?: string };
    customFields?: {
      shopName?: string;
      outletName?: string;
      phone?: string;
      email?: string;
      location?: string;
      accountNumber?: string;
      ifscCode?: string;
    };
    attachments?: string[];
  };
}

const getLabelFromUrl = (url: string): string => {
  const fileName = url.split("/").pop()?.toLowerCase() || "";
  if (fileName.includes("aadhaar")) return "🆔 Aadhaar Card";
  if (fileName.includes("pan")) return "💳 PAN Card";
  if (fileName.includes("selfie")) return "🤳 Selfie Photo";
  if (fileName.includes("license")) return "🍔 Food License";
  if (fileName.includes("menu")) return "📄 Menu Card";
  return "📎 Attachment";
};

const getDownloadUrl = (url: string): string => {
  if (!url.includes("/upload/")) return url;
  const [base, rest] = url.split("/upload/");
  return `${base}/upload/fl_attachment/${rest}`;
};

const isValidUrl = (str: string): boolean => {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};

const CopyIcon = ({ text }: { text: string }) => (
  <FaRegClipboard
    onClick={() => {
      navigator.clipboard.writeText(text);
      toast.success("Copied!");
    }}
    className="inline ml-2 text-gray-500 cursor-pointer hover:text-purple-600"
    title="Copy"
  />
);

export default function TaskDetailsCard({ task }: Props) {
  const cf = task.customFields || {};

  const showTitle = task.title !== cf.shopName && task.title !== cf.outletName;

  const allValues = [
    task.title,
    task.description,
    cf.shopName,
    cf.outletName,
    cf.phone,
    cf.email,
    cf.location,
    cf.accountNumber,
    cf.ifscCode,
    task.priority,
    task.tags?.join(", "),
    task.assigner?.name,
    task.assignee?.name,
  ]
    .filter(Boolean)
    .join("\n");

  const copyAllFields = () => {
    navigator.clipboard.writeText(allValues);
    toast.success("All details copied!");
  };

  return (
    <div className="text-sm text-gray-700 space-y-2">
      <div className="flex items-center justify-between">
        {showTitle && (
          <h3 className="text-lg font-semibold text-purple-800">
            {task.title}
          </h3>
        )}
        <button
          onClick={copyAllFields}
          className="text-sm text-gray-500 hover:text-purple-700 flex items-center gap-1"
        >
          <FaRegClipboard />
          Copy All
        </button>
      </div>

      {task.description && (
        <p>
          <strong>📝 Description:</strong> {task.description}
          <CopyIcon text={task.description} />
        </p>
      )}
      {task.dueDate && (
        <p>
          <strong>📅 Due Date:</strong>{" "}
          {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}
      {task.priority && (
        <p>
          <strong>🔥 Priority:</strong> {task.priority}
          <CopyIcon text={task.priority} />
        </p>
      )}
      {cf.shopName && (
        <p>
          <strong>🏪 Shop Name:</strong> {cf.shopName}
          <CopyIcon text={cf.shopName} />
        </p>
      )}
      {cf.outletName && (
        <p>
          <strong>🏷️ Outlet Name:</strong> {cf.outletName}
          <CopyIcon text={cf.outletName} />
        </p>
      )}
      {cf.phone && (
        <p>
          <strong>📞 Phone:</strong> {cf.phone}
          <CopyIcon text={cf.phone} />
        </p>
      )}
      {cf.email && (
        <p>
          <strong>📧 Email:</strong> {cf.email}
          <CopyIcon text={cf.email} />
        </p>
      )}
      {cf.location &&
        (isValidUrl(cf.location) ? (
          <p>
            <strong>📍 Address:</strong>{" "}
            <a
              href={cf.location}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
            >
              🔗 View on Map
            </a>
            <CopyIcon text={cf.location} />
          </p>
        ) : (
          <p>
            <strong>📍 Address:</strong> {cf.location}
            <CopyIcon text={cf.location} />
          </p>
        ))}
      {cf.accountNumber && (
        <p>
          <strong>🏦 Account No.:</strong> {cf.accountNumber}
          <CopyIcon text={cf.accountNumber} />
        </p>
      )}
      {cf.ifscCode && (
        <p>
          <strong>🔢 IFSC Code:</strong> {cf.ifscCode}
          <CopyIcon text={cf.ifscCode} />
        </p>
      )}
      {task.tags && task.tags.length > 0 && (
        <p>
          <strong>🏷️ Tags:</strong> {task.tags.join(", ")}
          <CopyIcon text={task.tags.join(", ")} />
        </p>
      )}

      {task.attachments && task.attachments.length > 0 && (
        <div>
          <strong>📎 Attachments:</strong>
          <ul className="list-disc ml-6 space-y-1">
            {task.attachments.map((url, i) => {
              const fileName = url.split("/").pop() || `file-${i}`;
              const downloadUrl = getDownloadUrl(url);
              return (
                <li key={i}>
                  <a
                    href={downloadUrl}
                    download={fileName}
                    className="text-blue-600 underline hover:text-blue-800 transition"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {getLabelFromUrl(url)}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {(task.assigner?.name || task.assignee?.name) && (
        <div>
          {task.assigner?.name && (
            <p>
              <strong>🧑‍💼 Assigned By:</strong> {task.assigner.name}
              <CopyIcon text={task.assigner.name} />
            </p>
          )}
          {task.assignee?.name && (
            <p>
              <strong>🙋 Assigned To:</strong> {task.assignee.name}
              <CopyIcon text={task.assignee.name} />
            </p>
          )}
        </div>
      )}
    </div>
  );
}
