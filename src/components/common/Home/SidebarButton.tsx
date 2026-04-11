import React, { memo } from "react";

type Props = {
  active?: boolean;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
};

const SidebarButton = ({ active, icon, label, onClick }: Props) => {
  return (
    <button
    onClick={onClick}
      className={`cursor-pointer flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold transition
      ${
        active
          ? "bg-[#e7f3ff] text-[#1877f2]"
          : "text-slate-700 hover:bg-slate-100"
      }`}
    >
      {icon}
      {label}
    </button>
  );
};

export default memo(SidebarButton);