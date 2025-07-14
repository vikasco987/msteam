










// //previous correct

// "use client";

// import React from "react";
// import { FaRegClipboard } from "react-icons/fa";
// import toast from "react-hot-toast";
// import type { Task } from "../../../types/task";


// interface Props {
//   task: {
//     id?: string;
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
//   isAdmin?: boolean;
//   onDelete?: (taskId: string) => void;
// }

// // Utility Functions
// const getLabelFromUrl = (url: string): string => {
//   const fileName = url.split("/").pop()?.toLowerCase() || "";
//   if (fileName.includes("aadhaar")) return "🆔 Aadhaar Card";
//   if (fileName.includes("pan")) return "💳 PAN Card";
//   if (fileName.includes("selfie")) return "🤳 Selfie Photo";
//   if (fileName.includes("license")) return "🍔 Food License";
//   if (fileName.includes("menu")) return "📄 Menu Card";
//   if (fileName.endsWith(".pdf")) return "📄 PDF Document";
//   return "📎 Attachment";
// };

// const getPdfPreviewUrl = (url: string): string =>
//   url.replace("/upload/", "/raw/upload/");

// const getPdfDownloadUrl = (url: string): string =>
//   url.includes("/raw/upload/fl_attachment/")
//     ? url
//     : url.replace("/upload/", "/raw/upload/fl_attachment/");

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

// export default function TaskDetailsCard({ task, isAdmin = false, onDelete }: Props) {
//   const cf = task.customFields || {};
//   const showTitle = task.title !== cf.shopName && task.title !== cf.outletName;

//   const allValues = [
//     task.title,
//     task.description,
//     cf.shopName,
//     cf.outletName,
//     cf.phone,
//     cf.email,
//     cf.location,
//     cf.accountNumber,
//     cf.ifscCode,
//     task.priority,
//     task.tags?.join(", "),
//     task.assigner?.name,
//     task.assignee?.name,
//   ]
//     .filter(Boolean)
//     .join("\n");

//   const copyAllFields = () => {
//     navigator.clipboard.writeText(allValues);
//     toast.success("All details copied!");
//   };

//   return (
//     <div className="text-sm text-gray-700 space-y-2">
//       <div className="flex items-center justify-between">
//         {showTitle && (
//           <h3 className="text-lg font-semibold text-purple-800">{task.title}</h3>
//         )}
//         <button
//           onClick={copyAllFields}
//           className="text-sm text-gray-500 hover:text-purple-700 flex items-center gap-1"
//         >
//           <FaRegClipboard />
//           Copy All
//         </button>
//       </div>

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
//           <ul className="list-disc ml-6 space-y-2">
//             {task.attachments.map((url, i) => {
//               const label = getLabelFromUrl(url);
//               const isPdf = url.toLowerCase().endsWith(".pdf");

//               return (
//                 <li key={i} className="space-x-4">
//                   {isPdf ? (
//                     <>
//                       <a
//                         href={getPdfPreviewUrl(url)}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-purple-700 underline hover:text-purple-900"
//                       >
//                         👁️ Preview
//                       </a>
//                       <a
//                         href={getPdfDownloadUrl(url)}
//                         download
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-green-600 underline hover:text-green-800"
//                       >
//                         ⬇️ {label}
//                       </a>
//                     </>
//                   ) : (
//                     <a
//                       href={url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-600 underline hover:text-blue-800"
//                     >
//                       {label}
//                     </a>
//                   )}
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

//       {isAdmin && (
//         <div className="pt-4">
//           <button
//             onClick={() => {
//               if (task.id && onDelete) {
//                 onDelete(task.id);
//               } else {
//                 toast.error("Cannot delete. Task ID missing.");
//               }
//             }}
//             className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
//           >
//             🗑️ Delete Task
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }






// "use client";

// import React from "react";
// import { FaRegClipboard } from "react-icons/fa";
// import toast from "react-hot-toast";
// import type { Task } from "../../../types/task";

// interface Props {
//   task: Task;
//   isAdmin?: boolean;
//   onDelete?: (taskId: string) => void;
// }

// // Utility Functions
// const getLabelFromUrl = (url: string): string => {
//   const fileName = url.split("/").pop()?.toLowerCase() || "";
//   if (fileName.includes("aadhaar")) return "🆔 Aadhaar Card";
//   if (fileName.includes("pan")) return "💳 PAN Card";
//   if (fileName.includes("selfie")) return "🤳 Selfie Photo";
//   if (fileName.includes("license")) return "🍔 Food License";
//   if (fileName.includes("menu")) return "📄 Menu Card";
//   if (fileName.endsWith(".pdf")) return "📄 PDF Document";
//   return "📎 Attachment";
// };

// // const getPdfPreviewUrl = (url: string): string =>
// //   url.replace("/upload/", "/raw/upload/");

// // const getPdfDownloadUrl = (url: string): string =>
// //   url.includes("/raw/upload/fl_attachment/")
// //     ? url
// //     : url.replace("/upload/", "/raw/upload/fl_attachment/");

// // const isValidUrl = (str: string): boolean => {
// //   try {
// //     new URL(str);
// //     return true;
// //   } catch {
// //     return false;
// //   }
// // };



// const getDownloadUrl = (url: string): string =>
//   url.includes("/upload/") ? url.replace("/upload/", "/upload/fl_attachment/") : url;

// const getPdfPreviewUrl = (url: string): string =>
//   url.replace("/upload/", "/raw/upload/");

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

// export default function TaskDetailsCard({ task, isAdmin = false, onDelete }: Props) {
//   const cf = task.customFields || {};
//   const showTitle = task.title !== cf.shopName && task.title !== cf.outletName;

//   const allValues = [
//     task.title,
//     task.description,
//     cf.shopName,
//     cf.outletName,
//     cf.phone,
//     cf.email,
//     cf.location,
//     cf.accountNumber,
//     cf.ifscCode,
//     task.priority,
//     task.tags?.join(", "),
//     task.assigner?.name,
//     task.assignee?.name,
//   ]
//     .filter(Boolean)
//     .join("\n");

//   const copyAllFields = () => {
//     navigator.clipboard.writeText(allValues);
//     toast.success("All details copied!");
//   };

//   return (
//     <div className="text-sm text-gray-700 space-y-2">
//       <div className="flex items-center justify-between">
//         {showTitle && (
//           <h3 className="text-lg font-semibold text-purple-800">{task.title}</h3>
//         )}
//         <button
//           onClick={copyAllFields}
//           className="text-sm text-gray-500 hover:text-purple-700 flex items-center gap-1"
//         >
//           <FaRegClipboard />
//           Copy All
//         </button>
//       </div>

//       {task.description && (
//         <p>
//           <strong>📝 Description:</strong> {task.description}
//           <CopyIcon text={String(task.description)} />
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
//           <CopyIcon text={String(task.priority)} />
//         </p>
//       )}
//       {cf.shopName && (
//         <p>
//           <strong>🏪 Shop Name:</strong> {cf.shopName}
//           <CopyIcon text={String(cf.shopName)} />
//         </p>
//       )}
//       {cf.outletName && (
//         <p>
//           <strong>🏷️ Outlet Name:</strong> {cf.outletName}
//           <CopyIcon text={String(cf.outletName)} />
//         </p>
//       )}
//       {cf.phone && (
//         <p>
//           <strong>📞 Phone:</strong> {cf.phone}
//           <CopyIcon text={String(cf.phone)} />
//         </p>
//       )}
//       {cf.email && (
//         <p>
//           <strong>📧 Email:</strong> {cf.email}
//           <CopyIcon text={String(cf.email)} />
//         </p>
//       )}
//       {cf.location &&
//         (isValidUrl(String(cf.location)) ? (
//           <p>
//             <strong>📍 Address:</strong>{" "}
//             <a
//               href={String(cf.location)}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-block px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
//             >
//               🔗 View on Map
//             </a>
//             <CopyIcon text={String(cf.location)} />
//           </p>
//         ) : (
//           <p>
//             <strong>📍 Address:</strong> {cf.location}
//             <CopyIcon text={String(cf.location)} />
//           </p>
//         ))}
//       {cf.accountNumber && (
//         <p>
//           <strong>🏦 Account No.:</strong> {cf.accountNumber}
//           <CopyIcon text={String(cf.accountNumber)} />
//         </p>
//       )}
//       {cf.ifscCode && (
//         <p>
//           <strong>🔢 IFSC Code:</strong> {cf.ifscCode}
//           <CopyIcon text={String(cf.ifscCode)} />
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
//           <ul className="list-disc ml-6 space-y-2">
//             {task.attachments.map((url, i) => {
//               const label = getLabelFromUrl(url);
//               const isPdf = url.toLowerCase().endsWith(".pdf");

//               return (
//                 <li key={i} className="space-x-4">
//                   {isPdf ? (
//                     <>
//                       <a
//                         href={getPdfPreviewUrl(url)}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-purple-700 underline hover:text-purple-900"
//                       >
//                         👁️ Preview
//                       </a>
//                       <a
//                         href={getPdfDownloadUrl(url)}
//                         download
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-green-600 underline hover:text-green-800"
//                       >
//                         ⬇️ {label}
//                       </a>
//                     </>
//                   ) : (
//                     <a
//                       href={url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-600 underline hover:text-blue-800"
//                     >
//                       {label}
//                     </a>
//                   )}
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
//               <CopyIcon text={String(task.assigner.name)} />
//             </p>
//           )}
//           {task.assignee?.name && (
//             <p>
//               <strong>🙋 Assigned To:</strong> {task.assignee.name}
//               <CopyIcon text={String(task.assignee.name)} />
//             </p>
//           )}
//         </div>
//       )}

//       {isAdmin && (
//         <div className="pt-4">
//           <button
//             onClick={() => {
//               if (task.id && onDelete) {
//                 onDelete(task.id);
//               } else {
//                 toast.error("Cannot delete. Task ID missing.");
//               }
//             }}
//             className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
//           >
//             🗑️ Delete Task
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }











// "use client";

// import React, { useState } from "react";
// import { FaRegClipboard, FaTimes } from "react-icons/fa";
// import toast from "react-hot-toast";
// import type { Task } from "../../../types/task";

// interface Props {
//   task: Task;
//   isAdmin?: boolean;
//   onDelete?: (taskId: string) => void;
// }

// const getLabelFromUrl = (url: string): string => {
//   const fileName = url.split("/").pop()?.toLowerCase() || "";
//   if (fileName.includes("aadhaar")) return "🆔 Aadhaar Card";
//   if (fileName.includes("pan")) return "💳 PAN Card";
//   if (fileName.includes("selfie")) return "🤳 Selfie Photo";
//   if (fileName.includes("license")) return "🍔 Food License";
//   if (fileName.includes("menu")) return "📄 Menu Card";
//   if (fileName.endsWith(".pdf")) return "📄 PDF Document";
//   return "📎 Attachment";
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
//     className="inline ml-2 text-gray-400 dark:text-gray-300 cursor-pointer hover:text-purple-600 dark:hover:text-purple-400"
//     title="Copy"
//   />
// );

// export default function TaskDetailsCard({ task, isAdmin = false, onDelete }: Props) {
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//   const cf = task.customFields || {};
//   const showTitle = task.title !== cf.shopName && task.title !== cf.outletName;

//   const allValues = [
//     task.title,
//     task.description,
//     cf.shopName,
//     cf.outletName,
//     cf.phone,
//     cf.email,
//     cf.location,
//     cf.accountNumber,
//     cf.ifscCode,
//     task.priority,
//     task.tags?.join(", "),
//     task.assigner?.name,
//     task.assignee?.name,
//   ]
//     .filter(Boolean)
//     .join("\n");

//   const copyAllFields = () => {
//     navigator.clipboard.writeText(allValues);
//     toast.success("All details copied!");
//   };

//   const handleDownload = (url: string) => {
//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("download", "");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="text-sm text-gray-800 dark:text-gray-100 space-y-2">
//       <div className="flex items-center justify-between">
//         {showTitle && (
//           <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-400">{task.title}</h3>
//         )}
//         <button
//           onClick={copyAllFields}
//           className="text-sm text-gray-500 hover:text-purple-700 dark:text-gray-300 dark:hover:text-purple-400 flex items-center gap-1"
//         >
//           <FaRegClipboard />
//           Copy All
//         </button>
//       </div>

//       {task.description && (
//         <p>
//           <strong>📝 Description:</strong> {task.description}
//           <CopyIcon text={String(task.description)} />
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
//           <CopyIcon text={String(task.priority)} />
//         </p>
//       )}
//       {cf.shopName && (
//         <p>
//           <strong>🏪 Shop Name:</strong> {cf.shopName}
//           <CopyIcon text={String(cf.shopName)} />
//         </p>
//       )}
//       {cf.outletName && (
//         <p>
//           <strong>🏷️ Outlet Name:</strong> {cf.outletName}
//           <CopyIcon text={String(cf.outletName)} />
//         </p>
//       )}
//       {cf.phone && (
//         <p>
//           <strong>📞 Phone:</strong> {cf.phone}
//           <CopyIcon text={String(cf.phone)} />
//         </p>
//       )}
//       {cf.email && (
//         <p>
//           <strong>📧 Email:</strong> {cf.email}
//           <CopyIcon text={String(cf.email)} />
//         </p>
//       )}
//       {cf.location &&
//         (isValidUrl(String(cf.location)) ? (
//           <p>
//             <strong>📍 Address:</strong>{" "}
//             <a
//               href={String(cf.location)}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-block px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
//             >
//               🔗 View on Map
//             </a>
//             <CopyIcon text={String(cf.location)} />
//           </p>
//         ) : (
//           <p>
//             <strong>📍 Address:</strong> {cf.location}
//             <CopyIcon text={String(cf.location)} />
//           </p>
//         ))}
//       {cf.accountNumber && (
//         <p>
//           <strong>🏦 Account No.:</strong> {cf.accountNumber}
//           <CopyIcon text={String(cf.accountNumber)} />
//         </p>
//       )}
//       {cf.ifscCode && (
//         <p>
//           <strong>🔢 IFSC Code:</strong> {cf.ifscCode}
//           <CopyIcon text={String(cf.ifscCode)} />
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
//           <ul className="list-disc ml-6 space-y-2">
//             {task.attachments.map((url, i) => {
//               const label = getLabelFromUrl(url);
//               const isPdf = url.toLowerCase().endsWith(".pdf");
//               const isImage = /\.(jpe?g|png|webp)$/i.test(url);

//               return (
//                 <li key={i} className="flex items-center gap-4 flex-wrap">
//                   {(isPdf || isImage) && (
//                     <button
//                       onClick={() => setPreviewUrl(url)}
//                       className="text-purple-700 underline hover:text-purple-900 dark:text-purple-400"
//                     >
//                       👁️ Preview
//                     </button>
//                   )}
//                   <button
//                     onClick={() => handleDownload(url)}
//                     className="text-green-600 underline hover:text-green-800 dark:text-green-400"
//                   >
//                     ⬇️ {label}
//                   </button>
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
//               <CopyIcon text={String(task.assigner.name)} />
//             </p>
//           )}
//           {task.assignee?.name && (
//             <p>
//               <strong>🙋 Assigned To:</strong> {task.assignee.name}
//               <CopyIcon text={String(task.assignee.name)} />
//             </p>
//           )}
//         </div>
//       )}

//       {isAdmin && (
//         <div className="pt-4">
//           <button
//             onClick={() => {
//               if (task.id && onDelete) {
//                 onDelete(task.id);
//               } else {
//                 toast.error("Cannot delete. Task ID missing.");
//               }
//             }}
//             className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
//           >
//             🗑️ Delete Task
//           </button>
//         </div>
//       )}

//       {/* Preview Modal */}
//       {previewUrl && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white dark:bg-gray-900 max-w-3xl w-full p-4 rounded shadow-lg relative">
//             <button
//               onClick={() => setPreviewUrl(null)}
//               className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
//             >
//               <FaTimes size={20} />
//             </button>
//             <div className="overflow-auto max-h-[80vh]">
//               {previewUrl.toLowerCase().endsWith(".pdf") ? (
//                 <iframe
//                   src={previewUrl}
//                   className="w-full h-[70vh] border rounded"
//                   title="PDF Preview"
//                 />
//               ) : (
//                 <img
//                   src={previewUrl}
//                   alt="Attachment Preview"
//                   className="max-w-full max-h-[70vh] object-contain mx-auto"
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
















// "use client";

// import React, { useState } from "react";
// import { FaRegClipboard, FaTimes } from "react-icons/fa";
// import toast from "react-hot-toast";
// import type { Task } from "../../../types/task";

// interface Props {
//   task: Task;
//   isAdmin?: boolean;
//   onDelete?: (taskId: string) => void;
// }

// // Utility
// const getLabelFromUrl = (url: string): string => {
//   const fileName = url.split("/").pop()?.toLowerCase() || "";
//   if (fileName.includes("aadhaar")) return "🆔 Aadhaar Card";
//   if (fileName.includes("pan")) return "💳 PAN Card";
//   if (fileName.includes("selfie")) return "🤳 Selfie Photo";
//   if (fileName.includes("license")) return "🍔 Food License";
//   if (fileName.includes("menu")) return "📄 Menu Card";
//   if (fileName.endsWith(".pdf")) return "📄 PDF Document";
//   return "📎 Attachment";
// };

