






// "use client";

// import React, { useEffect, useState } from "react";
// import BasicInfoStep from "./BasicInfoStep";
// import UploadsStep from "./UploadsStep";
// import CustomFieldsStep from "./CustomFieldsStep";
// import { uploadToCloudinary } from "./utils";

// type TeamMember = {
//   id: string;
//   email: string;
//   name?: string;
// };

// type CustomField = {
//   label: string;
//   value: string;
//   files: File[];
// };

// type TabType = "license" | "swiggy" | "zomato";
// const LOCAL_STORAGE_KEY = "onboarding-task-form";

// export default function TaskForm() {
//   const [title, setTitle] = useState("Zomato Onboarding");
//   const [assigneeId, setAssigneeId] = useState("");
//   const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
//   const [customFields, setCustomFields] = useState<CustomField[]>([]);
//   const [step, setStep] = useState(0);
//   const [activeTab, setActiveTab] = useState<TabType>("license");

//   const [aadhaarFile, setAadhaarFile] = useState<File[]>([]);
//   const [panFile, setPanFile] = useState<File[]>([]);
//   const [selfieFile, setSelfieFile] = useState<File[]>([]);
//   const [chequeFile, setChequeFile] = useState<File[]>([]);
//   const [menuCardFiles, setMenuCardFiles] = useState<File[]>([]);

//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [shopName, setShopName] = useState("");
//   const [location, setLocation] = useState("");
//   const [outletName, setOutletName] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const [ifscCode, setIfscCode] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [uploadStatus, setUploadStatus] = useState("");

//   useEffect(() => {
//     const fetchTeamMembers = async () => {
//       const mockMembers: TeamMember[] = [
//         { id: "1", email: "alice@example.com", name: "Alice" },
//         { id: "2", email: "bob@example.com", name: "Bob" },
//       ];
//       setTeamMembers(mockMembers);
//     };

//     fetchTeamMembers();

//     const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
//     if (saved) {
//       const parsed = JSON.parse(saved);
//       setTitle(parsed.title || "");
//       setAssigneeId(parsed.assigneeId || "");
//       setCustomFields(parsed.customFields || []);
//       setActiveTab(parsed.activeTab || "license");
//       setStep(parsed.step || 0);
//     }
//   }, []);

//   useEffect(() => {
//     const state = { title, assigneeId, customFields, activeTab, step };
//     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
//   }, [title, assigneeId, customFields, activeTab, step]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (step < 2) return setStep(step + 1);

//     setLoading(true);
//     setUploading(true);
//     setUploadStatus("");

//     try {
//       const staticFiles = [
//         ...aadhaarFile,
//         ...panFile,
//         ...selfieFile,
//         ...chequeFile,
//         ...menuCardFiles,
//       ].filter(Boolean);

//       const attachments = await Promise.all(
//         staticFiles.map((file) => uploadToCloudinary(file, setUploadStatus))
//       );

//       const uploadedCustomFields = await Promise.all(
//         customFields.map(async (field) => {
//           const urls: string[] = [];
//           for (const file of field.files) {
//             const url = await uploadToCloudinary(file, setUploadStatus);
//             urls.push(url);
//           }
//           return {
//             label: field.label,
//             value: field.value,
//             files: urls,
//           };
//         })
//       );

//       const payload = {
//         title,
//         assigneeId,
//         activeTab,
//         attachments,
//         tags: [],
//         customFields: {
//           phone,
//           email,
//           shopName,
//           location,
//           outletName,
//           accountNumber,
//           ifscCode,
//           fields: uploadedCustomFields,
//         },
//       };

//       const res = await fetch("/api/tasks", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const json = await res.json();

//       if (!res.ok) {
//         console.error("❌ Failed to create task:", json);
//         alert("❌ Failed to create task");
//         return;
//       }

//       console.log("✅ Task created:", json.task);
//       alert("✅ Task created successfully");

