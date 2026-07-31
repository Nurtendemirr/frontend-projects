//document.getElementById(...) ne yapar? HTML içindeki belli bir elemanı, id değerine göre bulur.
const addBookmarkBtn = document.getElementById("add-bookmark"); //Add Bookmark butonunu bulur ve addBookmarkBtn değişkenine koyar.
const bookmarkList = document.getElementById("bookmark-list"); //Bu satır bookmarkların ekleneceği ul listesini bulur.
const bookmarkNameInput = document.getElementById("bookmark-name"); //Bu, bookmark adı yazılan input alanını seçer.
const bookmarkUrlInput = document.getElementById("bookmark-url");  //Bu da URL yazılan input alanını seçer.

document.addEventListener("DOMContentLoaded", loadBookmarks);  //Sayfa açılınca kayıtlı bookmarkları yükledik

addBookmarkBtn.addEventListener("click", function () {  //Add Bookmark butonuna tıklanınca bu fonksiyonu çalıştır.
  const name = bookmarkNameInput.value.trim();  //Kullanıcının inputa yazdığı değeri alır.
  const url = bookmarkUrlInput.value.trim();  

  if (!name || !url) {  //Yani kullanıcı iki alanı da doldurmadıysa uyarı veriyoruz.
    alert("Please enter both name and URL.");  //Ekrana küçük uyarı kutusu çıkarır.
    return;  //Fonksiyonu burada durdurur.
  } else {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {  //url doğrulaması yaptık,URL mutlaka http:// veya https:// ile başlamalı.
      alert("Please enter a valid URL starting with http:// or https://");  //Yani URL yanlışsa işlem devam etmez.
      return;
    }

    addBookmark(name, url);  //Bookmark’ı ekranda listeye ekler.
    saveBookmark(name, url);  //Bookmark’ı localStorage’a kaydeder.
    bookmarkNameInput.value = "";  //ınputları temziledik,böylece kullanıcı yeni bookmark girebilir.
    bookmarkUrlInput.value = "";
  }
});

function addBookmark(name, url) {  //Verilen isim ve url ile ekranda bir bookmark satırı oluşturmak
  const li = document.createElement("li");  //Bu satır yeni bir liste elemanı üretir.
  const link = document.createElement("a");  //link oluşturduk
  link.href = url; //linkin adresini verdik
  link.textContent = name; //linkte görünen yazıyı verdik
  link.target = "_blank";  //linkin yeni ssayfada açılmasını sağlar.

  const removeButton = document.createElement("button");  //yeni buton oluşturuyoruz.
  removeButton.textContent = "Remove";  //butonun yazısını belirledik
  removeButton.addEventListener("click", function () {  //remove butonuna click olayı ekledik 
    bookmarkList.removeChild(li);  //li elemanını listeden kaldırıyoruz.
    removeBookmarkFromStorage(name, url);  //storageden da siliyoruz.Sadece ekrandan silsek sayfa yüklenince tekar gelirdi stroagede kalırsa.
  });

  li.appendChild(link);  //link ve buton içine li koyduk
  li.appendChild(removeButton);

  bookmarkList.appendChild(li);  // li yi listeye ekledik
}

function getBookmarksFromStorage() {  //local stroragedeki bookmarklerı alır.
  const bookmarks = localStorage.getItem("bookmarks");  //Tarayıcı hafızasında "bookmarks" anahtarındaki veriyi getirir.
  return bookmarks ? JSON.parse(bookmarks) : [];  //Eğer storage’da veri varsa → onu JSON’dan gerçek diziye çevir.Eğer yoksa → boş dizi döndür.String veriyi JavaScript dizisine/objesine çevirir.
}

function saveBookmark(name, url) {  //Bu fonksiyon bookmarkı storage’a kaydeder.
  const bookmarks = getBookmarksFromStorage();  //Daha önce kayıtlı bookmarklar varsa onları alıyoruz.
  bookmarks.push({ name, url });  //Dizinin sonuna yeni obje ekliyoruz.
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));  //JavaScript dizisini stringe çevirir.Çünkü localstoragede sadece string saklar.
}

function loadBookmarks() { //Storage’daki bookmarkları alıp ekranda tekrar göstermek
  const bookmarks = getBookmarksFromStorage();  //Storage’dan hepsini aldık
  bookmarks.forEach((bookmark) => addBookmark(bookmark.name, bookmark.url));  //Hepsini tek tek ekrana bastık
}

function removeBookmarkFromStorage(name, url) {  //Silinen bookmarkı localStorage’dan kaldırmak
  let bookmarks = getBookmarksFromStorage();  //Önce storage’daki bookmarkları aldık
  bookmarks = bookmarks.filter((bookmark) => bookmark.name !== name || bookmark.url !== url);  //filter ile silmek istediğimiz bookmark dışındakileri tuttuk
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));  //Yeni diziyi tekrar storage’a yazdık
}

