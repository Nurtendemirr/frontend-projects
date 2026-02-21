// DOM Elements
// Bu bölümde, HTML belgesindeki belirli elementleri seçmek ve JavaScript kodunda kullanmak için değişkenler tanımlanır. Her bir değişken, HTML’deki belirli bir elementi temsil eder ve bu elementler quiz oyununu oluşturmak ve yönetmek için kullanılır. const ile tanımlanmış değerleri değiştirilemez, yani bu değişkenler bir kez atandıktan sonra başka bir değere atanamaz. Ancak, bu değişkenlerin temsil ettiği HTML elementlerinin içeriği veya özellikleri değiştirilebilir.
const startScreen = document.getElementById("start-screen"); /*HTML’de id="start-screen" olan elementi seçer.*/
const quizScreen = document.getElementById("quiz-screen"); /*HTML’de id="quiz-screen" olan elementi seçer. Bu element, quiz ekranını temsil eder ve başlangıçta gizlenmiş olabilir.*/
const resultScreen = document.getElementById("result-screen"); /*HTML’de id="result-screen" olan elementi seçer. Bu element, quiz tamamlandığında sonuç ekranını temsil eder ve başlangıçta gizlenmiş olabilir.*/
const startButton = document.getElementById("start-btn"); /*HTML’de id="start-btn" olan elementi seçer. Bu element, quiz oyununu başlatmak için kullanılan bir butonu temsil eder.*/
const questionText = document.getElementById("question-text"); /*HTML’de id="question-text" olan elementi seçer. Bu element, quiz sorularını göstermek için kullanılır.*/
const answersContainer = document.getElementById("answers-container"); /*HTML’de id="answers-container" olan elementi seçer. Bu element, quiz sorularına verilen cevap seçeneklerini içeren bir konteyneri temsil eder.*/
const currentQuestionSpan = document.getElementById("current-question"); /*HTML’de id="current-question" olan elementi seçer. Bu element, quiz sırasında mevcut soru numarasını göstermek için kullanılır.*/
const totalQuestionsSpan = document.getElementById("total-questions"); /*HTML’de id="total-questions" olan elementi seçer. Bu element, quiz sırasında toplam soru sayısını göstermek için kullanılır.*/
const scoreSpan = document.getElementById("score"); /*HTML’de id="score" olan elementi seçer. Bu element, quiz sırasında kullanıcının mevcut skorunu göstermek için kullanılır.*/   
const finalScoreSpan = document.getElementById("final-score"); /*HTML’de id="final-score" olan elementi seçer. Bu element, quiz tamamlandığında kullanıcının final skorunu göstermek için kullanılır.*/
const maxScoreSpan = document.getElementById("max-score"); /*HTML’de id="max-score" olan elementi seçer. Bu element, quiz tamamlandığında maksimum skoru göstermek için kullanılır.*/   
const resultMessage = document.getElementById("result-message"); /*HTML’de id="result-message" olan elementi seçer. Bu element, quiz tamamlandığında kullanıcının performansına göre bir sonuç mesajı göstermek için kullanılır.*/
const restartButton = document.getElementById("restart-btn"); /*id="restart-btn" olan butonu seçer.Kullanıcı buna basınca quiz baştan başlar.*/
const progressBar = document.getElementById("progress"); /*HTML’de id="progress" olan elementi seçer. Bu element, quiz sırasında ilerlemeyi göstermek için kullanılan bir ilerleme çubuğunu temsil eder.*/

const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

