#!/usr/bin/env python3
"""
Script per generar automàticament el fitxer songs.json
Escaneja la carpeta 'songs' i crea el fitxer JSON amb totes les cançons.
"""

import os
import json

SONGS_FOLDER = 'songs'
OUTPUT_FILE = 'songs.json'

def generate_songs_json():
    songs = []
    
    if not os.path.exists(SONGS_FOLDER):
        print(f"⚠️  La carpeta '{SONGS_FOLDER}' no existeix. Creant-la...")
        os.makedirs(SONGS_FOLDER)
        print(f"✅ Carpeta '{SONGS_FOLDER}' creada. Afegeix les teves cançons MP3 aquí.")
        return
    
    audio_extensions = ['.mp3', '.ogg', '.wav', '.m4a', '.flac']
    
    print(f"🔍 Escanejant la carpeta '{SONGS_FOLDER}'...")
    
    for filename in sorted(os.listdir(SONGS_FOLDER)):
        filepath = os.path.join(SONGS_FOLDER, filename)
        
        if os.path.isfile(filepath):
            _, ext = os.path.splitext(filename)
            if ext.lower() in audio_extensions:
                title = os.path.splitext(filename)[0]
                title = title.replace('_', ' ').replace('-', ' ')
                
                songs.append({
                    'title': title,
                    'artist': 'El teu nom',  # Canvia això si vols
                    'src': f'songs/{filename}',  # Ruta relativa a la carpeta songs
                    'duration': '0:00'
                })
                print(f"  ✅ Trobada: {filename}")
    
    # Escriure el fitxer JSON
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(songs, f, ensure_ascii=False, indent=2)
    
    print(f"\n✅ Fitxer '{OUTPUT_FILE}' generat amb {len(songs)} cançons!")
    print(f"📁 Ara pots pujar tots els fitxers a GitHub Pages, Netlify o Vercel.")

if __name__ == '__main__':
    generate_songs_json()

