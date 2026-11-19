#!/usr/bin/env python3
"""
Creates placeholder/starter .key and .pptx packages in public/decks/
so viewers can download or site owners can replace them with their production exports.
"""
import os
import zipfile

out_dir = os.path.join(os.path.dirname(__file__), "public", "decks")
os.makedirs(out_dir, exist_ok=True)

files_to_make = [
    ("setthi-pitch-deck.key", "Setthi - Executive Pitch Deck (Apple Keynote File)"),
    ("setthi-pitch-deck.pptx", "Setthi - Executive Pitch Deck (Microsoft PowerPoint File)"),
    ("setthi-full-plan.key", "Setthi - Full Business Plan (Apple Keynote File)"),
    ("setthi-full-plan.pptx", "Setthi - Full Business Plan (Microsoft PowerPoint File)"),
]

for filename, desc in files_to_make:
    path = os.path.join(out_dir, filename)
    with zipfile.ZipFile(path, 'w', zipfile.ZIP_DEFLATED) as z:
        z.writestr("README.txt", f"{desc}\n\nGenerated for Setthi Technologies.\nTo update with your exact custom export from Mac Keynote or PowerPoint, simply export as '{filename}' and replace this file in public/decks/.\n")
    print(f"Created package {path}")

print("Presentation package files initialized.")