let currentQuestionIndex = 0; /*Quiz sırasında hangi sorunun gösterildiğini takip etmek için kullanılan bir değişken. Başlangıçta 0 olarak atanır, yani ilk soru gösterilir.*/
let score = 0; /*Kullanıcının quiz sırasında kazandığı puanı takip etmek için kullanılan bir değişken. Başlangıçta 0 olarak atanır, yani kullanıcı henüz puan kazanmaz.*/
let answersDisabled = false; /*Cevap seçeneklerinin tıklanabilir olup olmadığını kontrol etmek için kullanılan bir değişken. Başlangıçta false olarak atanır, yani cevap seçenekleri tıklanabilir durumdadır. Cevap verildikten sonra bu değişken true yapılarak cevap seçenekleri devre dışı bırakılabilir, böylece kullanıcı bir soruya sadece bir kez cevap verebilir.*/ 

totalQuestionsSpan.textContent = quizQuestions.length; /*HTML elementinin textContent özelliğini, quizQuestions dizisinin uzunluğuna eşit olarak ayarlar. Bu, toplam soru sayısını göstermek için kullanılır.*/
maxScoreSpan.textContent = quizQuestions.length; /*HTML elementinin textContent özelliğini, quizQuestions dizisinin uzunluğuna eşit olarak ayarlar. Bu, maksimum skoru göstermek için kullanılır, çünkü her doğru cevap 1 puan kazandırır ve toplam soru sayısı kadar puan kazanılabilir.*/ 

startButton.addEventListener("click", startQuiz); /*startButton elementine bir "click" olayı dinleyicisi ekler. Kullanıcı startButton'a tıkladığında, startQuiz fonksiyonu çağrılır ve quiz başlatılır.*/
restartButton.addEventListener("click", restartQuiz); /*restartButton elementine bir "click" olayı dinleyicisi ekler. Kullanıcı restartButton'a tıkladığında, restartQuiz fonksiyonu çağrılır ve quiz yeniden başlatılır.*/

function startQuiz() {

    currentQuestionIndex = 0; /*Quiz başlatıldığında, currentQuestionIndex değişkeni 0 olarak atanır, böylece quiz ilk sorudan başlar.*/
    score = 0; /*Quiz başlatıldığında, score değişkeni 0 olarak atanır, böylece kullanıcı sıfır puanla başlar.*/
    scoreSpan.textContent = 0; /*HTML elementinin textContent özelliğini 0 olarak ayarlar. Bu, quiz başlatıldığında kullanıcının skorunu sıfır olarak göstermek için kullanılır.*/

    startScreen.classList.remove("active"); /*startScreen elementinden "active" sınıfını kaldırır. Bu, başlangıç ekranını gizlemek için kullanılır.*/
    quizScreen.classList.add("active"); /*quizScreen elementine "active" sınıfını ekler. Bu, quiz ekranını göstermek için kullanılır.*/

    showQuestion(); /*showQuestion fonksiyonunu çağırır. Bu fonksiyon, quiz ekranında ilk soruyu göstermek için kullanılır.*/
  }

