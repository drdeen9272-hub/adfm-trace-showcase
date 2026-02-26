export interface ModuleKpi {
  label: string;
  value: string;
  change: number;
}

export interface ModuleTableRow {
  [key: string]: string | number;
}

export interface ModuleChartPoint {
  name: string;
  value: number;
  value2?: number;
}

export interface ModuleConfig {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  kpis: ModuleKpi[];
  chartTitle: string;
  chartType: "bar" | "line" | "area";
  chartData: ModuleChartPoint[];
  tableColumns: string[];
  tableData: ModuleTableRow[];
}

const states = ["Lagos", "Kano", "Kaduna", "Oyo", "Rivers", "Bauchi", "Delta", "Plateau", "Edo", "Anambra", "Katsina", "Benue"];
const lgas = ["Ikeja", "Nassarawa", "Kaduna North", "Ibadan SW", "Port Harcourt", "Bauchi", "Warri South", "Jos North", "Oredo", "Awka South", "Katsina", "Makurdi"];

function generateTable(columns: string[], count = 25): ModuleTableRow[] {
  return Array.from({ length: count }, (_, i) => {
    const row: ModuleTableRow = {};
    columns.forEach((col) => {
      if (col === "State") row[col] = states[i % states.length];
      else if (col === "LGA") row[col] = lgas[i % lgas.length];
      else if (col === "Date") row[col] = `2025-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`;
      else if (col === "Month") row[col] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i % 12] + " 2025";
      else if (col === "Status") row[col] = ["Active", "Completed", "Pending", "In Progress"][i % 4];
      else if (col === "Facility") row[col] = ["PHC " + (i + 1), "General Hospital", "PPMV Shop " + (i + 1), "District Hospital"][i % 4];
      else if (typeof col === "string" && (col.includes("Rate") || col.includes("%") || col.includes("Coverage"))) row[col] = +(Math.random() * 60 + 30).toFixed(1);
      else if (typeof col === "string" && (col.includes("Count") || col.includes("Total") || col.includes("Quantity") || col.includes("Number"))) row[col] = Math.floor(Math.random() * 5000) + 100;
      else row[col] = ["High", "Medium", "Low", "Critical", "Normal"][i % 5];
    });
    row["ID"] = i + 1;
    return row;
  });
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function generateChart(base: number, variance: number, hasSecond = false): ModuleChartPoint[] {
  return months.map((m) => ({
    name: m,
    value: Math.floor(base + Math.random() * variance),
    ...(hasSecond ? { value2: Math.floor(base * 0.6 + Math.random() * variance * 0.5) } : {}),
  }));
}

