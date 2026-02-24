import { useState } from "react";
import type { User, UpdateUserData } from "../../types/user";

type Props = {
  user: User;
  onClose: () => void;
  onSave: (data: UpdateUserData) => void;
};

export default function EditUserForm({ user, onClose, onSave }: Props) {
  const [form, setForm] = useState<UpdateUserData>({
    name: user.name,
    surname: user.surname,
    email: user.email,
    active: user.active,
  });

  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setForm({
  //       ...form,
  //       [e.target.name]: e.target.value,
  //     });
  //   };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = () => {
    onSave(form);
  };
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold">EDIT USER-{user.name}</h2>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        className="border p-2"
      />
      <input
        name="surname"
        value={form.surname}
        onChange={handleChange}
        className="border p-2"
      />

      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        className="border p-2"
      />
      {/* ✅ CHECKBOX - Active durumu */}
      <label className="flex items-center gap-2 cursor-pointer p-2 border rounded hover:bg-gray-50">
        <input
          type="checkbox"
          name="active"
          checked={form.active}
          onChange={handleChange}
          className="w-4 h-4 text-blue-600"
        />
        <span
          className={
            form.active ? "text-green-600 font-medium" : "text-red-500"
          }
        >
          {form.active ? "✅ Active" : "❌ Inactive"}
        </span>
      </label>
      <div>
        <button
          className="px-3 py-1 bg-blue-500 text-white"
          onClick={handleSubmit}
        >
          save
        </button>
        <button className="px-3 py-1 bg-red-500 text-white" onClick={onClose}>
          cancel
        </button>
      </div>
    </div>
  );
}
