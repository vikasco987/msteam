// export type Task = {
//   id: string;
//   title: string;
//   status: string;
//   tags?: string[];
//   dueDate?: string;
//   priority?: string;
//   projectId?: string;
//   assignerEmail?: string;
//   assigneeEmail?: string;
//   assignerName?: string;
//   assignee?: {
//     name: string;
//     email: string;
//   };
//   attachments?: string[];
//   customFields?: {
//     phone?: string;
//     email?: string;
//     shopName?: string;
//     outletName?: string;
//     location?: string;
//     accountNumber?: string;
//     ifscCode?: string;
//     fields?: any[];
//     amount?: number;
//     amountReceived?: number;
//   };
//   createdAt: string;
//   updatedAt?: string;
//   assigneeId?: string;
//   createdByClerkId: string;
//   subtasks?: any[];
// };











// // Define reusable type for custom field values
// export type CustomFieldValue = string | number | boolean | null | undefined;

// // Define custom fields as a dictionary of valid values
// export type CustomFields = {
//   [key: string]: CustomFieldValue;
// };

// // Final Task type
// // ✅ Updated Task type
// export type Task = {
//   id: string;
//   title: string;
//   description?: string;
//   status: string;
//   dueDate?: string;
//   priority?: string;
//   assigner?: {
//     id?: string;
//     name?: string;
//     email?: string;
//   };
//   assignee?: {
//     id?: string;
//     name?: string;
//     email?: string;
//   };
//   assigneeId?: string;
//   createdByClerkId?: string;
//   updatedAt?: string;
//   createdAt?: string;
//   tags?: string[];
//   subtasks?: { title: string }[];
//   customFields?: Record<string, unknown>;
//   attachments?: string[];
// };








// Define reusable type for custom field values
export type CustomFieldValue = string | number | boolean | null | undefined;

// Define custom fields as a dictionary of valid values
export type CustomFields = {
  [key: string]: CustomFieldValue;
};

// // Final Task type
// export type Task = {
//   id: string;
//   title: string;
//   description?: string;
//   status: string;
//   dueDate?: string;
//   priority?: string;

//   assigner?: {
//     name: string;
//     email: string;
//   };

//   assignee?: {
//     name: string;
//     email: string;
//   };

//   assigneeId?: string;           // ✅ Clerk ID of assignee
//   createdByClerkId: string;      // ✅ Required Clerk ID of creator

//   createdAt: string;
//   updatedAt?: string;

//   tags: string[];
//   subtasks: { title: string; completed?: boolean }[];

//   customFields?: CustomFields;
//   attachments: string[];
// };







export type Task = {
  id: string;
  title: string;
  description?: string; // ✅ Add this line
  status: string;
  dueDate?: string;
  priority?: string;

  assigner?: {
    name: string;
    email: string;
  };

  assignee?: {
    name: string;
    email: string;
  };

  assigneeId?: string;
  createdByClerkId: string;

  createdAt: string;
  updatedAt?: string;

  tags: string[];
  subtasks: { title: string; completed?: boolean }[];

  customFields?: {
    [key: string]: string | number | boolean | null | undefined;
  };

  attachments: string[];
};
