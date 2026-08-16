import { Experience, ClusteredPattern, ZoneGeoData, SignalIntensity } from '../types';

export const ZONES_DATA: ZoneGeoData[] = [
  {
    id: 'campus-zone',
    name: 'Academic Sector & Central Quadrant',
    code: 'ZONE 01',
    description: 'Central library corridors, lecture halls, and main perimeter walkways.',
    x: 48,
    y: 42,
    lat: 12.9716,
    lng: 80.0428,
    activeSignalsCount: 24,
    intensityLevel: 'MODERATE',
    topCategory: 'Education',
    silenceIndex: 86,
    growthRate: 18,
    severity: 'Moderate',
    primaryIssue: 'Peak-hour study room saturation and library power outlet bottlenecks',
    reportedCount: 42,
    estimatedUnheard: 258,
    possibleCauses: [
      'Unchanged seating capacity despite increased cohort size',
      'Non-functional power sockets in silent revision wings',
      'Locked departmental rooms after 5:00 PM'
    ],
    aiSuggestedActions: [
      'Unlock 12 departmental seminar rooms as 24/7 study pods',
      'Repair electrical power distribution in central reading wing',
      'Implement real-time study desk occupancy telemetry'
    ],
    suggestedStakeholders: [
      'Academic Facilities Directorate',
      'Central Library Committee',
      'Student Welfare Board'
    ],
    lifecycleStatus: 'SIGNAL ROUTED'
  },
  {
    id: 'transit-corridor',
    name: 'North-South Transit Link & Bus Depot',
    code: 'ZONE 02',
    description: 'High-density urban commuter artery linking central hubs with the suburban rail interchange.',
    x: 28,
    y: 35,
    lat: 12.9790,
    lng: 80.0380,
    activeSignalsCount: 68,
    intensityLevel: 'HIGH',
    topCategory: 'Transport',
    silenceIndex: 91,
    growthRate: 42,
    severity: 'Critical',
    primaryIssue: 'Severe morning bus overcrowding (7:45 AM - 9:00 AM) and missing feeder services',
    reportedCount: 83,
    estimatedUnheard: 917,
    possibleCauses: [
      '30-minute schedule gap between peak morning express routes',
      'Route capacity mismatch with early shift reporting hours',
      'Bypassed intermediate stops due to door-level passenger crowding'
    ],
    aiSuggestedActions: [
      'Increase peak-hour bus frequency between 7:30 AM and 9:00 AM',
      'Review route capacity allocation on arterial express links',
      'Deploy targeted intermediate feeder shuttles'
    ],
    suggestedStakeholders: [
      'Metropolitan Transport Authority',
      'Public Transit Operators',
      'Regional Commuter Advisory Council'
    ],
    lifecycleStatus: 'UNDER REVIEW — DEMO'
  },
  {
    id: 'hostel-sector',
    name: 'Perimeter Residential & Dormitory Belt',
    code: 'ZONE 03',
    description: 'Outer ring corridor housing multi-block student dormitories and residential communities.',
    x: 72,
    y: 65,
    lat: 12.9650,
    lng: 80.0510,
    activeSignalsCount: 52,
    intensityLevel: 'HIGH',
    topCategory: 'Safety',
    silenceIndex: 93,
    growthRate: 38,
    severity: 'High',
    primaryIssue: 'Unlit pedestrian pathways, broken sodium streetlights, and lack of evening security posts',
    reportedCount: 37,
    estimatedUnheard: 480,
    possibleCauses: [
      'Underground circuit fault across 18 consecutive light poles',
      'Dense tree canopies blocking secondary solar fixtures',
      'Absence of regular foot-patrol officers between 8:00 PM and 11:30 PM'
    ],
    aiSuggestedActions: [
      'Inspect and restore non-functional streetlights along affected corridor',
      'Trim obstructive tree canopies around solar illumination posts',
      'Schedule preventative evening security foot-patrols'
    ],
    suggestedStakeholders: [
      'Municipal Electrical Maintenance Division',
      'Campus Safety Administration',
      'Local Resident Welfare Association'
    ],
    lifecycleStatus: 'ACTION SUGGESTED'
  },
  {
    id: 'market-district',
    name: 'Commercial & Market District Junction',
    code: 'ZONE 04',
    description: 'Commercial strip, eateries, pharmacies, and informal transit auto stands.',
    x: 65,
    y: 30,
    lat: 12.9820,
    lng: 80.0470,
    activeSignalsCount: 23,
    intensityLevel: 'MODERATE',
    topCategory: 'Food',
    silenceIndex: 85,
    growthRate: 29,
    severity: 'Moderate',
    primaryIssue: 'Late-night affordable food scarcity post 8:30 PM forcing long unsafe travel',
    reportedCount: 51,
    estimatedUnheard: 290,
    possibleCauses: [
      'Early dining closure policies leaving shift workers without meals',
      'Informal vendor restrictions without designated night-vending zones',
      'High delivery app surge markups'
    ],
    aiSuggestedActions: [
      'Extend subsidized evening cafeteria operational hours to 11:00 PM',
      'Establish certified hygienic night food vendor kiosks',
      'Review student nutritional access on campus perimeters'
    ],
    suggestedStakeholders: [
      'Student Welfare & Dining Directorate',
      'Local Commercial Vendor Association',
      'Public Nutrition Board'
    ],
    lifecycleStatus: 'SIGNAL ROUTED'
  },
  {
    id: 'tech-park-junction',
    name: 'Industrial & Tech Corridor Intersection',
    code: 'ZONE 05',
    description: 'Heavy vehicular traffic junction connecting main gates with the industrial belt.',
    x: 82,
    y: 48,
    lat: 12.9740,
    lng: 80.0600,
    activeSignalsCount: 94,
    intensityLevel: 'EMERGING',
    topCategory: 'Infrastructure',
    silenceIndex: 94,
    growthRate: 45,
    severity: 'Critical',
    primaryIssue: 'Dangerous pedestrian crossing with zero traffic signal sync and heavy container trucks',
    reportedCount: 29,
    estimatedUnheard: 450,
    possibleCauses: [
      'Missing pedestrian crossing phase on automated traffic signal',
      'Excess vehicle speeds during shift-change hours',
      'Obstructed zebra line visibility'
    ],
    aiSuggestedActions: [
      'Install pedestrian-activated demand signal phase at main crossing',
      'Deploy speed-calming rumble strips along approach corridor',
      'Repaint high-visibility reflective zebra markings'
    ],
    suggestedStakeholders: [
      'City Traffic Management Division',
      'Highways Department',
      'Industrial Park Safety Committee'
    ],
    lifecycleStatus: 'UNDER REVIEW — DEMO'
  },
  {
    id: 'suburban-link',
    name: 'Suburban Railway Station Approach',
    code: 'ZONE 06',
    description: 'Walkable subway and ramp access connecting the railway platform to local roads.',
    x: 20,
    y: 70,
    lat: 12.9610,
    lng: 80.0320,
    activeSignalsCount: 31,
    intensityLevel: 'MODERATE',
    topCategory: 'Accessibility',
    silenceIndex: 88,
    growthRate: 22,
    severity: 'High',
    primaryIssue: 'Broken wheelchair ramps and missing tactile pavers for visually impaired commuters',
    reportedCount: 22,
    estimatedUnheard: 160,
    possibleCauses: [
      'Non-standard steep incline slope exceeding 1:8 gradient',
      'Damaged tactile flooring tiles following drainage works',
      'Locked elevator access during evening hours'
    ],
    aiSuggestedActions: [
      'Regrade entrance ramps to universal 1:12 slope standards',
      'Reinstall continuous tactile guidance tiles across platform approaches',
      'Automate 24/7 elevator access with emergency intercoms'
    ],
    suggestedStakeholders: [
      'Railway Division Infrastructure Cell',
      'Disability Rights & Universal Accessibility Commission',
      'Public Works Department'
    ],
    lifecycleStatus: 'SIGNAL ROUTED'
  },
  {
    id: 'civic-center',
    name: 'Town Civic Center & Health Post',
    code: 'ZONE 07',
    description: 'Municipal clinic, administrative office, and public grievance service area.',
    x: 40,
    y: 80,
    lat: 12.9550,
    lng: 80.0400,
    activeSignalsCount: 12,
    intensityLevel: 'LOW',
    topCategory: 'Healthcare',
    silenceIndex: 96,
    growthRate: 31,
    severity: 'High',
    primaryIssue: 'Zero emergency night triage support and delayed response radius',
    reportedCount: 14,
    estimatedUnheard: 330,
    possibleCauses: [
      'Automated gate locks obstructing emergency ambulance entry',
      'Insufficient night triage staff at local health clinic'
    ],
    aiSuggestedActions: [
      'Install emergency RFID transponder override on perimeter security gates',
      'Station dedicated first-aid paramedical quick-response team'
    ],
    suggestedStakeholders: [
      'District Health Directorate',
      'Emergency Response Network',
      'Municipal Health Cell'
    ],
    lifecycleStatus: 'SIGNAL ROUTED'
  },
  {
    id: 'library-academic',
    name: 'Innovation & Research Lab Complex',
    code: 'ZONE 08',
    description: 'Research laboratories, incubation complexes, and 24/7 computing facilities.',
    x: 55,
    y: 18,
    lat: 12.9880,
    lng: 80.0440,
    activeSignalsCount: 28,
    intensityLevel: 'MODERATE',
    topCategory: 'Public Services',
    silenceIndex: 89,
    growthRate: 22,
    severity: 'Moderate',
    primaryIssue: 'Cancellation of late-night feeder vans for students and shift workers leaving labs after 10 PM',
    reportedCount: 31,
    estimatedUnheard: 250,
    possibleCauses: [
      'Contractor cancellation of late feeder loop due to low margin',
      'Lack of coordinated schedule between research labs and transit depot'
    ],
    aiSuggestedActions: [
      'Reinstate hourly subsidized on-demand night mini-bus loop',
      'Establish illuminated night waiting zone with emergency phone booth'
    ],
    suggestedStakeholders: [
      'Logistics & Transit Directorate',
      'Research Scholar Council',
      'Municipal Feeder Cell'
    ],
    lifecycleStatus: 'ACTION SUGGESTED'
  },
];

