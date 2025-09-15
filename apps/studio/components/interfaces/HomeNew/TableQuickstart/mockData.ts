import type { TableSuggestion } from './types'

export const SOCIAL_MEDIA_TABLES: TableSuggestion[] = [
  {
    tableName: 'user_profiles',
    fields: [
      { name: 'id', type: 'uuid', nullable: false },
      { name: 'username', type: 'varchar', nullable: false },
      { name: 'display_name', type: 'varchar', nullable: true },
      { name: 'bio', type: 'text', nullable: true },
      { name: 'avatar_url', type: 'text', nullable: true },
      { name: 'follower_count', type: 'int4', nullable: false, default: 0 },
      { name: 'following_count', type: 'int4', nullable: false, default: 0 },
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
      { name: 'like_count', type: 'int4', nullable: false, default: 0 },
      { name: 'comment_count', type: 'int4', nullable: false, default: 0 },
      { name: 'share_count', type: 'int4', nullable: false, default: 0 },
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
      { name: 'notification_enabled', type: 'bool', nullable: false, default: true },
    ],
    rationale: 'Tracks relationships between users for the follow system',
    source: 'ai',
  },
]
