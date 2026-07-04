# ionic-team/capacitor haqqında qeyd

Capacitor bir brauzer kitabxanası deyil — `<script src="...">` ilə HTML faylına
"qoşula" bilməz. O, veb tətbiqinizi native iOS/Android layihəsinə çevirən
**CLI + tərtibat aləti**dir. Ona görə `panel.html` faylının özünə heç nə əlavə
etmədik; bunun əvəzinə aşağıdakı addımlarla mövcud tətbiqinizi native app-a
çevirə bilərsiniz:

```bash
npm init -y
npm install @capacitor/core @capacitor/cli
npx cap init "Panel" "com.example.panel" --web-dir www

mkdir www
cp panel.html www/index.html
cp manifest.json icon-192.png sw.js www/   # (varsa)

npx cap add android   # və ya: npx cap add ios
npx cap sync
npx cap open android  # Android Studio-nu açır
```

`capacitor.config.json` faylı bu qovluqda hazır şəkildə verilib — `appId` və
`appName` sahələrini öz layihənizə görə dəyişə bilərsiniz.

Qeyd: Android üçün Android Studio, iOS üçün isə Xcode (yalnız macOS)
lazımdır — bunlar Capacitor-un tələbidir, bizim tərəfimizdən əlavə edilə
bilməz.
