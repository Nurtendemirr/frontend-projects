const generateBtn = document.getElementById("generate-btn"); //generate değişkeniyle HTMl içindeki butonu seçiyoruz.
const paletteContainer = document.querySelector(".palette-container"); //paletteContainer değişkeniyle HTML içindeki palette-container sınıfına sahip div'i seçiyoruz, bu div renk kutularını içerecek konteynerdir.

generateBtn.addEventListener("click", generatePalette); //generateBtn değişkenine tıklama olayı ekliyoruz, bu olay gerçekleştiğinde generatePalette fonksiyonu çağrılacak ve yeni bir renk paleti oluşturulacak.

paletteContainer.addEventListener("click", function (e) { //paletteContainer div'ine tıklama olayı ekliyoruz, bu olay gerçekleştiğinde fonksiyon çalışacak ve tıklanan öğe üzerinden işlemler yapacağız.
  if (e.target.classList.contains("copy-btn")) { //Eğer tıklanan öğe copy-btn sınıfına sahipse, yani kopyalama simgesine tıklanmışsa, işlemi gerçekleştireceğiz.
    const hexValue = e.target.previousElementSibling.textContent; //Tıklanan kopyalama simgesinin bir önceki kardeş öğesi olan hex-value sınıfına sahip span'in metin içeriğini alıyoruz, bu içerik renk kodunu temsil eder.

    navigator.clipboard //Tarayıcının clipboard API'sini kullanarak renk kodunu panoya kopyalamaya çalışıyoruz.
      .writeText(hexValue) //writeText() metodu ile hexValue değişkenindeki renk kodunu panoya yazıyoruz.
      .then(() => showCopySuccess(e.target)) //Kopyalama işlemi başarılı olursa, showCopySuccess fonksiyonunu çağırarak kopyalama simgesine başarı durumunu göstermek için gerekli işlemleri yapıyoruz.
      .catch((err) => console.log(err)); //Eğer kopyalama işlemi sırasında bir hata oluşursa, hatayı konsola yazdırıyoruz.
  } else if (e.target.classList.contains("color")) { //Eğer tıklanan öğe color sınıfına sahipse, yani renk bloğuna tıklanmışsa, işlemi gerçekleştireceğiz.
    const hexValue = e.target.nextElementSibling.querySelector(".hex-value").textContent; //Tıklanan renk bloğunun bir sonraki kardeş öğesi olan color-info sınıfına sahip div'in içinde bulunan hex-value sınıfına sahip span'in metin içeriğini alıyoruz, bu içerik renk kodunu temsil eder.
    navigator.clipboard //Tarayıcının clipboard API'sini kullanarak renk kodunu panoya kopyalamaya çalışıyoruz.
      .writeText(hexValue) //writeText() metodu ile hexValue değişkenindeki renk kodunu panoya yazıyoruz.
      .then(() => showCopySuccess(e.target.nextElementSibling.querySelector(".copy-btn"))) //Kopyalama işlemi başarılı olursa, showCopySuccess fonksiyonunu çağırarak renk bloğunun bir sonraki kardeş öğesi olan color-info sınıfına sahip div'in içinde bulunan copy-btn sınıfına sahip simgeye başarı durumunu göstermek için gerekli işlemleri yapıyoruz.
      .catch((err) => console.log(err)); //Eğer kopyalama işlemi sırasında bir hata oluşursa, hatayı konsola yazdırıyoruz.
  }
});

function showCopySuccess(element) { //Kopyalama işlemi başarılı olduğunda çağrılan fonksiyon, element parametresi kopyalama simgesini temsil eder.
  element.classList.remove("far", "fa-copy"); //Kopyalama simgesinin mevcut sınıflarını kaldırarak simgenin görünümünü değiştiriyoruz, böylece kullanıcı kopyalamanın başarılı olduğunu görsel olarak anlayabilir.
  element.classList.add("fas", "fa-check"); //Kopyalama simgesine yeni sınıflar ekleyerek simgenin görünümünü değiştiriyoruz, böylece kullanıcı kopyalamanın başarılı olduğunu görsel olarak anlayabilir.

  element.style.color = "#48bb78"; //Kopyalama simgesinin rengini yeşil yaparak kopyalamanın başarılı olduğunu görsel olarak daha belirgin hale getiriyoruz.

  setTimeout(() => { //Belirli bir süre sonra, yani 1.5 saniye sonra, kopyalama simgesinin görünümünü ve rengini eski haline getirmek için işlemler yapıyoruz.
    element.classList.remove("fas", "fa-check"); //Kopyalama simgesinin mevcut sınıflarını kaldırarak simgenin görünümünü eski haline getiriyoruz.
    element.classList.add("far", "fa-copy"); //Kopyalama simgesine eski sınıflarını ekleyerek simgenin görünümünü eski haline getiriyoruz.
    element.style.color = ""; //Kopyalama simgesinin rengini varsayılan değere döndürerek simgenin görünümünü eski haline getiriyoruz.
  }, 1500);
}