export const PATTERNS_DATA: ClusteredPattern[] = [
  {
    id: 'PAT-01',
    title: 'Morning Public Transport Overcrowding & Route Frequency Gaps',
    category: 'Transport',
    summary: 'Dozens of discrete student and worker accounts report missing early classes and shifts due to fully packed public buses bypassing designated stops between 7:45 AM and 9:15 AM.',
    relatedExperienceCount: 428,
    aggregatedAreaCount: 9,
    primaryTimeWindows: ['Morning'],
    primaryZones: ['transit-corridor', 'campus-zone', 'suburban-link'],
    primaryAffectedGroups: ['Students', 'Workers'],
    modelConfidence: 91,
    growthRate: 42,
    trendStatus: 'Rapidly Increasing',
    suggestedAttention: 'Critical',
    firstDetectedDaysAgo: 14,
    silenceIndex: 91,
    reportedCount: 83,
    estimatedAffected: 3000,
    estimatedUnheard: 2917,
    possibleCauses: [
      '30-minute interval between morning express buses causing passenger bunching',
      'Schedule misalignment with 8:30 AM university and workplace start times',
      'Intermediate stops routinely bypassed due to full standing capacity'
    ],
    aiSuggestedActions: [
      'Increase peak-hour bus frequency between 7:30 AM and 9:00 AM',
      'Review route capacity allocation along heavy commuter arteries',
      'Analyze repeated missed-stop reports to optimize boarding points',
      'Evaluate supplementary feeder mini-buses from suburban interchanges'
    ],
    suggestedStakeholders: [
      'Metropolitan Transport Authority',
      'Transit Operations Directorate',
      'Commuter Welfare Committee'
    ],
    expectedImpact: 'Estimated 65% reduction in commute delays and zero missed morning sessions for over 2,000 daily passengers.',
    lifecycleStatus: 'UNDER REVIEW — DEMO',
    actionRecommendation: 'Deploy 4 additional express shuttle frequencies between 7:30 AM and 9:00 AM originating at Suburban Link Depot.',
    weeklyTrajectory: [94, 168, 280, 428]
  },
  {
    id: 'PAT-02',
    title: 'Night-Time Pedestrian Corridor & Hostel Route Lighting Insecurity',
    category: 'Safety',
    summary: 'Clusters of recurring experiences indicate severe pedestrian anxiety and detour behavior along the 1.4km eastern ring road due to non-operational streetlights after 7:00 PM.',
    relatedExperienceCount: 312,
    aggregatedAreaCount: 4,
    primaryTimeWindows: ['Night', 'Evening'],
    primaryZones: ['hostel-sector', 'market-district'],
    primaryAffectedGroups: ['Students', 'Residents'],
    modelConfidence: 94,
    growthRate: 38,
    trendStatus: 'Rapidly Increasing',
    suggestedAttention: 'High',
    firstDetectedDaysAgo: 21,
    silenceIndex: 93,
    reportedCount: 37,
    estimatedAffected: 1200,
    estimatedUnheard: 1163,
    possibleCauses: [
      'Faulty underground circuit box causing blackout across 18 consecutive light poles',
      'Dense tree canopies blocking secondary solar fixtures',
      'Absence of regular foot-patrol officers between 8:00 PM and 11:30 PM'
    ],
    aiSuggestedActions: [
      'Inspect and restore affected streetlights along the 1.4km perimeter corridor',
      'Trim overgrown foliage obstructing solar lighting arrays',
      'Schedule preventative evening security foot-patrols on pedestrian routes'
    ],
    suggestedStakeholders: [
      'Municipal Electrical Maintenance Division',
      'Campus Safety & Security Administration',
      'Resident Welfare Association'
    ],
    expectedImpact: 'Elimination of dark hazard zone and restoration of safe nocturnal mobility for 1,200+ residents.',
    lifecycleStatus: 'ACTION SUGGESTED',
    actionRecommendation: 'Emergency replacement of junction box at Pole #42 and trim canopy along eastern pathway.',
    weeklyTrajectory: [62, 115, 205, 312]
  },
  {
    id: 'PAT-03',
    title: 'Wheelchair & Mobility Access Barriers on Academic Overpasses',
    category: 'Accessibility',
    summary: 'Systemic physical barrier reports detailing steep ramp gradients (>1:8 slope), missing elevator keys, and broken tactile guidance lines across main campus connector bridges.',
    relatedExperienceCount: 164,
    aggregatedAreaCount: 3,
    primaryTimeWindows: ['Anytime', 'Morning'],
    primaryZones: ['campus-zone', 'suburban-link'],
    primaryAffectedGroups: ['People with disabilities', 'Elderly', 'Students'],
    modelConfidence: 89,
    growthRate: 18,
    trendStatus: 'Growing',
    suggestedAttention: 'High',
    firstDetectedDaysAgo: 30,
    silenceIndex: 88,
    reportedCount: 22,
    estimatedAffected: 450,
    estimatedUnheard: 428,
    possibleCauses: [
      'Non-compliant pedestrian ramp constructed without intermediate flat landings',
      'Elevator locked by facilities staff without accessible intercom',
      'Flooring tiles cracked and uneven following drainage works'
    ],
    aiSuggestedActions: [
      'Retrofit dual-height handrails and regrade entrance ramp to 1:12 slope standard',
      'Install automated low-speed accessible lifts with emergency buzzers',
      'Replace broken tactile guiding pavers across approach walkways'
    ],
    suggestedStakeholders: [
      'Campus Infrastructure & Civil Works',
      'Disability Rights & Universal Accessibility Commission',
      'Public Works Directorate'
    ],
    expectedImpact: 'Independent, barrier-free access to all primary academic lecture halls and transit links.',
    lifecycleStatus: 'SIGNAL ROUTED',
    actionRecommendation: 'Retrofit dual-height handrails, install RFID-unlocked low-speed lifts, and regrade entrance ramp to 1:12 standard.',
    weeklyTrajectory: [50, 85, 128, 164]
  },
  {
    id: 'PAT-04',
    title: 'Post-8 PM Affordable Nutritious Food Deserts Near Student Clusters',
    category: 'Food',
    summary: 'Coordinated pattern of everyday student strain over exorbitant night canteen prices and closure of dining facilities at 8:00 PM, forcing students onto distant highways.',
    relatedExperienceCount: 275,
    aggregatedAreaCount: 5,
    primaryTimeWindows: ['Night', 'Evening'],
    primaryZones: ['market-district', 'hostel-sector', 'library-academic'],
    primaryAffectedGroups: ['Students', 'Workers'],
    modelConfidence: 86,
    growthRate: 29,
    trendStatus: 'Growing',
    suggestedAttention: 'Moderate',
    firstDetectedDaysAgo: 18,
    silenceIndex: 85,
    reportedCount: 51,
    estimatedAffected: 1800,
    estimatedUnheard: 1749,
    possibleCauses: [
      'Central mess contracts prohibiting dinner service after 8:15 PM',
      'Informal vendor restrictions without designated night-vending zones',
      'High delivery app surge markups'
    ],
    aiSuggestedActions: [
      'Extend subsidized evening cafeteria operational hours to 11:00 PM',
      'Establish certified hygienic night food vendor kiosks',
      'Review student nutritional access on campus perimeters'
    ],
    suggestedStakeholders: [
      'Student Welfare & Dining Directorate',
      'Local Commercial Vendor Association',
      'Youth Nutrition Initiative'
    ],
    expectedImpact: 'Safe, affordable dinner access for 1,800+ late-shift students and researchers.',
    lifecycleStatus: 'SIGNAL ROUTED',
    actionRecommendation: 'Extend subsidized night cafeteria hours to 11:00 PM with standardized healthy pocket-friendly menus.',
    weeklyTrajectory: [70, 130, 195, 275]
  },
  {
    id: 'PAT-05',
    title: 'Seasonal Monsoon Waterlogging at Bus Rapid Transit Terminals',
    category: 'Infrastructure',
    summary: 'High-density seasonal complaints regarding ankle-deep standing stagnant water at transit boarding platforms, rendering boarding unsafe and forcing passengers into moving traffic.',
    relatedExperienceCount: 389,
    aggregatedAreaCount: 6,
    primaryTimeWindows: ['Morning', 'Evening'],
    primaryZones: ['transit-corridor', 'tech-park-junction'],
    primaryAffectedGroups: ['General Public', 'Students', 'Elderly'],
    modelConfidence: 93,
    growthRate: 45,
    trendStatus: 'Rapidly Increasing',
    suggestedAttention: 'Critical',
    firstDetectedDaysAgo: 9,
    silenceIndex: 94,
    reportedCount: 29,
    estimatedAffected: 4200,
    estimatedUnheard: 4171,
    possibleCauses: [
      'Blocked storm-water culvert beneath depot entrance',
      'Improper gradient slope diverting highway runoff toward passenger waiting sheds',
      'Broken concrete slabs near boarding bays'
    ],
    aiSuggestedActions: [
      'Emergency desiltation of 300m culvert beneath transit depot entrance',
      'Install raised porous grating along boarding bays',
      'Regrade highway runoff diverter channels'
    ],
    suggestedStakeholders: [
      'Municipal Drainage Department',
      'Highways Infrastructure Cell',
      'Public Transit Commuter Council'
    ],
    expectedImpact: 'Dry, hazard-free boarding for 4,000+ daily transit commuters during precipitation events.',
    lifecycleStatus: 'UNDER REVIEW — DEMO',
    actionRecommendation: 'Emergency desiltation of 300m culvert and install raised porous grating along boarding bays.',
    weeklyTrajectory: [45, 110, 240, 389]
  },
  {
    id: 'PAT-06',
    title: 'Overloaded Peak-Hour Study Spaces & Silent Room Bottlenecks',
    category: 'Education',
    summary: 'Recurrent frustration over lack of quiet, powered workspace during mid-term and finals revision windows, leading to territorial seat reservations and elevated stress.',
    relatedExperienceCount: 210,
    aggregatedAreaCount: 2,
    primaryTimeWindows: ['Afternoon', 'Evening', 'Night'],
    primaryZones: ['campus-zone', 'library-academic'],
    primaryAffectedGroups: ['Students'],
    modelConfidence: 88,
    growthRate: 14,
    trendStatus: 'Stable',
    suggestedAttention: 'Moderate',
    firstDetectedDaysAgo: 40,
    silenceIndex: 82,
    reportedCount: 42,
    estimatedAffected: 1500,
    estimatedUnheard: 1458,
    possibleCauses: [
      'Library occupancy limits unchanged despite 30% surge in student intake',
      'Power socket failure across 40% of reading cubicles',
      'Academic departments locking empty tutorial rooms after 5:00 PM'
    ],
    aiSuggestedActions: [
      'Unlock 12 departmental seminar rooms as 24/7 study pods',
      'Repair power socket circuits in quiet reading wing',
      'Deploy smart desk occupancy sensor display in campus portal'
    ],
    suggestedStakeholders: [
      'Dean of Academic Affairs',
      'Central Library Committee',
      'Student Union Representatives'
    ],
    expectedImpact: 'Provision of 350+ quiet powered study seats reducing revision crowding.',
    lifecycleStatus: 'ACTION SUGGESTED',
    actionRecommendation: 'Unlock 12 departmental seminar rooms as 24/7 study pods with supervised smart access.',
    weeklyTrajectory: [140, 165, 188, 210]
  },
  {
    id: 'PAT-07',
    title: 'Discontinued Night Feeder Shuttles for Shift Workers & Lab Students',
    category: 'Public Services',
    summary: 'Isolated experiences submitted by late-shift lab researchers, nursing trainees, and security personnel having zero safe last-mile transit between 10:30 PM and 1:00 AM.',
    relatedExperienceCount: 184,
    aggregatedAreaCount: 4,
    primaryTimeWindows: ['Night'],
    primaryZones: ['library-academic', 'transit-corridor', 'civic-center'],
    primaryAffectedGroups: ['Workers', 'Students'],
    modelConfidence: 87,
    growthRate: 22,
    trendStatus: 'Growing',
    suggestedAttention: 'High',
    firstDetectedDaysAgo: 25,
    silenceIndex: 89,
    reportedCount: 31,
    estimatedAffected: 800,
    estimatedUnheard: 769,
    possibleCauses: [
      'Feeder bus service silently cancelled due to low off-peak margins',
      'Curfew policies conflicting with project lab deadlines',
      'Surge auto charges leaving night staff stranded'
    ],
    aiSuggestedActions: [
      'Reinstate hourly subsidized on-demand night mini-bus loop',
      'Coordinate late transit schedule with laboratory shift handovers'
    ],
    suggestedStakeholders: [
      'University Logistics Directorate',
      'City Transport Feeder Cell',
      'Hospital & Research Workers Union'
    ],
    expectedImpact: 'Safe, affordable nocturnal last-mile transit for 800+ shift workers and students.',
    lifecycleStatus: 'SIGNAL ROUTED',
    actionRecommendation: 'Reinstate hourly subsidized on-demand night mini-bus loop connecting labs to railway and depot.',
    weeklyTrajectory: [60, 100, 145, 184]
  },
  {
    id: 'PAT-08',
    title: 'Delayed Emergency First-Aid Dispatch in Perimeter Residential Sectors',
    category: 'Healthcare',
    summary: 'Submissions documenting harrowing 45-minute waits for basic medical emergency response in southern residential blocks due to locked campus barrier gates.',
    relatedExperienceCount: 95,
    aggregatedAreaCount: 3,
    primaryTimeWindows: ['Anytime', 'Night'],
    primaryZones: ['civic-center', 'hostel-sector'],
    primaryAffectedGroups: ['Residents', 'Elderly', 'Students'],
    modelConfidence: 92,
    growthRate: 31,
    trendStatus: 'Growing',
    suggestedAttention: 'Critical',
    firstDetectedDaysAgo: 16,
    silenceIndex: 96,
    reportedCount: 14,
    estimatedAffected: 600,
    estimatedUnheard: 586,
    possibleCauses: [
      'Emergency vehicles unaware of automated boom barrier override codes at Gate #5',
      'Single ambulance serving an expanded 12,000 resident radius'
    ],
    aiSuggestedActions: [
      'Install emergency transponder override on Gate #5',
      'Station dedicated paramedical quick-response first-aid unit in southern sector'
    ],
    suggestedStakeholders: [
      'District Health Officer',
      'Emergency Medical Response (108)',
      'Township Resident Welfare Association'
    ],
    expectedImpact: 'Reduction of emergency response dispatch time from 45 minutes to under 12 minutes.',
    lifecycleStatus: 'UNDER REVIEW — DEMO',
    actionRecommendation: 'Install emergency transponder override on Gate #5 and station dedicated paramedical quick-response bike unit.',
    weeklyTrajectory: [15, 38, 68, 95]
  }
];

