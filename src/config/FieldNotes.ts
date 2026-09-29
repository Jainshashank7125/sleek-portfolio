import fieldNotesContent from './field-notes-content.json';

export type WorkflowIconKey =
  | 'Files'
  | 'Checks'
  | 'Queue'
  | 'Scan'
  | 'Tag'
  | 'Link'
  | 'Database';

export interface WorkflowStage {
  title: string;
  detail: string;
  icon: WorkflowIconKey;
}

export interface FieldNotesConfig {
  proof: {
    headline: string;
    items: Array<{ title: string; description: string }>;
    note: string;
  };
  featuredWorkflow: {
    title: string;
    description: string;
    themes: string[];
    stages: WorkflowStage[];
  };
  homepageProjects: string[];
  aboutInterests: string[];
}

export const fieldNotesConfig: FieldNotesConfig =
  fieldNotesContent as FieldNotesConfig;
