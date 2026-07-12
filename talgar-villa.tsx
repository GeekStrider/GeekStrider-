import { useState, useRef, useEffect } from "react";
import {
  Mountain,
  Waves,
  Flame,
  Users,
  Wifi,
  UtensilsCrossed,
  Car,
  ShieldCheck,
  Laptop,
  Instagram,
  MapPin,
  Star,
  Clock,
  Home,
  Sparkles,
  Send,
  Check,
  X,
} from "lucide-react";

const PALETTE = {
  base: "#12161C",
  panel: "#1A2129",
  panelSoft: "#212933",
  amber: "#E08A3C",
  amberSoft: "#F0B472",
  sand: "#EDE6D6",
  sandMuted: "#A9A093",
  pine: "#3A5346",
  hairline: "#2A323C",
};

// NOTE for whoever wires this up: replace this with the real inbox before going live.
const CONTACT_EMAIL = "stay@talgarvilla.example";
const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=Talgar+Villa+Talgar+Almaty+Region+Kazakhstan";
const INSTAGRAM_LINK = "https://www.instagram.com/talgar_villa/";

const PHOTOS = {
  hero: "https://a0.muscache.com/im/pictures/hosting/Hosting-1499728638052631827/original/3a4e62c3-57c5-42d1-abcd-a47c3ad4b882.jpeg?im_w=1440",
  pool: "https://a0.muscache.com/im/pictures/hosting/Hosting-1499728638052631827/original/9b259fc8-6771-43cb-8585-d541a4901a77.jpeg?im_w=1200",
  spa: "https://a0.muscache.com/im/pictures/hosting/Hosting-1499728638052631827/original/ee38ba44-c0dd-484e-9bf9-92e263ed537d.jpeg?im_w=1200",
  grounds: "https://a0.muscache.com/im/pictures/hosting/Hosting-1499728638052631827/original/8e426610-d573-41a8-9f51-63984a70b492.jpeg?im_w=1200",
  interior: "https://a0.muscache.com/im/pictures/hosting/Hosting-1499728638052631827/original/b4a2262e-c451-4afe-b8e0-c671357404ce.jpeg?im_w=1200",
  bedroom: "https://a0.muscache.com/im/pictures/hosting/Hosting-1499728638052631827/original/fdabde99-9c35-46b2-a8b3-c288115677ea.jpeg?im_w=1200",
};

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Photo({ src, alt, className }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        className={className}
        style={{ background: `linear-gradient(135deg, ${PALETTE.panelSoft}, ${PALETTE.pine})` }}
      />
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={className}
      style={{ objectFit: "cover" }}
    />
  );
}

function Ridge({ flip }) {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className="block h-16 w-full md:h-24"
      style={{ transform: flip ? "scaleY(-1)" : "none" }}
    >
      <defs>
        <linearGradient id="ridgeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={PALETTE.base} />
          <stop offset="55%" stopColor={PALETTE.pine} />
          <stop offset="100%" stopColor={PALETTE.amber} />
        </linearGradient>
      </defs>
      <path
        d="M0,120 L0,70 L120,40 L260,80 L420,20 L600,60 L760,10 L940,55 L1120,25 L1300,65 L1440,35 L1440,120 Z"
        fill="url(#ridgeGrad)"
        opacity="0.9"
      />
    </svg>
  );
}

const SPACES = [
  {
    icon: Sparkles,
    title: "Дом-СПА",
    desc: "Главное здание с витражными окнами — общая гостиная для компании до 10 человек, светлая и просторная в любое время суток.",
  },
  {
    icon: Flame,
    title: "Баня",
    desc: "Традиционная баня с отдельной комнатой отдыха — вечер после гор заканчивается здесь, у огня.",
  },
  {
    icon: Home,
    title: "Два гостевых дома",
    desc: "Приватные спальные корпуса — всего 3 спальни на территории, для семьи или пары компаний одновременно.",
  },
];

