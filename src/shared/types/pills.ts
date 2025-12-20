export type TimeOfDay = 'morning' | 'lunch' | 'before_workout' | 'after_workout' | 'evening';

export interface PillsI {
    id: string;
    name: string;
    dosage: string;
    timeOfDay: TimeOfDay;
    timeDescription: string;
    withFood: boolean;
    foodDetails?: string;
    importantNotes?: string;
    comboWith?: string[];      
    avoidWith?: string[];      
    order?: number;         
  }