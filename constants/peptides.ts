export type InjectionType = 'subcutaneous' | 'intramuscular' | 'none';

export interface RecommendedCompound {
  name: string;
  type: 'peptide' | 'med';
  injectionType: InjectionType;
  sites: string[];
  needleGauge: string;
  needleLength: string;
}

export const RECOMMENDED_COMPOUNDS: RecommendedCompound[] = [
  // Peptides
  { name: 'Semaglutide', type: 'peptide', injectionType: 'subcutaneous', sites: ['Abdomen', 'Thigh', 'Upper Arm'], needleGauge: '29G - 31G', needleLength: '5/16" - 1/2"' },
  { name: 'Tirzepatide', type: 'peptide', injectionType: 'subcutaneous', sites: ['Abdomen', 'Thigh', 'Upper Arm'], needleGauge: '29G - 31G', needleLength: '5/16" - 1/2"' },
  { name: 'Liraglutide', type: 'peptide', injectionType: 'subcutaneous', sites: ['Abdomen', 'Thigh', 'Upper Arm'], needleGauge: '29G - 31G', needleLength: '5/16" - 1/2"' },
  { name: 'Retatrutide', type: 'peptide', injectionType: 'subcutaneous', sites: ['Abdomen', 'Thigh', 'Upper Arm'], needleGauge: '29G - 31G', needleLength: '5/16" - 1/2"' },
  { name: 'BPC-157', type: 'peptide', injectionType: 'subcutaneous', sites: ['Abdomen', 'Near Injury Site'], needleGauge: '29G - 31G', needleLength: '5/16" - 1/2"' },
  { name: 'TB-500', type: 'peptide', injectionType: 'subcutaneous', sites: ['Abdomen'], needleGauge: '29G - 31G', needleLength: '5/16" - 1/2"' },
  { name: 'GHK-Cu', type: 'peptide', injectionType: 'subcutaneous', sites: ['Abdomen', 'Upper Glute'], needleGauge: '29G - 31G', needleLength: '5/16" - 1/2"' },
  { name: 'Sermorelin', type: 'peptide', injectionType: 'subcutaneous', sites: ['Abdomen'], needleGauge: '29G - 31G', needleLength: '5/16" - 1/2"' },
  { name: 'CJC-1295', type: 'peptide', injectionType: 'subcutaneous', sites: ['Abdomen'], needleGauge: '29G - 31G', needleLength: '5/16" - 1/2"' },
  { name: 'Ipamorelin', type: 'peptide', injectionType: 'subcutaneous', sites: ['Abdomen'], needleGauge: '29G - 31G', needleLength: '5/16" - 1/2"' },
  { name: 'Tesamorelin', type: 'peptide', injectionType: 'subcutaneous', sites: ['Abdomen'], needleGauge: '29G - 31G', needleLength: '5/16" - 1/2"' },
  { name: 'MOTS-c', type: 'peptide', injectionType: 'subcutaneous', sites: ['Abdomen'], needleGauge: '29G - 31G', needleLength: '5/16" - 1/2"' },
  { name: 'AOD-9604', type: 'peptide', injectionType: 'subcutaneous', sites: ['Abdomen'], needleGauge: '29G - 31G', needleLength: '5/16" - 1/2"' },
  { name: 'HGH Frag 176-191', type: 'peptide', injectionType: 'subcutaneous', sites: ['Abdomen'], needleGauge: '29G - 31G', needleLength: '5/16" - 1/2"' },
  { name: 'PT-141 (Bremelanotide)', type: 'peptide', injectionType: 'subcutaneous', sites: ['Abdomen', 'Thigh'], needleGauge: '29G - 31G', needleLength: '5/16" - 1/2"' },
  { name: 'Melanotan I', type: 'peptide', injectionType: 'subcutaneous', sites: ['Abdomen'], needleGauge: '29G - 31G', needleLength: '5/16" - 1/2"' },
  { name: 'Melanotan II', type: 'peptide', injectionType: 'subcutaneous', sites: ['Abdomen'], needleGauge: '29G - 31G', needleLength: '5/16" - 1/2"' },
  { name: 'Epitalon', type: 'peptide', injectionType: 'subcutaneous', sites: ['Abdomen'], needleGauge: '29G - 31G', needleLength: '5/16" - 1/2"' },
  { name: 'IGF-1 LR3', type: 'peptide', injectionType: 'subcutaneous', sites: ['Abdomen', 'Intramuscular'], needleGauge: '29G - 31G (SubQ) / 27G - 29G (IM)', needleLength: '5/16" - 1/2" (SubQ) / 1/2" - 1" (IM)' },
  { name: 'PEG-MGF', type: 'peptide', injectionType: 'subcutaneous', sites: ['Abdomen', 'Intramuscular'], needleGauge: '29G - 31G (SubQ) / 27G - 29G (IM)', needleLength: '5/16" - 1/2" (SubQ) / 1/2" - 1" (IM)' },
  { name: 'Kisspeptin-10', type: 'peptide', injectionType: 'subcutaneous', sites: ['Abdomen'], needleGauge: '29G - 31G', needleLength: '5/16" - 1/2"' },
  { name: 'Selank', type: 'peptide', injectionType: 'subcutaneous', sites: ['Abdomen'], needleGauge: '29G - 31G', needleLength: '5/16" - 1/2"' },
  { name: 'Semax', type: 'peptide', injectionType: 'subcutaneous', sites: ['Abdomen'], needleGauge: '29G - 31G', needleLength: '5/16" - 1/2"' },
  { name: 'Dihexa', type: 'peptide', injectionType: 'subcutaneous', sites: ['Abdomen'], needleGauge: '29G - 31G', needleLength: '5/16" - 1/2"' },
  { name: 'DSIP', type: 'peptide', injectionType: 'subcutaneous', sites: ['Abdomen'], needleGauge: '29G - 31G', needleLength: '5/16" - 1/2"' },

  // Steroids / Hormones
  { name: 'Testosterone Cypionate', type: 'med', injectionType: 'intramuscular', sites: ['Glute', 'Thigh', 'Deltoid'], needleGauge: '22G - 25G', needleLength: '1" - 1.5"' },
  { name: 'Testosterone Enanthate', type: 'med', injectionType: 'intramuscular', sites: ['Glute', 'Thigh', 'Deltoid'], needleGauge: '22G - 25G', needleLength: '1" - 1.5"' },
  { name: 'Testosterone Propionate', type: 'med', injectionType: 'intramuscular', sites: ['Glute', 'Thigh', 'Deltoid'], needleGauge: '22G - 25G', needleLength: '1" - 1.5"' },
  { name: 'Testosterone Suspension', type: 'med', injectionType: 'intramuscular', sites: ['Glute', 'Thigh', 'Deltoid'], needleGauge: '21G - 23G', needleLength: '1" - 1.5"' },
  { name: 'Sustanon 250', type: 'med', injectionType: 'intramuscular', sites: ['Glute', 'Thigh', 'Deltoid'], needleGauge: '22G - 25G', needleLength: '1" - 1.5"' },
  { name: 'Nandrolone Decanoate', type: 'med', injectionType: 'intramuscular', sites: ['Glute', 'Thigh'], needleGauge: '22G - 25G', needleLength: '1" - 1.5"' },
  { name: 'Nandrolone Phenylpropionate', type: 'med', injectionType: 'intramuscular', sites: ['Glute', 'Thigh'], needleGauge: '22G - 25G', needleLength: '1" - 1.5"' },
  { name: 'Trenbolone Acetate', type: 'med', injectionType: 'intramuscular', sites: ['Glute', 'Thigh', 'Deltoid'], needleGauge: '22G - 25G', needleLength: '1" - 1.5"' },
  { name: 'Trenbolone Enanthate', type: 'med', injectionType: 'intramuscular', sites: ['Glute', 'Thigh'], needleGauge: '22G - 25G', needleLength: '1" - 1.5"' },
  { name: 'Boldenone Undecylenate', type: 'med', injectionType: 'intramuscular', sites: ['Glute', 'Thigh'], needleGauge: '22G - 25G', needleLength: '1" - 1.5"' },
  { name: 'Drostanolone Propionate (Masteron)', type: 'med', injectionType: 'intramuscular', sites: ['Glute', 'Thigh', 'Deltoid'], needleGauge: '22G - 25G', needleLength: '1" - 1.5"' },
  { name: 'Drostanolone Enanthate', type: 'med', injectionType: 'intramuscular', sites: ['Glute', 'Thigh'], needleGauge: '22G - 25G', needleLength: '1" - 1.5"' },
  { name: 'Methenolone Enanthate (Primobolan Depot)', type: 'med', injectionType: 'intramuscular', sites: ['Glute', 'Thigh'], needleGauge: '22G - 25G', needleLength: '1" - 1.5"' },
  { name: 'Stanozolol Depot (Winstrol)', type: 'med', injectionType: 'intramuscular', sites: ['Glute', 'Thigh', 'Deltoid'], needleGauge: '21G - 23G', needleLength: '1" - 1.5"' },
];
