"use client";

import React, { useState } from "react";
import {
  FaTimes,
  FaStore,
  FaUserAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUniversity,
  FaHashtag,
} from "react-icons/fa";

export default function EditTaskModal({ task, onClose, onSave, onDelete }) {
  const [form, setForm] = useState({
    customFields: {
      shopName: task.customFields?.shopName || "",
      outletName: task.customFields?.outletName || "",
      phone: task.customFields?.phone || "",
      email: task.customFields?.email || "",
      location: task.customFields?.location || "",
      accountNumber: task.customFields?.accountNumber || "",
      ifscCode: task.customFields?.ifscCode || "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const field = name.split(".")[1];
    setForm((prev) => ({
      ...prev,
      customFields: {
        ...prev.customFields,
        [field]: value,
      },
    }));
  };

  const handleSubmit = () => {
    const updated = {
      ...task,
      customFields: form.customFields,
    };
    onSave(updated);
    onClose();
  };

  const Field = ({ icon, label, children }) => (
    <div className="space-y-1">
      <label className="flex items-center gap-2 text-sm font-medium text-purple-700">
        {icon} {label}
      </label>
      {children}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 relative border-t-4 border-purple-600">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <FaTimes size={18} />
        </button>

        <h2 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
          🏪 Edit Shop & Contact Info
        </h2>

        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          {/* SHOP & CONTACT INFO ONLY */}
          <div className="bg-yellow-50 rounded-md p-4 shadow-sm border-l-4 border-yellow-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field icon={<FaStore />} label="Shop Name">
                <input
                  name="customFields.shopName"
                  value={form.customFields.shopName}
                  onChange={handleChange}
                  className="input-field"
                />
              </Field>
              {/* <Field icon={<FaHashtag />} label="Outlet Name">
                <input
                  name="customFields.outletName"
                  value={form.customFields.outletName}
                  onChange={handleChange}
                  className="input-field"
                />
              </Field> */}
              <Field icon={<FaPhoneAlt />} label="Phone">
                <input
                  name="customFields.phone"
                  value={form.customFields.phone}
                  onChange={handleChange}
                  className="input-field"
                />
              </Field>
              <Field icon={<FaEnvelope />} label="Email">
                <input
                  name="customFields.email"
                  value={form.customFields.email}
                  onChange={handleChange}
                  className="input-field"
                />
              </Field>
              <Field icon={<FaMapMarkerAlt />} label="Location">
                <input
                  name="customFields.location"
                  value={form.customFields.location}
                  onChange={handleChange}
                  className="input-field"
                />
              </Field>
              <Field icon={<FaUniversity />} label="Account Number">
                <input
                  name="customFields.accountNumber"
                  value={form.customFields.accountNumber}
                  onChange={handleChange}
                  className="input-field"
                />
              </Field>
              <Field icon={<FaHashtag />} label="IFSC Code">
                <input
                  name="customFields.ifscCode"
                  value={form.customFields.ifscCode}
                  onChange={handleChange}
                  className="input-field"
                />
              </Field>
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => onDelete(task.id)}
            className="bg-red-100 text-red-600 hover:bg-red-200 px-4 py-2 rounded-md"
          >
            🗑️ Delete Task
          </button>
          <div className="space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 rounded-md"
            >
              💾 Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