//       // Reset form
//       setStep(0);
//       setTitle("Zomato Onboarding");
//       setAssigneeId("");
//       setCustomFields([]);
//       setAadhaarFile([]);
//       setPanFile([]);
//       setSelfieFile([]);
//       setChequeFile([]);
//       setMenuCardFiles([]);
//       setPhone("");
//       setEmail("");
//       setShopName("");
//       setLocation("");
//       setOutletName("");
//       setAccountNumber("");
//       setIfscCode("");
//       localStorage.removeItem(LOCAL_STORAGE_KEY);
//     } catch (err) {
//       console.error("❌ Error in task submission", err);
//       alert("❌ Error while submitting");
//     } finally {
//       setLoading(false);
//       setUploading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
//       {/* Step Navigation */}
//       <div className="flex justify-center gap-4 mb-6">
//         {["Step 1", "Step 2", "Step 3"].map((label, idx) => (
//           <button
//             key={idx}
//             type="button"
//             onClick={() => setStep(idx)}
//             className={`px-4 py-2 rounded ${
//               step === idx ? "bg-purple-600 text-white" : "bg-gray-300"
//             }`}
//           >
//             {label}
//           </button>
//         ))}
//       </div>

//       {/* Step Content */}
//       {step === 0 && (
//         <BasicInfoStep
//           title={title}
//           assigneeId={assigneeId}
//           teamMembers={teamMembers}
//           activeTab={activeTab}
//           setTitle={setTitle}
//           setAssigneeId={setAssigneeId}
//           setActiveTab={setActiveTab}
//         />
//       )}

//       {step === 1 && (
//         <UploadsStep
//           activeTab={activeTab}
//           aadhaarFile={aadhaarFile}
//           panFile={panFile}
//           selfieFile={selfieFile}
//           chequeFile={chequeFile}
//           menuCardFiles={menuCardFiles}
//           phone={phone}
//           email={email}
//           shopName={shopName}
//           location={location}
//           outletName={outletName}
//           accountNumber={accountNumber}
//           ifscCode={ifscCode}
//           setAadhaarFile={setAadhaarFile}
//           setPanFile={setPanFile}
//           setSelfieFile={setSelfieFile}
//           setChequeFile={setChequeFile}
//           setMenuCardFiles={setMenuCardFiles}
//           setPhone={setPhone}
//           setEmail={setEmail}
//           setShopName={setShopName}
//           setLocation={setLocation}
//           setOutletName={setOutletName}
//           setAccountNumber={setAccountNumber}
//           setIfscCode={setIfscCode}
//         />
//       )}

//       {step === 2 && (
//         <CustomFieldsStep
//           customFields={customFields}
//           setCustomFields={setCustomFields}
//         />
//       )}

//       {uploading && uploadStatus && (
//         <p className="text-sm text-blue-600 mt-4 animate-pulse">{uploadStatus}</p>
//       )}

//       {/* Submit or Next Button */}
//       <div className="mt-6">
//         {step < 2 ? (
//           <button
//             type="button"
//             onClick={() => setStep(step + 1)}
//             className="bg-purple-600 text-white px-6 py-2 rounded"
//           >
//             ➡️ Next
//           </button>
//         ) : (
//           <button
//             type="submit"
//             className="bg-purple-600 text-white px-6 py-2 rounded w-full"
//             disabled={loading}
//           >
//             {loading ? "Creating..." : "✅ Create Task"}
//           </button>
//         )}
//       </div>
//     </form>
//   );
// }







"use client";

import React, { useEffect, useState } from "react";
import BasicInfoStep from "./BasicInfoStep";
import UploadsStep from "./UploadsStep";
import CustomFieldsStep from "./CustomFieldsStep";
import { uploadToCloudinary } from "./utils";

type TeamMember = {
  id: string;
  email: string;
  name?: string;
};

type CustomField = {
  label: string;
  value: string;
  files: File[];
};

type TabType = "license" | "swiggy" | "zomato";
const LOCAL_STORAGE_KEY = "onboarding-task-form";

