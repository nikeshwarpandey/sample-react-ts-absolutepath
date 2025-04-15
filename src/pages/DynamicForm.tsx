import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { formFields } from '@/formConfig';

export default function DynamicForm() {
  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validate = () => {
    const newErrors: any = {};
    formFields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      } else if (field.type === 'email' && formData[field.name]) {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[field.name]);
        if (!isValid) newErrors[field.name] = 'Invalid email';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert('Form submitted: ' + JSON.stringify(formData, null, 2));
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Dynamic Configurable Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {formFields.map(field => (
            <div key={field.name}>
              <label className="block">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                onChange={handleChange}
                className="w-full border px-3 py-2"
              />
              {errors[field.name] && (
                <p className="text-red-500 text-sm">{errors[field.name]}</p>
              )}
            </div>
          ))}
          <button className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
        </form>
      </div>
    </>
  );
}
