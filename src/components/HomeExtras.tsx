import Image from 'next/image';
import { ArrowLeft, Droplets, Leaf, ShieldCheck, Sparkles } from 'lucide-react';

const ritualSteps = [
  {
    number: '۰۱',
    eyebrow: 'شروعی لطیف',
    title: 'پاکسازی ملایم',
    description: 'اول پوستت رو از آلودگی‌های روزمره پاک کن؛ بدون اینکه حس خشکی یا کشیدگی داشته باشی.',
    image: '/images/product-cleanser-v2.webp',
    alt: 'ژل شستشوی اورن اسکین روی زمینه قرمز',
  },
  {
    number: '۰۲',
    eyebrow: 'یک قدم نزدیک‌تر',
    title: 'مراقبت هدفمند',
    description: 'حالا نوبت یه سرم سبک و کاربردیه؛ متناسب با چیزی که پوستت واقعاً بهش نیاز داره.',
    image: '/images/product-serum.webp',
    alt: 'سرم روشن‌کننده اورن اسکین با بسته‌بندی قرمز',
  },
  {
    number: '۰۳',
    eyebrow: 'پایان دلنشین',
    title: 'حفظ رطوبت',
    description: 'در آخر، با مرطوب‌کننده مناسب کمک کن پوستت در طول روز لطافت خودش رو حفظ کنه.',
    image: '/images/product-moisturizer-v2.webp',
    alt: 'کرم مرطوب‌کننده اورن اسکین',
  },
] as const;

const features = [
  { icon: Droplets, number: '01', title: 'رطوبت‌رسانی متعادل', desc: 'مراقبتی سبک و متناسب با حس طبیعی پوست.' },
  { icon: Leaf, number: '02', title: 'انتخاب آگاهانه', desc: 'محصولاتی که در یک روتین ساده معنا پیدا می‌کنن.' },
  { icon: ShieldCheck, number: '03', title: 'لطافت در هر روز', desc: 'توجه به تجربه استفاده، بافت و راحتی پوست.' },
] as const;

const faqs = [
  { question: 'چطور روتین پوستی مناسب خودم رو انتخاب کنم؟', answer: 'از شناخت نوع پوست، نیاز اصلی و محصولاتی که با اون‌ها راحتی شروع کن. بهتره محصولات جدید رو یکی‌یکی وارد روتینت کنی.' },
  { question: 'ترتیب استفاده از محصولات چطوره؟', answer: 'معمولاً پاک‌کننده، محصول مراقبتی سبک مثل سرم، و بعد مرطوب‌کننده استفاده می‌شن. در روتین روز، ضدآفتاب هم مرحله ضروری پایانیه.' },
  { question: 'هر روز باید از تمام محصولات استفاده کنم؟', answer: 'نه؛ یک روتین خوب قرار نیست شلوغ باشه. با چند محصول متناسب با نیاز پوستت شروع کن و دستور مصرف هر محصول رو در نظر بگیر.' },
  { question: 'برای امتحان محصول جدید چه نکته‌ای مهمه؟', answer: 'قبل از استفاده گسترده، تست حساسیت روی بخش کوچکی از پوست انجام بده و در صورت تحریک، مصرف رو قطع کن.' },
] as const;

