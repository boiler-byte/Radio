RADIO — MEHR NICHT. | Progressive Web App

DATEIEN
- index.html: App mit der dunklen Espresso-/Walnuss-Farbpalette
- radio.webp: das bestehende Hero-Bild
- manifest.webmanifest: Installations-Metadaten
- sw.js: Offline-Cache fuer die App-Oberflaeche
- icons/: App- und iOS-Icons

STARTEN UND INSTALLIEREN
1. Alle Dateien und Unterordner unveraendert auf einen HTTPS-Webserver hochladen.
2. Die Website im Browser oeffnen und ueber dessen App-Installieren-Menue installieren.
   In kompatiblen Browsern erscheint zusaetzlich unten der Button 'App installieren'.
   Auf iPhone/iPad in Safari: Teilen > Zum Home-Bildschirm.
3. Lokal zum Testen: im entpackten Verzeichnis `python3 -m http.server 8000`
   ausfuehren und http://localhost:8000/ oeffnen.

OFFLINE
Die App-Oberflaeche und lokal in IndexedDB gespeicherte Favoriten stehen
nach dem ersten erfolgreichen Laden ohne Internet zur Verfuegung.
Sendersuche, Stations-Logos aus dem Netz und Radiostreams brauchen Internet.
Favoriten sind pro Browser-/App-Installation gespeichert.
Der Service Worker wird auf HTTPS oder localhost registriert, nicht ueber file://.
