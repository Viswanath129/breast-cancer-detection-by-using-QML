export type RiskLevel = 'Low' | 'Intermediate' | 'Elevated' | 'High';

export interface SurveyResult {
  id: string;
  date: string;
  riskLevel: RiskLevel;
  riskScore: number;
  factors: { name: string; value: string }[];
  timestamp?: string; // Optional to handle both date/timestamp usages
}

export interface MammogramAnalysis {
  id: string;
  imageUrl?: string;
  riskScore: number; // 0 to 1
  riskLevel: RiskLevel;
  timestamp: string;
  findings: {
    region: string;
    probability: number;
    type: string;
  }[];
  quantumMetrics?: {
    entanglementEntropy: number;
    coherenceTime: string;
    circuitDepth: number;
  };
  // Keeping these optional to avoid breaking if App.tsx uses them elsewhere, though I haven't seen it.
  features?: string[];
  notes?: string;
}