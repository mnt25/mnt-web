export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveDemo: string;
  sourceCode: string;
  isVisible: boolean;
  titleEn?: string;
  descriptionEn?: string;
  startDate?: string;
  endDate?: string;
}

export interface SkillCategory {
  [category: string]: string[];
}