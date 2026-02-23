import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const glossary: Record<string, string> = {
  LGA: "Local Government Area — Nigeria's smallest administrative division (774 total across 36 states + FCT)",
  PPMV: "Patent & Proprietary Medicine Vendor — Licensed community-level drug sellers who are the first point of care for ~70% of Nigerians",
  ACT: "Artemisinin-based Combination Therapy — WHO-recommended first-line treatment for malaria",
  mRDT: "Malaria Rapid Diagnostic Test — A quick finger-prick test that detects malaria parasites in ~15 minutes",
  NAFDAC: "National Agency for Food & Drug Administration and Control — Nigeria's regulatory authority for drugs, medical devices, and food products",
  NMEP: "National Malaria Elimination Programme — Nigeria's government body coordinating malaria control strategy",
  ADMFm: "Affordable Diagnostics & Medicine for Malaria — A co-payment program to subsidize malaria testing and treatment at community pharmacies",
  TPR: "Test Positivity Rate — The percentage of malaria tests that come back positive, a key surveillance metric",
  GS1: "Global Standards One — International system for unique product identification using barcodes (GTIN, serial numbers, DataMatrix codes)",
  GTIN: "Global Trade Item Number — A unique 14-digit identifier assigned to each product, part of the GS1 standard",
  ITN: "Insecticide-Treated Net — Bed nets treated with insecticide to prevent mosquito bites during sleep",
  PVAC: "Presidential Initiative for Unlocking the Value Chain — A government programme to combat counterfeit pharmaceuticals through product verification and authentication",
};

interface GlossaryTermProps {
  term: string;
  children?: React.ReactNode;
}

const GlossaryTerm = ({ term, children }: GlossaryTermProps) => {
  const definition = glossary[term];
  if (!definition) return <span>{children || term}</span>;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="border-b border-dashed border-secondary cursor-help font-semibold text-secondary">
          {children || term}
        </span>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs text-sm">
        <p>{definition}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default GlossaryTerm;
