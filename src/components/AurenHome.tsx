'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { ArrowLeft, Menu, MessageCircleMore, Minus, Plus, Search, ShoppingBag, X } from 'lucide-react';
import { pageMarkup } from '@/data/page-markup';
import { products, type Product } from '@/data/products';

type Cart = Record<string, number>;
const menuLinks = [
  { label: 'خانه', href: '#home' },
  { label: 'محصولات', href: '#products' },
  { label: 'درباره ما', href: '#about' },
  { label: 'وبلاگ', href: '#journal' },
  { label: 'تماس با ما', href: '#contact' },
];
const imageStyle = { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' } as const;

export default function AurenHome() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<Cart>({});
  const [search, setSearch] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [chatNotice, setChatNotice] = useState(false);

  const quantity = useMemo(() => Object.values(cart).reduce((a, b) => a + b, 0), [cart]);
  const cartProducts = useMemo(() => products.filter(p => cart[p.id]), [cart]);
  const matches = useMemo(() => products.filter(p => (p.title + ' ' + p.description + ' ' + p.subtitle).includes(search.trim())), [search]);
  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setCartOpen(false);
    setSearchOpen(false);
    setChatOpen(false);
    setSelectedProduct(null);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeAll(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closeAll]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const onRootClick = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const action = target.closest('[data-action]')?.getAttribute('data-action');
      if (action === 'search') setSearchOpen(true);
      if (action === 'cart') setCartOpen(true);
      if (action === 'menu') setMenuOpen(true);
      const id = target.closest('[data-product]')?.getAttribute('data-product');
      if (id) setSelectedProduct(products.find(p => p.id === id) ?? null);
    };
    root.addEventListener('click', onRootClick);
    return () => root.removeEventListener('click', onRootClick);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true, wheelMultiplier: 0.95, syncTouch: false, anchors: true });
    const update = (time: number) => lenis.raf(time * 1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // Hero entrance: portrait, spring-loaded AUR/EN, bottle, stone, then Persian copy.
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.stage-portrait',
        { autoAlpha: 0, y: 150, scale: 1.025 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 1.35, ease: 'power4.out' })
        .fromTo('.brand-half-left',
          { autoAlpha: 0, x: -240, scale: 0.85, rotation: -5 },
          { autoAlpha: 1, x: 0, scale: 1, rotation: 0, duration: 1.25, ease: 'elastic.out(1, 0.72)' }, '-=0.35')
        .fromTo('.brand-half-right',
          { autoAlpha: 0, x: 240, scale: 0.85, rotation: 5 },
          { autoAlpha: 1, x: 0, scale: 1, rotation: 0, duration: 1.25, ease: 'elastic.out(1, 0.72)' }, '<')
        .fromTo('.stage-bottle',
          { autoAlpha: 0, y: 180, scale: 0.9, rotation: -3 },
          { autoAlpha: 1, y: 0, scale: 1, rotation: 0, duration: 1.12, ease: 'power4.out' }, '-=0.2')
        .fromTo('.stage-rock',
          { autoAlpha: 0, y: 145, scale: 0.94 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 1.02, ease: 'power3.out' }, '-=0.28')
        .fromTo('.hero-kicker',
          { autoAlpha: 0, y: 42 },
          { autoAlpha: 1, y: 0, duration: 0.72 })
        .fromTo('.hero-title .line',
          { autoAlpha: 0, yPercent: 110 },
          { autoAlpha: 1, yPercent: 0, duration: 0.92, stagger: 0.2 }, '-=0.28')
        .fromTo('.hero-description',
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.82 }, '-=0.38')
        .fromTo('.header-inner',
          { autoAlpha: 0, y: -18 },
          { autoAlpha: 1, y: 0, duration: 0.65 }, '-=0.5')
        .fromTo('.hero-wave',
          { autoAlpha: 0, y: 52 },
          { autoAlpha: 1, y: 0, duration: 1.15 }, '-=0.62')
        .fromTo('.hero-bubble',
          { autoAlpha: 0, scale: 0.68, y: 24 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.95 }, '-=0.75');
      gsap.to('.hero-bubble', { y: -12, duration: 4.2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2.5 });
      gsap.to('.section-bubble', { y: -14, duration: 5.5, repeat: -1, yoyo: true, stagger: 0.35, ease: 'sine.inOut' });

      gsap.fromTo('.story-copy > .story-reveal', { autoAlpha: 0, y: 43 },
        { autoAlpha: 1, y: 0, duration: 0.95, stagger: 0.17, ease: 'power3.out',
          scrollTrigger: { trigger: '.story-copy', start: 'top 79%', once: true } });
      gsap.fromTo('.selling-point', { autoAlpha: 0, y: 55, scale: 0.96 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.16, ease: 'power3.out',
          scrollTrigger: { trigger: '.selling-points', start: 'top 82%', once: true } });
      gsap.fromTo('.story-stat-number', { autoAlpha: 0, y: 45, scale: 0.91 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.story-stat', start: 'top 86%', once: true } });
      gsap.fromTo('.product-card', { autoAlpha: 0, y: 100, scale: 0.96 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.95, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.products-grid', start: 'top 84%', once: true } });
      gsap.fromTo('.journal-inner > *', { autoAlpha: 0, y: 60 },
        { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.14,
          scrollTrigger: { trigger: '#journal', start: 'top 80%', once: true } });
      gsap.to('.stage-portrait', { yPercent: 7, ease: 'none',
        scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 1.2 } });
    }, root);
    ScrollTrigger.refresh();
    return () => { ctx.revert(); gsap.ticker.remove(update); lenis.destroy(); };
  }, []);

  const addToCart = (id: string) => {
    setCart(old => ({ ...old, [id]: (old[id] || 0) + 1 }));
    setSelectedProduct(null);
    setCartOpen(true);
  };
  const updateQuantity = (id: string, delta: number) => {
    setCart(old => {
      const next = { ...old };
      const n = (next[id] || 0) + delta;
      if (n < 1) delete next[id]; else next[id] = n;
      return next;
    });
  };

  return (
    <>
      <div className="auren-mounted" ref={rootRef} dangerouslySetInnerHTML={{ __html: pageMarkup }} />
      <button type="button" className="chat-fab" onClick={() => setChatOpen(v => !v)} aria-label="باز کردن گفت‌وگو" aria-expanded={chatOpen}>
        {chatOpen ? <X size={24} /> : <MessageCircleMore size={23} />}
      </button>
      {chatOpen && <div className="chat-panel" role="dialog" aria-label="گفت‌وگو با اورن اسکین">
        <div className="chat-panel-header"><strong>با اورن اسکین گفت‌وگو کن</strong><button type="button" onClick={() => setChatOpen(false)} aria-label="بستن"><X size={18} /></button></div>
        <p>برای مشاوره و راهنمایی، پیام خودت رو بنویس.</p>
        <textarea value={chatMessage} onChange={e => { setChatMessage(e.target.value); setChatNotice(false); }} rows={3} placeholder="پیامت رو اینجا بنویس..." aria-label="پیام" />
        <button type="button" className="chat-submit" disabled={!chatMessage.trim()} onClick={() => setChatNotice(true)}>ارسال پیام <ArrowLeft size={15} /></button>
        {chatNotice && <small role="status">این نسخه نمایشی است؛ برای ارسال واقعی، اتصال به پشتیبانی لازم است.</small>}
      </div>}
      {menuOpen && <div className="overlay-shell" role="dialog" aria-modal="true" aria-label="منوی موبایل" onMouseDown={e => { if (e.target === e.currentTarget) setMenuOpen(false); }}>
        <div className="mobile-nav-panel">
          <div className="mobile-panel-head"><strong dir="ltr">AUREN SKIN®</strong><button type="button" aria-label="بستن منو" onClick={() => setMenuOpen(false)}><X size={25} /></button></div>
          <nav aria-label="منوی موبایل">{menuLinks.map((link, index) =>
            <a href={link.href} key={link.href} onClick={() => setMenuOpen(false)}><span>{'۰' + (index + 1)}</span>{link.label}<ArrowLeft size={19} /></a>)}</nav>
          <small>مراقبت از پوست، با علم و زیبایی</small>
        </div>
      </div>}
      {searchOpen && <div className="overlay-shell" role="dialog" aria-modal="true" aria-label="جستجوی محصولات" onMouseDown={e => { if (e.target === e.currentTarget) setSearchOpen(false); }}>
        <div className="search-panel">
          <button className="close-top" type="button" onClick={() => setSearchOpen(false)} aria-label="بستن"><X size={22} /></button>
          <p className="section-label"><span className="label-dot" /> جستجوی محصولات</p>
          <label htmlFor="site-search">دنبال چه محصولی می‌گردی؟</label>
          <div className="search-input-wrap"><Search size={21} /><input id="site-search" autoFocus type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="نام محصول رو بنویس..." /></div>
          <div className="search-suggestions">{matches.map(p =>
            <button key={p.id} type="button" onClick={() => { setSelectedProduct(p); setSearchOpen(false); }}>{p.title}<ArrowLeft size={16} /></button>)}
            {!matches.length && <p>نتیجه‌ای پیدا نشد.</p>}
          </div>
        </div>
      </div>}
      {cartOpen && <div className="overlay-shell drawer-overlay" role="dialog" aria-modal="true" aria-label="سبد خرید" onMouseDown={e => { if (e.target === e.currentTarget) setCartOpen(false); }}>
        <aside className="cart-drawer">
          <div className="drawer-header"><h2>سبد خرید <span>({quantity.toLocaleString('fa-IR')})</span></h2><button type="button" onClick={() => setCartOpen(false)} aria-label="بستن سبد"><X size={23} /></button></div>
          {cartProducts.length ? <><div className="cart-list">{cartProducts.map(p =>
            <div className="cart-item" key={p.id}>
              <div className="cart-photo"><img src={p.image} alt={p.imageAlt} style={imageStyle} /></div>
              <div className="cart-item-body"><strong>{p.title}</strong><span>{p.subtitle}</span>
                <div className="qty-control"><button type="button" onClick={() => updateQuantity(p.id, -1)} aria-label={'کم کردن ' + p.title}><Minus size={15} /></button>
                  <span>{cart[p.id].toLocaleString('fa-IR')}</span><button type="button" onClick={() => updateQuantity(p.id, 1)} aria-label={'افزودن ' + p.title}><Plus size={15} /></button></div>
              </div>
            </div>)}</div><p className="demo-note">این سبد خرید نمایشی است. برای پرداخت، دیتابیس و درگاه باید متصل شوند.</p></>
            : <div className="cart-empty"><ShoppingBag size={45} strokeWidth={1.3} /><p>سبد خریدت هنوز خالیه.</p><button type="button" onClick={() => { setCartOpen(false); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }}>دیدن محصولات <ArrowLeft size={17} /></button></div>}
        </aside>
      </div>}
      {selectedProduct && <div className="overlay-shell" role="dialog" aria-modal="true" aria-label={selectedProduct.title} onMouseDown={e => { if (e.target === e.currentTarget) setSelectedProduct(null); }}>
        <div className="quick-view">
          <button type="button" className="close-top" onClick={() => setSelectedProduct(null)} aria-label="بستن"><X size={23} /></button>
          <div className="quick-photo"><img src={selectedProduct.image} alt={selectedProduct.imageAlt} style={imageStyle} /></div>
          <div className="quick-copy"><span className="section-label"><span className="label-dot" /> {selectedProduct.badge}</span><h2>{selectedProduct.title}</h2><p>{selectedProduct.description}</p>
            <button type="button" className="pill-button pill-dark" onClick={() => addToCart(selectedProduct.id)}>افزودن به سبد <span className="pill-arrow"><Plus size={20} /></span></button>
            <small>این محصول و فرایند خرید در نسخه نمایشی هستند.</small>
          </div>
        </div>
      </div>}
    </>
  );
}
