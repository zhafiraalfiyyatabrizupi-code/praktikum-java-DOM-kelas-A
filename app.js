console.log("bismillah praktikum dimulai");

// aktivitas 1 DOM SELECTION / Seleksi elemen
// kenapa kita harus seleksi karena "menangkap" atau ambil id/class
// mengambil elemen html tersebut lalu disimpan di variabel javascript

// 1. Mengambil elemen judul & sub judul
// document.getElementById("...") mengambil berdasarkan atribut id.

const judulutama = document.getElementById("judul-utama");

// document.queryselector("#...")
// tanda # artinya ID
const subjudul = document.querySelector("#sub-judul"); // menangkap: <p id="sub-judul">

// 2. mengambil elemen pada kartu 1 (kartu manipulasi teks & style)
const teksPreview = document.getElementById("teks-preview");
const boxPreview = document.getElementById("box-preview");
const cardManipulasi = document.getElementById("card-manipulasi");



// 3. mengambil elemen tombol -tombol aksi pada kartu 1
const BtnUbahTeks = document.getElementById("btn-ubah-teks");
const BtnToggleWarna = document.getElementById("btn-toggle-warna");
const BtnRiset = document.getElementById("btn-reset");

// 4. mengambil elemen pada kartu 2 (Fitur catatn dinamis / to do list sederhana )
const inputcatatan = document.getElementById("input-catatan");
const btntambah = document.getElementById("btn-tambah");
const daftarcatatan = document.getElementById("daftar-catatan");
const jumlahcatatan = document.getElementById("jumlah-catatan");
const pesankosong = document.getElementById("pesan-kosong");

// aktivitas ke 2  manipulasi teks & style (card 1)
// addEventListener("click", function() {...} artinya adalah tolong dengarkan dulu/tunggu
// sampai di klik user. jika di klik jalankan perintah didalam function

// A. mengubah teks & warna secara langsung

BtnUbahTeks.addEventListener("click", function() {
    // innerText = mengganti atau mengisi secara langsung teks yang ada
    teksPreview.innerText = "Hebat! teks ini berhasil diubah ke DOM!";

    // style.color = mengubah warna teks secara langsung (Inline style)
    teksPreview.style.color = "#f796da";

    // console.log = mencetak pesan di console browser
    console.log("[DOM] teks preview telah diperbarui!");
});

// B. Manipulasi class CSS menggunakan classList.toggle()
BtnToggleWarna.addEventListener("click", function() {

    // classList.toggle() = saklar (ON/OFF)
    boxPreview.classList.toggle("active-mode");
    cardManipulasi.classList.toggle("highlight");

    console.log("DOM berhasil di-switch");
});

BtnRiset.addEventListener("click", function() {
    teksPreview.innerText = "Halo! Teks ini siap diubah oleh JavaScript.";
    teksPreview.style.color = "";
    boxPreview.classList.remove("active-mode");
    cardManipulasi.classList.remove("highlight");

    console.log("DOM berhasil di-reset");
});

// C. Mengembalikan ke (reset) kondisi semula
//BtnRiset.addEventListener("click", function() {

    // 1. Kembalikan teks
    //teksPreview.innerText =
        //"Halo! Teks ini siap diubah oleh JavaScript.";

    // 2. Kembalikan warna teks
    //teksPreview.style.color = "";

    // 3. Hapus class yang ditambahkan
    //boxPreview.classList.remove("active-mode");
    //cardManipulasi.classList.remove("highlight");

    //console.log("DOM berhasil di-reset");
//});

// aktivitas 3 & 4 : elemen dinamis & event handling (to do list sederhana)
// di aktivitas ini kita belajar elemen HTML baru (<li>) secara otomatis dalam javascript\
// mengisi teksnya, memberi tombol hapus, lalu menempelkan ke layar (<ul>)

//langkah 1: membuat variabel penampung angka jumlah catatan
// "let" digunakan untuk nilai variabel yang akan berubah ubah bisa bertambah bisa berkurang (counting)
let totalcatatan = 0;

// langkah 2: fungsi update angka counter & pesan status
function perbaruijumlah() {
    // masukan angka total catatan terbaru ke dalam tag <span id="jumlah-catatan">
    jumlahcatatan.innerText = totalcatatan;

    // conditional statment berupa apakah catatannya itu kosong/ 0?
    if (totalcatatan ===0) {
        //jika 0: hapus class "hidden" supaya teks "belum ada catatan"muncul ke layar
        pesankosong.classList.remove("hidden");
    } else {
        // jika > 0: tambahkan class "hidden" agar teks "belum ada catatan" tersembunyi
        pesankosong.classList.add("hidden");
    }
}

// langkah 3 : fungsi utama logika tambah catatan baru
function tambahcatatan() {
    // 3.1 inputcatatan.value fungsinya untuk mengambil teks yang diketik oleh user 
    //.trim() = menghapus spasi diawal dan diakhir
    const isiteks = inputcatatan.value.trim();

    // 3.2 validasi input : jika isi teks kosong maka tampilkan alert
    if (isiteks === "") {
        alert("catatan kamu tidak boleh kosong!");
        return;
    }

    // 3.3 document.createElement("li") -> membuat memori di javascript secara dinamis
    const liBaru = document.createElement("li");
    liBaru.className = "note-item"; //menambahkan pada tag li

    /// 3.4 innerHTML = mengisi struktur di dalam <li>
liBaru.innerHTML = `<span>${isiteks}</span> <button class="btn-hapus">Hapus</button>`;

    // 3.5 menambahkan telinga /event Listener untuk tombol hapus pada catatan dinamis
    //liBaru.querySelector(".btn-hapus") = mengambil tombol ber class "btn-hapus" khusus yang ada di li
    const btnhapus = liBaru.querySelector(".btn-hapus");
    btnhapus.addEventListener("click", function () {
        liBaru.remove(); // menghapus elemen list dari layar HTML
        totalcatatan--; // totalcatatan dikurangi sebanyak 1x
        perbaruijumlah(); // panggil fungsi perbaruijumlah untuk update angka dilayar
        console.log(`DOM catatan "${isiteks}" dihapus.`);
    });


// 3.6 appenchild = memasukan elemen li kedalam wadah <ul id="daftar-catatan">
daftarcatatan.appendChild(liBaru);

// 3.7 mengosongkan kembali isi kolom input (inputcatatan.value = "") supaya bisa diketik lagi
inputcatatan.value = "";

// 3.8 totalcatatan++ artinya nambah nilai total catatan sebanyak 1, lalu update angka ke layar
totalcatatan++;
perbaruijumlah();

console.log(`DOM catatan baru ditambahkan: ${isiteks} `);

}

// langkah 4: event Listener klik tombol + "tambah"
// ketika tombol "+ tambah " di klik oleh user, maka jalankan fungsi tambah catatan ()
btntambah.addEventListener("click", function() {
    tambahcatatan();
});

// langkah 5: event Listener keyboard "enter" pada kolom input
// ketika user mengetik dikolom input dan melepas tombol keyboard ('event keyup);
inputcatatan.addEventListener("keyup", function (event) {
    //periksa apakah tombol keyboard yang ditekan user adalah enter?
    if (event.key === "Enter") {
        tambahcatatan(); // jika ya, jalankan fungsi tambahcatatan()
    }
});