export const INITIAL_EXPERIENCES: Experience[] = [
  {
    id: 'EXP-101',
    anonymousTrackingId: 'UNH-7K42-XP91',
    rawText: 'I stopped taking the morning 554 bus because it is always overcrowded and blows past the gate without stopping. I regularly miss my 8:30 AM class.',
    sanitizedText: 'Commuter unable to board morning bus route 554 due to extreme passenger density and skipped transit stops before 8:30 AM.',
    category: 'Transport',
    zoneId: 'transit-corridor',
    zoneName: 'North-South Transit Link & Bus Depot',
    timeWindow: 'Morning',
    affectedGroup: 'Students',
    frequency: 'Daily',
    impactLevel: 'High',
    submittedAt: '12 minutes ago',
    isAnonymous: true,
    modality: 'text',
    extractedInfo: {
      topic: 'Public Transit Overcrowding',
      problem: 'Morning bus skipping stops due to capacity overflow',
      generalLocation: 'Transit Corridor Depot',
      time: 'Morning (07:45 - 08:30 AM)',
      affectedGroup: 'Students & Commuters',
      impact: 'Missed academic lectures and punctuality penalties',
      sentiment: 'Frustrated',
      keywords: ['554 bus', 'overcrowded', 'skipped stop', 'missed class']
    },
    clusterId: 'PAT-01',
    piiRedactedCount: 2,
    routingStatus: 'UNDER REVIEW — DEMO'
  },
  {
    id: 'EXP-102',
    anonymousTrackingId: 'UNH-9B14-TR88',
    rawText: 'I avoid the eastern ring road near the hostel after 7:30 PM. All the streetlights have been dead for three weeks and nobody feels safe walking alone.',
    sanitizedText: 'Pedestrian avoids eastern ring road near residential zone after 7:30 PM due to multi-week illumination blackout and safety concerns.',
    category: 'Safety',
    zoneId: 'hostel-sector',
    zoneName: 'Perimeter Residential & Dormitory Belt',
    timeWindow: 'Night',
    affectedGroup: 'Students',
    frequency: 'Daily',
    impactLevel: 'High',
    submittedAt: '34 minutes ago',
    isAnonymous: true,
    modality: 'text',
    extractedInfo: {
      topic: 'Pedestrian Lighting & Safety',
      problem: 'Inoperative sodium streetlights creating dark hazard zone',
      generalLocation: 'Hostel Sector Ring Road',
      time: 'Night (Post 7:30 PM)',
      affectedGroup: 'Hostel Residents & Students',
      impact: 'Avoidance of direct transit routes / severe anxiety',
      sentiment: 'Urgent',
      keywords: ['dark road', 'streetlights dead', 'avoid route', 'hostel safety']
    },
    clusterId: 'PAT-02',
    piiRedactedCount: 3,
    routingStatus: 'ACTION SUGGESTED'
  },
  {
    id: 'EXP-103',
    anonymousTrackingId: 'UNH-3M88-AC12',
    rawText: 'My friend in a wheelchair cannot attend guest lectures in Building 3 because the ramp is way too steep (>20 degrees) and has no handrails.',
    sanitizedText: 'Wheelchair user unable to access academic building overpass due to non-compliant steep incline slope and lack of stabilizing handrails.',
    category: 'Accessibility',
    zoneId: 'campus-zone',
    zoneName: 'Academic Sector & Central Quadrant',
    timeWindow: 'Afternoon',
    affectedGroup: 'People with disabilities',
    frequency: 'Weekly',
    impactLevel: 'High',
    submittedAt: '1 hour ago',
    isAnonymous: true,
    modality: 'text',
    extractedInfo: {
      topic: 'Physical Disability Accessibility',
      problem: 'Non-compliant ramp gradient preventing independent mobility',
      generalLocation: 'Main Academic Sector',
      time: 'Afternoon',
      affectedGroup: 'People with mobility disabilities',
      impact: 'Exclusion from core educational facilities and lectures',
      sentiment: 'Urgent',
      keywords: ['wheelchair ramp', 'too steep', 'no handrails', 'building access']
    },
    clusterId: 'PAT-03',
    piiRedactedCount: 2,
    routingStatus: 'SIGNAL ROUTED'
  },
  {
    id: 'EXP-104',
    anonymousTrackingId: 'UNH-5F31-FD77',
    rawText: 'After working late in the robotics lab until 9 PM, there is literally nowhere to get hot food under Rs 150 without taking an expensive auto to the main road.',
    sanitizedText: 'Late-shift researcher unable to find affordable food near research complex post 9:00 PM due to canteen shutdown.',
    category: 'Food',
    zoneId: 'market-district',
    zoneName: 'Commercial & Market District Junction',
    timeWindow: 'Night',
    affectedGroup: 'Students',
    frequency: 'Daily',
    impactLevel: 'Moderate',
    submittedAt: '2 hours ago',
    isAnonymous: true,
    modality: 'text',
    extractedInfo: {
      topic: 'Essential Food Accessibility',
      problem: 'Absence of subsidized dining options after standard evening hours',
      generalLocation: 'Commercial & Market Junction',
      time: 'Night (21:00)',
      affectedGroup: 'Lab Students & Shift Workers',
      impact: 'Nutritional deficit and inflated daily living expenses',
      sentiment: 'Negative',
      keywords: ['no food', 'post 9 PM', 'expensive auto', 'closed canteens']
    },
    clusterId: 'PAT-04',
    piiRedactedCount: 1,
    routingStatus: 'SIGNAL ROUTED'
  }
];

