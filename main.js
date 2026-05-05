const slider = document.getElementById("study");
const output = document.getElementById("output");
const kesulitan = document.getElementById("kesulitan");
function updateDisplay(minutes){
    let hours = Math.floor(minutes / 60);
    let mins = minutes % 60;
    if(hours >0 && mins >0) {
        output.textContent = `${hours} hour ${mins} minutes`;
    } else if (hours > 0){
        output.textContent = `${hours} hour`;
    }else{
        output.textContent = `${mins} minutes`;
    }
}
if(slider && output){
    slider.addEventListener("input",function(){
        updateDisplay(parseInt(slider.value));
    });
}
if(kesulitan && slider){
    kesulitan.addEventListener("change", function () {
        slider.value = this.value;
        updateDisplay(parseInt(this.value));
    });
}
if(slider){
    updateDisplay(parseInt(slider.value));
}
const mapelSelect = document.querySelector("select");
const aturBtn = document.querySelector(".goal button");
const mapelDisplay = document.getElementById("mapelDisplay");
const totalDisplay = document.getElementById("totalDisplay");
const statusIcon = document.getElementById("statusIcon");
const timerDisplay = document.getElementById("timer");
const stopBtn = document.getElementById("stopTimer");

let countdown;
let totalSeconds = 0;

if(aturBtn){
aturBtn.addEventListener("click", function(e){
    e.preventDefault();
    initialTotal = totalSeconds;
    const selectedMapel = mapelSelect.value;
    const selectedMinutes = parseInt(slider.value);

    if(!selectedMapel || isNaN(selectedMinutes)){
        alert("Pilih mapel dan waktu dulu!");
        return;
    }

    mapelDisplay.textContent = selectedMapel;
    totalDisplay.textContent = selectedMinutes + " minutes";
    statusIcon.textContent = "ACTIVE";

    totalSeconds = selectedMinutes * 60;
    const endTime = Date.now() + (selectedMinutes * 60 * 1000);
    localStorage.setItem("focusEndTime", endTime);
    localStorage.setItem("focusMapel", selectedMapel);
    startTimer();
    document.getElementById("focus").scrollIntoView({ behavior: "smooth" });
});
}

function startTimer(){
    document.querySelector(".focus-card")?.classList.add("active");

    clearInterval(countdown);
    
    countdown = setInterval(function(){
        let percent = ((initialTotal - totalSeconds) / initialTotal) * 100;
        if(progressBar) progressBar.style.width = percent + "%";
        if(totalSeconds <= 0){
            clearInterval(countdown);
            statusIcon.textContent = "OFF";
            return;
        }

        totalSeconds--;

        let hrs = Math.floor(totalSeconds / 3600);
        let mins = Math.floor((totalSeconds % 3600) / 60);
        let secs = totalSeconds % 60;

        timerDisplay.textContent =
            String(hrs).padStart(2,'0') + ":" +
            String(mins).padStart(2,'0') + ":" +
            String(secs).padStart(2,'0');

    },1000);
}

if(stopBtn){
stopBtn.addEventListener("click", function(){
    let confirmStop = confirm("Apakah yakin ingin menghentikan fokus mode? Anda akan gagal menyelesaikan tantangan!!");

if(confirmStop){
    clearInterval(countdown);

    localStorage.removeItem("focusEndTime");
    localStorage.removeItem("focusMapel");

    document.querySelector(".focus-card")?.classList.remove("active");
    if(mapelDisplay) mapelDisplay.textContent = "-";
    if(totalDisplay) totalDisplay.textContent = "-";
    if(statusIcon) statusIcon.textContent = "OFF";
    if(timerDisplay) timerDisplay.textContent = "00:00:00";
    if(progressBar) progressBar.style.width = "0%";
}
});
}
const progressBar = document.getElementById("progressBar");
let initialTotal = 0;
if(statusIcon){
    statusIcon.textContent = "ACTIVE";
    statusIcon.classList.remove("off");
    statusIcon.classList.add("active");
    statusIcon.textContent = "OFF";
    statusIcon.classList.remove("active");
    statusIcon.classList.add("off");
}
const focusBtn = document.getElementById("focusBtn");
const popup = document.getElementById("popupFocus");
const closePopup = document.getElementById("closePopup");

if(focusBtn && popup){
focusBtn.addEventListener("click", () => {
    popup.classList.add("active");
});
}

if(closePopup && popup){
closePopup.addEventListener("click", () => {
    popup.classList.remove("active");
});
}
const navLinks = document.querySelectorAll(".list ul li a");

