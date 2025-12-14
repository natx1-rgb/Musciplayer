// Reproductor de música - Versió pública (sense servidor Python)
// Carrega les cançons des d'un fitxer JSON

let songs = [];

// Variables globals
let currentSongIndex = 0;
let isPlaying = false;
let audioPlayer, playPauseBtn, prevBtn, nextBtn, progressSlider, progress;
let currentTimeSpan, durationSpan, volumeSlider, volumeValue;
let songTitle, songArtist, playlist;

// Carregar cançons des del fitxer JSON
async function loadSongsFromJSON() {
    try {
        const response = await fetch('songs.json');
        if (response.ok) {
            songs = await response.json();
            console.log(`✅ S'han carregat ${songs.length} cançons`);
            
            if (songs.length > 0) {
                loadPlaylist();
                loadSong(0);
            } else {
                playlist.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No s\'han trobat cançons al fitxer songs.json.<br>Edita el fitxer songs.json per afegir les teves cançons.</p>';
            }
        } else {
            throw new Error('No s\'ha trobat el fitxer songs.json');
        }
    } catch (error) {
        console.error('Error:', error);
        playlist.innerHTML = '<p style="text-align: center; color: #d32f2f; padding: 20px;">⚠️ Error: No s\'ha trobat el fitxer songs.json.<br><small>Crea el fitxer songs.json amb la llista de cançons.</small></p>';
    }
}

// Inicialitzar el reproductor
async function initPlayer() {
    // Obtenir referències als elements
    audioPlayer = document.getElementById('audio-player');
    playPauseBtn = document.getElementById('play-pause-btn');
    prevBtn = document.getElementById('prev-btn');
    nextBtn = document.getElementById('next-btn');
    progressSlider = document.getElementById('progress-slider');
    progress = document.getElementById('progress');
    currentTimeSpan = document.getElementById('current-time');
    durationSpan = document.getElementById('duration');
    volumeSlider = document.getElementById('volume-slider');
    volumeValue = document.getElementById('volume-value');
    songTitle = document.getElementById('song-title');
    songArtist = document.getElementById('song-artist');
    playlist = document.getElementById('playlist');
    
    if (!audioPlayer || !playPauseBtn || !playlist) {
        console.error('Error: No s\'han trobat tots els elements necessaris');
        return;
    }
    
    // Carregar cançons
    await loadSongsFromJSON();
    
    // Configurar esdeveniments
    setupEventListeners();
    
    // Configurar volum inicial
    audioPlayer.volume = volumeSlider.value / 100;
}

// Carregar la llista de cançons a la interfície
function loadPlaylist() {
    if (!playlist) return;
    
    playlist.innerHTML = '';
    
    songs.forEach((song, index) => {
        const playlistItem = document.createElement('div');
        playlistItem.className = 'playlist-item';
        playlistItem.dataset.index = index;
        
        playlistItem.innerHTML = `
            <span class="play-icon">🎵</span>
            <div class="song-details">
                <div class="song-name">${song.title}</div>
                <div class="song-artist">${song.artist}</div>
            </div>
            <span class="song-duration">${song.duration || '0:00'}</span>
        `;
        
        playlistItem.addEventListener('click', () => {
            loadSong(index);
            playSong();
        });
        
        playlist.appendChild(playlistItem);
    });
}

// Carregar una cançó
function loadSong(index) {
    if (index < 0 || index >= songs.length) return;
    
    currentSongIndex = index;
    const song = songs[currentSongIndex];
    
    audioPlayer.src = song.src;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    
    updateActiveSong();
    
    audioPlayer.addEventListener('loadedmetadata', () => {
        durationSpan.textContent = formatTime(audioPlayer.duration);
    }, { once: true });
}

// Actualitzar l'element actiu a la llista
function updateActiveSong() {
    const items = playlist.querySelectorAll('.playlist-item');
    items.forEach((item, index) => {
        if (index === currentSongIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Reproduir cançó
function playSong() {
    audioPlayer.play();
    isPlaying = true;
    playPauseBtn.textContent = '⏸';
}

// Pausar cançó
function pauseSong() {
    audioPlayer.pause();
    isPlaying = false;
    playPauseBtn.textContent = '▶';
}

// Cançó anterior
function prevSong() {
    let newIndex = currentSongIndex - 1;
    if (newIndex < 0) {
        newIndex = songs.length - 1;
    }
    loadSong(newIndex);
    if (isPlaying) {
        playSong();
    }
}

// Cançó següent
function nextSong() {
    let newIndex = currentSongIndex + 1;
    if (newIndex >= songs.length) {
        newIndex = 0;
    }
    loadSong(newIndex);
    if (isPlaying) {
        playSong();
    }
}

// Formatejar temps (segons a mm:ss)
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Actualitzar barra de progrés
function updateProgress() {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    
    if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = progressPercent + '%';
        progressSlider.value = progressPercent;
        currentTimeSpan.textContent = formatTime(currentTime);
    }
}

// Configurar tots els esdeveniments
function setupEventListeners() {
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    });
    
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('ended', nextSong);
    
    progressSlider.addEventListener('input', (e) => {
        const percent = e.target.value;
        if (audioPlayer.duration) {
            audioPlayer.currentTime = (percent / 100) * audioPlayer.duration;
        }
    });
    
    volumeSlider.addEventListener('input', (e) => {
        const volume = e.target.value;
        audioPlayer.volume = volume / 100;
        volumeValue.textContent = volume + '%';
    });
}

// Iniciar el reproductor
document.addEventListener('DOMContentLoaded', initPlayer);

