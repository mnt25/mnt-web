export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveDemo: string;
  sourceCode: string;
  isVisible: boolean;
}

export interface SkillCategory {
  [category: string]: string[];
}