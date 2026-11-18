export type Product = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  description: string;
  badge?: string;
};

export const products: Product[] = [
  {
    id: 'gentle-cleanser',
    title: 'ژل شستشوی ملایم',
    subtitle: 'پاکسازی عمیق و ملایم',
    image: '/images/product-cleanser-v2.webp',
    imageAlt: 'شوینده ملایم اورن اسکین با فوم روی پس‌زمینه قرمز',
    description: 'پاکسازی روزمره پوست، بدون احساس خشکی و کشیدگی.',
    badge: 'پاکسازی',
  },
  {
    id: 'daily-moisturizer',
    title: 'مرطوب‌کننده روزانه',
    subtitle: 'نرمی و لطافت بیشتر',
    image: '/images/product-moisturizer-v2.webp',
    imageAlt: 'کرم مرطوب‌کننده اورن اسکین روی پس‌زمینه قرمز',
    description: 'رطوبت‌رسانی و کمک به حفظ لطافت روزانه پوست.',
    badge: 'آبرسانی',
  },
  {
    id: 'vitamin-c',
    title: 'سرم روشن‌کننده ویتامین C',
    subtitle: 'درخشش و شفافیت پوست',
    image: '/images/product-serum.webp',
    imageAlt: 'بطری قرمز سرم ویتامین C اورن اسکین روی پس‌زمینه قرمز',
    description: 'تکمیل روتین مراقبت از پوست با یک سرم سبک و خوش‌حس.',
    badge: 'سرم',
  },
  {
    id: 'deep-hydration',
    title: 'کرم آبرسان عمیق',
    subtitle: 'مرطوب‌کنندگی ماندگار',
    image: '/images/product-hydrating-cream.webp',
    imageAlt: 'کرم آبرسان اورن اسکین روی سنگ با پس‌زمینه قرمز',
    description: 'یک کرم غلیظ و نرم برای رطوبت‌رسانی عمیق و کمک به تقویت سد دفاعی پوست.',
    badge: 'آبرسانی عمیق',
  },
];
