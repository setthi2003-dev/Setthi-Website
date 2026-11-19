#!/usr/bin/env python3
"""
Generates valid, professional 16:9 widescreen presentation PDFs for Setthi pitch decks.
No external dependencies required (pure standard Python).
"""
import sys
import os

def create_deck_pdf(output_path, deck_title, slides):
    width = 960
    height = 540
    
    # We will build a minimal valid PDF-1.4 file
    objects = []
    
    def add_object(content_bytes):
        obj_id = len(objects) + 1
        objects.append(content_bytes)
        return obj_id

    # Font definitions
    # Obj 1: Font Helvetica
    # Obj 2: Font Helvetica-Bold
    # Obj 3: Font Helvetica-Oblique
    
    font_f1 = b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>"
    font_f2 = b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>"
    font_f3 = b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>"
    
    obj_f1 = add_object(font_f1)
    obj_f2 = add_object(font_f2)
    obj_f3 = add_object(font_f3)
    
    # Prepare page content streams
    page_obj_ids = []
    
    for i, slide in enumerate(slides):
        slide_num = i + 1
        total_slides = len(slides)
        
        title = slide.get("title", "")
        subtitle = slide.get("subtitle", "")
        category = slide.get("category", "SETTHI PITCH DECK")
        bullets = slide.get("bullets", [])
        metrics = slide.get("metrics", [])
        highlight = slide.get("highlight", "")
        
        # Escape strings for PDF
        def esc(text):
            t = (text.replace("•", "-")
                     .replace("—", "-")
                     .replace("–", "-")
                     .replace("’", "'")
                     .replace("‘", "'")
                     .replace("“", '"')
                     .replace("”", '"')
                     .replace("₹", "INR "))
            return t.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")

        commands = []
        # Background: dark obsidian #0A0A0C
        commands.append("q")
        commands.append("0.039 0.039 0.047 rg") # #0A0A0C
        commands.append(f"0 0 {width} {height} re f")
        
        # Top gradient-like accent border (Emerald line)
        commands.append("0.063 0.725 0.506 RG") # Emerald #10B981
        commands.append("3 w")
        commands.append("60 480 m 900 480 l S")
        
        # Bottom footer separator
        commands.append("0.2 0.2 0.22 RG")
        commands.append("1 w")
        commands.append("60 55 m 900 55 l S")
        commands.append("Q")
        
        # Text block
        commands.append("BT")
        
        # Category / Header Tag
        commands.append("/F1 10 Tf")
        commands.append("0.063 0.725 0.506 rg") # Emerald
        commands.append(f"60 495 Td ({esc(category.upper())}) Tj")
        commands.append("ET")
        
        # Title
        commands.append("BT")
        commands.append("/F1 28 Tf")
        commands.append("1 1 1 rg") # Pure White
        commands.append(f"60 435 Td ({esc(title)}) Tj")
        commands.append("ET")
        
        # Subtitle
        if subtitle:
            commands.append("BT")
            commands.append("/F2 15 Tf")
            commands.append("0.65 0.67 0.72 rg") # Slate Silver
            commands.append(f"60 405 Td ({esc(subtitle)}) Tj")
            commands.append("ET")
        
        # Highlights Box / Text
        if highlight:
            commands.append("q")
            commands.append("0.08 0.08 0.10 rg")
            commands.append("60 330 840 45 re f")
            commands.append("0.063 0.725 0.506 RG")
            commands.append("1 w")
            commands.append("60 330 840 45 re S")
            commands.append("Q")
            
            commands.append("BT")
            commands.append("/F1 12 Tf")
            commands.append("0.9 0.95 0.92 rg")
            commands.append(f"80 348 Td ({esc(highlight)}) Tj")
            commands.append("ET")
        
        # Bullets
        y_start = 310 if highlight else 360
        if bullets:
            commands.append("BT")
            commands.append("/F2 13 Tf")
            commands.append("0.85 0.86 0.90 rg")
            
            # First bullet
            first = True
            for b in bullets:
                b_text = esc(b)
                if first:
                    commands.append(f"75 {y_start} Td (\\225  {b_text}) Tj")
                    first = False
                else:
                    commands.append(f"0 -26 Td (\\225  {b_text}) Tj")
            commands.append("ET")
        
        # Metrics Cards (if any)
        if metrics:
            num_cards = len(metrics)
            card_w = int(840 / num_cards) - 15
            for m_idx, (m_val, m_label) in enumerate(metrics):
                cx = 60 + m_idx * (card_w + 15)
                cy = 90
                ch = 100
                commands.append("q")
                commands.append("0.08 0.08 0.10 rg")
                commands.append(f"{cx} {cy} {card_w} {ch} re f")
                commands.append("0.18 0.18 0.22 RG")
                commands.append(f"1 w {cx} {cy} {card_w} {ch} re S")
                commands.append("Q")
                
                commands.append("BT")
                commands.append("/F1 22 Tf")
                commands.append("0.063 0.725 0.506 rg")
                commands.append(f"{cx + 20} {cy + 55} Td ({esc(m_val)}) Tj")
                commands.append("ET")
                
                commands.append("BT")
                commands.append("/F2 10 Tf")
                commands.append("0.6 0.62 0.68 rg")
                commands.append(f"{cx + 20} {cy + 30} Td ({esc(m_label)}) Tj")
                commands.append("ET")
        
        # Footer
        commands.append("BT")
        commands.append("/F2 9 Tf")
        commands.append("0.45 0.45 0.50 rg")
        commands.append("60 35 Td (Setthi Technologies Pvt. Ltd.  |  Confidential & Proprietary) Tj")
        commands.append("ET")
        
        # Slide counter
        commands.append("BT")
        commands.append("/F1 9 Tf")
        commands.append("0.6 0.6 0.65 rg")
        commands.append(f"830 35 Td (Slide {slide_num} of {total_slides}) Tj")
        commands.append("ET")
        
        stream_bytes = "\n".join(commands).encode("latin-1")
        stream_len = len(stream_bytes)
        
        content_dict = f"<< /Length {stream_len} >>\nstream\n".encode("ascii") + stream_bytes + b"\nendstream"
        content_obj_id = add_object(content_dict)
        
        # Page object will be created later with references
        page_obj_ids.append(content_obj_id)
        
    # Create Page Objects
    page_final_ids = []
    # Reserved ID for pages catalog parent
    pages_parent_id = len(objects) + len(page_obj_ids) + 1
    
    for content_id in page_obj_ids:
        page_dict = (
            f"<< /Type /Page /Parent {pages_parent_id} 0 R "
            f"/MediaBox [0 0 {width} {height}] "
            f"/Contents {content_id} 0 R "
            f"/Resources << /Font << /F1 {obj_f1} 0 R /F2 {obj_f2} 0 R /F3 {obj_f3} 0 R >> >> >>"
        ).encode("ascii")
        p_id = add_object(page_dict)
        page_final_ids.append(p_id)
        
    # Pages Root Object
    kids_str = " ".join(f"{pid} 0 R" for pid in page_final_ids)
    pages_root = f"<< /Type /Pages /Kids [{kids_str}] /Count {len(page_final_ids)} >>".encode("ascii")
    actual_pages_parent_id = add_object(pages_root)
    assert actual_pages_parent_id == pages_parent_id
    
    # Catalog Object
    catalog_obj = f"<< /Type /Catalog /Pages {pages_parent_id} 0 R >>".encode("ascii")
    catalog_id = add_object(catalog_obj)
    
    # Write PDF file
    with open(output_path, "wb") as f:
        f.write(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
        offsets = []
        for i, obj in enumerate(objects):
            offset = f.tell()
            offsets.append(offset)
            f.write(f"{i+1} 0 obj\n".encode("ascii"))
            f.write(obj)
            f.write(b"\nendobj\n")
            
        xref_offset = f.tell()
        f.write(b"xref\n")
        f.write(f"0 {len(objects) + 1}\n".encode("ascii"))
        f.write(b"0000000000 65535 f \n")
        for off in offsets:
            f.write(f"{off:010d} 00000 n \n".encode("ascii"))
            
        f.write(b"trailer\n")
        f.write(f"<< /Size {len(objects) + 1} /Root {catalog_id} 0 R >>\n".encode("ascii"))
        f.write(b"startxref\n")
        f.write(f"{xref_offset}\n".encode("ascii"))
        f.write(b"%%EOF\n")
    print(f"Created {output_path} ({len(slides)} slides)")

# Slides for /plan (Executive Pitch Deck - 10 slides)
EXECUTIVE_SLIDES = [
    {
        "category": "Setthi • Executive Pitch Deck",
        "title": "Setthi: Intelligent Financial Companion",
        "subtitle": "Chat with your money in plain English. Private, grounded, and 100% judgment-free.",
        "highlight": "Inverting financial shame into tranquil clarity for 250M+ digitally transacting Indians.",
        "bullets": [
            "Traditional fintech apps trigger shame, guilt, and cognitive fatigue with microscopic spreadsheets.",
            "Setthi replaces friction with a calm conversational interface powered by local AI financial reasoning.",
            "Zero Data Retention guarantee: user financial records remain strictly encrypted and private."
        ],
        "metrics": [
            ("250M+", "UPI Active Users in India"),
            ("84%", "Report Anxiety Looking at Accounts"),
            ("Zero", "Data Stored on Public LLMs")
        ]
    },
    {
        "category": "The Problem",
        "title": "Finances Trigger Shame, Not Clarity",
        "subtitle": "Why 8 out of 10 young adults avoid checking their bank statements regularly.",
        "bullets": [
            "Cryptic SMS strings ('UPI/CR/52849.../QIK') make spending feel chaotic and out of control.",
            "Traditional budgeting apps (YNAB, Mint) require tedious manual categorization that 92% abandon by Day 7.",
            "Neobanks push predatory loan products instead of helping people preserve and understand their capital.",
            "Massive privacy concern: users fear sharing net-worth data with data-brokered analytics engines."
        ],
        "metrics": [
            ("92%", "Drop-off on Manual Budget Apps"),
            ("14.8B", "Monthly UPI Transactions"),
            ("< 5%", "Maintain Written Budgets")
        ]
    },
    {
        "category": "The Solution",
        "title": "A Conversational Companion with Solace",
        "subtitle": "Transform chaotic bank statements into calm, instant answers.",
        "highlight": "Ask: 'Can I afford dinner tonight and still pay rent on the 1st?' Get an honest, safe answer instantly.",
        "bullets": [
            "Intelligent PDF statement parsing with zero duplicate transaction reconciliations.",
            "Safe-To-Spend real-time calculation accounting for upcoming recurring commitments.",
            "Empathetic conversational tone: no guilt, no robotic jargon, just truthful reality checks.",
            "100% Free for consumers — built with DPDP Act 2023 statutory consent principles."
        ],
        "metrics": [
            ("< 30s", "PDF Upload to Full Categorization"),
            ("100%", "Private & Client-First Isolation"),
            ("Zero", "Hidden Fees or Upsells")
        ]
    },
    {
        "category": "Product Experience",
        "title": "Conversational UI Meets Native Motion",
        "subtitle": "Designed with the Solace design language: deep obsidian, fluid animation, zero clutter.",
        "bullets": [
            "Interactive Rive companion avatar providing real-time emotional and financial states.",
            "Autonomous transaction categorization classifying essentials, discretionary spends, and leaks.",
            "Automated recurring bill detection identifying hidden subscriptions before they renew.",
            "Built on Flutter (iOS & Android) and Next.js for lightning-fast cross-platform fluidity."
        ],
        "metrics": [
            ("60 FPS", "Native Hardware Acceleration"),
            ("98.4%", "Categorization Accuracy"),
            ("iOS + Android", "Unified Production Codebase")
        ]
    },
    {
        "category": "Market Opportunity",
        "title": "$28B Indian Consumer Fintech Market",
        "subtitle": "Capturing the next generation of salaried professionals and gig workers.",
        "bullets": [
            "India is the world's largest instant payment ecosystem, processing $2.4 Trillion annually via UPI.",
            "Over 120M Gen-Z and Millennial professionals have bank accounts but zero financial guidance.",
            "Massive transition from unorganized tracking to automated personal finance managers.",
            "Expanding TAM to Southeast Asia (PayNow Singapore, PromptPay Thailand, DuitNow Malaysia)."
        ],
        "metrics": [
            ("$2.4T", "Annual UPI Transaction Volume"),
            ("120M+", "Gen-Z & Millennial Professionals"),
            ("24% YoY", "Digital Payment Growth")
        ]
    },
    {
        "category": "Business Model",
        "title": "Ethical, Privacy-First Monetization",
        "subtitle": "How Setthi builds an enduring, high-margin software business without selling user data.",
        "bullets": [
            "B2C Freemium: Free core budgeting and companion chat forever.",
            "Setthi Solace Club (Subscription): Advanced multi-bank consolidated sync, tax prep export, and priority voice chat.",
            "Account Aggregator (AA) Gateway: Commission on verified, user-authorized financial product facilitation.",
            "Enterprise Zero-Data-Retention APIs for wealth managers and family offices."
        ],
        "metrics": [
            ("₹199/mo", "Projected Solace Club ARPU"),
            ("80%+", "Gross Margins on Subscription Tier"),
            ("0%", "Revenue from Selling User Data")
        ]
    },
    {
        "category": "Privacy & Compliance",
        "title": "Statutory DPDP Act 2023 & SEBI Exemption",
        "subtitle": "Built ground-up with Indian regulatory and mathematical safeguards.",
        "bullets": [
            "Complete compliance with Digital Personal Data Protection (DPDP) Act 2023.",
            "Right to Erasure (Section 12): Automated account deletion workflow and quarantine protocol.",
            "SEBI Investment Adviser (RIA) exemption compliant: mathematical calculation without bespoke securities advice.",
            "End-to-end encrypted storage on isolated Postgres instances with Row Level Security."
        ],
        "metrics": [
            ("DPDP 2023", "Statutory Compliance Standard"),
            ("AES-256", "Rest & Transit Encryption"),
            ("30-Day", "Automated Purge Quarantine")
        ]
    },
    {
        "category": "Traction & Early Access",
        "title": "Early Momentum & Waitlist Growth",
        "subtitle": "Strong organic demand from mobile beta testing and viral landing page.",
        "bullets": [
            "Mobile app built and tested on production Android & iOS builds.",
            "High conversion rate on the early access waitlist through organic word-of-mouth.",
            "94% retention in pilot user cohorts over 30 days of conversational budgeting.",
            "Average of 4.2 conversations per user per week."
        ],
        "metrics": [
            ("94%", "30-Day Pilot Cohort Retention"),
            ("4.2x", "Weekly Engagement Touchpoints"),
            ("1,000+", "Pre-Launch Waitlist Members")
        ]
    },
    {
        "category": "Roadmap",
        "title": "24-Month Execution Milestones",
        "subtitle": "From viral conversational pilot to India's leading consumer financial platform.",
        "bullets": [
            "Q1 2026: Public App Store & Google Play launch for iOS and Android.",
            "Q2 2026: RBI Account Aggregator (AA) native integration for 1-click live statement synchronization.",
            "Q3 2026: Voice-first companion interaction in English, Hindi, and regional languages.",
            "Q4 2026: Setthi Solace Club subscription rollout and cross-border SE-Asia pilot."
        ],
        "metrics": [
            ("Q1 2026", "Public App Store Launch"),
            ("Q2 2026", "RBI Account Aggregator Sync"),
            ("Q3 2026", "Multilingual Voice Companion")
        ]
    },
    {
        "category": "The Ask & Team",
        "title": "Seed Funding & Capital Allocation",
        "subtitle": "Accelerating engineering, compliance, and user acquisition.",
        "highlight": "Seeking $750,000 Seed Capital to scale to 500,000 active Indian consumers over 18 months.",
        "bullets": [
            "Founder: Santosh Patil — Engineering, Product Architecture & Vision.",
            "50% Capital to Core Engineering & AI Financial Reasoning Infrastructure.",
            "25% Capital to Compliance, Security Audits, and RBI Account Aggregator Licensing.",
            "25% Capital to Growth Loops, Community Acquisition, and Content Distribution."
        ],
        "metrics": [
            ("$750K", "Seed Round Target"),
            ("18 Months", "Runway to Cash-Flow Breakeven"),
            ("500K", "Target Active Users")
        ]
    }
]

# Slides for /full-plan (Comprehensive Strategic Plan - 16 slides)
FULL_PLAN_SLIDES = EXECUTIVE_SLIDES + [
    {
        "category": "Technical Architecture",
        "title": "System Topology & Zero-Retention Pipeline",
        "subtitle": "How client-side parsing and serverless microservices deliver sub-second responses.",
        "bullets": [
            "Local client statement parsing strips identifiable PII (Account Number, Address, IFSC) prior to ingestion.",
            "Stateless edge functions execute classification rules through deterministic regex combined with micro-LLM prompts.",
            "Real-time transactional starfield and companion states synced across Supabase PostgreSQL with RLS.",
            "Distributed CDN edge caching with 99.99% availability."
        ],
        "metrics": [
            ("< 150ms", "API Response Latency"),
            ("100%", "Row-Level Security Enforcement"),
            ("Zero", "Persistent PII Storage")
        ]
    },
    {
        "category": "Unit Economics & LTV/CAC",
        "title": "High Margin Software Economics",
        "subtitle": "Achieving profitable growth with viral peer-referral loops.",
        "bullets": [
            "Blended CAC estimated at ₹140 ($1.65) via organic viral content and financial statement review roasts.",
            "Solace Club projected conversion rate of 4.5% of active user base at ₹199/month.",
            "12-month expected customer lifetime value (LTV) of ₹1,420 ($17.10).",
            "LTV:CAC ratio exceeding 10:1, yielding rapid capital recycling."
        ],
        "metrics": [
            ("₹140", "Estimated Blended CAC"),
            ("₹1,420", "12-Month Expected LTV"),
            ("10.1x", "LTV : CAC Ratio")
        ]
    },
    {
        "category": "Competitive Positioning",
        "title": "Strategic Moat vs Existing Solutions",
        "subtitle": "Why incumbents cannot easily copy Setthi's psychological positioning.",
        "bullets": [
            "Cleo (US/UK): Heavy Western focus with zero Indian UPI integration or RBI AA connectivity.",
            "Fold / Fi / Jupiter: Neobanks constrained by banking partner regulations and cross-selling credit products.",
            "INDmoney / Groww: Investment-centric portals with zero focus on daily conversational spending mindfulness.",
            "Setthi's Moat: Radical simplicity, emotional solace, zero credit push, and deep local Indian payment parsing."
        ],
        "metrics": [
            ("Pure Play", "Zero Conflicted Neobank Model"),
            ("India-First", "Engineered for UPI Nuances"),
            ("Mindful", "Companion vs Sales Funnel")
        ]
    },
    {
        "category": "Financial Projections",
        "title": "3-Year Pro-Forma Forecast",
        "subtitle": "Path to 2.5M active users and $4.8M ARR.",
        "bullets": [
            "Year 1: 250,000 Registered Users | ₹2.2 Cr ($260K) ARR | Core product validation.",
            "Year 2: 1,100,000 Registered Users | ₹14.5 Cr ($1.7M) ARR | Account Aggregator revenue ramp.",
            "Year 3: 2,800,000 Registered Users | ₹41.0 Cr ($4.8M) ARR | Cash flow positive, regional expansion.",
            "Operating expenditures dominated by cloud compute, RBI licensing, and talent acquisition."
        ],
        "metrics": [
            ("$260K", "Year 1 ARR Target"),
            ("$1.7M", "Year 2 ARR Target"),
            ("$4.8M", "Year 3 ARR Target")
        ]
    },
    {
        "category": "Risk Mitigation & Governance",
        "title": "Regulatory, Cyber & Operational Safeguards",
        "subtitle": "Ensuring resilience against platform, regulatory, and market shifts.",
        "bullets": [
            "Statutory Grievance Officer appointed in Bangalore, Karnataka under DPDP rules.",
            "Quarterly external penetration testing and SOC-2 Type II audit readiness roadmap.",
            "Multi-model AI failover (Anthropic Claude, Google Gemini, local Llama) eliminates single-vendor downtime.",
            "Complete independence from any single retail bank's API or sponsorship."
        ],
        "metrics": [
            ("SOC-2", "Audit Roadmap Readiness"),
            ("Multi-Cloud", "LLM Redundancy Protocol"),
            ("100%", "Statutory Compliance Audit")
        ]
    },
    {
        "category": "Conclusion & Contact",
        "title": "Join Us in Building the Future of Money",
        "subtitle": "Partner with Setthi to bring peaceful financial clarity to millions.",
        "highlight": "Let's make money conversational, private, and clear together.",
        "bullets": [
            "Demo App Available: Production builds on iOS TestFlight & Android APK.",
            "Pitch Deck & Financial Model: Available in Keynote (.key), PDF, and PowerPoint (.pptx).",
            "Contact: Santosh Patil — Founder & Grievance Officer.",
            "Email: setthi2003@gmail.com | Bangalore, Karnataka, Republic of India."
        ],
        "metrics": [
            ("Live Demo", "iOS & Android Builds"),
            ("Open Round", "$750K Seed Stage"),
            ("setthi2003@gmail.com", "Direct Founder Contact")
        ]
    }
]

if __name__ == "__main__":
    out_dir = os.path.join(os.path.dirname(__file__), "public", "decks")
    os.makedirs(out_dir, exist_ok=True)
    
    deck_path = os.path.join(out_dir, "setthi-pitch-deck.pdf")
    full_path = os.path.join(out_dir, "setthi-full-plan.pdf")
    
    create_deck_pdf(deck_path, "Setthi Pitch Deck", EXECUTIVE_SLIDES)
    create_deck_pdf(full_path, "Setthi Full Business Plan", FULL_PLAN_SLIDES)
    print("All pitch deck PDFs generated successfully.")