function generatePalette() { //Renk paletini oluşturmak için kullanılan fonksiyon, bu fonksiyon çağrıldığında yeni bir renk paleti oluşturulacak ve ekranda gösterilecektir.
  const colors = []; //Renkleri saklamak için boş bir dizi oluşturuyoruz, bu dizi generateRandomColor fonksiyonu tarafından oluşturulan rastgele renkleri içerecek.

  for (let i = 0; i < 5; i++) { //5 kez dönen bir döngü oluşturuyoruz, böylece 5 farklı renk oluşturulacak ve renk paletinde gösterilecektir.
    colors.push(generateRandomColor()); //generateRandomColor fonksiyonunu çağırarak rastgele bir renk oluşturuyoruz ve bu rengi colors dizisine ekliyoruz, böylece oluşturulan renkler palet için kullanılabilir hale geliyor.
  }

  updatePaletteDisplay(colors); //Oluşturulan renkleri ekranda göstermek için updatePaletteDisplay fonksiyonunu çağırıyoruz, colors dizisini parametre olarak geçirerek oluşturulan renklerin ekranda gösterilmesini sağlıyoruz.
}

function generateRandomColor() {  //Rastgele bir renk oluşturmak için kullanılan fonksiyon, bu fonksiyon çağrıldığında rastgele bir renk kodu oluşturacak ve döndürecektir.
  const letters = "0123456789ABCDEF"; //Renk kodunu oluşturmak için kullanılacak karakterleri içeren bir string oluşturuyoruz, bu karakterler hexadecimal renk kodlarında kullanılan karakterlerdir (0-9 ve A-F).
  let color = "#"; //Renk kodunun başlangıcını temsil eden "#" karakteriyle başlayan bir string oluşturuyoruz, bu string daha sonra rastgele karakterler eklenerek tam bir renk kodu haline getirilecektir.

  for (let i = 0; i < 6; i++) { //6 kez dönen bir döngü oluşturuyoruz, böylece renk kodu için 6 karakter oluşturulacak ve renk kodu tam bir hexadecimal formatında olacaktır (örneğin, #A1B2C3).
    color += letters[Math.floor(Math.random() * 16)]; //letters string'inden rastgele bir karakter seçmek için Math.random() ile 0 ile 1 arasında bir sayı oluşturuyoruz, bu sayıyı 16 ile çarparak 0 ile 15 arasında bir sayı elde ediyoruz, Math.floor() ile bu sayıyı aşağı yuvarlayarak tam bir indeks elde ediyoruz ve letters string'inden bu indeksteki karakteri alarak color string'ine ekliyoruz.
  }
  return color; //Oluşturulan rastgele renk kodunu döndürüyoruz, bu renk kodu hexadecimal formatında olacaktır ve generatePalette fonksiyonu tarafından kullanılacaktır.
}

function updatePaletteDisplay(colors) { //Renk paletini ekranda göstermek için kullanılan fonksiyon, colors parametresi oluşturulan renkleri içeren bir dizi olarak alınır ve bu renkler ekranda gösterilir.
  const colorBoxes = document.querySelectorAll(".color-box"); //HTML içindeki tüm color-box sınıfına sahip div'leri seçiyoruz, bu div'ler renk kutularını temsil eder ve oluşturulan renklerin ekranda gösterileceği alanlardır.

  colorBoxes.forEach((box, index) => { //colorBoxes dizisindeki her bir color-box div'i için bir döngü oluşturuyoruz, box parametresi şu anda işlenen color-box div'ini temsil eder ve index parametresi bu div'in sırasını temsil eder (0'dan başlayarak).
    const color = colors[index]; //colors dizisinden index sırasına göre bir renk alıyoruz, bu renk şu anda işlenen color-box div'ine atanacak ve ekranda gösterilecektir.
    const colorDiv = box.querySelector(".color"); //color sınıfına sahip div'i seçiyoruz, bu div renk bloğunu temsil eder ve oluşturulan rengin arka plan rengi olarak kullanılacaktır.
    const hexValue = box.querySelector(".hex-value"); //hex-value sınıfına sahip span'i seçiyoruz, bu span renk kodunu göstermek için kullanılacaktır ve oluşturulan renk kodu bu span'in metin içeriği olarak atanacaktır.

    colorDiv.style.backgroundColor = color; //colorDiv'in arka plan rengini oluşturulan renk kodu ile değiştiriyoruz, böylece renk bloğu oluşturulan rengi göstermek için güncellenmiş olur.
    hexValue.textContent = color; //hexValue span'inin metin içeriğini oluşturulan renk kodu ile değiştiriyoruz, böylece renk kodu renk kutusunun altında gösterilir ve kullanıcı oluşturulan rengin kodunu görebilir.
  });
}