function showQuestion() {

    answersDisabled = false; /*Cevap seçeneklerinin tıklanabilir olduğunu belirtir. Bu, her yeni soru gösterildiğinde cevap seçeneklerinin aktif hale gelmesini sağlar.*/

    const currentQuestion = quizQuestions[currentQuestionIndex]; /*currentQuestion değişkenine, quizQuestions dizisindeki currentQuestionIndex ile belirtilen soruyu atar. Bu, şu anda gösterilmekte olan soruyu temsil eder.*/

    currentQuestionSpan.textContent = currentQuestionIndex + 1; /*HTML elementinin textContent özelliğini, currentQuestionIndex değişkenine 1 eklenmiş haliyle ayarlar. Bu, kullanıcıya mevcut soru numarasını göstermek için kullanılır. currentQuestionIndex sıfır tabanlı olduğu için, kullanıcıya doğru soru numarasını göstermek için 1 eklenir.*/
    const progressPercent = ((currentQuestionIndex) / quizQuestions.length) * 100; /*progressPercent değişkenine, currentQuestionIndex'in quizQuestions dizisinin uzunluğuna bölünüp 100 ile çarpılmasıyla elde edilen değeri atar. Bu, quiz ilerlemesini yüzde olarak hesaplamak için kullanılır.*/

    progressBar.style.width = progressPercent + "%"; /*progressBar elementinin style.width özelliğini, progressPercent değişkenine yüzde işareti eklenmiş haliyle ayarlar. Bu, ilerleme çubuğunun genişliğini quiz ilerlemesine göre dinamik olarak güncellemek için kullanılır.*/

    questionText.textContent = currentQuestion.question; /*HTML elementinin textContent özelliğini, currentQuestion değişkeninin question özelliğiyle ayarlar. Bu, quiz ekranında mevcut soruyu göstermek için kullanılır.*/

    answersContainer.innerHTML = ""; /*answersContainer elementinin innerHTML özelliğini boş bir string olarak ayarlar. Bu, her yeni soru gösterildiğinde önceki cevap seçeneklerini temizlemek için kullanılır.*/

    currentQuestion.answers.forEach((answer) => { /*currentQuestion.answers dizisindeki her bir answer öğesi için bir döngü başlatır. Bu döngü, mevcut sorunun cevap seçeneklerini oluşturmak ve göstermek için kullanılır.*/
    const button = document.createElement("button"); /*Yeni bir button elementi oluşturur ve button değişkenine atar. Bu, her bir cevap seçeneği için bir buton oluşturmak için kullanılır.*/
    button.textContent = answer.text; /*button elementinin textContent özelliğini, answer değişkeninin text özelliğiyle ayarlar. Bu, butonun üzerinde cevap metnini göstermek için kullanılır.*/
    button.classList.add("answer-btn"); /*button elementine "answer-btn" sınıfını ekler. Bu, CSS ile bu butonlara özel stiller uygulamak için kullanılır.*/

    button.dataset.correct = answer.correct; /*button elementinin dataset.correct özelliğini, answer değişkeninin correct özelliğiyle ayarlar. Bu, butonun doğru cevaba mı yoksa yanlış cevaba mı karşılık geldiğini belirtmek için kullanılır. Bu bilgi, kullanıcı bir cevaba tıkladığında doğru veya yanlış olduğunu kontrol etmek için kullanılabilir.*/ 

    button.addEventListener("click", selectAnswer); /*button elementine bir "click" olayı dinleyicisi ekler. Kullanıcı bu butona tıkladığında, selectAnswer fonksiyonu çağrılır ve hangi cevaba tıklandığını kontrol etmek için kullanılır.*/

    answersContainer.appendChild(button); /*button elementini answersContainer elementinin sonuna ekler. Bu, oluşturulan cevap butonlarını quiz ekranında göstermek için kullanılır. Her bir cevap seçeneği için bu işlem tekrarlanır, böylece tüm cevap seçenekleri kullanıcıya sunulur.*/
  });
}

