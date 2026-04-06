# iOS 26 Shortcut: AI Personalized Playlist Generator

This Shortcut takes your recently played songs, asks AI to curate a playlist that fits your taste, and creates a new Apple Music playlist automatically.

## What it does
1. Pulls your recent/top tracks from Apple Music data available to Shortcuts.
2. Builds a compact prompt from those songs.
3. Sends the prompt to an AI endpoint.
4. Parses the returned song list.
5. Searches Apple Music for each recommended song.
6. Creates a new playlist and adds found songs.

---

## Prerequisites
- iPhone on **iOS 26** with Shortcuts installed.
- Apple Music subscription.
- OpenAI API key (or another LLM API key).
- In Shortcuts, allow network access for "Get Contents of URL".

---

## Shortcut build steps (action-by-action)

### 1) Input and setup
- **Action:** `Ask for Input`
  - Prompt: `What mood do you want? (e.g., chill, gym, focus, happy)`
  - Type: Text
- **Action:** `Set Variable`
  - Name: `mood`
- **Action:** `Current Date`
- **Action:** `Format Date`
  - Format: Custom `yyyy-MM-dd`
- **Action:** `Set Variable`
  - Name: `today`

### 2) Collect listening context
- **Action:** `Find Music`
  - Filter: `Last Played is in the last 30 days`
  - Sort by: `Last Played` (Latest First)
  - Limit: `25`
- **Action:** `Repeat with Each` (Music)
  - **Action inside repeat:** `Text`
    - Template:
      - `Song: [Repeat Item Name]`
      - `Artist: [Repeat Item Artist]`
  - **Action inside repeat:** `Add to Variable`
    - Variable: `seedSongs`

### 3) Build AI prompt
- **Action:** `Text`
  - Content:

    ```
    You are a music curator.
    Create a personalized Apple Music playlist with exactly 20 songs.
    Mood: [[mood]]

    Use these recently played songs as taste signals:
    [[seedSongs]]

    Rules:
    - Return valid JSON only.
    - Schema:
      {
        "playlist_name": "string",
        "songs": [
          {"title": "string", "artist": "string", "reason": "short string"}
        ]
      }
    - No markdown.
    - Avoid duplicate songs/artists when possible.
    ```

- **Action:** `Set Variable`
  - Name: `aiPrompt`

### 4) Call AI API
- **Action:** `Dictionary`
  - `model`: `gpt-4.1-mini`
  - `input`: `[[aiPrompt]]`
- **Action:** `Get Contents of URL`
  - URL: `https://api.openai.com/v1/responses`
  - Method: `POST`
  - Headers:
    - `Authorization`: `Bearer YOUR_OPENAI_API_KEY`
    - `Content-Type`: `application/json`
  - Request Body: `JSON` from the Dictionary above
- **Action:** `Get Dictionary Value`
  - Key: `output_text`
- **Action:** `Get Dictionary from Input`
  - Input: `output_text`
- **Action:** `Set Variable`
  - Name: `playlistJSON`

> If your account/API returns a different shape, inspect the response once with `Quick Look`, then map the correct key path.

### 5) Create playlist and add songs
- **Action:** `Get Dictionary Value`
  - Dictionary: `playlistJSON`
  - Key: `playlist_name`
- **Action:** `Set Variable`
  - Name: `playlistName`
- **Action:** `Create Playlist`
  - Name: `[[playlistName]] - [[today]]`
- **Action:** `Set Variable`
  - Name: `newPlaylist`

- **Action:** `Get Dictionary Value`
  - Dictionary: `playlistJSON`
  - Key: `songs`
- **Action:** `Repeat with Each` (songs)
  - **Action inside repeat:** `Get Dictionary Value` key `title`
  - **Action inside repeat:** `Set Variable` -> `songTitle`
  - **Action inside repeat:** `Get Dictionary Value` key `artist`
  - **Action inside repeat:** `Set Variable` -> `songArtist`
  - **Action inside repeat:** `Text`
    - `[[songTitle]] [[songArtist]]`
  - **Action inside repeat:** `Search Apple Music`
    - Query: text above
    - Limit: 1
  - **Action inside repeat:** `If` search result has value
    - `Add Music to Playlist`
      - Music: first result
      - Playlist: `newPlaylist`

### 6) Confirmation output
- **Action:** `Show Result`
  - `Done! Created playlist: [[playlistName]]`

---

## Optional upgrades
- Add `Choose from Menu` for playlist length (10/20/30 songs).
- Add a profanity/clean-content toggle in prompt.
- Save generated reasons into Notes as a “liner notes” page.
- Schedule automation to run every Monday morning.

---

## Privacy and safety notes
- Don’t hardcode API keys in shared shortcuts.
- Prefer storing key in a locked note or secure retrieval workflow.
- AI may suggest unavailable songs; the loop already skips missing tracks.

---

## Quick-copy API Body template
If you prefer static JSON body:

```json
{
  "model": "gpt-4.1-mini",
  "input": "{{aiPrompt}}"
}
```

