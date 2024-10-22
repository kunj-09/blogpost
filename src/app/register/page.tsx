"use client"; // This makes the component a Client Component

import { useState } from "react";
import Button from "../components/button"; // Importing the Button component
import { useRouter } from "next/navigation"; // Use next/navigation instead of next/router

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle input field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      router.push("/");
    } catch (err: any) {
      setError(err.message || "An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="overflow-hidden pt-[180px] pb-[120px]">
      <div className="container">
        <div className="-mx-4 flex justify-center">
          <div className="w-full px-4 lg:w-6/12">
            <div className="rounded-md bg-primary bg-opacity-5 p-8 dark:bg-opacity-10">
              <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
                Register
              </h2>
              {error && (
                <div className="mb-4 text-red-600">
                  <p>{error}</p>
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 text-base leading-tight focus:border-primary focus:outline-none dark:bg-gray-800 dark:border-gray-600"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 text-base leading-tight focus:border-primary focus:outline-none dark:bg-gray-800 dark:border-gray-600"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 text-base leading-tight focus:border-primary focus:outline-none dark:bg-gray-800 dark:border-gray-600"
                    required
                  />
                </div>
                <div className="flex justify-center">
                  {/* Using the Button component */}
                  <Button
                    text={loading ? "Registering..." : "Register"}
                    onClick={()=>handleSubmit} // Corrected the function reference
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}