export const moduleConfigs: Record<string, ModuleConfig> = {
  "case-management": {
    id: "case-management",
    title: "Case Management & Diagnosis",
    subtitle: "Tracking malaria case detection, diagnosis, and clinical management across Nigeria's health facilities",
    description: "This module monitors malaria case management indicators including diagnostic testing rates, treatment outcomes, and facility-level performance across Nigeria's 36 states and FCT (Federal Capital Territory).",
    heroImage: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1200&h=400&fit=crop",
    kpis: [
      { label: "Total Cases Diagnosed", value: "2,847,312", change: -4.2 },
      { label: "Diagnostic Rate", value: "82.4%", change: 3.1 },
      { label: "Confirmed Cases", value: "1,098,420", change: -6.8 },
      { label: "Case Fatality Rate", value: "0.12%", change: -15.3 },
    ],
    chartTitle: "Monthly Cases Diagnosed vs Confirmed",
    chartType: "line",
    chartData: generateChart(240000, 80000, true),
    tableColumns: ["Date", "State", "LGA", "Facility", "Total Count", "Confirmed Count", "Rate", "Status"],
    tableData: generateTable(["Date", "State", "LGA", "Facility", "Total Count", "Confirmed Count", "Rate", "Status"]),
  },
  treatment: {
    id: "treatment",
    title: "Treatment & Drug Quality",
    subtitle: "Monitoring ACT dispensing, drug quality verification, and treatment adherence",
    description: "Tracks Artemisinin-based Combination Therapy (ACT) dispensing, pharmaceutical authentication via Sproxil's MAS (Mobile Authentication Service), and drug quality indicators across PPMVs (Patent & Proprietary Medicine Vendors — licensed community drug shops).",
    heroImage: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1200&h=400&fit=crop",
    kpis: [
      { label: "ACTs Dispensed", value: "1,923,445", change: 8.7 },
      { label: "Verified Genuine", value: "96.4%", change: 1.2 },
      { label: "Failed Authentication", value: "3,842", change: -22.0 },
      { label: "Avg Treatment Cost", value: "₦2,450", change: -5.1 },
    ],
    chartTitle: "Monthly ACT Dispensing Volume",
    chartType: "bar",
    chartData: generateChart(160000, 40000),
    tableColumns: ["Date", "State", "LGA", "Facility", "Quantity", "Rate", "Status"],
    tableData: generateTable(["Date", "State", "LGA", "Facility", "Quantity", "Rate", "Status"]),
  },
  "vector-control": {
    id: "vector-control",
    title: "Vector Control",
    subtitle: "ITN distribution, IRS coverage, and larviciding operations",
    description: "Monitors Insecticide-Treated Net (ITN/LLIN) distribution, Indoor Residual Spraying (IRS) campaigns, and larviciding operations. Nigeria targets universal ITN coverage with at least one net per two persons in each household.",
    heroImage: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=1200&h=400&fit=crop",
    kpis: [
      { label: "ITNs Distributed", value: "4,215,800", change: 12.3 },
      { label: "IRS Coverage", value: "68.2%", change: 5.4 },
      { label: "Structures Sprayed", value: "892,400", change: 9.8 },
      { label: "Larviciding Sites", value: "1,245", change: 18.2 },
    ],
    chartTitle: "Monthly ITN Distribution",
    chartType: "area",
    chartData: generateChart(350000, 100000),
    tableColumns: ["Date", "State", "LGA", "Total Count", "Coverage", "Status"],
    tableData: generateTable(["Date", "State", "LGA", "Total Count", "Coverage", "Status"]),
  },
  chemoprevention: {
    id: "chemoprevention",
    title: "Chemoprevention",
    subtitle: "IPTp, SMC, PMC, and MDA programme tracking",
    description: "Tracks Intermittent Preventive Treatment in pregnancy (IPTp), Seasonal Malaria Chemoprevention (SMC) for children 3–59 months, Perennial Malaria Chemoprevention (PMC), and Mass Drug Administration (MDA) campaigns.",
    heroImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=400&fit=crop",
    kpis: [
      { label: "IPTp3+ Coverage", value: "42.8%", change: 7.2 },
      { label: "SMC Rounds Done", value: "4", change: 0 },
      { label: "Children Reached (SMC)", value: "8,420,000", change: 14.5 },
      { label: "MDA Coverage", value: "72.1%", change: 3.8 },
    ],
    chartTitle: "Monthly Chemoprevention Doses Administered",
    chartType: "bar",
    chartData: generateChart(700000, 200000),
    tableColumns: ["Month", "State", "LGA", "Total Count", "Coverage", "Status"],
    tableData: generateTable(["Month", "State", "LGA", "Total Count", "Coverage", "Status"]),
  },
  surveillance: {
    id: "surveillance",
    title: "Surveillance & Epidemiology",
    subtitle: "Real-time disease surveillance and epidemiological monitoring",
    description: "Epidemiological surveillance across Nigeria's HMIS (Health Management Information System), including DHIS2 (District Health Information System) reporting, outbreak detection, and sentinel site monitoring.",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=400&fit=crop",
    kpis: [
      { label: "Reporting Rate", value: "87.3%", change: 4.1 },
      { label: "Sentinel Sites", value: "342", change: 12.0 },
      { label: "Outbreak Alerts", value: "18", change: -25.0 },
      { label: "Data Completeness", value: "91.2%", change: 2.8 },
    ],
    chartTitle: "Monthly Reporting Completeness",
    chartType: "line",
    chartData: generateChart(85, 12),
    tableColumns: ["Month", "State", "LGA", "Rate", "Total Count", "Status"],
    tableData: generateTable(["Month", "State", "LGA", "Rate", "Total Count", "Status"]),
  },
  entomology: {
    id: "entomology",
    title: "Entomology & Insecticide Resistance",
    subtitle: "Mosquito species monitoring and insecticide resistance surveillance",
    description: "Monitoring Anopheles mosquito populations, species composition, biting rates, and insecticide resistance patterns to guide vector control strategies.",
    heroImage: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1200&h=400&fit=crop",
    kpis: [
      { label: "Sentinel Sites", value: "156", change: 8.3 },
      { label: "Resistance Detected", value: "42%", change: 5.0 },
      { label: "Species Identified", value: "12", change: 0 },
      { label: "Avg Biting Rate", value: "18.4/night", change: -3.2 },
    ],
    chartTitle: "Monthly Mosquito Density Index",
    chartType: "area",
    chartData: generateChart(15, 8),
    tableColumns: ["Date", "State", "LGA", "Facility", "Total Count", "Rate", "Status"],
    tableData: generateTable(["Date", "State", "LGA", "Facility", "Total Count", "Rate", "Status"]),
  },
  "supply-chain-commodities": {
    id: "supply-chain-commodities",
    title: "Supply Chain & Commodities",
    subtitle: "End-to-end tracking of malaria commodities from warehouse to patient",
    description: "Monitors stock levels, distribution logistics, and commodity traceability using GS1 standards (GTIN, serialization) for ACTs, mRDTs, ITNs, and other malaria commodities across Nigeria's supply chain network.",
    heroImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=400&fit=crop",
    kpis: [
      { label: "Stock-out Rate", value: "8.2%", change: -12.4 },
      { label: "Commodities Tracked", value: "4.5B", change: 15.0 },
      { label: "Distribution Points", value: "8,420", change: 6.7 },
      { label: "Wastage Rate", value: "2.1%", change: -8.3 },
    ],
    chartTitle: "Monthly Commodity Distribution Volume",
    chartType: "bar",
    chartData: generateChart(500000, 150000),
    tableColumns: ["Date", "State", "LGA", "Facility", "Quantity", "Status"],
    tableData: generateTable(["Date", "State", "LGA", "Facility", "Quantity", "Status"]),
  },
  financing: {
    id: "financing",
    title: "Financing & Programme Costs",
    subtitle: "Malaria programme funding, expenditure tracking, and cost-effectiveness",
    description: "Tracks funding flows from donors (Global Fund, PMI, World Bank), government counterpart funding, and programme expenditures. Includes ADMFm (Affordable Diagnostics and Medicine for Malaria) co-payment mechanism data.",
    heroImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=400&fit=crop",
    kpis: [
      { label: "Total Funding", value: "$482M", change: 5.2 },
      { label: "Govt Contribution", value: "$124M", change: 18.4 },
      { label: "Cost per Case Treated", value: "$4.82", change: -6.1 },
      { label: "Budget Utilization", value: "78.6%", change: 3.9 },
    ],
    chartTitle: "Monthly Programme Expenditure ($M)",
    chartType: "line",
    chartData: generateChart(38, 12),
    tableColumns: ["Month", "State", "Total Count", "Rate", "Status"],
    tableData: generateTable(["Month", "State", "Total Count", "Rate", "Status"]),
  },
  sbcc: {
    id: "sbcc",
    title: "Social & Behaviour Change Communication",
    subtitle: "Community awareness campaigns and behaviour change interventions",
    description: "Tracks SBCC (Social and Behaviour Change Communication) campaigns, community engagement activities, and knowledge-attitude-practice surveys to drive adoption of malaria prevention behaviours.",
    heroImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&h=400&fit=crop",
    kpis: [
      { label: "Campaigns Run", value: "1,842", change: 22.4 },
      { label: "People Reached", value: "35.2M", change: 18.6 },
      { label: "Net Usage Awareness", value: "78.4%", change: 4.2 },
      { label: "Care-Seeking Rate", value: "62.8%", change: 6.1 },
    ],
    chartTitle: "Monthly Campaign Reach (millions)",
    chartType: "area",
    chartData: generateChart(2800000, 800000),
    tableColumns: ["Date", "State", "LGA", "Total Count", "Coverage", "Status"],
    tableData: generateTable(["Date", "State", "LGA", "Total Count", "Coverage", "Status"]),
  },
  research: {
    id: "research",
    title: "Research & Innovation",
    subtitle: "Ongoing malaria research projects, clinical trials, and innovations",
    description: "Directory of active malaria research initiatives, clinical trials, technology innovations, and partnership-driven projects across Nigeria's research institutions and global collaborators.",
    heroImage: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&h=400&fit=crop",
    kpis: [
      { label: "Active Projects", value: "67", change: 12.0 },
      { label: "Clinical Trials", value: "14", change: 40.0 },
      { label: "Publications", value: "128", change: 8.5 },
      { label: "Funding Secured", value: "$28.4M", change: 15.2 },
    ],
    chartTitle: "Research Publications by Quarter",
    chartType: "bar",
    chartData: generateChart(30, 15),
    tableColumns: ["Date", "State", "Facility", "Total Count", "Status"],
    tableData: generateTable(["Date", "State", "Facility", "Total Count", "Status"]),
  },
  "malaria-pregnancy": {
    id: "malaria-pregnancy",
    title: "Malaria in Pregnancy",
    subtitle: "IPTp coverage, ANC attendance, and maternal malaria outcomes",
    description: "Monitors malaria in pregnancy indicators including Intermittent Preventive Treatment in pregnancy (IPTp) doses at ANC (Antenatal Care) visits, maternal parasitaemia rates, and birth outcomes in malaria-endemic zones.",
    heroImage: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=1200&h=400&fit=crop",
    kpis: [
      { label: "IPTp1 Coverage", value: "72.4%", change: 3.8 },
      { label: "IPTp3+ Coverage", value: "42.8%", change: 7.2 },
      { label: "ANC Attendance", value: "68.9%", change: 2.4 },
      { label: "Maternal Parasitaemia", value: "18.2%", change: -5.6 },
    ],
    chartTitle: "Monthly IPTp Doses Administered",
    chartType: "line",
    chartData: generateChart(85000, 25000, true),
    tableColumns: ["Month", "State", "LGA", "Facility", "Total Count", "Coverage", "Status"],
    tableData: generateTable(["Month", "State", "LGA", "Facility", "Total Count", "Coverage", "Status"]),
  },
  "community-health": {
    id: "community-health",
    title: "Community Health Workers",
    subtitle: "CHW deployment, training, and community-level service delivery",
    description: "Tracks Community Health Worker (CHW) recruitment, training, deployment, and performance across Nigeria's 774 LGAs (Local Government Areas). CHWs provide integrated community case management (iCCM) of malaria.",
    heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=400&fit=crop",
    kpis: [
      { label: "Active CHWs", value: "42,800", change: 15.2 },
      { label: "LGAs Covered", value: "624/774", change: 8.4 },
      { label: "Cases Managed", value: "892,400", change: 22.1 },
      { label: "Referral Rate", value: "12.8%", change: -3.2 },
    ],
    chartTitle: "Monthly Cases Managed by CHWs",
    chartType: "area",
    chartData: generateChart(72000, 20000),
    tableColumns: ["Date", "State", "LGA", "Number", "Total Count", "Rate", "Status"],
    tableData: generateTable(["Date", "State", "LGA", "Number", "Total Count", "Rate", "Status"]),
  },
  "data-quality": {
    id: "data-quality",
    title: "Data Quality & HMIS",
    subtitle: "Health data quality assessment and DHIS2 reporting performance",
    description: "Monitors data quality indicators within Nigeria's HMIS (Health Management Information System), including DHIS2 (District Health Information System) reporting timeliness, completeness, and accuracy across facilities.",
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=400&fit=crop",
    kpis: [
      { label: "Reporting Rate", value: "87.3%", change: 4.1 },
      { label: "Data Completeness", value: "91.2%", change: 2.8 },
      { label: "Timeliness", value: "78.6%", change: 5.4 },
      { label: "Facilities Reporting", value: "34,200", change: 6.2 },
    ],
    chartTitle: "Monthly Reporting Completeness (%)",
    chartType: "line",
    chartData: generateChart(85, 12),
    tableColumns: ["Month", "State", "LGA", "Facility", "Rate", "Status"],
    tableData: generateTable(["Month", "State", "LGA", "Facility", "Rate", "Status"]),
  },
  climate: {
    id: "climate",
    title: "Climate & Environmental Factors",
    subtitle: "Rainfall, temperature, and environmental predictors of malaria transmission",
    description: "Correlates climatic and environmental data (rainfall, temperature, humidity, vegetation indices) with malaria incidence patterns to support seasonal forecasting and early warning systems.",
    heroImage: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1200&h=400&fit=crop",
    kpis: [
      { label: "Avg Rainfall", value: "148mm", change: 12.4 },
      { label: "Avg Temperature", value: "28.4°C", change: 0.8 },
      { label: "Prediction Accuracy", value: "84.2%", change: 3.6 },
      { label: "Early Warnings Issued", value: "24", change: -8.0 },
    ],
    chartTitle: "Monthly Rainfall vs Malaria Cases (indexed)",
    chartType: "line",
    chartData: generateChart(120, 60, true),
    tableColumns: ["Month", "State", "Total Count", "Rate", "Status"],
    tableData: generateTable(["Month", "State", "Total Count", "Rate", "Status"]),
  },
  vaccines: {
    id: "vaccines",
    title: "Malaria Vaccines",
    subtitle: "RTS,S/AS01 and R21 vaccine rollout tracking",
    description: "Tracks the rollout of WHO-recommended malaria vaccines (RTS,S/AS01 Mosquirix and R21/Matrix-M) in eligible Nigerian states, including coverage, adverse events, and efficacy monitoring.",
    heroImage: "https://images.unsplash.com/photo-1615631648086-325025c9e51e?w=1200&h=400&fit=crop",
    kpis: [
      { label: "Doses Administered", value: "284,500", change: 45.2 },
      { label: "Children Vaccinated", value: "112,800", change: 38.6 },
      { label: "States Rolling Out", value: "8/37", change: 33.3 },
      { label: "Coverage (target pop)", value: "24.8%", change: 18.4 },
    ],
    chartTitle: "Monthly Vaccine Doses Administered",
    chartType: "bar",
    chartData: generateChart(22000, 10000),
    tableColumns: ["Date", "State", "LGA", "Facility", "Quantity", "Coverage", "Status"],
    tableData: generateTable(["Date", "State", "LGA", "Facility", "Quantity", "Coverage", "Status"]),
  },
  "cross-border": {
    id: "cross-border",
    title: "Cross-Border & Migration",
    subtitle: "Malaria importation risk and cross-border surveillance",
    description: "Monitors malaria cases among cross-border populations, migrant workers, and internally displaced persons (IDPs). Tracks imported cases from neighbouring countries (Cameroon, Chad, Niger, Benin).",
    heroImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=400&fit=crop",
    kpis: [
      { label: "Imported Cases", value: "12,400", change: -8.2 },
      { label: "Border Screening Sites", value: "48", change: 14.3 },
      { label: "IDP Camp Coverage", value: "72.4%", change: 5.8 },
      { label: "Cross-Border Alerts", value: "8", change: -33.3 },
    ],
    chartTitle: "Monthly Imported Cases by Origin",
    chartType: "bar",
    chartData: generateChart(1000, 400),
    tableColumns: ["Date", "State", "LGA", "Total Count", "Status"],
    tableData: generateTable(["Date", "State", "LGA", "Total Count", "Status"]),
  },
  "gender-equity": {
    id: "gender-equity",
    title: "Gender & Equity",
    subtitle: "Gender-disaggregated data and equity analysis of malaria interventions",
    description: "Analyses malaria burden and intervention access by gender, age group, socioeconomic status, and geographic equity. Identifies underserved populations and equity gaps across Nigeria's 774 LGAs.",
    heroImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&h=400&fit=crop",
    kpis: [
      { label: "Female Case Share", value: "54.2%", change: -1.2 },
      { label: "Under-5 Share", value: "38.6%", change: -2.8 },
      { label: "Rural Access Gap", value: "24.8%", change: -4.2 },
      { label: "Equity Index", value: "0.72", change: 3.6 },
    ],
    chartTitle: "Cases by Gender (Monthly)",
    chartType: "line",
    chartData: generateChart(120000, 30000, true),
    tableColumns: ["Month", "State", "LGA", "Total Count", "Rate", "Coverage", "Status"],
    tableData: generateTable(["Month", "State", "LGA", "Total Count", "Rate", "Coverage", "Status"]),
  },
  "private-sector": {
    id: "private-sector",
    title: "Private Sector & PPMV Engagement",
    subtitle: "PPMV enrollment, performance, and private sector contribution to malaria control",
    description: "Tracks engagement with Nigeria's 200,000+ PPMVs (Patent & Proprietary Medicine Vendors — licensed community drug shops), private hospital contributions, and corporate social responsibility initiatives for malaria control.",
    heroImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=400&fit=crop",
    kpis: [
      { label: "PPMVs Enrolled", value: "8,420", change: 12.8 },
      { label: "Private Sector Share", value: "62.4%", change: 3.2 },
      { label: "Avg Revenue/PPMV", value: "₦48,200/mo", change: 8.4 },
      { label: "Compliance Rate", value: "84.6%", change: 5.1 },
    ],
    chartTitle: "Monthly PPMV Enrollments",
    chartType: "area",
    chartData: generateChart(680, 200),
    tableColumns: ["Date", "State", "LGA", "Facility", "Total Count", "Rate", "Status"],
    tableData: generateTable(["Date", "State", "LGA", "Facility", "Total Count", "Rate", "Status"]),
  },
};
