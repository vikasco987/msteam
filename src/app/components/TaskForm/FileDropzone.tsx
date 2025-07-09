// import { useCallback } from "react";
// import { useDropzone } from "react-dropzone";

// interface FileDropzoneProps {
//   onDrop: (files: File[]) => void;
//   acceptedFiles: File[];
//   label: string;
// }

// export default function FileDropzone({
//   onDrop,
//   acceptedFiles,
//   label,
// }: FileDropzoneProps) {
//   const handleDrop = useCallback((accepted: File[]) => {
//     onDrop(accepted);
//   }, [onDrop]);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop: handleDrop,
//     multiple: true,
//   });

//   return (
//     <div
//       {...getRootProps()}
//       className={`border-2 border-dashed p-4 rounded-lg cursor-pointer transition-colors duration-200 ${
//         isDragActive ? "bg-purple-100 border-purple-500" : "bg-purple-50 border-purple-300"
//       }`}
//     >
//       <input {...getInputProps()} />
//       <p className="text-center text-gray-700 font-medium">{label}</p>

//       {acceptedFiles?.length > 0 && (
//         <ul className="mt-2 text-sm text-gray-600 list-disc list-inside max-h-32 overflow-auto">
//           {acceptedFiles.map((file) => (
//             <li key={file.name} className="truncate">
//               {file.name}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }








import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface FileDropzoneProps {
  onDrop: (files: File[]) => void;
  acceptedFiles: File[];
  label: string;
}

export default function FileDropzone({
  onDrop,
  acceptedFiles,
  label,
}: FileDropzoneProps) {
  const handleDrop = useCallback(
    (accepted: File[]) => {
      onDrop(accepted);
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    multiple: true,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
      "application/pdf": [".pdf"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed p-4 rounded-lg cursor-pointer transition-colors duration-200 ${
        isDragActive
          ? "bg-purple-100 border-purple-500"
          : "bg-purple-50 border-purple-300"
      }`}
    >
      <input {...getInputProps()} />
      <p className="text-center text-gray-700 font-medium">{label}</p>

      {acceptedFiles?.length > 0 && (
        <ul className="mt-2 text-sm text-gray-600 list-disc list-inside max-h-32 overflow-auto">
          {acceptedFiles.map((file) => (
            <li key={file.name} className="truncate">
              {file.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
