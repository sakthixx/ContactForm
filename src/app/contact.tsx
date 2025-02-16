"use client";

import { useForm, ValidationError } from "@formspree/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiUploadCloud } from "react-icons/fi";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig"; // Import Firebase Storage
import bg1 from "./assets/bg1.png";

export default function ContactForm() {
  const [state, handleSubmit] = useForm("xjkgadzl");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fileURL, setFileURL] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const uploadFileToFirebase = async () => {
    if (!file) return;

    setUploading(true);
    const storageRef = ref(storage, `resumes/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Upload failed:", error);
          setUploading(false);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setFileURL(downloadURL);
          setUploading(false);
          resolve(downloadURL);
        }
      );
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let resumeURL = "";
    if (file) {
      resumeURL = (await uploadFileToFirebase()) as string;
    }

    const formData = new FormData(e.currentTarget);
    if (resumeURL) {
      formData.append("resume", resumeURL);
    }

    handleSubmit(formData);
  };

  if (state.succeeded) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center p-6 bg-green-100 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-green-700">Thank You!</h2>
        <p className="text-green-600 mt-2">We'll get back to you soon.</p>
      </motion.div>
    );
  }

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bg1.src})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-md mx-auto bg-white p-8 rounded-lg shadow-xl w-full"
      >
        <h2 className="text-3xl font-bold text-center text-gray-500 mb-6">
          Get in touch
        </h2>
        <form onSubmit={handleFormSubmit} className="space-y-6 w-full">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <input id="name" type="text" name="name" placeholder="Name" required className="w-full px-4 py-2 border rounded-lg" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <input id="email" type="email" placeholder="Email" name="email" required className="w-full px-4 py-2 border rounded-lg" />
            <ValidationError prefix="Email" field="email" errors={state.errors} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <input id="phone" type="phone" placeholder="Phone" name="phone" required className="w-full px-4 py-2 border rounded-lg" />
            <ValidationError prefix="Phone" field="phone" errors={state.errors} />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
            <textarea id="message" name="message" required placeholder="What can I do for you?" rows={4} className="w-full px-4 py-2 border rounded-lg" />
            <ValidationError prefix="Message" field="message" errors={state.errors} />
          </motion.div>

          {/* <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <label htmlFor="file-upload" className="block text-gray-700 font-medium text-sm">
              Upload a file (Optional)
            </label>
            <div className="relative flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-400 rounded-lg cursor-pointer p-4 bg-gray-50 hover:border-blue-500">
              <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} />
              <FiUploadCloud className="text-gray-500 text-5xl" />
              <p className="mt-2 text-gray-600 text-sm">Drag & Drop or Click to Upload</p>
            </div>
            {file && <p className="mt-2 text-gray-700 text-sm">📄 {file.name}</p>}
          </motion.div> */}

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <button type="submit" disabled={state.submitting || uploading} className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105">
              {uploading ? "Uploading File..." : "Send Message"}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
