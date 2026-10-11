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
      // Neutral grey for essentials
      return "#717684";
    case "discretionary":
      // Amber for discretionary
      return "#F59E0B";
    case "leaks":
      // Crimson for leaks
      return "#EF4444";
    case "saved":
      // Muted teal/cyan for saved
      return "#10B981";
    default:
      return "#717684";
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
      className={`relative flex items-center justify-between w-full h-12 rounded-lg bg-[#121316] border border-white/[0.08] px-3.5 select-none transition-all duration-200 overflow-hidden shadow-sm ${className}`}
    >
      {/* 2px vertical color indicator on the leading edge */}
      <span
        className="absolute left-0 top-0 bottom-0 w-[2px]"
        style={{ backgroundColor: indicatorColor }}
        aria-hidden="true"
      />

      {/* Left section: Monospace timestamp, arrow glyph, bold single-line merchant */}
      <div className="flex items-center gap-3 min-w-0 pr-3">
        {/* Monospace timestamp on the far left */}
        <span className="font-mono text-[11px] text-[#8A8F98] tracking-tight shrink-0 tabular-nums">
          {transaction.time}
        </span>

        {/* Understated neutral arrow glyph */}
        <span className="text-[#8A8F98]/70 text-[10px] shrink-0 font-mono" aria-hidden="true">
          ↘
        </span>

        {/* Bold single-line merchant label */}
        <span className="font-semibold text-[13px] text-[#EDEDED] tracking-[-0.03em] truncate">
          {transaction.merchant}
        </span>
      </div>

      {/* Right section: Crisp white right-aligned amount */}
      <div className="shrink-0 flex items-center gap-2">
        {compact && (
          <span className="hidden sm:inline font-mono text-[10px] text-[#8A8F98] uppercase">
            {transaction.categoryLabel}
          </span>
        )}
        <span className="font-mono text-[13px] font-medium text-white tracking-tight tabular-nums">
          {formattedAmount}
        </span>
      </div>
    </div>
  );
}
