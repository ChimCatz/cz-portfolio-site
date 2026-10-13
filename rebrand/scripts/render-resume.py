"""Render the resume PDF into page images for the Resume page.

Usage (from the rebrand/ folder):  npm run resume

Reads   public/resume/Chim_Zoe_Catalan_Resume.pdf
Writes  src/assets/resume/page-1.png, page-2.png, ...
Requires PyMuPDF (pip install pymupdf).
"""
from pathlib import Path

import fitz  # PyMuPDF

ROOT = Path(__file__).resolve().parent.parent
PDF = ROOT / "public" / "resume" / "Chim_Zoe_Catalan_Resume.pdf"
OUT = ROOT / "src" / "assets" / "resume"
ZOOM = 3  # 612pt-wide Letter page -> 1836px, sharp on high-DPI screens

OUT.mkdir(parents=True, exist_ok=True)
for old in OUT.glob("page-*.png"):
    old.unlink()

doc = fitz.open(PDF)
for i, page in enumerate(doc, start=1):
    pix = page.get_pixmap(matrix=fitz.Matrix(ZOOM, ZOOM), alpha=False)
    target = OUT / f"page-{i}.png"
    pix.save(target)
    print(f"wrote {target.relative_to(ROOT)} ({pix.width}x{pix.height})")
