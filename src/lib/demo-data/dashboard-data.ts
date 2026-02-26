export interface KpiData {
  label: string;
  value: string;
  change: number;
  icon: string;
}

export interface MonthlyTrend {
  month: string;
  cases: number;
  tests: number;
  positivity: number;
}

export interface StateCases {
  state: string;
  cases: number;
  tests: number;
  tpr: number;
}

export interface ActivityEntry {
  id: number;
  date: string;
  state: string;
  lga: string;
  event: string;
  category: string;
  quantity: number;
}

export const kpiData: KpiData[] = [
  { label: "Total Cases", value: "2,847,312", change: -4.2, icon: "activity" },
  { label: "Test Positivity Rate", value: "38.6%", change: -2.1, icon: "thermometer" },
  { label: "ACTs Dispensed", value: "1,923,445", change: 8.7, icon: "pill" },
  { label: "ITNs Distributed", value: "4,215,800", change: 12.3, icon: "shield" },
  { label: "Surveys Completed", value: "134,221", change: 15.6, icon: "clipboard" },
  { label: "Authentication Rate", value: "96.4%", change: 1.2, icon: "check-circle" },
];

export const monthlyTrends: MonthlyTrend[] = [
  { month: "Jan 24", cases: 185200, tests: 412000, positivity: 44.9 },
  { month: "Feb 24", cases: 168400, tests: 398000, positivity: 42.3 },
  { month: "Mar 24", cases: 192300, tests: 425000, positivity: 45.2 },
  { month: "Apr 24", cases: 210500, tests: 460000, positivity: 45.8 },
  { month: "May 24", cases: 245800, tests: 510000, positivity: 48.2 },
  { month: "Jun 24", cases: 278900, tests: 555000, positivity: 50.3 },
  { month: "Jul 24", cases: 312400, tests: 608000, positivity: 51.4 },
  { month: "Aug 24", cases: 335200, tests: 640000, positivity: 52.4 },
  { month: "Sep 24", cases: 298600, tests: 595000, positivity: 50.2 },
  { month: "Oct 24", cases: 256300, tests: 548000, positivity: 46.8 },
  { month: "Nov 24", cases: 218700, tests: 490000, positivity: 44.6 },
  { month: "Dec 24", cases: 195400, tests: 450000, positivity: 43.4 },
  { month: "Jan 25", cases: 178300, tests: 420000, positivity: 42.5 },
  { month: "Feb 25", cases: 162100, tests: 405000, positivity: 40.0 },
  { month: "Mar 25", cases: 185600, tests: 438000, positivity: 42.4 },
  { month: "Apr 25", cases: 201200, tests: 455000, positivity: 44.2 },
  { month: "May 25", cases: 238400, tests: 502000, positivity: 47.5 },
  { month: "Jun 25", cases: 265100, tests: 540000, positivity: 49.1 },
  { month: "Jul 25", cases: 298700, tests: 590000, positivity: 50.6 },
  { month: "Aug 25", cases: 320100, tests: 625000, positivity: 51.2 },
  { month: "Sep 25", cases: 285400, tests: 580000, positivity: 49.2 },
  { month: "Oct 25", cases: 242300, tests: 535000, positivity: 45.3 },
  { month: "Nov 25", cases: 205800, tests: 478000, positivity: 43.1 },
  { month: "Dec 25", cases: 188900, tests: 440000, positivity: 42.9 },
];

