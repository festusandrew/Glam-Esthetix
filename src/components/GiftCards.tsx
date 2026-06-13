/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Gift, 
  CreditCard, 
  RotateCw, 
  Sparkles, 
  Check, 
  DollarSign, 
  Mail, 
  User, 
  MessageSquare, 
  Copy, 
  ArrowRight, 
  Search,
  BookOpen,
  PlusCircle,
  HelpCircle
} from 'lucide-react';
import { GiftCard, GiftCardTransaction } from '../types';

// Preloaded mock cards for instant testing
const MOCK_INITIAL_CARDS: GiftCard[] = [
  {
    code: 'GLAM-8888-2026',
    balance: 150.00,
    initialAmount: 150.00,
    buyerName: 'Damon Salvatore',
    buyerEmail: 'damon@mysticfalls.org',
    recipientName: 'Elena Gilbert',
    recipientEmail: 'elena.g@mysticfalls.org',
    message: 'Happy Anniversary to my favorite person! Enjoy a luxury set of classic lashes.',
    theme: 'radiant',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5, // 5 days ago
    transactions: [
      {
        id: 'tx-initial',
        type: 'purchase',
        amount: 150.00,
        timestamp: Date.now() - 1000 * 60 * 60 * 24 * 5,
        notes: 'Initial purchase of Radiant Deluxe Gift Card'
      }
    ]
  },
  {
    code: 'GLAM-1234-5678',
    balance: 55.00,
    initialAmount: 50.00,
    buyerName: 'Stefan Salvatore',
    buyerEmail: 'stefan@mysticfalls.org',
    recipientName: 'Caroline Forbes',
    recipientEmail: 'caroline@mysticfalls.org',
    message: 'A little something to pamper yourself at Glam Esthetix.',
    theme: 'midnight',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10, // 10 days ago
    transactions: [
      {
        id: 'tx-initial-2',
        type: 'purchase',
        amount: 50.00,
        timestamp: Date.now() - 1000 * 60 * 60 * 24 * 10,
        notes: 'Initial purchase of Midnight Velvet Gift Card'
      },
      {
        id: 'tx-reload-2',
        type: 'reload',
        amount: 25.00,
        timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2,
        notes: 'Card reload via online portal'
      },
      {
        id: 'tx-redeem-2',
        type: 'redemption',
        amount: 20.00,
        timestamp: Date.now() - 1000 * 60 * 60 * 24 * 1,
        notes: 'Redeemed towards Underarm Waxing Wax Curation'
      }
    ]
  }
];

