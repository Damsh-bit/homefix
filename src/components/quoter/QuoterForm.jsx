import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check, ChevronRight, ChevronLeft, Phone
} from 'lucide-react'

import { supabase } from '../../integrations/supabase/client.js';
import { trackAIGeneration, getSessionId } from '../../utils/analytics.js';
import { useToast } from '../../hooks/use-toast.js';
import { useIsMobile } from '../../hooks/use-mobile.js';

/* 
declare global {
  interface Window {
    fbq: (command: string, eventName: string, data?: any) => void;
  }
}
*/
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const STEPS = [
  {
    id: 'roof',
    title: 'Roof Style',
    heading: 'Choose Your Roof Style',
    subtitle: 'Select the perfect roof design to complement your outdoor living space',
    description: 'Choose your patio cover',
    multiple: false,
    options: [
      { id: 'gable', label: 'Gable Roof', desc: 'Open, triangular peak with great ventilation', img: '/assets/materials/gable-roof.jpg', popular: true, price: 8000 },
      { id: 'hip', label: 'Hip Roof', desc: 'Slopes on all sides, elegant and wind-resistant', img: '/assets/materials/hip-roof.jpg', popular: false, price: 9500 },
      { id: 'pergola', label: 'Pergola Cover', desc: 'Partial shade with beams, perfect for vines', img: '/assets/materials/pergola.jpg', popular: false, price: 6000 },
      { id: 'slope', label: 'Single-Slope Patio Cover', desc: 'Modern single-slope design, clean and elegant', img: '/assets/materials/lean-to.jpg', popular: false, price: 7000 },
    ],
  },
  {
    id: 'flooring',
    title: 'Flooring',
    heading: 'Select Your Flooring',
    subtitle: 'Choose the foundation that defines your patio\'s character and durability',
    description: 'Select your patio surface',
    multiple: false,
    options: [
      { id: 'stamped', label: 'Stamped Concrete', desc: 'Mimics stone, brick, or wood patterns', img: '/assets/materials/stamped-concrete.jpg', popular: true, price: 12000 },
      { id: 'stone', label: 'Natural Stone', desc: 'Premium flagstone, slate, or travertine', img: '/assets/materials/natural-stone.jpg', popular: false, price: 18000 },
      { id: 'plain', label: 'Plain Concrete', desc: 'Simple concrete slab, budget-friendly option', img: '/assets/materials/plain-concrete.jpg', popular: false, price: 6000 },
    ],
  },
  {
    id: 'columns',
    title: 'Columns',
    heading: 'Choose Support Structure',
    subtitle: 'Select columns that provide both structural support and aesthetic appeal',
    description: 'Choose support structure',
    multiple: false,
    options: [
      { id: 'cedar', label: 'Cedar-Wrapped Columns', desc: 'Premium cedar-wrapped wood columns', img: '/assets/materials/wood-posts.jpg', popular: true, price: 4000 },
      { id: 'stone-col', label: 'Stone Columns', desc: 'Natural stone or cultured stone veneer', img: '/assets/materials/stone-columns.jpg', popular: false, price: 6500 },
    ],
  },
  {
    id: 'kitchen',
    title: 'Kitchen',
    heading: 'Kitchen & Cooking Features',
    subtitle: 'Add premium cooking features to create the perfect outdoor culinary experience',
    description: 'Add cooking features (optional)',
    multiple: true,
    optional: true,
    options: [
      { id: 'bbq', label: 'BBQ Station', desc: 'Built-in grill and prep area', img: '/assets/materials/bbq-station.jpg', popular: true, price: 4000 },
      { id: 'fireplace', label: 'Outdoor Fireplace', desc: 'Built-in fireplace for ambiance and warmth', img: '/assets/materials/fire-pit.jpg', popular: false, price: 6000 },
      { id: 'bar', label: 'Bar Seating', desc: 'Island counter with social hub design', img: '/assets/materials/bar-seating.jpg', popular: false, price: 3000 },
    ],
  },
  {
    id: 'features',
    title: 'Features',
    heading: 'Premium Features & Amenities',
    subtitle: 'Enhance your outdoor space with luxury amenities and comfort features',
    description: 'Extra amenities (optional)',
    multiple: true,
    optional: true,
    options: [
      { id: 'firepit', label: 'Fire Pit', desc: 'Round 3.5ft fire pit for gatherings and warmth', img: '/assets/materials/firepit.jpg', popular: true, price: 2500 },
      { id: 'fan', label: 'Ceiling Fan', desc: 'Outdoor rated fan for comfort and air circulation', img: '/assets/materials/fan.jpg', popular: true, price: 500 },
      { id: 'led', label: 'LED Lighting', desc: 'Premium outdoor LED lighting system', img: '/assets/materials/led.jpg', popular: false, price: 1500 },
    ],
  },
  {
    id: 'contact_preference',
    title: 'Contact Preference',
    heading: "When's the Best Time to Contact You?",
    subtitle: "We need to get in touch to confirm details and send over your 3D render",
    description: "When should we reach out?",
    multiple: false,
    options: [],
  },
  {
    id: 'submit',
    title: 'Submit',
    heading: 'Ready to Get Your Quote',
    subtitle: "Review your selections and submit your information for a free quote",
    description: "Get your free quote",
    multiple: false,
    options: [],
  },
]

