export interface MarkdownToolingConfig {
  extends?: string[];
  editorMode?: {
    default?: 'source' | 'wysiwyg';
    allowSourceToggle?: boolean;
  };
  sections?: {
    required?: string[];
  };
}

export const defaultMarkdownToolingConfig: MarkdownToolingConfig = {
  editorMode: {
    default: 'wysiwyg',
    allowSourceToggle: true,
  },
  sections: {
    required: ['Overview', 'Usage', 'References'],
  },
};
