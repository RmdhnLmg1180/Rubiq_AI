import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, Head } from "@inertiajs/react";
import { FileText, Upload, Cpu, Send } from "lucide-react";

const workflows = [
  {
    step: "01",
    title: "Buat Rubrik",
    desc: "Tentukan kriteria, bobot, dan level penilaian pada tugas.",
    icon: FileText,
  },
  {
    step: "02",
    title: "Terima Tugas",
    desc: "Mahasiswa mengirim teks, file, atau tautan via Class Code.",
    icon: Upload,
  },
  {
    step: "03",
    title: "Generate AI",
    desc: "Klik satu tombol, AI membuat draft feedback terstruktur.",
    icon: Cpu,
  },
  {
    step: "04",
    title: "Review & Publish",
    desc: "Anda editor finalnya. Koreksi jika perlu, lalu kirim.",
    icon: Send,
  },
];

/* =========================
   UTIL
========================= */
const cx = (...classes) => classes.filter(Boolean).join(" ");

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function useScrollMeta() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const y = window.scrollY || 0;
      setScrolled(y > 10);
      setShowTop(y > 700);

      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, y / max)));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return { scrolled, progress, showTop };
}

function useActiveSection(sectionIds) {
  const [active, setActive] = useState(sectionIds?.[0] ?? "beranda");

  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) setActive(visible.target.id);
      },
      {
        root: null,
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0.12, 0.2, 0.35, 0.5, 0.7],
      }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sectionIds]);

  return active;
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - 92;
  window.scrollTo({ top, behavior: "smooth" });
}

/* =========================
   REVEAL ANIMATION
========================= */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cx(
        "transition-all duration-700 ease-out",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className
      )}
    >
      {children}
    </div>
  );
}

/* =========================
   COUNT UP (animate when visible)
========================= */
function CountUp({ to = 100, suffix = "", duration = 900, className = "" }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setValue(to);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  useEffect(() => {
    if (!started) return;

    let raf = 0;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, to, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}

/* =========================
   ICONS & MINI COMPONENTS
========================= */
const IconCheck = () => (
  <svg className="h-4 w-4 text-cyan-600 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const IconSparkles = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const IconScale = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
  </svg>
);

const IconChart = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const FeatureCard = ({ title, desc, icon: Icon, colorClass }) => (
  <div className="group relative rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 transition-all hover:shadow-xl hover:-translate-y-1">
    <div className={cx("mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl", colorClass)}>
      <Icon />
    </div>
    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
    <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{desc}</p>
  </div>
);

function MarkerText({ children }) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="marker-underline absolute -bottom-2 left-0 right-0 z-0 h-3 -rotate-1 rounded-full bg-gradient-to-r from-blue-300 via-indigo-300 to-cyan-300 opacity-50 dark:opacity-30"
      />
    </span>
  );
}