// const isValidUrl = (str: string): boolean => {
//   try {
//     new URL(str);
//     return true;
//   } catch {
//     return false;
//   }
// };

// // Force download using fl_attachment for Cloudinary or generic backend
// const getDownloadUrl = (url: string): string =>
//   url.includes("/upload/") ? url.replace("/upload/", "/upload/fl_attachment/") : url;

// const CopyIcon = ({ text }: { text: string }) => (
//   <FaRegClipboard
//     onClick={() => {
//       navigator.clipboard.writeText(text);
//       toast.success("Copied!");
//     }}
//     className="inline ml-2 text-gray-500 dark:text-gray-300 cursor-pointer hover:text-purple-600"
//     title="Copy"
//   />
// );

// export default function TaskDetailsCard({ task, isAdmin = false, onDelete }: Props) {
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const cf = task.customFields || {};
//   const showTitle = task.title !== cf.shopName && task.title !== cf.outletName;

//   const handleDownload = (url: string) => {
//     const downloadUrl = getDownloadUrl(url);
//     const link = document.createElement("a");
//     link.href = downloadUrl;
//     link.setAttribute("download", "");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="text-sm text-gray-800 dark:text-gray-100 space-y-2">
//       <div className="flex items-center justify-between">
//         {showTitle && (
//           <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300">
//             {task.title}
//           </h3>
//         )}
//         <button
//           onClick={() => {
//             const all = [
//               task.title,
//               task.description,
//               cf.shopName,
//               cf.outletName,
//               cf.phone,
//               cf.email,
//               cf.location,
//               cf.accountNumber,
//               cf.ifscCode,
//               task.priority,
//               task.tags?.join(", "),
//               task.assigner?.name,
//               task.assignee?.name,
//             ]
//               .filter(Boolean)
//               .join("\n");
//             navigator.clipboard.writeText(all);
//             toast.success("All details copied!");
//           }}
//           className="text-sm text-gray-500 dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-400 flex items-center gap-1"
//         >
//           <FaRegClipboard />
//           Copy All
//         </button>
//       </div>

//       {/* ... your other fields stay same */}

//       {task.attachments && task.attachments.length > 0 && (
//         <div>
//           <strong className="text-gray-700 dark:text-gray-200">📎 Attachments:</strong>
//           <ul className="list-disc ml-6 space-y-2">
//             {task.attachments.map((url, i) => {
//               const label = getLabelFromUrl(url);
//               const isPdf = url.toLowerCase().endsWith(".pdf");
//               const isImage = /\.(jpe?g|png|webp)$/i.test(url);

//               return (
//                 <li key={i} className="flex items-center gap-4 flex-wrap">
//                   {(isPdf || isImage) && (
//                     <button
//                       onClick={() => setPreviewUrl(url)}
//                       className="text-purple-700 dark:text-purple-400 underline hover:text-purple-900"
//                     >
//                       👁️ Preview
//                     </button>
//                   )}
//                   <button
//                     onClick={() => handleDownload(url)}
//                     className="text-green-600 dark:text-green-400 underline hover:text-green-800"
//                   >
//                     ⬇️ {label}
//                   </button>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       )}

//       {/* Delete button + Assigners stay unchanged */}

//       {/* Preview Modal */}
//       {previewUrl && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white dark:bg-gray-900 max-w-3xl w-full p-4 rounded shadow-lg relative">
//             <button
//               onClick={() => setPreviewUrl(null)}
//               className="absolute top-3 right-3 text-gray-600 hover:text-red-500 dark:text-gray-300"
//             >
//               <FaTimes size={20} />
//             </button>
//             <div className="overflow-auto max-h-[80vh]">
//               {previewUrl.toLowerCase().endsWith(".pdf") ? (
//                 <iframe
//                   src={previewUrl}
//                   className="w-full h-[70vh] border rounded"
//                   title="PDF Preview"
//                 />
//               ) : (
//                 <img
//                   src={previewUrl}
//                   alt="Attachment Preview"
//                   className="max-w-full max-h-[70vh] object-contain mx-auto"
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }






































// "use client";

// import React, { useState } from "react";
// import { FaRegClipboard, FaTimes } from "react-icons/fa";
// import toast from "react-hot-toast";
// import type { Task } from "../../../types/task";

// interface Props {
//   task: Task;
//   isAdmin?: boolean;
//   onDelete?: (taskId: string) => void;
// }

// // Utility Functions
// const getLabelFromUrl = (url: string): string => {
//   const fileName = url.split("/").pop()?.toLowerCase() || "";
//   if (fileName.includes("aadhaar")) return "🆔 Aadhaar Card";
//   if (fileName.includes("pan")) return "💳 PAN Card";
//   if (fileName.includes("selfie")) return "🤳 Selfie Photo";
//   if (fileName.includes("license")) return "🍔 Food License";
//   if (fileName.includes("menu")) return "📄 Menu Card";
//   if (fileName.endsWith(".pdf")) return "📄 PDF Document";
//   return "📎 Attachment";
// };

// // const getDownloadUrl = (url: string): string =>
// //   url.includes("/upload/") ? url.replace("/upload/", "/upload/fl_attachment/") : url;

// // const getPdfPreviewUrl = (url: string): string =>
// //   url.replace("/upload/", "/raw/upload/");

// // const getLabelFromUrl = (url: string): string => {
// //   const fileName = url.split("/").pop()?.toLowerCase() || "";
// //   if (fileName.includes("aadhaar")) return "🆔 Aadhaar Card";
// //   if (fileName.includes("pan")) return "💳 PAN Card";
// //   if (fileName.includes("selfie")) return "🤳 Selfie Photo";
// //   if (fileName.includes("license")) return "🍔 Food License";
// //   if (fileName.includes("menu")) return "📄 Menu Card";
// //   if (fileName.endsWith(".pdf")) return "📄 PDF Document";
// //   return "📎 Attachment";
// // };

// const isValidUrl = (str: string): boolean => {
//   try {
//     new URL(str);
//     return true;
//   } catch {
//     return false;
//   }
// };

// const getDownloadUrl = (url: string): string =>
//   url.includes("/upload/") ? url.replace("/upload/", "/upload/fl_attachment/") : url;

// const getPdfPreviewUrl = (url: string): string =>
//   url.replace("/upload/", "/raw/upload/");



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

// export default function TaskDetailsCard({ task, isAdmin = false, onDelete }: Props) {
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const cf = task.customFields || {};
//   const showTitle = task.title !== cf.shopName && task.title !== cf.outletName;

//   const allValues = [
//     task.title,
//     task.description,
//     cf.shopName,
//     cf.outletName,
//     cf.phone,
//     cf.email,
//     cf.location,
//     cf.accountNumber,
//     cf.ifscCode,
//     task.priority,
//     task.tags?.join(", "),
//     task.assigner?.name,
//     task.assignee?.name,
//   ]
//     .filter(Boolean)
//     .join("\n");

//   const copyAllFields = () => {
//     navigator.clipboard.writeText(allValues);
//     toast.success("All details copied!");
//   };

//   // const handleDownload = (url: string) => {
//   //   const downloadUrl = getDownloadUrl(url);
//   //   const link = document.createElement("a");
//   //   link.href = downloadUrl;
//   //   link.download = "";
//   //   document.body.appendChild(link);
//   //   link.click();
//   //   document.body.removeChild(link);
//   // };

//     const handleDownload = (url: string) => {
//     const downloadUrl = getDownloadUrl(url);
//     const link = document.createElement("a");
//     link.href = downloadUrl;
//     link.setAttribute("download", "");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };
//   return (
//     <div className="text-sm text-gray-700 space-y-2">
//       <div className="flex items-center justify-between">
//         {showTitle && (
//           <h3 className="text-lg font-semibold text-purple-800">{task.title}</h3>
//         )}
//         <button
//           onClick={copyAllFields}
//           className="text-sm text-gray-500 hover:text-purple-700 flex items-center gap-1"
//         >
//           <FaRegClipboard />
//           Copy All
//         </button>
//       </div>

//       {task.description && (
//         <p>
//           <strong>📝 Description:</strong> {task.description}
//           <CopyIcon text={String(task.description)} />
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
//           <CopyIcon text={String(task.priority)} />
//         </p>
//       )}
//       {cf.shopName && (
//         <p>
//           <strong>🏪 Shop Name:</strong> {cf.shopName}
//           <CopyIcon text={String(cf.shopName)} />
//         </p>
//       )}
//       {cf.outletName && (
//         <p>
//           <strong>🏷️ Outlet Name:</strong> {cf.outletName}
//           <CopyIcon text={String(cf.outletName)} />
//         </p>
//       )}
//       {cf.phone && (
//         <p>
//           <strong>📞 Phone:</strong> {cf.phone}
//           <CopyIcon text={String(cf.phone)} />
//         </p>
//       )}
//       {cf.email && (
//         <p>
//           <strong>📧 Email:</strong> {cf.email}
//           <CopyIcon text={String(cf.email)} />
//         </p>
//       )}
//       {cf.location &&
//         (isValidUrl(String(cf.location)) ? (
//           <p>
//             <strong>📍 Address:</strong>{" "}
//             <a
//               href={String(cf.location)}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-block px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
//             >
//               🔗 View on Map
//             </a>
//             <CopyIcon text={String(cf.location)} />
//           </p>
//         ) : (
//           <p>
//             <strong>📍 Address:</strong> {cf.location}
//             <CopyIcon text={String(cf.location)} />
//           </p>
//         ))}
//       {cf.accountNumber && (
//         <p>
//           <strong>🏦 Account No.:</strong> {cf.accountNumber}
//           <CopyIcon text={String(cf.accountNumber)} />
//         </p>
//       )}
//       {cf.ifscCode && (
//         <p>
//           <strong>🔢 IFSC Code:</strong> {cf.ifscCode}
//           <CopyIcon text={String(cf.ifscCode)} />
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
//           <ul className="list-disc ml-6 space-y-2">
//             {task.attachments.map((url, i) => {
//               const label = getLabelFromUrl(url);
//               const isPdf = url.toLowerCase().endsWith(".pdf");
//               const isImage = /\.(jpe?g|png|webp)$/i.test(url);

//               return (
//                 <li key={i} className="space-x-4">
//                   {(isPdf || isImage) && (
//                     <button
//                       onClick={() => setPreviewUrl(isPdf ? getPdfPreviewUrl(url) : url)}
//                       className="text-purple-700 underline hover:text-purple-900"
//                     >
//                       👁️ Preview
//                     </button>
//                   )}
//                   <button
//                     onClick={() => handleDownload(url)}
//                     className="text-green-600 underline hover:text-green-800"
//                   >
//                     ⬇️ {label}
//                   </button>
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
//               <CopyIcon text={String(task.assigner.name)} />
//             </p>
//           )}
//           {task.assignee?.name && (
//             <p>
//               <strong>🙋 Assigned To:</strong> {task.assignee.name}
//               <CopyIcon text={String(task.assignee.name)} />
//             </p>
//           )}
//         </div>
//       )}

//       {isAdmin && (
//         <div className="pt-4">
//           <button
//             onClick={() => {
//               if (task.id && onDelete) {
//                 onDelete(task.id);
//               } else {
//                 toast.error("Cannot delete. Task ID missing.");
//               }
//             }}
//             className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
//           >
//             🗑️ Delete Task
//           </button>
//         </div>
//       )}

//        {previewUrl && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white max-w-3xl w-full p-4 rounded shadow-lg relative">
//             <button
//               onClick={() => setPreviewUrl(null)}
//               className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
//             >
//               <FaTimes size={20} />
//             </button>
//             <div className="overflow-auto max-h-[80vh]">
//               {previewUrl.endsWith(".pdf") ? (
//                 <iframe
//                   src={previewUrl}
//                   className="w-full h-[70vh] border rounded"
//                   title="PDF Preview"
//                 />
//               ) : (
//                 <img
//                   src={previewUrl}
//                   alt="Attachment Preview"
//                   className="max-w-full max-h-[70vh] object-contain mx-auto"
//                 />
//               )} 
            
         



//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


















// "use client";

// import React, { useState } from "react";
// import { FaRegClipboard, FaTimes } from "react-icons/fa";
// import toast from "react-hot-toast";
// import type { Task } from "../../../types/task";
// import Image from "next/image"; // at top


// interface Props {
//   task: Task;
//   isAdmin?: boolean;
//   onDelete?: (taskId: string) => void;
// }

// // Utils
// const getLabelFromUrl = (url: string): string => {
//   const fileName = url.split("/").pop()?.toLowerCase() || "";
//   if (fileName.includes("aadhaar")) return "🆔 Aadhaar Card";
//   if (fileName.includes("pan")) return "💳 PAN Card";
//   if (fileName.includes("selfie")) return "🤳 Selfie Photo";
//   if (fileName.includes("license")) return "🍔 Food License";
//   if (fileName.includes("menu")) return "📄 Menu Card";
//   if (fileName.endsWith(".pdf")) return "📄 PDF Document";
//   return "📎 Attachment";
// };

// const isValidUrl = (str: string): boolean => {
//   try {
//     new URL(str);
//     return true;
//   } catch {
//     return false;
//   }
// };

// const getDownloadUrl = (url: string): string =>
//   url.includes("/upload/") ? url.replace("/upload/", "/upload/fl_attachment/") : url;

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

// export default function TaskDetailsCard({ task, isAdmin = false, onDelete }: Props) {
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const cf = task.customFields || {};
//   const showTitle = task.title !== cf.shopName && task.title !== cf.outletName;

//   const allValues = [
//     task.title,
//     task.description,
//     cf.shopName,
//     cf.outletName,
//     cf.phone,
//     cf.email,
//     cf.location,
//     cf.accountNumber,
//     cf.ifscCode,
//     task.priority,
//     task.tags?.join(", "),
//     task.assigner?.name,
//     task.assignee?.name,
//   ]
//     .filter(Boolean)
//     .join("\n");

//   const copyAllFields = () => {
//     navigator.clipboard.writeText(allValues);
//     toast.success("All details copied!");
//   };

//   const handleDownload = (url: string) => {
//     const downloadUrl = getDownloadUrl(url);
//     const link = document.createElement("a");
//     link.href = downloadUrl;
//     link.setAttribute("download", "");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

// //   return (
// //     <div className="text-sm text-gray-700 space-y-2">
// //       <div className="flex items-center justify-between">
// //         {showTitle && (
// //           <h3 className="text-lg font-semibold text-purple-800">{task.title}</h3>
// //         )}
// //         <button
// //           onClick={copyAllFields}
// //           className="text-sm text-gray-500 hover:text-purple-700 flex items-center gap-1"
// //         >
// //           <FaRegClipboard />
// //           Copy All
// //         </button>
// //       </div>

// //       {task.description && (
// //         <p>
// //           <strong>📝 Description:</strong> {task.description}
// //           <CopyIcon text={task.description} />
// //         </p>
// //       )}
// //       {task.dueDate && (
// //         <p>
// //           <strong>📅 Due Date:</strong>{" "}
// //           {new Date(task.dueDate).toLocaleDateString()}
// //         </p>
// //       )}
// //       {task.priority && (
// //         <p>
// //           <strong>🔥 Priority:</strong> {task.priority}
// //           <CopyIcon text={task.priority} />
// //         </p>
// //       )}
// //       {cf.shopName && (
// //         <p>
// //           <strong>🏪 Shop Name:</strong> {cf.shopName}
// //           {/* <CopyIcon text={cf.shopName} /> */}
// //           <CopyIcon text={String(cf.shopName)} />

// //         </p>
// //       )}
// //       {cf.outletName && (
// //         <p>
// //           <strong>🏷️ Outlet Name:</strong> {cf.outletName}
// //          <CopyIcon text={String(cf.outletName)} />

// //         </p>
// //       )}
// //       {cf.phone && (
// //         <p>
// //           <strong>📞 Phone:</strong> {cf.phone}
// //           <CopyIcon text={cf.phone} />
// //         </p>
// //       )}
// //       {cf.email && (
// //         <p>
// //           <strong>📧 Email:</strong> {cf.email}
// //           <CopyIcon text={cf.email} />
// //         </p>
// //       )}
// //       {cf.location &&
// //         (isValidUrl(cf.location) ? (
// //           <p>
// //             <strong>📍 Address:</strong>{" "}
// //             <a
// //               href={cf.location}
// //               target="_blank"
// //               rel="noopener noreferrer"
// //               className="inline-block px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
// //             >
// //               🔗 View on Map
// //             </a>
// //             <CopyIcon text={cf.location} />
// //           </p>
// //         ) : (
// //           <p>
// //             <strong>📍 Address:</strong> {cf.location}
// //             <CopyIcon text={cf.location} />
// //           </p>
// //         ))}
// //       {cf.accountNumber && (
// //         <p>
// //           <strong>🏦 Account No.:</strong> {cf.accountNumber}
// //           <CopyIcon text={cf.accountNumber} />
// //         </p>
// //       )}
// //       {cf.ifscCode && (
// //         <p>
// //           <strong>🔢 IFSC Code:</strong> {cf.ifscCode}
// //           <CopyIcon text={cf.ifscCode} />
// //         </p>
// //       )}
// //       {task.tags && task.tags.length > 0 && (
// //         <p>
// //           <strong>🏷️ Tags:</strong> {task.tags.join(", ")}
// //           <CopyIcon text={task.tags.join(", ")} />
// //         </p>
// //       )}