export const stateCases: StateCases[] = [
  { state: "Kano", cases: 285400, tests: 510000, tpr: 56.0 },
  { state: "Lagos", cases: 245200, tests: 680000, tpr: 36.1 },
  { state: "Kaduna", cases: 198700, tests: 380000, tpr: 52.3 },
  { state: "Katsina", cases: 176300, tests: 310000, tpr: 56.9 },
  { state: "Oyo", cases: 165800, tests: 420000, tpr: 39.5 },
  { state: "Rivers", cases: 152100, tests: 395000, tpr: 38.5 },
  { state: "Bauchi", cases: 148900, tests: 280000, tpr: 53.2 },
  { state: "Jigawa", cases: 142300, tests: 260000, tpr: 54.7 },
  { state: "Benue", cases: 138600, tests: 310000, tpr: 44.7 },
  { state: "Delta", cases: 132400, tests: 345000, tpr: 38.4 },
  { state: "Niger", cases: 128900, tests: 275000, tpr: 46.9 },
  { state: "Sokoto", cases: 125200, tests: 240000, tpr: 52.2 },
  { state: "Zamfara", cases: 121800, tests: 230000, tpr: 53.0 },
  { state: "Adamawa", cases: 118400, tests: 265000, tpr: 44.7 },
  { state: "Plateau", cases: 112600, tests: 290000, tpr: 38.8 },
  { state: "Ondo", cases: 108300, tests: 280000, tpr: 38.7 },
  { state: "Edo", cases: 104500, tests: 275000, tpr: 38.0 },
  { state: "Anambra", cases: 98700, tests: 310000, tpr: 31.8 },
  { state: "Enugu", cases: 95400, tests: 285000, tpr: 33.5 },
  { state: "Cross River", cases: 92100, tests: 240000, tpr: 38.4 },
  { state: "Taraba", cases: 88600, tests: 195000, tpr: 45.4 },
  { state: "Kebbi", cases: 85200, tests: 180000, tpr: 47.3 },
  { state: "Nasarawa", cases: 82400, tests: 198000, tpr: 41.6 },
  { state: "Osun", cases: 78900, tests: 245000, tpr: 32.2 },
  { state: "Kwara", cases: 75300, tests: 205000, tpr: 36.7 },
  { state: "Imo", cases: 72100, tests: 225000, tpr: 32.0 },
  { state: "Abia", cases: 68500, tests: 210000, tpr: 32.6 },
  { state: "Kogi", cases: 65800, tests: 178000, tpr: 37.0 },
  { state: "Yobe", cases: 62400, tests: 145000, tpr: 43.0 },
  { state: "Borno", cases: 58900, tests: 135000, tpr: 43.6 },
  { state: "Gombe", cases: 55200, tests: 148000, tpr: 37.3 },
  { state: "Bayelsa", cases: 48700, tests: 125000, tpr: 39.0 },
  { state: "Ebonyi", cases: 45300, tests: 138000, tpr: 32.8 },
  { state: "Ekiti", cases: 42100, tests: 145000, tpr: 29.0 },
  { state: "Akwa Ibom", cases: 115600, tests: 295000, tpr: 39.2 },
  { state: "Ogun", cases: 102800, tests: 320000, tpr: 32.1 },
  { state: "FCT", cases: 38500, tests: 185000, tpr: 20.8 },
];

export const activityLog: ActivityEntry[] = Array.from({ length: 50 }, (_, i) => {
  const states = ["Lagos", "Kano", "Kaduna", "Oyo", "Rivers", "Bauchi", "Delta", "Plateau", "Edo", "Anambra"];
  const lgas = ["Ikeja", "Nassarawa", "Kaduna North", "Ibadan SW", "Port Harcourt", "Bauchi", "Warri South", "Jos North", "Oredo", "Awka South"];
  const events = [
    "ACT dispensed & verified", "mRDT administered — Positive", "mRDT administered — Negative",
    "ITN distributed", "Patient survey completed", "Product authentication — Genuine",
    "Product authentication — Failed", "PPMV incentive paid", "Patient airtime reward sent",
    "Stock replenishment logged",
  ];
  const categories = ["Treatment", "Diagnosis", "Diagnosis", "Prevention", "Surveillance", "Authentication", "Authentication", "Incentive", "Incentive", "Supply Chain"];
  const idx = i % states.length;
  const evtIdx = i % events.length;
  const day = String(Math.max(1, 28 - i)).padStart(2, "0");
  return {
    id: i + 1,
    date: `2025-12-${day}`,
    state: states[idx],
    lga: lgas[idx],
    event: events[evtIdx],
    category: categories[evtIdx],
    quantity: Math.floor(Math.random() * 50) + 1,
  };
});
