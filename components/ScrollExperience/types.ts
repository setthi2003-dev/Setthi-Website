export type ExpenseCategory = "essentials" | "discretionary" | "leaks" | "saved";

export interface TransactionItem {
  id: string;
  time: string;
  merchant: string;
  amount: number;
  category: ExpenseCategory;
  categoryLabel: "Needs" | "Wants" | "Leaks" | "Saved";
  day: number;
  note?: string;
}

export const TRANSACTIONS: TransactionItem[] = [
  {
    id: "tx-1",
    time: "01:14 AM",
    merchant: "Swiggy",
    amount: -420,
    category: "leaks",
    categoryLabel: "Leaks",
    day: 3,
    note: "Late-night butter chicken & soda",
  },
  {
    id: "tx-2",
    time: "02:30 AM",
    merchant: "Blinkit Late Night",
    amount: -180,
    category: "leaks",
    categoryLabel: "Leaks",
    day: 5,
    note: "Midnight energy drink & chips",
  },
  {
    id: "tx-3",
    time: "09:15 AM",
    merchant: "Chai Wala",
    amount: -20,
    category: "discretionary",
    categoryLabel: "Wants",
    day: 7,
    note: "Morning ginger cutting chai",
  },
  {
    id: "tx-4",
    time: "11:00 AM",
    merchant: "Landlord (Rent)",
    amount: -22000,
    category: "essentials",
    categoryLabel: "Needs",
    day: 8,
    note: "Monthly apartment lease",
  },
  {
    id: "tx-5",
    time: "01:45 PM",
    merchant: "Zepto Groceries",
    amount: -1240,
    category: "essentials",
    categoryLabel: "Needs",
    day: 11,
    note: "Vegetables, oats & milk restock",
  },
  {
    id: "tx-6",
    time: "04:10 PM",
    merchant: "Third Wave Coffee",
    amount: -290,
    category: "discretionary",
    categoryLabel: "Wants",
    day: 14,
    note: "Cold brew with vanilla cream",
  },
  {
    id: "tx-7",
    time: "07:30 PM",
    merchant: "Cult.fit Gym Sub",
    amount: -2500,
    category: "essentials",
    categoryLabel: "Needs",
    day: 18,
    note: "Monthly unlimited fitness pass",
  },
  {
    id: "tx-8",
    time: "10:15 PM",
    merchant: "Netflix Auto-Debit",
    amount: -649,
    category: "leaks",
    categoryLabel: "Leaks",
    day: 22,
    note: "Premium 4K plan (0 watch hours)",
  },
  {
    id: "tx-9",
    time: "11:45 PM",
    merchant: "Late Night Biryani",
    amount: -850,
    category: "leaks",
    categoryLabel: "Leaks",
    day: 25,
    note: "Post-midnight double dum biryani",
  },
  {
    id: "tx-10",
    time: "08:00 AM",
    merchant: "Index SIP Auto-Save",
    amount: -3000,
    category: "saved",
    categoryLabel: "Saved",
    day: 28,
    note: "Nifty 50 Index Fund investment",
  },
];
