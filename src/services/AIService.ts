import { Language } from '../contexts/LanguageContext';

export interface CropAnalysis {
  crop: string;
  condition: string;
  severity: 'Low' | 'Moderate' | 'High';
  confidence: number;
  symptoms: string[];
  recommendations: string[];
  immediateActions: string[];
  nutritionAdvice: string[];
}

export interface AIResponse {
  type: 'analysis' | 'chat' | 'greeting';
  content: string;
  crop?: string;
  condition?: string;
}

const cropDatabase = {
  wheat: {
    name: { english: 'Wheat', hindi: 'गेहूं', gujarati: 'ઘઉં' },
    diseases: [
      {
        name: { english: 'Rust Disease', hindi: 'रस्ट रोग', gujarati: 'રસ્ટ રોગ' },
        symptoms: { english: 'Orange-brown pustules on leaves', hindi: 'पत्तियों पर नारंगी-भूरे रंग के फोड़े', gujarati: 'પાન પર નારંગી-ભૂરા રંગના ફોડા' },
        severity: 'Moderate' as const,
        treatment: { english: 'Apply fungicide and improve air circulation', hindi: 'फंगीसाइड लगाएं और हवा का प्रवाह बेहतर करें', gujarati: 'ફંગાઇસાઇડ લગાવો અને હવાનો પ્રવાહ સુધારો' }
      },
      {
        name: { english: 'Powdery Mildew', hindi: 'पाउडरी मिल्ड्यू', gujarati: 'પાઉડરી મિલ્ડ્યુ' },
        symptoms: { english: 'White powdery spots on leaves', hindi: 'पत्तियों पर सफेद पाउडर जैसे धब्बे', gujarati: 'પાન પર સફેદ પાઉડર જેવા ડાઘા' },
        severity: 'Low' as const,
        treatment: { english: 'Apply sulfur-based fungicide', hindi: 'सल्फर आधारित फंगीसाइड लगाएं', gujarati: 'સલ્ફર આધારિત ફંગાઇસાઇડ લગાવો' }
      }
    ]
  },
  rice: {
    name: { english: 'Rice', hindi: 'चावल', gujarati: 'ચોખા' },
    diseases: [
      {
        name: { english: 'Bacterial Blight', hindi: 'बैक्टीरियल ब्लाइट', gujarati: 'બેક્ટેરિયલ બ્લાઇટ' },
        symptoms: { english: 'Yellow-brown lesions on leaves', hindi: 'पत्तियों पर पीले-भूरे रंग के घाव', gujarati: 'પાન પર પીળા-ભૂરા રંગના ઘા' },
        severity: 'High' as const,
        treatment: { english: 'Remove affected plants and apply copper-based bactericide', hindi: 'प्रभावित पौधों को हटाएं और तांबा आधारित बैक्टीरिसाइड लगाएं', gujarati: 'પ્રભાવિત છોડ દૂર કરો અને તાંબા આધારિત બેક્ટેરિસાઇડ લગાવો' }
      },
      {
        name: { english: 'Rice Blast', hindi: 'राइस ब्लास्ट', gujarati: 'રાઇસ બ્લાસ્ટ' },
        symptoms: { english: 'Diamond-shaped lesions on leaves', hindi: 'पत्तियों पर हीरे के आकार के घाव', gujarati: 'પાન પર હીરાના આકારના ઘા' },
        severity: 'High' as const,
        treatment: { english: 'Apply systemic fungicide and maintain proper spacing', hindi: 'सिस्टमिक फंगीसाइड लगाएं और उचित दूरी बनाए रखें', gujarati: 'સિસ્ટમિક ફંગાઇસાઇડ લગાવો અને યોગ્ય અંતર જાળવો' }
      }
    ]
  },
  cotton: {
    name: { english: 'Cotton', hindi: 'कपास', gujarati: 'કપાસ' },
    diseases: [
      {
        name: { english: 'Boll Rot', hindi: 'बोल रोट', gujarati: 'બોલ રોટ' },
        symptoms: { english: 'Dark brown spots on cotton bolls', hindi: 'कपास के बोल पर गहरे भूरे रंग के धब्बे', gujarati: 'કપાસના બોલ પર ઘેરા ભૂરા રંગના ડાઘા' },
        severity: 'Moderate' as const,
        treatment: { english: 'Improve drainage and apply fungicide', hindi: 'जल निकासी बेहतर करें और फंगीसाइड लगाएं', gujarati: 'પાણીનો નિકાસ સુધારો અને ફંગાઇસાઇડ લગાવો' }
      }
    ]
  },
  sugarcane: {
    name: { english: 'Sugarcane', hindi: 'गन्ना', gujarati: 'શેરડી' },
    diseases: [
      {
        name: { english: 'Red Rot', hindi: 'रेड रोट', gujarati: 'રેડ રોટ' },
        symptoms: { english: 'Reddish internal discoloration of stalks', hindi: 'तने के अंदर लाल रंग का बदलाव', gujarati: 'દાંડીની અંદર લાલ રંગનો ફેરફાર' },
        severity: 'High' as const,
        treatment: { english: 'Remove infected stalks and apply systemic fungicide', hindi: 'संक्रमित तने हटाएं और सिस्टमिक फंगीसाइड लगाएं', gujarati: 'સંક્રમિત દાંડી દૂર કરો અને સિસ્ટમિક ફંગાઇસાઇડ લગાવો' }
      }
    ]
  },
  maize: {
    name: { english: 'Maize', hindi: 'मक्का', gujarati: 'મકાઈ' },
    diseases: [
      {
        name: { english: 'Corn Smut', hindi: 'कॉर्न स्मट', gujarati: 'કોર્ન સ્મટ' },
        symptoms: { english: 'Large grayish-black galls on ears', hindi: 'भुट्टे पर बड़े भूरे-काले रंग के गांठ', gujarati: 'ભૂંટા પર મોટા ભૂરા-કાળા રંગના ગાંઠ' },
        severity: 'Moderate' as const,
        treatment: { english: 'Remove galls before they burst and apply fungicide', hindi: 'गांठ फटने से पहले हटाएं और फंगीसाइड लगाएं', gujarati: 'ગાંઠ ફાટતા પહેલા દૂર કરો અને ફંગાઇસાઇડ લગાવો' }
      }
    ]
  },
  potato: {
    name: { english: 'Potato', hindi: 'आलू', gujarati: 'બટાટા' },
    diseases: [
      {
        name: { english: 'Late Blight', hindi: 'लेट ब्लाइट', gujarati: 'લેટ બ્લાઇટ' },
        symptoms: { english: 'Dark brown lesions on leaves and stems', hindi: 'पत्तियों और तनों पर गहरे भूरे रंग के घाव', gujarati: 'પાન અને દાંડી પર ઘેરા ભૂરા રંગના ઘા' },
        severity: 'High' as const,
        treatment: { english: 'Apply copper-based fungicide and improve ventilation', hindi: 'तांबा आधारित फंगीसाइड लगाएं और वेंटिलेशन बेहतर करें', gujarati: 'તાંબા આધારિત ફંગાઇસાઇડ લગાવો અને હવાનો પ્રવાહ સુધારો' }
      }
    ]
  },
  tomato: {
    name: { english: 'Tomato', hindi: 'टमाटर', gujarati: 'ટામેટા' },
    diseases: [
      {
        name: { english: 'Early Blight', hindi: 'अर्ली ब्लाइट', gujarati: 'અર્લી બ્લાઇટ' },
        symptoms: { english: 'Dark brown spots with rings on leaves', hindi: 'पत्तियों पर छल्लों के साथ गहरे भूरे रंग के धब्बे', gujarati: 'પાન પર રિંગ સાથે ઘેરા ભૂરા રંગના ડાઘા' },
        severity: 'Moderate' as const,
        treatment: { english: 'Remove affected leaves and apply copper-based fungicide', hindi: 'प्रभावित पत्तियां हटाएं और तांबा आधारित फंगीसाइड लगाएं', gujarati: 'પ્રભાવિત પાન દૂર કરો અને તાંબા આધારિત ફંગાઇસાઇડ લગાવો' }
      }
    ]
  },
  healthy: {
    name: { english: 'Healthy Crop', hindi: 'स्वस्थ फसल', gujarati: 'સ્વસ્થ પાક' },
    maintenance: {
      english: [
        'Maintain regular watering schedule',
        'Apply balanced fertilizer monthly',
        'Monitor for early signs of pests',
        'Ensure proper spacing between plants',
        'Keep soil pH between 6.0-7.0'
      ],
      hindi: [
        'नियमित पानी देने का कार्यक्रम बनाए रखें',
        'मासिक रूप से संतुलित उर्वरक लगाएं',
        'कीटों के शुरुआती संकेतों की निगरानी करें',
        'पौधों के बीच उचित दूरी सुनिश्चित करें',
        'मिट्टी का pH 6.0-7.0 के बीच रखें'
      ],
      gujarati: [
        'નિયમિત પાણી આપવાનો કાર્યક્રમ જાળવો',
        'માસિક સંતુલિત ખાતર લગાવો',
        'કીડાઓના પ્રારંભિક સંકેતોની દેખરેખ રાખો',
        'છોડ વચ્ચે યોગ્ય અંતર સુનિશ્ચિત કરો',
        'માટીનો pH 6.0-7.0 વચ્ચે રાખો'
      ]
    }
  }
};