function selectAnswer(event) { /*selectAnswer fonksiyonu, kullanıcı bir cevap butonuna tıkladığında çağrılır. Bu fonksiyon, hangi cevaba tıklandığını kontrol eder, doğru veya yanlış olduğunu belirler, skoru günceller ve bir sonraki soruya geçmeden önce kullanıcıya geri bildirim sağlar.*/
  // optimization check
  if (answersDisabled) return; /*Eğer answersDisabled değişkeni true ise, fonksiyonun geri kalanını çalıştırmadan hemen çıkmasını sağlar. Bu, kullanıcı bir cevaba tıkladıktan sonra cevap seçeneklerini devre dışı bırakmak ve birden fazla cevaba tıklanmasını önlemek için kullanılır.*/

  answersDisabled = true; /*Cevap seçeneklerini devre dışı bırakır. Bu, kullanıcı bir cevaba tıkladıktan sonra diğer cevap seçeneklerine tıklanmasını önlemek için kullanılır. Böylece kullanıcı sadece bir cevaba tıklayabilir ve birden fazla cevaba tıklayarak skoru yanlış şekilde artırmaz.*/

  const selectedButton = event.target; /*Kullanıcının tıkladığı butonu temsil eder. event.target, tıklanan HTML elementini döndürür ve bu element selectedButton değişkenine atanır. Bu, hangi cevaba tıklandığını belirlemek için kullanılır.*/
  const isCorrect = selectedButton.dataset.correct === "true"; /*selectedButton elementinin dataset.correct özelliğinin "true" stringine eşit olup olmadığını kontrol eder. Eğer eşitse, isCorrect değişkeni true olur, bu da kullanıcının doğru cevaba tıkladığını gösterir. Eğer eşit değilse, isCorrect değişkeni false olur, bu da kullanıcının yanlış cevaba tıkladığını gösterir. Bu bilgi, skoru güncellemek ve kullanıcıya geri bildirim sağlamak için kullanılır.*/

  // Here Array.from() is used to convert the NodeList returned by answersContainer.children into an array, this is because the NodeList is not an array and we need to use the forEach method
  Array.from(answersContainer.children).forEach((button) => { /*answersContainer elementinin children özelliği, answersContainer içindeki tüm çocuk elementleri (cevap butonları) içeren bir NodeList döndürür. Array.from() yöntemi, bu NodeList'i gerçek bir diziye dönüştürür, böylece forEach gibi dizi yöntemlerini kullanabiliriz. forEach döngüsü, her bir button elementini tek tek işlemek için kullanılır. Bu döngüde, her bir button'un dataset.correct özelliği kontrol edilir ve doğru cevaba sahip butonlara "correct" sınıfı eklenirken, yanlış cevaba sahip butonlara "incorrect" sınıfı eklenir. Bu, kullanıcıya hangi cevabın doğru olduğunu görsel olarak göstermek için kullanılır.*/
    if (button.dataset.correct === "true") { /*button elementinin dataset.correct özelliğinin "true" stringine eşit olup olmadığını kontrol eder. Eğer eşitse, bu button doğru cevaba sahip demektir ve bu durumda button'a "correct" sınıfı eklenir. Bu, kullanıcıya hangi cevabın doğru olduğunu görsel olarak göstermek için kullanılır.*/
      button.classList.add("correct"); /*button elementine "correct" sınıfını ekler. Bu, CSS ile bu butona özel bir stil uygulamak için kullanılır, genellikle doğru cevaba sahip butonları yeşil renkte göstermek için kullanılır.*/
    } else if (button === selectedButton) { /*Eğer button elementinin dataset.correct özelliği "true" değilse, bu button yanlış cevaba sahip demektir. Ancak, sadece kullanıcı tarafından seçilen butona "incorrect" sınıfı eklenir. Bu, kullanıcıya hangi cevaba tıkladığını ve bu cevabın yanlış olduğunu görsel olarak göstermek için kullanılır. Diğer yanlış cevaplara "incorrect" sınıfı eklenmez, böylece sadece kullanıcı tarafından seçilen yanlış cevap vurgulanır.*/
      button.classList.add("incorrect"); /*button elementine "incorrect" sınıfını ekler. Bu, CSS ile bu butona özel bir stil uygulamak için kullanılır, genellikle yanlış cevaba sahip butonları kırmızı renkte göstermek için kullanılır. Ancak, bu sınıf sadece kullanıcı tarafından seçilen yanlış cevaba eklenir, böylece kullanıcıya hangi cevaba tıkladığını ve bu cevabın yanlış olduğunu görsel olarak göstermek için kullanılır.*/
    }
  });

  if (isCorrect) { /*Eğer isCorrect değişkeni true ise, bu kullanıcı doğru cevaba tıkladığı anlamına gelir ve bu durumda skor artırılır. Bu, kullanıcının doğru cevap verdiğinde ödüllendirilmesi için kullanılır.*/
    score++;
    scoreSpan.textContent = score; /*HTML elementinin textContent özelliğini, score değişkeninin güncellenmiş değeriyle ayarlar. Bu, quiz sırasında kullanıcının mevcut skorunu güncellemek ve göstermek için kullanılır. Her doğru cevap verildiğinde skor artırılır ve bu yeni skor kullanıcıya gösterilir.*/
  }

  setTimeout(() => { /*setTimeout fonksiyonu, belirli bir süre (bu örnekte 1000 milisaniye veya 1 saniye) sonra belirtilen kod bloğunu çalıştırmak için kullanılır. Bu, kullanıcıya cevap verdikten sonra geri bildirim görmesi için kısa bir süre tanımak ve ardından bir sonraki soruya geçmek için kullanılır. Kullanıcı bir cevaba tıkladığında, doğru veya yanlış olduğunu görsel olarak görebilir ve ardından 1 saniye sonra currentQuestionIndex artırılarak bir sonraki soru gösterilir veya quiz tamamlanırsa sonuç ekranına geçilir.*/
    currentQuestionIndex++; /*currentQuestionIndex değişkenini 1 artırır. Bu, quiz sırasında bir sonraki soruya geçmek için kullanılır. Kullanıcı bir cevaba tıkladıktan sonra, belirli bir süre (örneğin 1 saniye) bekledikten sonra bu kod çalışır ve currentQuestionIndex'i artırarak bir sonraki soruyu göstermek için hazırlar.*/
 
    // check if there are more questions or if the quiz is over
    if (currentQuestionIndex < quizQuestions.length) { /*currentQuestionIndex'in quizQuestions dizisinin uzunluğundan küçük olup olmadığını kontrol eder. Eğer currentQuestionIndex, quizQuestions.length'den küçükse, bu hala gösterilecek sorular olduğu anlamına gelir ve showQuestion fonksiyonu çağrılarak bir sonraki soru gösterilir. Eğer currentQuestionIndex, quizQuestions.length'e eşit veya büyükse, bu quiz'in tamamlandığı anlamına gelir ve showResults fonksiyonu çağrılarak sonuç ekranı gösterilir. Bu kontrol, quiz sırasında kullanıcıya sırayla soruları göstermek ve quiz tamamlandığında sonuçları göstermek için kullanılır.*/
      showQuestion(); /*showQuestion fonksiyonunu çağırır. Bu, quiz sırasında bir sonraki soruyu göstermek için kullanılır. currentQuestionIndex artırıldıktan sonra, eğer hala gösterilecek soru varsa, showQuestion fonksiyonu yeni soruyu ekrana getirir.*/
    } else {
      showResults(); /*showResults fonksiyonunu çağırır. Bu, quiz tamamlandığında sonuç ekranını göstermek için kullanılır. currentQuestionIndex artırıldıktan sonra, eğer gösterilecek soru kalmadıysa, showResults fonksiyonu çağrılarak kullanıcıya final skorunu ve performansına göre bir mesaj gösterilir.*/
    }
  }, 1000);
}

