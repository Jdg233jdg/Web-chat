# Blinkx Beat-Style Product Blueprint (2026)

## Product Positioning

**Core promise:** a taste-driven channel of short, highly watchable videos in a lean-back autoplay experience.

This is not a general upload platform. It is a **curated programming channel** with software around it.

---

## 1) Homepage Sketch (Lean-Back First)

## Top Navigation
- Logo + tagline (`"Today’s best short videos, hand-picked"`)
- Sections: Funny, Strange, Animated, Story-Driven, Under 5 Min
- Search (optional in V1; can be hidden behind `/browse`)
- Save queue icon
- Sign in / newsletter

## Hero / Default State
- **Primary CTA:** `Play Channel`
- Subtitle: `10 hand-picked picks today · New batch every week`
- Small trust signal: `Curated by humans. No junk.`

## Main Playback Experience
- Full-screen or near full-screen player
- Right/Bottom metadata panel:
  - Title
  - Source (YouTube/Vimeo/creator site)
  - Duration
  - Tags
  - 1-sentence editor note (`"Picked for its opening hook + visual style"`)
- Controls:
  - Next best pick (autoplay on by default)
  - Save
  - Share
  - Add to queue
  - Open original source

## Side Rails / Secondary Modules
- `Daily 10` list (today’s pack)
- `Weekly Roundup`
- `Collections` (e.g., `3 Weird Masterpieces`)
- `Creator Spotlight`

## Submission + Credibility
- `Submit your short` form link
- Clear creator credit and canonical source links

---

## 2) Data Model (MVP)

Use editor-first ranking and a simple relational schema.

### videos
- `id` (uuid)
- `title`
- `description`
- `duration_seconds`
- `source_id` (fk)
- `source_video_url`
- `embed_url`
- `thumbnail_url`
- `creator_id` (fk)
- `published_at` (original publish date)
- `language`
- `is_active`
- `created_at`, `updated_at`

### sources
- `id`
- `name` (YouTube, Vimeo, Direct)
- `type` (embed, hosted)
- `domain`
- `license_notes`

### creators
- `id`
- `display_name`
- `profile_url`
- `country`
- `submission_email`

### tags
- `id`
- `slug`
- `label`

### video_tags
- `video_id` (fk)
- `tag_id` (fk)

### collections
- `id`
- `title`
- `slug`
- `description`
- `type` (daily, weekly, themed)
- `published_at`

### collection_items
- `collection_id` (fk)
- `video_id` (fk)
- `position`
- `editor_note`

### editorial_scores
- `id`
- `video_id` (fk)
- `hook_score` (1–5)
- `originality_score` (1–5)
- `craft_score` (1–5)
- `rewatchability_score` (1–5)
- `brand_fit_score` (1–5)
- `reviewed_by`
- `reviewed_at`

### user_events (for analytics)
- `id`
- `video_id`
- `user_id` (nullable)
- `session_id`
- `event_type` (view_start, view_25, view_50, complete, save, share, skip)
- `event_ts`

---

## 3) MVP Feature List

## Must-Have (Ship V1)
1. `Play Channel` autoplay feed with curated ordering
2. Video card metadata (title, source, duration, tags)
3. One-sentence editor note on every pick
4. Category filters (Funny, Strange, Animated, Story-Driven, Under 5 Min)
5. Save / queue / share actions
6. Daily and weekly curated collections
7. Creator credits + source links
8. Basic submission form (name, link, rights confirmation)
9. Lightweight admin/editor tool to:
   - add candidate links
   - score candidates
   - publish ordered collections

## Should-Have (Soon After)
1. Personalized resume (`continue watching queue`)
2. Email digest (`This week’s 10 picks`)
3. Duplicate/repost detection checks
4. Moderation workflow states (`candidate`, `approved`, `rejected`, `scheduled`)

## Not in V1
- Open uploads at scale
- Creator payout systems
- Full recommendation engine
- Long-tail search platform

---

## 4) Editorial Operating System

## Selection Rubric (hard gates)
- Strong first 10 seconds
- Under 5–10 minutes
- Distinctive craft or perspective
- Legit source / rights confidence
- Not low-effort compilation or stolen upload

## Scoring Rubric
Each video gets 1–5 scores for:
- Hook
- Originality
- Craft
- Rewatchability
- Brand fit

**Programming rule:** avoid same-tone clustering; sequence clips for contrast (funny -> emotional -> weird -> craft-heavy).

---

## 5) Suggested Stack

- **Frontend:** Next.js + React player wrappers
- **Backend:** Supabase/Postgres
- **CMS/editor tool:** Sanity or internal admin panel
- **Video delivery model:** embedded sources first (YouTube/Vimeo/licensed)
- **Ranking strategy:** editor-first, algorithm-second

---

## 6) Launch Plan (Small but Real)

### Day-0 Launch Scope
- 100 hand-picked videos
- 10 categories
- One `Play Channel` button
- One new curated batch every week
- Email signup

### Success Metrics (first 8 weeks)
- Autoplay completion rate per session
- Average videos watched per session
- Save/share rate per 100 plays
- Return viewers (7-day)
- Submission quality acceptance rate

---

## One-line Blueprint

Build a **human-curated, autoplaying short-video channel** with fast pacing, strong taste, and near-zero junk.