const chatResponses = {
  english: [
    {
      category: 'soil',
      responses: [
        'For better soil health, consider adding organic compost and maintaining proper pH levels. Regular soil testing can help identify nutrient deficiencies.',
        'Your soil appears to need more organic matter. Consider adding vermicompost or farmyard manure to improve soil structure.',
        'Based on your crop, I recommend testing soil pH and adjusting it to the optimal range for your specific crop type.'
      ]
    },
    {
      category: 'watering',
      responses: [
        'Proper irrigation is crucial for crop health. Water early in the morning to reduce evaporation and fungal growth.',
        'Consider implementing drip irrigation for water efficiency and to prevent leaf diseases.',
        'Monitor soil moisture regularly. Overwatering can be as harmful as underwatering for most crops.'
      ]
    },
    {
      category: 'fertilizer',
      responses: [
        'A balanced NPK fertilizer (10-10-10) is generally good for most crops. Apply according to soil test recommendations.',
        'Consider organic fertilizers like neem cake or bone meal for sustainable farming practices.',
        'Split application of fertilizers throughout the growing season is more effective than single heavy application.'
      ]
    },
    {
      category: 'pest_control',
      responses: [
        'Integrated Pest Management (IPM) combines biological, cultural, and chemical methods for effective pest control.',
        'Neem-based products are effective natural pesticides that don\'t harm beneficial insects.',
        'Regular monitoring and early detection are key to successful pest management.'
      ]
    },
    {
      category: 'general',
      responses: [
        'Crop rotation helps prevent soil-borne diseases and improves soil fertility naturally.',
        'Mulching helps retain soil moisture and suppresses weed growth.',
        'Regular monitoring and record-keeping help track crop performance and identify patterns.'
      ]
    }
  ],
  hindi: [
    {
      category: 'soil',
      responses: [
        'बेहतर मिट्टी स्वास्थ्य के लिए, जैविक खाद जोड़ने और उचित pH स्तर बनाए रखने पर विचार करें। नियमित मिट्टी परीक्षण पोषक तत्वों की कमी की पहचान करने में मदद कर सकता है।',
        'आपकी मिट्टी को अधिक जैविक पदार्थ की आवश्यकता लग रही है। मिट्टी की संरचना में सुधार के लिए वर्मीकम्पोस्ट या गोबर की खाद जोड़ने पर विचार करें।',
        'आपकी फसल के आधार पर, मैं मिट्टी का pH परीक्षण करने और इसे आपकी विशिष्ट फसल प्रकार के लिए इष्टतम सीमा में समायोजित करने की सिफारिश करता हूं।'
      ]
    },
    {
      category: 'watering',
      responses: [
        'उचित सिंचाई फसल स्वास्थ्य के लिए महत्वपूर्ण है। वाष्पीकरण और फंगल विकास को कम करने के लिए सुबह जल्दी पानी दें।',
        'पानी की दक्षता और पत्ती रोगों को रोकने के लिए ड्रिप सिंचाई लागू करने पर विचार करें।',
        'मिट्टी की नमी की नियमित निगरानी करें। अधिक पानी देना अधिकांश फसलों के लिए कम पानी देने जितना हानिकारक हो सकता है।'
      ]
    },
    {
      category: 'fertilizer',
      responses: [
        'संतुलित NPK उर्वरक (10-10-10) अधिकांश फसलों के लिए आमतौर पर अच्छा होता है। मिट्टी परीक्षण सिफारिशों के अनुसार लगाएं।',
        'टिकाऊ खेती प्रथाओं के लिए नीम केक या हड्डी का भोजन जैसे जैविक उर्वरकों पर विचार करें।',
        'बढ़ते मौसम के दौरान उर्वरकों का विभाजित अनुप्रयोग एकल भारी अनुप्रयोग की तुलना में अधिक प्रभावी होता है।'
      ]
    },
    {
      category: 'pest_control',
      responses: [
        'एकीकृत कीट प्रबंधन (IPM) प्रभावी कीट नियंत्रण के लिए जैविक, सांस्कृतिक और रासायनिक विधियों को जोड़ता है।',
        'नीम आधारित उत्पाद प्रभावी प्राकृतिक कीटनाशक हैं जो लाभकारी कीटों को नुकसान नहीं पहुंचाते।',
        'नियमित निगरानी और शीघ्र पता लगाना सफल कीट प्रबंधन की कुंजी है।'
      ]
    },
    {
      category: 'general',
      responses: [
        'फसल रोटेशन मिट्टी जनित रोगों को रोकने और मिट्टी की उर्वरता को स्वाभाविक रूप से बेहतर बनाने में मदद करता है।',
        'मल्चिंग मिट्टी की नमी बनाए रखने और खरपतवार के विकास को दबाने में मदद करती है।',
        'नियमित निगरानी और रिकॉर्ड रखने से फसल प्रदर्शन को ट्रैक करने और पैटर्न की पहचान करने में मदद मिलती है।'
      ]
    }
  ],
  gujarati: [
    {
      category: 'soil',
      responses: [
        'સારા માટી સ્વાસ્થ્ય માટે, જૈવિક કમ્પોસ્ટ ઉમેરવા અને યોગ્ય pH સ્તર જાળવવા પર વિચાર કરો. નિયમિત માટી પરીક્ષણ પોષક તત્વોની ઊણપ ઓળખવામાં મદદ કરી શકે છે.',
        'તમારી માટીને વધુ જૈવિક પદાર્થની જરૂરિયાત લાગે છે. માટીની રચના સુધારવા માટે વર્મીકમ્પોસ્ટ અથવા ફાર્મયાર્ડ ખાતર ઉમેરવા પર વિચાર કરો.',
        'તમારા પાકના આધારે, હું માટીનો pH પરીક્ષણ કરવાની અને તેને તમારા ચોક્કસ પાક પ્રકાર માટે શ્રેષ્ઠ શ્રેણીમાં સમાયોજિત કરવાની ભલામણ કરું છું.'
      ]
    },
    {
      category: 'watering',
      responses: [
        'યોગ્ય સિંચાઈ પાક સ્વાસ્થ્ય માટે મહત્વપૂર્ણ છે. બાષ્પીકરણ અને ફંગલ વૃદ્ધિ ઘટાડવા માટે સવારે વહેલા પાણી આપો.',
        'પાણીની કાર્યક્ષમતા અને પાન રોગો રોકવા માટે ડ્રિપ સિંચાઈ લાગુ કરવા પર વિચાર કરો.',
        'માટીની ભેજની નિયમિત દેખરેખ રાખો. વધુ પાણી આપવું મોટાભાગના પાકો માટે ઓછું પાણી આપવા જેટલું હાનિકારક હોઈ શકે છે.'
      ]
    },
    {
      category: 'fertilizer',
      responses: [
        'સંતુલિત NPK ખાતર (10-10-10) મોટાભાગના પાકો માટે સામાન્ય રીતે સારું હોય છે. માટી પરીક્ષણ ભલામણો મુજબ લગાવો.',
        'ટકાઉ ખેતી પ્રથાઓ માટે નીમ કેક અથવા હાડકાનો ખોરાક જેવા જૈવિક ખાતરો પર વિચાર કરો.',
        'વધતા મોસમ દરમિયાન ખાતરોનો વિભાજિત ઉપયોગ એકલ ભારે ઉપયોગ કરતાં વધુ અસરકારક હોય છે.'
      ]
    },
    {
      category: 'pest_control',
      responses: [
        'એકીકૃત કીડા વ્યવસ્થાપન (IPM) અસરકારક કીડા નિયંત્રણ માટે જૈવિક, સાંસ્કૃતિક અને રાસાયણિક પદ્ધતિઓને જોડે છે.',
        'નીમ આધારિત ઉત્પાદનો અસરકારક કુદરતી કીડા મારનારા છે જે લાભકારી કીડાઓને નુકસાન નથી પહોંચાડતા.',
        'નિયમિત દેખરેખ અને વહેલી ઓળખ સફળ કીડા વ્યવસ્થાપનની ચાવી છે.'
      ]
    },
    {
      category: 'general',
      responses: [
        'પાક પરિભ્રમણ માટી જન્ય રોગો રોકવામાં અને માટીની ફળદ્રુપતા કુદરતી રીતે સુધારવામાં મદદ કરે છે.',
        'મલ્ચિંગ માટીની ભેજ જાળવવામાં અને ખરપતવાર વૃદ્ધિ દબાવવામાં મદદ કરે છે.',
        'નિયમિત દેખરેખ અને રેકોર્ડ રાખવાથી પાક પ્રદર્શન ટ્રૅક કરવામાં અને પેટર્ન ઓળખવામાં મદદ મળે છે.'
      ]
    }
  ]
};