// //       {task.attachments && task.attachments.length > 0 && (
// //         <div>
// //           <strong>📎 Attachments:</strong>
// //           <ul className="list-disc ml-6 space-y-2">
// //             {task.attachments.map((url, i) => {
// //               const label = getLabelFromUrl(url);
// //               const isPdf = url.toLowerCase().endsWith(".pdf");
// //               const isImage = /\.(jpe?g|png|webp)$/i.test(url);

// //               return (
// //                 <li key={i} className="space-x-4">
// //                   {(isPdf || isImage) && (
// //                     <button
// //                       onClick={() => setPreviewUrl(url)}
// //                       className="text-purple-700 underline hover:text-purple-900"
// //                     >
// //                       👁️ Preview
// //                     </button>
// //                   )}
// //                   <button
// //                     onClick={() => handleDownload(url)}
// //                     className="text-green-600 underline hover:text-green-800"
// //                   >
// //                     ⬇️ {label}
// //                   </button>
// //                 </li>
// //               );
// //             })}
// //           </ul>
// //         </div>
// //       )}

// //       {(task.assigner?.name || task.assignee?.name) && (
// //         <div>
// //           {task.assigner?.name && (
// //             <p>
// //               <strong>🧑‍💼 Assigned By:</strong> {task.assigner.name}
// //               <CopyIcon text={task.assigner.name} />
// //             </p>
// //           )}
// //           {task.assignee?.name && (
// //             <p>
// //               <strong>🙋 Assigned To:</strong> {task.assignee.name}
// //               <CopyIcon text={task.assignee.name} />
// //             </p>
// //           )}
// //         </div>
// //       )}

// //       {isAdmin && (
// //         <div className="pt-4">
// //           <button
// //             onClick={() => {
// //               if (task.id && onDelete) {
// //                 onDelete(task.id);
// //               } else {
// //                 toast.error("Cannot delete. Task ID missing.");
// //               }
// //             }}
// //             className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
// //           >
// //             🗑️ Delete Task
// //           </button>
// //         </div>
// //       )}

// //       {previewUrl && (
// //         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
// //           <div className="bg-white max-w-3xl w-full p-4 rounded shadow-lg relative">
// //             <button
// //               onClick={() => setPreviewUrl(null)}
// //               className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
// //             >
// //               <FaTimes size={20} />
// //             </button>
// //             <div className="overflow-auto max-h-[80vh]">
// //               {previewUrl.toLowerCase().endsWith(".pdf") ? (
// //                 <iframe
// //                   src={`https://docs.google.com/gview?url=${encodeURIComponent(
// //                     previewUrl
// //                   )}&embedded=true`}
// //                   className="w-full h-[70vh] border rounded"
// //                   title="PDF Preview"
// //                 />
// //               ) : (
// //                 // <img
// //                 //   src={previewUrl}
// //                 //   alt="Attachment Preview"
// //                 //   className="max-w-full max-h-[70vh] object-contain mx-auto"
// //                 // />
           

// //               <Image
// //   src={previewUrl}
// //   alt="Attachment Preview"
// //   width={800}
// //   height={600}
// //   className="max-w-full max-h-[70vh] object-contain mx-auto"
// //   unoptimized // use only if the image is hosted externally like on Cloudinary
// // />

// //    )}
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }


// return (
//   <div className="text-sm text-gray-700 space-y-2">
//     <div className="flex items-center justify-between">
//       {showTitle && (
//         <h3 className="text-lg font-semibold text-purple-800">{task.title}</h3>
//       )}
//       <button
//         onClick={copyAllFields}
//         className="text-sm text-gray-500 hover:text-purple-700 flex items-center gap-1"
//       >
//         <FaRegClipboard />
//         Copy All
//       </button>
//     </div>

//     {task.description && (
//       <p>
//         <strong>📝 Description:</strong> {task.description}
//         <CopyIcon text={String(task.description)} />
//       </p>
//     )}

//     {cf.shopName && (
//       <p>
//         <strong>🏪 Shop Name:</strong> {cf.shopName}
//         <CopyIcon text={String(cf.shopName)} />
//       </p>
//     )}
//     {cf.outletName && (
//       <p>
//         <strong>🏷️ Outlet Name:</strong> {cf.outletName}
//         <CopyIcon text={String(cf.outletName)} />
//       </p>
//     )}
//     {cf.phone && (
//       <p>
//         <strong>📞 Phone:</strong> {cf.phone}
//         <CopyIcon text={String(cf.phone)} />
//       </p>
//     )}
//     {cf.email && (
//       <p>
//         <strong>📧 Email:</strong> {cf.email}
//         <CopyIcon text={String(cf.email)} />
//       </p>
//     )}
//     {cf.location &&
//       // (isValidUrl(cf.location) ? (
//       (isValidUrl(String(cf.location)) ? (

//         <p>
//           <strong>📍 Address:</strong>{" "}
        
            
//             <a
//   href={String(cf.location)}

//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-block px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
//           >
//             📍 View on Map
//           </a>
//           <CopyIcon text={String(cf.location)} />
//         </p>
//       ) : (
//         <p>
//           <strong>📍 Address:</strong> {cf.location}
//           <CopyIcon text={String(cf.location)} />
//         </p>
//       ))}

//     {cf.accountNumber && (
//       <p>
//         <strong>🏦 Account No.:</strong> {cf.accountNumber}
//         <CopyIcon text={String(cf.accountNumber)} />
//       </p>
//     )}
//     {cf.ifscCode && (
//       <p>
//         <strong>🔢 IFSC Code:</strong> {cf.ifscCode}
//         <CopyIcon text={String(cf.ifscCode)} />
//       </p>
//     )}

//     {task.tags && task.tags.length > 0 && (
//       <p>
//         <strong>🏷️ Tags:</strong> {task.tags.join(", ")}
//         <CopyIcon text={task.tags.join(", ")} />
//       </p>
//     )}

//     {task.attachments && task.attachments.length > 0 && (
//       <div>
//         <strong>📎 Attachments:</strong>
//         <ul className="list-disc ml-6 space-y-2">
//           {task.attachments.map((url, i) => {
//             const label = getLabelFromUrl(url);
//             const isPdf = url.toLowerCase().endsWith(".pdf");
//             const isImage = /\.(jpe?g|png|webp)$/i.test(url);

//             return (
//               <li key={i} className="space-x-4">
//                 {(isPdf || isImage) && (
//                   <button
//                     onClick={() => setPreviewUrl(url)}
//                     className="text-purple-700 underline hover:text-purple-900"
//                   >
//                     👁️ Preview
//                   </button>
//                 )}
//                 <button
//                   onClick={() => handleDownload(url)}
//                   className="text-green-600 underline hover:text-green-800"
//                 >
//                   ⬇️ {label}
//                 </button>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     )}

//     {(task.assigner?.name || task.assignee?.name) && (
//       <div>
//         {task.assigner?.name && (
//           <p>
//             <strong>🧑‍💼 Assigned By:</strong> {task.assigner.name}
//             <CopyIcon text={String(task.assigner.name)} />
//           </p>
//         )}
//         {task.assignee?.name && (
//           <p>
//             <strong>🙋 Assigned To:</strong> {task.assignee.name}
//             <CopyIcon text={String(task.assignee.name)} />
//           </p>
//         )}
//       </div>
//     )}

//     {isAdmin && (
//       <div className="pt-4">
//         <button
//           onClick={() => {
//             if (task.id && onDelete) {
//               onDelete(task.id);
//             } else {
//               toast.error("Cannot delete. Task ID missing.");
//             }
//           }}
//           className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
//         >
//           🗑️ Delete Task
//         </button>
//       </div>
//     )}

//     {previewUrl && (
//       <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
//         <div className="bg-white max-w-3xl w-full p-4 rounded shadow-lg relative">
//           <button
//             onClick={() => setPreviewUrl(null)}
//             className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
//           >
//             <FaTimes size={20} />
//           </button>
//           <div className="overflow-auto max-h-[80vh]">
//             {previewUrl.toLowerCase().endsWith(".pdf") ? (
//               <iframe
//                 src={`https://docs.google.com/gview?url=${encodeURIComponent(
//                   previewUrl
//                 )}&embedded=true`}
//                 className="w-full h-[70vh] border rounded"
//                 title="PDF Preview"
//               />
//             ) : (
//               <Image
//                 src={previewUrl}
//                 alt="Attachment Preview"
//                 width={800}
//                 height={600}
//                 className="max-w-full max-h-[70vh] object-contain mx-auto"
//                 unoptimized
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     )}
//   </div>
// );
// }
































// "use client";

// import React, { useState } from "react";
// import { FaRegClipboard, FaTimes } from "react-icons/fa";
// import toast from "react-hot-toast";
// import type { Task } from "../../../types/task";
// import Image from "next/image"; // at top


// interface Props {
//   task: Task;
//   isAdmin?: boolean;
//   onDelete?: (taskId: string) => void;
// }

// // Utils
// const getLabelFromUrl = (url: string): string => {
//   const fileName = url.split("/").pop()?.toLowerCase() || "";
//   if (fileName.includes("aadhaar")) return "🆔 Aadhaar Card";
//   if (fileName.includes("pan")) return "💳 PAN Card";
//   if (fileName.includes("selfie")) return "🤳 Selfie Photo";
//   if (fileName.includes("license")) return "🍔 Food License";
//   if (fileName.includes("menu")) return "📄 Menu Card";
//   if (fileName.endsWith(".pdf")) return "📄 PDF Document";
//   return "📎 Attachment";
// };

// const isValidUrl = (str: string): boolean => {
//   try {
//     new URL(str);
//     return true;
//   } catch {
//     return false;
//   }
// };

// const getDownloadUrl = (url: string): string =>
//   url.includes("/upload/") ? url.replace("/upload/", "/upload/fl_attachment/") : url;

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

// export default function TaskDetailsCard({ task, isAdmin = false, onDelete }: Props) {
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const cf = task.customFields || {};
//   const showTitle = task.title !== cf.shopName && task.title !== cf.outletName;

//   // const allValues = [
//   //   task.title,
//   //   task.description,
//   //   cf.shopName,
//   //   cf.outletName,
//   //   cf.phone,
//   //   cf.email,
//   //   cf.location,
//   //   cf.accountNumber,
//   //   cf.ifscCode,
//   //   task.priority,
//   //   task.tags?.join(", "),
//   //   task.assigner?.name,
//   //   task.assignee?.name,
//   // ]

// const allValues = [
//   task.title,
//   task.description,
//   cf.shopName,
//   cf.outletName, // optional custom field, not in schema but may be user-defined
//   cf.phone,
//   cf.email,
//   cf.location,
//   cf.accountNumber,
//   cf.ifscCode,
//   cf.customerName,
//   cf.restId,
//   cf.packageAmount,
//   cf.startDate,
//   cf.endDate,
//   cf.timeline,
//   task.aadhaarUrl,
//   task.panUrl,
//   task.selfieUrl,
//   task.chequeUrl,
//   ...(task.menuCardUrls ?? []),
//   task.priority,
//   task.tags?.join(", "),
//   task.assigner?.name,
//   task.assignee?.name,
//   ...(cf.fields?.map((f: { label: string; value: string }) => `${f.label}: ${f.value}`) ?? []),
// ]
//   .filter(Boolean)
//   .join("\n");


//   const copyAllFields = () => {
//     navigator.clipboard.writeText(allValues);
//     toast.success("All details copied!");
//   };

//   const handleDownload = (url: string) => {
//     const downloadUrl = getDownloadUrl(url);
//     const link = document.createElement("a");
//     link.href = downloadUrl;
//     link.setAttribute("download", "");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };


// return (
//   <div className="text-sm text-gray-700 space-y-2">
//     <div className="flex items-center justify-between">
//       {showTitle && (
//         <h3 className="text-lg font-semibold text-purple-800">{task.title}</h3>
//       )}
//       <button
//         onClick={copyAllFields}
//         className="text-sm text-gray-500 hover:text-purple-700 flex items-center gap-1"
//       >
//         <FaRegClipboard />
//         Copy All
//       </button>
//     </div>

//     {task.description && (
//       <p>
//         <strong>📝 Description:</strong> {task.description}
//         <CopyIcon text={String(task.description)} />
//       </p>
//     )}

//     {cf.shopName && (
//       <p>
//         <strong>🏪 Shop Name:</strong> {cf.shopName}
//         <CopyIcon text={String(cf.shopName)} />
//       </p>
//     )}
//     {cf.outletName && (
//       <p>
//         <strong>🏷️ Outlet Name:</strong> {cf.outletName}
//         <CopyIcon text={String(cf.outletName)} />
//       </p>
//     )}
//     {cf.phone && (
//       <p>
//         <strong>📞 Phone:</strong> {cf.phone}
//         <CopyIcon text={String(cf.phone)} />
//       </p>
//     )}
//     {cf.email && (
//       <p>
//         <strong>📧 Email:</strong> {cf.email}
//         <CopyIcon text={String(cf.email)} />
//       </p>
//     )}
//     {cf.customerName && (
//   <p>
//     <strong>👤 Customer Name:</strong> {cf.customerName}
//     <CopyIcon text={String(cf.customerName)} />
//   </p>
// )}

// {cf.packageAmount && (
//   <p>
//     <strong>💰 Package Amount:</strong> ₹{cf.packageAmount}
//     <CopyIcon text={String(cf.packageAmount)} />
//   </p>
// )}

// {cf.startDate && (
//   <p>
//     <strong>🗓️ Start Date:</strong> {cf.startDate}
//     <CopyIcon text={String(cf.startDate)} />
//   </p>
// )}

// {cf.endDate && (
//   <p>
//     <strong>📅 End Date:</strong> {cf.endDate}
//     <CopyIcon text={String(cf.endDate)} />
//   </p>
// )}

// {cf.timeline && (
//   <p>
//     <strong>⏱️ Timeline:</strong> {cf.timeline}
//     <CopyIcon text={String(cf.timeline)} />
//   </p>
// )}

//     {cf.location &&
//       // (isValidUrl(cf.location) ? (
//       (isValidUrl(String(cf.location)) ? (

//         <p>
//           <strong>📍 Address:</strong>{" "}
        
            
//             <a
//   href={String(cf.location)}




//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-block px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
//           >
//             📍 View on Map
//           </a>
//           <CopyIcon text={String(cf.location)} />
//         </p>
//       ) : (
//         <p>
//           <strong>📍 Address:</strong> {cf.location}
//           <CopyIcon text={String(cf.location)} />
//         </p>
//       ))}

//     {cf.accountNumber && (
//       <p>
//         <strong>🏦 Account No.:</strong> {cf.accountNumber}
//         <CopyIcon text={String(cf.accountNumber)} />
//       </p>
//     )}
//     {cf.ifscCode && (
//       <p>
//         <strong>🔢 IFSC Code:</strong> {cf.ifscCode}
//         <CopyIcon text={String(cf.ifscCode)} />
//       </p>
//     )}

//     {task.tags && task.tags.length > 0 && (
//       <p>
//         <strong>🏷️ Tags:</strong> {task.tags.join(", ")}
//         <CopyIcon text={task.tags.join(", ")} />
//       </p>
//     )}

//     {task.attachments && task.attachments.length > 0 && (
//       <div>
//         <strong>📎 Attachments:</strong>
//         <ul className="list-disc ml-6 space-y-2">
//           {task.attachments.map((url, i) => {
//             const label = getLabelFromUrl(url);
//             const isPdf = url.toLowerCase().endsWith(".pdf");
//             const isImage = /\.(jpe?g|png|webp)$/i.test(url);

//             return (
//               <li key={i} className="space-x-4">
//                 {(isPdf || isImage) && (
//                   <button
//                     onClick={() => setPreviewUrl(url)}
//                     className="text-purple-700 underline hover:text-purple-900"
//                   >
//                     👁️ Preview
//                   </button>
//                 )}
//                 <button
//                   onClick={() => handleDownload(url)}
//                   className="text-green-600 underline hover:text-green-800"
//                 >
//                   ⬇️ {label}
//                 </button>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     )}

//     {/* {(task.assigner?.name || task.assignee?.name) && (
//       <div>
//         {task.assigner?.name && (
//           <p>
//             <strong>🧑‍💼 Assigned By:</strong> {task.assigner.name}
//             <CopyIcon text={String(task.assigner.name)} />
//           </p>
//         )}
//         {task.assignee?.name && (
//           <p>
//             <strong>🙋 Assigned To:</strong> {task.assignee.name}
//             <CopyIcon text={String(task.assignee.name)} />
//           </p>
//         )}
//       </div>
//     )} */}


