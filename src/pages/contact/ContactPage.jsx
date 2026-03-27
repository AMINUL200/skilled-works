import React, { useEffect, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  User,
  Building,
  Globe,
  Shield,
  CheckCircle,
  ArrowRight,
  HelpCircle,
  Star,
  Award,
  Headphones,
  X,
  AlertCircle,
  Zap,
  ChevronRight,
} from "lucide-react";
import MagneticButton from "../../component/common/MagneticButtonProps";
import FAQComponent from "../../component/common/FAQComponent";
import PageLoader from "../../component/common/PageLoader";
import { api } from "../../utils/app";
import { useCountry } from "../../context/CountryContext";

/* ─────────────────────────────────────────
   INLINE STYLES / CSS-IN-JS (Fonts Removed)
───────────────────────────────────────── */
const styles = `
  :root {
    --navy: #1F2E9A;
    --navy-dark: #172280;
    --indigo: #2430A3;
    --purple: #9B3DFF;
    --cyan: #2EC5FF;
    --red: #E60023;
    --red-dark: #B8001B;
    --green: #00B894;
    --orange: #FFA726;
    --bg: #FAFAFF;
    --border: #E6E0FF;
    --border-subtle: #F2EEFF;
    --text-primary: #111827;
    --text-secondary: #374151;
    --text-muted: #6B7280;
  }

  .cp-root * { box-sizing: border-box; }

  .cp-root {
    min-height: 100vh;
    background: var(--bg);
    color: var(--text-primary);
  }

  /* ── Noise overlay ── */
  .cp-root::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.025'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
    opacity: 0.4;
  }

  /* ── Toast ── */
  .cp-toast {
    position: fixed;
    top: 1.5rem;
    right: 1.5rem;
    z-index: 9999;
    animation: toastSlide 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  @keyframes toastSlide {
    from { transform: translateX(110%) scale(0.95); opacity: 0; }
    to   { transform: translateX(0)    scale(1);    opacity: 1; }
  }
  .cp-toast-inner {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    border-radius: 1rem;
    min-width: 320px;
    max-width: 420px;
    backdrop-filter: blur(16px);
    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1) inset;
  }
  .cp-toast-success { background: linear-gradient(135deg, rgba(0,184,148,0.95), rgba(46,197,255,0.95)); }
  .cp-toast-error   { background: linear-gradient(135deg, rgba(230,0,35,0.95), rgba(255,167,38,0.95)); }

  /* ── Hero ── */
  .cp-hero {
    position: relative;
    padding: 7rem 0 4rem;
    overflow: hidden;
  }
  .cp-hero-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
  }
  .cp-hero-orb-1 {
    width: 500px; height: 500px;
    top: -200px; left: -100px;
    background: radial-gradient(circle, rgba(31,46,154,0.12) 0%, transparent 70%);
  }
  .cp-hero-orb-2 {
    width: 400px; height: 400px;
    bottom: -150px; right: -80px;
    background: radial-gradient(circle, rgba(155,61,255,0.1) 0%, transparent 70%);
  }
  .cp-hero-orb-3 {
    width: 300px; height: 300px;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle, rgba(46,197,255,0.06) 0%, transparent 70%);
  }

  .cp-hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.35rem 1rem;
    border-radius: 100px;
    background: rgba(155,61,255,0.08);
    border: 1px solid rgba(155,61,255,0.2);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--purple);
    margin-bottom: 1.5rem;
  }

  .cp-hero-title {
    font-size: clamp(2.5rem, 5vw, 4.5rem);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.03em;
    margin-bottom: 1.5rem;
  }
  .cp-hero-title-main { color: var(--navy); display: block; }
  .cp-hero-title-grad {
    display: block;
    background: linear-gradient(135deg, var(--purple), var(--cyan), var(--red));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .cp-hero-badges {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
    margin-top: 2rem;
  }
  .cp-badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1.25rem;
    border-radius: 100px;
    background: white;
    border: 1px solid var(--border);
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-secondary);
    box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 8px 24px rgba(31,46,154,0.06);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .cp-badge:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  /* ── Layout ── */
  .cp-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
    position: relative;
    z-index: 1;
  }
  .cp-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
    align-items: start;
  }
  @media (max-width: 1024px) {
    .cp-grid { grid-template-columns: 1fr; }
  }

  /* ── Section label ── */
  .cp-section-label {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.75rem;
  }
  .cp-section-label-icon {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--purple), var(--navy));
    box-shadow: 0 8px 20px rgba(155,61,255,0.3);
  }
  .cp-section-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--navy);
  }

  /* ── Contact cards ── */
  .cp-cards-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  @media (max-width: 640px) {
    .cp-cards-grid { grid-template-columns: 1fr; }
  }

  .cp-contact-card {
    display: block;
    background: white;
    border-radius: 1.25rem;
    border: 1px solid var(--border-subtle);
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(31,46,154,0.05), 0 0 0 0 rgba(155,61,255,0);
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, border-color 0.3s;
    text-decoration: none;
    color: inherit;
    position: relative;
    overflow: hidden;
  }
  .cp-contact-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(155,61,255,0.03), rgba(31,46,154,0.03));
    opacity: 0;
    transition: opacity 0.3s;
  }
  .cp-contact-card:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow: 0 20px 40px rgba(31,46,154,0.12), 0 0 0 1px rgba(155,61,255,0.15);
    border-color: rgba(155,61,255,0.2);
  }
  .cp-contact-card:hover::after { opacity: 1; }

  .cp-card-icon-wrap {
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 0.875rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    flex-shrink: 0;
  }
  .cp-card-title {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-muted);
    margin-bottom: 0.3rem;
  }
  .cp-card-content {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.2rem;
    line-height: 1.4;
  }
  .cp-card-sub {
    font-size: 0.75rem;
    color: var(--text-muted);
    margin-bottom: 0.5rem;
  }
  .cp-card-desc {
    font-size: 0.75rem;
    color: var(--text-muted);
    padding-top: 0.75rem;
    border-top: 1px solid var(--border-subtle);
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  /* ── Departments panel ── */
  .cp-dept-panel {
    background: linear-gradient(145deg, #1a2590, var(--navy), #1e2b8e);
    border-radius: 1.5rem;
    padding: 2rem;
    color: white;
    position: relative;
    overflow: hidden;
    margin-bottom: 2rem;
  }
  .cp-dept-panel::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 200px; height: 200px;
    background: radial-gradient(circle, rgba(155,61,255,0.25) 0%, transparent 70%);
    border-radius: 50%;
  }
  .cp-dept-panel::after {
    content: '';
    position: absolute;
    bottom: -40px; left: -40px;
    width: 180px; height: 180px;
    background: radial-gradient(circle, rgba(46,197,255,0.15) 0%, transparent 70%);
    border-radius: 50%;
  }
  .cp-dept-title {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    position: relative;
    z-index: 1;
  }
  .cp-dept-item {
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.1);
    backdrop-filter: blur(8px);
    border-radius: 1rem;
    padding: 1.1rem 1.25rem;
    margin-bottom: 0.75rem;
    position: relative;
    z-index: 1;
    transition: background 0.2s;
  }
  .cp-dept-item:hover { background: rgba(255,255,255,0.12); }
  .cp-dept-item:last-child { margin-bottom: 0; }
  .cp-dept-name {
    font-weight: 700;
    font-size: 0.9rem;
    margin-bottom: 0.2rem;
  }
  .cp-dept-desc {
    font-size: 0.75rem;
    opacity: 0.65;
    margin-bottom: 0.75rem;
  }
  .cp-dept-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  .cp-dept-link {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.75rem;
    color: rgba(255,255,255,0.85);
    text-decoration: none;
    transition: color 0.2s;
  }
  .cp-dept-link:hover { color: white; }

  /* ── Stats strip ── */
  .cp-stats-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-bottom: 0;
  }
  @media (max-width: 640px) {
    .cp-stats-row { grid-template-columns: repeat(2, 1fr); }
  }
  .cp-stat-card {
    background: white;
    border-radius: 1.125rem;
    padding: 1.25rem 1rem;
    text-align: center;
    border: 1px solid var(--border-subtle);
    box-shadow: 0 2px 8px rgba(31,46,154,0.04);
    position: relative;
    overflow: hidden;
  }
  .cp-stat-card::before {
    content: '';
    position: absolute;
    bottom: 0; left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 2px;
    border-radius: 1px;
  }
  .cp-stat-num {
    font-size: 1.75rem;
    font-weight: 800;
    line-height: 1;
    margin-bottom: 0.3rem;
  }
  .cp-stat-label { font-size: 0.7rem; color: var(--text-muted); font-weight: 500; }

  /* ── Form panel ── */
  .cp-form-panel {
    background: white;
    border-radius: 2rem;
    border: 1px solid var(--border-subtle);
    box-shadow:
      0 4px 6px -1px rgba(0,0,0,0.04),
      0 20px 60px -10px rgba(31,46,154,0.1),
      0 0 0 1px rgba(31,46,154,0.04);
    overflow: hidden;
    position: sticky;
    top: 6rem;
  }

  .cp-form-header {
    background: linear-gradient(145deg, #1a2590, var(--navy), #1e2b8e);
    padding: 2rem 2.25rem 1.75rem;
    position: relative;
    overflow: hidden;
  }
  .cp-form-header::before {
    content: '';
    position: absolute;
    top: -30px; right: -30px;
    width: 150px; height: 150px;
    background: radial-gradient(circle, rgba(155,61,255,0.3) 0%, transparent 70%);
    border-radius: 50%;
  }
  .cp-form-header::after {
    content: '';
    position: absolute;
    bottom: -20px; left: -20px;
    width: 120px; height: 120px;
    background: radial-gradient(circle, rgba(46,197,255,0.2) 0%, transparent 70%);
    border-radius: 50%;
  }
  .cp-form-header-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    position: relative;
    z-index: 1;
  }
  .cp-form-header-title {
    font-size: 1.4rem;
    font-weight: 700;
    color: white;
  }
  .cp-form-header-sub {
    font-size: 0.85rem;
    color: rgba(255,255,255,0.7);
    position: relative;
    z-index: 1;
  }
  .cp-form-icon-box {
    width: 2.25rem;
    height: 2.25rem;
    background: rgba(255,255,255,0.15);
    border-radius: 0.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255,255,255,0.2);
  }
  .cp-response-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 100px;
    padding: 0.3rem 0.75rem;
    font-size: 0.7rem;
    font-weight: 600;
    color: rgba(255,255,255,0.9);
    margin-top: 1rem;
    position: relative;
    z-index: 1;
  }
  .cp-response-dot {
    width: 6px; height: 6px;
    background: #4ade80;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(0.8); }
  }

  .cp-form-body { padding: 2rem 2.25rem; }

  /* ── Inputs ── */
  .cp-field { margin-bottom: 1.25rem; }
  .cp-field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1.25rem;
  }
  @media (max-width: 640px) {
    .cp-field-row { grid-template-columns: 1fr; }
  }
  .cp-label {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--navy);
    margin-bottom: 0.45rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .cp-label-req { color: var(--red); }

  .cp-input,
  .cp-select,
  .cp-textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 0.875rem;
    border: 1.5px solid var(--border);
    background: var(--bg);
    font-size: 0.875rem;
    color: var(--text-primary);
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
  }
  .cp-input::placeholder,
  .cp-textarea::placeholder { color: #b5b8c8; }
  .cp-input:focus,
  .cp-select:focus,
  .cp-textarea:focus {
    border-color: var(--purple);
    background: white;
    box-shadow: 0 0 0 3px rgba(155,61,255,0.1), 0 2px 8px rgba(155,61,255,0.08);
  }
  .cp-textarea { resize: none; }

  .cp-select-wrap { position: relative; }
  .cp-select-arrow {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: var(--text-muted);
  }

  /* ── Submit ── */
  .cp-submit-wrap { padding-top: 0.5rem; }
  .cp-submit-btn {
    width: 100%;
    padding: 0.9rem 2rem;
    border-radius: 0.875rem;
    background: linear-gradient(135deg, var(--red), var(--red-dark));
    color: white;
    font-size: 1rem;
    font-weight: 700;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s;
    box-shadow: 0 4px 16px rgba(230,0,35,0.35);
    letter-spacing: 0.02em;
  }
  .cp-submit-btn:hover:not(:disabled) {
    transform: translateY(-2px) scale(1.01);
    box-shadow: 0 12px 28px rgba(230,0,35,0.4);
  }
  .cp-submit-btn:active:not(:disabled) { transform: translateY(0) scale(0.99); }
  .cp-submit-btn:disabled {
    background: #d1d5db;
    cursor: not-allowed;
    box-shadow: none;
  }
  .cp-spinner {
    width: 1.1rem; height: 1.1rem;
    border: 2px solid rgba(255,255,255,0.4);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .cp-privacy {
    text-align: center;
    font-size: 0.75rem;
    color: var(--text-muted);
    margin-top: 1rem;
  }
  .cp-privacy a {
    color: var(--navy);
    font-weight: 600;
    text-decoration: none;
  }
  .cp-privacy a:hover { color: var(--purple); }

  /* ── FAQ section ── */
  .cp-faq-section {
    padding: 5rem 0;
    background: linear-gradient(180deg, white 0%, var(--bg) 100%);
    position: relative;
    z-index: 1;
  }
  .cp-faq-cta {
    background: linear-gradient(135deg, var(--bg), #F2EEFF);
    border-radius: 1.5rem;
    padding: 3rem;
    border: 1px solid var(--border);
    text-align: center;
    margin-top: 3rem;
  }
  .cp-faq-cta-title {
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--navy);
    margin-bottom: 0.75rem;
  }
  .cp-faq-cta-sub {
    color: var(--text-muted);
    font-size: 1rem;
    margin-bottom: 2rem;
    max-width: 450px;
    margin-left: auto;
    margin-right: auto;
  }
  .cp-cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.85rem 2rem;
    border-radius: 0.875rem;
    background: linear-gradient(135deg, var(--navy), var(--indigo));
    color: white;
    font-size: 0.95rem;
    font-weight: 700;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s;
    box-shadow: 0 4px 16px rgba(31,46,154,0.35);
  }
  .cp-cta-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(31,46,154,0.4);
  }

  /* ── Divider ornament ── */
  .cp-ornament {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 2.5rem 0;
  }
  .cp-ornament-line { flex: 1; height: 1px; background: var(--border-subtle); }
  .cp-ornament-dot {
    width: 6px; height: 6px;
    background: var(--purple);
    border-radius: 50%;
    opacity: 0.4;
  }

  /* ── Scroll fade in ── */
  .cp-fade-in {
    animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .cp-fade-in:nth-child(1) { animation-delay: 0s; }
  .cp-fade-in:nth-child(2) { animation-delay: 0.08s; }
  .cp-fade-in:nth-child(3) { animation-delay: 0.16s; }
  .cp-fade-in:nth-child(4) { animation-delay: 0.24s; }
`;

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
const ContactPage = () => {
  const { country } = useCountry();
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", company: "", subject: "", message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const [loading, setLoading] = useState(true);
  const [faqData, setFaqData] = useState([]);
  const contactData = country;

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await api.get("/website-settings");
        if (response.data.status && response.data.data) {
          const transformedFaqs = response.data.data.faq.map((faq) => ({
            id: faq.id,
            question: faq.faq_question,
            answer: faq.faq_answer,
            category: faq.faq_type,
          }));
          setFaqData(transformedFaqs);
        }
      } catch (error) {
        console.error("Error fetching contact data:", error);
      } finally {
        setTimeout(() => setLoading(false), 2000);
      }
    };
    fetchContactData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: "", message: "" }), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        full_name: formData.name,
        company_name: formData.company || "",
        email: formData.email,
        phone_number: formData.phone || "",
        subject: formData.subject,
        message: formData.message,
      };
      const response = await api.post("/contact", payload);
      if (response.data.status) {
        showToast("success", "Message sent! We'll contact you within 2 business hours.");
        setFormData({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
      } else {
        showToast("error", response.data.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        const msgs = Object.values(error.response.data.errors).flat().join(", ");
        showToast("error", msgs);
      } else {
        showToast("error", error.response?.data?.message || "Failed to send message. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getContactDetails = () => {
    if (!contactData) return [];
    const phoneNumber = contactData.phone || "+44 20 7123 4567";
    const email = contactData.email || "support@skilledworkerscloud.co.uk";
    const addressParts = [contactData.street_address, contactData.city, contactData.state, contactData.zip, contactData.country].filter(Boolean);
    const fullAddress = addressParts.join(", ") || "123 Business Street, London EC1A 1BB";
    const locationSubtitle = contactData.city || contactData.state || "Central London Office";
    return [
      { icon: <Phone size={18} />, title: "Call Support", content: phoneNumber, subtitle: "Mon–Fri, 9am–6pm GMT", color: "linear-gradient(135deg,#2EC5FF,#1F2E9A)", action: `tel:${phoneNumber.replace(/\s+/g,"")}`, description: "Speak with our HR experts" },
      { icon: <Mail size={18} />, title: "Email Support", content: email, subtitle: "Response within 2 hours", color: "linear-gradient(135deg,#9B3DFF,#E60023)", action: `mailto:${email}`, description: "Send queries & documents" },
      { icon: <MapPin size={18} />, title: "Our Office", content: fullAddress, subtitle: locationSubtitle, color: "linear-gradient(135deg,#00B894,#2430A3)", action: "https://maps.google.com", description: "Schedule an in-person visit" },
      { icon: <Clock size={18} />, title: "Landline", content: contactData.landline || "033-12345678", subtitle: "Alternative contact", color: "linear-gradient(135deg,#FF6B6B,#FFA726)", action: `tel:${contactData.landline?.replace(/\D/g,"") || "03312345678"}`, description: "For general inquiries" },
    ];
  };

  const getDepartments = () => {
    if (!contactData) return [];
    const email = contactData.email || "support@skilledworkerscloud.co.uk";
    const phone = contactData.phone || "+44 20 7123 4567";
    return [
      { name: "Sales & Demos", email, phone, description: "Product demonstrations and pricing" },
      { name: "Technical Support", email, phone, description: "Platform assistance and troubleshooting" },
      { name: "HR Consulting", email, phone, description: "HR strategy and implementation" },
    ];
  };

  const contactDetails = getContactDetails();
  const departments = getDepartments();

  const stats = [
    { num: "98%", label: "Client Satisfaction", color: "#E60023", barColor: "#E60023" },
    { num: "2h",  label: "Avg Response Time",   color: "#9B3DFF", barColor: "#9B3DFF" },
    { num: "24/7",label: "Support Available",    color: "#2EC5FF", barColor: "#2EC5FF" },
    { num: "500+",label: "UK Businesses",        color: "#00B894", barColor: "#00B894" },
  ];

  if (loading) return <PageLoader />;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="cp-root pt-30 md:pt-30">
        {/* ── Toast ── */}
        {toast.show && (
          <div className="cp-toast">
            <div className={`cp-toast-inner ${toast.type === "success" ? "cp-toast-success" : "cp-toast-error"}`}>
              <div style={{ flexShrink: 0, marginTop: 2 }}>
                {toast.type === "success"
                  ? <CheckCircle size={18} color="white" />
                  : <AlertCircle size={18} color="white" />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "white", marginBottom: "0.25rem" }}>
                  {toast.type === "success" ? "Message sent!" : "Something went wrong"}
                </div>
                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.9)" }}>{toast.message}</div>
              </div>
              <button onClick={() => setToast({ show: false, type: "", message: "" })}
                style={{ background: "none", border: "none", cursor: "pointer", color: "white", opacity: 0.7, flexShrink: 0 }}>
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ── Hero ── */}
        <section className="cp-hero">
          <div className="cp-hero-orb cp-hero-orb-1" />
          <div className="cp-hero-orb cp-hero-orb-2" />
          <div className="cp-hero-orb cp-hero-orb-3" />

          <div className="cp-container" style={{ textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.25rem" }}>
              <span className="cp-hero-eyebrow">
                <Zap size={12} />
                UK-Based HR Technology
              </span>
            </div>

            <h1 className="cp-hero-title">
              <span className="cp-hero-title-main">Contact Us Today</span>
              <span className="cp-hero-title-grad">With Your Query</span>
            </h1>

            <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", maxWidth: 520, margin: "0 auto" }}>
              Our expert team is ready to help you. Reach out through any channel and we'll respond within hours.
            </p>

            <div className="cp-hero-badges">
              {[
                { icon: <Award size={14} color="#9B3DFF" />, label: "UK-Based Support" },
                { icon: <Shield size={14} color="#2EC5FF" />, label: "GDPR Compliant" },
                { icon: <Star size={14} color="#E60023" />, label: "5-Star Rated" },
              ].map((b, i) => (
                <span key={i} className="cp-badge">
                  {b.icon}
                  {b.label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Main ── */}
        <section style={{ padding: "1rem 0 5rem", position: "relative", zIndex: 1 }}>
          <div className="cp-container">
            <div className="cp-grid">

              {/* ── LEFT COL ── */}
              <div>
                {/* Contact Cards */}
                <div className="cp-section-label">
                  <div className="cp-section-label-icon">
                    <Headphones size={16} color="white" />
                  </div>
                  <h2 className="cp-section-title">Quick Contact</h2>
                </div>

                <div className="cp-cards-grid">
                  {contactDetails.map((c, i) => (
                    <a key={i} href={c.action}
                      target={c.action?.startsWith("http") ? "_blank" : "_self"}
                      rel={c.action?.startsWith("http") ? "noopener noreferrer" : ""}
                      className="cp-contact-card cp-fade-in">
                      <div className="cp-card-icon-wrap" style={{ background: c.color, boxShadow: `0 8px 20px rgba(0,0,0,0.18)` }}>
                        <span style={{ color: "white" }}>{c.icon}</span>
                      </div>
                      <div className="cp-card-title">{c.title}</div>
                      <div className="cp-card-content">{c.content}</div>
                      <div className="cp-card-sub">{c.subtitle}</div>
                      <div className="cp-card-desc">
                        <ChevronRight size={12} style={{ flexShrink: 0 }} />
                        {c.description}
                      </div>
                    </a>
                  ))}
                </div>

                {/* Departments */}
                <div className="cp-dept-panel">
                  <div className="cp-dept-title">
                    <Building size={18} />
                    Department Contacts
                  </div>
                  {departments.map((d, i) => (
                    <div key={i} className="cp-dept-item">
                      <div className="cp-dept-name">{d.name}</div>
                      <div className="cp-dept-desc">{d.description}</div>
                      <div className="cp-dept-links">
                        <a href={`mailto:${d.email}`} className="cp-dept-link">
                          <Mail size={13} />{d.email}
                        </a>
                        <a href={`tel:${d.phone}`} className="cp-dept-link">
                          <Phone size={13} />{d.phone}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="cp-stats-row">
                  {stats.map((s, i) => (
                    <div key={i} className="cp-stat-card">
                      <style>{`.cp-stat-card:nth-child(${i+1})::before { background: ${s.barColor}; }`}</style>
                      <div className="cp-stat-num" style={{ color: s.color }}>{s.num}</div>
                      <div className="cp-stat-label">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── RIGHT COL — FORM ── */}
              <div>
                <div className="cp-form-panel">
                  {/* Header */}
                  <div className="cp-form-header">
                    <div className="cp-form-header-top">
                      <div className="cp-form-header-title">Send Your Query</div>
                      <div className="cp-form-icon-box">
                        <MessageSquare size={17} color="white" />
                      </div>
                    </div>
                    <div className="cp-form-header-sub">
                      Fill out the form and our team will get back to you shortly.
                    </div>
                    <div className="cp-response-pill">
                      <span className="cp-response-dot" />
                      Online · Avg response under 2 hours
                    </div>
                  </div>

                  {/* Form Body */}
                  <div className="cp-form-body">
                    <form onSubmit={handleSubmit}>
                      <div className="cp-field-row">
                        <div>
                          <label className="cp-label">
                            <User size={13} />Full Name <span className="cp-label-req">*</span>
                          </label>
                          <input className="cp-input" type="text" name="name"
                            value={formData.name} onChange={handleChange}
                            required placeholder="John Smith" />
                        </div>
                        <div>
                          <label className="cp-label">
                            <Building size={13} />Company
                          </label>
                          <input className="cp-input" type="text" name="company"
                            value={formData.company} onChange={handleChange}
                            placeholder="Your Company Ltd" />
                        </div>
                      </div>

                      <div className="cp-field-row">
                        <div>
                          <label className="cp-label">
                            <Mail size={13} />Email <span className="cp-label-req">*</span>
                          </label>
                          <input className="cp-input" type="email" name="email"
                            value={formData.email} onChange={handleChange}
                            required placeholder="john@company.co.uk" />
                        </div>
                        <div>
                          <label className="cp-label">
                            <Phone size={13} />Phone
                          </label>
                          <input className="cp-input" type="tel" name="phone"
                            value={formData.phone} onChange={handleChange}
                            placeholder="+44 20 7123 4567" />
                        </div>
                      </div>

                      <div className="cp-field">
                        <label className="cp-label">
                          <Globe size={13} />Subject <span className="cp-label-req">*</span>
                        </label>
                        <div className="cp-select-wrap">
                          <select className="cp-select" name="subject"
                            value={formData.subject} onChange={handleChange} required>
                            <option value="">Select a subject</option>
                            <option value="General Inquiry">General Inquiry</option>
                            <option value="Product Demo">Product Demo Request</option>
                            <option value="Technical Support">Technical Support</option>
                            <option value="Sales Inquiry">Sales Inquiry</option>
                            <option value="Partnership">Partnership Opportunity</option>
                            <option value="Other">Other</option>
                          </select>
                          <span className="cp-select-arrow"><ChevronRight size={16} style={{ transform: "rotate(90deg)" }} /></span>
                        </div>
                      </div>

                      <div className="cp-field">
                        <label className="cp-label">
                          <MessageSquare size={13} />Message <span className="cp-label-req">*</span>
                        </label>
                        <textarea className="cp-textarea" name="message" rows={5}
                          value={formData.message} onChange={handleChange} required
                          placeholder="Please provide details about your query or request…" />
                      </div>

                      <div className="cp-submit-wrap">
                        <button type="submit" className="cp-submit-btn" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <><span className="cp-spinner" /><span>Sending…</span></>
                          ) : (
                            <><span>Send Message</span><ArrowRight size={18} /></>
                          )}
                        </button>
                      </div>

                      <div className="cp-privacy">
                        By submitting, you agree to our{" "}
                        <a href="#">Privacy Policy</a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="cp-faq-section">
          <div className="cp-container">
            <div style={{ maxWidth: 820, margin: "0 auto" }}>
              <FAQComponent faqs={faqData} />

              <div className="cp-faq-cta">
                <h3 className="cp-faq-cta-title">Still Have Questions?</h3>
                <p className="cp-faq-cta-sub">
                  Can't find what you're looking for? Our support team is ready to help you right away.
                </p>
                <MagneticButton variant="square" className="cp-cta-btn">
                  <Headphones size={18} />
                  Contact Support
                </MagneticButton>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;