export class AIService {
  static analyzeCrop(imageUrl: string, language: Language): Promise<CropAnalysis> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate AI analysis with diverse crop responses
        const crops = Object.keys(cropDatabase).filter(key => key !== 'healthy');
        const randomCrop = crops[Math.floor(Math.random() * crops.length)];
        const crop = cropDatabase[randomCrop as keyof typeof cropDatabase];
        
        // 70% chance of disease, 30% chance of healthy
        const hasDisease = Math.random() < 0.7;
        
        if (hasDisease && crop.diseases) {
          const disease = crop.diseases[Math.floor(Math.random() * crop.diseases.length)];
          resolve({
            crop: crop.name[language],
            condition: disease.name[language],
            severity: disease.severity,
            confidence: Math.floor(Math.random() * 20) + 80, // 80-99%
            symptoms: [disease.symptoms[language]],
            recommendations: [disease.treatment[language]],
            immediateActions: [
              language === 'english' ? 'Remove affected plant parts immediately' :
              language === 'hindi' ? 'प्रभावित पौधे के हिस्सों को तुरंत हटाएं' :
              'પ્રભાવિત છોડના ભાગો તરત જ દૂર કરો'
            ],
            nutritionAdvice: [
              language === 'english' ? 'Apply balanced fertilizer to strengthen plants' :
              language === 'hindi' ? 'पौधों को मजबूत करने के लिए संतुलित उर्वरक लगाएं' :
              'છોડને મજબૂત બનાવવા માટે સંતુલિત ખાતર લગાવો'
            ]
          });
        } else {
          // Healthy crop response
          const healthyCrop = cropDatabase.healthy;
          resolve({
            crop: crop.name[language],
            condition: healthyCrop.name[language],
            severity: 'Low',
            confidence: Math.floor(Math.random() * 10) + 90, // 90-99%
            symptoms: [],
            recommendations: healthyCrop.maintenance[language],
            immediateActions: [],
            nutritionAdvice: [
              language === 'english' ? 'Continue current maintenance practices' :
              language === 'hindi' ? 'वर्तमान रखरखाव प्रथाओं को जारी रखें' :
              'વર્તમાન જાળવણી પ્રથાઓ ચાલુ રાખો'
            ]
          });
        }
      }, 3000);
    });
  }

  static getChatResponse(userMessage: string, language: Language): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const responses = chatResponses[language];
        const categories = responses.map(r => r.category);
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const categoryResponses = responses.find(r => r.category === randomCategory)?.responses || [];
        const randomResponse = categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
        
        resolve(randomResponse);
      }, 1500);
    });
  }

  static getGreeting(language: Language): string {
    const greetings = {
      english: 'Hello! I am your AI farming assistant. How can I help you today?',
      hindi: 'नमस्ते! मैं आपका AI कृषि सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?',
      gujarati: 'નમસ્તે! હું તમારો AI કૃષિ સહાયક છું. આજે હું તમારી કેવી રીતે મદદ કરી શકું છું?'
    };
    return greetings[language];
  }
}
