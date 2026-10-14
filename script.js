/* ====== EDIT DATA DI SINI ====== */
const CLAN = {
  name: 'Imperfect',
  motto: '2 + 1 = 13.',
  tag: '#2LCL8ROGU',
  logo: 'img/IMPERFECT.png', // logo klan utama (tampil di dalam perisai)
  req: 'Town Hall 12 ke atas, aktif war, dan donasi rutin. Semua pemain yang mau belajar kami terima.',
  whatsapp: 'https://wa.me/62812XXXXXXXX', // nomor admin (diawali 62, tanpa 0 / + / spasi)
  waGroup: 'https://chat.whatsapp.com/KODEUNDANGAN', // link undangan grup WhatsApp
  allies: [
    { name: 'Macan Putih', info: 'Klan sekutu · Level 15', url: '#', logo: 'logo/macan-putih.png' },
    { name: 'Rajawali Muda', info: 'Klan sekutu · Level 12', url: '#', logo: 'logo/rajawali-muda.png' },
  ],
  wars: [
    { lawan: 'Banteng Hitam', tgl: '10 Okt 2026', skor: '46 - 39', hasil: 'Menang' },
    { lawan: 'Kuda kuning', tgl: '3 Okt 2026', skor: '41 - 44', hasil: 'Kalah' },
    { lawan: 'Harimau Timur', tgl: '26 Sep 2026', skor: '48 - 35', hasil: 'Menang' },
    { lawan: 'Elang Samudra', tgl: '19 Sep 2026', skor: '42 - 42', hasil: 'Seri' },
    { lawan: 'Singa Borneo', tgl: '12 Sep 2026', skor: '45 - 40', hasil: 'Menang' },
  ],
  rules: [
    'Wajib ikut war broo, serang minimal 1 kali.',
    'Donasi pasukan secara rutin dan jangan hanya meminta.',
    'Aktif minimal 1 kali setiap 3 hari. Tidak aktif akan dikeluarkan.',
    'Hormati sesama anggota, tanpa toxic dan tanpa spam.',
    'Ikut Clan Games dan Capital Raid sesuai kemampuan.',
  ],
};
// Format: "Nama|Jabatan|Town Hall|Trofi"
const MEMBERS = `PRAOWO|Leader|16|5420
GIBRAN|Co-Leader|16|5188
Teddy|Co-Leader|15|4975
SANS|Elder|16|4890
Rizky Maulana|Elder|15|4802
IMP⚡ECHA|Elder|15|4760
IMP⚡ECHA|Elder|14|4655
IMP⚡ECHA|Elder|15|4601
IMP⚡ECHA|Elder|14|4577
IMP⚡ECHA|Member|14|4490
IMP⚡ECHA|Member|14|4452
IMP⚡ECHA|Member|14|4410
IMP⚡ECHA|Member|13|4388
IMP⚡ECHA|Member|14|4350
IMP⚡ECHA|Member|13|4321
IMP⚡ECHA|Member|13|4290
IMP⚡ECHA|Member|13|4255
IMP⚡ECHA|Member|13|4213
IMP⚡ECHA|Member|13|4180
IMP⚡ECHA|Member|13|4144
IMP⚡ECHA|Member|13|4102
IMP⚡ECHA|Member|12|4066
IMP⚡ECHA|Member|12|4031
IMP⚡ECHA|Member|12|3990
IMP⚡ECHA|Member|12|3955
IMP⚡ECHA|Member|12|3921
IMP⚡ECHA|Member|12|3880
IMP⚡ECHA|Member|12|3844
IMP⚡ECHA|Member|12|3802
IMP⚡ECHA|Member|12|3770
IMP⚡ECHA|Member|12|3735
IMP⚡ECHA|Member|12|3699
IMP⚡ECHA|Member|12|3664
IMP⚡ECHA|Member|11|3620
IMP⚡ECHA|Member|11|3585
IMP⚡ECHA|Member|11|3540
IMP⚡ECHA|Member|11|3502
IMP⚡ECHA|Member|11|3466
IMP⚡ECHA|Member|11|3421
IMP⚡ECHA|Member|11|3380`
  .split('\n')
  .map((l, i) => {
    const [n, r, t, c] = l.split('|');
    return { no: i + 1, n, r, t: +t, c: +c };
  });
