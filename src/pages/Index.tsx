import '../AppAnimations.css';
import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  MessageCircle, 
  Leaf, 
  Users,
  Phone, 
  MapPin, 
  Upload, 
  Bot, 
  User,
  Award,
  TrendingUp,
  Heart,
  Star,
  Stethoscope,
  Package,
  Sun,
  FileText,
  CheckCircle,
  Calendar,
  ChevronRight,
  Cloud,
  Droplets,
  Sprout,
  Send,
  Download,
  Shield,
  AlertCircle,
  Mail
} from 'lucide-react';

import { useLanguage } from '../contexts/LanguageContext';


interface CropAnalysis {
  farmerName: string;
  farmLocation: string;
  cropType: string;
  diseaseDetected: string;
  severity: string;
  confidence: number;
  recommendations: string[];
  treatmentMethods: string[];
  vendorContacts: {
    name: string;
    phone: string;
    email: string;
    products: string[];
  }[];
  governmentSchemes: {
    name: string;
    description: string;
    eligibility: string;
    benefit: string;
  }[];
  analysisDate: string;
  imageUrl?: string;
}

const AgroGuardianAI = () => {
  const { language, setLanguage, getText } = useLanguage();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{type: 'user' | 'bot', content: string}>>([]);
  const [userMessage, setUserMessage] = useState('');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [otpInput, setOtpInput] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadError, setDownloadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ...existing code...

  // Sample crop analysis data
  const cropAnalysis: CropAnalysis = {
  farmerName: getText('farmerName'),
  farmLocation: getText('farmLocation'),
  cropType: getText('cropType'),
  diseaseDetected: getText('diseaseDetected'),
  severity: getText('moderate'),
    confidence: 87.5,
    recommendations: [
      getText('recommendation1'),
      getText('recommendation2'),
      getText('recommendation3'),
      getText('recommendation4')
    ],
    treatmentMethods: [
      getText('treatment1'),
      getText('treatment2'),
      getText('treatment3'),
      getText('treatment4')
    ],
    vendorContacts: [
      {
        name: getText('vendor1Name'),
        phone: "+91-9876543210",
        email: "contact@agrisupply.com",
        products: getText('vendor1Products').split(', ')
      },
      {
        name: getText('vendor2Name'),
        phone: "+91-9123456789",
        email: "sales@farmcare.in",
        products: getText('vendor2Products').split(', ')
      }
    ],
    governmentSchemes: [
      {
        name: getText('scheme1Name'),
        description: getText('scheme1Desc'),
        eligibility: getText('scheme1Eligibility'),
        benefit: getText('scheme1Benefit')
      },
      {
        name: getText('scheme2Name'),
        description: getText('scheme2Desc'),
        eligibility: getText('scheme2Eligibility'),
        benefit: getText('scheme2Benefit')
      }
    ],
    analysisDate: new Date().toLocaleDateString('en-IN'),
    imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='150' viewBox='0 0 200 150'%3E%3Crect width='200' height='150' fill='%23f3f4f6'/%3E%3Ctext x='100' y='80' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='12'%3ECrop Image%3C/text%3E%3C/svg%3E"
  };

  const handleOtpVerification = () => {
    setDownloadError('');
    if (otpInput === '123456') {
      setIsOtpVerified(true);
      setShowOtpForm(false);
    } else {
      setDownloadError('Invalid OTP. Please enter the correct OTP.');
    }
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    
    // Simulate PDF generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create PDF content as HTML string for download
    const pdfContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>AgroGuardian Crop Analysis Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
        .header { text-align: center; border-bottom: 2px solid #10b981; padding-bottom: 20px; margin-bottom: 30px; }
        .header h1 { color: #10b981; margin: 0; }
        .header p { color: #6b7280; margin: 5px 0; }
        .section { margin-bottom: 25px; }
        .section h2 { color: #10b981; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 15px 0; }
        .info-item { padding: 10px; background: #f9fafb; border-radius: 5px; }
        .info-item strong { color: #374151; }
        .recommendations, .treatments { background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 10px 0; }
        .recommendations h3, .treatments h3 { color: #0369a1; margin-top: 0; }
        .vendor { background: #fef3c7; padding: 15px; margin: 10px 0; border-radius: 8px; }
        .scheme { background: #ecfdf5; padding: 15px; margin: 10px 0; border-radius: 8px; }
        .severity-high { color: #dc2626; }
        .severity-moderate { color: #d97706; }
        .severity-low { color: #059669; }
        .confidence { font-size: 18px; font-weight: bold; color: #10b981; }
        ul { margin: 10px 0; padding-left: 20px; }
        li { margin: 5px 0; }
        .footer { margin-top: 40px; text-align: center; color: #6b7280; font-size: 12px; border-top: 1px solid #e5e7eb; padding-top: 20px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🌱 AgroGuardian-AI</h1>
        <p>Crop Analysis Report</p>
        <p>Generated on: ${cropAnalysis.analysisDate}</p>
    </div>

    <div class="section">
        <h2>Farmer Information</h2>
        <div class="info-grid">
            <div class="info-item">
                <strong>Farmer Name:</strong> ${cropAnalysis.farmerName}
            </div>
            <div class="info-item">
                <strong>Farm Location:</strong> ${cropAnalysis.farmLocation}
            </div>
            <div class="info-item">
                <strong>Crop Type:</strong> ${cropAnalysis.cropType}
            </div>
            <div class="info-item">
                <strong>Analysis Date:</strong> ${cropAnalysis.analysisDate}
            </div>
        </div>
    </div>

    <div class="section">
        <h2>Disease Analysis</h2>
        <div class="info-grid">
            <div class="info-item">
                <strong>Disease Detected:</strong> ${cropAnalysis.diseaseDetected}
            </div>
            <div class="info-item">
                <strong>Severity:</strong> <span class="severity-${cropAnalysis.severity.toLowerCase()}">${cropAnalysis.severity}</span>
            </div>
        </div>
        <div class="info-item">
            <strong>Confidence Level:</strong> <span class="confidence">${cropAnalysis.confidence}%</span>
        </div>
    </div>

    <div class="recommendations">
        <h3>🎯 Recommendations</h3>
        <ul>
            ${cropAnalysis.recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
    </div>

    <div class="treatments">
        <h3>💊 Treatment Methods</h3>
        <ul>
            ${cropAnalysis.treatmentMethods.map(treatment => `<li>${treatment}</li>`).join('')}
        </ul>
    </div>

    <div class="section">
        <h2>Vendor Contacts</h2>
        ${cropAnalysis.vendorContacts.map(vendor => `
            <div class="vendor">
                <h3>${vendor.name}</h3>
                <p><strong>Phone:</strong> ${vendor.phone}</p>
                <p><strong>Email:</strong> ${vendor.email}</p>
                <p><strong>Products:</strong> ${vendor.products.join(', ')}</p>
            </div>
        `).join('')}
    </div>

    <div class="section">
        <h2>Government Schemes</h2>
        ${cropAnalysis.governmentSchemes.map(scheme => `
            <div class="scheme">
                <h3>${scheme.name}</h3>
                <p><strong>Description:</strong> ${scheme.description}</p>
                <p><strong>Eligibility:</strong> ${scheme.eligibility}</p>
                <p><strong>Benefit:</strong> ${scheme.benefit}</p>
            </div>
        `).join('')}
    </div>

    <div class="footer">
        <p>This report is generated by AgroGuardian-AI Digital Assistant</p>
        <p>For support, contact: support@agroguardian.ai | +91-1800-XXX-XXXX</p>
    </div>
</body>
</html>`;

    // Create and download the PDF
    const blob = new Blob([pdfContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AgroGuardian_Report_${cropAnalysis.farmerName.replace(/\s+/g, '_')}_${Date.now()}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setIsGenerating(false);
    
    // Reset after successful download
    setTimeout(() => {
      setIsOtpVerified(false);
      setOtpInput('');
    }, 3000);
  };

  const steps = [
    {
      title: getText('step1Title'),
      desc: getText('step1Detail'),
      icon: '🌍'
    },
    {
      title: getText('step2Title'),
      desc: getText('step2Detail'),
      icon: '📱'
    },
    {
      title: getText('step3Title'),
      desc: getText('step3Detail'),
      icon: '🤖'
    },
    {
      title: getText('step4Title'),
      desc: getText('step4Detail'),
      icon: '💬'
    }
  ];

  const startCamera = async () => {
    try {
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      } catch (err) {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
      }
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsCameraActive(true);
      }
    } catch (err) {
      alert('Unable to access camera. Please use the upload option instead.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setCapturedImage(url);
            stopCamera();
            analyzeCrop(url);
          }
        });
      }
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCapturedImage(url);
      analyzeCrop(url);
    }
  };

  const analyzeCrop = async (imageUrl: string) => {
    setIsAnalyzing(true);
    
    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const response = `🌱 Analysis Complete!

🌾 Crop: Wheat
🔍 Condition: Early Blight Disease
⚠️ Severity: Moderate
🎯 Confidence: 95%

🔬 Symptoms:
• Yellow spots on leaves
• Wilting stems
• Brown patches

💡 Recommendations:
• Apply fungicide treatment
• Improve soil drainage
• Monitor plant health regularly

⚡ Immediate Actions:
• Remove affected leaves
• Isolate infected plants

🌱 Nutrition Advice:
• Increase potassium levels
• Maintain proper pH balance
• Use organic fertilizers`;
      
      const botMessage = {
        type: 'bot' as const,
        content: response
      };
      
      setChatMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        type: 'bot' as const,
        content: 'Sorry, there was an error analyzing your crop. Please try again.'
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const sendMessage = async () => {
    if (userMessage.trim()) {
      const userMsg = { type: 'user' as const, content: userMessage };
      setChatMessages(prev => [...prev, userMsg]);
      const currentMessage = userMessage;
      setUserMessage('');
      
      try {
        // Simulate AI chat response
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const responses = [
          "I can help you with crop management! What specific issue are you facing?",
          "Based on your question, I recommend checking soil moisture levels first.",
          "This sounds like a common issue. Let me provide some solutions for you.",
          "I'd be happy to help with your agricultural concerns. Can you provide more details?",
          "For this type of problem, I suggest consulting with a local agricultural expert."
        ];
        
        const response = responses[Math.floor(Math.random() * responses.length)];
        const botMsg = {
          type: 'bot' as const,
          content: response
        };
        setChatMessages(prev => [...prev, botMsg]);
      } catch (error) {
        const errorMessage = {
          type: 'bot' as const,
          content: 'Sorry, I encountered an error. Please try again.'
        };
        setChatMessages(prev => [...prev, errorMessage]);
      }
    }
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-primary sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-primary p-2 rounded-full">
                <Leaf className="h-8 w-8 text-primary-foreground float-animation" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-primary">{getText('title')}</h1>
                <p className="text-muted-foreground text-sm">{getText('subtitle')}</p>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-6">
              {['homeNav', 'aboutNav', 'vendorsNav', 'schemesNav', 'contactNav'].map((nav, idx) => (
                <button 
                  key={nav}
                  onClick={() => scrollToSection(['home', 'about', 'vendors', 'schemes', 'contact'][idx])} 
                  className="text-primary font-medium transition-colors"
                >
                  {getText(nav)}
                </button>
              ))}
            </nav>
            
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-accent border-border text-foreground rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary"
            >
              <option value="english">English</option>
              <option value="hindi">हिंदी</option>
              <option value="gujarati">ગુજરાતી</option>
            </select>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20 bg-gradient-to-r from-primary via-green-600 to-green-700 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="fade-in">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-white text-center drop-shadow-2xl breathing-animation"
                style={{
                  textShadow: '0 4px 32px rgba(0,0,0,0.7), 0 2px 0 #222',
                  letterSpacing: '0.01em',
                }}>
              {getText('title')}:<br />
              <span className="block text-4xl md:text-6xl font-extrabold mt-2"
                style={{
                  color: '#fff',
                  textShadow: '0 4px 32px rgba(0,0,0,0.7), 0 2px 0 #222',
                  WebkitTextStroke: '1px #15803d',
                  lineHeight: 1.1,
                }}>
                {getText('subtitle')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto font-medium text-white text-center" style={{textShadow: '0 2px 16px rgba(0,0,0,0.7), 0 1px 0 #222'}}>
              {getText('description')}
            </p>
          </div>
          
          {/* Statistics */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold mb-2">35%</div>
              <div className="text-green-200">{getText('cropLossReduction')}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold mb-2">50%</div>
              <div className="text-green-200">{getText('chemicalReduction')}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold mb-2">25%</div>
              <div className="text-green-200">{getText('incomeIncrease')}</div>
            </div>
          </div>
          
          <button 
            onClick={() => scrollToSection('howto')}
            className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg transition-all transform shadow-xl"
          >
            Get Started <ChevronRight className="inline h-5 w-5 ml-2" />
          </button>
        </div>
        
        {/* Floating agricultural elements */}
        <div className="absolute top-10 left-10 text-white/20 text-4xl float-animation">
          <Sun />
        </div>
        <div className="absolute top-20 right-20 text-white/20 text-3xl float-animation" style={{ animationDelay: '2s' }}>
          <Cloud />
        </div>
        <div className="absolute bottom-20 left-20 text-white/20 text-3xl float-animation" style={{ animationDelay: '4s' }}>
          <Droplets />
        </div>
        <div className="absolute bottom-10 right-10 text-white/20 text-4xl float-animation" style={{ animationDelay: '1s' }}>
          <Sprout />
        </div>
      </section>

      {/* How to Use - Horizontal Steps */}
      <section id="howto" className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-primary mb-16 fade-in">{getText('howToTitle')}</h2>
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-stretch gap-8">
              {(() => {
                const [activeStep, setActiveStep] = React.useState(-1);
                return steps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`flex-1 bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center cursor-pointer transition-all relative group ${activeStep === idx ? 'ring-4 ring-primary scale-105 z-10' : ''}`}
                    onClick={() => setActiveStep(idx)}
                    onMouseEnter={() => setActiveStep(idx)}
                    onMouseLeave={() => setActiveStep(-1)}
                    style={{ minWidth: 0 }}
                  >
                    <div className="relative mb-6 w-20 h-20 flex items-center justify-center">
                      <div className={`text-5xl transition-colors duration-200 ${activeStep === idx ? 'text-primary' : ''}`}>{step.icon}</div>
                      {activeStep === idx && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-primary text-5xl font-extrabold bg-white/90 rounded-full px-5 py-2 shadow-lg border-2 border-primary">{idx + 1}</span>
                        </div>
                      )}
                    </div>
                    <h4 className={`text-2xl font-bold mb-3 transition-colors duration-200 ${activeStep === idx ? 'text-primary' : 'text-primary'}`}>{step.title}</h4>
                    <p className="text-sm text-muted-foreground mb-0 leading-relaxed text-justify" style={{fontWeight: 400, marginTop: 0, marginBottom: 0, padding: '0 0.5rem', minHeight: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{step.desc}</p>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* AI Analysis & Chat */}
      <section id="analysis" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-primary mb-16 fade-in">{getText('analysisTitle')}</h2>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Image Capture Section */}
            <div className="bg-card rounded-3xl shadow-xl p-8 border border-border">
              <h3 className="text-2xl font-bold text-card-foreground mb-8 flex items-center">
                <Camera className="h-8 w-8 mr-3 text-primary" />
                {getText('imageSection')}
              </h3>
              
              <div className="space-y-6">
                <div className="relative bg-muted rounded-xl overflow-hidden h-80">
                  {capturedImage ? (
                    <img 
                      src={capturedImage} 
                      alt="Captured crop" 
                      className="w-full h-full object-cover grow-animation"
                    />
                  ) : isCameraActive ? (
                    <video 
                      ref={videoRef}
                      autoPlay 
                      playsInline 
                      muted
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <Camera className="h-16 w-16 mx-auto mb-4 text-primary float-animation" />
                        <p className="text-lg font-medium">Ready to analyze your crops</p>
                        <p className="text-sm opacity-75">Capture or upload an image to start</p>
                      </div>
                    </div>
                  )}
                  
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="rotate-slow h-12 w-12 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-lg font-bold">{getText('analyzing')}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {!isCameraActive ? (
                    <button
                      onClick={startCamera}
                      className="bg-primary text-primary-foreground px-6 py-4 rounded-xl transition-colors flex items-center justify-center space-x-2 font-medium"
                    >
                      <Camera className="h-5 w-5" />
                      <span>{getText('captureBtn')}</span>
                    </button>
                  ) : (
                    <button
                      onClick={capturePhoto}
                      className="bg-green-700 text-white px-6 py-4 rounded-xl transition-colors flex items-center justify-center space-x-2 font-medium"
                    >
                      <Camera className="h-5 w-5" />
                      <span>Capture Now</span>
                    </button>
                  )}
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-secondary text-secondary-foreground px-6 py-4 rounded-xl transition-colors flex items-center justify-center space-x-2 font-medium"
                  >
                    <Upload className="h-5 w-5" />
                    <span>{getText('uploadBtn')}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Section */}
            <div className="bg-card rounded-3xl shadow-xl p-8 border border-border">
              <h3 className="text-2xl font-bold text-card-foreground mb-8 flex items-center">
                <Bot className="h-8 w-8 mr-3 text-primary" />
                {getText('chatSection')}
              </h3>
              
              <div className="flex flex-col h-96">
                <div className="flex-1 overflow-y-auto bg-muted rounded-xl p-6 mb-6 space-y-4 custom-scrollbar">
                  {chatMessages.length === 0 ? (
                    <div className="text-center text-muted-foreground mt-20">
                      <Bot className="h-16 w-16 mx-auto mb-4 text-primary float-animation" />
                      <p className="font-medium text-lg">{getText('greeting')}</p>
                      <p className="text-sm mt-2">{getText('subGreeting')}</p>
                    </div>
                  ) : (
                    chatMessages.map((message, index) => (
                      <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} fade-in`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                          message.type === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-card border-2 border-border text-card-foreground'
                        }`}>
                          <div className="flex items-start space-x-2">
                            {message.type === 'bot' && <Bot className="h-4 w-4 text-primary mt-1 flex-shrink-0" />}
                            {message.type === 'user' && <User className="h-4 w-4 text-primary-foreground mt-1 flex-shrink-0" />}
                            <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder={getText('placeholder')}
                    className="flex-1 border-2 border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary bg-background text-sm"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!userMessage.trim()}
                    className="bg-primary text-primary-foreground px-4 py-3 rounded-xl transition-colors disabled:opacity-50"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <canvas ref={canvasRef} className="hidden" />
      </section>

      {/* Download Report Section */}
      <section id="download" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <Leaf className="h-12 w-12 text-green-600 mr-3" />
                <h2 className="text-4xl font-bold text-gray-800">AgroGuardian-AI</h2>
              </div>
              <p className="text-gray-600 text-lg">Crop Analysis Report - Download Center</p>
            </div>

            {/* Analysis Summary Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center mb-4">
                <FileText className="h-6 w-6 text-green-600 mr-2" />
                <h3 className="text-2xl font-semibold text-gray-800">Analysis Summary</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-gray-700">Nashik, Maharashtra</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-gray-700">{new Date().toLocaleDateString('en-IN')}</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Crop Type</p>
                    <p className="font-semibold text-gray-800">Tomato</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-red-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Disease Detected</p>
                    <p className="font-semibold text-red-600">Late Blight</p>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Severity Level</p>
                    <p className="font-semibold text-orange-600">Moderate</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Confidence</p>
                    <p className="font-semibold text-green-600">87.5%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Download className="h-8 w-8 text-blue-600 mr-2" />
                  <h3 className="text-2xl font-semibold text-gray-800">{getText('downloadReport')}</h3>
                </div>

                {!showOtpForm && !isOtpVerified && (
                  <div>
                    <p className="text-gray-600 mb-6">
                      {getText('downloadSummary')}
                    </p>
                    <button
                      onClick={() => setShowOtpForm(true)}
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center mx-auto"
                    >
                      <Shield className="h-5 w-5 mr-2" />
                      {getText('requestDownload')}
                    </button>
                  </div>
                )}

                {showOtpForm && !isOtpVerified && (
                  <div className="max-w-md mx-auto">
                    <div className="bg-blue-50 p-4 rounded-lg mb-6">
                      <Shield className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <p className="text-blue-800 font-medium">{getText('downloadOtp')}</p>
                      <p className="text-blue-600 text-sm">{getText('downloadOtpDesc')}</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {getText('enterOtp')}
                        </label>
                        <input
                          type="text"
                          value={otpInput}
                          onChange={(e) => setOtpInput(e.target.value)}
                          placeholder={getText('enterOtpPlaceholder')}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-lg font-mono"
                          maxLength={6}
                        />
                      </div>
                      
                      {downloadError && (
                        <div className="flex items-center text-red-600 text-sm">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {downloadError}
                        </div>
                      )}

                      <div className="flex space-x-3">
                        <button
                          onClick={() => setShowOtpForm(false)}
                          className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                          {getText('cancel')}
                        </button>
                        <button
                          onClick={handleOtpVerification}
                          disabled={otpInput.length !== 6}
                          className="flex-1 bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                          {getText('verifyOtp')}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {isOtpVerified && (
                  <div className="max-w-md mx-auto">
                    <div className="bg-green-50 p-4 rounded-lg mb-6">
                      <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <p className="text-green-800 font-medium">{getText('otpVerified')}</p>
                      <p className="text-green-600 text-sm">{getText('youCanDownload')}</p>
                    </div>

                    <button
                      onClick={generatePDF}
                      disabled={isGenerating}
                      className="bg-green-600 disabled:bg-green-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center mx-auto"
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          {getText('generatingPDF')}
                        </>
                      ) : (
                        <>
                          <Download className="h-5 w-5 mr-2" />
                          {getText('downloadPDFReport')}
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-8 text-center text-gray-600">
              <div className="flex items-center justify-center space-x-6">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-1" />
                  <span className="text-sm">+91-1800-XXX-XXXX</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  <span className="text-sm">support@agroguardian.ai</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Medicine Vendors Section */}
      <section id="vendors" className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-primary mb-16 fade-in">{getText('vendorsTitle')}</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              { name: getText('vendorCard1'), medicine: getText('vendorCard1Med'), rating: 4.8, contact: "+91-9876543210", location: getText('vendorCard1Loc') },
              { name: getText('vendorCard2'), medicine: getText('vendorCard2Med'), rating: 4.9, contact: "+91-9876543211", location: getText('vendorCard2Loc') },
              { name: getText('vendorCard3'), medicine: getText('vendorCard3Med'), rating: 4.7, contact: "+91-9876543212", location: getText('vendorCard3Loc') },
              { name: getText('vendorCard4'), medicine: getText('vendorCard4Med'), rating: 4.6, contact: "+91-9876543213", location: getText('vendorCard4Loc') },
              { name: getText('vendorCard5'), medicine: getText('vendorCard5Med'), rating: 4.8, contact: "+91-9876543214", location: getText('vendorCard5Loc') },
              { name: getText('vendorCard6'), medicine: getText('vendorCard6Med'), rating: 4.5, contact: "+91-9876543215", location: getText('vendorCard6Loc') }
            ].map((vendor, idx) => (
              <div
                key={idx}
                className="bg-card rounded-2xl shadow-lg p-6 border border-border transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-2xl hover:border-primary"
              >
                <div className="flex items-center justify-between mb-4">
                  <Stethoscope className="h-8 w-8 text-primary" />
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{vendor.rating}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-2">{vendor.name}</h3>
                <p className="text-muted-foreground mb-3 flex items-center">
                  <Package className="h-4 w-4 mr-2" />
                  {vendor.medicine}
                </p>
                <p className="text-sm text-muted-foreground mb-3 flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {vendor.location}
                </p>
                <p className="text-sm text-muted-foreground mb-4 flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  {vendor.contact}
                </p>
                <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg transition-colors font-medium">
                  {getText('vendorContactBtn')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Government Schemes Section */}
      <section id="schemes" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-primary mb-16 fade-in">{getText('schemesTitle')}</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              { name: getText('schemeCard1'), desc: getText('schemeCard1Desc'), link: "https://pmkisan.gov.in/" },
              { name: getText('schemeCard2'), desc: getText('schemeCard2Desc'), link: "https://pmfby.gov.in/" },
              { name: getText('schemeCard3'), desc: getText('schemeCard3Desc'), link: "https://www.nabard.org/content1.aspx?id=570" },
              { name: getText('schemeCard4'), desc: getText('schemeCard4Desc'), link: "https://soilhealth.dac.gov.in/" },
              { name: getText('schemeCard5'), desc: getText('schemeCard5Desc'), link: "https://enam.gov.in/" },
              { name: getText('schemeCard6'), desc: getText('schemeCard6Desc'), link: "https://agri.gujarat.gov.in/" }
            ].map((scheme, idx) => (
              <div
                key={idx}
                className={`bg-card rounded-2xl shadow-lg p-6 border-l-4 transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-2xl hover:border-green-600 ${
                  ['border-green-500', 'border-green-600', 'border-green-700', 'border-green-800', 'border-green-400', 'border-green-300'][idx]
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <Award className="h-8 w-8 text-primary" />
                  <Shield className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-3">{scheme.name}</h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{scheme.desc}</p>
                <a 
                  href={scheme.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg transition-colors text-sm font-medium inline-flex items-center space-x-2"
                >
                  <span>{getText('learnMoreBtn')}</span>
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-primary mb-16 fade-in">{getText('aboutTitle')}</h2>
          
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-primary/10 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Leaf className="h-12 w-12 text-primary float-animation" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">{getText('aboutDesc1')}</h3>
              <p className="text-muted-foreground leading-relaxed">{getText('aboutDesc1Detail')}</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Users className="h-12 w-12 text-primary float-animation" style={{ animationDelay: '1s' }} />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">{getText('aboutDesc2')}</h3>
              <p className="text-muted-foreground leading-relaxed">{getText('aboutDesc2Detail')}</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <MessageCircle className="h-12 w-12 text-primary float-animation" style={{ animationDelay: '2s' }} />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">{getText('aboutDesc3')}</h3>
              <p className="text-muted-foreground leading-relaxed">{getText('aboutDesc3Detail')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-primary mb-16 fade-in">{getText('contactTitle')}</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8 bg-card rounded-2xl shadow-lg border border-border">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-card-foreground mb-3 text-xl">{getText('contactHelpline')}</h3>
              <p className="text-muted-foreground text-lg mb-2">1800-180-1551</p>
              <p className="text-sm text-muted-foreground">{getText('contactAvailable')}</p>
            </div>
            
            <div className="text-center p-8 bg-card rounded-2xl shadow-lg border border-border">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-card-foreground mb-3 text-xl">{getText('contactEmail')}</h3>
              <p className="text-muted-foreground text-lg mb-2">support@agroguardian.ai</p>
              <p className="text-sm text-muted-foreground">{getText('contactResponse')}</p>
            </div>
            
            <div className="text-center p-8 bg-card rounded-2xl shadow-lg border border-border">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-card-foreground mb-3 text-xl">{getText('contactLocation')}</h3>
              <p className="text-muted-foreground text-lg mb-2">{getText('contactPlace')}</p>
              <p className="text-sm text-muted-foreground">{getText('contactCountry')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="bg-white/20 p-3 rounded-full">
                <Leaf className="h-8 w-8 text-white float-animation" />
              </div>
              <h3 className="text-3xl font-bold">{getText('title')}</h3>
            </div>
            <p className="text-green-200 text-lg max-w-2xl mx-auto leading-relaxed">
              {getText('footerDesc')}
            </p>
          </div>
          
          <div className="border-t border-white/20 pt-8">
            <p className="text-center text-green-300 flex items-center justify-center space-x-2">
              <span>{getText('footerCopy')}</span>
              <Heart className="h-4 w-4 text-red-400 bounce-gentle" />
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AgroGuardianAI;
