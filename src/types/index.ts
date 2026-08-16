export type CategoryType = 
  | 'Transport'
  | 'Safety'
  | 'Accessibility'
  | 'Food'
  | 'Infrastructure'
  | 'Education'
  | 'Healthcare'
  | 'Public Services';

export type TimeWindow = 'Morning' | 'Afternoon' | 'Evening' | 'Night' | 'Anytime';

export type AffectedGroup = 
  | 'Students'
  | 'Workers'
  | 'Residents'
  | 'Elderly'
  | 'People with disabilities'
  | 'General Public';

export type FrequencyType = 'Daily' | 'Weekly' | 'Occasional';
export type ImpactLevel = 'High' | 'Moderate' | 'Low';

export type ZoneId = 
  | 'campus-zone'
  | 'transit-corridor'
  | 'hostel-sector'
  | 'market-district'
  | 'tech-park-junction'
  | 'suburban-link'
  | 'civic-center'
  | 'library-academic';

export type SeverityLevel = 'Critical' | 'High' | 'Moderate' | 'Low';
export type SignalIntensity = 'LOW' | 'MODERATE' | 'HIGH' | 'EMERGING';
export type TrendStatus = 'Emerging' | 'Rapidly Increasing' | 'Growing' | 'Stable';

export type LifecycleStatus = 
  | 'SIGNAL DETECTED'
  | 'SIGNAL ROUTED'
  | 'UNDER REVIEW — DEMO'
  | 'ACTION SUGGESTED'
  | 'ACTION TAKEN'
  | 'RESOLVED';

export type ProblemProgressStage = 
  | 'REPORTED'
  | 'ANALYZED'
  | 'PATTERN DETECTED'
  | 'SIGNAL ROUTED'
  | 'UNDER REVIEW'
  | 'ACTION TAKEN'
  | 'RESOLVED';

export interface ProblemTimelineEvent {
  timestamp: string;
  stage: ProblemProgressStage;
  title: string;
  description: string;
  actor?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isGuest: boolean;
  createdAt: string;
}

export interface Experience {
  id: string;
  anonymousTrackingId?: string; // e.g. UNH-7K42-XP91
  rawText: string;
  sanitizedText: string;
  category: CategoryType;
  zoneId: ZoneId;
  zoneName: string;
  timeWindow: TimeWindow;
  affectedGroup: AffectedGroup;
  frequency?: FrequencyType;
  impactLevel?: ImpactLevel;
  submittedAt: string;
  isAnonymous: boolean;
  modality: 'text' | 'voice' | 'photo';
  extractedInfo?: {
    topic: string;
    problem: string;
    generalLocation: string;
    time: string;
    affectedGroup: string;
    impact: string;
    sentiment: 'Negative' | 'Urgent' | 'Frustrated' | 'Constructive';
    keywords: string[];
  };
  clusterId?: string;
  piiRedactedCount?: number;
  routingStatus?: LifecycleStatus;
  currentStage?: ProblemProgressStage;
  timelineEvents?: ProblemTimelineEvent[];
  assignedStakeholder?: string;
  aiSuggestedAction?: string;
  resolutionSummary?: {
    resolvedAt: string;
    actionTaken: string;
    stakeholder: string;
    impactOutcome: string;
  };
}

export interface ClusteredPattern {
  id: string;
  title: string;
  category: CategoryType;
  summary: string;
  relatedExperienceCount: number;
  aggregatedAreaCount: number;
  primaryTimeWindows: TimeWindow[];
  primaryZones: ZoneId[];
  primaryAffectedGroups: AffectedGroup[];
  modelConfidence: number; // 0 - 100%
  growthRate: number; // e.g. +38%
  trendStatus: TrendStatus;
  suggestedAttention: SeverityLevel;
  firstDetectedDaysAgo: number;
  silenceIndex: number; // e.g. 92%
  reportedCount: number;
  estimatedAffected: number;
  estimatedUnheard: number;
  possibleCauses: string[];
  aiSuggestedActions: string[];
  suggestedStakeholders: string[];
  expectedImpact: string;
  lifecycleStatus: LifecycleStatus;
  actionRecommendation: string;
  weeklyTrajectory: number[]; // [w1, w2, w3, w4]
}

export interface ZoneGeoData {
  id: ZoneId;
  name: string;
  code: string;
  description: string;
  x: number; // percentage on vector grid (0 - 100)
  y: number; // percentage on vector grid (0 - 100)
  lat: number;
  lng: number;
  activeSignalsCount: number;
  intensityLevel: SignalIntensity;
  topCategory: CategoryType;
  silenceIndex: number;
  growthRate: number;
  severity: SeverityLevel;
  primaryIssue: string;
  reportedCount: number;
  estimatedUnheard: number;
  possibleCauses?: string[];
  aiSuggestedActions?: string[];
  suggestedStakeholders?: string[];
  lifecycleStatus?: LifecycleStatus;
}

export interface FilterState {
  category: string;
  zoneId: string;
  timeWindow: string;
  severity: string;
  trendStatus: string;
  searchQuery: string;
}

export interface LiveDemoState {
  isActive: boolean;
  currentPhase: number;
  phaseProgress: number;
  isPaused: boolean;
  speed: number;
}
