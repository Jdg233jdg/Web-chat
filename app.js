const clips = [
  {
    id: 'c1',
    title: 'Laser Pigeon in Neon Alley',
    source: 'YouTube',
    durationSeconds: 180,
    tags: ['funny', 'animated', 'under-5-min'],
    note: 'Cold-open chaos, immediate hook and strong reset energy.',
    url: 'https://www.youtube.com/',
  },
  {
    id: 'c2',
    title: 'Paper City Meltdown',
    source: 'Vimeo',
    durationSeconds: 310,
    tags: ['strange', 'story-driven'],
    note: 'Weird tonal switch after humor keeps curiosity alive.',
    url: 'https://vimeo.com/',
  },
  {
    id: 'c3',
    title: 'One Minute of Impossible Timing',
    source: 'YouTube',
    durationSeconds: 58,
    tags: ['funny', 'under-5-min'],
    note: 'Ultra-short high payoff clip used to retain momentum.',
    url: 'https://www.youtube.com/',
  },
  {
    id: 'c4',
    title: 'The Silent Train Home',
    source: 'Direct',
    durationSeconds: 420,
    tags: ['story-driven', 'emotional'],
    note: 'Longer emotional dip placed after two high-energy clips.',
    url: 'https://example.com/',
  },
];

let currentFilter = 'all';
let playlist = [...clips];
let currentIndex = -1;
const queued = [];

const nodes = {
  play: document.getElementById('play-channel'),
  next: document.getElementById('next-video'),
  save: document.getElementById('save-video'),
  queue: document.getElementById('queue-video'),
  share: document.getElementById('share-video'),
  openSource: document.getElementById('open-source'),
  title: document.getElementById('video-title'),
  source: document.getElementById('video-source'),
  duration: document.getElementById('video-duration'),
  tags: document.getElementById('video-tags'),
  note: document.getElementById('video-note'),
  frame: document.getElementById('video-frame'),
  queueList: document.getElementById('queue-list'),
  filters: [...document.querySelectorAll('.filter-btn')],
};

function formatDuration(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = String(seconds % 60).padStart(2, '0');
  return `${min}:${sec}`;
}

function renderClip(clip) {
  nodes.title.textContent = clip.title;
  nodes.source.textContent = clip.source;
  nodes.duration.textContent = formatDuration(clip.durationSeconds);
  nodes.tags.textContent = clip.tags.join(', ');
  nodes.note.textContent = clip.note;
  nodes.openSource.href = clip.url;
  nodes.frame.innerHTML = `<div><h3>Now Playing</h3><p>${clip.title}</p></div>`;
}

function nextClip() {
  if (!playlist.length) {
    nodes.frame.innerHTML = '<p>No clips in this filter yet.</p>';
    return;
  }

  currentIndex = (currentIndex + 1) % playlist.length;
  renderClip(playlist[currentIndex]);
}

function syncFilter() {
  playlist =
    currentFilter === 'all'
      ? [...clips]
      : clips.filter((clip) => clip.tags.includes(currentFilter));
  currentIndex = -1;
}

function addToQueue(label) {
  const clip = playlist[currentIndex];
  if (!clip) return;

  queued.push(`${label}: ${clip.title}`);
  const li = document.createElement('li');
  li.textContent = queued[queued.length - 1];
  nodes.queueList.appendChild(li);
}

nodes.play.addEventListener('click', () => {
  syncFilter();
  nextClip();
});

nodes.next.addEventListener('click', nextClip);
nodes.save.addEventListener('click', () => addToQueue('Saved'));
nodes.queue.addEventListener('click', () => addToQueue('Queued'));
nodes.share.addEventListener('click', () => addToQueue('Shared'));

nodes.filters.forEach((button) => {
  button.addEventListener('click', () => {
    nodes.filters.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    currentFilter = button.dataset.filter;
    syncFilter();
  });
});
