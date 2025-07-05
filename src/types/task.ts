// src/types/task.ts
export type Task = {
  id: string;
  title: string;
  description?: string;
  status: string;
  dueDate?: string;
  priority?: string;
  tags?: string[];
  subtasks?: { title: string }[];
  assigner?: {
    id?: string;
    name?: string;
    email?: string;
  };
  assignee?: {
    id?: string;
    name?: string;
    email?: string;
  };
  assigneeId?: string;
  createdByClerkId?: string;
  updatedAt?: string;
  createdAt?: string;
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
