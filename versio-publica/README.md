# 🎵 Reproductor de Música - Versió Pública

Aquesta és la versió del reproductor que pots pujar a GitHub Pages, Netlify, Vercel o qualsevol altre servei d'allotjament gratuït.

## 📋 Què és això?

Una versió estàtica del reproductor que funciona sense necessitat d'un servidor Python. Utilitza un fitxer JSON per llistar les cançons.

## 🚀 Com utilitzar-ho?

### Pas 1: Afegir les teves cançons

1. Crea una carpeta anomenada `songs` dins de `versio-publica/`
2. Posa les teves cançons MP3 a la carpeta `songs/`

### Pas 2: Generar el fitxer JSON

Executa el script Python per generar automàticament el fitxer `songs.json`:

```bash
cd versio-publica
python3 generar-songs-json.py
```

Això crearà el fitxer `songs.json` amb totes les teves cançons.

### Pas 3: Pujar-ho a internet

Tens diverses opcions gratuïtes:

## 🌐 Opcions d'allotjament gratuït

### Opció 1: GitHub Pages (Recomanat) ⭐

1. **Crea un compte a GitHub** (gratuït): https://github.com
2. **Crea un repositori nou** (públic)
3. **Puja tots els fitxers** de la carpeta `versio-publica/`:
   - `index.html`
   - `style.css`
   - `script.js`
   - `songs.json`
   - Carpeta `songs/` amb les teves cançons
4. **Activa GitHub Pages**:
   - Vés a Settings → Pages
   - Selecciona la branca `main` i la carpeta `/root`
   - Guarda
5. **El teu reproductor estarà a**: `https://el-teu-usuari.github.io/nom-del-repositori/`

### Opció 2: Netlify

1. **Crea un compte a Netlify** (gratuït): https://netlify.com
2. **Arrossega la carpeta** `versio-publica/` a Netlify
3. **I ja està!** Et donarà un enllaç automàticament

### Opció 3: Vercel

1. **Crea un compte a Vercel** (gratuït): https://vercel.com
2. **Puja la carpeta** `versio-publica/`
3. **Et donarà un enllaç** automàticament

### Opció 4: Dropbox (Limitacions)

⚠️ **Nota**: Dropbox no permet servir HTML directament. Hauries d'utilitzar un servei com Dropbox Public Links, però és més complicat. És millor utilitzar GitHub Pages, Netlify o Vercel.

## 📁 Estructura de fitxers

```
versio-publica/
├── index.html              (Pàgina principal)
├── style.css               (Estils)
├── script.js               (Funcionalitat)
├── songs.json              (Llista de cançons - es genera automàticament)
├── generar-songs-json.py   (Script per generar songs.json)
├── README.md               (Aquest fitxer)
└── songs/                  (Carpeta amb les teves cançons MP3)
    ├── canco1.mp3
    ├── canco2.mp3
    └── ...
```

## 🔄 Com afegir noves cançons?

1. Afegeix la nova cançó a la carpeta `songs/`
2. Executa de nou: `python3 generar-songs-json.py`
3. Puja el nou fitxer `songs.json` i la nova cançó al teu servidor

## 💡 Consells

- **GitHub Pages** és la opció més popular i fàcil
- Assegura't que els noms dels fitxers no tinguen caràcters especials
- El format MP3 és el més compatible
- Pots canviar el nom de l'artista editant `generar-songs-json.py`

## 🎨 Personalització

- **Canviar el títol**: Edita `index.html` (línia 11)
- **Canviar els colors**: Edita `style.css` (busca `#667eea` i `#764ba2`)
- **Canviar el nom de l'artista**: Edita `generar-songs-json.py` (línia 30)

---

**Fet amb ❤️ per compartir música amb el món!**

