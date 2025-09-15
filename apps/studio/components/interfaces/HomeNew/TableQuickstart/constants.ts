import type { TableSuggestion } from './types'

export interface TableTemplate {
  id: string
  name: string
  description: string
  iconName: string
  category: 'user' | 'content' | 'commerce' | 'productivity' | 'social'
  tables: TableSuggestion[]
}

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

export const APP_TEMPLATES: TableTemplate[] = [
  {
    id: 'social-app',
    name: 'Social Media',
    description: 'Posts, comments, and user interactions',
    iconName: 'User',
    category: 'social',
    tables: [],
  },
  {
    id: 'ecommerce-app',
    name: 'E-commerce',
    description: 'Products, orders, and inventory',
    iconName: 'Storage',
    category: 'commerce',
    tables: [],
  },
  {
    id: 'blog-app',
    name: 'Blog/CMS',
    description: 'Articles, authors, and categories',
    iconName: 'ApiDocs',
    category: 'content',
    tables: [],
  },
  {
    id: 'project-app',
    name: 'Project Mgmt',
    description: 'Tasks, teams, and timelines',
    iconName: 'Reports',
    category: 'productivity',
    tables: [],
  },
  {
    id: 'analytics-app',
    name: 'Analytics',
    description: 'Events, metrics, and dashboards',
    iconName: 'Realtime',
    category: 'productivity',
    tables: [],
  },
]
