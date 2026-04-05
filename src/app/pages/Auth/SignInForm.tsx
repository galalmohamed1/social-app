
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KeyRound, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SignInForm() {

  const navigate = useNavigate();
  const handleLogin =  ()=>{
    navigate("/");
  }
  return (
    <>
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
          <Input placeholder="Email or username" type="text" name="login" />
        </div>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <KeyRound />
          </span>
          <Input placeholder="Password" type="password" name="password" />
        </div>

        <button onClick={handleLogin} className="w-full rounded-xl py-3 text-base font-extrabold text-white transition disabled:opacity-60 bg-[#00298d] hover:bg-[#001f6b] cursor-pointer">
          LogIn
        </button>
        <Button className="mx-auto block text-sm font-semibold text-[#00298d] transition hover:underline" variant="link">
          Forgot password?
        </Button>
      </div>

    </>
  );
}