export const LIVE_DEMO_SCRIPT_EXPERIENCES = [
  "I avoid taking the shortcut road near the hostel after 7 PM because all streetlights have been dead for 3 weeks.",
  "The road is pitch dark at night. I have to turn on my phone flashlight just to see potholes.",
  "I felt very unsafe walking back from the computer lab yesterday. There are zero working lights.",
  "Streetlights near the eastern gate haven't worked for almost a month. Multiple people trip over broken curb stones.",
  "I take a 20-minute longer route along the highway just to avoid the dark hostel road at night.",
  "I stopped walking alone to the mess hall after 8 PM because the pathway has zero lighting.",
  "Someone on a two-wheeler almost hit me because it was too dark to see pedestrians on the roadside.",
  "The sodium lights have been blinking rapidly and died completely last Tuesday.",
  "I had to call my roommate to walk with me from the bus stop because the whole stretch is pitch black.",
  "None of the security posts on the eastern boundary are manned after 8:30 PM and the lights are out.",
  "I twisted my ankle stepping into an unseen road trench in the dark last night.",
  "Women students in my hostel block avoid stepping out after sunset purely because the road has zero illumination.",
  "The darkness makes it scary to even wait for evening delivery riders outside the hostel gate.",
  "It has been pitch black for weeks. We complained to maintenance verbally but nothing happened.",
  "I run as fast as I can through that 400m dark stretch every single night after my shift.",
  "The tree branches completely covered the old lights and now the bulbs are burnt out anyway.",
  "I missed my evening study group because I refused to walk back through the dark zone after 9 PM.",
  "Delivery autos refuse to drop us at the hostel entrance because they say the unlit road is unsafe.",
  "There is zero visibility on the road corner. Drivers can't see pedestrians walking on the edge.",
  "We need lights on the perimeter path immediately before an actual accident occurs."
];
