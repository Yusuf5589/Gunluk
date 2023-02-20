const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();
const tarih = document.querySelector("#tarih");
const buton = document.querySelector("#buton");
const yazilar = document.querySelector("#yazilar");
const metin = document.querySelector("#yazi");

buton.addEventListener("click", addtext);

tarih.innerHTML = `Bugünün Tarihi: ${day}/${month}/${year}`;


class Gunluk {
  constructor(day, month, year, metin) {
    this.day = day;
    this.month = month;
    this.year = year;
    this.metin = metin;
  }
}

class NewGunluk extends Gunluk {
  constructor(day, month, year, metin) {
    super(day, month, year, metin);
  }
}

function addtext() {
  if (metin.value.trim() === "") {
    alert("Lütfen bir şeyler yazın.");
    return;
  }
  const createGunluk = new NewGunluk(day, month, year, metin.value);
  const newDiv = document.createElement("div");
  newDiv.innerHTML = `<div class="container bg-black text-white p-4 mt-4" style="font-size: 18px; font-weight: bold; border-radius: 25px;">
    Yazıldı Tarihi: ${createGunluk.day}/${createGunluk.month}/${createGunluk.year}<br><pre style="font-size: 18px; font-weight: bold;">${createGunluk.metin}</pre>
    <div class="container d-flex justify-content-end p-0">
    <button class="btn btn-danger w-25" id="sil" data-metin="${createGunluk.metin}">SİL</button>
    </div>
  </div>`;

  const silButton = newDiv.querySelector("#sil");
  silButton.addEventListener("click", deletee);
  silButton.setAttribute("data-metin", createGunluk.metin);

  yazilar.appendChild(newDiv);

  metin.value = "";

  Storage.addStorage(createGunluk);
}


function deletee(e) {
  if (e.target.dataset.metin) {
    Storage.deletestroge(e.target.dataset.metin);
    e.target.parentElement.parentElement.remove();
  }
  e.preventDefault();
}






class Storage {
  static localStorage() {
    let gunlukk;
    if (localStorage.getItem("gunluk") == null) {
      gunlukk = [];
    } else {
      gunlukk = JSON.parse(localStorage.getItem("gunluk"));
    }
    return gunlukk;
  }

  static addStorage(createGunluk) {
    let gunlukk = this.localStorage();
    gunlukk.push(createGunluk);
    localStorage.setItem("gunluk", JSON.stringify(gunlukk));
  }

  static deletestroge(metin) {
    let gunlukk = this.localStorage();
    gunlukk = gunlukk.filter(entry => entry.metin !== metin);
    localStorage.setItem("gunluk", JSON.stringify(gunlukk));
  }

  static ekranyuklendinde() {
    let str = Storage.localStorage();
    const newDiv = document.createElement("div");
    str.forEach(function(e) {
      const baseDiv = document.createElement("div");
      baseDiv.innerHTML = `<div class="container bg-black text-white p-4 mt-4" style="font-size: 18px; font-weight: bold; border-radius: 25px;">
        Yazıldı Tarihi: ${e.day}/${e.month}/${e.year}<br><pre style="font-size: 18px; font-weight: bold;">${e.metin}</pre>
        <div class="container d-flex justify-content-end p-0">
        <button class="btn btn-danger w-25" id="sil">SİL</button>
        </div>
      </div>`;
      const silButton = baseDiv.querySelector("#sil");
      silButton.setAttribute("data-metin", e.metin);
      silButton.addEventListener("click", deletee);
      newDiv.appendChild(baseDiv);
    });
    yazilar.appendChild(newDiv);
  }
  
}

document.addEventListener("DOMContentLoaded", Storage.ekranyuklendinde);