export default function HomeExtras() {
  return (
    <div className="auren-home-extras">
      <section className="auren-ritual" aria-labelledby="auren-ritual-heading" dir="rtl">
        <div className="auren-extra-shell">
          <div className="auren-section-top">
            <span className="auren-mini-label"><Sparkles size={17} strokeWidth={1.5} /> آیین روزانه اورن</span>
            <p className="auren-top-side-note" dir="ltr">THE EVERYDAY RITUAL / 01—03</p>
          </div>
          <div className="auren-ritual-heading-row">
            <h2 id="auren-ritual-heading">زیبایی از <em>سادگی</em> شروع می‌شه.</h2>
            <p>سه قدم آشنا، برای لحظه‌هایی که فقط به خودت اختصاص می‌دی.</p>
          </div>
          <div className="auren-ritual-cards">
            {ritualSteps.map((step) => (
              <article className="auren-ritual-card" key={step.number}>
                <div className="auren-ritual-photo">
                  <Image src={step.image} alt={step.alt} fill sizes="(max-width: 760px) 94vw, 33vw" quality={88} />
                  <span className="auren-step-number" dir="ltr">{step.number}</span>
                </div>
                <div className="auren-ritual-info">
                  <span>{step.eyebrow}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="auren-ritual-caption"><span /> روتین مراقبت از پوست، یک لحظه آرام برای خودت <span /></div>
        </div>
      </section>

      <section className="auren-editorial" aria-labelledby="auren-editorial-heading" dir="rtl">
        <div className="auren-editorial-visual">
          <Image src="/images/skin-care.webp" alt="تصویری از مراقبت و بافت لطیف محصولات پوستی" fill sizes="(max-width: 850px) 100vw, 50vw" quality={88} />
          <div className="auren-editorial-image-label" dir="ltr">AUREN SKIN — A DAILY MOMENT</div>
        </div>
        <div className="auren-editorial-content">
          <span className="auren-mini-label">فلسفه مراقبت</span>
          <h2 id="auren-editorial-heading">برای پوستت،<br /><em>زمان بیشتری بذار.</em></h2>
          <p>مراقبت از پوست فقط به محصولی که انتخاب می‌کنی خلاصه نمی‌شه؛ به لحظه‌هایی مربوطه که برای خودت کنار می‌ذاری. ما به روتین‌های ساده، حس خوب و انتخاب‌های آگاهانه باور داریم.</p>
          <div className="auren-editorial-rule"><span>سادگی</span><span>آرامش</span><span>تداوم</span></div>
          <a href="#products" className="auren-editorial-link">کشف محصولات <ArrowLeft size={17} /></a>
        </div>
      </section>

      <section className="auren-feature" aria-labelledby="auren-feature-heading" dir="rtl">
        <div className="auren-feature-background" aria-hidden="true" />
        <div className="auren-extra-shell auren-feature-grid">
          <div className="auren-feature-content">
            <span className="auren-mini-label">دنیای اورن اسکین</span>
            <h2 id="auren-feature-heading">حس خوب مراقبت،<br /><em>در هر قطره.</em></h2>
            <p>از اولین قدم پاکسازی تا آخرین لایه رطوبت، هر بخش از روتینت می‌تونه فرصتی برای توجه به خودت باشه.</p>
            <div className="auren-feature-list">
              {features.map(({ icon: Icon, number, title, desc }) => (
                <div className="auren-feature-item" key={number}>
                  <span className="auren-feature-icon"><Icon size={23} strokeWidth={1.35} /></span>
                  <div><h3>{title}</h3><p>{desc}</p></div>
                  <span className="auren-feature-n" dir="ltr">{number}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="auren-feature-visual">
            <div className="auren-feature-halo" aria-hidden="true" />
            <div className="auren-feature-stone"><Image src="/images/hero-stone.webp" alt="" fill sizes="(max-width: 800px) 80vw, 40vw" /></div>
            <div className="auren-feature-bottle"><Image src="/images/hero-bottle.webp" alt="بطری سرم اورن اسکین" fill sizes="(max-width: 800px) 36vw, 17vw" quality={90} /></div>
            <span className="auren-feature-english" dir="ltr">AUREN / ESSENTIAL CARE</span>
          </div>
        </div>
      </section>

      <section className="auren-guide" aria-labelledby="auren-guide-heading" dir="rtl">
        <div className="auren-extra-shell auren-guide-grid">
          <div>
            <span className="auren-mini-label">راهنمای کوتاه مراقبت</span>
            <h2 id="auren-guide-heading">پرسش‌هایی که<br /><em>به انتخاب بهتر کمک می‌کنن.</em></h2>
            <p className="auren-guide-intro">شروع یک روتین خوب از سؤال‌های ساده می‌گذره؛ اینجا چند نکته کاربردی رو کنار هم آوردیم.</p>
          </div>
          <div className="auren-faqs">
            {faqs.map((faq, i) => (
              <details className="auren-faq" key={faq.question}>
                <summary><span className="auren-faq-index" dir="ltr">0{i + 1}</span><span>{faq.question}</span><span className="auren-faq-plus" aria-hidden="true">+</span></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
