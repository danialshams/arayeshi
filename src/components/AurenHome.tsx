'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  ArrowLeft,
  FlaskConical,
  Leaf,
  Menu,
  MessageCircleMore,
  Minus,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  X,
} from 'lucide-react';
import { products, type Product } from '@/data/products';

const menuLinks = [
  { label: 'خانه', href: '#home' },
  { label: 'محصولات', href: '#products' },
  { label: 'درباره ما', href: '#about' },
  { label: 'وبلاگ', href: '#journal' },
  { label: 'تماس با ما', href: '#contact' },
];

const sellingPoints = [
  { icon: FlaskConical, title: 'فرمولاسیون پیشرفته', description: 'با جدیدترین فناوری‌های روز دنیا' },
  { icon: Leaf, title: 'مناسب انواع پوست', description: 'برای همه سلیقه‌ها و نیازها' },
  { icon: ShieldCheck, title: 'تضمین کیفیت', description: 'با استانداردهای جهانی' },
];

type Cart = Record<string, number>;

export default function AurenHome() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [cart, setCart] = useState<Cart>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [chatNotice, setChatNotice] = useState(false);

  const quantity = useMemo(() => Object.values(cart).reduce((a: number, b: number) => a + b, 0), [cart]);
  const filteredProducts = useMemo(
    () => products.filter((product) => `${product.title} ${product.subtitle} ${product.description}`.includes(search.trim())),
    [search]
  );
  const cartProducts = useMemo(() => products.filter((p) => cart[p.id]), [cart]);

  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setCartOpen(false);
    setSelectedProduct(null);
    setChatOpen(false);
  }, []);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeAll();
    };
    document.addEventListener('keydown', onEscape);
    return () => document.removeEventListener('keydown', onEscape);
  }, [closeAll]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      syncTouch: false,
      anchors: true,
    });
    const update = (time: number) => lenis.raf(time * 1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();
    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!rootRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      heroTl
        .fromTo(
          '.stage-portrait',
          { autoAlpha: 0, y: 118, scale: 1.04, filter: 'blur(7px)' },
          { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.96 },
        )
        .fromTo(
          '.brand-left-group .brand-letter:nth-child(1)',
          { autoAlpha: 0, x: -185, scaleX: 1.64, scaleY: 0.84, skewX: -8, transformOrigin: '100% 50%' },
          { autoAlpha: 1, x: 0, scaleX: 1, scaleY: 1, skewX: 0, duration: 0.66, ease: 'elastic.out(1.12, 0.58)' },
          '-=0.26'
        )
        .fromTo(
          '.brand-right-group .brand-letter:nth-child(1)',
          { autoAlpha: 0, x: 185, scaleX: 1.64, scaleY: 0.84, skewX: 8, transformOrigin: '0% 50%' },
          { autoAlpha: 1, x: 0, scaleX: 1, scaleY: 1, skewX: 0, duration: 0.66, ease: 'elastic.out(1.12, 0.58)' },
          '-=0.53'
        )
        .fromTo(
          '.brand-left-group .brand-letter:nth-child(2)',
          { autoAlpha: 0, x: -170, scaleX: 1.56, scaleY: 0.86, skewX: -7, transformOrigin: '100% 50%' },
          { autoAlpha: 1, x: 0, scaleX: 1, scaleY: 1, skewX: 0, duration: 0.62, ease: 'elastic.out(1.08, 0.58)' },
          '-=0.5'
        )
        .fromTo(
          '.brand-right-group .brand-letter:nth-child(2)',
          { autoAlpha: 0, x: 170, scaleX: 1.56, scaleY: 0.86, skewX: 7, transformOrigin: '0% 50%' },
          { autoAlpha: 1, x: 0, scaleX: 1, scaleY: 1, skewX: 0, duration: 0.62, ease: 'elastic.out(1.08, 0.58)' },
          '-=0.48'
        )
        .fromTo(
          '.brand-left-group .brand-letter:nth-child(3)',
          { autoAlpha: 0, x: -150, scaleX: 1.48, scaleY: 0.88, skewX: -6, transformOrigin: '100% 50%' },
          { autoAlpha: 1, x: 0, scaleX: 1, scaleY: 1, skewX: 0, duration: 0.58, ease: 'elastic.out(1.02, 0.58)' },
          '-=0.45'
        )
        .fromTo(
          '.stage-bottle',
          { autoAlpha: 0, y: 186, scale: 0.92 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.78, ease: 'power4.out' },
          '-=0.14'
        )
        .fromTo(
          '.stage-rock',
          { autoAlpha: 0, y: 92, scale: 0.98 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.68 },
          '-=0.34'
        )
        .fromTo(
          '.hero-copy > *',
          { autoAlpha: 0, y: 24, filter: 'blur(5px)' },
          { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.52, stagger: 0.085 },
          '-=0.03'
        )
        .fromTo(
          '.header-inner',
          { autoAlpha: 0, y: -12 },
          { autoAlpha: 1, y: 0, duration: 0.46 },
          '-=0.3'
        )
        .fromTo(
          '.hero-wave',
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 0.72 },
          '-=0.34'
        )
        .fromTo(
          '.hero-bubble',
          { autoAlpha: 0, scale: 0.72, y: 14 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.62 },
          '-=0.46'
        );

      gsap.to('.hero-bubble', { y: -10, duration: 4.1, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.3 });
      gsap.to('.section-bubble', { y: -18, x: 6, duration: 4.8, repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: 0.28 });

      gsap.fromTo(
        '.story-copy > .story-reveal',
        { autoAlpha: 0, y: 42 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.16,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.about-layout', start: 'top 78%', once: true },
        }
      );

      gsap.fromTo(
        '.selling-point',
        { autoAlpha: 0, y: 54, scale: 0.96 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.84,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.selling-points', start: 'top 82%', once: true },
        }
      );

      gsap.fromTo(
        '.story-stat-number, .story-stat-caption, .stat-divider',
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.story-stat', start: 'top 88%', once: true },
        }
      );

      gsap.fromTo(
        '.product-card',
        { autoAlpha: 0, y: 78, scale: 0.965 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.92,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.products-grid', start: 'top 84%', once: true },
        }
      );

      gsap.fromTo(
        '.journal-inner > *',
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          scrollTrigger: { trigger: '#journal', start: 'top 82%', once: true },
        }
      );

      gsap.to('.stage-portrait', {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 1.15 },
      });
      gsap.to('.stage-bottle', {
        yPercent: -4,
        ease: 'none',
        scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 1.3 },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const addToCart = (id: string) => {
    setCart((old: Cart) => ({ ...old, [id]: (old[id] || 0) + 1 }));
    setSelectedProduct(null);
    setCartOpen(true);
  };

  const updateQuantity = (id: string, amount: number) => {
    setCart((current: Cart) => {
      const next = { ...current };
      const value = (next[id] || 0) + amount;
      if (value <= 0) delete next[id];
      else next[id] = value;
      return next;
    });
  };

  const navTo = () => {
    setMenuOpen(false);
    setSearchOpen(false);
  };

  return (
    <div className="site" ref={rootRef}>
      <section className="hero" id="home" aria-label="معرفی اورن اسکین">
        <div className="hero-red-gradient" aria-hidden="true" />

        <header className="site-header" aria-label="ناوبری اصلی">
          <div className="header-inner">
            <a className="brand-mark" href="#home" onClick={navTo} dir="ltr" aria-label="Auren Skin - خانه">
              AUREN SKIN<span>®</span>
            </a>
            <nav className="desktop-nav" aria-label="منوی اصلی">
              {menuLinks.map((link, index) => (
                <a key={link.label} className={index === 0 ? 'is-current' : ''} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="header-actions">
              <button type="button" className="header-icon" aria-label="باز کردن جستجو" onClick={() => setSearchOpen(true)}>
                <Search size={20} strokeWidth={1.8} />
              </button>
              <span className="header-separator" aria-hidden="true" />
              <button type="button" className="cart-icon" aria-label={`سبد خرید، ${quantity} محصول`} onClick={() => setCartOpen(true)}>
                <ShoppingBag size={18} strokeWidth={1.7} />
                {quantity > 0 && <span className="cart-count">{quantity.toLocaleString('fa-IR')}</span>}
              </button>
              <button type="button" className="header-icon mobile-menu-trigger" aria-label="باز کردن منو" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
                <Menu size={25} />
              </button>
            </div>
          </div>
        </header>

        <div className="stage-portrait" aria-hidden="true">
          <Image src="/images/hero-portrait.webp" alt="" fill priority sizes="(max-width: 767px) 100vw, 60vw" quality={88} />
        </div>

        <div className="stage-brand" aria-hidden="true" dir="ltr">
          <span className="brand-group brand-left-group">
            <span className="brand-letter">A</span>
            <span className="brand-letter">U</span>
            <span className="brand-letter">R</span>
          </span>
          <span className="brand-group brand-right-group">
            <span className="brand-letter">E</span>
            <span className="brand-letter">N</span>
          </span>
        </div>

        <div className="stage-bottle" aria-hidden="true">
          <Image src="/images/hero-bottle.webp" alt="" fill sizes="(max-width: 767px) 32vw, 240px" quality={90} />
        </div>

        <div className="stage-rock" aria-hidden="true">
          <Image src="/images/hero-stone.webp" alt="" fill sizes="(max-width: 767px) 78vw, 640px" quality={88} />
        </div>

        <div className="hero-content content-width">
          <div className="hero-copy">
            <p className="hero-kicker">آغاز فصل جدید مراقبت از پوست</p>
            <h1 className="hero-title">
              <span className="line">پوست سالم‌تر،</span>
              <span className="line accent">زیباتر، همیشه</span>
            </h1>
            <p className="hero-description">با محصولات مراقبت پوستی اورن، زیبایی طبیعی پوستت رو تجربه کن.</p>
          </div>
        </div>

        <div className="hero-bubble bubble" aria-hidden="true" />

        <svg className="hero-wave" viewBox="0 0 1000 116" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 92 C175 123 365 15 563 34 C737 51 839 116 1000 77 L1000 116 L0 116 Z" fill="#fff4ed" />
          <path d="M0 91 C175 122 365 14 563 33 C737 50 839 115 1000 76" fill="none" stroke="#fff8f4" strokeWidth="4" />
        </svg>
      </section>

      <main>
        <section className="about-section" id="about" aria-labelledby="about-heading">
          <div className="about-glow" aria-hidden="true" />
          <span className="section-bubble bubble bubble-one" aria-hidden="true" />
          <span className="section-bubble bubble bubble-two" aria-hidden="true" />
          <span className="section-bubble bubble bubble-three" aria-hidden="true" />
          <span className="section-bubble bubble bubble-four" aria-hidden="true" />
          <span className="section-bubble bubble bubble-five" aria-hidden="true" />
          <div className="about-layout content-width">
            <div className="story-copy">
              <p className="section-label story-reveal">
                <span className="label-dot" /> درباره اورن اسکین
              </p>
              <h2 id="about-heading" className="story-title story-reveal">
                مراقبت از پوست، با علم و زیبایی
                <br />
                <em>قدرت گرفته از علم</em>
              </h2>
              <p className="story-description story-reveal">
                در اورن اسکین، ما با بهره‌گیری از فرمولاسیون‌های پیشرفته و ترکیبات مؤثر، محصولاتی می‌سازیم که سلامت و شادابی پوست رو دوام می‌بخشن.
              </p>
              <div className="story-stat story-reveal">
                <span className="story-stat-caption">
                  کاربران از سلامت بیشتر
                  <br />
                  پوست خودشون خبر دادن.
                </span>
                <span className="stat-divider" aria-hidden="true" />
                <strong className="story-stat-number" dir="ltr">
                  ۹۸٪
                </strong>
              </div>
            </div>
            <div className="selling-points" aria-label="ویژگی‌های برند">
              {sellingPoints.map(({ icon: Icon, title, description }) => (
                <div className="selling-point" key={title}>
                  <div className="point-icon">
                    <Icon size={29} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="product-section content-width" id="products">
            <div className="products-grid" aria-label="محصولات منتخب">
              {filteredProducts.length ? (
                filteredProducts.map((product) => (
                  <button
                    type="button"
                    className="product-card"
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    aria-label={`اطلاعات بیشتر درباره ${product.title}`}
                  >
                    <span className="product-image">
                      <Image src={product.image} alt={product.imageAlt} fill sizes="(max-width: 640px) 44vw, (max-width: 950px) 45vw, 24vw" quality={86} />
                    </span>
                    <span className="product-copy">
                      <span className="product-name">{product.title}</span>
                      <span className="product-subtitle">{product.subtitle}</span>
                    </span>
                  </button>
                ))
              ) : (
                <p className="no-results">محصولی با این عبارت پیدا نشد.</p>
              )}
            </div>
          </div>
          <div className="bottom-flow" aria-hidden="true" />
        </section>

        <section className="journal-section" id="journal" aria-labelledby="journal-heading">
          <div className="journal-inner content-width">
            <p className="section-label">
              <span className="label-dot" /> زیبایی آگاهانه
            </p>
            <h2 id="journal-heading">
              مراقبت خوب از پوست،
              <br />
              <em>از شناخت شروع می‌شه.</em>
            </h2>
            <p>روتین مراقبت از پوست باید ساده، آرامش‌بخش و مناسب نیاز واقعی تو باشه.</p>
            <a href="#contact" className="outline-link">
              با ما در ارتباط باش <ArrowLeft size={17} />
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div className="content-width footer-content">
          <a href="#home" className="footer-brand" dir="ltr">
            AUREN SKIN®
          </a>
          <p>زیبایی طبیعی پوست، هر روز.</p>
          <span>نمونه نمایشی طراحی هوم‌پیج</span>
        </div>
      </footer>

      <button type="button" className="chat-fab" onClick={() => setChatOpen((v) => !v)} aria-label="باز کردن گفت‌وگو" aria-expanded={chatOpen}>
        {chatOpen ? <X size={24} /> : <MessageCircleMore size={23} />}
      </button>

      {chatOpen && (
        <div className="chat-panel" role="dialog" aria-label="گفت‌وگو با اورن اسکین">
          <div className="chat-panel-header">
            <strong>با اورن اسکین گفت‌وگو کن</strong>
            <button type="button" onClick={() => setChatOpen(false)} aria-label="بستن">
              <X size={18} />
            </button>
          </div>
          <p>برای مشاوره و راهنمایی، پیام خودت رو بنویس.</p>
          <textarea
            value={chatMessage}
            onChange={(e) => {
              setChatMessage(e.target.value);
              setChatNotice(false);
            }}
            rows={3}
            placeholder="پیامت رو اینجا بنویس..."
            aria-label="پیام"
          />
          <button type="button" className="chat-submit" onClick={() => setChatNotice(true)} disabled={!chatMessage.trim()}>
            ارسال پیام <ArrowLeft size={15} />
          </button>
          {chatNotice && <small role="status">این نسخه نمایشی است؛ برای ارسال واقعی، اتصال به پشتیبانی لازم است.</small>}
        </div>
      )}

      {menuOpen && (
        <div className="overlay-shell" role="dialog" aria-modal="true" aria-label="منوی موبایل" onMouseDown={(event: ReactMouseEvent<HTMLDivElement>) => { if (event.target === event.currentTarget) setMenuOpen(false); }}>
          <div className="mobile-nav-panel">
            <div className="mobile-panel-head">
              <strong dir="ltr">AUREN SKIN®</strong>
              <button type="button" aria-label="بستن منو" onClick={() => setMenuOpen(false)}>
                <X size={25} />
              </button>
            </div>
            <nav aria-label="منوی موبایل">
              {menuLinks.map((link, index) => (
                <a href={link.href} onClick={navTo} key={link.href}>
                  <span>۰{index + 1}</span>
                  {link.label}
                  <ArrowLeft size={19} />
                </a>
              ))}
            </nav>
            <small>مراقبت از پوست، با علم و زیبایی</small>
          </div>
        </div>
      )}

      {searchOpen && (
        <div className="overlay-shell" role="dialog" aria-modal="true" aria-label="جستجوی محصولات" onMouseDown={(event: ReactMouseEvent<HTMLDivElement>) => { if (event.target === event.currentTarget) setSearchOpen(false); }}>
          <div className="search-panel">
            <button className="close-top" type="button" onClick={() => setSearchOpen(false)} aria-label="بستن">
              <X size={22} />
            </button>
            <p className="section-label">
              <span className="label-dot" /> جستجوی محصولات
            </p>
            <label htmlFor="site-search">دنبال چه محصولی می‌گردی؟</label>
            <div className="search-input-wrap">
              <Search size={21} />
              <input id="site-search" autoFocus type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="نام محصول رو بنویس..." />
            </div>
            <div className="search-suggestions">
              {filteredProducts.map((p: Product) => (
                <button key={p.id} type="button" onClick={() => { setSelectedProduct(p); setSearchOpen(false); }}>
                  {p.title}
                  <ArrowLeft size={16} />
                </button>
              ))}
              {!filteredProducts.length && <p>نتیجه‌ای پیدا نشد.</p>}
            </div>
          </div>
        </div>
      )}

      {cartOpen && (
        <div className="overlay-shell drawer-overlay" role="dialog" aria-modal="true" aria-label="سبد خرید" onMouseDown={(event: ReactMouseEvent<HTMLDivElement>) => { if (event.target === event.currentTarget) setCartOpen(false); }}>
          <aside className="cart-drawer">
            <div className="drawer-header">
              <h2>
                سبد خرید <span>({quantity.toLocaleString('fa-IR')})</span>
              </h2>
              <button type="button" onClick={() => setCartOpen(false)} aria-label="بستن سبد">
                <X size={23} />
              </button>
            </div>
            {cartProducts.length ? (
              <>
                <div className="cart-list">
                  {cartProducts.map((p: Product) => (
                    <div className="cart-item" key={p.id}>
                      <div className="cart-photo">
                        <Image src={p.image} alt={p.imageAlt} fill sizes="90px" />
                      </div>
                      <div className="cart-item-body">
                        <strong>{p.title}</strong>
                        <span>{p.subtitle}</span>
                        <div className="qty-control">
                          <button type="button" onClick={() => updateQuantity(p.id, -1)} aria-label={`کم کردن ${p.title}`}>
                            <Minus size={15} />
                          </button>
                          <span>{cart[p.id].toLocaleString('fa-IR')}</span>
                          <button type="button" onClick={() => updateQuantity(p.id, 1)} aria-label={`افزودن ${p.title}`}>
                            <Plus size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="demo-note">این سبد خرید نمایشی است. برای پرداخت، دیتابیس و درگاه باید متصل شوند.</p>
              </>
            ) : (
              <div className="cart-empty">
                <ShoppingBag size={45} strokeWidth={1.3} />
                <p>سبد خریدت هنوز خالیه.</p>
                <button type="button" onClick={() => { setCartOpen(false); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }}>
                  دیدن محصولات <ArrowLeft size={17} />
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {selectedProduct && (
        <div className="overlay-shell" role="dialog" aria-modal="true" aria-label={selectedProduct.title} onMouseDown={(event: ReactMouseEvent<HTMLDivElement>) => { if (event.target === event.currentTarget) setSelectedProduct(null); }}>
          <div className="quick-view">
            <button className="close-top" type="button" onClick={() => setSelectedProduct(null)} aria-label="بستن">
              <X size={23} />
            </button>
            <div className="quick-photo">
              <Image src={selectedProduct.image} alt={selectedProduct.imageAlt} fill sizes="(max-width: 640px) 86vw, 340px" />
            </div>
            <div className="quick-copy">
              <span className="section-label">
                <span className="label-dot" /> {selectedProduct.badge}
              </span>
              <h2>{selectedProduct.title}</h2>
              <p>{selectedProduct.description}</p>
              <button type="button" className="pill-button pill-dark" onClick={() => addToCart(selectedProduct.id)}>
                افزودن به سبد <span className="pill-arrow"><Plus size={20} /></span>
              </button>
              <small>این محصول و فرایند خرید در نسخه نمایشی هستند.</small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
