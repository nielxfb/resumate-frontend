export interface transaction_input {
    userId: string;
    date: Date;
    tokenAmount: number;
    amountPurchase: number;
    paymentStatus: string;
    paymentMethod: string;
  }

export interface transaction_output {
    id:number;
    userId: string;
    date: Date;
    tokenAmount: number;
    amountPurchase: number;
    paymentStatus: string;
    paymentMethod: string;
  }

  export interface  CV_input {
    analysisId: number;
    fileName: String;
    fileURL: String;
    educationRating: number;
    gpaRating: number;
    jobRating: number;
    yearsRating: number;
    experienceRating: number;
    skillRating: number;
    softSkillRating: number; 
    languageRating: number;
}

export interface CV_output {
    id:number;
    analysisId: number;
    fileName: String;
    fileURL: String;
    educationRating: number;
    gpaRating: number;
    jobRating: number;
    yearsRating: number;
    experienceRating: number;
    skillRating: number;
    softSkillRating: number; 
    languageRating: number;
}

export interface analysis_input {
    userId: string;            
    educationTarget: string[];  
    gpaTarget: string[];         
    jobTarget: string[];        
    yearsTarget: string[];       
    experienceTarget: string[];  
    skillTarget: string[];    
    softSkillTarget: string[];  
    languageTarget: string[];    
    cvs: CV_output[];  
}

export interface analysis_output{
    userId: string;            
    educationTarget: string[];  
    gpaTarget: string[];         
    jobTarget: string[];        
    yearsTarget: string[];       
    experienceTarget: string[];  
    skillTarget: string[];    
    softSkillTarget: string[];  
    languageTarget: string[];    
    cvs: CV_output[];  
    date:Date;
    id:number;
}
 