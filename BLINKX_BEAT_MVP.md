# Blinkx Beat-Style Product Blueprint (2026)

## Core Product Thesis

You are not building “YouTube but better.”
You are building a **programming channel**: a human-curated, autoplaying stream of short videos.

**Rule:** automate the pipeline, not the taste.

---

## 1) Product Promise

**One narrow promise (pick one):**
- best short videos on the internet today
- weird/funny creative clips
- animation shorts
- daily 10-minute hand-picked watchlist

**Positioning sentence:**
> “A taste-driven channel that continuously serves short, highly watchable videos in a lean-back feed.”

---

## 2) Operating Model: What to Automate vs What Stays Human

## Automate (boring + scalable)

### A. Candidate Sourcing
Let software ingest **100–200 candidate videos/day** from:
- YouTube (new + niche + trending)
- Vimeo Staff Picks and filmmaker channels
- Reddit and film communities

### B. Junk Pre-Filter
Use hard filters to cut candidate load before human review:
- duration under 10 minutes
- baseline quality/engagement thresholds
- duplicate/repost detection
- blocked/unsafe domains and rights flags

Target: reduce 100–200 candidates to ~40 reviewable items.

### C. Auto-Tagging
Use AI/ML tags for programming context:
- funny
- weird
- emotional
- animation
- experimental

Why this matters: sequencing relies on tonal contrast.

### D. Draft Editorial Notes
Generate rough one-line notes automatically, but keep them as drafts.
Editors rewrite for voice and precision.

### E. Performance Diagnostics
Track skip/watch behavior and surface alerts like:
- “High drop-off at position #3”
- “Collection X loses 25% of viewers after clip 2”

The system reports; editors decide action.

## Keep Human (the actual product)

### A. Final Selection
Humans decide what gets in the channel.
No fully automated acceptance.

### B. Sequencing
Editors program like a DJ, not a librarian:
- funny -> weird -> emotional -> reset
- avoid same-tone clustering
- pace for curiosity and retention

### C. Standards Enforcement
Reject “pretty good.”
Average picks in sequence kill sessions quickly.

---

## 3) Weekly Workflow (Practical Loop)

1. Machine finds 100+ candidates
2. Machine filters to ~40
3. Editor fast-screens and rejects most
4. Editor selects 10–20 finalists
5. Editor sequences for rhythm and contrast
6. AI drafts notes; editor rewrites
7. Publish
8. Behavioral metrics inform next week’s sequencing

---

## 4) Homepage Sketch (Lean-Back First)

## Top Navigation
- Logo + tagline (`"Today’s best short videos, hand-picked"`)
- Sections: Funny, Strange, Animated, Story-Driven, Under 5 Min
- Save queue icon
- Sign in/newsletter

## Hero / Default State
- Primary CTA: `Play Channel`
- Subtitle: `10 hand-picked picks today · New batch every week`
- Trust signal: `Curated by humans. No junk.`

## Playback Experience
- Full-screen/near full-screen player
- Metadata pane:
  - title
  - source
  - duration
  - tags
  - 1-line editor note
- Controls:
  - autoplay next best pick
  - save
  - queue
  - share
  - open original source

## Secondary Modules
- Daily 10
- Weekly roundup
- themed collections (`3 Weird Masterpieces`)
- creator spotlight
- submit-your-short link

---

## 5) Data Model (MVP)

### videos
- `id` (uuid)
- `title`, `description`
- `duration_seconds`
- `source_id` (fk), `source_video_url`, `embed_url`
- `thumbnail_url`
- `creator_id` (fk)
- `published_at`
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

### tags / video_tags
- tags: `id`, `slug`, `label`
- bridge: `video_id`, `tag_id`

### collections / collection_items
- collections: `id`, `title`, `slug`, `type`, `published_at`
- items: `collection_id`, `video_id`, `position`, `editor_note`

### editorial_scores
- `video_id`
- `hook_score`, `originality_score`, `craft_score`, `rewatchability_score`, `brand_fit_score`
- `reviewed_by`, `reviewed_at`

### ingestion_candidates (automation queue)
- `id`
- `discovered_url`
- `source_platform`
- `discovered_at`
- `duration_seconds`
- `engagement_snapshot_json`
- `duplicate_hash`
- `rights_risk_flag`
- `auto_tags_json`
- `pipeline_status` (`new`, `filtered_out`, `needs_review`, `selected`, `rejected`)

### user_events
- `id`, `video_id`, `user_id` (nullable), `session_id`
- `event_type` (`view_start`, `view_25`, `view_50`, `complete`, `save`, `share`, `skip`)
- `event_ts`

---

## 6) MVP Feature List

## Must-Have (V1)
1. `Play Channel` autoplay feed with curated ordering
2. Metadata + editor note per clip
3. Filters (Funny / Strange / Animated / Story-Driven / Under 5 Min)
4. Save, queue, share
5. Daily + weekly collections
6. Creator credits + source links
7. Submission form with rights confirmation
8. Internal editor console for:
   - candidate intake
   - filter results
   - scoring + accept/reject
   - sequence ordering + publish

## Should-Have (V1.5)
1. Continue-watching queue
2. Weekly email digest
3. Better duplicate/repost detection
4. Moderation states (`candidate`, `approved`, `rejected`, `scheduled`)
5. Drop-off alerts by position in playlist

## Not in V1
- open self-serve uploads at scale
- creator payouts
- fully automated recommendation selection
- broad long-tail search experience

---

## 7) Editorial Standards

## Hard Gates
- strong first 10 seconds
- under 5–10 minutes
- distinctive craft or perspective
- rights/source confidence
- no stolen or low-effort compilation content

## Scoring
Score each pick (1–5):
- hook
- originality
- craft
- rewatchability
- brand fit

## Sequencing Rule
Optimize rhythm, not just per-video score.
A great channel feels varied and intentional clip-to-clip.

---

## 8) Suggested Stack

- Frontend: Next.js/React
- Backend: Supabase/Postgres
- CMS/editoring: Sanity or internal admin tool
- Video approach: embed-first (YouTube/Vimeo/licensed)
- Ranking: editor-first, algorithm-second

---

## 9) Launch Plan

## Day-0 Scope
- website
- 100 hand-picked videos
- 10 categories
- one `Play Channel` entry point
- one fresh curated batch/week
- email signup

## Success Metrics (first 8 weeks)
- session completion rate
- average videos watched per session
- save/share rate per 100 plays
- 7-day return viewers
- candidate-to-selection rate
- drop-off by feed position

---

## One-Line Blueprint

Build a **human brain with machine-assisted eyes**:
automated sourcing/filtering + human selection/sequencing.