export default function GiftCards() {
  const [activeTab, setActiveTab] = useState<'buy' | 'reload' | 'balance'>('buy');
  const [giftCards, setGiftCards] = useState<GiftCard[]>([]);
  const [toast, setToast] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Buy State
  const [buyAmount, setBuyAmount] = useState<number>(100);
  const [customBuyAmount, setCustomBuyAmount] = useState<string>('');
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [cardMessage, setCardMessage] = useState('');
  const [cardTheme, setCardTheme] = useState<'classic' | 'radiant' | 'midnight'>('radiant');
  const [purchaseSuccess, setPurchaseSuccess] = useState<boolean>(false);
  const [generatedCode, setGeneratedCode] = useState<string>('');

  // Reload State
  const [searchReloadCode, setSearchReloadCode] = useState('');
  const [validReloadCard, setValidReloadCard] = useState<GiftCard | null>(null);
  const [reloadAmount, setReloadAmount] = useState<number>(50);
  const [customReloadAmount, setCustomReloadAmount] = useState<string>('');
  const [reloadSuccess, setReloadSuccess] = useState<boolean>(false);

  // Balance Check State
  const [searchBalanceCode, setSearchBalanceCode] = useState('');
  const [queriedCard, setQueriedCard] = useState<GiftCard | null>(null);
  const [redemptionAmount, setRedemptionAmount] = useState<number>(30);
  const [customRedemptAmount, setCustomRedemptAmount] = useState<string>('');

  // Load from localStorage on initialization
  useEffect(() => {
    const saved = localStorage.getItem('glam_gift_cards');
    if (saved) {
      try {
        setGiftCards(JSON.parse(saved));
      } catch (e) {
        setGiftCards(MOCK_INITIAL_CARDS);
        localStorage.setItem('glam_gift_cards', JSON.stringify(MOCK_INITIAL_CARDS));
      }
    } else {
      setGiftCards(MOCK_INITIAL_CARDS);
      localStorage.setItem('glam_gift_cards', JSON.stringify(MOCK_INITIAL_CARDS));
    }
  }, []);

  // Save utility helper
  const saveCards = (updated: GiftCard[]) => {
    setGiftCards(updated);
    localStorage.setItem('glam_gift_cards', JSON.stringify(updated));
  };

  const showToastMsg = (text: string, type: 'success' | 'error' = 'success') => {
    setToast({ text, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Code Generator: GLAM-XXXX-XXXX
  const generateGiftCardCode = (): string => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const segment1 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const segment2 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return `GLAM-${segment1}-${segment2}`;
  };

  // Buy Action
  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerEmail || !recipientName || !recipientEmail) {
      showToastMsg('Please fill out all required email and profile details.', 'error');
      return;
    }

    const finalAmount = buyAmount === 0 ? parseFloat(customBuyAmount) : buyAmount;
    if (isNaN(finalAmount) || finalAmount < 15 || finalAmount > 1000) {
      showToastMsg('Gift cards must be loaded with values between $15 and $1,000.', 'error');
      return;
    }

    const newCode = generateGiftCardCode();
    const newCard: GiftCard = {
      code: newCode,
      balance: finalAmount,
      initialAmount: finalAmount,
      buyerName,
      buyerEmail,
      recipientName,
      recipientEmail,
      message: cardMessage || undefined,
      theme: cardTheme,
      createdAt: Date.now(),
      transactions: [
        {
          id: `tx-${Date.now()}`,
          type: 'purchase',
          amount: finalAmount,
          timestamp: Date.now(),
          notes: 'Purchase transaction approved via digital card portal'
        }
      ]
    };

    const updated = [newCard, ...giftCards];
    saveCards(updated);
    setGeneratedCode(newCode);
    setPurchaseSuccess(true);
    showToastMsg(`Gift Card ${newCode} was successfully created!`);
  };

  const resetPurchaseForm = () => {
    setPurchaseSuccess(false);
    setGeneratedCode('');
    setBuyerName('');
    setBuyerEmail('');
    setRecipientName('');
    setRecipientEmail('');
    setCardMessage('');
    setCustomBuyAmount('');
    setBuyAmount(100);
  };

  // Reload Search
  const handleSearchReload = (e: React.FormEvent) => {
    e.preventDefault();
    const sanitized = searchReloadCode.trim().toUpperCase();
    if (!sanitized) return;

    const findCard = giftCards.find(c => c.code === sanitized);
    if (findCard) {
      setValidReloadCard(findCard);
      showToastMsg('Card authorized successfully.');
    } else {
      setValidReloadCard(null);
      showToastMsg('Invalid gift card code. Please ensure it aligns with the format (GLAM-XXXX-XXXX).', 'error');
    }
  };

  // Reload Submission
  const handleReloadCardAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validReloadCard) return;

    const finalReload = reloadAmount === 0 ? parseFloat(customReloadAmount) : reloadAmount;
    if (isNaN(finalReload) || finalReload < 10 || finalReload > 1000) {
      showToastMsg('Reload value must stand between $10 and $1,000.', 'error');
      return;
    }

    const updatedCards = giftCards.map(c => {
      if (c.code === validReloadCard.code) {
        const newBalance = parseFloat((c.balance + finalReload).toFixed(2));
        const newTransactions: GiftCardTransaction[] = [
          {
            id: `tx-reload-${Date.now()}`,
            type: 'reload',
            amount: finalReload,
            timestamp: Date.now(),
            notes: 'Online card reload replenishment'
          },
          ...c.transactions
        ];
        return {
          ...c,
          balance: newBalance,
          transactions: newTransactions
        };
      }
      return c;
    });

    saveCards(updatedCards);
    setReloadSuccess(true);
    
    // Update local card preview
    const refreshed = updatedCards.find(c => c.code === validReloadCard.code);
    if (refreshed) {
      setValidReloadCard(refreshed);
    }

    showToastMsg(`Reloaded $${finalReload.toFixed(2)} to ${validReloadCard.code}`);
  };

  const resetReloadForm = () => {
    setReloadSuccess(false);
    setSearchReloadCode('');
    setValidReloadCard(null);
    setCustomReloadAmount('');
    setReloadAmount(50);
  };

  // Balance Search
  const handleBalanceSearch = (e: React.FormEvent | string) => {
    const rawCode = typeof e === 'string' ? e : searchBalanceCode;
    if (typeof e !== 'string' && e.preventDefault) {
      e.preventDefault();
    }

    const sanitized = rawCode.trim().toUpperCase();
    if (!sanitized) return;

    const findCard = giftCards.find(c => c.code === sanitized);
    if (findCard) {
      setQueriedCard(findCard);
      if (typeof e !== 'string') {
        showToastMsg('Balance report retrieved.');
      }
    } else {
      setQueriedCard(null);
      showToastMsg('No records associated with this Gift Card code.', 'error');
    }
  };

  // Interactive Redemption Simulation (Mock billing integration)
  const handleSimulateRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queriedCard) return;

    const redeemVal = redemptionAmount === 0 ? parseFloat(customRedemptAmount) : redemptionAmount;
    if (isNaN(redeemVal) || redeemVal <= 0) {
      showToastMsg('Please enter a valid redemption amount.', 'error');
      return;
    }

    if (redeemVal > queriedCard.balance) {
      showToastMsg(`Insufficient balance. Current maximum is $${queriedCard.balance.toFixed(2)}.`, 'error');
      return;
    }

    const updatedPrice = parseFloat((queriedCard.balance - redeemVal).toFixed(2));
    const updatedCards = giftCards.map(c => {
      if (c.code === queriedCard.code) {
        const newTransactions: GiftCardTransaction[] = [
          {
            id: `tx-redeem-${Date.now()}`,
            type: 'redemption',
            amount: redeemVal,
            timestamp: Date.now(),
            notes: 'Service discount redemption (Interactive simulator)'
          },
          ...c.transactions
        ];
        return {
          ...c,
          balance: updatedPrice,
          transactions: newTransactions
        };
      }
      return c;
    });

    saveCards(updatedCards);
    const refreshed = updatedCards.find(c => c.code === queriedCard.code);
    if (refreshed) {
      setQueriedCard(refreshed);
    }
    showToastMsg(`Deducted $${redeemVal.toFixed(2)} towards lash/brows session!`);
    setCustomRedemptAmount('');
  };

  // Clipboard copy helper
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToastMsg('Copied card code to clipboard!');
  };

  return (
    <section 
      id="giftcards" 
      className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[#1A1008]/10 scroll-mt-24 text-left"
    >
      <div className="space-y-3 mb-12">
        <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#C9995A] font-semibold block">
          DIGITAL LUXURY SERVICES
        </span>
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4">
          <h2 className="font-display text-4xl font-light text-[#1A1008] tracking-tight">
            Glam E-Gift Legacy
          </h2>
          <p className="text-xs md:text-sm text-[#1A1008]/60 font-light max-w-md leading-relaxed">
            The perfect luxury gesture. Share custom-mapped lash designs, organic pampering wax sets, and brow restorations with friends or family.
          </p>
        </div>
        <div className="h-[0.5px] bg-[#C9995A]/30 w-32 mt-4"></div>
      </div>

      {/* Tabs Layout Button Rails */}
      <div className="flex border-b border-[#1A1008]/10 mb-10 overflow-x-auto space-x-2 md:space-x-8 text-xs font-sans">
        <button
          onClick={() => { setActiveTab('buy'); }}
          className={`pb-4 px-1 uppercase tracking-widest text-[10px] font-bold whitespace-nowrap transition-all duration-300 relative ${
            activeTab === 'buy' ? 'text-[#C9995A]' : 'text-[#1A1008]/40 hover:text-[#1A1008]/80'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Gift size={13} />
            <span>01. Buy Gift Card</span>
          </div>
          {activeTab === 'buy' && <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#C9995A]"></span>}
        </button>

        <button
          onClick={() => { setActiveTab('reload'); }}
          className={`pb-4 px-1 uppercase tracking-widest text-[10px] font-bold whitespace-nowrap transition-all duration-300 relative ${
            activeTab === 'reload' ? 'text-[#C9995A]' : 'text-[#1A1008]/40 hover:text-[#1A1008]/80'
          }`}
        >
          <div className="flex items-center space-x-2">
            <RotateCw size={13} />
            <span>02. Reload Card</span>
          </div>
          {activeTab === 'reload' && <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#C9995A]"></span>}
        </button>

        <button
          onClick={() => { setActiveTab('balance'); }}
          className={`pb-4 px-1 uppercase tracking-widest text-[10px] font-bold whitespace-nowrap transition-all duration-300 relative ${
            activeTab === 'balance' ? 'text-[#C9995A]' : 'text-[#1A1008]/40 hover:text-[#1A1008]/80'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Search size={13} />
            <span>03. Check Balance</span>
          </div>
          {activeTab === 'balance' && <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#C9995A]"></span>}
        </button>
      </div>

      {/* Main Feature Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT COLUMN: ACTIVE INTERACTIVE VIEWS (7 columns) */}
        <div className="lg:col-span-7 bg-white border border-[#1A1008]/10 p-8 md:p-10 shadow-sm relative overflow-hidden min-h-[460px]">
          
          {/* TAB 1: BUY PORTAL */}
          {activeTab === 'buy' && (
            <div className="space-y-8 animate-fade-in">
              {!purchaseSuccess ? (
                <form onSubmit={handlePurchase} className="space-y-6">
                  <div className="space-y-3">
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#1A1008]/75 font-bold">
                      Select Value Curation
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {[50, 100, 150, 200].map((amt) => {
                        const isSelected = buyAmount === amt;
                        return (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => { setBuyAmount(amt); setCustomBuyAmount(''); }}
                            className={`p-3 text-center border font-mono font-semibold transition-all duration-300 ${
                              isSelected 
                                ? 'bg-[#C9995A] text-white border-[#C9995A]' 
                                : 'bg-[#FAF9F5] text-[#1A1008] border-[#1A1008]/10 hover:border-[#C9995A]'
                            }`}
                            style={{ borderRadius: '0px' }}
                          >
                            ${amt}
                          </button>
                        );
                      })}
                      <button
                        type="button"
                        onClick={() => setBuyAmount(0)}
                        className={`p-3 text-center border text-[10px] uppercase font-bold transition-all duration-300 ${
                          buyAmount === 0 
                            ? 'bg-[#C9995A] text-white border-[#C9995A]' 
                            : 'bg-[#FAF9F5] text-[#1A1008] border-[#1A1008]/10 hover:border-[#C9995A]'
                        }`}
                        style={{ borderRadius: '0px' }}
                      >
                        Custom Value
                      </button>
                    </div>
                  </div>

                  {buyAmount === 0 && (
                    <div className="space-y-2 animate-fade-in">
                      <label className="block text-[10px] uppercase tracking-[0.18em] text-[#1A1008]/70 font-bold">
                        Enter Custom Value ($ USD)
                      </label>
                      <div className="relative">
                        <DollarSign size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9995A]" />
                        <input
                          type="number"
                          min="15"
                          max="1000"
                          placeholder="Between 15 and 1000"
                          value={customBuyAmount}
                          onChange={(e) => setCustomBuyAmount(e.target.value)}
                          className="w-full bg-[#FAF9F5] border border-[#1A1008]/15 p-3.5 pl-9 text-xs font-light text-[#1A1008] focus:outline-none focus:border-[#C9995A]"
                          style={{ borderRadius: '0px' }}
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Profile parameters */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase tracking-[0.18em] text-[#1A1008]/70 font-bold">
                        Buyer Name
                      </label>
                      <div className="relative">
                        <User size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9995A]/85" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Damon Salvatore"
                          value={buyerName}
                          onChange={(e) => setBuyerName(e.target.value)}
                          className="w-full bg-[#FAF9F5] border border-[#1A1008]/15 p-3.5 pl-9 text-xs font-light text-[#1A1008] focus:outline-none focus:border-[#C9995A]"
                          style={{ borderRadius: '0px' }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase tracking-[0.18em] text-[#1A1008]/70 font-bold">
                        Buyer Email
                      </label>
                      <div className="relative">
                        <Mail size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9995A]/85" />
                        <input
                          type="email"
                          required
                          placeholder="damon@mysticfalls.org"
                          value={buyerEmail}
                          onChange={(e) => setBuyerEmail(e.target.value)}
                          className="w-full bg-[#FAF9F5] border border-[#1A1008]/15 p-3.5 pl-9 text-xs font-light text-[#1A1008] focus:outline-none focus:border-[#C9995A]"
                          style={{ borderRadius: '0px' }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase tracking-[0.18em] text-[#1A1008]/70 font-bold">
                        Recipient Name
                      </label>
                      <div className="relative">
                        <User size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9995A]/85" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Elena Gilbert"
                          value={recipientName}
                          onChange={(e) => setRecipientName(e.target.value)}
                          className="w-full bg-[#FAF9F5] border border-[#1A1008]/15 p-3.5 pl-9 text-xs font-light text-[#1A1008] focus:outline-none focus:border-[#C9995A]"
                          style={{ borderRadius: '0px' }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase tracking-[0.18em] text-[#1A1008]/70 font-bold">
                        Recipient Email
                      </label>
                      <div className="relative">
                        <Mail size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9995A]/85" />
                        <input
                          type="email"
                          required
                          placeholder="elena@mysticfalls.org"
                          value={recipientEmail}
                          onChange={(e) => setRecipientEmail(e.target.value)}
                          className="w-full bg-[#FAF9F5] border border-[#1A1008]/15 p-3.5 pl-9 text-xs font-light text-[#1A1008] focus:outline-none focus:border-[#C9995A]"
                          style={{ borderRadius: '0px' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Messaging */}
                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-[0.18em] text-[#1A1008]/70 font-bold">
                      Personalized Digital Greeting Message (Optional)
                    </label>
                    <div className="relative">
                      <MessageSquare size={13} className="absolute left-4 top-4 text-[#C9995A]/85" />
                      <textarea
                        rows={2}
                        placeholder="Happy special day! Relax and treat yourself to Glam lashes..."
                        value={cardMessage}
                        onChange={(e) => setCardMessage(e.target.value)}
                        className="w-full bg-[#FAF9F5] border border-[#1A1008]/15 p-3.5 pl-9 text-xs font-light text-[#1A1008] focus:outline-none focus:border-[#C9995A]"
                        style={{ borderRadius: '0px' }}
                      />
                    </div>
                  </div>

                  {/* Aesthetic Theme */}
                  <div className="space-y-3">
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#1A1008]/75 font-bold">
                      Select Aesthetic Canvas Art
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'radiant', label: 'Radiant Gold' },
                        { id: 'classic', label: 'Classic Marble' },
                        { id: 'midnight', label: 'Midnight Velvet' }
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setCardTheme(t.id as any)}
                          className={`p-2 py-3 text-center border text-[9px] uppercase tracking-widest font-bold transition-all ${
                            cardTheme === t.id 
                              ? 'border-[#C9995A] text-[#C9995A] bg-[#C9995A]/5' 
                              : 'border-[#1A1008]/10 text-[#1A1008]/50 hover:border-[#1A1008]/30'
                          }`}
                          style={{ borderRadius: '0px' }}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Purchase CTA */}
                  <button
                    type="submit"
                    className="w-full bg-[#C9995A] hover:bg-[#1A1008] text-white hover:text-[#C9995A] border border-transparent hover:border-[#C9995A] font-sans font-bold text-xs tracking-[0.2em] uppercase py-4.5 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer mt-4"
                    style={{ borderRadius: '0px' }}
                  >
                    <CreditCard size={13} />
                    <span>Authorize &amp; Issue E-Gift Card</span>
                  </button>
                </form>
              ) : (
                <div className="text-center py-12 space-y-6 animate-fade-in">
                  <div className="w-14 h-14 bg-[#C9995A]/10 border border-[#C9995A] rounded-full flex items-center justify-center mx-auto text-[#C9995A]">
                    <Check size={24} />
                  </div>
                  <div className="space-y-2">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#C9995A]">TRANSACTION APPROVED</span>
                    <h3 className="font-display text-2xl font-light text-[#1A1008]">Your Legacy Card is Issued</h3>
                    <p className="text-xs text-[#1A1008]/70 max-w-sm mx-auto leading-relaxed">
                      Lovely! A beautiful digital copy has been dispatched to <strong className="text-[#1A1008]">{recipientEmail}</strong> on behalf of <strong className="text-[#1A1008]">{buyerName}</strong>.
                    </p>
                  </div>

                  {/* Generated code render */}
                  <div className="max-w-md mx-auto bg-[#FAF9F5] border border-[#1A1008]/10 p-5 space-y-3 font-sans">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-[#1A1008]/40">DISPATCHED SECURED PROTOCOLS CODE</p>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="font-mono text-lg font-bold tracking-wider text-[#1A1008] select-all bg-[#1A1008]/5 px-3 py-1.5">
                        {generatedCode}
                      </span>
                      <button
                        onClick={() => copyToClipboard(generatedCode)}
                        className="p-2 border border-[#1A1008]/15 hover:border-[#C9995A] hover:bg-white text-[#C9995A] transition-all cursor-pointer"
                        title="Copy Code"
                      >
                        <Copy size={13} />
                      </button>
                    </div>
                    <p className="text-[9px] text-[#C9995A] font-bold">
                      Loaded Balance: ${ (buyAmount === 0 ? parseFloat(customBuyAmount) : buyAmount).toFixed(2) } USD
                    </p>
                  </div>

                  <div className="pt-4">
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <button
                        onClick={() => {
                          setSearchBalanceCode(generatedCode);
                          setActiveTab('balance');
                          handleBalanceSearch(generatedCode);
                        }}
                        className="bg-[#1A1008] text-[#C9995A] hover:bg-black hover:text-[#C9995A] text-[10px] font-bold uppercase tracking-[0.18em] py-3.5 px-6 transition-colors flex items-center justify-center space-x-2"
                        style={{ borderRadius: '0px' }}
                      >
                        <span>Check Balance / Verify Receipt</span>
                        <ArrowRight size={11} />
                      </button>
                      <button
                        onClick={resetPurchaseForm}
                        className="border border-[#1A1008]/15 hover:border-[#C9995A] text-[#1A1008]/60 hover:text-[#1A1008] hover:bg-[#FAF9F5] text-[10px] font-bold uppercase tracking-[0.18em] py-3.5 px-6 transition-colors"
                        style={{ borderRadius: '0px' }}
                      >
                        Buy Another Card
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: RELOAD PORTAL */}
          {activeTab === 'reload' && (
            <div className="space-y-8 animate-fade-in">
              {!validReloadCard ? (
                <form onSubmit={handleSearchReload} className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="font-display text-2xl font-light text-[#1A1008]">Top Up E-Card Balance</h3>
                    <p className="text-xs text-[#1A1008]/65 max-w-md leading-relaxed">
                      Enter the gift card credential code (GLAM-XXXX-XXXX) to authorize the card and instantly add more funds.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-[0.18em] text-[#1A1008]/70 font-bold">
                      Secure Gift Card Code
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        required
                        placeholder="e.g. GLAM-8888-2026"
                        value={searchReloadCode}
                        onChange={(e) => setSearchReloadCode(e.target.value)}
                        className="flex-1 bg-[#FAF9F5] border border-[#1A1008]/15 p-3.5 px-4 text-xs font-mono font-semibold text-[#1A1008] uppercase placeholder-[#1A1008]/30 focus:outline-none focus:border-[#C9995A]"
                        style={{ borderRadius: '0px' }}
                      />
                      <button
                        type="submit"
                        className="bg-[#C9995A] hover:bg-[#1A1008] text-white hover:text-[#C9995A] px-6 font-sans font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                        style={{ borderRadius: '0px' }}
                      >
                        Authorize
                      </button>
                    </div>
                  </div>

                  {/* Quick test box helper */}
                  <div className="bg-[#FAF9F5] p-4 border border-[#1A1008]/15 space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#C9995A] flex items-center space-x-1">
                      <HelpCircle size={10} />
                      <span>Instant Developer Testing:</span>
                    </p>
                    <p className="text-[10px] text-[#1A1008]/60 leading-relaxed">
                      You can instantly check with the default preloaded code <strong className="text-black bg-[#1A1008]/5 px-1 font-mono">GLAM-8888-2026</strong> (Elena Gilbert) or <strong className="text-black bg-[#1A1008]/5 px-1 font-mono">GLAM-1234-5678</strong> (Caroline Forbes). Just click a model code below to auto-fill:
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {giftCards.map(c => (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => setSearchReloadCode(c.code)}
                          className="text-[9.5px] font-mono bg-white hover:bg-[#C9995A]/5 border border-[#1A1008]/10 text-[#C9995A] px-2 py-1 font-bold"
                        >
                          {c.code} (${c.balance.toFixed(2)})
                        </button>
                      ))}
                    </div>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  {/* Authorized State card summary */}
                  <div className="border border-[#C9995A]/30 bg-[#C9995A]/5 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                      <span className="text-[8px] tracking-[0.2em] font-mono text-[#C9995A] uppercase block">CARD AUTHORIZED</span>
                      <h4 className="text-sm font-semibold text-[#1A1008] font-mono">{validReloadCard.code}</h4>
                      <p className="text-[10px] text-[#1A1008]/60">
                        Recipient: <strong className="text-[#1A1008]/90">{validReloadCard.recipientName}</strong> &bull; Current Balance: <strong className="text-[#C9995A] font-bold font-mono">${validReloadCard.balance.toFixed(2)}</strong>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setValidReloadCard(null)}
                      className="text-[9.5px] uppercase font-mono tracking-widest text-[#1A1008]/40 hover:text-red-600 underline"
                    >
                      Change Card
                    </button>
                  </div>

                  {!reloadSuccess ? (
                    <form onSubmit={handleReloadCardAction} className="space-y-6">
                      <div className="space-y-3">
                        <label className="block text-[10px] uppercase tracking-[0.2em] text-[#1A1008]/75 font-bold">
                          Select Replenish Amount ($ USD)
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                          {[25, 50, 75, 100].map((amt) => (
                            <button
                              key={amt}
                              type="button"
                              onClick={() => { setReloadAmount(amt); setCustomReloadAmount(''); }}
                              className={`p-3 text-center border font-mono font-semibold transition-all duration-300 ${
                                reloadAmount === amt 
                                  ? 'bg-[#C9995A] text-white border-[#C9995A]' 
                                  : 'bg-[#FAF9F5] text-[#1A1008] border-[#1A1008]/10 hover:border-[#C9995A]'
                              }`}
                              style={{ borderRadius: '0px' }}
                            >
                              ${amt}
                            </button>
                          ))}
                          <button
                            type="button"
                            onClick={() => setReloadAmount(0)}
                            className={`p-3 text-center border text-[10px] uppercase font-bold transition-all duration-300 ${
                              reloadAmount === 0 
                                ? 'bg-[#C9995A] text-white border-[#C9995A]' 
                                : 'bg-[#FAF9F5] text-[#1A1008] border-[#1A1008]/10 hover:border-[#C9995A]'
                            }`}
                            style={{ borderRadius: '0px' }}
                          >
                            Custom
                          </button>
                        </div>
                      </div>

                      {reloadAmount === 0 && (
                        <div className="space-y-2 animate-fade-in">
                          <label className="block text-[10px] uppercase tracking-[0.18em] text-[#1A1008]/70 font-bold">
                            Enter Reload Value ($ USD)
                          </label>
                          <div className="relative">
                            <DollarSign size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9995A]" />
                            <input
                              type="number"
                              min="10"
                              max="1000"
                              placeholder="Between 10 and 1000"
                              value={customReloadAmount}
                              onChange={(e) => setCustomReloadAmount(e.target.value)}
                              className="w-full bg-[#FAF9F5] border border-[#1A1008]/15 p-3.5 pl-9 text-xs font-light text-[#1A1008] focus:outline-none focus:border-[#C9995A]"
                              style={{ borderRadius: '0px' }}
                              required
                            />
                          </div>
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full bg-[#C9995A] hover:bg-[#1A1008] text-white hover:text-[#C9995A] border border-transparent hover:border-[#C9995A] font-sans font-bold text-xs tracking-[0.2em] uppercase py-4.5 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                        style={{ borderRadius: '0px' }}
                      >
                        <Check size={13} />
                        <span>Authorize Payment &amp; Load Funds</span>
                      </button>
                    </form>
                  ) : (
                    <div className="text-center py-8 space-y-4 animate-fade-in">
                      <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full border border-green-200 flex items-center justify-center mx-auto">
                        <Check size={20} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-lg font-display text-[#1A1008]">Top-Up Registered Completed</h4>
                        <p className="text-xs text-[#1A1008]/65 max-w-sm mx-auto">
                          Excellent! Funds are authorized and now ready for use.
                        </p>
                      </div>
                      <div className="p-4 bg-[#FAF9F5] max-w-xs mx-auto border border-[#1A1008]/10 text-xs text-left space-y-1 font-mono">
                        <p className="text-[9px] uppercase tracking-wider font-sans text-[#1A1008]/40 font-bold">LATEST BALANCE RECEIPT</p>
                        <p className="text-[#1A1008]/70">Card code: {validReloadCard.code}</p>
                        <p className="text-[#1A1008]/70">Reload value: +${ (reloadAmount === 0 ? parseFloat(customReloadAmount) : reloadAmount).toFixed(2) }</p>
                        <p className="text-[#1A1008] font-bold">New Balance: ${validReloadCard.balance.toFixed(2)}</p>
                      </div>

                      <div className="pt-4 flex justify-center gap-3">
                        <button
                          onClick={() => {
                            setSearchBalanceCode(validReloadCard.code);
                            setActiveTab('balance');
                            handleBalanceSearch(validReloadCard.code);
                          }}
                          className="bg-[#1A1008] hover:bg-black text-[#C9995A] text-[10px] font-sans font-bold uppercase tracking-wider py-3 px-5 transition-colors"
                          style={{ borderRadius: '0px' }}
                        >
                          Check Ledger History
                        </button>
                        <button
                          onClick={resetReloadForm}
                          className="border border-[#1A1008]/10 hover:border-[#C9995A] text-[#1A1008]/60 py-3 px-5 text-[10px] uppercase font-bold"
                          style={{ borderRadius: '0px' }}
                        >
                          Reload another Card
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CHECK BALANCE & REDEEM SIMULATOR */}
          {activeTab === 'balance' && (
            <div className="space-y-8 animate-fade-in">
              <form onSubmit={handleBalanceSearch} className="space-y-4">
                <div className="space-y-3">
                  <h3 className="font-display text-2xl font-light text-[#1A1008]">Inquire Ledger Settings</h3>
                  <p className="text-xs text-[#1A1008]/65 max-w-md leading-relaxed">
                    Check your digital balance and view historical purchases, reloads, or treatment discounts.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-[0.18em] text-[#1A1008]/70 font-bold">
                    Secure E-Card Code (GLAM-XXXX-XXXX)
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      required
                      placeholder="e.g. GLAM-8888-2026"
                      value={searchBalanceCode}
                      onChange={(e) => setSearchBalanceCode(e.target.value)}
                      className="flex-1 bg-[#FAF9F5] border border-[#1A1008]/15 p-3.5 px-4 text-xs font-mono font-semibold text-[#1A1008] uppercase placeholder-[#1A1008]/30 focus:outline-none focus:border-[#C9995A]"
                      style={{ borderRadius: '0px' }}
                    />
                    <button
                      type="submit"
                      className="bg-[#C9995A] hover:bg-[#1A1008] text-white hover:text-[#C9995A] px-6 font-sans font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                      style={{ borderRadius: '0px' }}
                    >
                      Retrieve Report
                    </button>
                  </div>
                </div>

                {/* Instant select demo code container */}
                <div className="p-3 bg-[#FAF9F5] border border-[#1A1008]/10 text-[10px] space-y-1 text-left">
                  <p className="font-bold text-[#C9995A] text-[9.5px] uppercase tracking-wider">Select Card to Check:</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {giftCards.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => {
                          setSearchBalanceCode(c.code);
                          handleBalanceSearch(c.code);
                        }}
                        className={`px-2 py-1 border text-[9.5px] font-mono font-bold transition-all ${
                          searchBalanceCode === c.code 
                            ? 'bg-[#C9995A] text-white border-[#C9995A]' 
                            : 'bg-white text-[#1A1008]/70 border-[#1A1008]/10 hover:border-[#C9995A]'
                        }`}
                      >
                        {c.code} ({c.recipientName})
                      </button>
                    ))}
                  </div>
                </div>
              </form>

              {queriedCard && (
                <div className="space-y-6 pt-4 border-t border-[#1A1008]/10 animate-fade-in text-left">
                  
                  {/* Detailed receipt breakdown */}
                  <div className="bg-[#FAF9F5] border border-[#1A1008]/15 p-6 space-y-4">
                    <div className="flex justify-between items-start border-b border-[#1A1008]/10 pb-3">
                      <div>
                        <span className="text-[8px] uppercase tracking-widest font-mono text-[#C9995A] font-bold block">Glam Esthetix E-Gift Ticket</span>
                        <h4 className="text-base font-bold font-mono text-[#1A1008]">{queriedCard.code}</h4>
                        <p className="text-[10px] text-[#1A1008]/60 mt-0.5">
                          Issued on {new Date(queriedCard.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] uppercase tracking-widest font-sans text-[#1A1008]/50 block">AVAILABLE BALANCE</span>
                        <span className="text-2xl font-bold font-mono text-[#C9995A]">
                          ${queriedCard.balance.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-[#1A1008]/75">
                      <div className="space-y-1">
                        <p><strong className="text-[#1A1008]">From (Buyer):</strong> {queriedCard.buyerName} ({queriedCard.buyerEmail})</p>
                        <p><strong className="text-[#1A1008]">To (Recipient):</strong> {queriedCard.recipientName} ({queriedCard.recipientEmail})</p>
                      </div>
                      <div className="space-y-1">
                        <p><strong className="text-[#1A1008]">Original Value:</strong> ${queriedCard.initialAmount.toFixed(2)} USD</p>
                        <p><strong className="text-[#1A1008]">Canvas Art style:</strong> <span className="uppercase text-[9px] font-bold font-mono tracking-widest bg-[#C9995A]/10 text-[#C9995A] px-1.5 py-0.5">{queriedCard.theme}</span></p>
                      </div>
                    </div>

                    {queriedCard.message && (
                      <div className="bg-white p-3 border border-dashed border-[#1A1008]/10 text-xs italic text-[#1A1008]/80 leading-relaxed font-sans">
                        &ldquo;{queriedCard.message}&rdquo;
                      </div>
                    )}
                  </div>

                  {/* SIMULATE SERVICE REDEMPTION PLAYGROUND */}
                  <div className="border border-dashed border-[#C9995A]/40 bg-[#C9995A]/5 p-5 space-y-4">
                    <div className="space-y-1">
                      <span className="inline-flex items-center space-x-1.5 bg-[#C9995A] text-white text-[8.5px] uppercase font-bold tracking-widest px-2 py-0.5">
                        <Sparkles size={8} className="fill-white" />
                        <span>Interactive Simulator Playground</span>
                      </span>
                      <h4 className="text-sm font-semibold text-[#1A1008]">Simulate Salon Checkout Redemption</h4>
                      <p className="text-[10px] text-[#1A1008]/65 leading-relaxed">
                        Test how this gift card deducts balance when paying for a treatment. Select a standard service pricing discount or custom deductible to modify the balance.
                      </p>
                    </div>

                    {queriedCard.balance > 0 ? (
                      <form onSubmit={handleSimulateRedeem} className="space-y-3">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          {[30, 50, 75, 120].map((val) => {
                            const disabled = val > queriedCard.balance;
                            return (
                              <button
                                key={val}
                                type="button"
                                disabled={disabled}
                                onClick={() => { setRedemptionAmount(val); setCustomRedemptAmount(''); }}
                                className={`p-2 py-2.5 text-center text-xs font-mono font-semibold border transition-all ${
                                  disabled 
                                    ? 'bg-[#1A1008]/5 text-[#1A1008]/20 border-[#1A1008]/5 cursor-not-allowed' 
                                    : redemptionAmount === val 
                                      ? 'bg-[#1A1008] text-[#C9995A] border-[#1A1008]' 
                                      : 'bg-white text-[#1A1008]/80 border-[#1A1008]/15 hover:border-[#1A1008]'
                                }`}
                              >
                                {val === 30 ? '$30 (Brows)' : val === 50 ? '$50 (Waxing)' : val === 75 ? '$75 (Holds)' : '$120 (Full Lash)'}
                              </button>
                            );
                          })}
                          <button
                            type="button"
                            onClick={() => setRedemptionAmount(0)}
                            className={`p-2 py-2.5 text-center text-[10px] uppercase font-bold border transition-all ${
                              redemptionAmount === 0 
                                ? 'bg-[#1A1008] text-[#C9995A] border-[#1A1008]' 
                                : 'bg-white text-[#1A1008]/80 border-[#1A1008]/15 hover:border-[#1A1008]'
                            }`}
                          >
                            Custom deduction
                          </button>
                        </div>

                        {redemptionAmount === 0 && (
                          <div className="flex gap-2.5 items-center animate-fade-in pt-1">
                            <span className="text-[10.5px] font-bold text-[#1A1008]/75">Deduction:</span>
                            <div className="relative flex-1">
                              <DollarSign size={13} className="absolute left-3 top-1/2 -to-translate-y-1/2 text-[#C9995A]" />
                              <input
                                type="number"
                                min="0.01"
                                max={queriedCard.balance}
                                step="0.01"
                                placeholder={`Max $${queriedCard.balance.toFixed(2)}`}
                                value={customRedemptAmount}
                                onChange={(e) => setCustomRedemptAmount(e.target.value)}
                                className="w-full bg-white border border-[#1A1008]/15 p-2 px-3 pl-8 text-xs font-mono text-[#1A1008] focus:outline-none focus:border-[#C9995A]"
                              />
                            </div>
                          </div>
                        )}

                        <button
                          type="submit"
                          className="w-full bg-[#C9995A] hover:bg-[#1A1008] text-white hover:text-[#C9995A] border border-transparent hover:border-[#C9995A] font-sans font-bold text-xs uppercase tracking-widest py-3 transition-all duration-300 cursor-pointer"
                        >
                          Deduct Card Balance
                        </button>
                      </form>
                    ) : (
                      <p className="text-xs text-red-600 font-semibold italic">
                        This card holds a fully depleted balance ($0.00). Please reload it to perform further simulations.
                      </p>
                    )}
                  </div>

                  {/* LEDGER TRANSACTION LOG HISTORY */}
                  <div className="space-y-3">
                    <p className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#1A1008]/60">
                      Statement Audit Ledger ({queriedCard.transactions.length})
                    </p>
                    
                    <div className="space-y-2 max-h-[220px] overflow-y-auto border border-[#1A1008]/10 bg-[#FAF9F5] p-3.5 divide-y divide-[#1A1008]/10 font-mono text-[10px]">
                      {queriedCard.transactions.map((tx) => (
                        <div key={tx.id} className="pt-2 hover:bg-white/40 first:pt-0 pb-2">
                          <div className="flex justify-between items-baseline">
                            <span className={`uppercase font-bold tracking-wider ${
                              tx.type === 'purchase' ? 'text-green-600' : tx.type === 'reload' ? 'text-blue-600' : 'text-red-600'
                            }`}>
                              [{tx.type}] &bull; {tx.id}
                            </span>
                            <span className="font-bold">
                              {tx.type === 'redemption' ? '-' : '+'}${tx.amount.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between items-baseline text-gray-500 font-sans text-[9px] mt-0.5">
                            <span>{tx.notes}</span>
                            <span>{new Date(tx.timestamp).toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: GORGEOUS LUXURY CARD PREVIEW (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="sticky top-28 space-y-6">
            
            <p className="text-[10px] font-sans uppercase font-bold tracking-widest text-[#1A1008]/50">
              Interactive E-Card Art Preview
            </p>

            {/* Premium Visual Gift Card with Dynamic Themes */}
            <div 
              className={`w-full aspect-[1.6/1] border shadow-xl p-6 flex flex-col justify-between relative overflow-hidden group select-none transition-all duration-700 ${
                cardTheme === 'radiant' 
                  ? 'bg-gradient-to-tr from-[#9B7C46] via-[#C9995A] to-[#E3CBB3] border-[#1A1008]/20 text-[#1A1008]' 
                  : cardTheme === 'midnight' 
                    ? 'bg-gradient-to-tr from-[#0F0804] via-[#1F1710] to-[#2E2015] border-[#C9995A]/30 text-[#C9995A]' 
                    : 'bg-[#FAF9F5] border-[#1A1008]/15 text-[#1A1008]'
              }`}
              style={{ borderRadius: '0px' }}
            >
              
              {/* Luxury gold design lines */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(201,153,90,0.1),transparent_60%)] pointer-events-none"></div>
              
              {/* Corner Watermarks */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10 border-t border-r border-[#1A1008] pointer-events-none transform translate-x-12 -translate-y-12 rotate-45"></div>

              {/* Top Row: Brand & Sparkles header */}
              <div className="flex justify-between items-start z-10">
                <div className="space-y-0.5">
                  <p className="font-display tracking-[0.25em] text-[15px] font-semibold leading-none">
                    GLAM ESTHETIX
                  </p>
                  <p className="font-mono text-[6.5px] uppercase tracking-widest opacity-60">
                    p a c i f i c a . c a l i f o r n i a
                  </p>
                </div>
                <div className="flex items-center space-x-1.5 bh-gold text-xs font-semibold uppercase tracking-widest">
                  <Sparkles size={11} className="animate-spin duration-3000" />
                  <span className="font-mono text-[7px] tracking-widest">LEGACY CERTIFIED</span>
                </div>
              </div>

              {/* Middle Row: Message preview / card placeholder */}
              <div className="space-y-1.5 z-10 text-left">
                {recipientName ? (
                  <div className="space-y-0.5">
                    <p className="font-mono text-[7.5px] uppercase tracking-widest opacity-70">EXCLUSIVE TO</p>
                    <p className="font-display text-lg font-light tracking-wide truncate">
                      {recipientName}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="w-24 h-2 bg-current/25 opacity-40"></div>
                    <div className="w-48 h-3 bg-current/25 opacity-20"></div>
                  </div>
                )}
                
                {cardMessage ? (
                  <p className="text-[8.5px] italic line-clamp-2 opacity-80 leading-relaxed font-sans font-light max-w-sm">
                    &ldquo;{cardMessage}&rdquo;
                  </p>
                ) : (
                  <p className="text-[7.5px] tracking-widest uppercase opacity-40 font-mono">
                    // EXPERT CURL MAPPING &bull; HYDRO-DERM BRUSH
                  </p>
                )}
              </div>

              {/* Bottom Row: Code & Price value */}
              <div className="flex justify-between items-end border-t border-current/15 pt-3 z-10">
                <div className="space-y-0.5 text-left">
                  <p className="font-mono text-[7px] tracking-widest opacity-65">ESTHETICIAN ACCOUNT NUMBER</p>
                  <p className="font-mono text-[11px] font-bold tracking-wider">
                    {generatedCode || (validReloadCard ? validReloadCard.code : 'GLAM-XXXX-XXXX')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[6.5px] tracking-widest opacity-60 uppercase">loaded value</p>
                  <p className="font-mono text-xl font-bold leading-none">
                    ${ (activeTab === 'buy' 
                      ? (buyAmount === 0 ? parseFloat(customBuyAmount) || 0 : buyAmount) 
                      : (activeTab === 'reload' && validReloadCard ? validReloadCard.balance : queriedCard ? queriedCard.balance : 150)
                    ).toFixed(2) }
                  </p>
                </div>
              </div>

            </div>

            {/* Quick Card info board */}
            <div className="p-5 border border-[#1A1008]/10 bg-[#FAF9F5] text-xs space-y-3 font-sans">
              <span className="font-bold text-[#C9995A] uppercase tracking-widest text-[9.5px] block border-b border-[#1A1008]/10 pb-1.5">
                Glam Digital Terms:
              </span>
              <ul className="space-y-2 text-[#1A1008]/75 leading-relaxed font-light">
                <li className="flex items-start space-x-2">
                  <span className="text-[#C9995A] font-bold">&bull;</span>
                  <span>E-Gift cards carry zero service fees and never expire.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#C9995A] font-bold">&bull;</span>
                  <span>Directly applicable across lashes curls, brow designs, or organic wax curations.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#C9995A] font-bold">&bull;</span>
                  <span>Easily check card balances or top-up card funds at top of page navigation.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>

      {/* Floating Toast Notification inside the component */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 p-4 shadow-2xl flex items-center space-x-3 border animate-fade-in-up transition-all ${
          toast.type === 'success' 
            ? 'bg-white border-[#C9995A] text-[#1A1008]' 
            : 'bg-red-50 border-red-300 text-red-950'
        }`}>
          <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 ${
            toast.type === 'success' ? 'border-[#C9995A]/35 text-[#C9995A]' : 'border-red-300 text-red-700'
          }`}>
            {toast.type === 'success' ? <Check size={14} /> : <HelpCircle size={14} />}
          </div>
          <div className="text-xs">
            <p className="font-bold uppercase tracking-wider text-[8px] text-[#C9995A]">SYSTEM GREETING</p>
            <p className="font-light">{toast.text}</p>
          </div>
        </div>
      )}

    </section>
  );
}
