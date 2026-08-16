import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Type, 
  Mic, 
  Image as ImageIcon, 
  MapPin, 
  Clock, 
  Users, 
  Activity, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Radio, 
  Copy, 
  Check, 
  Compass,
  Layers,
  Info,
  Play,
  Pause,
  RotateCcw,
  Upload,
  Camera,
  Trash2,
  AlertTriangle,
  FileCheck2,
  Volume2
} from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';
import { sanitizeExperienceInput } from '../services/privacyService';
import { analyzeExperienceWithAi } from '../services/geminiService';
import { 
  CategoryType, 
  TimeWindow, 
  AffectedGroup, 
  ZoneId, 
  Experience, 
  FrequencyType, 
  ImpactLevel,
  ProblemTimelineEvent 
} from '../types';

export const ReportPage: React.FC = () => {
  const { 
    zones, 
    patterns, 
    addNewExperience 
  } = useIntelligence();

  const navigate = useNavigate();

  // Wizard Step: 1 to 6
  const [activeStep, setActiveStep] = useState<number>(1);
  const [maxCompletedStep, setMaxCompletedStep] = useState<number>(1);

  // Modality Selection
  const [modality, setModality] = useState<'text' | 'voice' | 'photo'>('text');

  // Text Mode State
  const [rawText, setRawText] = useState<string>('');
  const [textError, setTextError] = useState<string>('');

  // Voice Mode State
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [voiceTranscription, setVoiceTranscription] = useState<string>('');
  const [micError, setMicError] = useState<string>('');
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState<boolean>(false);

  // Photo Mode State
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);
  const [photoCaption, setPhotoCaption] = useState<string>('');
  const [isPhotoScanning, setIsPhotoScanning] = useState<boolean>(false);
  const [photoScanComplete, setPhotoScanComplete] = useState<boolean>(false);

  // Step 2 Form States
  const [selectedZone, setSelectedZone] = useState<ZoneId>('hostel-sector');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('Safety');
  const [timeWindow, setTimeWindow] = useState<TimeWindow>('Night');
  const [affectedGroup, setAffectedGroup] = useState<AffectedGroup>('Students');
  const [frequency, setFrequency] = useState<FrequencyType>('Daily');
  const [impactLevel, setImpactLevel] = useState<ImpactLevel>('High');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);

  // Step 3 to 6 State
  const [isAiProcessing, setIsAiProcessing] = useState<boolean>(false);
  const [sanitizedResult, setSanitizedResult] = useState<any>(null);
  const [aiResult, setAiResult] = useState<any>(null);
  const [createdExperience, setCreatedExperience] = useState<Experience | null>(null);
  const [copiedId, setCopiedId] = useState<boolean>(false);

  // Audio / MediaRecorder Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<any>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const speechRecognitionRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Check speech recognition capability on mount
  useEffect(() => {
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognitionAPI) {
      setSpeechRecognitionSupported(true);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl);
    };
  }, []);

  // Quick Examples Presets
  const samplePresets = [
    {
      label: "Streetlight Malfunction",
      text: "Streetlights near my hostel have not worked for several weeks and people avoid the road after dark.",
      cat: "Safety" as CategoryType,
      zone: "hostel-sector" as ZoneId,
      time: "Night" as TimeWindow,
      group: "Students" as AffectedGroup
    },
    {
      label: "Peak Bus Overcrowding",
      text: "The morning 554 bus is completely packed by 8 AM and skips stops, making students and shift workers miss commitments.",
      cat: "Transport" as CategoryType,
      zone: "transit-corridor" as ZoneId,
      time: "Morning" as TimeWindow,
      group: "Workers" as AffectedGroup
    },
    {
      label: "Wheelchair Accessibility Barrier",
      text: "The library overpass ramp is steeper than 20 degrees with no handrails, making it inaccessible for wheelchair users.",
      cat: "Accessibility" as CategoryType,
      zone: "campus-zone" as ZoneId,
      time: "Afternoon" as TimeWindow,
      group: "People with disabilities" as AffectedGroup
    },
    {
      label: "Late-Night Food Desert",
      text: "All affordable food spots near the research sector close before 8 PM, leaving late-shift staff without dinner options.",
      cat: "Food" as CategoryType,
      zone: "market-district" as ZoneId,
      time: "Night" as TimeWindow,
      group: "Workers" as AffectedGroup
    }
  ];

  const handleApplyPreset = (preset: typeof samplePresets[0]) => {
    setModality('text');
    setRawText(preset.text);
    setTextError('');
    setSelectedCategory(preset.cat);
    setSelectedZone(preset.zone);
    setTimeWindow(preset.time);
    setAffectedGroup(preset.group);
  };

  // -------------------------------------------------------------
  // VOICE RECORDING LOGIC
  // -------------------------------------------------------------
  const startRecording = async () => {
    setMicError('');
    audioChunksRef.current = [];
    setAudioBlob(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setRecordingSeconds(0);

    try {
      // 1. Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // 2. Set up MediaRecorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob);
        setAudioUrl(url);

        // Stop all audio tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start(200);
      setIsRecording(true);

      // 3. Start timer
      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);

      // 4. Try browser Web Speech API transcription
      const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognitionAPI) {
        try {
          const recognition = new SpeechRecognitionAPI();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = 'en-US';

          recognition.onresult = (event: any) => {
            let transcriptText = '';
            for (let i = 0; i < event.results.length; i++) {
              transcriptText += event.results[i][0].transcript + ' ';
            }
            if (transcriptText.trim()) {
              setVoiceTranscription(transcriptText.trim());
            }
          };

          recognition.onerror = () => {
            // Non-critical fallback
          };

          recognition.start();
          speechRecognitionRef.current = recognition;
        } catch (speechErr) {
          console.warn('SpeechRecognition initialization error:', speechErr);
        }
      }

    } catch (err: any) {
      console.error('Microphone access error:', err);
      setMicError('Microphone access was denied or is unavailable. You can use Text Narrative or Photo instead.');
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch {}
    }
  };

  const togglePlayAudio = () => {
    if (!audioElementRef.current && audioUrl) {
      audioElementRef.current = new Audio(audioUrl);
      audioElementRef.current.onended = () => setIsPlayingAudio(false);
    }

    if (audioElementRef.current) {
      if (isPlayingAudio) {
        audioElementRef.current.pause();
        setIsPlayingAudio(false);
      } else {
        audioElementRef.current.play();
        setIsPlayingAudio(true);
      }
    }
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleDemoTranscription = () => {
    setVoiceTranscription("The streetlights near my hostel have been completely inoperative for 3 weeks, creating an unsafe pedestrian hazard after 8 PM.");
  };

  // -------------------------------------------------------------
  // PHOTO UPLOAD LOGIC
  // -------------------------------------------------------------
  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processPhotoFile(file);
    }
  };

  const processPhotoFile = (file: File) => {
    setPhotoFile(file);
    const url = URL.createObjectURL(file);
    setPhotoPreviewUrl(url);
    setIsPhotoScanning(true);
    setPhotoScanComplete(false);

    // Simulate 5-step visual privacy scanning sequence
    setTimeout(() => {
      setIsPhotoScanning(false);
      setPhotoScanComplete(true);
    }, 1800);
  };

  const handleRemovePhoto = () => {
    if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl);
    setPhotoFile(null);
    setPhotoPreviewUrl(null);
    setPhotoScanComplete(false);
    setPhotoCaption('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // -------------------------------------------------------------
  // STEP 1 VALIDATION & ADVANCEMENT
  // -------------------------------------------------------------
  const handleStep1Continue = () => {
    setTextError('');

    if (modality === 'text') {
      if (!rawText.trim()) {
        setTextError('Please describe what happened before continuing.');
        return;
      }
    } else if (modality === 'voice') {
      if (!audioBlob) {
        setTextError('Please record your voice or switch to Text Narrative.');
        return;
      }
      // Ensure effective text exists for AI analysis
      if (!rawText.trim()) {
        const textToUse = voiceTranscription.trim() || `Voice recording captured (${formatTimer(recordingSeconds)}) regarding local community issue.`;
        setRawText(textToUse);
      }
    } else if (modality === 'photo') {
      if (!photoFile) {
        setTextError('Please choose a photo before continuing.');
        return;
      }
      if (!rawText.trim()) {
        const textToUse = photoCaption.trim() || `Photo evidence submitted for physical infrastructure issue: ${photoFile.name}`;
        setRawText(textToUse);
      }
    }

    setActiveStep(2);
    setMaxCompletedStep(prev => Math.max(prev, 2));
  };

  // -------------------------------------------------------------
  // STEP 2 TO STEP 3
  // -------------------------------------------------------------
  const handleStep2Continue = () => {
    const textToSanitize = modality === 'voice' && voiceTranscription.trim()
      ? voiceTranscription
      : modality === 'photo' && photoCaption.trim()
      ? photoCaption
      : rawText;

    const sanitized = sanitizeExperienceInput(textToSanitize, selectedZone);
    setSanitizedResult(sanitized);
    setActiveStep(3);
    setMaxCompletedStep(prev => Math.max(prev, 3));
  };

  // -------------------------------------------------------------
  // STEP 3 TO STEP 4 (AI ANALYSIS)
  // -------------------------------------------------------------
  const handleStep3Analyze = async () => {
    setActiveStep(4);
    setIsAiProcessing(true);

    const activeText = sanitizedResult?.sanitizedText || rawText;

    const extracted = await analyzeExperienceWithAi(
      activeText,
      sanitizedResult?.generalizedZone || 'Aggregated Sector',
      selectedCategory,
      timeWindow,
      affectedGroup
    );

    setAiResult(extracted);
    setIsAiProcessing(false);
    setMaxCompletedStep(prev => Math.max(prev, 4));

    // Generate unique Anonymous ID e.g. UNH-7K42-XP91
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const anonymousId = `UNH-${randomHex}-${randomSuffix}`;

    const timeline: ProblemTimelineEvent[] = [
      {
        timestamp: 'Today, 08:30 AM',
        stage: 'REPORTED',
        title: 'Experience Ingested',
        description: `Received via ${modality.toUpperCase()} input through client zero-PII sanitization.`
      },
      {
        timestamp: 'Today, 08:31 AM',
        stage: 'ANALYZED',
        title: 'Intent & Entity Extraction',
        description: `Extracted topic: ${extracted.topic}, localized to ${extracted.generalLocation}.`
      },
      {
        timestamp: 'Today, 09:10 AM',
        stage: 'PATTERN DETECTED',
        title: 'Vector Clustering Confirmed',
        description: 'Joined active regional problem cluster with high confidence.'
      },
      {
        timestamp: 'Today, 10:25 AM',
        stage: 'SIGNAL ROUTED',
        title: 'Executive Brief Dispatched',
        description: 'Dispatched to Municipal Infrastructure Team for verification.'
      }
    ];

    const newExp: Experience = {
      id: `EXP-${Date.now().toString().slice(-4)}`,
      anonymousTrackingId: anonymousId,
      rawText: rawText,
      sanitizedText: activeText,
      category: extracted.category,
      zoneId: selectedZone,
      zoneName: zones.find(z => z.id === selectedZone)?.name || 'Aggregated Zone',
      timeWindow: timeWindow,
      affectedGroup: affectedGroup,
      frequency: frequency,
      impactLevel: impactLevel,
      submittedAt: 'Just now',
      isAnonymous: isAnonymous,
      modality: modality,
      extractedInfo: {
        topic: extracted.topic,
        problem: extracted.problem,
        generalLocation: extracted.generalLocation,
        time: extracted.time,
        affectedGroup: extracted.affectedGroup,
        impact: extracted.impact,
        sentiment: extracted.sentiment,
        keywords: extracted.keywords,
      },
      clusterId: extracted.matchedPatternId,
      piiRedactedCount: sanitizedResult?.redactionsFound?.length || 0,
      routingStatus: 'SIGNAL ROUTED',
      currentStage: 'SIGNAL ROUTED',
      timelineEvents: timeline,
      assignedStakeholder: 'Municipal Infrastructure Team',
      aiSuggestedAction: extracted.problem 
        ? `Inspect infrastructure related to ${extracted.problem.toLowerCase()} within the affected zone.`
        : 'Inspect non-functional lighting and transit links in the affected sector.'
    };

    setCreatedExperience(newExp);
    addNewExperience(newExp);
  };

  const handleStep4FindPattern = () => {
    setActiveStep(5);
    setMaxCompletedStep(prev => Math.max(prev, 5));
  };

  const handleStep5ViewSignal = () => {
    setActiveStep(6);
    setMaxCompletedStep(prev => Math.max(prev, 6));
  };

  const handleCopyId = () => {
    if (createdExperience?.anonymousTrackingId) {
      navigator.clipboard.writeText(createdExperience.anonymousTrackingId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2500);
    }
  };

  const targetZone = zones.find(z => z.id === selectedZone) || zones[0];
  const matchedPattern = patterns.find(p => p.id === aiResult?.matchedPatternId) || patterns[0];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Page Header */}
      <div className="space-y-2 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#DBEAFE] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-mono font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>SAFE EXPERIENCE REPORTING</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-black text-[#0F172A] tracking-tight">
          REPORT A PROBLEM
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B] font-sans">
          One voice can be ignored. A pattern cannot. Your report helps reveal systemic community friction safely.
        </p>
      </div>

      {/* Main Multi-Step Form Card in Pure White */}
      <div className="bg-white border border-[#D9E2F0] rounded-3xl shadow-xl overflow-hidden">
        
        {/* Step Progress Stepper Bar */}
        <div className="px-6 py-4 border-b border-[#D9E2F0] bg-[#F8FAFC] overflow-x-auto">
          <div className="flex items-center justify-between min-w-[580px] text-xs font-mono">
            {[
              { num: 1, label: '01 EXPERIENCE' },
              { num: 2, label: '02 CONTEXT' },
              { num: 3, label: '03 PRIVACY' },
              { num: 4, label: '04 AI ANALYSIS' },
              { num: 5, label: '05 PATTERN' },
              { num: 6, label: '06 NEXT STEP' }
            ].map((st, idx) => {
              const isCurrent = activeStep === st.num;
              const isDone = activeStep > st.num;
              const isUnlocked = maxCompletedStep >= st.num;

              return (
                <React.Fragment key={st.num}>
                  <button
                    disabled={!isUnlocked}
                    onClick={() => setActiveStep(st.num)}
                    className={`flex items-center space-x-1.5 transition-all ${
                      isCurrent
                        ? 'text-[#2563EB] font-bold scale-105'
                        : isDone
                        ? 'text-[#1D4ED8]'
                        : isUnlocked
                        ? 'text-[#64748B] hover:text-[#0F172A]'
                        : 'text-[#94A3B8] cursor-not-allowed'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] border ${
                      isCurrent
                        ? 'bg-[#2563EB] border-[#2563EB] text-white font-bold'
                        : isDone
                        ? 'bg-[#DBEAFE] border-[#BFDBFE] text-[#1D4ED8] font-bold'
                        : 'bg-white border-[#D9E2F0] text-[#94A3B8]'
                    }`}>
                      {isDone ? '✓' : st.num}
                    </span>
                    <span>{st.label}</span>
                  </button>
                  {idx < 5 && (
                    <div className={`flex-1 h-[1px] mx-2 ${
                      activeStep > idx + 1 ? 'bg-[#2563EB]' : 'bg-[#D9E2F0]'
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Step Body */}
        <div className="p-6 sm:p-10">
          
          {/* ============================================================ */}
          {/* STEP 01 — EXPERIENCE                                          */}
          {/* ============================================================ */}
          {activeStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="space-y-1">
                <h2 className="text-2xl font-display font-extrabold text-[#0F172A]">
                  WHAT HAPPENED?
                </h2>
                <p className="text-xs text-[#64748B] font-sans">
                  Choose how you'd like to share your experience: type a narrative, record your voice, or upload a photo.
                </p>
              </div>

              {/* Quick Presets Strip */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-[#64748B] uppercase font-bold">
                  Quick Examples (Click to populate):
                </span>
                <div className="flex flex-wrap gap-2">
                  {samplePresets.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleApplyPreset(p)}
                      className="px-3 py-1.5 rounded-xl bg-[#EEF3FA] hover:bg-[#DBEAFE] border border-[#D9E2F0] text-xs font-mono text-[#0F172A] hover:text-[#2563EB] transition-all font-medium"
                    >
                      + {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3 Real Modality Buttons */}
              <div className="flex items-center space-x-2 border-b border-[#D9E2F0] pb-3">
                <button
                  type="button"
                  onClick={() => {
                    setModality('text');
                    setTextError('');
                  }}
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-mono transition-all font-bold ${
                    modality === 'text'
                      ? 'bg-[#2563EB] text-white shadow-md'
                      : 'bg-[#EEF3FA] text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  <Type className="w-4 h-4" />
                  <span>Text Narrative</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setModality('voice');
                    setTextError('');
                  }}
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-mono transition-all font-bold ${
                    modality === 'voice'
                      ? 'bg-[#2563EB] text-white shadow-md'
                      : 'bg-[#EEF3FA] text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  <Mic className="w-4 h-4" />
                  <span>Voice Input {audioBlob && '✓'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setModality('photo');
                    setTextError('');
                  }}
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-mono transition-all font-bold ${
                    modality === 'photo'
                      ? 'bg-[#2563EB] text-white shadow-md'
                      : 'bg-[#EEF3FA] text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Photo (Auto-Scrubbed) {photoFile && '✓'}</span>
                </button>
              </div>

              {/* Error Message if empty */}
              {textError && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-mono text-[#EF4444] flex items-center gap-2 animate-fadeIn">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{textError}</span>
                </div>
              )}

              {/* ============================================================ */}
              {/* 1. TEXT NARRATIVE MODE (Editable Textarea)                    */}
              {/* ============================================================ */}
              {modality === 'text' && (
                <div className="space-y-3 animate-fadeIn">
                  <textarea
                    rows={5}
                    value={rawText}
                    onChange={(e) => {
                      setRawText(e.target.value);
                      if (textError) setTextError('');
                    }}
                    placeholder="Describe what happened... (e.g., Streetlights near my hostel haven't worked for weeks, or the morning bus is overcrowded...)"
                    className="w-full p-4 rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0] text-sm text-[#0F172A] placeholder-[#94A3B8] font-sans focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all resize-none shadow-inner"
                  />
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B]">
                    <span>{rawText.length} characters entered</span>
                    <span>Zero personal info will be sent</span>
                  </div>
                </div>
              )}

              {/* ============================================================ */}
              {/* 2. VOICE INPUT MODE (Actual Microphone Recording)            */}
              {/* ============================================================ */}
              {modality === 'voice' && (
                <div className="p-6 sm:p-8 rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0] space-y-6 animate-fadeIn font-mono">
                  
                  {micError && (
                    <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{micError}</span>
                    </div>
                  )}

                  {!isRecording && !audioBlob && (
                    <div className="text-center py-6 space-y-4">
                      <div className="w-16 h-16 rounded-3xl bg-[#DBEAFE] border border-[#BFDBFE] text-[#2563EB] mx-auto flex items-center justify-center shadow-sm">
                        <Mic className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base font-bold text-[#0F172A]">VOICE INPUT</h3>
                        <p className="text-xs text-[#64748B] font-sans">
                          Speak naturally into your microphone to capture your experience.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={startRecording}
                        className="px-8 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs tracking-wider shadow-[0_4px_14px_rgba(37,99,235,0.35)] inline-flex items-center space-x-2 transition-all"
                      >
                        <Mic className="w-4 h-4" />
                        <span>START RECORDING</span>
                      </button>

                      <div className="text-[10px] text-[#94A3B8]">
                        * Microphone access is requested only when you click Start Recording.
                      </div>
                    </div>
                  )}

                  {/* Recording Active State */}
                  {isRecording && (
                    <div className="text-center py-6 space-y-4">
                      <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold animate-pulse">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                        <span>RECORDING AUDIO LIVE...</span>
                      </div>

                      <div className="text-4xl font-black text-[#0F172A] font-display">
                        {formatTimer(recordingSeconds)}
                      </div>

                      {/* Animated Live Audio Waveform Bars */}
                      <div className="flex items-center justify-center space-x-1.5 h-10">
                        <div className="w-1.5 bg-[#2563EB] rounded-full h-4 animate-bounce" />
                        <div className="w-1.5 bg-[#1D4ED8] rounded-full h-8 animate-bounce delay-100" />
                        <div className="w-1.5 bg-[#60A5FA] rounded-full h-10 animate-bounce delay-200" />
                        <div className="w-1.5 bg-[#2563EB] rounded-full h-6 animate-bounce delay-150" />
                        <div className="w-1.5 bg-[#1D4ED8] rounded-full h-9 animate-bounce delay-75" />
                        <div className="w-1.5 bg-[#60A5FA] rounded-full h-5 animate-bounce delay-300" />
                      </div>

                      <button
                        type="button"
                        onClick={stopRecording}
                        className="px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-wider shadow-md inline-flex items-center space-x-2 transition-all"
                      >
                        <span>■ STOP RECORDING</span>
                      </button>
                    </div>
                  )}

                  {/* Recording Completed State */}
                  {!isRecording && audioBlob && (
                    <div className="space-y-5 animate-fadeIn">
                      
                      <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>✓ VOICE CAPTURED ({formatTimer(recordingSeconds)})</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={togglePlayAudio}
                            className="px-3 py-1 rounded-lg bg-white border border-emerald-300 text-emerald-800 text-[11px] font-bold flex items-center gap-1 shadow-xs hover:bg-emerald-100"
                          >
                            {isPlayingAudio ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                            <span>{isPlayingAudio ? 'PAUSE' : 'PLAY RECORDING'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={startRecording}
                            className="px-3 py-1 rounded-lg bg-white border border-[#D9E2F0] text-[#64748B] hover:text-[#0F172A] text-[11px] flex items-center gap-1 shadow-xs"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>RECORD AGAIN</span>
                          </button>
                        </div>
                      </div>

                      {/* Transcription Area */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] text-[#64748B]">
                          <span className="font-bold uppercase flex items-center gap-1 text-[#0F172A]">
                            <Volume2 className="w-3.5 h-3.5 text-[#2563EB]" />
                            <span>VOICE TRANSCRIPTION (EDITABLE):</span>
                          </span>
                          {!voiceTranscription && (
                            <button
                              type="button"
                              onClick={handleDemoTranscription}
                              className="text-[#2563EB] hover:underline"
                            >
                              + Fill Demo Transcription
                            </button>
                          )}
                        </div>

                        <textarea
                          rows={3}
                          value={voiceTranscription}
                          onChange={(e) => {
                            setVoiceTranscription(e.target.value);
                            setRawText(e.target.value);
                          }}
                          placeholder="Recognized speech appears here. You can review and edit it freely..."
                          className="w-full p-3.5 rounded-xl bg-white border border-[#D9E2F0] text-xs font-sans text-[#0F172A] focus:outline-none focus:border-[#2563EB] shadow-xs resize-none"
                        />
                        <div className="text-[10px] text-[#94A3B8] italic">
                          {speechRecognitionSupported 
                            ? "* Captured via browser speech recognition. You can adjust the text before submitting."
                            : "* Browser speech recognition unavailable. You can type notes above or submit the voice audio directly."}
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              )}

              {/* ============================================================ */}
              {/* 3. PHOTO INPUT MODE (Actual File Picker + Live Preview)      */}
              {/* ============================================================ */}
              {modality === 'photo' && (
                <div className="p-6 sm:p-8 rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0] space-y-6 animate-fadeIn font-mono text-xs">
                  
                  {/* Hidden real file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    onChange={handlePhotoSelect}
                    className="hidden"
                  />

                  {!photoFile && (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-[#BFDBFE] hover:border-[#2563EB] rounded-2xl p-8 text-center cursor-pointer bg-white transition-all space-y-3 group shadow-xs"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-[#DBEAFE] border border-[#BFDBFE] text-[#2563EB] mx-auto flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-bold text-[#0F172A]">PHOTO REPORTING</div>
                        <p className="text-xs text-[#64748B] font-sans">
                          Click to select a photo from your device (.jpg, .png, .webp).
                        </p>
                      </div>
                      <button
                        type="button"
                        className="px-6 py-2.5 rounded-xl bg-[#2563EB] text-white font-bold text-xs shadow-xs"
                      >
                        + CHOOSE PHOTO
                      </button>
                    </div>
                  )}

                  {/* Photo Selected State */}
                  {photoFile && photoPreviewUrl && (
                    <div className="space-y-5 animate-fadeIn">
                      
                      {/* Image Preview Card */}
                      <div className="relative rounded-2xl bg-white border border-[#D9E2F0] p-4 shadow-sm space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-[#D9E2F0]">
                          <div className="flex items-center space-x-2 text-emerald-800 font-bold">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>✓ PHOTO CAPTURED: {photoFile.name} ({(photoFile.size / 1024).toFixed(1)} KB)</span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="px-3 py-1 rounded-lg bg-[#EEF3FA] text-[#0F172A] hover:bg-[#DBEAFE] text-[11px] font-bold"
                            >
                              CHANGE PHOTO
                            </button>
                            <button
                              type="button"
                              onClick={handleRemovePhoto}
                              className="p-1 rounded-lg text-red-500 hover:bg-red-50"
                              title="Remove Photo"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Actual Rendered Image */}
                        <div className="relative max-h-64 rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center">
                          <img
                            src={photoPreviewUrl}
                            alt="Uploaded evidence"
                            className="max-h-64 object-contain rounded-lg"
                          />
                        </div>

                        {/* Privacy Scanning Sequence Feedback */}
                        <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] space-y-2">
                          <div className="flex items-center justify-between text-[11px] text-[#64748B]">
                            <span className="font-bold uppercase flex items-center gap-1.5 text-[#2563EB]">
                              <ShieldCheck className="w-4 h-4" />
                              <span>PRIVACY PROCESSING • DEMO</span>
                            </span>
                            <span className="font-bold text-emerald-700">
                              {photoScanComplete ? '✓ SCAN COMPLETE' : 'SCANNING METADATA...'}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-[#64748B]">
                            <div className="p-2 bg-white rounded-lg border border-[#D9E2F0] flex items-center gap-1">
                              <Check className="w-3 h-3 text-[#2563EB]" />
                              <span>EXIF Stripped</span>
                            </div>
                            <div className="p-2 bg-white rounded-lg border border-[#D9E2F0] flex items-center gap-1">
                              <Check className="w-3 h-3 text-[#2563EB]" />
                              <span>Faces Blurred</span>
                            </div>
                            <div className="p-2 bg-white rounded-lg border border-[#D9E2F0] flex items-center gap-1">
                              <Check className="w-3 h-3 text-[#2563EB]" />
                              <span>Plates Redacted</span>
                            </div>
                            <div className="p-2 bg-white rounded-lg border border-[#D9E2F0] flex items-center gap-1">
                              <Check className="w-3 h-3 text-[#2563EB]" />
                              <span>Zero-GPS Stored</span>
                            </div>
                          </div>
                        </div>

                        {/* Photo Caption Notes */}
                        <div className="space-y-1 pt-1">
                          <label className="block text-[#0F172A] font-bold uppercase text-[11px]">
                            PHOTO CONTEXT NOTE:
                          </label>
                          <input
                            type="text"
                            value={photoCaption}
                            onChange={(e) => {
                              setPhotoCaption(e.target.value);
                              setRawText(e.target.value);
                            }}
                            placeholder="Add brief details about the photo (e.g. Inoperative sodium streetlight near hostel turn)..."
                            className="w-full p-2.5 rounded-xl bg-white border border-[#D9E2F0] text-xs font-sans text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                          />
                        </div>

                      </div>

                    </div>
                  )}

                </div>
              )}

              {/* Continue Action Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleStep1Continue}
                  className="px-8 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono text-xs font-bold tracking-wider shadow-[0_4px_14px_rgba(37,99,235,0.35)] flex items-center space-x-2 transition-all"
                >
                  <span>CONTINUE →</span>
                </button>
              </div>

            </div>
          )}

          {/* ============================================================ */}
          {/* STEP 02 — CONTEXT                                             */}
          {/* ============================================================ */}
          {activeStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-1">
                <h2 className="text-2xl font-display font-extrabold text-[#0F172A]">
                  HELP US UNDERSTAND THE SITUATION
                </h2>
                <p className="text-xs text-[#64748B] font-sans">
                  We need environmental context, not your personal identity.
                </p>
              </div>

              {/* Summary of what was captured in Step 1 */}
              <div className="p-3.5 rounded-2xl bg-[#EEF3FA] border border-[#D9E2F0] font-mono text-xs text-[#64748B]">
                <span className="text-[#2563EB] font-bold uppercase mr-2">INPUT MODE: {modality.toUpperCase()}</span>
                <span className="text-[#0F172A] line-clamp-1 italic">
                  “{modality === 'voice' && voiceTranscription ? voiceTranscription : modality === 'photo' && photoCaption ? photoCaption : rawText}”
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                
                {/* Area */}
                <div className="space-y-1.5">
                  <label className="block text-[#0F172A] font-bold uppercase flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>General Area</span>
                  </label>
                  <select
                    value={selectedZone}
                    onChange={(e) => setSelectedZone(e.target.value as ZoneId)}
                    className="w-full p-3 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                  >
                    {zones.map(z => (
                      <option key={z.id} value={z.id}>{z.name} ({z.code})</option>
                    ))}
                  </select>
                </div>

                {/* Time */}
                <div className="space-y-1.5">
                  <label className="block text-[#0F172A] font-bold uppercase flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#1D4ED8]" />
                    <span>Approximate Time</span>
                  </label>
                  <select
                    value={timeWindow}
                    onChange={(e) => setTimeWindow(e.target.value as TimeWindow)}
                    className="w-full p-3 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                  >
                    <option value="Night">Night (20:00 - 06:00)</option>
                    <option value="Morning">Morning (06:00 - 12:00)</option>
                    <option value="Afternoon">Afternoon (12:00 - 17:00)</option>
                    <option value="Evening">Evening (17:00 - 20:00)</option>
                    <option value="Anytime">Anytime</option>
                  </select>
                </div>

                {/* Who is affected */}
                <div className="space-y-1.5">
                  <label className="block text-[#0F172A] font-bold uppercase flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Who is affected?</span>
                  </label>
                  <select
                    value={affectedGroup}
                    onChange={(e) => setAffectedGroup(e.target.value as AffectedGroup)}
                    className="w-full p-3 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                  >
                    <option value="Students">Students</option>
                    <option value="Workers">Workers / Shift Staff</option>
                    <option value="Residents">Local Residents</option>
                    <option value="Elderly">Elderly</option>
                    <option value="People with disabilities">People with disabilities</option>
                    <option value="General Public">General Public</option>
                  </select>
                </div>

                {/* Frequency & Impact */}
                <div className="space-y-1.5">
                  <label className="block text-[#0F172A] font-bold uppercase flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Frequency & Impact Level</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value as FrequencyType)}
                      className="w-full p-3 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                    >
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Occasional">Occasional</option>
                    </select>

                    <select
                      value={impactLevel}
                      onChange={(e) => setImpactLevel(e.target.value as ImpactLevel)}
                      className="w-full p-3 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                    >
                      <option value="High">High Impact</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Low">Low Impact</option>
                    </select>
                  </div>
                </div>

              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className="px-4 py-2.5 text-xs font-mono text-[#64748B] hover:text-[#0F172A] flex items-center gap-1 font-semibold"
                >
                  <ArrowLeft className="w-4 h-4" /> BACK
                </button>

                <button
                  type="button"
                  onClick={handleStep2Continue}
                  className="px-8 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono text-xs font-bold tracking-wider shadow-[0_4px_14px_rgba(37,99,235,0.35)] flex items-center space-x-2 transition-all"
                >
                  <span>CONTINUE →</span>
                </button>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* STEP 03 — PRIVACY                                             */}
          {/* ============================================================ */}
          {activeStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-1">
                <h2 className="text-2xl font-display font-extrabold text-[#0F172A]">
                  YOUR IDENTITY IS PROTECTED.
                </h2>
                <p className="text-xs text-[#64748B] font-sans">
                  {modality === 'text' && "Scanning submitted text narrative for personal information."}
                  {modality === 'voice' && "Processing recorded and transcribed voice input with zero PII retention."}
                  {modality === 'photo' && "Processing uploaded photo metadata with zero EXIF or GPS coordinates stored."}
                </p>
              </div>

              {/* 5-Stage Privacy Sequence */}
              <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0] space-y-3 font-mono text-xs shadow-sm">
                {[
                  { title: "DETECTING PERSONAL INFORMATION", desc: "Scanned client-side for names, phone numbers, room IDs" },
                  { title: "REMOVING IDENTIFYING DETAILS", desc: `${sanitizedResult?.redactionsFound?.length || 0} sensitive tokens scrubbed` },
                  { title: "GENERALIZING LOCATION", desc: `Aggregated to ${sanitizedResult?.generalizedZone || 'Sector Grid'}` },
                  { title: "PROTECTING IDENTITY", desc: "Zero IP logging, zero cookies, zero device fingerprinting" },
                  { title: "PRIVACY PROCESSING COMPLETE", desc: "Clean qualitative signal ready for AI clustering" }
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#D9E2F0] shadow-xs">
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                      <div>
                        <div className="text-[#0F172A] font-bold text-xs">{step.title}</div>
                        <div className="text-[#64748B] text-[11px] font-sans">{step.desc}</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#2563EB]">✓</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="px-4 py-2.5 text-xs font-mono text-[#64748B] hover:text-[#0F172A] flex items-center gap-1 font-semibold"
                >
                  <ArrowLeft className="w-4 h-4" /> BACK
                </button>

                <button
                  type="button"
                  onClick={handleStep3Analyze}
                  className="px-8 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono text-xs font-bold tracking-wider shadow-[0_4px_14px_rgba(37,99,235,0.35)] flex items-center space-x-2 transition-all"
                >
                  <span>ANALYZE EXPERIENCE →</span>
                </button>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* STEP 04 — AI ANALYSIS                                         */}
          {/* ============================================================ */}
          {activeStep === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-1">
                <h2 className="text-2xl font-display font-extrabold text-[#0F172A]">
                  UNDERSTANDING YOUR EXPERIENCE...
                </h2>
                <p className="text-xs text-[#64748B] font-sans">
                  The local intelligence engine normalizes semantic intent and maps problem consequences.
                </p>
              </div>

              {isAiProcessing ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#DBEAFE] border border-[#2563EB] mx-auto flex items-center justify-center animate-spin-slow shadow-md">
                    <Sparkles className="w-7 h-7 text-[#2563EB]" />
                  </div>
                  <div className="text-xs font-mono text-[#64748B] font-bold uppercase tracking-wider">
                    UNDERSTAND → NORMALIZE → CLUSTER → CONNECT → DETECT
                  </div>
                </div>
              ) : aiResult && (
                <div className="space-y-5 animate-fadeIn">
                  
                  <div className="p-3.5 rounded-xl bg-[#DBEAFE]/50 border border-[#BFDBFE] text-xs font-mono text-[#1D4ED8] font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                    <span>EXPERIENCE UNDERSTOOD — EXTRACTED SOCIAL SIGNALS (AI ANALYSIS • DEMO)</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 p-5 rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0] font-mono text-xs shadow-sm">
                    <div className="p-3 bg-white rounded-xl border border-[#D9E2F0]">
                      <span className="text-[#64748B] text-[10px] block">CATEGORY:</span>
                      <span className="text-[#0F172A] font-bold">{aiResult.category}</span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-[#D9E2F0]">
                      <span className="text-[#64748B] text-[10px] block">LOCATION ZONE:</span>
                      <span className="text-[#2563EB] font-bold">{targetZone.name}</span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-[#D9E2F0]">
                      <span className="text-[#64748B] text-[10px] block">TIME WINDOW:</span>
                      <span className="text-[#0F172A] font-semibold">{timeWindow}</span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-[#D9E2F0]">
                      <span className="text-[#64748B] text-[10px] block">AFFECTED GROUP:</span>
                      <span className="text-[#0F172A] font-semibold">{affectedGroup}</span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-[#D9E2F0] col-span-2">
                      <span className="text-[#64748B] text-[10px] block">PROBLEM SYNTHESIS:</span>
                      <span className="text-[#0F172A] font-bold">{aiResult.problem}</span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-[#D9E2F0] col-span-2">
                      <span className="text-[#64748B] text-[10px] block">IMPACT VECTOR:</span>
                      <span className="text-[#1D4ED8] font-bold">{aiResult.impact}</span>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={handleStep4FindPattern}
                      className="px-8 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono text-xs font-bold tracking-wider shadow-[0_4px_14px_rgba(37,99,235,0.35)] flex items-center space-x-2 transition-all"
                    >
                      <span>FIND PATTERN →</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ============================================================ */}
          {/* STEP 05 — PATTERN DETECTED                                    */}
          {/* ============================================================ */}
          {activeStep === 5 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-1">
                <h2 className="text-2xl font-display font-extrabold text-[#0F172A]">
                  YOUR EXPERIENCE JOINED A PATTERN.
                </h2>
                <p className="text-xs text-[#64748B] font-sans">
                  Connected with multiple independent qualitative experiences in this sector.
                </p>
              </div>

              {/* Problem Connection Callout */}
              <div className="p-4 rounded-2xl bg-[#DBEAFE]/40 border border-[#BFDBFE] text-center font-mono text-xs space-y-1">
                <div className="text-[#1D4ED8] font-bold flex items-center justify-center gap-2">
                  <span>YOUR EXPERIENCE</span>
                  <span>+</span>
                  <span className="text-[#2563EB] font-black">{matchedPattern.relatedExperienceCount} RELATED EXPERIENCES</span>
                  <span>=</span>
                  <span className="px-2 py-0.5 rounded bg-[#2563EB] text-white">PATTERN DETECTED</span>
                </div>
              </div>

              {/* Pattern Dossier Card */}
              <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#2563EB] shadow-md space-y-4 font-mono">
                <div className="flex justify-between items-center pb-3 border-b border-[#D9E2F0] text-xs">
                  <span className="text-[#2563EB] font-bold flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                    IDENTIFIED SOCIAL PATTERN
                  </span>
                  <span className="text-[#64748B] font-semibold">
                    CONFIDENCE: {matchedPattern.modelConfidence}% (AI ESTIMATE • DEMO)
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold font-display text-[#0F172A]">
                    {matchedPattern.title}
                  </h3>
                  <p className="text-xs text-[#64748B] mt-1 font-sans">
                    {matchedPattern.summary}
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-3 bg-white border border-[#D9E2F0] rounded-xl shadow-xs">
                    <div className="text-lg font-bold text-[#0F172A]">{matchedPattern.relatedExperienceCount}</div>
                    <div className="text-[9px] text-[#64748B]">RELATED VOICES</div>
                  </div>
                  <div className="p-3 bg-white border border-[#D9E2F0] rounded-xl shadow-xs">
                    <div className="text-lg font-bold text-[#2563EB]">{matchedPattern.aggregatedAreaCount}</div>
                    <div className="text-[9px] text-[#64748B]">AFFECTED ZONES</div>
                  </div>
                  <div className="p-3 bg-white border border-[#D9E2F0] rounded-xl shadow-xs">
                    <div className="text-lg font-bold text-[#1D4ED8]">+{matchedPattern.growthRate}%</div>
                    <div className="text-[9px] text-[#64748B]">SIGNAL GROWTH</div>
                  </div>
                  <div className="p-3 bg-white border border-[#D9E2F0] rounded-xl shadow-xs">
                    <div className="text-lg font-bold text-[#2563EB]">{matchedPattern.silenceIndex}%</div>
                    <div className="text-[9px] text-[#64748B]">SILENCE INDEX</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleStep5ViewSignal}
                  className="px-8 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono text-xs font-bold tracking-wider shadow-[0_4px_14px_rgba(37,99,235,0.35)] flex items-center space-x-2 transition-all"
                >
                  <span>VIEW SOCIAL SIGNAL →</span>
                </button>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* STEP 06 — WHAT HAPPENS NEXT?                                  */}
          {/* ============================================================ */}
          {activeStep === 6 && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="space-y-1">
                <h2 className="text-2xl font-display font-extrabold text-[#0F172A]">
                  WHAT HAPPENS NEXT?
                </h2>
                <p className="text-xs text-[#64748B] font-sans">
                  Your experience has been structured and routed. Here is the full lifecycle progression.
                </p>
              </div>

              {/* Dynamic Zone Feedback Banner */}
              <div className="p-4 rounded-2xl bg-[#DBEAFE]/40 border border-[#BFDBFE] font-mono text-xs space-y-1.5">
                <div className="text-[#2563EB] font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>YOUR EXPERIENCE MADE A SIGNAL VISIBLE.</span>
                </div>
                <div className="text-[#0F172A] font-sans">
                  Zone 04 ({targetZone.name}) signal volume updated: <strong className="text-[#2563EB]">{targetZone.activeSignalsCount - 1} → {targetZone.activeSignalsCount} experiences</strong>.
                </div>
                <div className="text-[11px] text-[#1D4ED8] font-bold">
                  SIGNAL LEVEL: MODERATE → HIGH
                </div>
              </div>

              {/* 7-Stage Lifecycle Bar */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-[#64748B] uppercase font-bold">
                  LIFECYCLE TRACKING PROGRESS:
                </span>
                <div className="grid grid-cols-7 gap-1 text-center font-mono text-[9px]">
                  {[
                    { label: 'REPORTED', done: true },
                    { label: 'ANALYZED', done: true },
                    { label: 'PATTERN', done: true },
                    { label: 'ROUTED', done: true },
                    { label: 'REVIEW', done: false },
                    { label: 'ACTION', done: false },
                    { label: 'RESOLVED', done: false },
                  ].map((l, i) => (
                    <div key={i} className={`p-2 rounded-lg border ${
                      l.done 
                        ? 'bg-[#DBEAFE] border-[#BFDBFE] text-[#1D4ED8] font-bold' 
                        : 'bg-[#F8FAFC] border-[#D9E2F0] text-[#94A3B8]'
                    }`}>
                      <div>{l.done ? '✓' : '○'}</div>
                      <div className="mt-0.5">{l.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tracking ID & Stakeholder Box */}
              <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0] space-y-3 font-mono text-xs shadow-sm">
                <div className="flex items-center justify-between pb-2 border-b border-[#D9E2F0]">
                  <div>
                    <span className="text-[#64748B] text-[10px] block font-semibold">YOUR EXPERIENCE ID:</span>
                    <span className="text-[#2563EB] font-bold text-base tracking-wider">
                      {createdExperience?.anonymousTrackingId || 'UNH-7K42-XP91'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyId}
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#EEF3FA] border border-[#D9E2F0] text-[#0F172A] text-xs flex items-center gap-1.5 font-semibold shadow-xs"
                  >
                    {copiedId ? <Check className="w-3.5 h-3.5 text-[#2563EB]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId ? 'COPIED' : 'COPY ID'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-white rounded-xl border border-[#D9E2F0]">
                    <span className="text-[#64748B] text-[10px] block">CURRENT STATUS:</span>
                    <span className="text-[#1D4ED8] font-bold">SIGNAL ROUTED</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#D9E2F0]">
                    <span className="text-[#64748B] text-[10px] block">POTENTIAL RESPONSIBLE STAKEHOLDER:</span>
                    <span className="text-[#0F172A] font-bold">Municipal Infrastructure Team</span>
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-[#D9E2F0]">
                  <span className="text-[#2563EB] text-[10px] block font-bold">AI-SUGGESTED ACTION:</span>
                  <p className="text-xs text-[#0F172A] font-sans mt-0.5">
                    {createdExperience?.aiSuggestedAction || "Inspect non-functional lighting infrastructure within the affected zone and schedule immediate site repair."}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => navigate('/map')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-[#EEF3FA] border border-[#D9E2F0] text-[#0F172A] font-mono text-xs font-semibold"
                >
                  VIEW AFFECTED ZONE ON MAP →
                </button>

                <button
                  type="button"
                  onClick={() => navigate(`/tracking/${createdExperience?.anonymousTrackingId || 'UNH-7K42-XP91'}`)}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono text-xs font-bold tracking-wider shadow-[0_4px_14px_rgba(37,99,235,0.35)] flex items-center justify-center space-x-2"
                >
                  <span>TRACK THIS PROBLEM →</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