navLinks.forEach(link => {
    link.addEventListener("click", function(){

        navLinks.forEach(el => el.classList.remove("active"));

        this.classList.add("active");

    });
});
// Hamburger toggle
const hamburger = document.querySelector('.hamburger');
const list = document.querySelector('.list');
hamburger?.addEventListener('click', () => {
    list.classList.toggle('open');
});
const savedEndTime = localStorage.getItem("focusEndTime");
const savedMapel = localStorage.getItem("focusMapel");

if(savedEndTime){

    const now = Date.now();
    const remaining = Math.floor((savedEndTime - now) / 1000);

    if(remaining > 0){

        totalSeconds = remaining;
        initialTotal = remaining;

        if(mapelDisplay) mapelDisplay.textContent = savedMapel;
        if(totalDisplay) totalDisplay.textContent = Math.floor(remaining/60) + " minutes";
        if(statusIcon) statusIcon.textContent = "ACTIVE";

        startTimer();

    } else {
        localStorage.removeItem("focusEndTime");
        localStorage.removeItem("focusMapel");
    }
}
// ═══════════════════════════════════════════════════════════
//  DATA BUKU
//  Ganti nilai "cover" dengan path gambar kamu sendiri
//  Contoh: "aset/buku/naruto.jpg"
//  Jika gambar tidak ada, otomatis tampil emoji sebagai fallback
// ═══════════════════════════════════════════════════════════

