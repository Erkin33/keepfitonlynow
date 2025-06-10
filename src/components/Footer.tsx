// src/components/Footer.tsx
import { FaInstagram, FaYoutube, FaTelegramPlane } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative z-10 w-full px-6 py-16 bg-black text-white overflow-hidden">
      {/* Градиентная рамка */}
      <div className="absolute inset-0 pointer-events-none border-[1.5px] border-transparent rounded-t-[40px] bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 opacity-20 blur-2xl" />

      <div className="relative z-10 max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 backdrop-blur-[4px] bg-white/5 rounded-3xl p-10 border border-white/10 shadow-[0_0_80px_-20px_rgba(255,0,255,0.4)]">
        
        {/* ЛОГО и описание */}
        <div className="flex flex-col gap-4">
          <h3 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            KeepfitOnly
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            Преврати движение в стиль жизни. Мы — твой путь к силе, балансу и дисциплине.
          </p>
        </div>

        {/* Навигация */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-white/90">Разделы</h4>
          <ul className="flex flex-col gap-3 text-gray-400">
            <li><a href="/blog" className="hover:text-pink-400 transition-all duration-300">› Блог</a></li>
            <li><a href="/calendar" className="hover:text-purple-400 transition-all duration-300">› Календарь</a></li>
            <li><a href="/workouts" className="hover:text-indigo-400 transition-all duration-300">› Тренировки</a></li>
          </ul>
        </div>

        {/* Контакты / CTA */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-white/90">Присоединяйся</h4>
          <p className="text-sm text-gray-400 mb-4">Подпишись на новости, мотивацию и советы.</p>
          <input
            type="email"
            placeholder="Твой email"
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button className="mt-3 w-full py-2 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90 font-bold text-sm transition-all">
            Подписаться
          </button>
        </div>

        {/* Соцсети */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-white/90">Мы в сети</h4>
          <div className="flex gap-4 text-2xl text-white">
            <a href="#" className="hover:text-pink-400 transition-all"><FaInstagram /></a>
            <a href="#" className="hover:text-purple-400 transition-all"><FaYoutube /></a>
            <a href="#" className="hover:text-indigo-400 transition-all"><FaTelegramPlane /></a>
          </div>
        </div>
      </div>

      {/* Нижняя строка */}
      <div className="mt-10 text-center text-xs text-gray-500 tracking-wide uppercase">
        &copy; {new Date().getFullYear()} KeepfitOnly — Все права защищены
      </div>
    </footer>
  );
}
