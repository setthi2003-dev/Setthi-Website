import React from "react";
import { ExpenseCategory, TransactionItem } from "./types";

interface NotificationToastProps {
  transaction: TransactionItem;
  className?: string;
  style?: React.CSSProperties;
  compact?: boolean;
}

export const getCategoryColor = (category: ExpenseCategory): string => {
  switch (category) {
    case "essentials":
      // Slate neutral for essentials
      return "#636674";
    case "discretionary":
      // Warm taupe/sand neutral for discretionary
      return "#8E8271";
    case "leaks":
      // Muted dusty stone/warm neutral for leaks (no aggressive reds)
      return "#8A6E6E";
    case "saved":
      // Restrained forest green accent
      return "#3B6E59";
    default:
      return "#636674";
  }
};

export default function NotificationToast({
  transaction,
  className = "",
  style,
  compact = false,
}: NotificationToastProps) {
  const indicatorColor = getCategoryColor(transaction.category);
  const formattedAmount = transaction.amount < 0
    ? `-₹${Math.abs(transaction.amount).toLocaleString("en-IN")}`
    : `+₹${transaction.amount.toLocaleString("en-IN")}`;

  return (
    <div
      style={style}
      className={`relative flex items-center justify-between w-full h-12.5 rounded-2xl bg-[#181818] border border-white/[0.08] hover:border-white/[0.16] px-4 select-none transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.25)] ${className}`}
    >
      {/* 3px vertical color indicator with rounded caps on the leading edge */}
      <span
        className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full"
        style={{ backgroundColor: indicatorColor }}
        aria-hidden="true"
      />

      {/* Left section: Monospace timestamp, arrow glyph, bold single-line merchant */}
      <div className="flex items-center gap-3 min-w-0 pr-3">
        {/* Monospace timestamp on the far left */}
        <span className="font-mono text-xs text-[#8A8F98] tracking-tight shrink-0 tabular-nums">
          {transaction.time}
        </span>

        {/* Understated neutral arrow glyph */}
        <span className="text-[#8A8F98]/70 text-xs shrink-0 font-mono" aria-hidden="true">
          ↘
        </span>

        {/* Bold single-line merchant label */}
        <span className="font-semibold text-sm text-[#EDEDED] tracking-tight truncate">
          {transaction.merchant}
        </span>
      </div>

      {/* Right section: Crisp white right-aligned amount */}
      <div className="shrink-0 flex items-center gap-2">
        {compact && (
          <span className="hidden sm:inline font-mono text-xs text-[#8A8F98] uppercase">
            {transaction.categoryLabel}
          </span>
        )}
        <span className="font-mono text-sm font-medium text-white tracking-tight tabular-nums">
          {formattedAmount}
        </span>
      </div>
    </div>
  );
}
