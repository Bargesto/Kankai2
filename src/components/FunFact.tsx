import { useState, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';

const funFacts = [
  "Balina kalbi o kadar büyüktür ki, bir insan kalbin damarları içinde yüzebilir!",
  "Arılar beş gözle dünyayı görür!",
  "Uzayda yanardağlar vardır!",
  "Penguen kolonileri kreş sistemi kullanır!",
  "Zürafaların dilleri mavidir!",
  "Kelebekler ayaklarıyla tat alır!",
  "Yıldırımlar kumda cam oluşturabilir!",
  "Okyanuslar dünyadaki oksijen kaynağının %70'ini üretir!",
  "Karıncalar asla uyumaz!",
  "Koalalar parmak izi bırakır!",
  "Yunuslar uyurken beyinlerinin sadece yarısını kullanır!",
  "Uzay aslında kokusuz değildir, karamelize şeker gibi kokar!",
];

export function FunFact() {
  const [fact, setFact] = useState('');

  useEffect(() => {
    const changeFact = () => {
      const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
      setFact(randomFact);
    };

    changeFact();
    const interval = setInterval(changeFact, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 shadow-md border border-yellow-100 dark:border-yellow-900/30 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
        <h3 className="font-bold text-yellow-700 dark:text-yellow-300">İlginç Bilgi!</h3>
      </div>
      <p className="text-yellow-900 dark:text-yellow-100">{fact}</p>
    </div>
  );
}