export default function TaskForm() {
  const [title, setTitle] = useState("Zomato Onboarding");
  const [assigneeId, setAssigneeId] = useState("");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [step, setStep] = useState(0);
  const [activeTab, setActiveTab] = useState<TabType>("license");

  const [aadhaarFile, setAadhaarFile] = useState<File[]>([]);
  const [panFile, setPanFile] = useState<File[]>([]);
  const [selfieFile, setSelfieFile] = useState<File[]>([]);
  const [chequeFile, setChequeFile] = useState<File[]>([]);
  const [menuCardFiles, setMenuCardFiles] = useState<File[]>([]);

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [shopName, setShopName] = useState("");
  const [location, setLocation] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  useEffect(() => {
    const fetchTeamMembers = async () => {
      const mockMembers: TeamMember[] = [
        { id: "1", email: "alice@example.com", name: "Alice" },
        { id: "2", email: "bob@example.com", name: "Bob" },
      ];
      setTeamMembers(mockMembers);
    };

    fetchTeamMembers();

    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setTitle(parsed.title || "");
      setAssigneeId(parsed.assigneeId || "");
      setCustomFields(parsed.customFields || []);
      setActiveTab(parsed.activeTab || "license");
      setStep(parsed.step || 0);
    }
  }, []);

  useEffect(() => {
    const state = { title, assigneeId, customFields, activeTab, step };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [title, assigneeId, customFields, activeTab, step]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) return setStep(step + 1);

    setLoading(true);
    setUploading(true);
    setUploadStatus("");

    try {
      const staticFiles = [
        ...aadhaarFile,
        ...panFile,
        ...selfieFile,
        ...chequeFile,
        ...menuCardFiles,
      ].filter(Boolean);

      const attachments = await Promise.all(
        staticFiles.map((file) => uploadToCloudinary(file, setUploadStatus))
      );

      const uploadedCustomFields = await Promise.all(
        customFields.map(async (field) => {
          const urls: string[] = [];
          for (const file of field.files) {
            const url = await uploadToCloudinary(file, setUploadStatus);
            urls.push(url);
          }
          return {
            label: field.label,
            value: field.value,
            files: urls,
          };
        })
      );

      const payload = {
        title,
        assigneeId,
        activeTab,
        attachments,
        tags: [],
        customFields: {
          phone,
          email,
          shopName,
          location,
          accountNumber,
          ifscCode,
          fields: uploadedCustomFields,
        },
      };

      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) {
        console.error("❌ Failed to create task:", json);
        alert("❌ Failed to create task");
        return;
      }

      console.log("✅ Task created:", json.task);
      alert("✅ Task created successfully");

      // Reset form
      setStep(0);
      setTitle("Zomato Onboarding");
      setAssigneeId("");
      setCustomFields([]);
      setAadhaarFile([]);
      setPanFile([]);
      setSelfieFile([]);
      setChequeFile([]);
      setMenuCardFiles([]);
      setPhone("");
      setEmail("");
      setShopName("");
      setLocation("");
      setAccountNumber("");
      setIfscCode("");
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (err) {
      console.error("❌ Error in task submission", err);
      alert("❌ Error while submitting");
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="flex justify-center gap-4 mb-6">
        {["Step 1", "Step 2", "Step 3"].map((label, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setStep(idx)}
            className={`px-4 py-2 rounded ${step === idx ? "bg-purple-600 text-white" : "bg-gray-300"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {step === 0 && (
        <BasicInfoStep
          title={title}
          assigneeId={assigneeId}
          teamMembers={teamMembers}
          activeTab={activeTab}
          setTitle={setTitle}
          setAssigneeId={setAssigneeId}
          setActiveTab={setActiveTab}
        />
      )}

      {step === 1 && (
        <UploadsStep
          activeTab={activeTab}
          aadhaarFile={aadhaarFile}
          panFile={panFile}
          selfieFile={selfieFile}
          chequeFile={chequeFile}
          menuCardFiles={menuCardFiles}
          phone={phone}
          email={email}
          shopName={shopName}
          location={location}
          accountNumber={accountNumber}
          ifscCode={ifscCode}
          setAadhaarFile={setAadhaarFile}
          setPanFile={setPanFile}
          setSelfieFile={setSelfieFile}
          setChequeFile={setChequeFile}
          setMenuCardFiles={setMenuCardFiles}
          setPhone={setPhone}
          setEmail={setEmail}
          setShopName={setShopName}
          setLocation={setLocation}
          setAccountNumber={setAccountNumber}
          setIfscCode={setIfscCode}
        />
      )}

      {step === 2 && (
        <CustomFieldsStep
          customFields={customFields}
          setCustomFields={setCustomFields}
        />
      )}

      {uploading && uploadStatus && (
        <p className="text-sm text-blue-600 mt-4 animate-pulse">{uploadStatus}</p>
      )}

      <div className="mt-6">
        {step < 2 ? (
          <button
            type="button"
            onClick={() => setStep(step + 1)}
            className="bg-purple-600 text-white px-6 py-2 rounded"
          >
            ➡️ Next
          </button>
        ) : (
          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-2 rounded w-full"
            disabled={loading}
          >
            {loading ? "Creating..." : "✅ Create Task"}
          </button>
        )}
      </div>
    </form>
  );
}
