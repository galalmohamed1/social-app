import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { KeyRound, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthAPI from "@/hooks/useAuthAPI";
import type { AuthResponse } from "@/types/Note";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignInForm() {
  const navigate = useNavigate();
  const { signIn } = useAuthAPI();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState<AuthResponse | null>(null);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return toast.error("Login failed ❌", {
        position: "top-center",
        autoClose: 2000,
        transition: Bounce,
      });
    }

    const data = await signIn(formData);

    if (data) {
      setLoginData(data);
      toast.success("Login successfully ✅", {
        position: "top-center",
        autoClose: 2000,
        transition: Bounce,
      });
    } else {
      toast.error("User is Not Found ❌", {
        position: "top-center",
        autoClose: 2000,
        transition: Bounce,
      });
    }
  };

  useEffect(() => {
    if (loginData) {
      navigate("/home");
    }
  }, [loginData, navigate]);

  return (
    <form onSubmit={handleLogin}>
      <h2 className="text-2xl font-extrabold text-slate-900">
        Log in to Route Posts
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Log in and continue your social journey.
      </p>

      <div className="mt-5 space-y-3.5">
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <User />
          </span>
          <Input
            placeholder="Email address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
            autoComplete="email"
            className={
              errors.email ? "border-red-500 focus:border-red-500" : ""
            }
          />
        </div>
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}

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
            autoComplete="current-password"
            className={
              errors.password ? "border-red-500 focus:border-red-500" : ""
            }
          />
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password}</p>
        )}

        <button
          type="submit"
          className="w-full rounded-xl py-3 text-base font-extrabold text-white transition disabled:opacity-60 bg-[#00298d] hover:bg-[#001f6b] cursor-pointer"
        >
          LogIn
        </button>

        <button
          type="button"
          className="mx-auto cursor-pointer block text-sm font-semibold text-[#00298d] transition hover:underline"
        >
          Forgot password?
        </button>
      </div>
    </form>
  );
}

// <>
//   <h2 className="text-2xl font-extrabold text-slate-900">
//     Log in to Route Posts
//   </h2>
//   <p className="mt-1 text-sm text-slate-500">
//     Log in and continue your social journey.
//   </p>
//   <div className="mt-5 space-y-3.5">
//     <div className="relative">
//       <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
//         <User />
//       </span>
//       <Input placeholder="Email or username" type="text" name="login" />
//     </div>
//     <div className="relative">
//       <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
//         <KeyRound />
//       </span>
//       <Input placeholder="Password" type="password" name="password" />
//     </div>

//     <button onClick={handleLogin} className="w-full rounded-xl py-3 text-base font-extrabold text-white transition disabled:opacity-60 bg-[#00298d] hover:bg-[#001f6b] cursor-pointer">
//       LogIn
//     </button>
//     <button className="mx-auto cursor-pointer block text-sm font-semibold text-[#00298d] transition hover:underline">
//       Forgot password?
//     </button>
//   </div>

// </>
