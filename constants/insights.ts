export interface ProtocolInsight {
  id: string;
  triggerKeywords: string[];
  title: string;
  advice: string;
  type: 'warning' | 'tip' | 'info';
}

export const PROTOCOL_INSIGHTS: ProtocolInsight[] = [
  {
    id: 'bpc-tb-synergy',
    triggerKeywords: ['bpc-157', 'tb-500'],
    title: 'BPC/TB Synergy Detected',
    advice: 'Using BPC-157 and TB-500 together is a common "Wolverine Stack". BPC-157 helps with local inflammation and angiogenesis, while TB-500 aids in systemic cell migration. Ensure you are rotating sites for BPC if injecting near an injury.',
    type: 'tip'
  },
  {
    id: 'test-cycle-info',
    triggerKeywords: ['testosterone'],
    title: 'Intramuscular Protocol',
    advice: 'For Testosterone esters, intramuscular (IM) injection is standard. Common sites include the gluteus medius or vastus lateralis. Ensure you are using sterile technique and never re-use needles.',
    type: 'info'
  },
  {
    id: 'tirz-sema-warning',
    triggerKeywords: ['tirzepatide', 'semaglutide'],
    title: 'GLP-1 Duplicate Warning',
    advice: 'You have both Tirzepatide and Semaglutide in your stack. Both are GLP-1 receptor agonists. Combining them may significantly increase the risk of gastrointestinal side effects like nausea or gastroparesis. Consult a professional.',
    type: 'warning'
  },
  {
    id: 'cjc-ipa-timing',
    triggerKeywords: ['cjc-1295', 'ipamorelin'],
    title: 'Secretagogue Timing',
    advice: 'CJC-1295 and Ipamorelin are best taken on an empty stomach (at least 2-3 hours after your last meal) and right before bed to maximize the natural growth hormone pulse during sleep.',
    type: 'tip'
  },
  {
    id: 'ghk-cu-irritation',
    triggerKeywords: ['ghk-cu'],
    title: 'GHK-Cu Site Irritation',
    advice: 'GHK-Cu is known to cause "stinging" or post-injection pain (PIP). Injecting into the upper glute or diluting with a bit more BAC water can sometimes help mitigate this discomfort.',
    type: 'tip'
  },
  {
    id: 'oral-liver-support',
    triggerKeywords: ['pill', 'oral'],
    title: 'Oral Medication Tip',
    advice: 'For any oral medications or supplements, ensure you are staying hydrated. If taking any performance-enhancing orals, consider adding liver support like TUDCA or NAC to your daily routine.',
    type: 'info'
  },
  {
    id: 'melanotan-nausea',
    triggerKeywords: ['melanotan'],
    title: 'Melanotan Protocol',
    advice: 'Melanotan II can cause immediate nausea and facial flushing. Starting with a very low "micro-dose" and taking it right before bed can help you sleep through the initial side effects.',
    type: 'tip'
  }
];

export const GENERAL_INSIGHTS = [
  "Always ensure your BAC water is fresh (discard 28 days after opening).",
  "Wipe the top of the vial with a fresh alcohol prep pad before every draw.",
  "If you experience localized redness that is hot to the touch, discontinue use and consult a doctor.",
  "Consistency is key with peptide protocols—try to inject at the same time each day."
];

export const ON_TOPIC_KEYWORDS = [
  // Compounds
  'peptide', 'medication', 'pill', 'oral', 'semaglutide', 'tirzepatide', 'bpc-157', 'tb-500', 'testosterone', 
  'ghk-cu', 'cjc-1295', 'ipamorelin', 'tesamorelin', 'mots-c', 'aod-9604', 'hgh', 'melanotan', 'epitalon', 
  'igf-1', 'peg-mgf', 'kisspeptin', 'selank', 'semax', 'dihexa', 'dsip', 'nandrolone', 'trenbolone', 'boldenone',
  'masteron', 'primobolan', 'winstrol', 'steroid', 'hormone', 'glp-1',
  // Actions/Process
  'inject', 'injection', 'reconstitute', 'mix', 'water', 'bac', 'syringe', 'needle', 'dose', 'dosing', 'cycle', 
  'shelf life', 'expire', 'refrigerate', 'fridge', 'storage', 'log', 'draw', 'vial', 'math', 'calculator',
  // Anatomy/Health
  'abdomen', 'thigh', 'glute', 'arm', 'deltoid', 'site', 'skin', 'tissue', 'muscle', 'fat', 'stomach', 
  'liver', 'heart', 'sleep', 'inflammation', 'injury', 'recovery', 'nausea', 'flushing', 'pain', 'side effect',
  'interaction', 'synergy', 'stack', 'protocol'
];

export const OFF_TOPIC_RESPONSES = [
  "I'm sorry, I can only provide assistance regarding peptide protocols, medication schedules, and reconstitution math. Please ask a question related to your stack or protocol safety.",
  "That's outside my current knowledge base. I'm focused on helping you manage your protocol safely and effectively. Is there a specific compound or injection site you'd like to discuss?",
  "I'm here to act as your Protocol Advisor. To keep your guidance accurate, please stick to topics like peptide interactions, dosing schedules, or injection site rotation."
];
