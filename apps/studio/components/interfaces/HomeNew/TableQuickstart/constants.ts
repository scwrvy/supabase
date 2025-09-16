import { TableSuggestion, TableTemplate } from './types'

// Storage keys
export const QUICKSTART_DATA_KEY = 'table-quickstart-data'
export const QUICKSTART_URL_PARAM = 'openCreateTable'

// Feature flag values
export const QUICKSTART_VARIANTS = {
  AI: 'ai',
  TEMPLATES: 'templates',
  CONTROL: 'control',
} as const

export type QuickstartVariant = (typeof QUICKSTART_VARIANTS)[keyof typeof QUICKSTART_VARIANTS]

// UI Copy
export const GETTING_STARTED_WIDGET_COPY = {
  ai: {
    title: 'Kickstart your database with AI',
    description:
      'Describe your app, and our AI will suggest starter table schemas to get you going. Edit and customize them as you go. No SQL required.',
  },
  templates: {
    title: 'Start with a ready-made database',
    description:
      "Pick what you're building, and we'll set up starter tables for you. Edit them anytime to make them your own.",
  },
}

// Mock data for social media app
// Not for production use
export const SOCIAL_MEDIA_TABLES: TableSuggestion[] = [
  {
    tableName: 'user_profiles',
    fields: [
      { name: 'id', type: 'uuid', nullable: false },
      { name: 'username', type: 'varchar', nullable: false },
      { name: 'display_name', type: 'varchar', nullable: true },
      { name: 'bio', type: 'text', nullable: true },
      { name: 'avatar_url', type: 'text', nullable: true },
      { name: 'follower_count', type: 'int4', nullable: false, default: '0' },
      { name: 'following_count', type: 'int4', nullable: false, default: '0' },
      { name: 'created_at', type: 'timestamp', nullable: false },
    ],
    rationale: 'Core user identity and profile information for your social platform',
    source: 'ai',
  },
  {
    tableName: 'posts',
    fields: [
      { name: 'id', type: 'uuid', nullable: false },
      { name: 'user_id', type: 'uuid', nullable: false },
      { name: 'content', type: 'text', nullable: false },
      { name: 'media_urls', type: 'jsonb', nullable: true },
      { name: 'like_count', type: 'int4', nullable: false, default: '0' },
      { name: 'comment_count', type: 'int4', nullable: false, default: '0' },
      { name: 'share_count', type: 'int4', nullable: false, default: '0' },
      { name: 'created_at', type: 'timestamp', nullable: false },
      { name: 'updated_at', type: 'timestamp', nullable: true },
    ],
    rationale: 'Main content that users create and share on the platform',
    source: 'ai',
  },
  {
    tableName: 'user_follows',
    fields: [
      { name: 'id', type: 'uuid', nullable: false },
      { name: 'follower_id', type: 'uuid', nullable: false },
      { name: 'following_id', type: 'uuid', nullable: false },
      { name: 'created_at', type: 'timestamp', nullable: false },
      { name: 'notification_enabled', type: 'bool', nullable: false, default: 'true' },
    ],
    rationale: 'Tracks relationships between users for the follow system',
    source: 'ai',
  },
]

// Table templates configuration
export const APP_TEMPLATES: TableTemplate[] = [
  {
    id: 'social-app',
    name: 'Social Media',
    description: 'Posts, comments, and user interactions',
    iconName: 'User',
    category: 'social',
    tables: [...SOCIAL_MEDIA_TABLES],
  },
  {
    id: 'ecommerce-app',
    name: 'E-commerce',
    description: 'Products, orders, and inventory',
    iconName: 'Storage',
    category: 'commerce',
    tables: [...SOCIAL_MEDIA_TABLES],
  },
  {
    id: 'blog-app',
    name: 'Blog/CMS',
    description: 'Articles, authors, and categories',
    iconName: 'ApiDocs',
    category: 'content',
    tables: [...SOCIAL_MEDIA_TABLES],
  },
  {
    id: 'project-app',
    name: 'Project Mgmt',
    description: 'Tasks, teams, and timelines',
    iconName: 'Reports',
    category: 'productivity',
    tables: [...SOCIAL_MEDIA_TABLES],
  },
  {
    id: 'analytics-app',
    name: 'Analytics',
    description: 'Events, metrics, and dashboards',
    iconName: 'Realtime',
    category: 'productivity',
    tables: [...SOCIAL_MEDIA_TABLES],
  },
]
