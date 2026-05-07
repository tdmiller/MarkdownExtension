import type { MarkdownToolingConfig } from '@markdown-tooling/config';

const preset: MarkdownToolingConfig = {
  editorMode: {
    default: 'wysiwyg',
    allowSourceToggle: true,
  },
  sections: {
    required: ['Overview', 'Usage', 'References'],
  },
};

export default preset;
