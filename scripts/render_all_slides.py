#!/usr/bin/env python3
"""
Splits the user's uploaded PDF into single pages and renders each as a 1920x1080 HD PNG
using macOS native sips utility. 100% reliable, zero external dependencies.
"""
import os
import re
import subprocess
import shutil

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF_PATH = os.path.join(BASE_DIR, "public", "decks", "Setthi_Pitch_Deck_11_Slides_Business_Simplified.pdf")
SLIDES_OUT = os.path.join(BASE_DIR, "public", "decks", "slides")
TEMP_DIR = os.path.join(BASE_DIR, "public", "decks", "_tmp_pages")

os.makedirs(SLIDES_OUT, exist_ok=True)
os.makedirs(TEMP_DIR, exist_ok=True)

with open(PDF_PATH, "rb") as f:
    data = f.read()

# Find the Pages catalog object
m = re.search(rb'(\d+\s+0\s+obj\s*<<.*?/Type\s*/Pages.*?/Kids\s*\[)(.*?)(\].*?>>\s*endobj)', data, re.DOTALL)
if not m:
    print("Could not find /Type /Pages in PDF")
    exit(1)

header, kids_str, footer = m.groups()
kids = kids_str.strip().split()
page_refs = [f"{kids[i].decode()} {kids[i+1].decode()} {kids[i+2].decode()}" for i in range(0, len(kids), 3)]
total_pages = len(page_refs)
print(f"Total pages identified: {total_pages}")

for idx, page_ref in enumerate(page_refs):
    page_num = idx + 1
    new_kids = f" {page_ref} ".encode("ascii")
    new_footer = re.sub(rb'/Count\s+\d+', b'/Count 1', footer)
    new_pages_obj = header + new_kids + new_footer
    
    single_page_pdf = data[:m.start()] + new_pages_obj + data[m.end():]
    tmp_pdf = os.path.join(TEMP_DIR, f"page_{page_num}.pdf")
    out_png = os.path.join(SLIDES_OUT, f"slide-{page_num}.png")
    
    with open(tmp_pdf, "wb") as pf:
        pf.write(single_page_pdf)
    
    # Run sips at 1920 width (Full HD Retina quality)
    cmd = ["sips", "-s", "format", "png", "--resampleWidth", "1920", tmp_pdf, "--out", out_png]
    res = subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if res.returncode == 0 and os.path.exists(out_png):
        size_kb = os.path.getsize(out_png) // 1024
        print(f"✓ Rendered Slide {page_num}/{total_pages} -> slide-{page_num}.png ({size_kb} KB)")
    else:
        print(f"✗ Failed rendering slide {page_num}")

# Clean up temp pdfs
shutil.rmtree(TEMP_DIR, ignore_errors=True)
print("All 11 presentation slides successfully rendered to public/decks/slides/")