// {(task.assigner?.name || task.assignee?.name || task.createdAt) && (
//   <div className="space-y-1">
//     {task.assigner?.name && (
//       <p>
//         <strong>🧑‍💼 Assigned By:</strong> {task.assigner.name}
//         <CopyIcon text={String(task.assigner.name)} />
//       </p>
//     )}
//     {task.assignee?.name && (
//       <p>
//         <strong>🙋 Assigned To:</strong> {task.assignee.name}
//         <CopyIcon text={String(task.assignee.name)} />
//       </p>
//     )}
//     {task.createdAt && (
//       <p>
//         <strong>⏰ Created On:</strong>{" "}
//         {new Date(task.createdAt).toLocaleString()}
//         <CopyIcon text={new Date(task.createdAt).toLocaleString()} />
//       </p>
//     )}
//   </div>
// )}



//     {isAdmin && (
//       <div className="pt-4">
//         <button
//           onClick={() => {
//             if (task.id && onDelete) {
//               onDelete(task.id);
//             } else {
//               toast.error("Cannot delete. Task ID missing.");
//             }
//           }}
//           className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
//         >
//           🗑️ Delete Task
//         </button>
//       </div>
//     )}

//     {previewUrl && (
//       <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
//         <div className="bg-white max-w-3xl w-full p-4 rounded shadow-lg relative">
//           <button
//             onClick={() => setPreviewUrl(null)}
//             className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
//           >
//             <FaTimes size={20} />
//           </button>
//           <div className="overflow-auto max-h-[80vh]">
//             {previewUrl.toLowerCase().endsWith(".pdf") ? (
//               <iframe
//                 src={`https://docs.google.com/gview?url=${encodeURIComponent(
//                   previewUrl
//                 )}&embedded=true`}
//                 className="w-full h-[70vh] border rounded"
//                 title="PDF Preview"
//               />
//             ) : (
//               <Image
//                 src={previewUrl}
//                 alt="Attachment Preview"
//                 width={800}
//                 height={600}
//                 className="max-w-full max-h-[70vh] object-contain mx-auto"
//                 unoptimized
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     )}
//   </div>
// );
// }

































































// "use client";

// import React, { useState } from "react";
// import { FaRegClipboard, FaTimes } from "react-icons/fa";
// import toast from "react-hot-toast";
// import type { Task } from "../../../types/task";
// import Image from "next/image"; // at top


// interface Props {
//   task: Task;
//   isAdmin?: boolean;
//   isHidden?: boolean; // ✅ Add isHidden prop
//   onDelete?: (taskId: string) => void;
// }

// // Utils
// const getLabelFromUrl = (url: string): string => {
//   const fileName = url.split("/").pop()?.toLowerCase() || "";
//   if (fileName.includes("aadhaar")) return "🆔 Aadhaar Card";
//   if (fileName.includes("pan")) return "💳 PAN Card";
//   if (fileName.includes("selfie")) return "🤳 Selfie Photo";
//   if (fileName.includes("license")) return "🍔 Food License";
//   if (fileName.includes("menu")) return "📄 Menu Card";
//   if (fileName.endsWith(".pdf")) return "📄 PDF Document";
//   return "📎 Attachment";
// };

// const isValidUrl = (str: string): boolean => {
//   try {
//     new URL(str);
//     return true;
//   } catch {
//     return false;
//   }
// };

// const getDownloadUrl = (url: string): string =>
//   url.includes("/upload/") ? url.replace("/upload/", "/upload/fl_attachment/") : url;

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

// export default function TaskDetailsCard({ task, isAdmin = false, onDelete, isHidden = false }: Props) { // ✅ Destructure isHidden with default
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const cf = task.customFields || {};
//   const showTitle = task.title !== cf.shopName && task.title !== cf.outletName;

//   const allValues = [
//     task.title,
//     task.description,
//     cf.shopName,
//     cf.outletName, // optional custom field, not in schema but may be user-defined
//     cf.phone,
//     cf.email,
//     cf.location,
//     cf.accountNumber,
//     cf.ifscCode,
//     cf.customerName,
//     cf.restId,
//     cf.packageAmount,
//     cf.startDate,
//     cf.endDate,
//     cf.timeline,
//     task.aadhaarUrl,
//     task.panUrl,
//     task.selfieUrl,
//     task.chequeUrl,
//     ...(task.menuCardUrls ?? []),
//     task.priority,
//     task.tags?.join(", "),
//     task.assigner?.name,
//     task.assignee?.name,
//     ...(cf.fields?.map((f: { label: string; value: string }) => `${f.label}: ${f.value}`) ?? []),
//   ]
//     .filter(Boolean)
//     .join("\n");


//   const copyAllFields = () => {
//     navigator.clipboard.writeText(allValues);
//     toast.success("All details copied!");
//   };

//   const handleDownload = (url: string) => {
//     const downloadUrl = getDownloadUrl(url);
//     const link = document.createElement("a");
//     link.href = downloadUrl;
//     link.setAttribute("download", "");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };


//   return (
//     <div className="text-sm text-gray-700 space-y-2">
//       <div className="flex items-center justify-between">
//         {showTitle && (
//           <h3 className="text-lg font-semibold text-purple-800">{task.title}</h3>
//         )}
//         <button
//           onClick={copyAllFields}
//           className="text-sm text-gray-500 hover:text-purple-700 flex items-center gap-1"
//         >
//           <FaRegClipboard />
//           Copy All
//         </button>
//       </div>

//       {/* ✅ Conditionally render content based on isHidden */}
//       {isHidden ? (
//         <div className="italic text-gray-500">Details are hidden for this task.</div>
//       ) : (
//         <>
//           {task.description && (
//             <p>
//               <strong>📝 Description:</strong> {task.description}
//               <CopyIcon text={String(task.description)} />
//             </p>
//           )}

//           {cf.shopName && (
//             <p>
//               <strong>🏪 Shop Name:</strong> {cf.shopName}
//               <CopyIcon text={String(cf.shopName)} />
//             </p>
//           )}
//           {cf.outletName && (
//             <p>
//               <strong>🏷️ Outlet Name:</strong> {cf.outletName}
//               <CopyIcon text={String(cf.outletName)} />
//             </p>
//           )}
//           {cf.phone && (
//             <p>
//               <strong>📞 Phone:</strong> {cf.phone}
//               <CopyIcon text={String(cf.phone)} />
//             </p>
//           )}
//           {cf.email && (
//             <p>
//               <strong>📧 Email:</strong> {cf.email}
//               <CopyIcon text={String(cf.email)} />
//             </p>
//           )}
//           {cf.customerName && (
//             <p>
//               <strong>👤 Customer Name:</strong> {cf.customerName}
//               <CopyIcon text={String(cf.customerName)} />
//             </p>
//           )}

//           {cf.packageAmount && (
//             <p>
//               <strong>💰 Package Amount:</strong> ₹{cf.packageAmount}
//               <CopyIcon text={String(cf.packageAmount)} />
//             </p>
//           )}

//           {cf.startDate && (
//             <p>
//               <strong>🗓️ Start Date:</strong> {cf.startDate}
//               <CopyIcon text={String(cf.startDate)} />
//             </p>
//           )}

//           {cf.endDate && (
//             <p>
//               <strong>📅 End Date:</strong> {cf.endDate}
//               <CopyIcon text={String(cf.endDate)} />
//             </p>
//           )}

//           {cf.timeline && (
//             <p>
//               <strong>⏱️ Timeline:</strong> {cf.timeline}
//               <CopyIcon text={String(cf.timeline)} />
//             </p>
//           )}

//           {cf.location &&
//             (isValidUrl(String(cf.location)) ? (
//               <p>
//                 <strong>📍 Address:</strong>
//                 <a
//                   href={String(cf.location)}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-block px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
//                 >
//                   📍 View on Map
//                 </a>
//                 <CopyIcon text={String(cf.location)} />
//               </p>
//             ) : (
//               <p>
//                 <strong>📍 Address:</strong> {cf.location}
//                 <CopyIcon text={String(cf.location)} />
//               </p>
//             ))}

//           {cf.accountNumber && (
//             <p>
//               <strong>🏦 Account No.:</strong> {cf.accountNumber}
//               <CopyIcon text={String(cf.accountNumber)} />
//             </p>
//           )}
//           {cf.ifscCode && (
//             <p>
//               <strong>🔢 IFSC Code:</strong> {cf.ifscCode}
//               <CopyIcon text={String(cf.ifscCode)} />
//             </p>
//           )}

//           {task.tags && task.tags.length > 0 && (
//             <p>
//               <strong>🏷️ Tags:</strong> {task.tags.join(", ")}
//               <CopyIcon text={task.tags.join(", ")} />
//             </p>
//           )}

//           {task.attachments && task.attachments.length > 0 && (
//             <div>
//               <strong>📎 Attachments:</strong>
//               <ul className="list-disc ml-6 space-y-2">
//                 {task.attachments.map((url, i) => {
//                   const label = getLabelFromUrl(url);
//                   const isPdf = url.toLowerCase().endsWith(".pdf");
//                   const isImage = /\.(jpe?g|png|webp)$/i.test(url);

//                   return (
//                     <li key={i} className="space-x-4">
//                       {(isPdf || isImage) && (
//                         <button
//                           onClick={() => setPreviewUrl(url)}
//                           className="text-purple-700 underline hover:text-purple-900"
//                         >
//                           👁️ Preview
//                         </button>
//                       )}
//                       <button
//                         onClick={() => handleDownload(url)}
//                         className="text-green-600 underline hover:text-green-800"
//                       >
//                         ⬇️ {label}
//                       </button>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//           )}

//           {(task.assigner?.name || task.assignee?.name || task.createdAt) && (
//             <div className="space-y-1">
//               {task.assigner?.name && (
//                 <p>
//                   <strong>🧑‍💼 Assigned By:</strong> {task.assigner.name}
//                   <CopyIcon text={String(task.assigner.name)} />
//                 </p>
//               )}
//               {task.assignee?.name && (
//                 <p>
//                   <strong>🙋 Assigned To:</strong> {task.assignee.name}
//                   <CopyIcon text={String(task.assignee.name)} />
//                 </p>
//               )}
//               {task.createdAt && (
//                 <p>
//                   <strong>⏰ Created On:</strong>{" "}
//                   {new Date(task.createdAt).toLocaleString()}
//                   <CopyIcon text={new Date(task.createdAt).toLocaleString()} />
//                 </p>
//               )}
//             </div>
//           )}

//           {isAdmin && (
//             <div className="pt-4">
//               <button
//                 onClick={() => {
//                   if (task.id && onDelete) {
//                     onDelete(task.id);
//                   } else {
//                     toast.error("Cannot delete. Task ID missing.");
//                   }
//                 }}
//                 className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
//               >
//                 🗑️ Delete Task
//               </button>
//             </div>
//           )}
//         </>
//       )}


//       {previewUrl && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white max-w-3xl w-full p-4 rounded shadow-lg relative">
//             <button
//               onClick={() => setPreviewUrl(null)}
//               className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
//             >
//               <FaTimes size={20} />
//             </button>
//             <div className="overflow-auto max-h-[80vh]">
//               {previewUrl.toLowerCase().endsWith(".pdf") ? (
//                 <iframe
//                   src={`https://docs.google.com/gview?url=${encodeURIComponent(
//                     previewUrl
//                   )}&embedded=true`}
//                   className="w-full h-[70vh] border rounded"
//                   title="PDF Preview"
//                 />
//               ) : (
//                 <Image
//                   src={previewUrl}
//                   alt="Attachment Preview"
//                   width={800}
//                   height={600}
//                   className="max-w-full max-h-[70vh] object-contain mx-auto"
//                   unoptimized
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }










// "use client";

// import React, { useState } from "react";
// import { FaRegClipboard, FaTimes } from "react-icons/fa";
// import toast from "react-hot-toast";
// import type { Task } from "../../../types/task";
// import Image from "next/image"; // at top


// interface Props {
//   task: Task;
//   isAdmin?: boolean;
//   onDelete?: (taskId: string) => void;
// }

// // Utils
// const getLabelFromUrl = (url: string): string => {
//   const fileName = url.split("/").pop()?.toLowerCase() || "";
//   if (fileName.includes("aadhaar")) return "🆔 Aadhaar Card";
//   if (fileName.includes("pan")) return "💳 PAN Card";
//   if (fileName.includes("selfie")) return "🤳 Selfie Photo";
//   if (fileName.includes("license")) return "🍔 Food License";
//   if (fileName.includes("menu")) return "📄 Menu Card";
//   if (fileName.endsWith(".pdf")) return "📄 PDF Document";
//   return "📎 Attachment";
// };

// const isValidUrl = (str: string): boolean => {
//   try {
//     new URL(str);
//     return true;
//   } catch {
//     return false;
//   }
// };

// const getDownloadUrl = (url: string): string =>
//   url.includes("/upload/") ? url.replace("/upload/", "/upload/fl_attachment/") : url;

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

// export default function TaskDetailsCard({ task, isAdmin = false, onDelete }: Props) {
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const cf = task.customFields || {};
//   const showTitle = task.title !== cf.shopName && task.title !== cf.outletName;

//   const allValues = [
//     task.title,
//     task.description,
//     cf.shopName,
//     cf.outletName, // optional custom field, not in schema but may be user-defined
//     cf.phone,
//     cf.email,
//     cf.location,
//     cf.accountNumber,
//     cf.ifscCode,
//     cf.customerName,
//     cf.restId,
//     cf.packageAmount,
//     cf.startDate,
//     cf.endDate,
//     cf.timeline,
//     task.aadhaarUrl,
//     task.panUrl,
//     task.selfieUrl,
//     task.chequeUrl,
//     ...(task.menuCardUrls ?? []),
//     task.priority,
//     task.tags?.join(", "),
//     task.assigner?.name,
//     task.assignee?.name,
//     ...(cf.fields?.map((f: { label: string; value: string }) => `${f.label}: ${f.value}`) ?? []),
//   ]
//     .filter(Boolean)
//     .join("\n");


//   const copyAllFields = () => {
//     navigator.clipboard.writeText(allValues);
//     toast.success("All details copied!");
//   };

//   const handleDownload = (url: string) => {
//     const downloadUrl = getDownloadUrl(url);
//     const link = document.createElement("a");
//     link.href = downloadUrl;
//     link.setAttribute("download", "");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };


//   return (
//     <div className="text-sm text-gray-700 space-y-2">
//       <div className="flex items-center justify-between">
//         {showTitle && (
//           <h3 className="text-lg font-semibold text-purple-800">{task.title}</h3>
//         )}
//         <button
//           onClick={copyAllFields}
//           className="text-sm text-gray-500 hover:text-purple-700 flex items-center gap-1"
//         >
//           <FaRegClipboard />
//           Copy All
//         </button>
//       </div>

//       {/* This component always renders details, hiding is handled by the parent (Board.tsx) */}
//       <>
//         {task.description && (
//           <p>
//             <strong>📝 Description:</strong> {task.description}
//             <CopyIcon text={String(task.description)} />
//           </p>
//         )}

//         {cf.shopName && (
//           <p>
//             <strong>🏪 Shop Name:</strong> {cf.shopName}
//             <CopyIcon text={String(cf.shopName)} />
//           </p>
//         )}
//         {cf.outletName && (
//           <p>
//             <strong>🏷️ Outlet Name:</strong> {cf.outletName}
//             <CopyIcon text={String(cf.outletName)} />
//           </p>
//         )}
//         {cf.phone && (
//           <p>
//             <strong>📞 Phone:</strong> {cf.phone}
//             <CopyIcon text={String(cf.phone)} />
//           </p>
//         )}
//         {cf.email && (
//           <p>
//             <strong>📧 Email:</strong> {cf.email}
//             <CopyIcon text={String(cf.email)} />
//           </p>
//         )}
//         {cf.customerName && (
//           <p>
//             <strong>👤 Customer Name:</strong> {cf.customerName}
//             <CopyIcon text={String(cf.customerName)} />
//           </p>
//         )}

//         {cf.packageAmount && (
//           <p>
//             <strong>💰 Package Amount:</strong> ₹{cf.packageAmount}
//             <CopyIcon text={String(cf.packageAmount)} />
//           </p>
//         )}

//         {cf.startDate && (
//           <p>
//             <strong>🗓️ Start Date:</strong> {cf.startDate}
//             <CopyIcon text={String(cf.startDate)} />
//           </p>
//         )}

//         {cf.endDate && (
//           <p>
//             <strong>📅 End Date:</strong> {cf.endDate}
//             <CopyIcon text={String(cf.endDate)} />
//           </p>
//         )}

//         {cf.timeline && (
//           <p>
//             <strong>⏱️ Timeline:</strong> {cf.timeline}
//             <CopyIcon text={String(cf.timeline)} />
//           </p>
//         )}

//         {cf.location &&
//           (isValidUrl(String(cf.location)) ? (
//             <p>
//               <strong>📍 Address:</strong>
//               <a
//                 href={String(cf.location)}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-block px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
//               >
//                 📍 View on Map
//               </a>
//               <CopyIcon text={String(cf.location)} />
//             </p>
//           ) : (
//             <p>
//               <strong>📍 Address:</strong> {cf.location}
//               <CopyIcon text={String(cf.location)} />
//             </p>
//           ))}

//         {cf.accountNumber && (
//           <p>
//             <strong>🏦 Account No.:</strong> {cf.accountNumber}
//             <CopyIcon text={String(cf.accountNumber)} />
//           </p>
//         )}
//         {cf.ifscCode && (
//           <p>
//             <strong>🔢 IFSC Code:</strong> {cf.ifscCode}
//             <CopyIcon text={String(cf.ifscCode)} />
//           </p>
//         )}

