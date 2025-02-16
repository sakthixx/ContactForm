'use client';

import { useForm } from 'react-hook-form';

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    // Handle form submission
    console.log(data);
    // Add your form submission logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-50">
      <div>
        {/* <h4>Contact Us</h4> */}
      </div>
      <div>
        <label className="block mb-1">Name</label>
        <input
        placeholder='Enter your name'
          {...register('name', { required: true })}
          className="w-full p-2 border rounded"
        />
        {errors.name && <span className="text-red-500">This field is required</span>}
      </div>

      <div>
        <label className="block mb-1">Email</label>
        <input
        placeholder='Enter your email'
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          className="w-full p-2 border rounded"
        />
        {errors.email && <span className="text-red-500">Valid email is required</span>}
      </div>

      <div>
        <label className="block mb-1">Upload Resume (optional)</label>
        <input
          type="file"
          {...register('resume')}
          className="w-full p-2 border rounded"
          accept=".pdf,.doc,.docx"
        />
      </div>

      <div>
        <label className="block mb-1">Message</label>
        <textarea
        placeholder='Enter your message'
          {...register('message', { required: true })}
          className="w-full p-2 border rounded h-32"
        />
        {errors.message && <span className="text-red-500">Message is required</span>}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Send Message
      </button>
    </form>
  );
}