const AMENITIES = [
  { icon: UtensilsCrossed, label: "Кухня" },
  { icon: Wifi, label: "Wi-Fi по всей территории" },
  { icon: Laptop, label: "Рабочее место" },
  { icon: Car, label: "Бесплатная парковка" },
  { icon: Waves, label: "Открытый бассейн" },
  { icon: ShieldCheck, label: "Видеонаблюдение" },
];

const OCCASIONS = ["Семейный отдых", "Компания друзей", "Йога-ретрит", "Камерное торжество"];

const GALLERY = [
  { src: PHOTOS.grounds, alt: "Территория виллы" },
  { src: PHOTOS.spa, alt: "Дом-СПА" },
  { src: PHOTOS.interior, alt: "Интерьер" },
  { src: PHOTOS.bedroom, alt: "Спальня" },
];

export default function TalgarVilla() {
  const [form, setForm] = useState({ name: "", dates: "", guests: "", message: "" });
  const [sent, setSent] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Заявка на бронирование — ${form.name || "Гость"}`);
    const body = encodeURIComponent(
      `Имя: ${form.name}\nЖелаемые даты: ${form.dates}\nКоличество гостей: ${form.guests}\n\n${form.message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <div
      style={{ background: PALETTE.base, fontFamily: "'Work Sans', sans-serif" }}
      className="scroll-smooth min-h-screen"
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Work+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />

      {/* NAV */}
      <nav className="fixed top-0 z-30 flex w-full items-center justify-between px-6 py-5 md:px-12">
        <span
          className="text-sm tracking-[0.25em]"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: PALETTE.sand }}
        >
          TALGAR VILLA
        </span>
        <a
          href={INSTAGRAM_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors hover:border-white/40 md:flex"
          style={{ border: `1px solid ${PALETTE.hairline}`, color: PALETTE.sand }}
        >
          <Instagram size={14} /> @talgar_villa
        </a>
      </nav>

      {/* HERO */}
      <header className="relative flex h-screen min-h-[640px] items-end overflow-hidden">
        <Photo src={PHOTOS.hero} alt="Talgar Villa at dusk" className="absolute inset-0 h-full w-full" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(18,22,28,0.15) 0%, rgba(18,22,28,0.55) 60%, rgba(18,22,28,0.97) 100%)",
          }}
        />
        <div className="relative z-10 w-full px-6 pb-16 md:px-12 md:pb-20">
          <div className="mb-4 flex items-center gap-2" style={{ color: PALETTE.amberSoft }}>
            <MapPin size={15} />
            <span className="text-sm tracking-wide">Талгар, Алматинская область</span>
          </div>
          <h1
            className="max-w-3xl text-5xl leading-[1.05] md:text-7xl"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, color: PALETTE.sand }}
          >
            Дом на холме
            <br />
            над Алматы
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed md:text-lg" style={{ color: PALETTE.sandMuted }}>
            3 гектара тишины, панорама гор Заилийского Алатау днём и огни города ночью.
            Бассейн, баня и дом с витражами — для тех, кто приезжает сюда за пространством.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2">
            <span
              className="flex items-center gap-1.5 text-xs"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: PALETTE.amberSoft }}
            >
              <Star size={13} /> 5.0 РЕЙТИНГ
            </span>
            <span
              className="flex items-center gap-1.5 text-xs"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: PALETTE.amberSoft }}
            >
              <Mountain size={13} /> 3 ГА ТЕРРИТОРИИ
            </span>
            <span
              className="flex items-center gap-1.5 text-xs"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: PALETTE.amberSoft }}
            >
              <Users size={13} /> ДО 7 ГОСТЕЙ
            </span>
          </div>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="rounded-full px-7 py-3.5 text-sm font-medium transition-transform hover:scale-[1.02]"
              style={{ background: PALETTE.amber, color: PALETTE.base }}
            >
              Узнать о датах
            </a>
            <a
              href="#spaces"
              className="rounded-full px-7 py-3.5 text-sm font-medium transition-colors hover:bg-white/5"
              style={{ border: `1px solid rgba(237,230,214,0.35)`, color: PALETTE.sand }}
            >
              Смотреть территорию
            </a>
          </div>
        </div>
      </header>
      <Ridge />

      {/* INTRO */}
      <Reveal>
        <section className="mx-auto max-w-4xl px-6 py-20 text-center md:px-12 md:py-28">
          <p
            className="text-xs tracking-[0.3em]"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: PALETTE.amber }}
          >
            О ВИЛЛЕ
          </p>
          <h2
            className="mx-auto mt-5 max-w-2xl text-3xl leading-snug md:text-4xl"
            style={{ fontFamily: "'Fraunces', serif", color: PALETTE.sand, fontWeight: 400 }}
          >
            Одно из немногих мест в округе со своим бассейном — и вид, который не встретишь в городе.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed" style={{ color: PALETTE.sandMuted }}>
            Территория стоит особняком на холме — рядом никого, только горы и небо.
            Утро здесь начинается с тумана в долине, а вечер — с огней Талгара и Алматы,
            рассыпанных внизу. Гостей ждут три отдельных здания: дом-спа с витражными окнами,
            баня с комнатой отдыха и два гостевых дома для сна.
          </p>
        </section>
      </Reveal>

      {/* SPACES */}
      <section id="spaces" className="px-6 pb-20 md:px-12 md:pb-28">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {SPACES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <div
                className="h-full rounded-2xl p-8 transition-colors hover:border-white/20"
                style={{ background: PALETTE.panel, border: `1px solid ${PALETTE.hairline}` }}
              >
                <s.icon size={22} style={{ color: PALETTE.amber }} />
                <h3
                  className="mt-5 text-xl"
                  style={{ fontFamily: "'Fraunces', serif", color: PALETTE.sand, fontWeight: 500 }}
                >
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: PALETTE.sandMuted }}>
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* POOL / PANORAMA FULL BLEED */}
      <section className="relative">
        <Photo src={PHOTOS.pool} alt="Outdoor pool overlooking the mountains" className="h-[70vh] w-full md:h-[85vh]" />
        <div
          className="absolute inset-0 flex items-center"
          style={{
            background:
              "linear-gradient(90deg, rgba(18,22,28,0.85) 0%, rgba(18,22,28,0.15) 55%, transparent 100%)",
          }}
        >
          <Reveal>
            <div className="max-w-md px-6 md:px-16">
              <Waves size={22} style={{ color: PALETTE.amberSoft }} />
              <h3
                className="mt-5 text-3xl leading-snug md:text-4xl"
                style={{ fontFamily: "'Fraunces', serif", color: PALETTE.sand, fontWeight: 400 }}
              >
                Бассейн с видом на два горизонта
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: PALETTE.sandMuted }}>
                Днём — панорама хребта, вечером — огни города внизу. Один из немногих
                бассейнов в округе, открытый и приватный одновременно.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* GALLERY */}
      <Reveal>
        <section className="px-1.5 py-1.5">
          <div className="columns-2 gap-1.5 md:columns-4">
            {GALLERY.map((p) => (
              <button
                key={p.src}
                onClick={() => setLightbox(p.src)}
                className="mb-1.5 block w-full cursor-zoom-in overflow-hidden rounded-lg"
              >
                <Photo
                  src={p.src}
                  alt={p.alt}
                  className="w-full transition-transform duration-500 hover:scale-110"
                />
              </button>
            ))}
          </div>
        </section>
      </Reveal>

      {/* OCCASIONS */}
      <Reveal>
        <section className="mx-auto max-w-5xl px-6 py-20 md:px-12 md:py-28">
          <p
            className="text-center text-xs tracking-[0.3em]"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: PALETTE.amber }}
          >
            ДЛЯ КОГО
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {OCCASIONS.map((o) => (
              <span
                key={o}
                className="rounded-full px-5 py-2.5 text-sm"
                style={{ border: `1px solid ${PALETTE.hairline}`, color: PALETTE.sand }}
              >
                {o}
              </span>
            ))}
          </div>
        </section>
      </Reveal>

      {/* AMENITIES + STAY DETAILS */}
      <section className="px-6 pb-20 md:px-12 md:pb-28">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <Reveal>
            <div
              className="h-full rounded-2xl p-8 md:p-10"
              style={{ background: PALETTE.panel, border: `1px solid ${PALETTE.hairline}` }}
            >
              <h3 className="text-lg" style={{ fontFamily: "'Fraunces', serif", color: PALETTE.sand, fontWeight: 500 }}>
                Удобства
              </h3>
              <div className="mt-6 grid grid-cols-2 gap-y-4">
                {AMENITIES.map((a) => (
                  <div key={a.label} className="flex items-center gap-2.5">
                    <a.icon size={16} style={{ color: PALETTE.amber }} />
                    <span className="text-sm" style={{ color: PALETTE.sandMuted }}>
                      {a.label}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs" style={{ color: PALETTE.sandMuted, opacity: 0.7 }}>
                Полный список удобств — по запросу.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              className="h-full rounded-2xl p-8 md:p-10"
              style={{ background: PALETTE.panel, border: `1px solid ${PALETTE.hairline}` }}
            >
              <h3 className="text-lg" style={{ fontFamily: "'Fraunces', serif", color: PALETTE.sand, fontWeight: 500 }}>
                Условия проживания
              </h3>
              <div className="mt-6 space-y-4 text-sm" style={{ color: PALETTE.sandMuted }}>
                <div className="flex items-center gap-2.5">
                  <Users size={16} style={{ color: PALETTE.amber }} /> До 7 гостей · 3 спальни · 1.5 санузла
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock size={16} style={{ color: PALETTE.amber }} /> Заезд после 15:00 · Выезд до 12:00
                </div>
                <div className="flex items-center gap-2.5">
                  <Star size={16} style={{ color: PALETTE.amber }} /> 5.0 — чистота, точность описания, коммуникация, локация
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock size={16} style={{ color: PALETTE.amber }} /> Хозяин отвечает в течение часа
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* LOCATION */}
      <Reveal>
        <section className="mx-auto max-w-4xl px-6 pb-20 md:px-12 md:pb-28">
          <div
            className="flex flex-col items-center gap-5 rounded-2xl p-8 text-center md:flex-row md:justify-between md:p-10 md:text-left"
            style={{ background: PALETTE.panel, border: `1px solid ${PALETTE.hairline}` }}
          >
            <div>
              <h3
                className="text-lg"
                style={{ fontFamily: "'Fraunces', serif", color: PALETTE.sand, fontWeight: 500 }}
              >
                Как добраться
              </h3>
              <p className="mt-2 text-sm" style={{ color: PALETTE.sandMuted }}>
                Талгар, Алматинская область — в предгорьях Заилийского Алатау.
              </p>
            </div>
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-sm transition-colors hover:bg-white/5"
              style={{ border: `1px solid ${PALETTE.hairline}`, color: PALETTE.sand }}
            >
              <MapPin size={15} /> Открыть на карте
            </a>
          </div>
        </section>
      </Reveal>

      <Ridge flip />

      {/* CONTACT */}
      <section id="contact" className="px-6 py-20 pb-28 md:px-12 md:py-28" style={{ background: PALETTE.panelSoft }}>
        <Reveal>
          <div className="mx-auto max-w-xl text-center">
            <p
              className="text-xs tracking-[0.3em]"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: PALETTE.amber }}
            >
              ЗАБРОНИРОВАТЬ
            </p>
            <h2
              className="mt-5 text-3xl md:text-4xl"
              style={{ fontFamily: "'Fraunces', serif", color: PALETTE.sand, fontWeight: 400 }}
            >
              Расскажите о поездке
            </h2>
            <p className="mt-4 text-sm" style={{ color: PALETTE.sandMuted }}>
              Мы ответим в течение часа — либо напишите напрямую в Instagram.
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-10 max-w-xl">
          {sent ? (
            <div
              className="flex flex-col items-center gap-3 rounded-2xl px-8 py-12 text-center"
              style={{ background: PALETTE.panel, border: `1px solid ${PALETTE.hairline}` }}
            >
              <Check size={22} style={{ color: PALETTE.amber }} />
              <p style={{ color: PALETTE.sand }}>Спасибо! Ваш почтовый клиент открывается для отправки.</p>
              <p className="text-xs" style={{ color: PALETTE.sandMuted }}>
                Если письмо не открылось автоматически — напишите нам в Instagram.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-2xl p-8 md:p-10"
              style={{ background: PALETTE.panel, border: `1px solid ${PALETTE.hairline}` }}
            >
              <input
                required
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Ваше имя"
                className="w-full rounded-lg px-4 py-3 text-sm outline-none"
                style={{ background: PALETTE.base, border: `1px solid ${PALETTE.hairline}`, color: PALETTE.sand }}
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  value={form.dates}
                  onChange={(e) => handleChange("dates", e.target.value)}
                  placeholder="Даты"
                  className="w-full rounded-lg px-4 py-3 text-sm outline-none"
                  style={{ background: PALETTE.base, border: `1px solid ${PALETTE.hairline}`, color: PALETTE.sand }}
                />
                <input
                  value={form.guests}
                  onChange={(e) => handleChange("guests", e.target.value)}
                  placeholder="Гостей (до 7)"
                  className="w-full rounded-lg px-4 py-3 text-sm outline-none"
                  style={{ background: PALETTE.base, border: `1px solid ${PALETTE.hairline}`, color: PALETTE.sand }}
                />
              </div>
              <textarea
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                placeholder="Расскажите, для какого случая ищете виллу"
                rows={4}
                className="w-full resize-none rounded-lg px-4 py-3 text-sm outline-none"
                style={{ background: PALETTE.base, border: `1px solid ${PALETTE.hairline}`, color: PALETTE.sand }}
              />
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-medium transition-transform hover:scale-[1.01]"
                style={{ background: PALETTE.amber, color: PALETTE.base }}
              >
                <Send size={15} /> Отправить заявку
              </button>
              <a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm transition-colors hover:bg-white/5"
                style={{ border: `1px solid ${PALETTE.hairline}`, color: PALETTE.sand }}
              >
                <Instagram size={15} /> Написать в Instagram
              </a>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="flex flex-col items-center gap-3 px-6 py-10 pb-24 text-center md:flex-row md:justify-between md:px-12 md:pb-10">
        <span
          className="text-xs tracking-[0.2em]"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: PALETTE.sandMuted }}
        >
          TALGAR VILLA · ТАЛГАР, АЛМАТИНСКАЯ ОБЛАСТЬ
        </span>
        <a
          href={INSTAGRAM_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs"
          style={{ color: PALETTE.sandMuted }}
        >
          <Instagram size={13} /> @talgar_villa
        </a>
      </footer>

      {/* MOBILE STICKY CTA */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 flex gap-2 p-3 md:hidden"
        style={{ background: PALETTE.panel, borderTop: `1px solid ${PALETTE.hairline}` }}
      >
        <a
          href="#contact"
          className="flex-1 rounded-full py-3 text-center text-sm font-medium"
          style={{ background: PALETTE.amber, color: PALETTE.base }}
        >
          Узнать о датах
        </a>
        <a
          href={INSTAGRAM_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded-full px-4"
          style={{ border: `1px solid ${PALETTE.hairline}`, color: PALETTE.sand }}
        >
          <Instagram size={17} />
        </a>
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: "rgba(10,12,15,0.94)" }}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute right-5 top-5 rounded-full p-2"
            style={{ border: `1px solid ${PALETTE.hairline}`, color: PALETTE.sand }}
          >
            <X size={18} />
          </button>
          <img
            src={lightbox}
            alt=""
            className="max-h-full max-w-full rounded-lg"
            style={{ objectFit: "contain" }}
          />
        </div>
      )}
    </div>
  );
}
