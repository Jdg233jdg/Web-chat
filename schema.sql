-- Initial MVP schema from BLINKX_BEAT_MVP.md

CREATE TABLE sources (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  domain TEXT,
  license_notes TEXT
);

CREATE TABLE creators (
  id SERIAL PRIMARY KEY,
  display_name TEXT NOT NULL,
  profile_url TEXT,
  country TEXT,
  submission_email TEXT
);

CREATE TABLE videos (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  duration_seconds INTEGER NOT NULL,
  source_id INTEGER REFERENCES sources(id),
  source_video_url TEXT,
  embed_url TEXT,
  thumbnail_url TEXT,
  creator_id INTEGER REFERENCES creators(id),
  published_at TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  label TEXT NOT NULL
);

CREATE TABLE video_tags (
  video_id UUID REFERENCES videos(id) ON DELETE CASCADE,
  tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (video_id, tag_id)
);

CREATE TABLE collections (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL,
  published_at TIMESTAMP
);

CREATE TABLE collection_items (
  collection_id INTEGER REFERENCES collections(id) ON DELETE CASCADE,
  video_id UUID REFERENCES videos(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  editor_note TEXT,
  PRIMARY KEY (collection_id, video_id)
);

CREATE TABLE editorial_scores (
  video_id UUID PRIMARY KEY REFERENCES videos(id) ON DELETE CASCADE,
  hook_score INTEGER,
  originality_score INTEGER,
  craft_score INTEGER,
  rewatchability_score INTEGER,
  brand_fit_score INTEGER,
  reviewed_by TEXT,
  reviewed_at TIMESTAMP
);

CREATE TABLE ingestion_candidates (
  id SERIAL PRIMARY KEY,
  discovered_url TEXT NOT NULL,
  source_platform TEXT NOT NULL,
  discovered_at TIMESTAMP DEFAULT NOW(),
  duration_seconds INTEGER,
  engagement_snapshot_json JSONB,
  duplicate_hash TEXT,
  rights_risk_flag BOOLEAN DEFAULT FALSE,
  auto_tags_json JSONB,
  pipeline_status TEXT NOT NULL
    CHECK (pipeline_status IN ('new', 'filtered_out', 'needs_review', 'selected', 'rejected'))
);

CREATE TABLE user_events (
  id BIGSERIAL PRIMARY KEY,
  video_id UUID REFERENCES videos(id) ON DELETE SET NULL,
  user_id UUID,
  session_id TEXT,
  event_type TEXT NOT NULL
    CHECK (event_type IN ('view_start', 'view_25', 'view_50', 'complete', 'save', 'share', 'skip')),
  event_ts TIMESTAMP DEFAULT NOW()
);