/* =========================
   HERO MOCKUP
========================= */
const MockupUI = () => {
  return (
    <div class="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl border border-gray-100 p-6 max-w-5xl mx-auto font-sans gap-8">
  
  <div class="flex-1 relative flex items-center justify-center bg-gray-50/50 rounded-xl border border-gray-100 p-8">
    
    <svg class="w-auto max-w-[16rem] h-40 text-gray-800 dark:text-white" aria-hidden="true" width="620" height="517" viewBox="0 0 620 517" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 56H466V298.934C466 301.18 463.693 303 460.848 303H6.15235C3.30678 303 1 301.18 1 298.934V56Z" fill="#d6e2fb"/>
      <path d="M1 56H466V298.934C466 301.18 463.693 303 460.848 303H6.15235C3.30678 303 1 301.18 1 298.934V56Z" fill="url(#paint0_linear_344_2359)"/>
      <path d="M1 45C1 42.7909 3.30679 41 6.15235 41H460.848C463.693 41 466 42.7909 466 45V56H1V45Z" fill="#d6e2fb"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1 56H466V58H1V56Z" fill="#c8d8fa"/>
      <path d="M15.6222 47.8238C15.6222 49.4389 14.3129 50.7482 12.6978 50.7482C11.0827 50.7482 9.77344 49.4389 9.77344 47.8238C9.77344 46.2087 11.0827 44.8994 12.6978 44.8994C14.3129 44.8994 15.6222 46.2087 15.6222 47.8238Z" fill="#F9FAFB"/>
      <path d="M26.3448 47.8238C26.3448 49.4389 25.0355 50.7482 23.4205 50.7482C21.8054 50.7482 20.4961 49.4389 20.4961 47.8238C20.4961 46.2087 21.8054 44.8994 23.4205 44.8994C25.0355 44.8994 26.3448 46.2087 26.3448 47.8238Z" fill="#F9FAFB"/>
      <path d="M37.0675 47.8238C37.0675 49.4389 35.7582 50.7482 34.1431 50.7482C32.528 50.7482 31.2188 49.4389 31.2188 47.8238C31.2188 46.2087 32.528 44.8994 34.1431 44.8994C35.7582 44.8994 37.0675 46.2087 37.0675 47.8238Z" fill="#F9FAFB"/>
      <path d="M61.1175 103.999C34.807 105.616 59.8029 159.867 74.9021 177.412C83.6219 163.176 104.927 133.147 120.39 126.915C139.719 119.125 142.486 96.551 104.484 90.2067C74.0829 85.1312 62.907 93.281 61.1175 103.999Z" fill="#111928"/>
      <path d="M52.9996 209.5L79.3999 151.531L103.583 164.342L87.9995 219.5L52.9996 209.5Z" fill="#FDBA8C"/>
      <path d="M52.9996 209.5L79.3999 151.531L103.583 164.342L87.9995 219.5L52.9996 209.5Z" fill="url(#paint1_linear_344_2359)"/>
      <path d="M108.702 180.989C125.092 179.514 125.502 138.169 123.658 117.682C111.993 113.979 97.1873 144.848 92.4946 136.169C87.802 127.489 76.5632 126.49 74.1421 135.737C71.7209 144.984 88.2142 182.833 108.702 180.989Z" fill="#FDBA8C"/>
      <path d="M113.078 142.831C112.702 143.917 113.279 145.103 114.365 145.479C115.452 145.854 116.637 145.278 117.013 144.192C117.389 143.105 116.813 141.92 115.726 141.544C114.639 141.168 113.454 141.744 113.078 142.831Z" fill="#111928"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M117.891 136.149C119.276 136.647 120.202 137.624 120.984 138.821C121.287 139.284 121.907 139.414 122.37 139.111C122.832 138.809 122.962 138.189 122.66 137.726C121.757 136.344 120.527 134.969 118.569 134.265C116.621 133.564 114.118 133.585 110.779 134.634C110.252 134.8 109.958 135.362 110.124 135.89C110.29 136.417 110.852 136.71 111.379 136.544C114.471 135.573 116.496 135.647 117.891 136.149Z" fill="#111928"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M123.363 143.454C122.811 143.445 122.355 143.885 122.346 144.438L122.113 158.208C122.109 158.454 121.88 158.633 121.64 158.578L115.89 157.257C115.351 157.133 114.814 157.47 114.69 158.009C114.566 158.548 114.903 159.085 115.441 159.208L121.192 160.529C122.672 160.869 124.089 159.76 124.115 158.242L124.347 144.472C124.357 143.919 123.916 143.463 123.363 143.454Z" fill="#111928"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M112.493 164.882C111.318 164.387 110.14 163.657 108.358 162.493C107.895 162.191 107.275 162.321 106.972 162.784C106.67 163.247 106.8 163.867 107.263 164.169C109.03 165.324 110.351 166.152 111.716 166.727C113.107 167.313 114.504 167.619 116.425 167.808C116.976 167.861 117.465 167.459 117.519 166.909C117.573 166.359 117.171 165.869 116.621 165.815C114.828 165.64 113.642 165.366 112.493 164.882Z" fill="#111928"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M79.8541 141.443C79.5134 140.011 79.8249 138.701 80.3985 137.391C80.6203 136.885 80.3896 136.295 79.8833 136.073C79.3769 135.851 78.7866 136.082 78.5648 136.588C77.9022 138.1 77.4248 139.882 77.9066 141.906C78.3859 143.92 79.7734 146.003 82.4785 148.224C82.9058 148.575 83.5366 148.513 83.8873 148.085C84.2381 147.658 84.176 147.027 83.7487 146.676C81.2439 144.62 80.1974 142.885 79.8541 141.443Z" fill="#111928"/>
      <path d="M5.49999 303H216.5C183.5 267 91.5 208 60 201.5C34.8 196.3 9.83333 228 0.5 244.5V298C0.5 300.761 2.73857 303 5.49999 303Z" fill="#F9FAFB"/>
      <path d="M5.49999 303H216.5C183.5 267 91.5 208 60 201.5C34.8 196.3 9.83333 228 0.5 244.5V298C0.5 300.761 2.73857 303 5.49999 303Z" fill="url(#paint2_linear_344_2359)"/>
      <path d="M234.796 203.955C235.268 202.211 236.851 201 238.657 201H420.775C423.409 201 425.324 203.502 424.636 206.045L399.206 300.045C398.734 301.789 397.151 303 395.344 303H213.227C210.593 303 208.678 300.498 209.366 297.955L234.796 203.955Z" fill="#F9FAFB"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M377.78 223H270.774C269.87 223 269.078 223.607 268.843 224.48L254.29 278.48C253.947 279.75 254.905 281 256.221 281H363.227C364.131 281 364.923 280.393 365.158 279.52L379.711 225.52C380.053 224.25 379.096 223 377.78 223ZM270.774 221C268.966 221 267.382 222.213 266.912 223.959L252.359 277.959C251.674 280.501 253.588 283 256.221 283H363.227C365.035 283 366.618 281.787 367.089 280.041L381.642 226.041C382.327 223.499 380.412 221 377.78 221H270.774Z" fill="#c8d8fa"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M96.28 0C94.4685 0 93 1.4685 93 3.27999V67.2398C93 69.0513 94.4685 70.5198 96.28 70.5198H116.78V80.5059C116.78 81.7418 118.095 82.5336 119.187 81.9553L140.788 70.5198H268.48C270.291 70.5198 271.76 69.0513 271.76 67.2398V3.27999C271.76 1.4685 270.291 0 268.48 0H96.28Z" fill="#c8d8fa"/>
      <path d="M137.102 35.2777C137.102 34.3719 137.836 33.6377 138.742 33.6377H225.014C225.919 33.6377 226.654 34.3719 226.654 35.2777C226.654 36.1834 225.919 36.9177 225.014 36.9177H138.742C137.836 36.9177 137.102 36.1834 137.102 35.2777Z" fill="#9ab7f6"/>
      <path d="M137 270H602V512.934C602 515.18 599.693 517 596.848 517H142.152C139.307 517 137 515.18 137 512.934V270Z" fill="#d6e2fb"/>
      <path d="M137 270H602V512.934C602 515.18 599.693 517 596.848 517H142.152C139.307 517 137 515.18 137 512.934V270Z" fill="url(#paint3_linear_344_2359)"/>
      <path d="M137 259C137 256.791 139.307 255 142.152 255H596.848C599.693 255 602 256.791 602 259V270H137V259Z" fill="#d6e2fb"/>
      <path d="M137 259C137 256.791 139.307 255 142.152 255H596.848C599.693 255 602 256.791 602 259V270H137V259Z" fill="url(#paint4_linear_344_2359)"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M137 269H602V271H137V269Z" fill="#c8d8fa"/>
      <path d="M151.622 261.824C151.622 263.439 150.313 264.748 148.698 264.748C147.083 264.748 145.773 263.439 145.773 261.824C145.773 260.209 147.083 258.899 148.698 258.899C150.313 258.899 151.622 260.209 151.622 261.824Z" fill="#c8d8fa"/>
      <path d="M162.345 261.824C162.345 263.439 161.036 264.748 159.42 264.748C157.805 264.748 156.496 263.439 156.496 261.824C156.496 260.209 157.805 258.899 159.42 258.899C161.036 258.899 162.345 260.209 162.345 261.824Z" fill="#c8d8fa"/>
      <path d="M173.067 261.824C173.067 263.439 171.758 264.748 170.143 264.748C168.528 264.748 167.219 263.439 167.219 261.824C167.219 260.209 168.528 258.899 170.143 258.899C171.758 258.899 173.067 260.209 173.067 261.824Z" fill="#c8d8fa"/>
      <path d="M620 437L549 517H584.696C607.604 490.647 617.777 452.686 620 437Z" fill="#d6e2fb"/>
      <path d="M620 437L549 517H584.696C607.604 490.647 617.777 452.686 620 437Z" fill="url(#paint5_linear_344_2359)"/>
      <path d="M604.5 415L514 517H559.5C588.7 483.4 601.667 435 604.5 415Z" fill="#d6e2fb"/>
      <path d="M604.5 415L514 517H559.5C588.7 483.4 601.667 435 604.5 415Z" fill="url(#paint6_linear_344_2359)"/>
      <path d="M210.193 466.056H265.176L255.499 517H200.516L210.193 466.056Z" fill="#c8d8fa"/>
      <path d="M210.193 466.056H265.176L255.499 517H200.516L210.193 466.056Z" fill="url(#paint7_linear_344_2359)"/>
      <path d="M328 513C328 511.895 327.105 511 326 511H219C217.895 511 217 511.895 217 513V515C217 516.105 217.895 517 219 517H326C327.105 517 328 516.105 328 515V513Z" fill="#d6e2fb"/>
      <path d="M342.262 326.966C341.794 325.217 340.209 324 338.398 324H75.4279C72.7985 324 70.8843 326.494 71.5638 329.034L108.736 467.988C109.204 469.738 110.789 470.954 112.6 470.954H375.57C378.2 470.954 380.114 468.461 379.434 465.921L342.262 326.966Z" fill="#F9FAFB"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M164.577 358.33H271.814C272.72 358.33 273.513 358.939 273.746 359.814L288.352 414.515C288.691 415.784 287.734 417.031 286.42 417.031H179.183C178.277 417.031 177.484 416.422 177.25 415.547L162.645 360.846C162.306 359.576 163.263 358.33 164.577 358.33ZM271.814 356.33C273.626 356.33 275.211 357.548 275.679 359.298L290.284 413.999C290.962 416.538 289.048 419.031 286.42 419.031H179.183C177.371 419.031 175.785 417.813 175.318 416.062L160.713 361.362C160.034 358.822 161.948 356.33 164.577 356.33H271.814Z" fill="#c8d8fa"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M374.621 447.932H103.369L103.893 449.892H375.145L374.621 447.932Z" fill="#c8d8fa"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M407.478 262C409.289 262 410.758 263.469 410.758 265.28V329.24C410.758 331.051 409.289 332.52 407.478 332.52H386.978V342.506C386.978 343.742 385.663 344.534 384.571 343.955L362.97 332.52H235.278C233.467 332.52 231.998 331.051 231.998 329.24V265.28C231.998 263.469 233.467 262 235.278 262H407.478Z" fill="#c8d8fa"/>
      <path d="M366.656 289.801C366.656 288.895 365.922 288.161 365.016 288.161H278.744C277.838 288.161 277.104 288.895 277.104 289.801C277.104 290.707 277.838 291.441 278.744 291.441H365.016C365.922 291.441 366.656 290.707 366.656 289.801Z" fill="#9ab7f6"/>
      <path d="M351.707 304.752C351.707 303.846 350.973 303.112 350.067 303.112H278.489C277.583 303.112 276.849 303.846 276.849 304.752C276.849 305.658 277.583 306.392 278.489 306.392H350.067C350.973 306.392 351.707 305.658 351.707 304.752Z" fill="#9ab7f6"/>
      <path d="M472.5 225.5C455.3 233.1 447 250.334 445 258L458 277L493 326C494 330 496.5 343.5 512.5 343.5C528.5 343.5 543 352 546.5 359C549.667 356.5 554.8 346.6 550 327C544 302.5 515 289.5 516 265.5C517 241.5 494 216 472.5 225.5Z" fill="#111928"/>
      <path d="M482.5 344.5L465 304.5C468.833 291.167 477.1 269.8 479.5 291C481.9 312.2 496.833 329.834 504 336L482.5 344.5Z" fill="#FDBA8C"/>
      <path d="M482.5 344.5L465 304.5C468.833 291.167 477.1 269.8 479.5 291C481.9 312.2 496.833 329.834 504 336L482.5 344.5Z" fill="url(#paint8_linear_344_2359)"/>
      <path d="M451.5 308C439.1 298.4 442 270.666 445 258C452.5 247.5 457.5 256.5 466.5 267C475.5 277.5 480.5 270 484 268.5C487.5 267 492.5 270.5 489 279.5C485.5 288.5 467 320 451.5 308Z" fill="#FDBA8C"/>
      <path d="M454.186 273.954C454.684 274.948 454.282 276.158 453.288 276.656C452.293 277.154 451.084 276.752 450.586 275.758C450.087 274.764 450.49 273.554 451.484 273.056C452.478 272.558 453.688 272.96 454.186 273.954Z" fill="#111928"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M450.579 267.28C449.195 267.612 448.201 268.453 447.322 269.521C446.982 269.933 446.372 269.993 445.959 269.653C445.547 269.313 445.487 268.703 445.827 268.29C446.842 267.057 448.17 265.866 450.127 265.397C452.074 264.93 454.478 265.215 457.576 266.578C458.066 266.793 458.288 267.365 458.073 267.854C457.858 268.343 457.286 268.566 456.797 268.35C453.928 267.089 451.973 266.945 450.579 267.28Z" fill="#111928"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M444.316 275.711C444.849 275.748 445.251 276.211 445.213 276.745L444.271 290.031C444.254 290.268 444.46 290.461 444.696 290.428L450.348 289.642C450.877 289.569 451.366 289.938 451.44 290.468C451.513 290.997 451.144 291.486 450.614 291.56L444.962 292.346C443.508 292.548 442.236 291.359 442.34 289.894L443.282 276.608C443.319 276.075 443.782 275.673 444.316 275.711Z" fill="#111928"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M448.456 304.919C446.678 302.603 445.366 299.783 444.426 296.661L457.86 294.56C457.344 300.301 453.087 303.731 448.456 304.919Z" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M484.647 277.532C484.792 276.116 484.327 274.899 483.611 273.717C483.334 273.259 483.48 272.664 483.938 272.387C484.395 272.11 484.99 272.257 485.267 272.714C486.094 274.08 486.778 275.728 486.573 277.73C486.369 279.721 485.303 281.895 482.991 284.367C482.626 284.758 482.013 284.778 481.623 284.413C481.232 284.048 481.212 283.435 481.577 283.045C483.718 280.755 484.501 278.958 484.647 277.532Z" fill="#111928"/>
      <path d="M542.657 509.668L528.999 503.5H468.999C448.199 439.1 467.666 375 479.999 351V343.396C479.999 342.557 480.523 341.808 481.31 341.519L503.507 333.364C504.128 333.136 504.821 333.23 505.36 333.614L511.499 338C544.499 346.5 555.999 358.5 560.999 410C564.856 449.728 552.596 491.1 545.29 508.649C544.862 509.677 543.671 510.126 542.657 509.668Z" fill="#F9FAFB"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M491 503.5H468.999C460.024 475.712 458.546 447.979 460.757 423.5H506.5L488 485.5L491 487V503.5Z" fill="url(#paint9_linear_344_2359)"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M510.323 337.159L511.5 338C511.583 338.021 511.667 338.043 511.75 338.064L479.783 351.424C479.856 351.281 479.928 351.14 480 351V349.832L510.323 337.159Z" fill="#c8d8fa"/>
      <path d="M484.5 496.5L491 487L531.5 504.5C522.7 513.7 514.5 516.833 511.5 517H301C302.167 514.167 307.2 507.3 318 504.5C328.8 501.7 350.833 503.333 360.5 504.5L484.5 496.5Z" fill="#FDBA8C"/>
      <path d="M484.5 496.5L491 487L531.5 504.5C522.7 513.7 514.5 516.833 511.5 517H301C302.167 514.167 307.2 507.3 318 504.5C328.8 501.7 350.833 503.333 360.5 504.5L484.5 496.5Z" fill="url(#paint10_linear_344_2359)"/>
      <defs>
      <linearGradient id="paint0_linear_344_2359" x1="233.5" y1="489.012" x2="233.5" y2="43.2942" gradientUnits="userSpaceOnUse">
      <stop stop-color="#c8d8fa"/>
      <stop offset="1" stop-color="#c8d8fa" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="paint1_linear_344_2359" x1="140.152" y1="145.002" x2="80.9786" y2="203.55" gradientUnits="userSpaceOnUse">
      <stop stop-color="#7F270F"/>
      <stop offset="1" stop-color="#7F270F" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="paint2_linear_344_2359" x1="90.5" y1="473" x2="42.7621" y2="226.546" gradientUnits="userSpaceOnUse">
      <stop stop-color="#c8d8fa"/>
      <stop offset="1" stop-color="#c8d8fa" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="paint3_linear_344_2359" x1="369.5" y1="703.012" x2="369.5" y2="257.294" gradientUnits="userSpaceOnUse">
      <stop stop-color="#c8d8fa"/>
      <stop offset="1" stop-color="#c8d8fa" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="paint4_linear_344_2359" x1="94" y1="211.5" x2="400" y2="369.5" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F9FAFB"/>
      <stop offset="1" stop-color="#F9FAFB" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="paint5_linear_344_2359" x1="539.5" y1="530" x2="596.614" y2="480.1" gradientUnits="userSpaceOnUse">
      <stop stop-color="#c8d8fa"/>
      <stop offset="1" stop-color="#c8d8fa" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="paint6_linear_344_2359" x1="441.5" y1="499" x2="492.461" y2="423.43" gradientUnits="userSpaceOnUse">
      <stop stop-color="#c8d8fa"/>
      <stop offset="1" stop-color="#c8d8fa" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="paint7_linear_344_2359" x1="209.998" y1="367" x2="199.074" y2="490.816" gradientUnits="userSpaceOnUse">
      <stop stop-color="#2563eb"/>
      <stop offset="1" stop-color="#2563eb" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="paint8_linear_344_2359" x1="515.5" y1="260.5" x2="489.038" y2="348.61" gradientUnits="userSpaceOnUse">
      <stop stop-color="#7F270F"/>
      <stop offset="1" stop-color="#7F270F" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="paint9_linear_344_2359" x1="462.321" y1="535" x2="424.675" y2="464.005" gradientUnits="userSpaceOnUse">
      <stop stop-color="#c8d8fa"/>
      <stop offset="1" stop-color="#c8d8fa" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="paint10_linear_344_2359" x1="825.5" y1="502" x2="809.922" y2="574.178" gradientUnits="userSpaceOnUse">
      <stop stop-color="#7F270F"/>
      <stop offset="1" stop-color="#7F270F" stop-opacity="0"/>
      </linearGradient>
      </defs>
      </svg>

    <div class="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg border border-gray-100 p-4 flex items-center gap-4">
      <div class="bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center text-white">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
      </div>
      <div>
        <div class="font-bold text-gray-800">70% hemat waktu</div>
        <div class="text-sm text-gray-500">Draft feedback siap review</div>
      </div>
    </div>
  </div>

  <div class="w-full md:w-96 flex flex-col justify-between">
    
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-gray-400 font-bold text-sm tracking-widest uppercase">AI Draft</h3>
      <span class="bg-teal-50 text-teal-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
        Ready
      </span>
    </div>

    <div class="flex-1 flex flex-col gap-4">
      <div class="border border-blue-50 bg-blue-50/20 rounded-xl p-4">
        <div class="flex justify-between items-center mb-2">
          <h4 class="text-blue-700 font-bold text-sm">Argumen Utama</h4>
          <span class="text-blue-500 text-xs font-semibold">Bobot 40%</span>
        </div>
        <p class="text-gray-500 text-sm leading-relaxed">Poin kuat, namun data pendukung kurang spesifik di paragraf 2.</p>
      </div>

      <div class="border border-blue-50 bg-blue-50/20 rounded-xl p-4">
        <div class="flex justify-between items-center mb-2">
          <h4 class="text-blue-700 font-bold text-sm">Tata Bahasa</h4>
          <span class="text-blue-500 text-xs font-semibold">Bobot 20%</span>
        </div>
        <p class="text-gray-500 text-sm leading-relaxed">Struktur kalimat sudah efektif. Perhatikan penggunaan istilah asing.</p>
      </div>
    </div>

    <div class="flex gap-3 mt-6">
      <button class="flex-1 border border-gray-200 text-gray-700 font-semibold py-2.5 rounded-lg hover:bg-gray-50 transition-colors">
        Edit
      </button>
      <button class="flex-1 bg-blue-600 text-white font-semibold py-2.5 rounded-lg shadow-md shadow-blue-200 hover:bg-blue-700 transition-colors">
        Publish
      </button>
    </div>

  </div>
</div>
  );
};

/* =========================
   MAIN PAGE
========================= */
export default function Welcome({ auth }) {
  const navItems = useMemo(
    () => [
      { id: "beranda", label: "Home" },
      { id: "statistik", label: "Impact" },
      { id: "fitur", label: "Fitur" },
      { id: "workflow", label: "Workflow" },
      { id: "mulai", label: "Mulai" },
    ],
    []
  );

  const active = useActiveSection(navItems.map((x) => x.id));
  const { scrolled, progress, showTop } = useScrollMeta();
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // State untuk mode gelap
  const [isDark, setIsDark] = useState(() => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("theme") === "dark";
});

  // Set dark mode HTML class
  useEffect(() => {
  if (isDark) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}, [isDark]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <Head title="Welcome to RubriQ AI" />

      <style>{`
        @keyframes floaty { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }
        @keyframes floaty2 { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
        @keyframes wiggle { 0%,100% { transform: rotate(-0.6deg) } 50% { transform: rotate(0.6deg) } }
        .floaty { animation: floaty 7s ease-in-out infinite; }
        .floaty2 { animation: floaty2 6s ease-in-out infinite; }
        .wiggle { animation: wiggle 9s ease-in-out infinite; }

        @keyframes marker { from { transform: scaleX(0) rotate(-1deg); } to { transform: scaleX(1) rotate(-1deg); } }
        .marker-underline { transform-origin: left; animation: marker 900ms ease-out forwards; }

        @media (prefers-reduced-motion: reduce) {
          .floaty, .floaty2, .wiggle { animation: none !important; }
          .marker-underline { animation: none !important; transform: none !important; }
        }
      `}</style>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100 transition-colors duration-300">
        
        {/* =========================
            NAVBAR
        ========================= */}
        <nav
          className={cx(
            "navbar-academic fixed inset-x-0 top-0 z-50 backdrop-blur-md transition-all duration-300",
            scrolled
              ? "border-b border-slate-200/90 dark:border-slate-800/90 bg-white/90 dark:bg-slate-900/90 shadow-sm"
              : "border-b border-transparent bg-white/75 dark:bg-slate-900/75"
          )}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className={cx("flex items-center justify-between transition-all duration-300", scrolled ? "h-14" : "h-16")}>
              
              {/* Logo */}
              <button
                type="button"
                onClick={() => scrollToId("beranda")}
                className="flex items-center gap-2 focus:outline-none"
                aria-label="Ke Beranda"
              >
                <div className="flex h-12 w-auto items-center justify-center">
                <img
                  src="/images/Logo_Rubriq.png"
                  alt="RubriQ AI"
                  className="h-10 w-auto object-contain"
                />
                </div>
                <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">RubriQ AI</span>
              </button>

              {/* Desktop nav */}
              <div className="hidden md:flex items-center gap-1 rounded-full border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 p-1">
                {navItems.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToId(item.id);
                      }}
                      className={cx(
                        "rounded-full px-4 py-2 text-sm font-bold transition",
                        isActive
                          ? "bg-blue-600 text-white shadow-sm"
                          : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
                      )}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>

              {/* Right actions */}
              <div className="flex items-center gap-3">
                {/* Theme Toggle */}
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="p-2 text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-cyan-400 transition"
                  aria-label="Toggle Dark Mode"
                >
                  {isDark ? (
                    // Sun Icon
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    // Moon Icon
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>

                {/* Mobile toggle */}
                <button
                  type="button"
                  className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300"
                  onClick={() => setMobileOpen((s) => !s)}
                  aria-label="Buka navigasi"
                >
                  {mobileOpen ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" d="M6 6l12 12M18 6l-12 12" /></svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" /></svg>
                  )}
                </button>

                {auth?.user ? (
                  <Link
                    href={route("dashboard")}
                    className="rounded-full bg-blue-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      href={route("login")}
                      className="hidden text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 sm:block transition"
                    >
                      Masuk
                    </Link>
                    <Link
                      href={route("register")}
                      className="rounded-full bg-blue-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-blue-700"
                    >
                      Mulai Gratis
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Scroll progress bar */}
            <div className="h-1 w-full bg-transparent">
              <div
                className="h-1 origin-left bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500"
                style={{ transform: `scaleX(${progress})` }}
              />
            </div>

            {/* Mobile nav panel */}
            <div className={cx("md:hidden overflow-hidden transition-all duration-300", mobileOpen ? "max-h-72 pb-3" : "max-h-0")}>
              <div className="mt-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 p-2 backdrop-blur-md">
                {navItems.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToId(item.id);
                        setMobileOpen(false);
                      }}
                      className={cx(
                        "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition",
                        isActive ? "bg-blue-600 text-white" : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      )}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>

        {/* =========================
            HERO
        ========================= */}
        <section id="beranda" className="hero-academic relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
          <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-200/50 dark:bg-blue-900/30 blur-3xl floaty" />
          <div className="absolute top-10 -right-24 h-80 w-80 rounded-full bg-indigo-200/50 dark:bg-indigo-900/30 blur-3xl floaty2" />
          <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-200/45 dark:bg-cyan-900/20 blur-3xl floaty" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
            <div className="lg:grid lg:grid-cols-12 lg:gap-16">
              
              <div className="lg:col-span-6 text-center lg:text-left">
                <Reveal>
                  <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
                    <MarkerText>Rubriq AI</MarkerText>
                    
                    <br />
                     — Cara Baru Menilai Pembelajaran.
                  </h1>

                  <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
                    RubriQ AI adalah asisten penilaian Anda. Dosen membuat rubrik, AI menyusun <i>draft</i> feedback, Anda yang memoles dan mempublikasikan.
                    Konsisten, terstruktur, dan hemat waktu.
                  </p>
                </Reveal>

                <Reveal delay={120}>
                  <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
                    <Link
                      href={route("register")}
                      className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-700"
                    >
                      Buat Kelas Sekarang
                    </Link>
                    <a
                      href="#fitur"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToId("fitur");
                      }}
                      className="inline-flex items-center justify-center rounded-full bg-white dark:bg-slate-800 px-8 py-3.5 text-sm font-bold text-slate-700 dark:text-slate-200 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 transition hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      Pelajari Cara Kerja
                    </a>
                  </div>
                </Reveal>
              </div>

              <div className="relative mt-16 lg:col-span-6 lg:mt-0">
                <Reveal delay={80}>
                  <MockupUI />
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            STATISTIK / GRAFIK (SECTION BARU)
        ========================= */}
        <section id="statistik" className="relative py-28 bg-white dark:bg-slate-800/40 border-y border-slate-200 dark:border-slate-800 transition-colors duration-300 overflow-hidden">
          
          {/* Background dekoratif tipis */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden opacity-30 dark:opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full bg-blue-100 blur-3xl"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 rounded-full bg-cyan-100 blur-3xl"></div>
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <Reveal>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
                Integrasi AI yang Terbukti Meningkatkan Efisiensi Penilaian
              </h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                statistik dari dosen yang telah menggunakan RubriQ AI menunjukkan peningkatan signifikan dalam kecepatan penilaian, konsistensi feedback, dan kepuasan mahasiswa. Berikut adalah beberapa highlight dari dampak positif yang telah dirasakan:
              </p>
            </Reveal>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-16 max-w-5xl mx-auto">

              {/* Grafik 1: 70% (Donut Chart) */}
              <Reveal delay={100}>
                <div className="flex flex-col items-center group cursor-default">
                  <div className="relative w-56 h-56 flex items-center justify-center mb-6">
                    {/* SVG Circular Progress */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
                      <circle cx="80" cy="80" r="70" stroke="currentColor" className="text-slate-100 dark:text-slate-700" strokeWidth="12" fill="none" />
                      {/* Nilai 70% = Dashoffset 132 (dari total 440) */}
                      <circle cx="80" cy="80" r="70" stroke="currentColor" className="text-blue-500 drop-shadow-md transition-all duration-1000 ease-out group-hover:stroke-blue-400 group-hover:drop-shadow-xl" strokeWidth="14" fill="none" strokeLinecap="round" strokeDasharray="440" strokeDashoffset="132" />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <div className="text-5xl font-black text-slate-900 dark:text-white tabular-nums tracking-tighter transition-transform duration-300 group-hover:scale-110">
                        <CountUp to={70} suffix="%" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Hemat Waktu</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">Lebih cepat menilai dan mengevaluasi tugas mahasiswa.</p>
                </div>
              </Reveal>

              {/* Grafik 2: 90% (Donut Chart) */}
              <Reveal delay={200}>
                <div className="flex flex-col items-center group cursor-default">
                  <div className="relative w-56 h-56 flex items-center justify-center mb-6">
                    {/* SVG Circular Progress */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
                      <circle cx="80" cy="80" r="70" stroke="currentColor" className="text-slate-100 dark:text-slate-700" strokeWidth="12" fill="none" />
                      {/* Nilai 90% = Dashoffset 44 (dari total 440) */}
                      <circle cx="80" cy="80" r="70" stroke="currentColor" className="text-indigo-500 drop-shadow-md transition-all duration-1000 ease-out group-hover:stroke-indigo-400 group-hover:drop-shadow-xl" strokeWidth="14" fill="none" strokeLinecap="round" strokeDasharray="440" strokeDashoffset="44" />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <div className="text-5xl font-black text-slate-900 dark:text-white tabular-nums tracking-tighter transition-transform duration-300 group-hover:scale-110">
                        <CountUp to={90} suffix="%" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Konsistensi</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">Penilaian selalu berpedoman pada standar rubrik Anda.</p>
                </div>
              </Reveal>

              {/* Grafik 3: 3x (Bar Chart Naik) */}
              <Reveal delay={300}>
                <div className="flex flex-col items-center group cursor-default">
                  <div className="relative w-56 h-56 flex items-center justify-center mb-6 border-[12px] border-slate-50 dark:border-slate-800/50 rounded-full bg-slate-50 dark:bg-slate-800 shadow-inner overflow-hidden">
                    {/* Simulasi Bar Chart */}
                    <div className="absolute inset-0 flex items-end justify-center gap-4 pb-8">
                      <div className="w-10 bg-cyan-100 dark:bg-cyan-900/40 rounded-t-xl h-16 transition-all duration-700 group-hover:h-20 group-hover:bg-cyan-200 dark:group-hover:bg-cyan-800/60"></div>
                      <div className="w-10 bg-cyan-300 dark:bg-cyan-700/60 rounded-t-xl h-24 transition-all duration-700 delay-75 group-hover:h-28 group-hover:bg-cyan-400"></div>
                      <div className="w-10 bg-cyan-500 rounded-t-xl h-36 shadow-[0_-5px_20px_rgba(6,182,212,0.4)] transition-all duration-700 delay-150 group-hover:h-44 group-hover:bg-cyan-400"></div>
                    </div>
                    {/* Teks di tengah */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pb-4">
                      <div className="text-5xl font-black text-slate-900 dark:text-white tabular-nums tracking-tighter drop-shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2">
                        <CountUp to={3} suffix="x" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Aksi Nyata</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">Memberikan arahan dan next steps yang jelas bagi mahasiswa.</p>
                </div>
              </Reveal>

            </div>
          </div>
        </section>

        {/* =========================
            FITUR UTAMA
        ========================= */}
        <section id="fitur" className="bg-white dark:bg-slate-900 py-24 sm:py-32 transition-colors duration-300">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                  Solusi End-to-End Penilaian
                </h2>
                <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                  Menggabungkan kecepatan AI dengan kebijaksanaan pengajar.
                </p>
              </div>
            </Reveal>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Reveal delay={0}>
                <FeatureCard
                  title="Draft Otomatis"
                  desc="Tidak perlu mengetik dari nol. AI membaca submission dan rubrik Anda, lalu membuat draft feedback per kriteria."
                  icon={IconSparkles}
                  colorClass="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                />
              </Reveal>

              <Reveal delay={90}>
                <FeatureCard
                  title="Rubrik Konsisten"
                  desc="Pastikan setiap mahasiswa dinilai dengan standar yang sama. Rubrik Anda menjadi 'prompt' utama bagi AI."
                  icon={IconScale}
                  colorClass="bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                />
              </Reveal>

              <Reveal delay={180}>
                <FeatureCard
                  title="Insight Kelas"
                  desc="Dashboard analitik sederhana untuk memantau siapa yang terlambat, rata-rata nilai, dan progres kelas."
                  icon={IconChart}
                  colorClass="bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400"
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* =========================
            WORKFLOW
        ========================= */}
        <section id="workflow" className="relative overflow-hidden border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 py-24 transition-colors duration-300">
          <div className="absolute top-0 left-0 -ml-24 -mt-24 h-96 w-96 rounded-full bg-blue-100/50 dark:bg-blue-900/20 blur-3xl floaty" />

          <div className="mx-auto max-w-7xl px-4 relative sm:px-6 lg:px-8">
            <Reveal>
              <div className="mb-16 md:text-center">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Workflow</h2>
                <p className="mt-4 text-slate-600 dark:text-slate-400">Proses yang natural, namun jauh lebih cepat.</p>
              </div>
            </Reveal>

            <div className="grid gap-12 lg:grid-cols-4">
               {workflows.map((item, idx) => {
                  const Icon = item.icon;

                  return (
                    <Reveal key={idx} delay={idx * 90}>
                      <div className="relative text-center group">

                        {idx !== workflows.length - 1 && (
                          <div className="absolute top-10 left-1/2 hidden h-0.5 w-full -translate-x-1/2 bg-slate-200 dark:bg-slate-700 lg:block" />
                        )}

                        <div className="relative z-10 mx-auto flex h-20 w-20 flex-col items-center justify-center rounded-2xl 
                          bg-white dark:bg-slate-800 shadow-md ring-1 ring-slate-900/5 dark:ring-white/10
                          transition group-hover:scale-105">

                          <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-1" />
                          <span className="text-xs font-bold text-slate-400">
                            {item.step}
                          </span>
                        </div>

                        <h3 className="mt-6 text-lg font-bold text-slate-900 dark:text-white">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                          {item.desc}
                        </p>

                      </div>
                    </Reveal>
                  );
                })}
            </div>
          </div>
        </section>

        {/* =========================
            CTA
        ========================= */}
        <section id="mulai" className="relative py-24 bg-blue-900">
          <div className="absolute inset-0 bg-blue-900" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl floaty" />
          <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl floaty2" />

          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <Reveal>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Siap Mencoba MVP RubriQ AI?
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
                Sistem sudah siap digunakan untuk 1 kelas dan 1 tugas. Rasakan kemudahan memberikan feedback formatif yang berkualitas.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href={route("register")}
                  className="rounded-full bg-white px-8 py-3.5 text-sm font-bold text-blue-900 shadow-sm hover:bg-blue-50 transition"
                >
                  Mulai Sekarang
                </Link>
                <Link
                  href={route("login")}
                  className="text-sm font-semibold leading-6 text-white hover:text-blue-200"
                >
                  Sudah punya akun? <span aria-hidden="true">→</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* =========================
            FOOTER
        ========================= */}
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
          <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-16 lg:px-8">
            <div className="flex justify-center space-x-10 text-slate-400 dark:text-slate-500">
              <span className="text-sm font-medium">Human-in-the-loop AI Grading System</span>
            </div>
            <p className="mt-10 text-center text-xs leading-5 text-slate-500 dark:text-slate-600">
              &copy; 2026 RubriQ AI. Proyek Pengembangan Aplikasi Web.
            </p>
          </div>
        </footer>

        {/* =========================
            BACK TO TOP
        ========================= */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={cx(
            "fixed bottom-6 right-6 z-50 rounded-full border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-300 shadow-lg backdrop-blur transition hover:text-blue-600 dark:hover:text-blue-400",
            showTop ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2"
          )}
        >
          ↑ Top
        </button>
      </div>
    </>
  );
}