//         {task.tags && task.tags.length > 0 && (
//           <p>
//             <strong>🏷️ Tags:</strong> {task.tags.join(", ")}
//             <CopyIcon text={task.tags.join(", ")} />
//           </p>
//         )}

//         {task.attachments && task.attachments.length > 0 && (
//           <div>
//             <strong>📎 Attachments:</strong>
//             <ul className="list-disc ml-6 space-y-2">
//               {task.attachments.map((url, i) => {
//                 const label = getLabelFromUrl(url);
//                 const isPdf = url.toLowerCase().endsWith(".pdf");
//                 const isImage = /\.(jpe?g|png|webp)$/i.test(url);

//                 return (
//                   <li key={i} className="space-x-4">
//                     {(isPdf || isImage) && (
//                       <button
//                         onClick={() => setPreviewUrl(url)}
//                         className="text-purple-700 underline hover:text-purple-900"
//                       >
//                         👁️ Preview
//                       </button>
//                     )}
//                     <button
//                       onClick={() => handleDownload(url)}
//                       className="text-green-600 underline hover:text-green-800"
//                     >
//                       ⬇️ {label}
//                     </button>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         )}

//         {(task.assigner?.name || task.assignee?.name || task.createdAt) && (
//           <div className="space-y-1">
//             {task.assigner?.name && (
//               <p>
//                 <strong>🧑‍💼 Assigned By:</strong> {task.assigner.name}
//                 <CopyIcon text={String(task.assigner.name)} />
//               </p>
//             )}
//             {task.assignee?.name && (
//               <p>
//                 <strong>🙋 Assigned To:</strong> {task.assignee.name}
//                 <CopyIcon text={String(task.assignee.name)} />
//               </p>
//             )}
//             {task.createdAt && (
//               <p>
//                 <strong>⏰ Created On:</strong>{" "}
//                 {new Date(task.createdAt).toLocaleString()}
//                 <CopyIcon text={new Date(task.createdAt).toLocaleString()} />
//               </p>
//             )}
//           </div>
//         )}

//         {isAdmin && (
//           <div className="pt-4">
//             <button
//               onClick={() => {
//                 if (task.id && onDelete) {
//                   onDelete(task.id);
//                 } else {
//                   toast.error("Cannot delete. Task ID missing.");
//                 }
//               }}
//               className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
//             >
//               🗑️ Delete Task
//             </button>
//           </div>
//         )}
//       </>


//       {previewUrl && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white max-w-3xl w-full p-4 rounded shadow-lg relative">
//             <button
//               onClick={() => setPreviewUrl(null)}
//               className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
//             >
//               <FaTimes size={20} />
//             </button>
//             <div className="overflow-auto max-h-[80vh]">
//               {previewUrl.toLowerCase().endsWith(".pdf") ? (
//                 <iframe
//                   src={`https://docs.google.com/gview?url=${encodeURIComponent(
//                     previewUrl
//                   )}&embedded=true`}
//                   className="w-full h-[70vh] border rounded"
//                   title="PDF Preview"
//                 />
//               ) : (
//                 <Image
//                   src={previewUrl}
//                   alt="Attachment Preview"
//                   width={800}
//                   height={600}
//                   className="max-w-full max-h-[70vh] object-contain mx-auto"
//                   unoptimized
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



















// "use client";

// import React, { useState } from "react";
// import { FaRegClipboard, FaTimes } from "react-icons/fa";
// import toast from "react-hot-toast";
// import type { Task } from "../../../types/task";
// import Image from "next/image"; // at top


// interface Props {
//   task: Task;
//   isAdmin?: boolean;
//   onDelete?: (taskId: string) => void;
// }

// // Utils
// const getLabelFromUrl = (url: string): string => {
//   const fileName = url.split("/").pop()?.toLowerCase() || "";
//   if (fileName.includes("aadhaar")) return "🆔 Aadhaar Card";
//   if (fileName.includes("pan")) return "💳 PAN Card";
//   if (fileName.includes("selfie")) return "🤳 Selfie Photo";
//   if (fileName.includes("license")) return "🍔 Food License";
//   if (fileName.includes("menu")) return "📄 Menu Card";
//   if (fileName.endsWith(".pdf")) return "📄 PDF Document";
//   return "📎 Attachment";
// };

// const isValidUrl = (str: string): boolean => {
//   try {
//     new URL(str);
//     return true;
//   } catch {
//     return false;
//   }
// };

// const getDownloadUrl = (url: string): string =>
//   url.includes("/upload/") ? url.replace("/upload/", "/upload/fl_attachment/") : url;

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

// export default function TaskDetailsCard({ task, isAdmin = false, onDelete }: Props) {
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const cf = task.customFields || {};
//   const showTitle = task.title !== cf.shopName && task.title !== cf.outletName;

//   // Updated to include assigner/assignee emails for Copy All
//   const allValues = [
//     task.title,
//     task.description,
//     cf.shopName,
//     cf.outletName,
//     cf.phone,
//     cf.email,
//     cf.location,
//     cf.accountNumber,
//     cf.ifscCode,
//     cf.customerName,
//     cf.restId,
//     cf.packageAmount,
//     cf.startDate,
//     cf.endDate,
//     cf.timeline,
//     task.aadhaarUrl,
//     task.panUrl,
//     task.selfieUrl,
//     task.chequeUrl,
//     ...(task.menuCardUrls ?? []),
//     task.priority,
//     task.tags?.join(", "),
//     task.assigner?.name,
//     task.assigner?.email, // Added assignee email
//     task.assignee?.name,
//     task.assignee?.email, // Added assigner email
//     ...(cf.fields?.map((f: { label: string; value: string }) => `${f.label}: ${f.value}`) ?? []),
//   ]
//     .filter(Boolean)
//     .join("\n");


//   const copyAllFields = () => {
//     navigator.clipboard.writeText(allValues);
//     toast.success("All details copied!");
//   };

//   const handleDownload = (url: string) => {
//     const downloadUrl = getDownloadUrl(url);
//     const link = document.createElement("a");
//     link.href = downloadUrl;
//     link.setAttribute("download", "");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(link.href);
//   };


//   return (
//     <div className="text-sm text-gray-700 space-y-2">
//       <div className="flex items-center justify-between">
//         {showTitle && (
//           <h3 className="text-lg font-semibold text-purple-800">{task.title}</h3>
//         )}
//         <button
//           onClick={copyAllFields}
//           className="text-sm text-gray-500 hover:text-purple-700 flex items-center gap-1"
//         >
//           <FaRegClipboard />
//           Copy All
//         </button>
//       </div>

//       {/* New: Display Assigner and Assignee names prominently here */}
//       {(task.assigner?.name || task.assignee?.name) && (
//         <div className="flex justify-between text-sm text-gray-700 mb-2">
//           {task.assigner?.name && (
//             <p title={task.assigner.email ?? ""}> {/* Optional: Tooltip for email */}
//               <strong>🧑‍💼 By:</strong> {task.assigner.name}
//             </p>
//           )}
//           {task.assignee?.name && (
//             <p title={task.assignee.email ?? ""}> {/* Optional: Tooltip for email */}
//               <strong>🙋 To:</strong> {task.assignee.name}
//             </p>
//           )}
//         </div>
//       )}

//       {/* This component always renders details, hiding is handled by the parent (Board.tsx) */}
//       <>
//         {task.description && (
//           <p>
//             <strong>📝 Description:</strong> {task.description}
//             <CopyIcon text={String(task.description)} />
//           </p>
//         )}

//         {cf.shopName && (
//           <p>
//             <strong>🏪 Shop Name:</strong> {cf.shopName}
//             <CopyIcon text={String(cf.shopName)} />
//           </p>
//         )}
//         {cf.outletName && (
//           <p>
//             <strong>🏷️ Outlet Name:</strong> {cf.outletName}
//             <CopyIcon text={String(cf.outletName)} />
//           </p>
//         )}
//         {cf.phone && (
//           <p>
//             <strong>📞 Phone:</strong> {cf.phone}
//             <CopyIcon text={String(cf.phone)} />
//           </p>
//         )}
//         {cf.email && (
//           <p>
//             <strong>📧 Email:</strong> {cf.email}
//             <CopyIcon text={String(cf.email)} />
//           </p>
//         )}
//         {cf.customerName && (
//           <p>
//             <strong>👤 Customer Name:</strong> {cf.customerName}
//             <CopyIcon text={String(cf.customerName)} />
//           </p>
//         )}

//         {cf.packageAmount && (
//           <p>
//             <strong>💰 Package Amount:</strong> ₹{cf.packageAmount}
//             <CopyIcon text={String(cf.packageAmount)} />
//           </p>
//         )}

//         {cf.startDate && (
//           <p>
//             <strong>🗓️ Start Date:</strong> {cf.startDate}
//             <CopyIcon text={String(cf.startDate)} />
//           </p>
//         )}

//         {cf.endDate && (
//           <p>
//             <strong>📅 End Date:</strong> {cf.endDate}
//             <CopyIcon text={String(cf.endDate)} />
//           </p>
//         )}

//         {cf.timeline && (
//           <p>
//             <strong>⏱️ Timeline:</strong> {cf.timeline}
//             <CopyIcon text={String(cf.timeline)} />
//           </p>
//         )}

//         {cf.location &&
//           (isValidUrl(String(cf.location)) ? (
//             <p>
//               <strong>📍 Address:</strong>
//               <a
//                 href={String(cf.location)}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-block px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
//               >
//                 📍 View on Map
//               </a>
//               <CopyIcon text={String(cf.location)} />
//             </p>
//           ) : (
//             <p>
//               <strong>📍 Address:</strong> {cf.location}
//               <CopyIcon text={String(cf.location)} />
//             </p>
//           ))}

//         {cf.accountNumber && (
//           <p>
//             <strong>🏦 Account No.:</strong> {cf.accountNumber}
//             <CopyIcon text={String(cf.accountNumber)} />
//           </p>
//         )}
//         {cf.ifscCode && (
//           <p>
//             <strong>🔢 IFSC Code:</strong> {cf.ifscCode}
//             <CopyIcon text={String(cf.ifscCode)} />
//           </p>
//         )}

//         {task.tags && task.tags.length > 0 && (
//           <p>
//             <strong>🏷️ Tags:</strong> {task.tags.join(", ")}
//             <CopyIcon text={task.tags.join(", ")} />
//           </p>
//         )}

//         {task.attachments && task.attachments.length > 0 && (
//           <div>
//             <strong>📎 Attachments:</strong>
//             <ul className="list-disc ml-6 space-y-2">
//               {task.attachments.map((url, i) => {
//                 const label = getLabelFromUrl(url);
//                 const isPdf = url.toLowerCase().endsWith(".pdf");
//                 const isImage = /\.(jpe?g|png|webp)$/i.test(url);

//                 return (
//                   <li key={i} className="space-x-4">
//                     {(isPdf || isImage) && (
//                       <button
//                         onClick={() => setPreviewUrl(url)}
//                         className="text-purple-700 underline hover:text-purple-900"
//                       >
//                         👁️ Preview
//                       </button>
//                     )}
//                     <button
//                       onClick={() => handleDownload(url)}
//                       className="text-green-600 underline hover:text-green-800"
//                     >
//                       ⬇️ {label}
//                     </button>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         )}

//         {/* Original block, now only for Created On */}
//         {task.createdAt && (
//           <div className="space-y-1">
//             <p>
//               <strong>⏰ Created On:</strong>{" "}
//               {new Date(task.createdAt).toLocaleString()}
//               <CopyIcon text={new Date(task.createdAt).toLocaleString()} />
//             </p>
//           </div>
//         )}

//         {isAdmin && (
//           <div className="pt-4">
//             <button
//               onClick={() => {
//                 if (task.id && onDelete) {
//                   onDelete(task.id);
//                 } else {
//                   toast.error("Cannot delete. Task ID missing.");
//                 }
//               }}
//               className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
//             >
//               🗑️ Delete Task
//             </button>
//           </div>
//         )}
//       </>


//       {previewUrl && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white max-w-3xl w-full p-4 rounded shadow-lg relative">
//             <button
//               onClick={() => setPreviewUrl(null)}
//               className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
//             >
//               <FaTimes size={20} />
//             </button>
//             <div className="overflow-auto max-h-[80vh]">
//               {previewUrl.toLowerCase().endsWith(".pdf") ? (
//                 <iframe
//                   src={`https://docs.google.com/gview?url=${encodeURIComponent(
//                     previewUrl
//                   )}&embedded=true`}
//                   className="w-full h-[70vh] border rounded"
//                   title="PDF Preview"
//                 />
//               ) : (
//                 <Image
//                   src={previewUrl}
//                   alt="Attachment Preview"
//                   width={800}
//                   height={600}
//                   className="max-w-full max-h-[70vh] object-contain mx-auto"
//                   unoptimized
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


























// "use client";

// import React, { useState } from "react";
// import { FaRegClipboard, FaTimes } from "react-icons/fa";
// import toast from "react-hot-toast";
// import type { Task } from "../../../types/task"; // Ensure correct path
// import Image from "next/image";
// import { motion } from "framer-motion"; // <--- ADD THIS IMPORT

// interface Props {
//   task: Task;
//   isAdmin?: boolean;
//   onDelete?: (taskId: string) => void;
// }

// // Utils
// const getLabelFromUrl = (url: string): string => {
//   const fileName = url.split("/").pop()?.toLowerCase() || "";
//   if (fileName.includes("aadhaar")) return "🆔 Aadhaar Card";
//   if (fileName.includes("pan")) return "💳 PAN Card";
//   if (fileName.includes("selfie")) return "🤳 Selfie Photo";
//   if (fileName.includes("license")) return "🍔 Food License";
//   if (fileName.includes("menu")) return "📄 Menu Card";
//   if (fileName.endsWith(".pdf")) return "📄 PDF Document";
//   return "📎 Attachment";
// };

// const isValidUrl = (str: string): boolean => {
//   try {
//     new URL(str);
//     return true;
//   } catch {
//     return false;
//   }
// };

// const getDownloadUrl = (url: string): string =>
//   url.includes("/upload/") ? url.replace("/upload/", "/upload/fl_attachment/") : url;

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

// export default function TaskDetailsCard({ task, isAdmin = false, onDelete }: Props) {
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const cf = task.customFields || {};
//   const showTitle = task.title !== cf.shopName && task.title !== cf.outletName;

//   // Derive assigner and assignee names/emails using fallback logic
//   const displayAssignerName = task.assigner?.name || task.assignerName || task.createdByEmail || "—";
//   const displayAssignerEmail = task.assigner?.email || task.assignerEmail || "";

//   // For assignee, prioritize task.assignee.name, then iterate through assignees array
//   const displayAssigneeName = task.assignee?.name || task.assignees?.map(a => a?.name || a?.email).filter(Boolean).join(", ") || "—";
//   const displayAssigneeEmail = task.assignee?.email || task.assigneeEmail || "";


//   // Updated to include all relevant fields for Copy All, using derived values
//   const allValues = [
//     task.title,
//     task.description,
//     cf.shopName,
//     cf.outletName,
//     cf.phone,
//     cf.email,
//     cf.location,
//     cf.accountNumber,
//     cf.ifscCode,
//     cf.customerName,
//     cf.restId,
//     cf.packageAmount,
//     cf.startDate,
//     cf.endDate,
//     cf.timeline,
//     task.aadhaarUrl,
//     task.panUrl,
//     task.selfieUrl,
//     task.chequeUrl,
//     ...(task.menuCardUrls ?? []),
//     task.priority,
//     task.tags?.join(", "),
//     displayAssignerName,
//     displayAssignerEmail,
//     displayAssigneeName,
//     displayAssigneeEmail,
//     ...(cf.fields?.map((f: { label: string; value: string }) => `${f.label}: ${f.value}`) ?? []),
//   ]
//     .filter(Boolean)
//     .join("\n");


//   const copyAllFields = () => {
//     navigator.clipboard.writeText(allValues);
//     toast.success("All details copied!");
//   };

//   const handleDownload = (url: string) => {
//     const downloadUrl = getDownloadUrl(url);
//     const link = document.createElement("a");
//     link.href = downloadUrl;
//     link.setAttribute("download", "");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(link.href);
//   };


//   return (
//     <div className="text-sm text-gray-700 space-y-2">
//       <div className="flex items-center justify-between">
//         {showTitle && (
//           <h3 className="text-lg font-semibold text-purple-800">{task.title}</h3>
//         )}
//         <button
//           onClick={copyAllFields}
//           className="text-sm text-gray-500 hover:text-purple-700 flex items-center gap-1"
//         >
//           <FaRegClipboard />
//           Copy All
//         </button>
//       </div>

//       {/* This component always renders details, hiding is handled by the parent (Board.tsx) */}
//       <>
//         {task.description && (
//           <p>
//             <strong>📝 Description:</strong> {task.description}
//             <CopyIcon text={String(task.description)} />
//           </p>
//         )}