const books = {

  komik: [
    { title:"Bocchi the rock! voL.1",        author:"Aki Hamazi", cover:"perpus/komik1.png",        emoji:"🥷", genre:"Komik",    pages:192, rating:"4.9 ★", publisher:"Elex Media"  },
    { title:"Bocchi the rock! voL.2",     author:"Aki Hamazi",      cover:"perpus/komik2.png",      emoji:"⚓", genre:"Komik",    pages:216, rating:"5.0 ★", publisher:"Elex Media"  },
    { title:"Look Back",      author:"Tatsuki Fujimoto",   cover:"perpus/komik3.png",      emoji:"🤖", genre:"Komik",    pages:176, rating:"4.8 ★", publisher:"Gramedia"    },
    { title:"Goodbye eri",   author:"Tatsuki Fujimoto",    cover:"perpus/komik4.png",    emoji:"🐉", genre:"Komik",    pages:200, rating:"4.9 ★", publisher:"Elex Media"  },
    { title:"Si juki",    author:"Faza Ibnu Ubaidillah Salman",      cover:"perpus/komik5.png",         emoji:"🔍", genre:"Komik",    pages:192, rating:"4.8 ★", publisher:"Gramedia"    },
    { title:"Cosmic princes kaguya",   author:"Naruto Kiriyama",    cover:"perpus/komik6.png",           emoji:"🏰", genre:"Komik",    pages:200, rating:"4.9 ★", publisher:"Elex Media"  },
    { title:"record of ragnarok volume 5",        author:"Shinya Umemura",         cover:"perpus/komik7.png",        emoji:"⚔️", genre:"Komik",    pages:192, rating:"4.7 ★", publisher:"Elex Media"  },
    { title:"Ruri dragon Vol.1",    author:"Masaoki Shindo",      cover:"perpus/komik8.png",     emoji:"🧚", genre:"Komik",    pages:192, rating:"4.7 ★", publisher:"Gramedia"    },
    { title:"Ruri dragon Vol.2",  author:"masaoki Shindo",   cover:"perpus/komik9.png",           emoji:"💪", genre:"Komik",    pages:200, rating:"4.8 ★", publisher:"Elex Media"  },
    { title:"Fate grand Order",     author:"Takeshi Kawaguchi.",    cover:"perpus/komik10.png",      emoji:"🏀", genre:"Komik",    pages:192, rating:"4.9 ★", publisher:"Elex Media"  },
  ],

  cerpen: [
    { title:"Seporsi Mie ayam sebelum mati", author:" Brian Khrisna",              cover:"perpus/cerpen1.png",      emoji:"🕌", genre:"Cerpen",   pages:128, rating:"4.8 ★", publisher:"Gramedia"       },
    { title:"mata yang enak dipandang",      author:"Ahmad Tohari",           cover:"perpus/cerpen2.png",    emoji:"🐯", genre:"Cerpen",   pages:112, rating:"4.7 ★", publisher:"Gramedia"       },
    { title:"Robohnya surau kami",     author:"A.A navis",            cover:"perpus/cerpen3.png",   emoji:"😊", genre:"Cerpen",   pages:120, rating:"4.6 ★", publisher:"Gramedia"       },
    { title:"Filosofi kopi", author:"Dewi Lestari",   cover:"perpus/cerpen4.png",      emoji:"🌙", genre:"Cerpen",   pages:136, rating:"4.7 ★", publisher:"Bentang"        },
    { title:"Recto verso", author:"dee lestari",                   cover:"perpus/cerpen5.png",      emoji:"🌿", genre:"Cerpen",   pages:144, rating:"4.8 ★", publisher:"Bulan Bintang"  },
  ],

  novel: [
    { title:"Tenki no ko",      author:"Makoto Shinkai",      cover:"perpus/novel1.png",      emoji:"🌈", genre:"Novel",    pages:529, rating:"4.9 ★", publisher:"Bentang"       },
    { title:"Kimi no nawa",        author:"Makoto Shinkai",     cover:"perpus/novel2.png",        emoji:"🌏", genre:"Novel",    pages:535, rating:"5.0 ★", publisher:"Hasta Mitra"   },
    { title:"Suzume no tojimari",     author:"Makoto Shinkai",           cover:"perpus/novel3.png",     emoji:"🕌", genre:"Novel",    pages:423, rating:"4.8 ★", publisher:"Gramedia"      },
    { title:"Konosuba",       author:"Natsume Akatsuk",       cover:"perpus/novel4.png",      emoji:"⛵", genre:"Novel",    pages:444, rating:"4.7 ★", publisher:"Bentang"       },
    { title:"Sang Pemimpi",     author:"Andrea Hirata",   cover:"perpus/novel5.png",        emoji:"💙", genre:"Novel",    pages:419, rating:"4.8 ★", publisher:"Republika"     },
    { title:"Bumi",               author:"Tere Liye",          cover:"perpus/novel6.png",       emoji:"🌧️", genre:"Novel",    pages:320, rating:"4.8 ★", publisher:"Gramedia"      },
    { title:"Natsue no tunnel",                author:"Mei Hachimoku",  cover:"perpus/novel7.png",         emoji:"🏔️", genre:"Novel",    pages:381, rating:"4.7 ★", publisher:"Grasindo"      },
    { title:"Negeri 5 menara",        author:"Ahmad Fuadi",      cover:"perpus/novel8.png",     emoji:"💭", genre:"Novel",    pages:292, rating:"4.8 ★", publisher:"Bentang"       },
    { title:"Laskar pelangi",          author:"Andrea Hirata",          cover:"perpus/novel9.png",       emoji:"🛵", genre:"Novel",    pages:232, rating:"4.6 ★", publisher:"Pastel Books"  },
    { title:"Rinjani",              author:"Nabilla N. Harris",          cover:"perpus/novel10.png",      emoji:"🏠", genre:"Novel",    pages:400, rating:"4.8 ★", publisher:"Republika"     },
  ],

  sains: [
    { title:"A Brief History of Time",  author:"Stephen Hawking",  cover:"perpus/sains1.png",      emoji:"⚛️", genre:"Sains",    pages:368, rating:"4.7 ★", publisher:"Erlangga"      },
    { title:"The Grand Design",       author:"Stephen Hawking",     cover:"perpus/sains2.png",       emoji:"🧪", genre:"Sains",    pages:480, rating:"4.8 ★", publisher:"Erlangga"      },
    { title:"Cosmos",   author:" Carl Sagan",         cover:"perpus/sains3.png",     emoji:"🧬", genre:"Sains",    pages:512, rating:"4.9 ★", publisher:"EGC"           },
    { title:"Astrophysics for People in a Hurry",    author:"Neil deGrasse Tyson",         cover:"perpus/sains4.png",   emoji:"🔭", genre:"Sains",    pages:296, rating:"4.7 ★", publisher:"ITB Press"     },
    { title:"The Selfish Gene", author:"karya Richard Dawkins",     cover:"perpus/sains5.png",    emoji:"📐", genre:"Sains",    pages:560, rating:"4.8 ★", publisher:"Erlangga"      },
    { title:"The Elegant Universe",      author:" Brian Greene",       cover:"perpus/sains6.png",     emoji:"🌀", genre:"Sains",    pages:432, rating:"4.9 ★", publisher:"Erlangga"      },
    { title:"Introduction to Quantum Mechanics",       author:"David J. Griffiths",      cover:"perpus/sains7.png",     emoji:"🌿", genre:"Sains",    pages:344, rating:"4.6 ★", publisher:"IPB Press"     },
    { title:" BIOLOGY",       author:"John Eccles",      cover:"perpus/sains8.png",      emoji:"⚗️", genre:"Sains",    pages:496, rating:"4.7 ★", publisher:"Erlangga"      },
    { title:"Chemistry: The Central Science.",      author:" Charles Darwin",             cover:"perpus/sains9.png",    emoji:"🧫", genre:"Sains",    pages:388, rating:"4.8 ★", publisher:"Gadjah Mada UP"},
    { title:"On the Origin of Species",   author:"Zemansky",          cover:"perpus/sains10.png",  emoji:"📊", genre:"Sains",    pages:408, rating:"4.7 ★", publisher:"Erlangga"      },
  ],

  geografi: [
    { title:"Geografi untuk Siswa SMA/MA Kelas X.",      author:"Gatot Harmanto",   cover:"perpus/geo1.png",     emoji:"🗺️", genre:"Geografi", pages:280, rating:"4.6 ★", publisher:"Erlangga"      },
    { title:" Geografi untuk Siswa SMA/MA Kelas XI Kelompok Peminatan Ilmu-ilmu Sosial",     author:"Gatot Harmanto",      cover:"perpus/geo2.png",    emoji:"🏝️", genre:"Geografi", pages:120, rating:"4.8 ★", publisher:"Bumi Aksara"   },
    { title:"Geografi Siswa SMA/MA Kelas XII.",   author:"Budi Handoyo.",       cover:"perpus/geo3.png",    emoji:"🌊", genre:"Geografi", pages:360, rating:"4.7 ★", publisher:"Gramedia"      },
    { title:"Pengantar Geografi",        author:"Drs. N. Daldjoeni.",      cover:"perpus/geo4.png",  emoji:"⛰️", genre:"Geografi", pages:316, rating:"4.7 ★", publisher:"Tarsito"       },
    { title:"Geografi Regional Indonesia.",    author:"Drs. H.S. Sudarmi, M.Si",         cover:"perpus/geo5.png",    emoji:"🌤️", genre:"Geografi", pages:272, rating:"4.6 ★", publisher:"ITB Press"     },
    { title:"Atlas Pelajar Superlengkap Indonesia & Dunia",     author:"Sev Sukandar",        cover:"perpus/geo6.png",    emoji:"💧", genre:"Geografi", pages:344, rating:"4.7 ★", publisher:"Erlangga"      },
    { title:"Geographic Information Systems & Science",      author:"Paul A. Longley",         cover:"perpus/geo7.png",     emoji:"👥", genre:"Geografi", pages:296, rating:"4.5 ★", publisher:"Gadjah Mada UP"},
    { title:"Introducing Physical Geography",   author:"Alan Strahler",      cover:"perpus/geo8.png", emoji:"🛰️", genre:"Geografi", pages:408, rating:"4.8 ★", publisher:"Gadjah Mada UP"},
    { title:"Geografi 3: untuk SMA/MA Kelas XII. ",           author:"Danang Endarto",       cover:"perpus/geo9.png",      emoji:"📍", genre:"Geografi", pages:352, rating:"4.7 ★", publisher:"Informatika"   },
  ],

  teknologi: [
    { title:"Artificial Intelligence: A Modern Approach",  author:" Stuart Russell dan Peter Norvig.",       cover:"perpus/tekno1.png",  emoji:"🐍", genre:"Teknologi", pages:440, rating:"4.9 ★", publisher:"No Starch"    },
    { title:"Clean Code: A Handbook of Agile Software Craftsmanship",          author:"Robert C. Martin",  cover:"perpus/tekno2.png",   emoji:"✨", genre:"Teknologi", pages:464, rating:"4.9 ★", publisher:"Prentice Hall"},
    { title:"Introduction to Algorithms, Second Edition",     author:"Thomas H. Cormen",        cover:"perpus/tekno3.png",      emoji:"🤖", genre:"Teknologi", pages:386, rating:"4.8 ★", publisher:"Manning"      },
    { title:"The Pragmatic Programmer",     author:"David Thomas",        cover:"perpus/tekno4.png",     emoji:"🌐", genre:"Teknologi", pages:490, rating:"4.7 ★", publisher:"Wiley"        },
    { title:"Computer Networking: A Top-Down Approach",     author:"James F. Kurose",   cover:"perpus/tekno5.png",      emoji:"🗄️", genre:"Teknologi", pages:512, rating:"4.8 ★", publisher:"McGraw-Hill"  },
    { title:"You Don't Know JS: Scope & Closures",      author:"Kyle Simpson",  cover:"perpus/tekno6.png",   emoji:"🔐", genre:"Teknologi", pages:448, rating:"4.8 ★", publisher:"Wiley"        },
    { title:"Deep Learning",    author:"Dr. Eng. Novanto Yudistira, S.Kom., M.Sc. ",       cover:"perpus/tekno7.png",     emoji:"📡", genre:"Teknologi", pages:368, rating:"4.7 ★", publisher:"Cisco Press"  },
    { title:"Cybersecurity Essentials",    author:"Charles J. Brooks",          cover:"perpus/tekno8.png",      emoji:"🧠", genre:"Teknologi", pages:528, rating:"4.9 ★", publisher:"O'Reilly"     },
  ],

};

