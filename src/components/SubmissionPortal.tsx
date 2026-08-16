import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Mic, 
  Image as ImageIcon, 
  Type, 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Users, 
  Layers,
  ArrowRight,
  ArrowLeft,
  Activity,
  AlertCircle,
  Copy,
  Check,
  Radio,
  Play,
  Pause,
  RotateCcw,
  Upload,
  Trash2,
  AlertTriangle,
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

export const SubmissionPortal: React.FC = () => {
  const { 
    isSubmissionModalOpen, 
    setIsSubmissionModalOpen, 
    addNewExperience, 
    zones, 
    patterns 
  } = useIntelligence();

  // Wizard Active Step (1 to 6)
  const [activeStep, setActiveStep] = useState<number>(1);
  const [maxCompletedStep, setMaxCompletedStep] = useState<number>(1);

  // Modality Selection
  const [modality, setModality] = useState<'text' | 'voice' | 'photo'>('text');

  // Text State
  const [rawText, setRawText] = useState<string>('');
  const [textError, setTextError] = useState<string>('');

  // Voice State
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [voiceTranscription, setVoiceTranscription] = useState<string>('');
  const [micError, setMicError] = useState<string>('');

  // Photo State
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);
  const [photoCaption, setPhotoCaption] = useState<string>('');
  const [photoScanComplete, setPhotoScanComplete] = useState<boolean>(false);

  // Form State Step 2
  const [selectedZone, setSelectedZone] = useState<ZoneId>('hostel-sector');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('Safety');
  const [timeWindow, setTimeWindow] = useState<TimeWindow>('Night');
  const [affectedGroup, setAffectedGroup] = useState<AffectedGroup>('Students');
  const [frequency, setFrequency] = useState<FrequencyType>('Daily');
  const [impactLevel, setImpactLevel] = useState<ImpactLevel>('High');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);

  // Processing State
  const [isAiProcessing, setIsAiProcessing] = useState<boolean>(false);
  const [sanitizedResult, setSanitizedResult] = useState<any>(null);
  const [aiResult, setAiResult] = useState<any>(null);
  const [createdExperience, setCreatedExperience] = useState<Experience | null>(null);
  const [copiedId, setCopiedId] = useState<boolean>(false);

  // Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<any>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const speechRecognitionRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl);
    };
  }, []);

  const samplePresets = [
    {
      label: "Night Lighting Hazard",
      text: "I avoid using the road near my hostel after 7 PM because all streetlights haven't worked for 3 weeks.",
      cat: "Safety" as CategoryType,
      zone: "hostel-sector" as ZoneId,
      time: "Night" as TimeWindow,
      group: "Students" as AffectedGroup
    },
    {
      label: "Bus Route 554 Capacity",
      text: "Bus 554 is completely packed by 8 AM and conductor skips our stop, making us miss morning exams.",
      cat: "Transport" as CategoryType,
      zone: "transit-corridor" as ZoneId,
      time: "Morning" as TimeWindow,
      group: "Students" as AffectedGroup
    },
    {
      label: "Wheelchair Barrier",
      text: "The library overpass ramp is steeper than 20 degrees with no handrails, making it impossible for wheelchair users.",
      cat: "Accessibility" as CategoryType,
      zone: "campus-zone" as ZoneId,
      time: "Afternoon" as TimeWindow,
      group: "People with disabilities" as AffectedGroup
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

  // Voice recording
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
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
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
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start(200);
      setIsRecording(true);

      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);

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

          recognition.start();
          speechRecognitionRef.current = recognition;
        } catch {}
      }
    } catch (err) {
      setMicError('Microphone access was denied or is unavailable. You can use Text Narrative or Photo instead.');
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (speechRecognitionRef.current) {
      try { speechRecognitionRef.current.stop(); } catch {}
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

  // Photo
  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const url = URL.createObjectURL(file);
      setPhotoPreviewUrl(url);
      setPhotoScanComplete(false);
      setTimeout(() => setPhotoScanComplete(true), 1500);
    }
  };

  const handleRemovePhoto = () => {
    if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl);
    setPhotoFile(null);
    setPhotoPreviewUrl(null);
    setPhotoScanComplete(false);
    setPhotoCaption('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Step Transitions
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
      if (!rawText.trim()) {
        setRawText(voiceTranscription.trim() || `Voice recording captured (${formatTimer(recordingSeconds)})`);
      }
    } else if (modality === 'photo') {
      if (!photoFile) {
        setTextError('Please choose a photo before continuing.');
        return;
      }
      if (!rawText.trim()) {
        setRawText(photoCaption.trim() || `Photo evidence: ${photoFile.name}`);
      }
    }

    setActiveStep(2);
    setMaxCompletedStep(prev => Math.max(prev, 2));
  };

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

  const handleStep3ProtectAndAnalyze = async () => {
    setActiveStep(4);
    setIsAiProcessing(true);

    const activeText = sanitizedResult?.sanitizedText || rawText;

    const extracted = await analyzeExperienceWithAi(
      activeText,
      sanitizedResult?.generalizedZone || 'Aggregated Zone',
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
        description: `Submitted via ${modality.toUpperCase()} input through client zero-PII sanitization.`
      },
      {
        timestamp: 'Today, 08:31 AM',
        stage: 'ANALYZED',
        title: 'Semantic Normalization Complete',
        description: `Extracted topic: ${extracted.topic}, localized to ${extracted.generalLocation}.`
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
        description: 'Delivered to Municipal Infrastructure Team for verification.'
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
        : 'Inspect non-functional infrastructure in the affected zone.'
    };

    setCreatedExperience(newExp);
    addNewExperience(newExp);
  };

  const handleStep4ToPattern = () => {
    setActiveStep(5);
    setMaxCompletedStep(prev => Math.max(prev, 5));
  };

  const handleStep5ToAction = () => {
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

  const handleResetWizard = () => {
    setRawText('');
    setTextError('');
    setAudioBlob(null);
    setAudioUrl(null);
    setVoiceTranscription('');
    setPhotoFile(null);
    setPhotoPreviewUrl(null);
    setPhotoCaption('');
    setActiveStep(1);
    setMaxCompletedStep(1);
    setSanitizedResult(null);
    setAiResult(null);
    setCreatedExperience(null);
  };

  if (!isSubmissionModalOpen) return null;

  const targetZone = zones.find(z => z.id === selectedZone) || zones[0];
  const matchedPattern = patterns.find(p => p.id === aiResult?.matchedPatternId) || patterns[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      
      {/* Pure White Modal Card */}
      <div className="relative w-full max-w-3xl bg-white border border-[#D9E2F0] rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-[#D9E2F0] flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#DBEAFE] border border-[#BFDBFE] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-[#0F172A] uppercase tracking-wider">
                SAFE EXPERIENCE REPORTING WIZARD
              </div>
              <div className="text-[10px] font-mono text-[#64748B]">
                PRIVACY-FIRST SOCIAL PROBLEM INTELLIGENCE
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsSubmissionModalOpen(false)}
            className="p-1.5 rounded-lg bg-white hover:bg-[#EEF3FA] text-[#64748B] hover:text-[#0F172A] border border-[#D9E2F0] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 6-Step Horizontal Progress Bar */}
        <div className="px-6 py-3 border-b border-[#D9E2F0] bg-[#EEF3FA]/70 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[580px] text-[10.5px] font-mono">
            {[
              { num: 1, label: 'EXPERIENCE' },
              { num: 2, label: 'CONTEXT' },
              { num: 3, label: 'PRIVACY' },
              { num: 4, label: 'AI ANALYSIS' },
              { num: 5, label: 'PATTERN' },
              { num: 6, label: 'ACTION' }
            ].map((st, idx) => {
              const isDone = activeStep > st.num;
              const isCurrent = activeStep === st.num;
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

        {/* Dynamic Step Body in Pure White */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-white">
          
          {/* STEP 01 — EXPERIENCE */}
          {activeStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-1">
                <h2 className="text-2xl font-display font-extrabold text-[#0F172A]">
                  WHAT HAPPENED?
                </h2>
                <p className="text-xs text-[#64748B] font-sans">
                  Describe what happened: type a narrative, record your voice, or upload a photo.
                </p>
              </div>

              {/* Demo presets */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-mono text-[#64748B] uppercase font-semibold">
                  Quick Examples (Click to populate):
                </div>
                <div className="flex flex-wrap gap-2">
                  {samplePresets.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleApplyPreset(p)}
                      className="px-2.5 py-1 rounded-lg bg-[#EEF3FA] hover:bg-[#DBEAFE] border border-[#D9E2F0] text-[11px] font-mono text-[#0F172A] hover:text-[#2563EB] transition-all font-medium"
                    >
                      + {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Modality Pills */}
              <div className="flex items-center space-x-2 border-b border-[#D9E2F0] pb-3">
                <button
                  type="button"
                  onClick={() => {
                    setModality('text');
                    setTextError('');
                  }}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all font-bold ${
                    modality === 'text'
                      ? 'bg-[#2563EB] text-white shadow-sm'
                      : 'bg-[#EEF3FA] text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  <Type className="w-3.5 h-3.5" />
                  <span>Text Narrative</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setModality('voice');
                    setTextError('');
                  }}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all font-bold ${
                    modality === 'voice'
                      ? 'bg-[#2563EB] text-white shadow-sm'
                      : 'bg-[#EEF3FA] text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>Voice Input {audioBlob && '✓'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setModality('photo');
                    setTextError('');
                  }}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all font-bold ${
                    modality === 'photo'
                      ? 'bg-[#2563EB] text-white shadow-sm'
                      : 'bg-[#EEF3FA] text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Photo (Auto-Scrubbed) {photoFile && '✓'}</span>
                </button>
              </div>

              {textError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-mono text-[#EF4444] flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{textError}</span>
                </div>
              )}

              {/* Text Modality */}
              {modality === 'text' && (
                <div className="space-y-1.5 animate-fadeIn">
                  <textarea
                    rows={4}
                    value={rawText}
                    onChange={(e) => {
                      setRawText(e.target.value);
                      if (textError) setTextError('');
                    }}
                    placeholder="Describe what happened... (e.g. Streetlights near my hostel haven't worked for weeks...)"
                    className="w-full p-4 rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0] text-[#0F172A] placeholder-[#94A3B8] text-sm font-sans focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all resize-none shadow-inner"
                  />
                </div>
              )}

              {/* Voice Modality */}
              {modality === 'voice' && (
                <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0] space-y-4 font-mono text-xs animate-fadeIn">
                  {micError && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">
                      {micError}
                    </div>
                  )}

                  {!isRecording && !audioBlob && (
                    <div className="text-center py-4 space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#DBEAFE] text-[#2563EB] mx-auto flex items-center justify-center">
                        <Mic className="w-6 h-6" />
                      </div>
                      <div className="font-bold text-[#0F172A]">READY TO RECORD MICROPHONE</div>
                      <button
                        type="button"
                        onClick={startRecording}
                        className="px-6 py-2.5 rounded-xl bg-[#2563EB] text-white font-bold shadow-sm"
                      >
                        START RECORDING
                      </button>
                    </div>
                  )}

                  {isRecording && (
                    <div className="text-center py-4 space-y-3">
                      <div className="text-red-600 font-bold animate-pulse">● RECORDING AUDIO ({formatTimer(recordingSeconds)})</div>
                      <button
                        type="button"
                        onClick={stopRecording}
                        className="px-6 py-2.5 rounded-xl bg-red-600 text-white font-bold shadow-sm"
                      >
                        STOP RECORDING
                      </button>
                    </div>
                  )}

                  {!isRecording && audioBlob && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold">
                        <span>✓ VOICE CAPTURED ({formatTimer(recordingSeconds)})</span>
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={togglePlayAudio}
                            className="px-2.5 py-1 rounded bg-white border border-emerald-300 text-emerald-800 text-[11px]"
                          >
                            {isPlayingAudio ? 'PAUSE' : 'PLAY'}
                          </button>
                          <button
                            type="button"
                            onClick={startRecording}
                            className="px-2.5 py-1 rounded bg-white border border-[#D9E2F0] text-[#64748B] text-[11px]"
                          >
                            RE-RECORD
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-[#64748B] font-bold block">TRANSCRIPTION (EDITABLE):</label>
                        <textarea
                          rows={2}
                          value={voiceTranscription}
                          onChange={(e) => {
                            setVoiceTranscription(e.target.value);
                            setRawText(e.target.value);
                          }}
                          placeholder="Recognized speech text appears here..."
                          className="w-full p-2.5 rounded-xl bg-white border border-[#D9E2F0] text-xs font-sans"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Photo Modality */}
              {modality === 'photo' && (
                <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0] space-y-4 font-mono text-xs animate-fadeIn">
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
                      className="border-2 border-dashed border-[#BFDBFE] hover:border-[#2563EB] rounded-2xl p-6 text-center cursor-pointer bg-white space-y-2"
                    >
                      <Upload className="w-6 h-6 text-[#2563EB] mx-auto" />
                      <div className="font-bold text-[#0F172A]">PHOTO REPORTING</div>
                      <p className="text-[11px] text-[#64748B] font-sans">Click to choose a photo (.jpg, .png, .webp)</p>
                    </div>
                  )}

                  {photoFile && photoPreviewUrl && (
                    <div className="space-y-3 bg-white p-4 rounded-xl border border-[#D9E2F0]">
                      <div className="flex items-center justify-between text-emerald-800 font-bold">
                        <span>✓ {photoFile.name}</span>
                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          className="text-red-500 text-xs hover:underline"
                        >
                          REMOVE
                        </button>
                      </div>

                      <div className="max-h-48 overflow-hidden rounded-lg bg-slate-900 flex items-center justify-center">
                        <img src={photoPreviewUrl} alt="Upload" className="max-h-48 object-contain" />
                      </div>

                      <div className="p-2 bg-[#F8FAFC] rounded-lg border border-[#D9E2F0] text-[10px] text-emerald-700 font-bold">
                        ✓ PRIVACY SCAN COMPLETE • EXIF & GPS STRIPPED (DEMO)
                      </div>

                      <input
                        type="text"
                        value={photoCaption}
                        onChange={(e) => {
                          setPhotoCaption(e.target.value);
                          setRawText(e.target.value);
                        }}
                        placeholder="Add note about this photo..."
                        className="w-full p-2 rounded-lg border border-[#D9E2F0] text-xs font-sans"
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleStep1Continue}
                  className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono text-xs font-bold tracking-wider shadow-[0_4px_14px_rgba(37,99,235,0.35)] flex items-center space-x-2"
                >
                  <span>CONTINUE →</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 02 — CONTEXT */}
          {activeStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-1">
                <h2 className="text-2xl font-display font-extrabold text-[#0F172A]">
                  HELP US UNDERSTAND THE SITUATION
                </h2>
                <p className="text-xs text-[#64748B] font-sans">
                  We need context, not your identity.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                
                {/* General Area */}
                <div className="space-y-1.5">
                  <label className="block text-[#0F172A] font-bold uppercase flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#2563EB]" />
                    <span>General Area</span>
                  </label>
                  <select
                    value={selectedZone}
                    onChange={(e) => setSelectedZone(e.target.value as ZoneId)}
                    className="w-full p-2.5 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                  >
                    {zones.map(z => (
                      <option key={z.id} value={z.id}>{z.name} ({z.code})</option>
                    ))}
                  </select>
                </div>

                {/* Approximate Time */}
                <div className="space-y-1.5">
                  <label className="block text-[#0F172A] font-bold uppercase flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#1D4ED8]" />
                    <span>Time of Day</span>
                  </label>
                  <select
                    value={timeWindow}
                    onChange={(e) => setTimeWindow(e.target.value as TimeWindow)}
                    className="w-full p-2.5 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                  >
                    <option value="Night">Night (20:00 - 06:00)</option>
                    <option value="Morning">Morning (06:00 - 12:00)</option>
                    <option value="Afternoon">Afternoon (12:00 - 17:00)</option>
                    <option value="Evening">Evening (17:00 - 20:00)</option>
                    <option value="Anytime">Anytime</option>
                  </select>
                </div>

                {/* Who is Affected */}
                <div className="space-y-1.5">
                  <label className="block text-[#0F172A] font-bold uppercase flex items-center gap-1">
                    <Users className="w-3 h-3 text-[#2563EB]" />
                    <span>Who is affected?</span>
                  </label>
                  <select
                    value={affectedGroup}
                    onChange={(e) => setAffectedGroup(e.target.value as AffectedGroup)}
                    className="w-full p-2.5 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
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
                  <label className="block text-[#0F172A] font-bold uppercase flex items-center gap-1">
                    <Activity className="w-3 h-3 text-[#2563EB]" />
                    <span>Frequency & Impact</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value as FrequencyType)}
                      className="w-full p-2.5 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                    >
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Occasional">Occasional</option>
                    </select>

                    <select
                      value={impactLevel}
                      onChange={(e) => setImpactLevel(e.target.value as ImpactLevel)}
                      className="w-full p-2.5 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
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
                  className="px-4 py-2 text-xs font-mono text-[#64748B] hover:text-[#0F172A] flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> BACK
                </button>

                <button
                  type="button"
                  onClick={handleStep2Continue}
                  className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono text-xs font-bold tracking-wider shadow-[0_4px_14px_rgba(37,99,235,0.35)] flex items-center space-x-2"
                >
                  <span>CONTINUE →</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 03 — PRIVACY */}
          {activeStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-1">
                <h2 className="text-2xl font-display font-extrabold text-[#0F172A]">
                  YOUR EXPERIENCE. YOUR CONTROL.
                </h2>
                <p className="text-xs text-[#64748B] font-sans">
                  Your experience contributes to aggregated intelligence without becoming a public profile.
                </p>
              </div>

              {/* Animated Privacy Steps */}
              <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0] space-y-2.5 font-mono text-xs shadow-sm">
                {[
                  { title: "PERSONAL INFORMATION DETECTED", sub: "Scanned client-side for names, phone numbers, and IDs" },
                  { title: "IDENTIFYING DETAILS REMOVED", sub: `${sanitizedResult?.redactionsFound?.length || 0} sensitive tokens redacted` },
                  { title: "LOCATION GENERALIZED", sub: `Aggregated to ${sanitizedResult?.generalizedZone || 'Broad Sector Grid'}` },
                  { title: "IDENTITY PROTECTED", sub: "Zero IP logging, zero user device fingerprinting" },
                  { title: "READY FOR ANALYSIS", sub: "Privacy layer complete" }
                ].map((p, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#D9E2F0]">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                      <div>
                        <div className="text-[#0F172A] font-bold text-[11px]">{p.title}</div>
                        <div className="text-[#64748B] text-[10px]">{p.sub}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#2563EB]">✓</span>
                  </div>
                ))}
              </div>

              {/* Anonymous Toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#DBEAFE]/40 border border-[#BFDBFE]">
                <div className="flex items-center space-x-2.5">
                  <Lock className="w-4 h-4 text-[#2563EB]" />
                  <div>
                    <div className="text-xs font-mono font-bold text-[#0F172A]">ANONYMOUS SUBMISSION: ON</div>
                    <div className="text-[10px] font-mono text-[#64748B]">No public identity will ever be associated with this report</div>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded bg-[#2563EB] text-white font-mono font-bold text-[11px]">
                  SECURE
                </span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="px-4 py-2 text-xs font-mono text-[#64748B] hover:text-[#0F172A] flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> BACK
                </button>

                <button
                  type="button"
                  onClick={handleStep3ProtectAndAnalyze}
                  className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono text-xs font-bold tracking-wider shadow-[0_4px_14px_rgba(37,99,235,0.35)] flex items-center space-x-2"
                >
                  <span>PROTECT & CONTINUE →</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 04 — AI ANALYSIS */}
          {activeStep === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-1">
                <h2 className="text-2xl font-display font-extrabold text-[#0F172A]">
                  TURNING YOUR EXPERIENCE INTO INTELLIGENCE
                </h2>
                <p className="text-xs text-[#64748B] font-sans">
                  Semantic classification extracted with Google Gemini / Local Intelligence Engine.
                </p>
              </div>

              {isAiProcessing ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#DBEAFE] border border-[#2563EB] mx-auto flex items-center justify-center animate-spin-slow">
                    <Sparkles className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <div className="text-xs font-mono text-[#64748B] font-semibold">
                    UNDERSTAND → NORMALIZE → CLUSTER → CONNECT → DETECT
                  </div>
                </div>
              ) : aiResult && (
                <div className="space-y-4 font-mono text-xs animate-fadeIn">
                  <div className="grid grid-cols-2 gap-2.5 p-4 rounded-2xl bg-[#F8FAFC] border border-[#D9E2F0] shadow-sm">
                    <div className="p-2.5 rounded-lg bg-white border border-[#D9E2F0]">
                      <span className="text-[#64748B]">Topic: </span>
                      <span className="text-[#0F172A] font-bold">{aiResult.topic}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white border border-[#D9E2F0]">
                      <span className="text-[#64748B]">Issue: </span>
                      <span className="text-[#2563EB] font-bold">{aiResult.problem}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white border border-[#D9E2F0]">
                      <span className="text-[#64748B]">Time: </span>
                      <span className="text-[#0F172A] font-semibold">{aiResult.time}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white border border-[#D9E2F0]">
                      <span className="text-[#64748B]">Affected Group: </span>
                      <span className="text-[#0F172A] font-semibold">{aiResult.affectedGroup}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white border border-[#D9E2F0] col-span-2">
                      <span className="text-[#64748B]">Impact Vector: </span>
                      <span className="text-[#1D4ED8] font-bold">{aiResult.impact}</span>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={handleStep4ToPattern}
                      className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono text-xs font-bold tracking-wider shadow-[0_4px_14px_rgba(37,99,235,0.35)] flex items-center space-x-2"
                    >
                      <span>VIEW PATTERN MATCH →</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 05 — PATTERN DISCOVERY */}
          {activeStep === 5 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-1">
                <h2 className="text-2xl font-display font-extrabold text-[#0F172A]">
                  YOUR EXPERIENCE JOINED A PATTERN.
                </h2>
                <p className="text-xs text-[#64748B] font-sans">
                  Connected with multiple independent qualitative signals in this area.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#2563EB] shadow-md space-y-4 font-mono">
                <div className="flex justify-between items-center pb-3 border-b border-[#D9E2F0] text-xs">
                  <span className="text-[#2563EB] font-bold flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                    HIDDEN PATTERN DETECTED
                  </span>
                  <span className="text-[#64748B] font-semibold">CONFIDENCE: {matchedPattern.modelConfidence}% DEMO</span>
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
                  <div className="p-2.5 bg-white border border-[#D9E2F0] rounded-xl shadow-sm">
                    <div className="text-lg font-bold text-[#0F172A]">{matchedPattern.relatedExperienceCount}</div>
                    <div className="text-[9px] text-[#64748B]">RELATED VOICES</div>
                  </div>
                  <div className="p-2.5 bg-white border border-[#D9E2F0] rounded-xl shadow-sm">
                    <div className="text-lg font-bold text-[#2563EB]">{matchedPattern.aggregatedAreaCount}</div>
                    <div className="text-[9px] text-[#64748B]">AREAS</div>
                  </div>
                  <div className="p-2.5 bg-white border border-[#D9E2F0] rounded-xl shadow-sm">
                    <div className="text-lg font-bold text-[#1D4ED8]">+{matchedPattern.growthRate}%</div>
                    <div className="text-[9px] text-[#64748B]">SIGNAL GROWTH</div>
                  </div>
                  <div className="p-2.5 bg-white border border-[#D9E2F0] rounded-xl shadow-sm">
                    <div className="text-lg font-bold text-[#2563EB]">{matchedPattern.silenceIndex}%</div>
                    <div className="text-[9px] text-[#64748B]">SILENCE INDEX</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleStep5ToAction}
                  className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono text-xs font-bold tracking-wider shadow-[0_4px_14px_rgba(37,99,235,0.35)] flex items-center space-x-2"
                >
                  <span>SEE WHAT HAPPENS NEXT →</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 06 — WHAT HAPPENS NEXT & MAP IMPACT */}
          {activeStep === 6 && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Dynamic Map Signal Impact Banner */}
              <div className="p-5 rounded-2xl bg-[#DBEAFE]/40 border border-[#BFDBFE] space-y-2 font-mono">
                <div className="text-xs text-[#2563EB] font-bold uppercase flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  YOUR EXPERIENCE MADE A SIGNAL VISIBLE.
                </div>
                <p className="text-xs text-[#0F172A] font-sans">
                  Your report was connected to <span className="font-bold text-[#2563EB]">{matchedPattern.relatedExperienceCount} related experiences</span> in <span className="font-bold text-[#0F172A]">{targetZone.code} ({targetZone.name})</span>.
                </p>
                <div className="flex items-center space-x-3 text-xs pt-1">
                  <span className="text-[#64748B]">Zone Signal Volume:</span>
                  <span className="text-[#0F172A] font-semibold">{targetZone.activeSignalsCount - 1}</span>
                  <span className="text-[#2563EB] font-bold">→ {targetZone.activeSignalsCount} experiences</span>
                  <span className="px-2 py-0.5 rounded bg-[#DBEAFE] text-[#1D4ED8] text-[10px] font-bold">
                    SIGNAL INCREASED
                  </span>
                </div>
              </div>

              {/* Lifecycle Routing Status */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono text-[#64748B] uppercase font-bold">
                  SIGNAL LIFECYCLE TRACKING:
                </div>
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

              {/* Anonymous Experience ID */}
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#D9E2F0] flex items-center justify-between font-mono text-xs">
                <div>
                  <span className="text-[#64748B] text-[10px] block font-semibold">YOUR ANONYMOUS TRACKING ID:</span>
                  <span className="text-[#2563EB] font-bold text-sm tracking-wider">
                    {createdExperience?.anonymousTrackingId || 'UNH-7K42-XP91'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyId}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#EEF3FA] border border-[#D9E2F0] text-[#0F172A] text-xs flex items-center gap-1.5 font-semibold"
                >
                  {copiedId ? <Check className="w-3.5 h-3.5 text-[#2563EB]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId ? 'COPIED' : 'COPY ID'}</span>
                </button>
              </div>

              {/* Close / Explore Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleResetWizard}
                  className="px-4 py-2 text-xs font-mono text-[#64748B] hover:text-[#0F172A] font-semibold"
                >
                  Submit Another Problem
                </button>

                <button
                  type="button"
                  onClick={() => setIsSubmissionModalOpen(false)}
                  className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono text-xs font-bold tracking-wider shadow-[0_4px_14px_rgba(37,99,235,0.35)]"
                >
                  VIEW ON MAP →
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Modal Bottom Status */}
        <div className="px-6 py-3 border-t border-[#D9E2F0] bg-[#F8FAFC] flex items-center justify-between text-[11px] font-mono text-[#64748B]">
          <span>STEP {activeStep} OF 6 • ZERO-PII CLIENT REDACTION</span>
          <span className="font-bold text-[#2563EB]">UNHEARD SOCIAL PROBLEM INTELLIGENCE</span>
        </div>

      </div>
    </div>
  );
};