//         {cf.shopName && (
//           <p>
//             <strong>🏪 Shop Name:</strong> {cf.shopName}
//             <CopyIcon text={String(cf.shopName)} />
//           </p>
//         )}
//         {cf.outletName && (
//           <p>
//             <strong>🏷️ Outlet Name:</strong> {cf.outletName}
//             <CopyIcon text={String(cf.outletName)} />
//           </p>
//         )}
//         {cf.phone && (
//           <p>
//             <strong>📞 Phone:</strong> {cf.phone}
//             <CopyIcon text={String(cf.phone)} />
//           </p>
//         )}
//         {cf.email && (
//           <p>
//             <strong>📧 Email:</strong> {cf.email}
//             <CopyIcon text={String(cf.email)} />
//           </p>
//         )}
//         {cf.customerName && (
//           <p>
//             <strong>👤 Customer Name:</strong> {cf.customerName}
//             <CopyIcon text={String(cf.customerName)} />
//           </p>
//         )}

//         {cf.packageAmount && (
//           <p>
//             <strong>💰 Package Amount:</strong> ₹{cf.packageAmount}
//             <CopyIcon text={String(cf.packageAmount)} />
//           </p>
//         )}

//         {cf.startDate && (
//           <p>
//             <strong>🗓️ Start Date:</strong> {cf.startDate}
//             <CopyIcon text={String(cf.startDate)} />
//           </p>
//         )}

//         {cf.endDate && (
//           <p>
//             <strong>📅 End Date:</strong> {cf.endDate}
//             <CopyIcon text={String(cf.endDate)} />
//           </p>
//         )}

//         {cf.timeline && (
//           <p>
//             <strong>⏱️ Timeline:</strong> {cf.timeline}
//             <CopyIcon text={String(cf.timeline)} />
//           </p>
//         )}

//         {cf.location &&
//           (isValidUrl(String(cf.location)) ? (
//             <p>
//               <strong>📍 Address:</strong>
//               <a
//                 href={String(cf.location)}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-block px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
//               >
//                 📍 View on Map
//               </a>
//               <CopyIcon text={String(cf.location)} />
//             </p>
//           ) : (
//             <p>
//               <strong>📍 Address:</strong> {cf.location}
//               <CopyIcon text={String(cf.location)} />
//             </p>
//           ))}

//         {cf.accountNumber && (
//           <p>
//             <strong>🏦 Account No.:</strong> {cf.accountNumber}
//             <CopyIcon text={String(cf.accountNumber)} />
//           </p>
//         )}
//         {cf.ifscCode && (
//           <p>
//             <strong>🔢 IFSC Code:</strong> {cf.ifscCode}
//             <CopyIcon text={String(cf.ifscCode)} />
//           </p>
//         )}

//         {task.tags && task.tags.length > 0 && (
//           <p>
//             <strong>🏷️ Tags:</strong> {task.tags.join(", ")}
//             <CopyIcon text={task.tags.join(", ")} />
//           </p>
//         )}

//         {task.attachments && task.attachments.length > 0 && (
//           <div>
//             <strong>📎 Attachments:</strong>
//             <ul className="list-disc ml-6 space-y-2">
//               {task.attachments.map((url, i) => {
//                 const label = getLabelFromUrl(url);
//                 const isPdf = url.toLowerCase().endsWith(".pdf");
//                 const isImage = /\.(jpe?g|png|webp)$/i.test(url);

//                 return (
//                   <li key={i} className="space-x-4">
//                     {(isPdf || isImage) && (
//                       <button
//                         onClick={() => setPreviewUrl(url)}
//                         className="text-purple-700 underline hover:text-purple-900"
//                       >
//                         👁️ Preview
//                       </button>
//                     )}
//                     <button
//                       onClick={() => handleDownload(url)}
//                       className="text-green-600 underline hover:text-green-800"
//                     >
//                       ⬇️ {label}
//                     </button>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         )}

//         {/* Original block for Created On */}
//         {task.createdAt && (
//           <div className="space-y-1">
//             <p>
//               <strong>⏰ Created On:</strong>{" "}
//               {new Date(task.createdAt).toLocaleString()}
//               <CopyIcon text={new Date(task.createdAt).toLocaleString()} />
//             </p>
//           </div>
//         )}

//         {/* Updated and styled block for Assigner and Assignee details with Framer Motion */}
//         {(displayAssignerName !== "—" || displayAssigneeName !== "—") && (
//           <motion.div // <--- MOTION.DIV APPLIED HERE
//             initial={{ opacity: 0, y: 10 }} // Starts invisible and slightly below
//             animate={{ opacity: 1, y: 0 }}   // Animates to full opacity and original position
//             transition={{ duration: 0.4, ease: "easeOut" }} // Animation duration and easing
//             className="mt-3 border-t pt-2 text-gray-600 text-sm flex justify-between items-start gap-4"
//           >
//             {displayAssignerName !== "—" && (
//               <div title={displayAssignerEmail}>
//                 <p className="text-xs uppercase text-gray-400 tracking-wider">Created By</p>
//                 <p className="font-medium text-gray-700">🧑‍💼 {displayAssignerName}</p>
//               </div>
//             )}
//             {displayAssigneeName !== "—" && (
//               <div title={displayAssigneeEmail}>
//                 <p className="text-xs uppercase text-gray-400 tracking-wider">Assigned To</p>
//                 <p className="font-medium text-gray-700">🙋 {displayAssigneeName}</p>
//               </div>
//             )}
//           </motion.div>
//         )}

//         {isAdmin && (
//           <div className="pt-4">
//             <button
//               onClick={() => {
//                 if (task.id && onDelete) {
//                   onDelete(task.id);
//                 } else {
//                   toast.error("Cannot delete. Task ID missing.");
//                 }
//               }}
//               className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
//             >
//               🗑️ Delete Task
//             </button>
//           </div>
//         )}
//       </>


//       {previewUrl && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white max-w-3xl w-full p-4 rounded shadow-lg relative">
//             <button
//               onClick={() => setPreviewUrl(null)}
//               className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
//             >
//               <FaTimes size={20} />
//             </button>
//             <div className="overflow-auto max-h-[80vh]">
//               {previewUrl.toLowerCase().endsWith(".pdf") ? (
//                 <iframe
//                   src={`https://docs.google.com/gview?url=${encodeURIComponent(
//                     previewUrl
//                   )}&embedded=true`}
//                   className="w-full h-[70vh] border rounded"
//                   title="PDF Preview"
//                 />
//               ) : (
//                 <Image
//                   src={previewUrl}
//                   alt="Attachment Preview"
//                   width={800}
//                   height={600}
//                   className="max-w-full max-h-[70vh] object-contain mx-auto"
//                   unoptimized
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





























// // components/TaskDetailsCard.tsx
// "use client";

// import React, { useState } from "react";
// import { FaRegClipboard, FaTimes } from "react-icons/fa";
// import toast from "react-hot-toast";
// import type { Task } from "../../../types/task"; // Ensure correct path
// import Image from "next/image";
// import { motion } from "framer-motion";

// // Import the new NotesModal component
// import NotesModal from "./NotesModal"; // Adjust path as needed based on your folder structure

// interface Props {
//   task: Task;
//   isAdmin?: boolean;
//   onDelete?: (taskId: string) => void;
// }

// // Utils
// const getLabelFromUrl = (url: string): string => {
//   const fileName = url.split("/").pop()?.toLowerCase() || "";
//   if (fileName.includes("aadhaar")) return "🆔 Aadhaar Card";
//   if (fileName.includes("pan")) return "💳 PAN Card";
//   if (fileName.includes("selfie")) return "🤳 Selfie Photo";
//   if (fileName.includes("license")) return "🍔 Food License";
//   if (fileName.includes("menu")) return "📄 Menu Card";
//   if (fileName.endsWith(".pdf")) return "📄 PDF Document";
//   return "📎 Attachment";
// };

// const isValidUrl = (str: string): boolean => {
//   try {
//     new URL(str);
//     return true;
//   } catch {
//     return false;
//   }
// };

// const getDownloadUrl = (url: string): string =>
//   url.includes("/upload/") ? url.replace("/upload/", "/upload/fl_attachment/") : url;

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

// export default function TaskDetailsCard({ task, isAdmin = false, onDelete }: Props) {
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   // State for the notes modal
//   const [showNotesModal, setShowNotesModal] = useState(false); // <--- ADD THIS STATE

//   const cf = task.customFields || {};
//   const showTitle = task.title !== cf.shopName && task.title !== cf.outletName;

//   const displayAssignerName = task.assigner?.name || task.assignerName || "—";
//   const displayAssignerEmail = task.assigner?.email || task.assignerEmail || "";

//   const displayAssigneeName = task.assignee?.name || task.assignees?.map(a => a?.name || a?.email).filter(Boolean).join(", ") || "—";
//   const displayAssigneeEmail = task.assignee?.email || task.assigneeEmail || "";

//   const allValues = [
//     task.title,
//     task.description,
//     cf.shopName,
//     cf.outletName,
//     cf.phone,
//     cf.email,
//     cf.location,
//     cf.accountNumber,
//     cf.ifscCode,
//     cf.customerName,
//     cf.restId,
//     cf.packageAmount,
//     cf.startDate,
//     cf.endDate,
//     cf.timeline,
//     task.aadhaarUrl,
//     task.panUrl,
//     task.selfieUrl,
//     task.chequeUrl,
//     ...(task.menuCardUrls ?? []),
//     task.priority,
//     task.tags?.join(", "),
//     displayAssignerName,
//     displayAssignerEmail,
//     displayAssigneeName,
//     displayAssigneeEmail,
//     ...(cf.fields?.map((f: { label: string; value: string }) => `${f.label}: ${f.value}`) ?? []),
//   ]
//     .filter(Boolean)
//     .join("\n");


//   const copyAllFields = () => {
//     navigator.clipboard.writeText(allValues);
//     toast.success("All details copied!");
//   };

//   const handleDownload = (url: string) => {
//     const downloadUrl = getDownloadUrl(url);
//     const link = document.createElement("a");
//     link.href = downloadUrl;
//     link.setAttribute("download", "");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(link.href);
//   };

//   return (
//     <div className="text-sm text-gray-700 space-y-2">
//       <div className="flex items-center justify-between">
//         {showTitle && (
//           <h3 className="text-lg font-semibold text-purple-800">{task.title}</h3>
//         )}
//         <div className="flex items-center gap-2"> {/* Group buttons */}
//           <button
//             onClick={() => setShowNotesModal(true)} // <--- ADD THIS BUTTON
//             title="Add/View Notes"
//             className="text-gray-500 hover:text-purple-700 p-1 rounded-md"
//           >
//             📝
//           </button>
//           <button
//             onClick={copyAllFields}
//             className="text-sm text-gray-500 hover:text-purple-700 flex items-center gap-1"
//           >
//             <FaRegClipboard />
//             Copy All
//           </button>
//         </div>
//       </div>

//       {/* This component always renders details, hiding is handled by the parent (Board.tsx) */}
//       <>
//         {task.description && (
//           <p>
//             <strong>📝 Description:</strong> {task.description}
//             <CopyIcon text={String(task.description)} />
//           </p>
//         )}

//         {cf.shopName && (
//           <p>
//             <strong>🏪 Shop Name:</strong> {cf.shopName}
//             <CopyIcon text={String(cf.shopName)} />
//           </p>
//         )}
//         {cf.outletName && (
//           <p>
//             <strong>🏷️ Outlet Name:</strong> {cf.outletName}
//             <CopyIcon text={String(cf.outletName)} />
//           </p>
//         )}
//         {cf.phone && (
//           <p>
//             <strong>📞 Phone:</strong> {cf.phone}
//             <CopyIcon text={String(cf.phone)} />
//           </p>
//         )}
//         {cf.email && (
//           <p>
//             <strong>📧 Email:</strong> {cf.email}
//             <CopyIcon text={String(cf.email)} />
//           </p>
//         )}
//         {cf.customerName && (
//           <p>
//             <strong>👤 Customer Name:</strong> {cf.customerName}
//             <CopyIcon text={String(cf.customerName)} />
//           </p>
//         )}

//         {cf.packageAmount && (
//           <p>
//             <strong>💰 Package Amount:</strong> ₹{cf.packageAmount}
//             <CopyIcon text={String(cf.packageAmount)} />
//           </p>
//         )}

//         {cf.startDate && (
//           <p>
//             <strong>🗓️ Start Date:</strong> {cf.startDate}
//             <CopyIcon text={String(cf.startDate)} />
//           </p>
//         )}

//         {cf.endDate && (
//           <p>
//             <strong>📅 End Date:</strong> {cf.endDate}
//             <CopyIcon text={String(cf.endDate)} />
//           </p>
//         )}

//         {cf.timeline && (
//           <p>
//             <strong>⏱️ Timeline:</strong> {cf.timeline}
//             <CopyIcon text={String(cf.timeline)} />
//           </p>
//         )}

//         {cf.location &&
//           (isValidUrl(String(cf.location)) ? (
//             <p>
//               <strong>📍 Address:</strong>
//               <a
//                 href={String(cf.location)}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-block px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
//               >
//                 📍 View on Map
//               </a>
//               <CopyIcon text={String(cf.location)} />
//             </p>
//           ) : (
//             <p>
//               <strong>📍 Address:</strong> {cf.location}
//               <CopyIcon text={String(cf.location)} />
//             </p>
//           ))}

//         {cf.accountNumber && (
//           <p>
//             <strong>🏦 Account No.:</strong> {cf.accountNumber}
//             <CopyIcon text={String(cf.accountNumber)} />
//           </p>
//         )}
//         {cf.ifscCode && (
//           <p>
//             <strong>🔢 IFSC Code:</strong> {cf.ifscCode}
//             <CopyIcon text={String(cf.ifscCode)} />
//           </p>
//         )}

//         {task.tags && task.tags.length > 0 && (
//           <p>
//             <strong>🏷️ Tags:</strong> {task.tags.join(", ")}
//             <CopyIcon text={task.tags.join(", ")} />
//           </p>
//         )}

//         {task.attachments && task.attachments.length > 0 && (
//           <div>
//             <strong>📎 Attachments:</strong>
//             <ul className="list-disc ml-6 space-y-2">
//               {task.attachments.map((url, i) => {
//                 const label = getLabelFromUrl(url);
//                 const isPdf = url.toLowerCase().endsWith(".pdf");
//                 const isImage = /\.(jpe?g|png|webp)$/i.test(url);

//                 return (
//                   <li key={i} className="space-x-4">
//                     {(isPdf || isImage) && (
//                       <button
//                         onClick={() => setPreviewUrl(url)}
//                         className="text-purple-700 underline hover:text-purple-900"
//                       >
//                         👁️ Preview
//                       </button>
//                     )}
//                     <button
//                       onClick={() => handleDownload(url)}
//                       className="text-green-600 underline hover:text-green-800"
//                     >
//                       ⬇️ {label}
//                     </button>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         )}

//         {task.createdAt && (
//           <div className="space-y-1">
//             <p>
//               <strong>⏰ Created On:</strong>{" "}
//               {new Date(task.createdAt).toLocaleString()}
//               <CopyIcon text={new Date(task.createdAt).toLocaleString()} />
//             </p>
//           </div>
//         )}

//         {(displayAssignerName !== "—" || displayAssigneeName !== "—") && (
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4, ease: "easeOut" }}
//             className="mt-3 border-t pt-2 text-gray-600 text-sm flex justify-between items-start gap-4"
//           >
//             {displayAssignerName !== "—" && (
//               <div title={displayAssignerEmail}>
//                 <p className="text-xs uppercase text-gray-400 tracking-wider">Created By</p>
//                 <p className="font-medium text-gray-700">🧑‍💼 {displayAssignerName}</p>
//               </div>
//             )}
//             {displayAssigneeName !== "—" && (
//               <div title={displayAssigneeEmail}>
//                 <p className="text-xs uppercase text-gray-400 tracking-wider">Assigned To</p>
//                 <p className="font-medium text-gray-700">🙋 {displayAssigneeName}</p>
//               </div>
//             )}
//           </motion.div>
//         )}

//         {isAdmin && (
//           <div className="pt-4">
//             <button
//               onClick={() => {
//                 if (task.id && onDelete) {
//                   onDelete(task.id);
//                 } else {
//                   toast.error("Cannot delete. Task ID missing.");
//                 }
//               }}
//               className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
//             >
//               🗑️ Delete Task
//             </button>
//           </div>
//         )}
//       </>