// Rekomendasi = 1 buku dari tiap kategori
const rekomendasi = Object.values(books).map(arr => arr[0]);


// ═══════════════════════════════════════════════════════════
//  RENDER BUKU KE CONTAINER
// ═══════════════════════════════════════════════════════════
function renderBooks(containerId, data) {
  const container = document.getElementById(containerId);
  if (!container) return;

  data.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';

    card.innerHTML = `
      <div class="book-cover">
        <img
          src="${book.cover}"
          alt="${book.title}"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
        >
        <span class="cover-emoji" style="display:none;">${book.emoji}</span>
      </div>
      <div class="book-info">
        <h4>${book.title}</h4>
        <div class="author">${book.author}</div>
        <div class="meta">
          <span class="rating">${book.rating}</span>
          <span class="pages">${book.pages} hal</span>
        </div>
        <button class="btn-baca" onclick="openModal(event, this)">Baca Sekarang</button>
      </div>
    `;

    // Simpan data buku ke element agar mudah diambil saat klik
    card.dataset.book = JSON.stringify(book);
    container.appendChild(card);
  });
}

renderBooks('scroll-rek',       rekomendasi);
renderBooks('scroll-komik',     books.komik);
renderBooks('scroll-cerpen',    books.cerpen);
renderBooks('scroll-novel',     books.novel);
renderBooks('scroll-sains',     books.sains);
renderBooks('scroll-geografi',  books.geografi);
renderBooks('scroll-teknologi', books.teknologi);