function OptionCard({ option, selected, onSelect }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative rounded-2xl flex-1 min-w-[280px] max-w-[340px] h-[240px] overflow-hidden cursor-pointer transition-all border-[3px]",
        selected ? "border-blue-600 shadow-xl" : "border-transparent bg-white shadow-md hover:shadow-xl"
      )}
      onClick={() => onSelect(option.id)}
    >
      <img src={option.img} alt={option.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

      {option.popular && (
        <div className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg z-10">
          Popular Choice
        </div>
      )}

      {selected && (
        <div className="absolute top-3 right-3 bg-blue-600 text-white p-1 rounded-full shadow-lg z-10">
          <Check size={16} strokeWidth={3} />
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <h3 className="text-lg font-bold text-white mb-1">
          {option.label}
        </h3>
        <p className="text-sm text-slate-200 font-light">{option.desc}</p>
      </div>
    </motion.div>
  )
}

function SuccessScreen({ selections, contactInfo, onReset }) {
  const total = 15000 + Object.entries(selections).reduce((acc, [stepId, val]) => {
    const step = STEPS.find(s => s.id === stepId)
    if (!step) return acc
    if (Array.isArray(val)) {
      return acc + val.reduce((sum, v) => {
        const opt = step.options.find(o => o.id === v)
        return sum + (opt?.price || 0)
      }, 0)
    } else {
      const opt = step.options.find(o => o.id === val)
      return acc + (opt?.price || 0)
    }
  }, 0)

  const low = Math.round(total * 0.9 / 1000) * 1000
  const high = Math.round(total * 1.2 / 1000) * 1000

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 px-6">
      <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white mx-auto mb-8 shadow-2xl">
        <Check size={40} strokeWidth={3} />
      </div>
      <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4 text-slate-900">Request Received!</h2>
      <p className="text-slate-500 mb-10">Hi {contactInfo.firstName}, we estimate your project value between:</p>
      <div className="bg-slate-950 rounded-[3rem] p-10 max-w-md mx-auto mb-10 text-white shadow-2xl">
        <div className="text-4xl md:text-5xl font-black tabular-nums mb-2">
          ${low.toLocaleString()} – ${high.toLocaleString()}
        </div>
        <p className="text-[10px] uppercase tracking-widest text-blue-400 font-bold">Estimated Investment</p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <a href="tel:+18327445283" className="px-10 py-5 bg-blue-600 text-white rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-blue-700 transition-colors">
          <Phone size={16} /> Call Now
        </a>
        <button onClick={onReset} className="px-10 py-5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full font-bold uppercase tracking-widest text-xs transition-colors">
          Edit Selection
        </button>
      </div>
    </motion.div>
  )
}