//       {/* Existing Preview Modal */}
//       {previewUrl && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white max-w-3xl w-full p-4 rounded shadow-lg relative">
//             <button
//               onClick={() => setPreviewUrl(null)}
//               className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
//             >
//               <FaTimes size={20} />
//             </button>
//             <div className="overflow-auto max-h-[80vh]">
//               {previewUrl.toLowerCase().endsWith(".pdf") ? (
//                 <iframe
//                   src={`https://docs.google.com/gview?url=${encodeURIComponent(
//                     previewUrl
//                   )}&embedded=true`}
//                   className="w-full h-[70vh] border rounded"
//                   title="PDF Preview"
//                 />
//               ) : (
//                 <Image
//                   src={previewUrl}
//                   alt="Attachment Preview"
//                   width={800}
//                   height={600}
//                   className="max-w-full max-h-[70vh] object-contain mx-auto"
//                   unoptimized
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Notes Modal - Rendered conditionally */}
//       {showNotesModal && (
//         <NotesModal
//           taskId={task.id}
//           initialNote={task.notes} // Pass existing note if any
//           onClose={(updatedNote?: string) => {
//             // This callback is for when the modal closes
//             // You might want to update the task's note locally if saved from the modal
//             if (updatedNote !== undefined) {
//               // Optionally, trigger a refresh or update local task state
//               // This part depends on how you manage task data globally (e.g., SWR, Zustand, Redux)
//               // For simplicity, we'll assume a direct update or a refetch will occur.
//               // For now, it will simply close the modal.
//               // If you want to update the 'task.notes' prop, you'd need `setTask` in this component
//               // or lift the state higher. Given this is a display card, a refetch from parent is likely.
//             }
//             setShowNotesModal(false);
//           }}
//         />
//       )}
//     </div>
//   );
// }


















// // components/TaskDetailsCard.tsx
// "use client";

// import React, { useState } from "react";
// import { FaRegClipboard, FaTimes } from "react-icons/fa";
// import toast from "react-hot-toast";
// import type { Task } from "../../../types/task"; // Ensure correct path
// import Image from "next/image";
// import { motion } from "framer-motion";

// // Import the new NotesModal component
// import NotesModal from "./NotesModal"; // Adjust path as needed based on your folder structure

// interface Props {
//   task: Task;
//   isAdmin?: boolean;
//   onDelete?: (taskId: string) => void;
// }

// // Utils
// const getLabelFromUrl = (url: string): string => {
//   const fileName = url.split("/").pop()?.toLowerCase() || "";
//   if (fileName.includes("aadhaar")) return "🆔 Aadhaar Card";
//   if (fileName.includes("pan")) return "💳 PAN Card";
//   if (fileName.includes("selfie")) return "🤳 Selfie Photo";
//   if (fileName.includes("license")) return "🍔 Food License";
//   if (fileName.includes("menu")) return "📄 Menu Card";
//   if (fileName.endsWith(".pdf")) return "📄 PDF Document";
//   return "📎 Attachment";
// };

// const isValidUrl = (str: string): boolean => {
//   try {
//     new URL(str);
//     return true;
//   } catch {
//     return false;
//   }
// };

// const getDownloadUrl = (url: string): string =>
//   url.includes("/upload/") ? url.replace("/upload/", "/upload/fl_attachment/") : url;

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

// export default function TaskDetailsCard({ task, isAdmin = false, onDelete }: Props) {
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   // State for the notes modal
//   const [showNotesModal, setShowNotesModal] = useState(false);

//   const cf = task.customFields || {};
//   const showTitle = task.title !== cf.shopName && task.title !== cf.outletName;

//   const displayAssignerName = task.assigner?.name || task.assignerName || "—";
//   const displayAssignerEmail = task.assigner?.email || task.assignerEmail || "";

//   // The 'assignees' property is now correctly defined in your Task type
//   const displayAssigneeName = task.assignee?.name || task.assignees?.map(a => a?.name || a?.email).filter(Boolean).join(", ") || "—";
//   const displayAssigneeEmail = task.assignee?.email || task.assigneeEmail || "";

//   const allValues = [
//     task.title,
//     task.description,
//     cf.shopName,
//     cf.outletName,
//     cf.phone,
//     cf.email,
//     cf.location,
//     cf.accountNumber,
//     cf.ifscCode,
//     cf.customerName,
//     cf.restId,
//     cf.packageAmount,
//     cf.startDate,
//     cf.endDate,
//     cf.timeline,
//     task.aadhaarUrl,
//     task.panUrl,
//     task.selfieUrl,
//     task.chequeUrl,
//     ...(task.menuCardUrls ?? []),
//     task.priority,
//     task.tags?.join(", "),
//     displayAssignerName,
//     displayAssignerEmail,
//     displayAssigneeName,
//     displayAssigneeEmail,
//     // ✅ CORRECTED LINE: Iterate over customFields object
//     ...(cf ? Object.entries(cf).map(([key, value]) => `${key}: ${value}`) : []),
//   ]
//     .filter(Boolean)
//     .join("\n");


//   const copyAllFields = () => {
//     navigator.clipboard.writeText(allValues);
//     toast.success("All details copied!");
//   };

//   const handleDownload = (url: string) => {
//     const downloadUrl = getDownloadUrl(url);
//     const link = document.createElement("a");
//     link.href = downloadUrl;
//     link.setAttribute("download", "");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(link.href);
//   };

//   return (
//     <div className="text-sm text-gray-700 space-y-2">
//       <div className="flex items-center justify-between">
//         {showTitle && (
//           <h3 className="text-lg font-semibold text-purple-800">{task.title}</h3>
//         )}
//         <div className="flex items-center gap-2"> {/* Group buttons */}
//           <button
//             onClick={() => setShowNotesModal(true)}
//             title="Add/View Notes"
//             className="text-gray-500 hover:text-purple-700 p-1 rounded-md"
//           >
//             📝
//           </button>
//           <button
//             onClick={copyAllFields}
//             className="text-sm text-gray-500 hover:text-purple-700 flex items-center gap-1"
//           >
//             <FaRegClipboard />
//             Copy All
//           </button>
//         </div>
//       </div>

//       {/* This component always renders details, hiding is handled by the parent (Board.tsx) */}
//       <>
//         {task.description && (
//           <p>
//             <strong>📝 Description:</strong> {task.description}
//             <CopyIcon text={String(task.description)} />
//           </p>
//         )}

//         {cf.shopName && (
//           <p>
//             <strong>🏪 Shop Name:</strong> {cf.shopName}
//             <CopyIcon text={String(cf.shopName)} />
//           </p>
//         )}
//         {cf.outletName && (
//           <p>
//             <strong>🏷️ Outlet Name:</strong> {cf.outletName}
//             <CopyIcon text={String(cf.outletName)} />
//           </p>
//         )}
//         {cf.phone && (
//           <p>
//             <strong>📞 Phone:</strong> {cf.phone}
//             <CopyIcon text={String(cf.phone)} />
//           </p>
//         )}
//         {cf.email && (
//           <p>
//             <strong>📧 Email:</strong> {cf.email}
//             <CopyIcon text={String(cf.email)} />
//           </p>
//         )}
//         {cf.customerName && (
//           <p>
//             <strong>👤 Customer Name:</strong> {cf.customerName}
//             <CopyIcon text={String(cf.customerName)} />
//           </p>
//         )}

//         {cf.packageAmount && (
//           <p>
//             <strong>💰 Package Amount:</strong> ₹{cf.packageAmount}
//             <CopyIcon text={String(cf.packageAmount)} />
//           </p>
//         )}

//         {cf.startDate && (
//           <p>
//             <strong>🗓️ Start Date:</strong> {cf.startDate}
//             <CopyIcon text={String(cf.startDate)} />
//           </p>
//         )}

//         {cf.endDate && (
//           <p>
//             <strong>📅 End Date:</strong> {cf.endDate}
//             <CopyIcon text={String(cf.endDate)} />
//           </p>
//         )}

//         {cf.timeline && (
//           <p>
//             <strong>⏱️ Timeline:</strong> {cf.timeline}
//             <CopyIcon text={String(cf.timeline)} />
//           </p>
//         )}

//         {cf.location &&
//           (isValidUrl(String(cf.location)) ? (
//             <p>
//               <strong>📍 Address:</strong>
//               <a
//                 href={String(cf.location)}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-block px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
//               >
//                 📍 View on Map
//               </a>
//               <CopyIcon text={String(cf.location)} />
//             </p>
//           ) : (
//             <p>
//               <strong>📍 Address:</strong> {cf.location}
//               <CopyIcon text={String(cf.location)} />
//             </p>
//           ))}

//         {cf.accountNumber && (
//           <p>
//             <strong>🏦 Account No.:</strong> {cf.accountNumber}
//             <CopyIcon text={String(cf.accountNumber)} />
//           </p>
//         )}
//         {cf.ifscCode && (
//           <p>
//             <strong>🔢 IFSC Code:</strong> {cf.ifscCode}
//             <CopyIcon text={String(cf.ifscCode)} />
//           </p>
//         )}

//         {task.tags && task.tags.length > 0 && (
//           <p>
//             <strong>🏷️ Tags:</strong> {task.tags.join(", ")}
//             <CopyIcon text={task.tags.join(", ")} />
//           </p>
//         )}

//         {task.attachments && task.attachments.length > 0 && (
//           <div>
//             <strong>📎 Attachments:</strong>
//             <ul className="list-disc ml-6 space-y-2">
//               {task.attachments.map((url, i) => {
//                 const label = getLabelFromUrl(url);
//                 const isPdf = url.toLowerCase().endsWith(".pdf");
//                 const isImage = /\.(jpe?g|png|webp)$/i.test(url);

//                 return (
//                   <li key={i} className="space-x-4">
//                     {(isPdf || isImage) && (
//                       <button
//                         onClick={() => setPreviewUrl(url)}
//                         className="text-purple-700 underline hover:text-purple-900"
//                       >
//                         👁️ Preview
//                       </button>
//                     )}
//                     <button
//                       onClick={() => handleDownload(url)}
//                       className="text-green-600 underline hover:text-green-800"
//                     >
//                       ⬇️ {label}
//                     </button>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         )}

//         {task.createdAt && (
//           <div className="space-y-1">
//             <p>
//               <strong>⏰ Created On:</strong>{" "}
//               {new Date(task.createdAt).toLocaleString()}
//               <CopyIcon text={new Date(task.createdAt).toLocaleString()} />
//             </p>
//           </div>
//         )}

//         {(displayAssignerName !== "—" || displayAssigneeName !== "—") && (
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4, ease: "easeOut" }}
//             className="mt-3 border-t pt-2 text-gray-600 text-sm flex justify-between items-start gap-4"
//           >
//             {displayAssignerName !== "—" && (
//               <div title={displayAssignerEmail}>
//                 <p className="text-xs uppercase text-gray-400 tracking-wider">Created By</p>
//                 <p className="font-medium text-gray-700">🧑‍💼 {displayAssignerName}</p>
//               </div>
//             )}
//             {displayAssigneeName !== "—" && (
//               <div title={displayAssigneeEmail}>
//                 <p className="text-xs uppercase text-gray-400 tracking-wider">Assigned To</p>
//                 <p className="font-medium text-gray-700">🙋 {displayAssigneeName}</p>
//               </div>
//             )}
//           </motion.div>
//         )}

//         {isAdmin && (
//           <div className="pt-4">
//             <button
//               onClick={() => {
//                 if (task.id && onDelete) {
//                   onDelete(task.id);
//                 } else {
//                   toast.error("Cannot delete. Task ID missing.");
//                 }
//               }}
//               className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
//             >
//               🗑️ Delete Task
//             </button>
//           </div>
//         )}
//       </>

//       {/* Existing Preview Modal */}
//       {previewUrl && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white max-w-3xl w-full p-4 rounded shadow-lg relative">
//             <button
//               onClick={() => setPreviewUrl(null)}
//               className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
//             >
//               <FaTimes size={20} />
//             </button>
//             <div className="overflow-auto max-h-[80vh]">
//               {previewUrl.toLowerCase().endsWith(".pdf") ? (
//                 <iframe
//                   src={`https://docs.google.com/gview?url=${encodeURIComponent(
//                     previewUrl
//                   )}&embedded=true`}
//                   className="w-full h-[70vh] border rounded"
//                   title="PDF Preview"
//                 />
//               ) : (
//                 <Image
//                   src={previewUrl}
//                   alt="Attachment Preview"
//                   width={800}
//                   height={600}
//                   className="max-w-full max-h-[70vh] object-contain mx-auto"
//                   unoptimized
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Notes Modal - Rendered conditionally */}
//       {showNotesModal && (
//         <NotesModal
//           taskId={task.id}
//           initialNote={task.notes} // Pass existing note if any
//           onClose={(updatedNote?: string) => {
//             // This callback is for when the modal closes
//             // You might want to update the task's note locally if saved from the modal
//             if (updatedNote !== undefined) {
//               // Optionally, trigger a refresh or update local task state
//               // This part depends on how you manage task data globally (e.g., SWR, Zustand, Redux)
//               // For simplicity, we'll assume a direct update or a refetch will occur.
//               // For now, it will simply close the modal.
//               // If you want to update the 'task.notes' prop, you'd need `setTask` in this component
//               // or lift the state higher. Given this is a display card, a refetch from parent is likely.
//             }
//             setShowNotesModal(false);
//           }}
//         />
//       )}
//     </div>
//   );
// }














// // components/TaskDetailsCard.tsx
// "use client";

// import React, { useState } from "react";
// import { FaRegClipboard, FaTimes } from "react-icons/fa";
// import toast from "react-hot-toast";
// import type { Task } from "../../../types/task"; // Ensure correct path
// import Image from "next/image";
// import { motion } from "framer-motion";

// // Import the new NotesModal component
// import NotesModal from "./NotesModal"; // Adjust path as needed based on your folder structure

// interface Props {
//   task: Task;
//   isAdmin?: boolean;
//   onDelete?: (taskId: string) => void;
// }

// // Utils
// const getLabelFromUrl = (url: string): string => {
//   const fileName = url.split("/").pop()?.toLowerCase() || "";
//   if (fileName.includes("aadhaar")) return "🆔 Aadhaar Card";
//   if (fileName.includes("pan")) return "💳 PAN Card";
//   if (fileName.includes("selfie")) return "🤳 Selfie Photo";
//   if (fileName.includes("license")) return "🍔 Food License";
//   if (fileName.includes("menu")) return "📄 Menu Card";
//   if (fileName.endsWith(".pdf")) return "📄 PDF Document";
//   return "📎 Attachment";
// };

// const isValidUrl = (str: string): boolean => {
//   try {
//     new URL(str);
//     return true;
//   } catch {
//     return false;
//   }
// };

// const getDownloadUrl = (url: string): string =>
//   url.includes("/upload/") ? url.replace("/upload/", "/upload/fl_attachment/") : url;

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

// export default function TaskDetailsCard({ task, isAdmin = false, onDelete }: Props) {
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   // State for the notes modal
//   const [showNotesModal, setShowNotesModal] = useState(false);

//   const cf = task.customFields || {};
//   const showTitle = task.title !== cf.shopName && task.title !== cf.outletName;

//   const displayAssignerName = task.assigner?.name || task.assignerName || "—";
//   const displayAssignerEmail = task.assigner?.email || task.assignerEmail || "";

//   // The 'assignees' property is now correctly defined in your Task type
//   const displayAssigneeName = task.assignee?.name || task.assignees?.map(a => a?.name || a?.email).filter(Boolean).join(", ") || "—";
//   const displayAssigneeEmail = task.assignee?.email || task.assigneeEmail || "";

//   const allValues = [
//     task.title,
//     task.description,
//     cf.shopName,
//     cf.outletName,
//     cf.phone,
//     cf.email,
//     cf.location,
//     cf.accountNumber,
//     cf.ifscCode,
//     cf.customerName,
//     cf.restId,
//     cf.packageAmount,
//     cf.startDate,
//     cf.endDate,
//     cf.timeline,
//     task.aadhaarUrl,
//     task.panUrl,
//     task.selfieUrl,
//     task.chequeUrl,
//     ...(task.menuCardUrls ?? []),
//     task.priority,
//     task.tags?.join(", "),
//     displayAssignerName,
//     displayAssignerEmail,
//     displayAssigneeName,
//     displayAssigneeEmail,
//     // CORRECTED LINE: Iterate over customFields object
//     ...(cf ? Object.entries(cf).map(([key, value]) => `${key}: ${value}`) : []),
//   ]
//     .filter(Boolean)
//     .join("\n");


//   const copyAllFields = () => {
//     navigator.clipboard.writeText(allValues);
//     toast.success("All details copied!");
//   };

//   const handleDownload = (url: string) => {
//     const downloadUrl = getDownloadUrl(url);
//     const link = document.createElement("a");
//     link.href = downloadUrl;
//     link.setAttribute("download", "");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(link.href);
//   };

//   return (
//     <div className="text-sm text-gray-700 space-y-2">
//       <div className="flex items-center justify-between">
//         {showTitle && (
//           <h3 className="text-lg font-semibold text-purple-800">{task.title}</h3>
//         )}
//         <div className="flex items-center gap-2"> {/* Group buttons */}
//           <button
//             onClick={() => setShowNotesModal(true)}
//             title="Add/View Notes"
//             className="text-gray-500 hover:text-purple-700 p-1 rounded-md"
//           >
//             📝
//           </button>
//           <button
//             onClick={copyAllFields}
//             className="text-sm text-gray-500 hover:text-purple-700 flex items-center gap-1"
//           >
//             <FaRegClipboard />
//             Copy All
//           </button>
//         </div>
//       </div>

//       {/* This component always renders details, hiding is handled by the parent (Board.tsx) */}
//       <>
//         {task.description && (
//           <p>
//             <strong>📝 Description:</strong> {task.description}
//             <CopyIcon text={String(task.description)} />
//           </p>
//         )}

