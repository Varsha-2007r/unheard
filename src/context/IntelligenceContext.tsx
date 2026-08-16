import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { 
  Experience, 
  ClusteredPattern, 
  ZoneGeoData, 
  FilterState, 
  CategoryType,
  ZoneId,
  SignalIntensity,
  User,
  ProblemProgressStage,
  ProblemTimelineEvent
} from '../types';
import { INITIAL_EXPERIENCES, PATTERNS_DATA, ZONES_DATA } from '../data/mockData';

interface SubmissionImpactFeedback {
  zoneId: ZoneId;
  zoneCode: string;
  zoneName: string;
  beforeCount: number;
  afterCount: number;
  patternTitle: string;
  anonymousId: string;
}

interface IntelligenceContextType {
  user: User | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  loginAsGuest: () => void;
  logout: () => void;
  experiences: Experience[];
  patterns: ClusteredPattern[];
  zones: ZoneGeoData[];
  selectedZoneId: ZoneId | null;
  setSelectedZoneId: (zoneId: ZoneId | null) => void;
  selectedPatternId: string | null;
  setSelectedPatternId: (patternId: string | null) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  addNewExperience: (exp: Experience) => void;
  advanceProblemStatus: (idOrTrackingId: string) => void;
  getExperienceById: (idOrTrackingId: string) => Experience | undefined;
  isSubmissionModalOpen: boolean;
  setIsSubmissionModalOpen: (open: boolean) => void;
  isLiveDemoOpen: boolean;
  setIsLiveDemoOpen: (open: boolean) => void;
  isTutorialOpen: boolean;
  setIsTutorialOpen: (open: boolean) => void;
  isMyUnheardOpen: boolean;
  setIsMyUnheardOpen: (open: boolean) => void;
  myContributions: Experience[];
  latestSubmissionImpact: SubmissionImpactFeedback | null;
  setLatestSubmissionImpact: (impact: SubmissionImpactFeedback | null) => void;
  recentlyPulsedZoneId: ZoneId | null;
  resetAllDemoData: () => void;
  filteredPatterns: ClusteredPattern[];
  filteredExperiences: Experience[];
  metrics: {
    totalExperiencesAnalyzed: number;
    emergingPatternsCount: number;
    activeSignalZonesCount: number;
    unseenSignalPercentage: number;
    averageSilenceIndex: number;
    fastestGrowingPattern: ClusteredPattern;
    mostSilentPattern: ClusteredPattern;
  };
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

const defaultFilters: FilterState = {
  category: 'All',
  zoneId: 'All',
  timeWindow: 'All',
  severity: 'All',
  trendStatus: 'All',
  searchQuery: '',
};

function calculateIntensity(count: number): SignalIntensity {
  if (count < 15) return 'LOW';
  if (count <= 40) return 'MODERATE';
  if (count <= 80) return 'HIGH';
  return 'EMERGING';
}

const defaultTimelineForExperience = (exp: Experience): ProblemTimelineEvent[] => [
  {
    timestamp: 'Today, 08:30 AM',
    stage: 'REPORTED',
    title: 'Experience Received',
    description: 'Submitted through client-side zero-PII sanitization pipeline.'
  },
  {
    timestamp: 'Today, 08:31 AM',
    stage: 'ANALYZED',
    title: 'Semantic Normalization Complete',
    description: `Extracted topic: ${exp.extractedInfo?.topic || exp.category}, localized to ${exp.zoneName}.`
  },
  {
    timestamp: 'Today, 09:10 AM',
    stage: 'PATTERN DETECTED',
    title: 'Vector Clustering Matched',
    description: 'Joined multi-source signal cluster with high cosine similarity.'
  },
  {
    timestamp: 'Today, 10:25 AM',
    stage: 'SIGNAL ROUTED',
    title: 'Executive Brief Dispatched',
    description: `Delivered to ${exp.assignedStakeholder || 'Municipal Infrastructure Team'}.`
  }
];

const IntelligenceContext = createContext<IntelligenceContextType | undefined>(undefined);

export const IntelligenceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Authentication State
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('unheard_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [experiences, setExperiences] = useState<Experience[]>(() => {
    try {
      const saved = localStorage.getItem('unheard_experiences');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(exp => ({
            ...exp,
            currentStage: exp.currentStage || 'SIGNAL ROUTED',
            timelineEvents: exp.timelineEvents || defaultTimelineForExperience(exp),
            assignedStakeholder: exp.assignedStakeholder || 'Municipal Infrastructure Directorate',
            aiSuggestedAction: exp.aiSuggestedAction || 'Inspect non-functional infrastructure in affected zone and schedule verification.',
          }));
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved experiences, falling back to default', e);
    }
    return INITIAL_EXPERIENCES.map(exp => ({
      ...exp,
      currentStage: exp.currentStage || 'SIGNAL ROUTED',
      timelineEvents: exp.timelineEvents || defaultTimelineForExperience(exp),
      assignedStakeholder: exp.assignedStakeholder || 'Municipal Infrastructure Directorate',
      aiSuggestedAction: exp.aiSuggestedAction || 'Inspect non-functional infrastructure in affected zone and schedule verification.',
    }));
  });

  const [patterns, setPatterns] = useState<ClusteredPattern[]>(() => {
    try {
      const saved = localStorage.getItem('unheard_patterns');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return PATTERNS_DATA.map(defaultPat => {
            const matched = parsed.find((p: any) => p.id === defaultPat.id);
            if (matched) {
              return {
                ...defaultPat,
                ...matched,
                possibleCauses: matched.possibleCauses && Array.isArray(matched.possibleCauses) ? matched.possibleCauses : defaultPat.possibleCauses,
                aiSuggestedActions: matched.aiSuggestedActions && Array.isArray(matched.aiSuggestedActions) ? matched.aiSuggestedActions : defaultPat.aiSuggestedActions,
                suggestedStakeholders: matched.suggestedStakeholders && Array.isArray(matched.suggestedStakeholders) ? matched.suggestedStakeholders : defaultPat.suggestedStakeholders,
                weeklyTrajectory: matched.weeklyTrajectory && Array.isArray(matched.weeklyTrajectory) ? matched.weeklyTrajectory : defaultPat.weeklyTrajectory,
              };
            }
            return defaultPat;
          });
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved patterns, falling back to default', e);
    }
    return PATTERNS_DATA;
  });

  const [zones, setZones] = useState<ZoneGeoData[]>(() => {
    try {
      const saved = localStorage.getItem('unheard_zones');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return ZONES_DATA.map(defaultZone => {
            const matched = parsed.find((z: any) => z.id === defaultZone.id);
            if (matched) {
              return {
                ...defaultZone,
                ...matched,
                possibleCauses: matched.possibleCauses && Array.isArray(matched.possibleCauses) ? matched.possibleCauses : defaultZone.possibleCauses,
                aiSuggestedActions: matched.aiSuggestedActions && Array.isArray(matched.aiSuggestedActions) ? matched.aiSuggestedActions : defaultZone.aiSuggestedActions,
                suggestedStakeholders: matched.suggestedStakeholders && Array.isArray(matched.suggestedStakeholders) ? matched.suggestedStakeholders : defaultZone.suggestedStakeholders,
              };
            }
            return defaultZone;
          });
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved zones, falling back to default', e);
    }
    return ZONES_DATA;
  });

  const [myContributions, setMyContributions] = useState<Experience[]>(() => {
    try {
      const saved = localStorage.getItem('unheard_my_contributions');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map(exp => ({
            ...exp,
            currentStage: exp.currentStage || 'SIGNAL ROUTED',
            timelineEvents: exp.timelineEvents || defaultTimelineForExperience(exp),
            assignedStakeholder: exp.assignedStakeholder || 'Municipal Infrastructure Directorate',
            aiSuggestedAction: exp.aiSuggestedAction || 'Inspect non-functional infrastructure in affected zone and schedule verification.',
          }));
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved contributions, falling back to default', e);
    }
    return [];
  });

  const [selectedZoneId, setSelectedZoneId] = useState<ZoneId | null>(null);
  const [selectedPatternId, setSelectedPatternId] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  
  // Modals & Panels
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState<boolean>(false);
  const [isLiveDemoOpen, setIsLiveDemoOpen] = useState<boolean>(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(false);
  const [isMyUnheardOpen, setIsMyUnheardOpen] = useState<boolean>(false);
  
  // Feedback & Map Pulses
  const [latestSubmissionImpact, setLatestSubmissionImpact] = useState<SubmissionImpactFeedback | null>(null);
  const [recentlyPulsedZoneId, setRecentlyPulsedZoneId] = useState<ZoneId | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('unheard_auth_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('unheard_auth_user');
      }
    } catch (e) {}
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('unheard_experiences', JSON.stringify(experiences));
    } catch (e) {}
  }, [experiences]);

  useEffect(() => {
    try {
      localStorage.setItem('unheard_patterns', JSON.stringify(patterns));
    } catch (e) {}
  }, [patterns]);

  useEffect(() => {
    try {
      localStorage.setItem('unheard_zones', JSON.stringify(zones));
    } catch (e) {}
  }, [zones]);

  useEffect(() => {
    try {
      localStorage.setItem('unheard_my_contributions', JSON.stringify(myContributions));
    } catch (e) {}
  }, [myContributions]);

  // Auth Methods
  const login = async (email: string, _password: string): Promise<boolean> => {
    const loggedUser: User = {
      id: `usr-${Date.now().toString(36)}`,
      name: email.split('@')[0] || 'Community Member',
      email: email,
      isGuest: false,
      createdAt: new Date().toISOString()
    };
    setUser(loggedUser);
    return true;
  };

  const register = async (name: string, email: string, _password: string): Promise<boolean> => {
    const newUser: User = {
      id: `usr-${Date.now().toString(36)}`,
      name: name || 'Community Member',
      email: email,
      isGuest: false,
      createdAt: new Date().toISOString()
    };
    setUser(newUser);
    return true;
  };

  const loginAsGuest = () => {
    const guestUser: User = {
      id: `guest-${Date.now().toString(36)}`,
      name: 'Guest Explorer',
      email: 'guest@unheard.intelligence',
      isGuest: true,
      createdAt: new Date().toISOString()
    };
    setUser(guestUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('unheard_auth_user');
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setSelectedZoneId(null);
    setSelectedPatternId(null);
  };

  const addNewExperience = (newExp: Experience) => {
    const expWithDefaults: Experience = {
      ...newExp,
      currentStage: newExp.currentStage || 'SIGNAL ROUTED',
      timelineEvents: newExp.timelineEvents || defaultTimelineForExperience(newExp),
      assignedStakeholder: newExp.assignedStakeholder || 'Municipal Infrastructure Directorate',
      aiSuggestedAction: newExp.aiSuggestedAction || 'Inspect non-functional lighting and transit links in the affected zone.',
    };

    setExperiences(prev => [expWithDefaults, ...prev]);
    setMyContributions(prev => [expWithDefaults, ...prev]);

    // Find zone to capture beforeCount
    const targetZone = zones.find(z => z.id === newExp.zoneId) || zones[0] || ZONES_DATA[0];
    const beforeCount = targetZone?.activeSignalsCount || 20;
    const afterCount = beforeCount + 1;

    // 1. Update Zone in central state
    setZones(prevZones => prevZones.map(z => {
      if (z.id === newExp.zoneId) {
        const newCount = z.activeSignalsCount + 1;
        return {
          ...z,
          activeSignalsCount: newCount,
          intensityLevel: calculateIntensity(newCount),
          growthRate: z.growthRate + 2,
          reportedCount: z.reportedCount + 1
        };
      }
      return z;
    }));

    // 2. Update Pattern in central state
    let matchedTitle = 'Public Infrastructure Friction';
    if (newExp.clusterId) {
      setPatterns(prevPatterns => prevPatterns.map(pat => {
        if (pat.id === newExp.clusterId) {
          matchedTitle = pat.title;
          const newRelated = pat.relatedExperienceCount + 1;
          return {
            ...pat,
            relatedExperienceCount: newRelated,
            reportedCount: pat.reportedCount + 1,
            growthRate: pat.growthRate + 1,
            modelConfidence: Math.min(98, pat.modelConfidence + 0.5),
            weeklyTrajectory: [
              pat.weeklyTrajectory[0] || 50,
              pat.weeklyTrajectory[1] || 100,
              pat.weeklyTrajectory[2] || 150,
              (pat.weeklyTrajectory[3] || 200) + 1
            ]
          };
        }
        return pat;
      }));
    }

    // 3. Set visual impact and trigger zone pulse
    setLatestSubmissionImpact({
      zoneId: newExp.zoneId,
      zoneCode: targetZone?.code || 'ZONE 01',
      zoneName: targetZone?.name || 'Sector',
      beforeCount,
      afterCount,
      patternTitle: matchedTitle,
      anonymousId: newExp.anonymousTrackingId || 'UNH-7K42-XP91'
    });

    setRecentlyPulsedZoneId(newExp.zoneId);
    setTimeout(() => {
      setRecentlyPulsedZoneId(null);
    }, 6000);
  };

  const advanceProblemStatus = (idOrTrackingId: string) => {
    const advanceStage = (current: ProblemProgressStage | undefined): { nextStage: ProblemProgressStage; newEvent: ProblemTimelineEvent; resolution?: any } => {
      if (!current || current === 'REPORTED' || current === 'ANALYZED' || current === 'PATTERN DETECTED') {
        return {
          nextStage: 'SIGNAL ROUTED',
          newEvent: {
            timestamp: 'Just now',
            stage: 'SIGNAL ROUTED',
            title: 'Signal Routed to Authority',
            description: 'Dispatched to responsible municipal infrastructure team.'
          }
        };
      }
      if (current === 'SIGNAL ROUTED') {
        return {
          nextStage: 'UNDER REVIEW',
          newEvent: {
            timestamp: 'Just now',
            stage: 'UNDER REVIEW',
            title: 'Under Active Review',
            description: 'Field officer assigned. Site survey scheduled within 48 hours.'
          }
        };
      }
      if (current === 'UNDER REVIEW') {
        return {
          nextStage: 'ACTION TAKEN',
          newEvent: {
            timestamp: 'Just now',
            stage: 'ACTION TAKEN',
            title: 'Maintenance Crew Deployed',
            description: 'Electrical maintenance work order issued; contractor on-site.'
          }
        };
      }
      if (current === 'ACTION TAKEN') {
        return {
          nextStage: 'RESOLVED',
          newEvent: {
            timestamp: 'Just now',
            stage: 'RESOLVED',
            title: 'Problem Resolved & Verified',
            description: 'Repairs completed and verified via independent community sensor checks.'
          },
          resolution: {
            resolvedAt: 'Today (Simulated Complete)',
            actionTaken: 'Replaced 18 high-efficiency LED luminaires and upgraded junction circuit distribution.',
            stakeholder: 'Municipal Infrastructure Division',
            impactOutcome: 'Restored safe pedestrian transit corridor for ~480 daily night commuters.'
          }
        };
      }
      return {
        nextStage: 'RESOLVED',
        newEvent: {
          timestamp: 'Just now',
          stage: 'RESOLVED',
          title: 'Problem Resolved',
          description: 'Issue is fully resolved.'
        }
      };
    };

    setExperiences(prev => prev.map(item => {
      if (item.id === idOrTrackingId || item.anonymousTrackingId === idOrTrackingId) {
        const { nextStage, newEvent, resolution } = advanceStage(item.currentStage);
        return {
          ...item,
          currentStage: nextStage,
          timelineEvents: [newEvent, ...(item.timelineEvents || [])],
          resolutionSummary: resolution || item.resolutionSummary,
        };
      }
      return item;
    }));

    setMyContributions(prev => prev.map(item => {
      if (item.id === idOrTrackingId || item.anonymousTrackingId === idOrTrackingId) {
        const { nextStage, newEvent, resolution } = advanceStage(item.currentStage);
        return {
          ...item,
          currentStage: nextStage,
          timelineEvents: [newEvent, ...(item.timelineEvents || [])],
          resolutionSummary: resolution || item.resolutionSummary,
        };
      }
      return item;
    }));
  };

  const getExperienceById = (idOrTrackingId: string): Experience | undefined => {
    return experiences.find(e => e.id === idOrTrackingId || e.anonymousTrackingId === idOrTrackingId);
  };

  const resetAllDemoData = () => {
    setExperiences(INITIAL_EXPERIENCES);
    setPatterns(PATTERNS_DATA);
    setZones(ZONES_DATA);
    setMyContributions([]);
    setFilters(defaultFilters);
    setSelectedZoneId(null);
    setSelectedPatternId(null);
    setLatestSubmissionImpact(null);
    try {
      localStorage.removeItem('unheard_experiences');
      localStorage.removeItem('unheard_patterns');
      localStorage.removeItem('unheard_zones');
      localStorage.removeItem('unheard_my_contributions');
    } catch (e) {}
  };

  // Filtered patterns
  const filteredPatterns = useMemo(() => {
    return patterns.filter(pat => {
      if (!pat) return false;
      if (filters.category !== 'All' && pat.category !== filters.category) return false;
      if (filters.zoneId !== 'All' && !(pat.primaryZones || []).includes(filters.zoneId as ZoneId)) return false;
      if (filters.timeWindow !== 'All' && !(pat.primaryTimeWindows || []).includes(filters.timeWindow as any)) return false;
      if (filters.severity !== 'All' && pat.suggestedAttention !== filters.severity) return false;
      if (filters.trendStatus !== 'All' && pat.trendStatus !== filters.trendStatus) return false;
      if (filters.searchQuery.trim() !== '') {
        const q = filters.searchQuery.toLowerCase();
        const matchTitle = (pat.title || '').toLowerCase().includes(q);
        const matchSummary = (pat.summary || '').toLowerCase().includes(q);
        const matchCat = (pat.category || '').toLowerCase().includes(q);
        if (!matchTitle && !matchSummary && !matchCat) return false;
      }
      return true;
    });
  }, [patterns, filters]);

  // Filtered experiences
  const filteredExperiences = useMemo(() => {
    return experiences.filter(exp => {
      if (!exp) return false;
      if (filters.category !== 'All' && exp.category !== filters.category) return false;
      if (filters.zoneId !== 'All' && exp.zoneId !== filters.zoneId) return false;
      if (filters.timeWindow !== 'All' && exp.timeWindow !== filters.timeWindow) return false;
      if (filters.searchQuery.trim() !== '') {
        const q = filters.searchQuery.toLowerCase();
        const matchText = (exp.sanitizedText || '').toLowerCase().includes(q);
        const matchTopic = (exp.extractedInfo?.topic || '').toLowerCase().includes(q);
        if (!matchText && !matchTopic) return false;
      }
      return true;
    });
  }, [experiences, filters]);

  // Unified Central Metrics
  const metrics = useMemo(() => {
    const totalExp = patterns.reduce((sum, p) => sum + (p.relatedExperienceCount || 0), 0) + experiences.length;
    const avgSilence = patterns.length > 0
      ? Math.round(patterns.reduce((sum, p) => sum + (p.silenceIndex || 0), 0) / patterns.length)
      : 91;

    const sortedByGrowth = [...patterns].sort((a, b) => (b.growthRate || 0) - (a.growthRate || 0));
    const sortedBySilence = [...patterns].sort((a, b) => (b.silenceIndex || 0) - (a.silenceIndex || 0));

    return {
      totalExperiencesAnalyzed: 12481 + (experiences.length - INITIAL_EXPERIENCES.length),
      emergingPatternsCount: filteredPatterns.length,
      activeSignalZonesCount: zones.length,
      unseenSignalPercentage: 73,
      averageSilenceIndex: avgSilence || 92,
      fastestGrowingPattern: sortedByGrowth[0] || PATTERNS_DATA[0],
      mostSilentPattern: sortedBySilence[0] || PATTERNS_DATA[0],
    };
  }, [patterns, experiences, filteredPatterns, zones]);

  return (
    <IntelligenceContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isGuest: !!user?.isGuest,
        login,
        register,
        loginAsGuest,
        logout,
        experiences,
        patterns,
        zones,
        selectedZoneId,
        setSelectedZoneId,
        selectedPatternId,
        setSelectedPatternId,
        filters,
        setFilters,
        resetFilters,
        addNewExperience,
        advanceProblemStatus,
        getExperienceById,
        isSubmissionModalOpen,
        setIsSubmissionModalOpen,
        isLiveDemoOpen,
        setIsLiveDemoOpen,
        isTutorialOpen,
        setIsTutorialOpen,
        isMyUnheardOpen,
        setIsMyUnheardOpen,
        myContributions,
        latestSubmissionImpact,
        setLatestSubmissionImpact,
        recentlyPulsedZoneId,
        resetAllDemoData,
        filteredPatterns,
        filteredExperiences,
        metrics,
        soundEnabled,
        setSoundEnabled,
      }}
    >
      {children}
    </IntelligenceContext.Provider>
  );
};

export const useIntelligence = () => {
  const context = useContext(IntelligenceContext);
  if (!context) {
    throw new Error('useIntelligence must be used within an IntelligenceProvider');
  }
  return context;
};
