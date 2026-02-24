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
  });

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
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
        onChange={handelChange}
        className="border p-2"
      />
      <input
        name="surname"
        value={form.surname}
        onChange={handelChange}
        className="border p-2"
      />

      <input
        name="email"
        value={form.email}
        onChange={handelChange}
        className="border p-2"
      />
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