//         {cf.shopName && (
//           <p>
//             <strong>🏪 Shop Name:</strong> {cf.shopName}
//             <CopyIcon text={String(cf.shopName)} />
//           </p>
//         )}
//         {cf.outletName && (
//           <p>
//             <strong>🏷️ Outlet Name:</strong> {cf.outletName}
//             <CopyIcon text={String(cf.outletName)} />
//           </p>
//         )}
//         {cf.phone && (
//           <p>
//             <strong>📞 Phone:</strong> {cf.phone}
//             <CopyIcon text={String(cf.phone)} />
//           </p>
//         )}
//         {cf.email && (
//           <p>
//             <strong>📧 Email:</strong> {cf.email}
//             <CopyIcon text={String(cf.email)} />
//           </p>
//         )}
//         {cf.customerName && (
//           <p>
//             <strong>👤 Customer Name:</strong> {cf.customerName}
//             <CopyIcon text={String(cf.customerName)} />
//           </p>
//         )}

//         {cf.packageAmount && (
//           <p>
//             <strong>💰 Package Amount:</strong> ₹{cf.packageAmount}
//             <CopyIcon text={String(cf.packageAmount)} />
//           </p>
//         )}

//         {cf.startDate && (
//           <p>
//             <strong>🗓️ Start Date:</strong> {cf.startDate}
//             <CopyIcon text={String(cf.startDate)} />
//           </p>
//         )}

//         {cf.endDate && (
//           <p>
//             <strong>📅 End Date:</strong> {cf.endDate}
//             <CopyIcon text={String(cf.endDate)} />
//           </p>
//         )}

//         {cf.timeline && (
//           <p>
//             <strong>⏱️ Timeline:</strong> {cf.timeline}
//             <CopyIcon text={String(cf.timeline)} />
//           </p>
//         )}

//         {cf.location &&
//           (isValidUrl(String(cf.location)) ? (
//             <p>
//               <strong>📍 Address:</strong>
//               <a
//                 href={String(cf.location)}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-block px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
//               >
//                 📍 View on Map
//               </a>
//               <CopyIcon text={String(cf.location)} />
//             </p>
//           ) : (
//             <p>
//               <strong>📍 Address:</strong> {cf.location}
//               <CopyIcon text={String(cf.location)} />
//             </p>
//           ))}

//         {cf.accountNumber && (
//           <p>
//             <strong>🏦 Account No.:</strong> {cf.accountNumber}
//             <CopyIcon text={String(cf.accountNumber)} />
//           </p>
//         )}
//         {cf.ifscCode && (
//           <p>
//             <strong>🔢 IFSC Code:</strong> {cf.ifscCode}
//             <CopyIcon text={String(cf.ifscCode)} />
//           </p>
//         )}

//         {task.tags && task.tags.length > 0 && (
//           <p>
//             <strong>🏷️ Tags:</strong> {task.tags.join(", ")}
//             <CopyIcon text={task.tags.join(", ")} />
//           </p>
//         )}

//         {task.attachments && task.attachments.length > 0 && (
//           <div>
//             <strong>📎 Attachments:</strong>
//             <ul className="list-disc ml-6 space-y-2">
//               {task.attachments.map((url, i) => {
//                 const label = getLabelFromUrl(url);
//                 const isPdf = url.toLowerCase().endsWith(".pdf");
//                 const isImage = /\.(jpe?g|png|webp)$/i.test(url);

//                 return (
//                   <li key={i} className="space-x-4">
//                     {(isPdf || isImage) && (
//                       <button
//                         onClick={() => setPreviewUrl(url)}
//                         className="text-purple-700 underline hover:text-purple-900"
//                       >
//                         👁️ Preview
//                       </button>
//                     )}
//                     <button
//                       onClick={() => handleDownload(url)}
//                       className="text-green-600 underline hover:text-green-800"
//                     >
//                         ⬇️ {label}
//                     </button>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         )}

//         {task.createdAt && (
//           <div className="space-y-1">
//             <p>
//               <strong>⏰ Created On:</strong>{" "}
//               {new Date(task.createdAt).toLocaleString()}
//               <CopyIcon text={new Date(task.createdAt).toLocaleString()} />
//             </p>
//           </div>
//         )}

//         {(displayAssignerName !== "—" || displayAssigneeName !== "—") && (
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4, ease: "easeOut" }}
//             className="mt-3 border-t pt-2 text-gray-600 text-sm flex justify-between items-start gap-4"
//           >
//             {displayAssignerName !== "—" && (
//               <div title={displayAssignerEmail}>
//                 <p className="text-xs uppercase text-gray-400 tracking-wider">Created By</p>
//                 <p className="font-medium text-gray-700">🧑‍💼 {displayAssignerName}</p>
//               </div>
//             )}
//             {displayAssigneeName !== "—" && (
//               <div title={displayAssigneeEmail}>
//                 <p className="text-xs uppercase text-gray-400 tracking-wider">Assigned To</p>
//                 <p className="font-medium text-gray-700">🙋 {displayAssigneeName}</p>
//               </div>
//             )}
//           </motion.div>
//         )}

//         {isAdmin && (
//           <div className="pt-4">
//             <button
//               onClick={() => {
//                 if (task.id && onDelete) {
//                   onDelete(task.id);
//                 } else {
//                   toast.error("Cannot delete. Task ID missing.");
//                 }
//               }}
//               className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
//             >
//               🗑️ Delete Task
//             </button>
//           </div>
//         )}
//       </>

//       {/* Existing Preview Modal */}
//       {previewUrl && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white max-w-3xl w-full p-4 rounded shadow-lg relative">
//             <button
//               onClick={() => setPreviewUrl(null)}
//               className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
//             >
//               <FaTimes size={20} />
//             </button>
//             <div className="overflow-auto max-h-[80vh]">
//               {previewUrl.toLowerCase().endsWith(".pdf") ? (
//                 <iframe
//                   src={`https://docs.google.com/gview?url=${encodeURIComponent(
//                     previewUrl
//                   )}&embedded=true`}
//                   className="w-full h-[70vh] border rounded"
//                   title="PDF Preview"
//                 />
//               ) : (
//                 <Image
//                   src={previewUrl}
//                   alt="Attachment Preview"
//                   width={800}
//                   height={600}
//                   className="max-w-full max-h-[70vh] object-contain mx-auto"
//                   unoptimized
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Notes Modal - Rendered conditionally */}
//       {showNotesModal && (
//         <NotesModal
//           taskId={task.id}
//           initialNotes={task.notes} // ✅ Corrected: Changed from initialNote to initialNotes
//           onClose={(updatedNote?: string) => {
//             // This callback is for when the modal closes
//             // You might want to update the task's note locally if saved from the modal
//             if (updatedNote !== undefined) {
//               // Optionally, trigger a refresh or update local task state
//               // This part depends on how you manage task data globally (e.g., SWR, Zustand, Redux)
//               // For simplicity, we'll assume a direct update or a refetch will occur.
//               // For now, it will simply close the modal.
//               // If you want to update the 'task.notes' prop, you'd need `setTask` in this component
//               // or lift the state higher. Given this is a display card, a refetch from parent is likely.
//             }
//             setShowNotesModal(false);
//           }}
//         />
//       )}
//     </div>
//   );
// }

















// components/TaskDetailsCard.tsx
"use client";

import React, { useState } from "react";
import { FaRegClipboard, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import type { Task } from "../../types/task"; // Ensure correct path

// Import the Note type here from where it's defintaskeed (likely types/task.ts or types/note.ts)
// Based on your previous snippet, Note is part of Task interface in types/task.ts
// If Note is a separate file like src/types/note.ts, adjust the import path accordingly.
import { Note } from "../../../types/note"; // Assuming Note is defined within types/task.ts

import Image from "next/image";
import { motion } from "framer-motion";

// Import the new NotesModal component
import NotesModal from "./NotesModal"; // Adjust path as needed based on your folder structure

interface Props {
  task: Task;
  isAdmin?: boolean;
  onDelete?: (taskId: string) => void;
  // If you want to update the task's notes from within TaskDetailsCard,
  // you might need an `onUpdateTask` prop or similar.
  onUpdateTask?: (taskId: string, updatedFields: Partial<Task>) => void;
}

// Utils
const getLabelFromUrl = (url: string): string => {
  const fileName = url.split("/").pop()?.toLowerCase() || "";
  if (fileName.includes("aadhaar")) return "🆔 Aadhaar Card";
  if (fileName.includes("pan")) return "💳 PAN Card";
  if (fileName.includes("selfie")) return "🤳 Selfie Photo";
  if (fileName.includes("license")) return "🍔 Food License";
  if (fileName.includes("menu")) return "📄 Menu Card";
  if (fileName.endsWith(".pdf")) return "📄 PDF Document";
  return "📎 Attachment";
};

const isValidUrl = (str: string): boolean => {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};

const getDownloadUrl = (url: string): string =>
  url.includes("/upload/") ? url.replace("/upload/", "/upload/fl_attachment/") : url;

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

export default function TaskDetailsCard({ task, isAdmin = false, onDelete, onUpdateTask }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // State for the notes modal
  const [showNotesModal, setShowNotesModal] = useState(false);

  const cf = task.customFields || {};
  const showTitle = task.title !== cf.shopName && task.title !== cf.outletName;

  const displayAssignerName = task.assigner?.name || task.assignerName || "—";
  const displayAssignerEmail = task.assigner?.email || task.assignerEmail || "";

  // The 'assignees' property is now correctly defined in your Task type
  const displayAssigneeName = task.assignees?.map(a => a?.name || a?.email).filter(Boolean).join(", ") || task.assignee?.name || "—";
  const displayAssigneeEmail = task.assignee?.email || task.assigneeEmail || "";


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
    cf.customerName,
    cf.restId,
    cf.packageAmount,
    cf.startDate,
    cf.endDate,
    cf.timeline,
    task.aadhaarUrl,
    task.panUrl,
    task.selfieUrl,
    task.chequeUrl,
    ...(task.menuCardUrls ?? []),
    task.priority,
    task.tags?.join(", "),
    displayAssignerName,
    displayAssignerEmail,
    displayAssigneeName,
    displayAssigneeEmail,
    // CORRECTED LINE: Iterate over customFields object
    ...(cf ? Object.entries(cf).map(([key, value]) => `${key}: ${value}`) : []),
  ]
    .filter(Boolean)
    .join("\n");


  const copyAllFields = () => {
    navigator.clipboard.writeText(allValues);
    toast.success("All details copied!");
  };

  const handleDownload = (url: string) => {
    const downloadUrl = getDownloadUrl(url);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="text-sm text-gray-700 space-y-2">
      <div className="flex items-center justify-between">
        {showTitle && (
          <h3 className="text-lg font-semibold text-purple-800">{task.title}</h3>
        )}
        <div className="flex items-center gap-2"> {/* Group buttons */}
          <button
            onClick={() => setShowNotesModal(true)}
            title="Add/View Notes"
            className="text-gray-500 hover:text-purple-700 p-1 rounded-md"
          >
            📝
          </button>
          <button
            onClick={copyAllFields}
            className="text-sm text-gray-500 hover:text-purple-700 flex items-center gap-1"
          >
            <FaRegClipboard />
            Copy All
          </button>
        </div>
      </div>

      {/* This component always renders details, hiding is handled by the parent (Board.tsx) */}
      <>
        {task.description && (
          <p>
            <strong>📝 Description:</strong> {task.description}
            <CopyIcon text={String(task.description)} />
          </p>
        )}

        {cf.shopName && (
          <p>
            <strong>🏪 Shop Name:</strong> {cf.shopName}
            <CopyIcon text={String(cf.shopName)} />
          </p>
        )}
        {cf.outletName && (
          <p>
            <strong>🏷️ Outlet Name:</strong> {cf.outletName}
            <CopyIcon text={String(cf.outletName)} />
          </p>
        )}
        {cf.phone && (
          <p>
            <strong>📞 Phone:</strong> {cf.phone}
            <CopyIcon text={String(cf.phone)} />
          </p>
        )}
        {cf.email && (
          <p>
            <strong>📧 Email:</strong> {cf.email}
            <CopyIcon text={String(cf.email)} />
          </p>
        )}
        {cf.customerName && (
          <p>
            <strong>👤 Customer Name:</strong> {cf.customerName}
            <CopyIcon text={String(cf.customerName)} />
          </p>
        )}

        {cf.packageAmount && (
          <p>
            <strong>💰 Package Amount:</strong> ₹{cf.packageAmount}
            <CopyIcon text={String(cf.packageAmount)} />
          </p>
        )}

        {cf.startDate && (
          <p>
            <strong>🗓️ Start Date:</strong> {cf.startDate}
            <CopyIcon text={String(cf.startDate)} />
          </p>
        )}

        {cf.endDate && (
          <p>
            <strong>📅 End Date:</strong> {cf.endDate}
            <CopyIcon text={String(cf.endDate)} />
          </p>
        )}

        {cf.timeline && (
          <p>
            <strong>⏱️ Timeline:</strong> {cf.timeline}
            <CopyIcon text={String(cf.timeline)} />
          </p>
        )}

        {cf.location &&
          (isValidUrl(String(cf.location)) ? (
            <p>
              <strong>📍 Address:</strong>
              <a
                href={String(cf.location)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
              >
                📍 View on Map
              </a>
              <CopyIcon text={String(cf.location)} />
            </p>
          ) : (
            <p>
              <strong>📍 Address:</strong> {cf.location}
              <CopyIcon text={String(cf.location)} />
            </p>
          ))}

        {cf.accountNumber && (
          <p>
            <strong>🏦 Account No.:</strong> {cf.accountNumber}
            <CopyIcon text={String(cf.accountNumber)} />
          </p>
        )}
        {cf.ifscCode && (
          <p>
            <strong>🔢 IFSC Code:</strong> {cf.ifscCode}
            <CopyIcon text={String(cf.ifscCode)} />
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
            <ul className="list-disc ml-6 space-y-2">
              {task.attachments.map((url, i) => {
                const label = getLabelFromUrl(url);
                const isPdf = url.toLowerCase().endsWith(".pdf");
                const isImage = /\.(jpe?g|png|webp)$/i.test(url);

                return (
                  <li key={i} className="space-x-4">
                    {(isPdf || isImage) && (
                      <button
                        onClick={() => setPreviewUrl(url)}
                        className="text-purple-700 underline hover:text-purple-900"
                      >
                        👁️ Preview
                      </button>
                    )}
                    <button
                      onClick={() => handleDownload(url)}
                      className="text-green-600 underline hover:text-green-800"
                    >
                        ⬇️ {label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {task.createdAt && (
          <div className="space-y-1">
            <p>
              <strong>⏰ Created On:</strong>{" "}
              {new Date(task.createdAt).toLocaleString()}
              <CopyIcon text={new Date(task.createdAt).toLocaleString()} />
            </p>
          </div>
        )}

        {(displayAssignerName !== "—" || displayAssigneeName !== "—") && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mt-3 border-t pt-2 text-gray-600 text-sm flex justify-between items-start gap-4"
          >
            {displayAssignerName !== "—" && (
              <div title={displayAssignerEmail}>
                <p className="text-xs uppercase text-gray-400 tracking-wider">Created By</p>
                <p className="font-medium text-gray-700">🧑‍💼 {displayAssignerName}</p>
              </div>
            )}
            {displayAssigneeName !== "—" && (
              <div title={displayAssigneeEmail}>
                <p className="text-xs uppercase text-gray-400 tracking-wider">Assigned To</p>
                <p className="font-medium text-gray-700">🙋 {displayAssigneeName}</p>
              </div>
            )}
          </motion.div>
        )}

        {isAdmin && (
          <div className="pt-4">
            <button
              onClick={() => {
                if (task.id && onDelete) {
                  onDelete(task.id);
                } else {
                  toast.error("Cannot delete. Task ID missing.");
                }
              }}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              🗑️ Delete Task
            </button>
          </div>
        )}
      </>

      {/* Existing Preview Modal */}
      {previewUrl && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white max-w-3xl w-full p-4 rounded shadow-lg relative">
            <button
              onClick={() => setPreviewUrl(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
            >
              <FaTimes size={20} />
            </button>
            <div className="overflow-auto max-h-[80vh]">
              {previewUrl.toLowerCase().endsWith(".pdf") ? (
                <iframe
                  src={`https://docs.google.com/gview?url=${encodeURIComponent(
                    previewUrl
                  )}&embedded=true`}
                  className="w-full h-[70vh] border rounded"
                  title="PDF Preview"
                />
              ) : (
                <Image
                  src={previewUrl}
                  alt="Attachment Preview"
                  width={800}
                  height={600}
                  className="max-w-full max-h-[70vh] object-contain mx-auto"
                  unoptimized
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Notes Modal - Rendered conditionally */}
      {showNotesModal && (
        <NotesModal
          taskId={task.id}
          initialNotes={task.notes}
          // ✅ FIX: Update the onClose prop to expect Note[] | undefined
          onClose={(updatedNotes?: Note[]) => {
            if (updatedNotes !== undefined && onUpdateTask) {
              // If NotesModal sends back updated notes, update the parent task state
              // This assumes you have an onUpdateTask prop to propagate changes
              onUpdateTask(task.id, { notes: updatedNotes });
            }
            setShowNotesModal(false); // Always close the modal
          }}
        />
      )}
    </div>
  );
}