// export type Task = {
//   id: string;
//   title: string;
//   status: string;
//   createdAt: string;
//   updatedAt?: string;
//   tags: string[];
//   assigneeId?: string;
//   assigneeEmail?: string;
//   assignerEmail?: string;
//   assignerName?: string;
//   customFields?: Record<string, any>;
//   attachments: string[];
//   dueDate?: string;
//   priority?: string;
//   projectId?: string;
//   createdByClerkId: string;

//   subtasks: any[];

//   // ✅ Added for enrichment
//   assignee?: {
//     name: string;
//     email: string;
//   };
// };







export type CustomFieldValue = string | number | boolean | null | undefined;
export type CustomFields = { [key: string]: CustomFieldValue };

export type Subtask = {
  title: string;
  isCompleted?: boolean;
};

export type Task = {
  id: string;
  title: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
  tags: string[];
  assigneeId?: string;
  assigneeEmail?: string;
  assignerEmail?: string;
  assignerName?: string;
  customFields?: CustomFields;
  attachments: string[];
  dueDate?: string;
  priority?: string;
  projectId?: string;
  createdByClerkId: string;
  subtasks: Subtask[];
  assignee?: {
    name: string;
    email: string;
  };
};