function showResults() { /*showResults fonksiyonu, quiz tamamlandığında sonuç ekranını göstermek için kullanılır. Bu fonksiyon, quiz ekranını gizler, sonuç ekranını gösterir, final skoru günceller ve kullanıcının performansına göre bir mesaj belirler ve gösterir. Bu, kullanıcıya quiz sonunda ne kadar başarılı olduğunu göstermek için kullanılır.*/
  quizScreen.classList.remove("active"); /*quizScreen elementinden "active" sınıfını kaldırır. Bu, quiz ekranını gizlemek için kullanılır. Quiz tamamlandığında, kullanıcıya artık sorular gösterilmez, bu nedenle quiz ekranı devre dışı bırakılır.*/
  resultScreen.classList.add("active"); /*resultScreen elementine "active" sınıfını ekler. Bu, sonuç ekranını göstermek için kullanılır. Quiz tamamlandığında, kullanıcıya final skorunu ve performansına göre bir mesaj göstermek için sonuç ekranı aktif hale getirilir.*/

  finalScoreSpan.textContent = score; /*HTML elementinin textContent özelliğini, score değişkeninin değeriyle ayarlar. Bu, quiz tamamlandığında kullanıcının final skorunu göstermek için kullanılır. Kullanıcıya kaç doğru cevap verdiği gösterilir.*/

  const percentage = (score / quizQuestions.length) * 100; /*percentage değişkenine, score değişkeninin quizQuestions dizisinin uzunluğuna bölünüp 100 ile çarpılmasıyla elde edilen değeri atar. Bu, kullanıcının doğru cevaplarının yüzdesini hesaplamak için kullanılır. Bu yüzde, kullanıcının performansını değerlendirmek ve ona uygun bir sonuç mesajı göstermek için kullanılır.*/

  if (percentage === 100) { /*Eğer percentage değişkeninin değeri tam olarak 100 ise, bu kullanıcı tüm sorulara doğru cevap verdiği anlamına gelir ve bu durumda resultMessage elementinin textContent özelliği "Perfect! You're a genius!" olarak ayarlanır. Bu, kullanıcıya mükemmel bir performans sergilediğini ve tüm soruları doğru cevapladığını belirtmek için kullanılır.*/
    resultMessage.textContent = "Perfect! You're a genius!"; /*resultMessage elementinin textContent özelliğini "Perfect! You're a genius!" olarak ayarlar. Bu, kullanıcıya mükemmel bir performans sergilediğini ve tüm soruları doğru cevapladığını belirtmek için kullanılır. Eğer kullanıcı tüm sorulara doğru cevap verdiyse, bu mesaj gösterilir ve kullanıcıya ne kadar başarılı olduğunu vurgular.*/
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!"; /*resultMessage elementinin textContent özelliğini "Great job! You know your stuff!" olarak ayarlar. Bu, kullanıcıya çok iyi bir performans sergilediğini ve sorulara büyük ölçüde doğru cevap verdiğini belirtmek için kullanılır. Eğer kullanıcı soruların %80'ine veya daha fazlasına doğru cevap verdiyse, bu mesaj gösterilir ve kullanıcıya ne kadar başarılı olduğunu vurgular.*/
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!"; /*resultMessage elementinin textContent özelliğini "Good effort! Keep learning!" olarak ayarlar. Bu, kullanıcıya iyi bir performans sergilediğini ve sorulara çoğunlukla doğru cevap verdiğini belirtmek için kullanılır. Eğer kullanıcı soruların %60'ına veya daha fazlasına doğru cevap verdiyse, bu mesaj gösterilir ve kullanıcıya ne kadar başarılı olduğunu vurgular, ancak aynı zamanda daha fazla öğrenmeye teşvik eder.*/  
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!"; /*resultMessage elementinin textContent özelliğini "Not bad! Try again to improve!" olarak ayarlar. Bu, kullanıcıya fena olmayan bir performans sergilediğini ve sorulara bazı doğru cevaplar verdiğini belirtmek için kullanılır. Eğer kullanıcı soruların %40'ına veya daha fazlasına doğru cevap verdiyse, bu mesaj gösterilir ve kullanıcıya ne kadar başarılı olduğunu vurgular, ancak aynı zamanda tekrar denemeye teşvik eder.*/   
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!"; /*resultMessage elementinin textContent özelliğini "Keep studying! You'll get better!" olarak ayarlar. Bu, kullanıcıya daha düşük bir performans sergilediğini ve sorulara çok az doğru cevap verdiğini belirtmek için kullanılır. Eğer kullanıcı soruların %40'ından daha azına doğru cevap verdiyse, bu mesaj gösterilir ve kullanıcıya ne kadar başarılı olduğunu vurgular, ancak aynı zamanda daha fazla çalışmaya teşvik eder.*/  
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}