// ═══════════════════════════════════════════════════════════
//  MODAL
// ═══════════════════════════════════════════════════════════
function openModal(e, btn) {
  e.preventDefault();
  const book = JSON.parse(btn.closest('.book-card').dataset.book);

  const imgEl   = document.getElementById('modalCoverImg');
  const emojiEl = document.getElementById('modalCoverEmoji');

  // Reset tampilan
  imgEl.style.display   = 'block';
  emojiEl.style.display = 'none';

  imgEl.src = book.cover;
  imgEl.alt = book.title;
  imgEl.onerror = () => {
    imgEl.style.display   = 'none';
    emojiEl.style.display = 'flex';
    emojiEl.textContent   = book.emoji;
  };

  document.getElementById('modalTitle').textContent     = book.title;
  document.getElementById('modalAuthor').textContent    = book.author;
  document.getElementById('modalGenre').textContent     = book.genre;
  document.getElementById('modalPages').textContent     = book.pages + ' halaman';
  document.getElementById('modalRating').textContent    = book.rating;
  document.getElementById('modalPublisher').textContent = book.publisher;

  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

// Tutup modal klik di luar
document.getElementById('modalOverlay').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});


// ═══════════════════════════════════════════════════════════
//  BANNER AUTO SCROLL
// ═══════════════════════════════════════════════════════════
let slideIdx = 0;
const track  = document.getElementById('bannerTrack');
const dots   = document.querySelectorAll('.dot');

function goSlide(idx) {
  slideIdx = idx;
  track.style.transform = `translateX(-${idx * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === idx));
}

setInterval(() => goSlide((slideIdx + 1) % 3), 3500);


// ═══════════════════════════════════════════════════════════
//  HAMBURGER MENU
// ═══════════════════════════════════════════════════════════
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navList      = document.getElementById('navList');

hamburgerBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  navList.classList.toggle('open');
});

document.addEventListener('click', (e) => {
  if (!hamburgerBtn.contains(e.target) && !navList.contains(e.target)) {
    navList.classList.remove('open');
  }
});
function togglePassword() {
    const input = document.getElementById("password");
    const icon  = document.getElementById("eye-icon");

    if (input.type === "password") {
        input.type = "text";
        icon.innerHTML = `
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
            <line x1="1" y1="1" x2="23" y2="23"/>
        `;
    } else {
        input.type = "password";
        icon.innerHTML = `
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
        `;
    }
}