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


export default function RegisterForm() {
  const navigate = useNavigate();
  const handleCreate =  ()=>{
    navigate("/");
  }
  return (
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
          <Input placeholder="Full name" type="text" name="name" />
        </div>
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
          <Input placeholder="Email address" type="email" name="email" />
        </div>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <UsersRound />
          </span>
          <Select defaultValue="select">
            <SelectTrigger
              id="form-country"
              className="w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white border-slate-200 focus:border-[#00298d]"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="select">Select gender</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <CalendarIcon />
          </span>
          <input
            placeholder="Date of birth"
            className="w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white border-slate-200 focus:border-[#00298d]"
            type="date"
            name="dateOfBirth"
          />
        </div>

        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <KeyRound />
          </span>
          <Input placeholder="Password" type="password" name="password" />
        </div>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <KeyRound />
          </span>
          <Input
            placeholder="Confirm Password"
            type="password"
            name="rePassword"
          />
        </div>

        <button onClick={handleCreate} className="w-full rounded-xl py-3 text-base font-extrabold text-white transition disabled:opacity-60 bg-[#00298d] hover:bg-[#001f6b] cursor-pointer">
          Create New Account
        </button>
      </div>
    </div>
  );
}