/* ====== AKHIR DATA ====== */

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const ICON = { Leader: '♛', 'Co-Leader': '⚔', Elder: '★', Member: '●' };
const thColor = (t) => (t >= 16 ? '#ffd400' : t === 15 ? '#fff' : t === 14 ? '#cfcfcf' : t === 13 ? '#a99a5a' : '#7d7d7d');

// Jika file logo belum ada, ganti dengan huruf awal klan
function fb(img) {
  const d = document.createElement('div');
  d.className = 'badge';
  d.textContent = img.dataset.l;
  img.replaceWith(d);
}

document.title = CLAN.name + ' – Clan Clash of Clans';
$('clanName').textContent = CLAN.name;
$('motto').textContent = '“' + CLAN.motto + '”';
$('req').textContent = CLAN.req;
$('slogo').src = CLAN.logo;

// Tombol WhatsApp (admin + grup)
[
  ['wa', CLAN.whatsapp],
  ['wag', CLAN.waGroup],
].forEach(([id, url]) => {
  const a = $(id);
  if (!a) return;
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  // Kalau link masih placeholder, beri tahu admin bukannya diam saja
  if (!url || url === '#' || /XXXX|KODEUNDANGAN/.test(url)) {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      $('copyMsg').textContent = 'Link WhatsApp belum diisi. Edit di script.js bagian CLAN.';
    });
  }
});

$('allies').innerHTML =
  '<p>Klan sekutu kami</p>' +
  CLAN.allies
    .map((a) => `<a class="ally" href="${esc(a.url)}"><img class="logo" src="${esc(a.logo)}" alt="Logo ${esc(a.name)}" data-l="${esc(a.name[0])}" onerror="fb(this)"><div><h3>${esc(a.name)}</h3><span>${esc(a.info)}</span></div></a>`)
    .join('');

const avg = Math.round(MEMBERS.reduce((s, m) => s + m.c, 0) / MEMBERS.length);
$('stats').innerHTML = [
  [MEMBERS.length + '/50', 'Anggota'],
  [avg.toLocaleString('id-ID'), 'Rata-rata trofi'],
  [CLAN.tag, 'Tag klan'],
]
  .map(([b, s]) => `<div class="stat"><b>${b}</b><small>${s}</small></div>`)
  .join('');

// Daftar anggota
function render() {
  const q = $('q').value.trim().toLowerCase(),
    r = $('roleFilter').value,
    s = $('sort').value;
  const list = MEMBERS.filter((m) => m.n.toLowerCase().includes(q) && (!r || m.r === r));
  list.sort((a, b) => (s === 'c' ? b.c - a.c : s === 'n' ? a.n.localeCompare(b.n) : a.no - b.no));
  $('grid').innerHTML = list
    .map(
      (m) =>
        `<article class="card ${m.r}"><div class="th" style="--tc:${thColor(m.t)}" title="Town Hall ${m.t}"><svg aria-hidden="true"><use href="#castle"/></svg><b>TH${m.t}</b></div>` +
        `<div><div class="nm"><span class="no">${m.no}</span>${esc(m.n)}</div><span class="role ${m.r}">${ICON[m.r]} ${m.r}</span></div>` +
        `<div class="tr">🏆 ${m.c.toLocaleString('id-ID')}</div></article>`,
    )
    .join('');
  $('empty').hidden = list.length > 0;
}
['q', 'roleFilter', 'sort'].forEach((id) => $(id).addEventListener(id === 'q' ? 'input' : 'change', render));
render();

// Riwayat war
const cnt = (h) => CLAN.wars.filter((w) => w.hasil === h).length;
$('warSum').textContent = `${cnt('Menang')} menang · ${cnt('Kalah')} kalah · ${cnt('Seri')} seri`;
$('wars').innerHTML = CLAN.wars.map((w) => `<div class="war"><div><b>vs ${esc(w.lawan)}</b><small>${esc(w.tgl)}</small></div><div class="sc">⭐ ${esc(w.skor)}</div><div class="res ${w.hasil}">${w.hasil}</div></div>`).join('');

// Aturan
$('rules').innerHTML = CLAN.rules.map((r) => `<li>${esc(r)}</li>`).join('');

// Salin tag
$('copyTag').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(CLAN.tag);
    $('copyMsg').textContent = 'Tag ' + CLAN.tag + ' disalin. Cari di Clash of Clans.';
  } catch {
    $('copyMsg').textContent = 'Salin manual tag klan: ' + CLAN.tag;
  }
});
