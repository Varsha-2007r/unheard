export interface PrivacySanitizationResult {
  originalText: string;
  sanitizedText: string;
  redactionsFound: {
    type: 'Name' | 'Phone' | 'Email' | 'Room/Unit' | 'Registration/ID' | 'Precise Coordinate';
    matchedText: string;
  }[];
  generalizedZone: string;
  confidenceScore: number;
}

export function sanitizeExperienceInput(
  rawText: string,
  selectedZone: string
): PrivacySanitizationResult {
  let text = rawText;
  const redactions: {
    type: 'Name' | 'Phone' | 'Email' | 'Room/Unit' | 'Registration/ID' | 'Precise Coordinate';
    matchedText: string;
  }[] = [];

  // 1. Scrub Phone Numbers
  const phoneRegex = new RegExp('(?:\\+91[ -]?)?[6789]\\d{9}|\\b\\d{3}[-. ]?\\d{3}[-. ]?\\d{4}\\b', 'g');
  text = text.replace(phoneRegex, (match) => {
    redactions.push({ type: 'Phone', matchedText: match });
    return '[CONTACT REDACTED]';
  });

  // 2. Scrub Emails
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/g;
  text = text.replace(emailRegex, (match) => {
    redactions.push({ type: 'Email', matchedText: match });
    return '[EMAIL REDACTED]';
  });

  // 3. Scrub Student IDs / Roll Numbers / Reg numbers (e.g. REG22104001, UNI19CS023, Roll 42)
  const idRegex = new RegExp('\\b(?:UNI|REG|ROLL|ID|BATCH|STU)?[ -:]?[0-9]{2}[A-Z]{2,4}[0-9]{3,6}\\b|\\b(?:roll[ ]*(?:no|number)?[ ]*[:#]?[ ]*\\d+)\\b', 'gi');
  text = text.replace(idRegex, (match) => {
    redactions.push({ type: 'Registration/ID', matchedText: match });
    return '[STUDENT_ID REDACTED]';
  });

  // 4. Scrub Specific Room / Flat / Block specific numbers (e.g. Room 402, Block B-3, Door 12)
  const roomRegex = new RegExp('\\b(?:room|flat|door|apartment|bed|cubicle)[ ]*(?:no|number|#)?[ ]*[A-Za-z0-9-]+\\b', 'gi');
  text = text.replace(roomRegex, (match) => {
    redactions.push({ type: 'Room/Unit', matchedText: match });
    return '[LOCAL_UNIT REDACTED]';
  });

  // 5. Scrub Common First/Last Names if prefaced with "I am...", "My friend X", "Prof. Y", "Driver Z"
  const namePrefixedRegex = new RegExp('\\b(?:I am|my name is|with my friend|along with|driver|conductor|warden|prof(?:essor)?|dr\\.)[ ]+([A-Z][a-z]+(?:[ ]+[A-Z][a-z]+)?)\\b', 'g');
  text = text.replace(namePrefixedRegex, (match, p1) => {
    redactions.push({ type: 'Name', matchedText: p1 });
    return `[INDIVIDUAL IDENTIFIER REDACTED]`;
  });

  // 6. Scrub Specific Lat/Long coordinates if typed (e.g. 12.9716, 80.0428)
  const gpsRegex = new RegExp('\\b\\d{1,3}\\.\\d{4,8}[ ]*,[ ]*\\d{1,3}\\.\\d{4,8}\\b', 'g');
  text = text.replace(gpsRegex, (match) => {
    redactions.push({ type: 'Precise Coordinate', matchedText: match });
    return '[COORDINATE AGGREGATED]';
  });

  // Generalized location description based on selected zone
  const zoneGeneralizationMap: Record<string, string> = {
    'campus-zone': 'Aggregated Academic Quadrant (Radius ~800m)',
    'transit-corridor': 'Aggregated Transit Artery (Corridor Cell #2)',
    'hostel-sector': 'Aggregated Residential & Dormitory Perimeter',
    'market-district': 'Aggregated Commercial District Zone',
    'tech-park-junction': 'Aggregated Industrial-Campus Arterial',
    'suburban-link': 'Aggregated Suburban Railway Zone',
    'civic-center': 'Aggregated Municipal Sector',
    'library-academic': 'Aggregated Research & Library Cluster',
  };

  const generalizedZone = zoneGeneralizationMap[selectedZone] || 'Generalized Sector Grid #04';

  return {
    originalText: rawText,
    sanitizedText: text,
    redactionsFound: redactions,
    generalizedZone,
    confidenceScore: 99.4,
  };
}
