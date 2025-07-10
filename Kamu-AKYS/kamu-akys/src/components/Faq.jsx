import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';

const faqData = [
  {
    question: "Açık kaynak yazılım nedir?",
    answer: "Açık kaynak yazılım, kaynak kodunun herkes tarafından görüntülenebildiği, değiştirilebildiği ve dağıtılabildiği bir yazılım türüdür. Bu, şeffaflığı, iş birliğini ve inovasyonu teşvik eder."
  },
  {
    question: "Kamuda açık kaynak kullanmak güvenli mi?",
    answer: "Evet, güvenlidir. Açık kaynak kod, dünya çapında binlerce geliştirici tarafından sürekli olarak incelenir ve test edilir. Bu, güvenlik açıklarının ticari yazılımlara göre daha hızlı tespit edilip kapatılmasını sağlar. Ayrıca, kurumlar kodları kendileri denetleyebilir."
  },
  {
    question: "Açık kaynak yazılım kullanmak maliyetleri düşürür mü?",
    answer: "Evet, genellikle önemli ölçüde düşürür. Açık kaynak yazılımlar için lisans ücreti ödenmez. Maliyetler, genellikle kurulum, özelleştirme, bakım ve destek hizmetleri için harcanır. Bu da kamu kaynaklarının daha verimli kullanılmasını sağlar."
  },
  {
    question: "Açık kaynak yazılımda destek ve güncelleme nasıl sağlanır?",
    answer: "Destek ve güncellemeler, genellikle geniş bir topluluk tarafından veya projeyi destekleyen ticari firmalar tarafından sağlanır. Kamu kurumları, kendi bünyelerindeki teknik ekiplerle veya hizmet alımı yoluyla da bu süreçleri yönetebilirler."
  }
];

const FaqItem = ({ faq, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-800 focus:outline-none"
      >
        <span>{faq.question}</span>
        <FaChevronDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : 'text-gray-500'}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
        <p className="text-gray-600 pr-4">
          {faq.answer}
        </p>
      </div>
    </div>
  );
};

export default function Faq() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-20 px-4">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800 drop-shadow-md">Sık Sorulan Sorular</h2>
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
        {faqData.map((faq, index) => (
          <FaqItem
            key={index}
            faq={faq}
            isOpen={openFaq === index}
            onClick={() => toggleFaq(index)}
          />
        ))}
        {/* Katkı Sağlama Linki */}
        <div className="border-b border-gray-200 py-4">
            <Link 
                to="/nasil-katki-saglanir" 
                className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors"
            >
                <span>Bu projeye nasıl katkı sağlarım?</span>
                <FaChevronDown className="transform -rotate-90 text-gray-500" />
            </Link>
        </div>
      </div>
    </div>
  );
} 