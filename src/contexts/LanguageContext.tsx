import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'english' | 'hindi' | 'gujarati';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  getText: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('english');

  const texts: Record<string, Record<string, string>> = {
    english: {
      title: 'AgroGuardian AI',
      subtitle: 'Nurturing Tomorrow\'s Harvest',
      description: 'Empowering farmers with cutting-edge AI technology to detect crop diseases, optimize soil health, and build sustainable agricultural practices for a better tomorrow.',
      homeNav: 'Home',
      aboutNav: 'About Us',
      contactNav: 'Contact',
      schemesNav: 'Government Schemes',
      vendorsNav: 'Medicine Vendors',
  howToTitle: 'How to Use - Simple Steps for Farmers',
    step1Title: 'Step 1: Take a clear photo of your crop using your phone or upload an existing image from your gallery. Ensure the affected area is visible for accurate analysis.',
    step1Desc: '',
    step2Title: 'Step 2: Our advanced AI system will automatically analyze the uploaded image to detect any signs of disease, pest, or nutrient deficiency.',
    step2Desc: '',
    step3Title: 'Step 3: Instantly receive a detailed report with the diagnosis, severity, and confidence level, along with actionable recommendations tailored to your crop.',
    step3Desc: '',
    step4Title: 'Step 4: Follow the provided recommendations and treatment methods to protect and improve your crop health. You can also connect with vendors or access government schemes.',
    step4Desc: '',
      analysisTitle: 'AI Crop Analysis & Expert Chat',
      imageSection: 'Capture or Upload Your Crop Image',
      chatSection: 'AI Farming Assistant',
      captureBtn: 'Take Photo',
      uploadBtn: 'Upload Image',
      analyzing: 'Analyzing your crop...',
      placeholder: 'Ask me about your crops, diseases, or farming techniques...',
      greeting: 'Hello! I am your AI farming assistant.',
      subGreeting: 'Upload a crop image or ask me any farming questions!',
      aboutTitle: 'About AgroGuardian AI',
      contactTitle: 'Get In Touch With Us',
      schemesTitle: 'Government Schemes for Farmers',
      vendorsTitle: 'Trusted Medicine Vendors',
      footerDesc: 'Empowering farmers with intelligent agricultural solutions',
      footerCopy: '© 2025 AgroGuardian AI. Made with ❤️ for farmers.',
      cropLossReduction: 'Crop Loss Reduction',
      chemicalReduction: 'Chemical Use Reduction', 
      incomeIncrease: 'Income Increase',
      nextStep: 'Next Step',
      prevStep: 'Previous Step',
      // AI Response messages
      aiGreeting: 'Hello! I am your AI farming assistant. How can I help you today?',
      aiCropAnalysis: 'I\'ve analyzed your crop image. Here are my findings:',
      aiHealthyCrop: 'Your crop appears to be healthy! Here are some maintenance tips:',
      aiDiseaseDetected: 'I\'ve detected some issues with your crop. Here\'s what I found:',
      aiRecommendations: 'Here are my recommendations for better crop health:',
      aiSoilAdvice: 'Based on your crop condition, here\'s some soil management advice:',
      aiWateringTips: 'Here are some watering and irrigation tips for your crop:',
      aiFertilizerAdvice: 'Here\'s some fertilizer and nutrition advice:',
      aiPestControl: 'Here are some pest control recommendations:',
      aiWeatherAdvice: 'Based on current conditions, here\'s some weather-related advice:',
      aiGeneralFarming: 'Here\'s some general farming advice for better yields:',
      aiOrganicTips: 'Here are some organic farming tips for sustainable agriculture:',
      aiTechnologyTips: 'Here are some modern farming technology recommendations:',
      aiMarketAdvice: 'Here\'s some advice for better market returns:',
      aiStorageTips: 'Here are some post-harvest storage tips:',
      aiEquipmentAdvice: 'Here\'s some advice on farming equipment and tools:',
      aiCropRotation: 'Here are some crop rotation and planning tips:',
      aiSeasonalAdvice: 'Here\'s some seasonal farming advice:',
      aiEmergencyHelp: 'Here\'s some emergency crop care advice:'
    },
    hindi: {
      title: 'एग्रोगार्डियन एआई',
      subtitle: 'कल की फसल का पोषण',
      description: 'किसानों को अत्याधुनिक AI तकनीक से सशक्त बनाना, फसल रोगों की पहचान करना, मिट्टी के स्वास्थ्य को बेहतर बनाना और बेहतर कल के लिए टिकाऊ कृषि प्रथाओं का निर्माण करना।',
      homeNav: 'होम',
      aboutNav: 'हमारे बारे में',
      contactNav: 'संपर्क',
      schemesNav: 'सरकारी योजनाएं',
      vendorsNav: 'दवा विक्रेता',
  howToTitle: 'कैसे उपयोग करें - किसानों के लिए सरल चरण',
    step1Title: 'चरण 1: अपने फोन से अपनी फसल का स्पष्ट फोटो लें या गैलरी से पहले से मौजूद छवि अपलोड करें। सटीक विश्लेषण के लिए प्रभावित क्षेत्र दिखाई देना चाहिए।',
    step1Desc: '',
    step2Title: 'चरण 2: हमारी उन्नत एआई प्रणाली अपलोड की गई छवि का स्वचालित रूप से विश्लेषण करेगी और किसी भी रोग, कीट या पोषक तत्व की कमी का पता लगाएगी।',
    step2Desc: '',
    step3Title: 'चरण 3: तुरंत आपको विस्तृत रिपोर्ट मिलेगी जिसमें निदान, गंभीरता और विश्वास स्तर के साथ आपकी फसल के लिए विशेष सिफारिशें होंगी।',
    step3Desc: '',
    step4Title: 'चरण 4: दी गई सिफारिशों और उपचार विधियों का पालन करें, अपनी फसल के स्वास्थ्य की रक्षा करें और सुधारें। आप विक्रेताओं से जुड़ सकते हैं या सरकारी योजनाओं का लाभ ले सकते हैं।',
    step4Desc: '',
      analysisTitle: 'AI फसल विश्लेषण और विशेषज्ञ चैट',
      imageSection: 'अपनी फसल की छवि कैप्चर या अपलोड करें',
      chatSection: 'AI कृषि सहायक',
      captureBtn: 'फोटो लें',
      uploadBtn: 'छवि अपलोड करें',
      analyzing: 'आपकी फसल का विश्लेषण कर रहे हैं...',
      placeholder: 'अपनी फसलों, बीमारियों या खेती की तकनीकों के बारे में पूछें...',
      greeting: 'नमस्ते! मैं आपका AI कृषि सहायक हूं।',
      subGreeting: 'फसल की छवि अपलोड करें या मुझसे कोई भी कृषि प्रश्न पूछें!',
      aboutTitle: 'एग्रोगार्डियन AI के बारे में',
      contactTitle: 'हमसे संपर्क करें',
      schemesTitle: 'किसानों के लिए सरकारी योजनाएं',
      vendorsTitle: 'विश्वसनीय दवा विक्रेता',
      footerDesc: 'बुद्धिमान कृषि समाधानों से किसानों को सशक्त बनाना',
      footerCopy: '© 2025 एग्रोगार्डियन AI। किसानों के लिए ❤️ के साथ बनाया गया।',
      cropLossReduction: 'फसल हानि में कमी',
      chemicalReduction: 'रसायन के उपयोग में कमी',
      incomeIncrease: 'आय में वृद्धि',
      nextStep: 'अगला कदम',
      prevStep: 'पिछला कदम',
      // AI Response messages in Hindi
      aiGreeting: 'नमस्ते! मैं आपका AI कृषि सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?',
      aiCropAnalysis: 'मैंने आपकी फसल की छवि का विश्लेषण किया है। यहाँ मेरे निष्कर्ष हैं:',
      aiHealthyCrop: 'आपकी फसल स्वस्थ दिख रही है! यहाँ कुछ रखरखाव के सुझाव हैं:',
      aiDiseaseDetected: 'मैंने आपकी फसल में कुछ समस्याएं पाई हैं। यहाँ मैंने क्या पाया:',
      aiRecommendations: 'बेहतर फसल स्वास्थ्य के लिए मेरे सुझाव:',
      aiSoilAdvice: 'आपकी फसल की स्थिति के आधार पर, यहाँ कुछ मिट्टी प्रबंधन सलाह:',
      aiWateringTips: 'आपकी फसल के लिए कुछ पानी और सिंचाई के सुझाव:',
      aiFertilizerAdvice: 'कुछ उर्वरक और पोषण सलाह:',
      aiPestControl: 'कुछ कीट नियंत्रण सिफारिशें:',
      aiWeatherAdvice: 'वर्तमान स्थितियों के आधार पर, कुछ मौसम संबंधी सलाह:',
      aiGeneralFarming: 'बेहतर उपज के लिए कुछ सामान्य कृषि सलाह:',
      aiOrganicTips: 'टिकाऊ कृषि के लिए कुछ जैविक खेती के सुझाव:',
      aiTechnologyTips: 'कुछ आधुनिक कृषि तकनीक सिफारिशें:',
      aiMarketAdvice: 'बेहतर बाजार रिटर्न के लिए कुछ सलाह:',
      aiStorageTips: 'कुछ फसल के बाद भंडारण के सुझाव:',
      aiEquipmentAdvice: 'कृषि उपकरण और औजारों पर कुछ सलाह:',
      aiCropRotation: 'कुछ फसल रोटेशन और योजना के सुझाव:',
      aiSeasonalAdvice: 'कुछ मौसमी कृषि सलाह:',
      aiEmergencyHelp: 'कुछ आपातकालीन फसल देखभाल सलाह:'
    },
    gujarati: {
      title: 'એગ્રોગાર્ડિયન AI',
      subtitle: 'આવતીકાલની ફસલનું પોષણ',
      description: 'કિસાનોને અત્યાધુનિક AI ટેકનોલોજી સાથે સશક્ત બનાવવું, પાકના રોગોની ઓળખ કરવી, માટીના સ્વાસ્થ્યને વધારવું અને વધુ સારા આવતીકાલ માટે ટકાઉ કૃષિ પ્રથાઓનું નિર્માણ કરવું.',
      homeNav: 'હોમ',
      aboutNav: 'અમારા વિશે',
      contactNav: 'સંપર્ક',
      schemesNav: 'સરકારી યોજનાઓ',
      vendorsNav: 'દવા વિક્રેતાઓ',
  howToTitle: 'કેવી રીતે વાપરવું - ખેડૂતો માટે સરળ પગલાં',
    step1Title: 'પગલું 1: તમારા ફોનથી તમારા પાકનો સ્પષ્ટ ફોટો લો અથવા ગેલેરીમાંથી પહેલેથી રહેલી છબી અપલોડ કરો. યોગ્ય વિશ્લેષણ માટે અસરગ્રસ્ત વિસ્તાર દેખાય તે જરૂરી છે.',
    step1Desc: '',
    step2Title: 'પગલું 2: અમારી અદ્યતન એઆઈ સિસ્ટમ આપમેળે અપલોડ કરેલી છબીનું વિશ્લેષણ કરશે અને રોગ, જીવાત અથવા પોષક તત્વોની ઉણપ શોધશે.',
    step2Desc: '',
    step3Title: 'પગલું 3: તરત જ તમને વિગતવાર રિપોર્ટ મળશે જેમાં નિદાન, ગંભીરતા અને વિશ્વાસસ્તર સાથે તમારા પાક માટે ખાસ ભલામણો મળશે.',
    step3Desc: '',
    step4Title: 'પગલું 4: આપેલ ભલામણો અને સારવાર પદ્ધતિઓ અનુસરો, પાકના આરોગ્યને સુરક્ષિત અને સુધારો. તમે વધુ મદદ માટે ચેટ કરી શકો છો, વિક્રેતાઓ સાથે જોડાઈ શકો છો અથવા સરકારી યોજનાઓ મેળવી શકો છો.',
    step4Desc: '',
      analysisTitle: 'AI પાક વિશ્લેષણ અને નિષ્ણાત ચેટ',
      imageSection: 'તમારા પાકની છબી કૅપ્ચર અથવા અપલોડ કરો',
      chatSection: 'AI કૃષિ સહાયક',
      captureBtn: 'ફોટો લો',
      uploadBtn: 'છબી અપલોડ કરો',
      analyzing: 'તમારા પાકનું વિશ્લેષણ કરી રહ્યાં છીએ...',
      placeholder: 'તમારા પાકો, બીમારીઓ અથવા ખેતીની તકનીકો વિશે પૂછો...',
      greeting: 'નમસ્તે! હું તમારો AI કૃષિ સહાયક છું.',
      subGreeting: 'પાકની છબી અપલોડ કરો અથવા મને કોઈપણ કૃષિ પ્રશ્નો પૂછો!',
      aboutTitle: 'એગ્રોગાર્ડિયન AI વિશે',
      contactTitle: 'અમારી સાથે સંપર્ક કરો',
      schemesTitle: 'કિસાનો માટે સરકારી યોજનાઓ',
      vendorsTitle: 'વિશ્વસનીય દવા વિક્રેતાઓ',
      footerDesc: 'બુદ્ધિશાળી કૃષિ ઉકેલો સાથે કિસાનોને સશક્ત બનાવવા',
      footerCopy: '© 2025 એગ્રોગાર્ડિયન AI. કિસાનો માટે ❤️ સાથે બનાવેલ.',
      cropLossReduction: 'પાક નુકસાનમાં ઘટાડો',
      chemicalReduction: 'રસાયણના ઉપયોગમાં ઘટાડો',
      incomeIncrease: 'આવકમાં વધારો',
      nextStep: 'આગળનું પગલું',
      prevStep: 'પાછલું પગલું',
      // AI Response messages in Gujarati
      aiGreeting: 'નમસ્તે! હું તમારો AI કૃષિ સહાયક છું. આજે હું તમારી કેવી રીતે મદદ કરી શકું છું?',
      aiCropAnalysis: 'મેં તમારા પાકની છબીનું વિશ્લેષણ કર્યું છે. અહીં મારા નિષ્કર્ષો છે:',
      aiHealthyCrop: 'તમારો પાક સ્વસ્થ દેખાય છે! અહીં કેટલાક જાળવણીના સૂચનો છે:',
      aiDiseaseDetected: 'મેં તમારા પાકમાં કેટલીક સમસ્યાઓ શોધી છે. અહીં મેં શું શોધ્યું:',
      aiRecommendations: 'સારા પાક સ્વાસ્થ્ય માટે મારા સૂચનો:',
      aiSoilAdvice: 'તમારા પાકની સ્થિતિના આધારે, અહીં કેટલીક માટી વ્યવસ્થાપન સલાહ:',
      aiWateringTips: 'તમારા પાક માટે કેટલાક પાણી અને સિંચાઈના સૂચનો:',
      aiFertilizerAdvice: 'કેટલીક ખાતર અને પોષણ સલાહ:',
      aiPestControl: 'કેટલીક કીડા નિયંત્રણ ભલામણો:',
      aiWeatherAdvice: 'વર્તમાન સ્થિતિઓના આધારે, કેટલીક હવામાન સંબંધિત સલાહ:',
      aiGeneralFarming: 'સારા ઉત્પાદન માટે કેટલીક સામાન્ય કૃષિ સલાહ:',
      aiOrganicTips: 'ટકાઉ કૃષિ માટે કેટલાક જૈવિક ખેતીના સૂચનો:',
      aiTechnologyTips: 'કેટલાક આધુનિક કૃષિ તકનીક ભલામણો:',
      aiMarketAdvice: 'સારા બજાર વળતર માટે કેટલીક સલાહ:',
      aiStorageTips: 'કેટલાક ફસલ પછી સંગ્રહના સૂચનો:',
      aiEquipmentAdvice: 'કૃષિ સાધનો અને સાધનો પર કેટલીક સલાહ:',
      aiCropRotation: 'કેટલાક પાક પરિભ્રમણ અને આયોજનના સૂચનો:',
      aiSeasonalAdvice: 'કેટલીક ઋતુગત કૃષિ સલાહ:',
      aiEmergencyHelp: 'કેટલીક આકસ્મિક પાક સંભાળ સલાહ:'
    }
  };

  const getText = (key: string): string => {
    return texts[language]?.[key] || texts.english[key] || key;
  };

  const value = {
    language,
    setLanguage,
    getText
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
