/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { PhoneModel, Language, Theme, StoreSettings } from './types';
import Header from './components/Header';
import Calculator from './components/Calculator';
import AdminPanel from './components/AdminPanel';
import { supabase } from './supabaseClient';
import { Toaster } from 'react-hot-toast';

const defaultModels: PhoneModel[] = [
  { 
    id: '1', 
    name: 'iPhone 15 Pro Max', 
    parts: [
      { id: '1-screen', name: 'Screen Replacement', price: 1050000, warrantyPeriod: '6 Months' },
      { id: '1-battery', name: 'Battery Replacement', price: 200000, warrantyPeriod: '3 Months' }
    ] 
  },
  { 
    id: '2', 
    name: 'iPhone 15 Pro', 
    parts: [
      { id: '2-screen', name: 'Screen Replacement', price: 950000, warrantyPeriod: '6 Months' },
      { id: '2-battery', name: 'Battery Replacement', price: 180000, warrantyPeriod: '3 Months' }
    ] 
  },
];

export default function App() {
  const [models, setModels] = useState<PhoneModel[]>([]);
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('light');
  const [view, setView] = useState<'calc' | 'admin'>('calc');
  const [storeSettings, setStoreSettings] = useState<StoreSettings>({ name: '', logoUrl: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    
    // Fetch Settings
    const { data: settingsData, error: settingsError } = await supabase
      .from('store_settings')
      .select('*')
      .single();
      
    if (settingsData) {
      setStoreSettings({
        name: settingsData.name || '',
        logoUrl: settingsData.logo_url || '',
      });
    }

    // Fetch Models with Parts nested relation
    const { data: modelsData, error: modelsError } = await supabase
      .from('phone_models')
      .select('id, name, repair_parts(id, name, price, warranty_period)')
      .order('created_at', { ascending: true });

    if (modelsError) {
      console.error('Error fetching models:', modelsError);
    }

    if (modelsData && modelsData.length > 0) {
      const formattedModels: PhoneModel[] = modelsData.map((m: any) => ({
        id: m.id,
        name: m.name,
        parts: (m.repair_parts || []).map((p: any) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          warrantyPeriod: p.warranty_period || ''
        }))
      }));
      setModels(formattedModels);
    } else {
      setModels(defaultModels);
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center dark:bg-black dark:text-white">Loading...</div>;
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#0a0a0c] text-gray-900 dark:text-gray-100 font-sans transition-colors duration-200 overflow-hidden">
      {/* 1. Ambient Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-purple-400/20 dark:bg-purple-600/20 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-[40%] left-[30%] w-[30rem] h-[30rem] bg-emerald-300/10 dark:bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none z-0" />

      {/* 2. Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Toaster position="top-center" reverseOrder={false} />
        <Header theme={theme} setTheme={setTheme} lang={lang} setLang={setLang} view={view} setView={setView} storeSettings={storeSettings} />
        
        {/* THE FIX: SPACER DIV */}
        {/* Header ၏ အမြင့် h-20 (80px) နှင့် တိကျစွာ တူညီသော နေရာလွတ်ကို ဖန်တီးပေးခြင်းဖြစ်သည် */}
        <div className="h-20 w-full flex-shrink-0" />

        <main className="flex-grow w-full max-w-5xl mx-auto p-4 md:p-6 pb-24">
          {view === 'calc' ? (
            <Calculator models={models} lang={lang} theme={theme} />
          ) : (
            <AdminPanel models={models} setModels={setModels} lang={lang} storeSettings={storeSettings} setStoreSettings={setStoreSettings} />
          )}
        </main>
        
        {/* 3. Developer & Copyright Footer */}
        <footer className="relative z-10 w-full p-4 md:p-6 text-center border-t border-gray-100/50 dark:border-gray-800/50 mt-auto bg-white/10 dark:bg-black/10 backdrop-blur-sm">
          {/* Flexbox ကို အသုံးပြု၍ Responsive ဖြစ်အောင် ထိန်းချုပ်ထားခြင်း */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium">
            
            {/* Copyright Section (Dynamic Year) */}
            <span>&copy; {new Date().getFullYear()} Apple Art. All Rights Reserved.</span>
            
            {/* Separator (Mobile တွင် ဖျောက်ထားပြီး Desktop တွင်သာ ပြမည်) */}
            <span className="hidden md:inline text-gray-300 dark:text-gray-600">|</span>
            
            {/* Developer Attribution Section */}
            <span>
              Developed by{' '}
              <a 
                href="https://www.facebook.com/wunna.kyaw.thu.wnkt?" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 font-bold tracking-wide hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors duration-200 cursor-pointer"
                title="Visit Wunna Kyaw Thu on Facebook"
              >
                Wunna Kyaw Thu
              </a>
            </span>
            
          </div>
        </footer>
      </div>
    </div>
  );
}

