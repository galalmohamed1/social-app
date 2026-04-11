import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { AtSign, CalendarIcon, KeyRound, User, UsersRound } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
// import type { AuthResponse } from "@/types/Note";
import useAuthAPI from "@/hooks/useAuthAPI";
import { Bounce, toast } from "react-toastify";
import type { Users } from "@/types/Note";

export default function RegisterForm() {
  const navigate = useNavigate();
  const { signUp } = useAuthAPI();

  const [registerData, setRegisterData] = useState<{
    message: string;
    token: string;
    user: Users;
  }|null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    dateOfBirth: "",
    gender: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    password: "",
    rePassword: "",
  });
  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      gender: "",
      dateOfBirth: "",
      password: "",
      rePassword: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.gender.trim()) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = "Date of birth is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.rePassword.trim()) {
      newErrors.rePassword = "Confirm password is required";
    } else if (formData.password !== formData.rePassword) {
      newErrors.rePassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleGenderChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      gender: value,
    }));
  };
  

  const handleCreate = async () => {
    const isValid = validateForm();

    if (!isValid) {
      return toast.error("Validation failed ❌", {
        position: "top-center",
        autoClose: 2000,
        transition: Bounce,
      });
    }

    const result = await signUp({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      rePassword: formData.rePassword,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender as "male" | "female",
    });

    if (result) {
      setRegisterData(result);
      toast.success("Registration successful ✅", {
        position: "top-center",
        autoClose: 2000,
        transition: Bounce,
      });
    } else {
      return toast.error("Registration failed ❌", {
        position: "top-center",
        autoClose: 2000,
        transition: Bounce,
      });
    }
  };

  useEffect(() => {
    if (registerData) {
      navigate("/");
    }
  }, [registerData, navigate]);

  return (
    <>
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900">
          Create a new account
        </h2>

        <p className="mt-1 text-sm text-slate-500">It is quick and easy.</p>

        <div className="mt-5 space-y-3.5">
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <User />
            </span>
            <Input
              placeholder="Full name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              aria-invalid={!!errors.name}
              className={
                errors.name
                  ? "border-red-500 focus:border-red-500 ring-0 shadow-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  : "border-slate-200 focus:border-[#00298d]"
              }
            />
          </div>
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}

          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <AtSign />
            </span>
            <Input
              placeholder="Username (optional)"
              type="text"
              name="username"
            />
          </div>

          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <AtSign />
            </span>
            <Input
              placeholder="Email address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              className={
                errors.email ? "border-red-500 focus:border-red-500" : ""
              }
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}

          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <UsersRound />
            </span>
            <Select onValueChange={handleGenderChange} value={formData.gender}>
              <SelectTrigger
                className={
                  errors.gender
                    ? "w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white border-slate-200 focus:border-[#00298d] border-red-500 focus:border-red-500"
                    : "w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white border-slate-200 focus:border-[#00298d]"
                }
                aria-invalid={!!errors.gender}
              >
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {errors.gender && (
            <p className="text-sm text-red-500">{errors.gender}</p>
          )}

          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <CalendarIcon />
            </span>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              aria-invalid={!!errors.dateOfBirth}
              className={`w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white ${
                errors.dateOfBirth
                  ? "border-red-500 focus:border-red-500"
                  : "border-slate-200 focus:border-[#00298d]"
              }`}
            />
          </div>
          {errors.dateOfBirth && (
            <p className="text-sm text-red-500">{errors.dateOfBirth}</p>
          )}

          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <KeyRound />
            </span>
            <Input
              placeholder="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              aria-invalid={!!errors.password}
              className={
                errors.password ? "border-red-500 focus:border-red-500" : ""
              }
            />
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}

          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <KeyRound />
            </span>
            <Input
              placeholder="Confirm Password"
              type="password"
              name="rePassword"
              value={formData.rePassword}
              onChange={handleChange}
              aria-invalid={!!errors.rePassword}
              className={
                errors.rePassword ? "border-red-500 focus:border-red-500" : ""
              }
            />
          </div>
          {errors.rePassword && (
            <p className="text-sm text-red-500">{errors.rePassword}</p>
          )}

          <button
            onClick={handleCreate}
            className="w-full rounded-xl py-3 text-base font-extrabold text-white transition disabled:opacity-60 bg-[#00298d] hover:bg-[#001f6b] cursor-pointer"
          >
            Create New Account
          </button>
        </div>
      </div>
    </>
  );
}

// <>
//   <h2 className="text-2xl font-extrabold text-slate-900">
//     Create a new account
//   </h2>
//   <p className="mt-1 text-sm text-slate-500">It is quick and easy.</p>
//   <div className="mt-5 space-y-3.5">
//     <div className="relative">
//       <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
//         <User />
//       </span>
//       <Input placeholder="Full name" type="text" name="name" />
//     </div>
//     <div className="relative">
//       <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
//         <AtSign />
//       </span>
//       <Input
//         placeholder="Username (optional)"
//         type="text"
//         name="username"
//       />
//     </div>
//     <div className="relative">
//       <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
//         <AtSign />
//       </span>
//       <Input placeholder="Email address" type="email" name="email" />
//     </div>
//     <div className="relative">
//       <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
//         <UsersRound />
//       </span>
//       <Select defaultValue="select">
//         <SelectTrigger
//           id="form-country"
//           className="w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white border-slate-200 focus:border-[#00298d]"
//         >
//           <SelectValue />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="select">Select gender</SelectItem>
//           <SelectItem value="male">Male</SelectItem>
//           <SelectItem value="female">Female</SelectItem>
//         </SelectContent>
//       </Select>
//     </div>
//     <div className="relative">
//       <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
//         <CalendarIcon />
//       </span>
//       <input
//         placeholder="Date of birth"
//         className="w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white border-slate-200 focus:border-[#00298d]"
//         type="date"
//         name="dateOfBirth"
//       />
//     </div>

//     <div className="relative">
//       <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
//         <KeyRound />
//       </span>
//       <Input placeholder="Password" type="password" name="password" />
//     </div>
//     <div className="relative">
//       <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
//         <KeyRound />
//       </span>
//       <Input
//         placeholder="Confirm Password"
//         type="password"
//         name="rePassword"
//       />
//     </div>

//     <button onClick={handleCreate} className="w-full rounded-xl py-3 text-base font-extrabold text-white transition disabled:opacity-60 bg-[#00298d] hover:bg-[#001f6b] cursor-pointer">
//       Create New Account
//     </button>
//   </div>
// </>