export default function QuoterForm({ isEmbedded = false }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selections, setSelections] = useState({ contact_preference: 'call' })

  // New State variables as requested
  const [contactName, setContactName] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [contactPreference, setContactPreference] = useState('call')
  const [phoneError, setPhoneError] = useState('')
  const [phoneVerifying, setPhoneVerifying] = useState(false)
  const [phoneVerificationResult, setPhoneVerificationResult] = useState(null)
  const [phoneVerifyTimer, setPhoneVerifyTimer] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const { toast } = useToast()
  const isMobile = useIsMobile()

  const step = STEPS[currentStep]
  const progress = Math.round((currentStep / (STEPS.length - 1)) * 100)

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (phoneVerifyTimer) {
        clearTimeout(phoneVerifyTimer);
      }
    };
  }, [phoneVerifyTimer]);



  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setContactPhone(formatted);

    if (phoneError) setPhoneError('');
    if (phoneVerificationResult) setPhoneVerificationResult(null);
    if (phoneVerifyTimer) clearTimeout(phoneVerifyTimer);

    const digits = formatted.replace(/\D/g, '');
    if (digits.length === 10) {
      const validation = isValidPhoneNumber(formatted);
      if (validation.isValid) {
        const timer = setTimeout(() => {
          verifyPhoneNumber(formatted);
        }, 800);
        setPhoneVerifyTimer(timer);
      } else {
        setPhoneError(validation.error || '');
      }
    }
  };

  const verifyPhoneNumber = async (phone) => {
    if (!phone || phone.length < 10) return;
    setPhoneVerifying(true);
    try {
      console.log('Verifying phone number:', phone);
      const { data, error } = await supabase.functions.invoke('verify-phone-number', {
        body: { phone: phone, strictness: 1, countries: ['US', 'CA'] }
      });
      if (error) throw error;
      console.log('Phone verification result:', data);
      setPhoneVerificationResult(data);
      if (data.verified && data.data?.valid) {
        toast({ title: "Phone Verified ✓", description: `${data.data.carrier} • ${data.data.line_type}` });
      } else if (data.data && !data.data.valid) {
        toast({ title: "Phone Verification Issue", description: "Please check your phone number and try again.", variant: "destructive" });
      }
    } catch (error) {
      console.error('Phone verification error:', error);
      setPhoneVerificationResult({ verified: false, error: 'Verification unavailable', data: null });
    } finally {
      setPhoneVerifying(false);
    }
  };

  const submitPatioLead = async () => {
    if (!contactName.trim()) {
      toast({ title: "Name Required", description: "Please enter your full name.", variant: "destructive" });
      return;
    }

    const phoneValidation = isValidPhoneNumber(contactPhone);
    if (!phoneValidation.isValid) {
      setPhoneError(phoneValidation.error || 'Invalid phone number');
      toast({ title: "Invalid Phone Number", description: phoneValidation.error || "Please enter a valid 10-digit US phone number.", variant: "destructive" });
      return;
    }

    setIsProcessing(true);

    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'CompleteRegistration');
    }

    try {
      const response = await supabase.functions.invoke('submit-patio-lead', {
        body: {
          roofType: selections['roof'] || '',
          flooring: selections['flooring'] || '',
          columns: selections['columns'] || '',
          kitchenFeatures: selections['kitchen'] || [],
          extraFeatures: selections['features'] || [],
          area: 300,
          sessionId: getSessionId(),
          contact_name: contactName,
          contact_phone: contactPhone,
          contact_preference: selections['contact_preference'] || contactPreference,
          phone_verification: phoneVerificationResult
        }
      });

      if (response.error) throw new Error(response.error.message);
      const { data } = response;

      if (data.success || Object.keys(data).length > 0) {
        trackAIGeneration({
          roofType: selections['roof'],
          flooring: selections['flooring'],
          columns: selections['columns'],
          kitchenFeatures: selections['kitchen'],
          extraFeatures: selections['features']
        });
        setSubmitted(true);
        toast({ title: "Request Received! 🎉", description: "We'll contact you soon with your custom design and quote." });
      } else {
        throw new Error(data.error || 'Failed to submit request');
      }
    } catch (error) {
      console.error('Error submitting patio lead:', error);
      toast({ title: "Submission Failed", description: "Failed to submit your request. Please try again.", variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(prev => prev + 1)
  }

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1)
  }

  const handleSelect = (id) => {
    if (step.id === 'contact_preference') {
      setSelections(prev => ({ ...prev, [step.id]: id }))
      return;
    }

    if (step.multiple) {
      setSelections(prev => {
        const current = prev[step.id] || []
        if (current.includes(id)) {
          return { ...prev, [step.id]: current.filter(x => x !== id) }
        } else {
          return { ...prev, [step.id]: [...current, id] }
        }
      })
    } else {
      setSelections(prev => ({ ...prev, [step.id]: id }))
      // automatically advance if not multiple selection and not the last step
      if (currentStep < STEPS.length - 1) {
        setTimeout(() => {
          handleNext();
        }, 400);
      }
    }
  }

  const canProceed = () => {
    if (step.id === 'submit') return !!contactName && !!contactPhone;
    if (step.id === 'contact_preference') return !!selections.contact_preference;
    if (step.optional) return true;
    if (step.multiple) return selections[step.id]?.length > 0;
    return !!selections[step.id];
  };

  if (submitted) return <SuccessScreen selections={selections} contactInfo={{ firstName: contactName, phone: contactPhone }} onReset={() => setSubmitted(false)} />;

  return (
    <div className={cn("mx-auto", isEmbedded ? "max-w-5xl" : "max-w-6xl px-6")} data-patio-designer>

      {/* ── HEADER & PROGRESS ────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold flex items-center flex-wrap gap-2">
            <span className="text-blue-600">Step {currentStep + 1} of {STEPS.length}</span>
            <span className="text-slate-300 mx-1 hidden md:block">•</span>
            <span className="text-orange-500">{step.title}</span>
          </h2>
          <p className="text-slate-500 mt-2 font-medium">{step.description}</p>
        </div>
        <div className="text-right mt-4 md:mt-0">
          <div className="text-3xl font-black text-blue-600 leading-none mb-1">{progress}%</div>
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Complete</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-3 rounded-full mb-12 overflow-hidden">
        <div className="bg-blue-600 h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
      </div>

      {/* ── STEP CONTENT ─────────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-100 shadow-sm min-h-[400px] flex flex-col justify-center">

        <div className="text-center mb-10">
          <h3 className="text-3xl md:text-4xl font-bold text-[#7a6470] mb-2">{step.heading}</h3>
          <p className="text-slate-500 font-medium">{step.subtitle}</p>

          {step.optional && (
            <div className="mt-4 flex flex-col items-center gap-4">
              <span className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full font-medium">
                Optional - Skip or select multiple
              </span>
              <button
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-bold text-sm flex items-center transition-colors shadow-lg shadow-blue-500/30"
              >
                Skip {step.title} Features <ChevronRight size={18} className="ml-1" />
              </button>
            </div>
          )}
        </div>

        {step.id === 'contact_preference' ? (
          <div className="max-w-xl mx-auto w-full space-y-4">
            <div
              onClick={() => handleSelect('call')}
              className={cn(
                "flex items-center gap-4 p-5 rounded-xl border-2 transition-all cursor-pointer",
                selections.contact_preference === 'call' ? "border-blue-600 bg-blue-50/50" : "border-slate-200 hover:border-blue-300 bg-white"
              )}
            >
              <div className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
                selections.contact_preference === 'call' ? "border-blue-600" : "border-slate-300"
              )}>
                {selections.contact_preference === 'call' && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 leading-tight">Call me now</h4>
                <p className="text-sm text-slate-500 mt-0.5">I'm available to discuss my project right away</p>
              </div>
            </div>

            <div
              onClick={() => handleSelect('text')}
              className={cn(
                "flex items-center gap-4 p-5 rounded-xl border-2 transition-all cursor-pointer",
                selections.contact_preference === 'text' ? "border-blue-600 bg-blue-50/50" : "border-slate-200 hover:border-blue-300 bg-white"
              )}
            >
              <div className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
                selections.contact_preference === 'text' ? "border-blue-600" : "border-slate-300"
              )}>
                {selections.contact_preference === 'text' && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 leading-tight">Text me first, I will reply with best time</h4>
                <p className="text-sm text-slate-500 mt-0.5">Send me a text and I'll let you know when I'm free</p>
              </div>
            </div>
          </div>
        ) : step.id === 'submit' ? (
          <div className="max-w-2xl mx-auto w-full">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 mb-4 shadow-sm">
              <h3 className="text-xl font-bold mb-6 text-slate-900">Your Design Summary</h3>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-slate-700">Roof Style:</span>
                  <span className="px-3 py-1 bg-slate-100 rounded-md border text-slate-700 font-medium text-xs">
                    {STEPS.find(s => s.id === 'roof')?.options.find(o => o.id === selections['roof'])?.label || 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-slate-700">Flooring:</span>
                  <span className="px-3 py-1 bg-slate-100 rounded-md border text-slate-700 font-medium text-xs">
                    {STEPS.find(s => s.id === 'flooring')?.options.find(o => o.id === selections['flooring'])?.label || 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-slate-700">Columns:</span>
                  <span className="px-3 py-1 bg-slate-100 rounded-md border text-slate-700 font-medium text-xs">
                    {STEPS.find(s => s.id === 'columns')?.options.find(o => o.id === selections['columns'])?.label || 'Not selected'}
                  </span>
                </div>

                {(selections['kitchen']?.length > 0) && (
                  <div className="flex justify-between items-start text-sm">
                    <span className="font-medium text-slate-700 mr-4">Kitchen Features:</span>
                    <div className="flex flex-wrap justify-end gap-1 text-right">
                      {selections['kitchen'].map(k => {
                        const opt = STEPS.find(s => s.id === 'kitchen')?.options.find(o => o.id === k)
                        return <span key={k} className="px-3 py-1 bg-slate-100 rounded-md border text-slate-700 font-medium text-xs">{opt?.label}</span>
                      })}
                    </div>
                  </div>
                )}

                {(selections['features']?.length > 0) && (
                  <div className="flex justify-between items-start text-sm">
                    <span className="font-medium text-slate-700 mr-4">Features:</span>
                    <div className="flex flex-wrap justify-end gap-1 text-right">
                      {selections['features'].map(f => {
                        const opt = STEPS.find(s => s.id === 'features')?.options.find(o => o.id === f)
                        return <span key={f} className="px-3 py-1 bg-slate-100 rounded-md border text-slate-700 font-medium text-xs">{opt?.label}</span>
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4 pt-6 border-t border-slate-100">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-900">Your Name *</label>
                  <input
                    type="text" placeholder="Enter your full name"
                    value={contactName} onChange={e => setContactName(e.target.value)}
                    className="w-full bg-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm border border-slate-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-900">Phone Number *</label>
                  <input
                    type="tel" placeholder="(123) 456-7890"
                    value={contactPhone} onChange={handlePhoneChange}
                    className={cn(
                      "w-full bg-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm border border-slate-200",
                      phoneError ? 'border-red-500 focus:ring-red-500' : ''
                    )}
                  />
                  {phoneError && (
                    <p className="text-sm text-red-500 mt-1">{phoneError}</p>
                  )}
                  {phoneVerifying && (
                    <p className="text-sm text-slate-500 flex items-center gap-2 mt-1">
                      Verifying phone number...
                    </p>
                  )}
                  {phoneVerificationResult?.verified && phoneVerificationResult?.data?.valid && (
                    <div className="text-sm text-green-600 flex items-center gap-2 mt-1">
                      <Check size={14} />
                      <span>Phone verified • {phoneVerificationResult.data.carrier} • {phoneVerificationResult.data.line_type}</span>
                    </div>
                  )}
                  {phoneVerificationResult && !phoneVerificationResult?.verified && phoneVerificationResult?.data && !phoneVerificationResult?.data?.valid && (
                    <p className="text-sm text-amber-600 flex items-center gap-2 mt-1">
                      Unable to verify this phone number. Please check and try again.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-[10px] text-slate-500 mb-6 leading-relaxed px-4">
                  By opting in, I agree to receive account-related texts (appointments, orders, alerts) from Fix My Home LLC. Msg & data rates may apply. Reply STOP to cancel, HELP for info. View our <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
                </p>
                <button
                  onClick={submitPatioLead}
                  disabled={
                    isProcessing ||
                    !contactName.trim() ||
                    !contactPhone.trim() ||
                    !isValidPhoneNumber(contactPhone).isValid ||
                    phoneVerifying ||
                    !phoneVerificationResult?.verified ||
                    !phoneVerificationResult?.data?.valid
                  }
                  className="w-full bg-[#4ba3e2] hover:bg-blue-500 disabled:opacity-50 text-white font-medium py-3 rounded-lg transition-all flex justify-center items-center gap-2 shadow-sm"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Submitting Request...</span>
                    </div>
                  ) : (
                    <>
                      <span className="text-base leading-none">✨</span> Get My Free Quote
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {step.options.map(opt => {
              const isSelected = step.multiple
                ? (selections[step.id] || []).includes(opt.id)
                : selections[step.id] === opt.id

              return (
                <OptionCard
                  key={opt.id}
                  option={opt}
                  selected={isSelected}
                  onSelect={handleSelect}
                />
              )
            })}
          </div>
        )}
      </div>

      {/* ── FOOTER CONTROLS ──────────────────────────────────────────────── */}
      <div className="mt-8 flex justify-between items-center px-4">
        {(currentStep > 0 && step.id !== 'submit') ? (
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-6 py-3 text-slate-500 font-bold uppercase tracking-wider text-xs rounded-full hover:bg-slate-100 transition-colors"
          >
            <ChevronLeft size={16} /> Back
          </button>
        ) : (
          <div />
        )}

        {step.id !== 'submit' && (
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold uppercase tracking-wider text-xs shadow-xl hover:bg-blue-700 transition-all flex items-center gap-2 disabled:bg-slate-300 disabled:shadow-none"
          >
            {currentStep === STEPS.length - 1 ? 'Show My Estimate' : 'Continue'} <ChevronRight size={16} />
          </button>
        )}
      </div>

      {/* Indicator Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === currentStep ? "w-8 bg-blue-600" : "w-2 bg-slate-200"
            )}
          />
        ))}
      </div>

    </div>
  )
}
