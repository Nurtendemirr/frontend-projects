const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isRequiredValid = checkRequired([username, email, password, confirmPassword]); //boş alan kontrolü yapar 

  let isFormValid = isRequiredValid; //form geçerli mi değişkeni

  if (isRequiredValid) { //boş aln yoksa diğer kontroller yani tüm alanlar doluysa 
    const isUsernameValid = checkLength(username, 3, 15); //username uzunluk kontrolü
    const isEmailValid = checkEmail(email); //email format kontrollü
    const isPasswordValid = checkLength(password, 6, 25); //password uzunluk kontrolü
    const isPasswordsMatch = checkPasswordsMatch(password, confirmPassword); //şifreler aynı mı kontrolü

    isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isPasswordsMatch; //tüm kontrolleri birleştirme yani hepsi doğru oolmalı
  }

  if (isFormValid) { //eğer tüm validationlar doğruysa bu blok çalışır 
    alert("Registration successful!"); //başarılı mesajı
    form.reset(); //formu temizleme
    document.querySelectorAll(".form-group").forEach((group) => { //hata başarı claslarını sıfırlama 
      group.className = "form-group";
    });
  }
});

function checkPasswordsMatch(input1, input2) { //ik şifrenin doğru olup olmadığını kontrol eder
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
    return false;
  }
  return true;
}

function checkEmail(email) {
  // Email regex that covers most common email formats
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email.value.trim())) { //regex ile kontrol email doğru ise bu blok çalışır
    showSuccess(email);
    return true;
  } else {
    showError(email, "Email is not valid");
    return false;
  }
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${formatFieldName(input)} must be at least ${min} characters.`); //eğer karakter sayısı minimumdan lüçükse hata gösterilir.
    return false;
  } else if (input.value.length > max) { //maksimum karakter kontrolü
    showError(input, `${formatFieldName(input)} must be less than ${max} characters.`); //eğer karaket sayısı maximumdan uzunsa hata veririr
    return false;
  } else { //uzunluk doğruysa bu blokm çalışır
    showSuccess(input);
    return true;
  }
}

function checkRequired(inputArray) { //bu fonkisyon bi input listesi alır 
  let isValid = true; //Başlangıçta formu geçerli kabul ediyoruz.

  inputArray.forEach((input) => { //inputları tek tek kontrol etme 
    // Password is required
    if (input.value.trim() === "") { //boş mu kontrolü trim baştaki ve sondaki boşlukları kaldırır
      showError(input, `${formatFieldName(input)} is required`);
      isValid = false; //form artık geçersiz
    } else {
      showSuccess(input);  //eğer boş eğilse bu input doğru demektir
    }
  });

  return isValid;
}

// Format field name with proper capitalization
function formatFieldName(input) {  //input ismini düzgün yapma 
  // input id: username -> Username
  return input.id.charAt(0).toUpperCase() + input.id.slice(1); //ilk harfi büyüütme sonra klan kısmı ekleme 
}

function showError(input, message) { //hata mesajı gösteriri
  const formGroup = input.parentElement;  //inputun parent elementini bulma 
  formGroup.className = "form-group error";
  const small = formGroup.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {  //başarı gösterme 
  const formGroup = input.parentElement;
  formGroup.className = "form-group success";
}