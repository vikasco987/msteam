// // components/TaskAttachments.tsx

// import React from "react";

// type TaskAttachmentProps = {
//   customFields?: {
//     label: string;
//     value: string | File[];
//     files?: string[];
//   }[];
//   attachments?: string[];
// };

// const TaskAttachments: React.FC<TaskAttachmentProps> = ({ customFields, attachments }) => {
//   return (
//     <div className="mt-2 text-sm text-gray-700">
//       {attachments && attachments.length > 0 && (
//         <>
//           <p className="font-semibold">📁 Attachments:</p>
//           <ul className="list-disc ml-4 space-y-1">
//             {attachments.map((url, index) => (
//               <li key={index}>
//                 <a
//                   href={url}
//                   download
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 hover:underline"
//                 >
//                   {url.split("/").pop()}
//                 </a>
//                 {url.match(/\.(jpeg|jpg|png|webp|gif)$/i) && (
//                   <img src={url} alt="preview" className="w-32 mt-1 rounded shadow" />
//                 )}
//               </li>
//             ))}
//           </ul>
//         </>
//       )}

//       {customFields && customFields.length > 0 && (
//         <>
//           <p className="font-semibold mt-2">📎 Custom Field Files:</p>
//           <ul className="list-disc ml-4 space-y-1">
//             {customFields.map((field, i) => (
//               <li key={i}>
//                 <strong>{field.label}:</strong>{" "}
//                 {field.files && field.files.length > 0 ? (
//                   <ul className="ml-2">
//                     {field.files.map((url, j) => (
//                       <li key={j}>
//                         <a
//                           href={url}
//                           download
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-600 hover:underline"
//                         >
//                           {url.split("/").pop()}
//                         </a>
//                         {url.match(/\.(jpeg|jpg|png|webp|gif)$/i) && (
//                           <img
//                             src={url}
//                             alt="preview"
//                             className="w-32 mt-1 rounded shadow"
//                           />
//                         )}
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <span className="text-gray-400">No files</span>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// };

// export default TaskAttachments;







// import React from "react";

// type TaskAttachmentProps = {
//   customFields?: {
//     label: string;
//     value: string | string[] | File[];
//     files?: string[];
//   }[];
//   attachments?: string[];
// };

// const TaskAttachments: React.FC<TaskAttachmentProps> = ({ customFields, attachments }) => {
//   return (
//     <div className="mt-2 text-sm text-gray-700">
//       {/* General Attachments */}
//       {attachments && attachments.length > 0 && (
//         <>
//           <p className="font-semibold">📁 Attachments:</p>
//           <ul className="list-disc ml-4 space-y-1">
//             {attachments.map((url, index) => (
//               <li key={index}>
//                 <a
//                   href={url}
//                   download
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 hover:underline"
//                 >
//                   {url.split("/").pop()}
//                 </a>
//                 {url.match(/\.(jpeg|jpg|png|webp|gif)$/i) && (
//                  <img src={url} alt="preview" className="w-32 mt-1 rounded shadow" />


// //             <Image
// //   src={url}
// //   alt="preview"
// //   width={128}
// //   height={96}
// //   className="mt-1 rounded shadow"
// // />





//                 )}
//               </li>
//             ))}
//           </ul>
//         </>
//       )}

//       {/* Custom Field Attachments */}
//       {customFields && customFields.length > 0 && (
//         <>
//           <p className="font-semibold mt-2">📎 Custom Field Files:</p>
//           <ul className="list-disc ml-4 space-y-1">
//             {customFields.map((field, i) => (
//               <li key={i}>
//                 <strong>{field.label}:</strong>{" "}
//                 {field.files && field.files.length > 0 ? (
//                   <ul className="ml-2">
//                     {field.files.map((url, j) => (
//                       <li key={j}>
//                         <a
//                           href={url}
//                           download
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-600 hover:underline"
//                         >
//                           {url.split("/").pop()}
//                         </a>
//                         {url.match(/\.(jpeg|jpg|png|webp|gif)$/i) && (
//                           <img
//                             src={url}
//                             alt="preview"
//                             className="w-32 mt-1 rounded shadow"
//                           />
//                         )}
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <span className="text-gray-400">No files</span>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// };

// export default TaskAttachments;











"use client";

import React from "react";
import Image from "next/image";

type TaskAttachmentProps = {
  customFields?: {
    label: string;
    value: string | string[] | File[];
    files?: string[];
  }[];
  attachments?: string[];
};

const TaskAttachments: React.FC<TaskAttachmentProps> = ({ customFields, attachments }) => {
  return (
    <div className="mt-2 text-sm text-gray-700">
      {/* General Attachments */}
      {attachments && attachments.length > 0 && (
        <>
          <p className="font-semibold">📁 Attachments:</p>
          <ul className="list-disc ml-4 space-y-1">
            {attachments.map((url, index) => (
              <li key={index}>
                <a
                  href={url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {url.split("/").pop()}
                </a>

                {url.match(/\.(jpeg|jpg|png|webp|gif)$/i) && (
                  <div className="mt-1">
                    <Image
                      src={url}
                      alt="Attachment Preview"
                      width={128}
                      height={96}
                      className="rounded shadow"
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Custom Field Attachments */}
      {customFields && customFields.length > 0 && (
        <>
          <p className="font-semibold mt-4">📎 Custom Field Files:</p>
          <ul className="list-disc ml-4 space-y-1">
            {customFields.map((field, i) => (
              <li key={i}>
                <strong>{field.label}:</strong>{" "}
                {field.files && field.files.length > 0 ? (
                  <ul className="ml-2">
                    {field.files.map((url, j) => (
                      <li key={j}>
                        <a
                          href={url}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {url.split("/").pop()}
                        </a>

                        {url.match(/\.(jpeg|jpg|png|webp|gif)$/i) && (
                          <div className="mt-1">
                            <Image
                              src={url}
                              alt="Custom Field Preview"
                              width={128}
                              height={96}
                              className="rounded shadow"
                            />
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-gray-400">No files</span>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default TaskAttachments;
