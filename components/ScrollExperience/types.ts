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
  { id: "tx-1", time: "01:14 AM", merchant: "Swiggy", amount: -420, category: "leaks", categoryLabel: "Leaks", day: 2, note: "Late-night butter chicken & soda" },
  { id: "tx-2", time: "02:30 AM", merchant: "Blinkit Late Night", amount: -180, category: "leaks", categoryLabel: "Leaks", day: 3, note: "Midnight energy drink & chips" },
  { id: "tx-3", time: "08:45 AM", merchant: "Uber Daily Commute", amount: -260, category: "essentials", categoryLabel: "Needs", day: 4, note: "Morning ride to office" },
  { id: "tx-4", time: "09:15 AM", merchant: "Chai Wala", amount: -20, category: "discretionary", categoryLabel: "Wants", day: 5, note: "Morning ginger cutting chai" },
  { id: "tx-5", time: "11:00 AM", merchant: "Landlord (Rent)", amount: -22000, category: "essentials", categoryLabel: "Needs", day: 6, note: "Monthly apartment lease" },
  { id: "tx-6", time: "01:15 PM", merchant: "Zomato Lunch Box", amount: -310, category: "discretionary", categoryLabel: "Wants", day: 7, note: "Paneer thali combo" },
  { id: "tx-7", time: "01:45 PM", merchant: "Zepto Groceries", amount: -1240, category: "essentials", categoryLabel: "Needs", day: 8, note: "Vegetables, oats & milk restock" },
  { id: "tx-8", time: "04:10 PM", merchant: "Third Wave Coffee", amount: -290, category: "discretionary", categoryLabel: "Wants", day: 9, note: "Cold brew with vanilla cream" },
  { id: "tx-9", time: "06:30 PM", merchant: "Rapido Bike Taxi", amount: -45, category: "essentials", categoryLabel: "Needs", day: 10, note: "Evening quick transit" },
  { id: "tx-10", time: "08:20 PM", merchant: "Amazon Prime Order", amount: -1499, category: "discretionary", categoryLabel: "Wants", day: 11, note: "Desk lamp & cable organizer" },
  { id: "tx-11", time: "10:15 PM", merchant: "Spotify Auto-Debit", amount: -119, category: "leaks", categoryLabel: "Leaks", day: 12, note: "Individual premium tier" },
  { id: "tx-12", time: "07:30 AM", merchant: "Cult.fit Gym Sub", amount: -2500, category: "essentials", categoryLabel: "Needs", day: 13, note: "Monthly unlimited fitness pass" },
  { id: "tx-13", time: "01:00 PM", merchant: "Curefoods Salads", amount: -380, category: "discretionary", categoryLabel: "Wants", day: 14, note: "Mediterranean warm bowl" },
  { id: "tx-14", time: "03:45 PM", merchant: "BESCOM Power Bill", amount: -1850, category: "essentials", categoryLabel: "Needs", day: 15, note: "Monthly electricity invoice" },
  { id: "tx-15", time: "05:20 PM", merchant: "Blue Tokai Coffee", amount: -280, category: "discretionary", categoryLabel: "Wants", day: 16, note: "Iced pour over" },
  { id: "tx-16", time: "08:40 PM", merchant: "Dunzo 24/7 Meds", amount: -340, category: "essentials", categoryLabel: "Needs", day: 17, note: "Vitamins & eye drops" },
  { id: "tx-17", time: "10:15 PM", merchant: "Netflix Auto-Debit", amount: -649, category: "leaks", categoryLabel: "Leaks", day: 18, note: "Premium 4K plan (0 watch hours)" },
  { id: "tx-18", time: "11:10 PM", merchant: "Swiggy Instamart", amount: -95, category: "leaks", categoryLabel: "Leaks", day: 19, note: "Late night tonic water" },
  { id: "tx-19", time: "08:15 AM", merchant: "Airtel Fiber WiFi", amount: -999, category: "essentials", categoryLabel: "Needs", day: 20, note: "300 Mbps home broadband" },
  { id: "tx-20", time: "02:30 PM", merchant: "Starbucks Cold Brew", amount: -420, category: "leaks", categoryLabel: "Leaks", day: 21, note: "Venti vanilla sweet cream" },
  { id: "tx-21", time: "05:50 PM", merchant: "Apple iCloud 200GB", amount: -219, category: "essentials", categoryLabel: "Needs", day: 22, note: "Cloud backup storage" },
  { id: "tx-22", time: "07:30 PM", merchant: "BookMyShow Tickets", amount: -750, category: "discretionary", categoryLabel: "Wants", day: 23, note: "IMAX weekend screening" },
  { id: "tx-23", time: "09:45 PM", merchant: "Naturals Ice Cream", amount: -160, category: "discretionary", categoryLabel: "Wants", day: 24, note: "Tender coconut double scoop" },
  { id: "tx-24", time: "11:45 PM", merchant: "Late Night Biryani", amount: -850, category: "leaks", categoryLabel: "Leaks", day: 25, note: "Post-midnight double dum biryani" },
  { id: "tx-25", time: "06:30 AM", merchant: "Uber Airport Drop", amount: -890, category: "essentials", categoryLabel: "Needs", day: 26, note: "Morning terminal transit" },
  { id: "tx-26", time: "02:15 PM", merchant: "Instamart Supplies", amount: -680, category: "essentials", categoryLabel: "Needs", day: 27, note: "Detergent & paper towels" },
  { id: "tx-27", time: "08:00 PM", merchant: "YouTube Premium", amount: -129, category: "leaks", categoryLabel: "Leaks", day: 27, note: "Ad-free individual sub" },
  { id: "tx-28", time: "08:00 AM", merchant: "Index SIP Auto-Save", amount: -3000, category: "saved", categoryLabel: "Saved", day: 28, note: "Nifty 50 Index Fund investment" },
];
