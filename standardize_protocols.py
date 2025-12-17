import os
import re

PROTOCOL_DIR = r"c:\Users\Home\OneDrive\getting started\Documents\GitHub\anohubs-site\anohubs-site\protocol"
TEMPLATE_HEAD = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Roboto+Mono:wght@300;400&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {{ theme: {{ extend: {{ colors: {{ 'h-gold': '#FFB800', 'h-cyan': '#06b6d4', 'h-red': '#ef4444', 'h-green': '#10b981', 'h-purple': '#8b5cf6', 'h-orange': '#f97316' }}, fontFamily: {{ divine: ['Oswald', 'sans-serif'], mono: ['Roboto Mono', 'monospace'] }} }} }} }}
    </script>
    <style>
        body {{ background-color: #020617; color: #cbd5e1; }}
        .scada-panel {{ background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.1); backdrop-filter: blur(8px); }}
        .field {{ background: rgba(0, 0, 0, 0.5); border: 1px solid rgba(255, 255, 255, 0.15); color: #FFB800; font-family: 'Roboto Mono', monospace; padding: 4px 8px; width: 100%; outline: none; transition: all 0.3s; }}
        .field:focus {{ border-color: #06b6d4; box-shadow: 0 0 10px rgba(6, 182, 212, 0.2); }}
    </style>
</head>
<body class="overflow-x-hidden">
    <div id="protocol-header-placeholder"></div>
    <div class="divine-grid fixed inset-0 z-[-1] opacity-20 pointer-events-none" style="background-image: linear-gradient(rgba(6, 182, 212, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.05) 1px, transparent 1px); background-size: 40px 40px;"></div>
"""

TEMPLATE_FOOTER_SCRIPTS = """    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
    <script src="../assets/js/layout-loader.js"></script>
    {custom_script}
</body>
</html>"""

def standardize_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip files that don't look like the targets (or already standardized)
    # Simple check: if it lacks the old "white sheet" wrapper, maybe assume it's good?
    # Actually, alignment_v2 is already good, so we should skip it.
    if "anohub_alignment_v2.html" in filepath:
        print(f"Skipping {filepath} (Already Source of Truth)")
        return

    # Extract Title
    title_match = re.search(r'<title>(.*?)</title>', content)
    title = title_match.group(1) if title_match else "AnoHub Protocol"

    # Extract Header (The inner dark one)
    # Search for <header class="fixed ..."> ... </header>
    # Note: Regex dot matching newline is needed
    header_match = re.search(r'(<header class="fixed w-full z-50.*?<\/header>)', content, re.DOTALL)
    if not header_match:
        print(f"Skipping {filepath} (No Header Found)")
        return
    header_html = header_match.group(1)

    # Extract Main Grid (The one with Sidebar and Main Content)
    # Look for <div class="pt-24 ..."> ... </div>
    # It ends before the footer.
    # A robust way is to find the start of the div, and then find the footer start.
    
    grid_start_idx = content.find('<div class="pt-24 pb-12 px-4 max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 relative z-10">')
    if grid_start_idx == -1:
        print(f"Skipping {filepath} (No Grid Container Found)")
        return
    
    # Find footer start to cut off content
    footer_start_match = re.search(r'<footer class="border-t border-slate-800 bg-black py-8 mt-auto">', content)
    if not footer_start_match:
        print(f"Skipping {filepath} (No Footer Found)")
        return
    footer_start_idx = footer_start_match.start()
    
    grid_html = content[grid_start_idx:footer_start_idx].strip()
    
    # Just in case there were trailing closing divs from the old wrappers before the footer
    # We want to keep the grid container closed.
    # The grid container opens one div.
    # Inside it are <aside> and <main>.
    # If we extracted up to footer, we likely grabbed the closing </div> of the grid if it was before the footer.
    # Let's inspect potential closure issues.
    # In the old structure, the Grid Div is INSIDE the Protocol Content div.
    # So `</div>` of Grid Div should be before `</div>` of Protocol Content, which is before Footer?
    # Actually in old structure: Grid Div is inside <main bg-white> -> <div content> ...
    # And Footer is INSIDE the <div content> too?
    # Let's check `anohub_methodology_v2.html` footer location.
    # Line 308: Footer.
    # Line 306: Closing div of Grid? NO.
    # The Grid Div (line 52) contains Aside and Main.
    # Main (line 90) ends at line 305.
    # Grid Div ends at line 306.
    # Footer starts at 308.
    # content[grid_start:footer_start] should capture the Grid Div fully (including its closing tag) +/- whitespace.
    
    # Extract Footer
    footer_match = re.search(r'(<footer class="border-t border-slate-800.*?<\/footer>)', content, re.DOTALL)
    if not footer_match:
         print(f"Skipping {filepath} (No Footer Content Found)")
         return
    footer_html = footer_match.group(1)

    # Extract Custom Script (usually at the bottom)
    # Search for <script> that is NOT tailwind, lucide, or layout-loader
    script_match = re.search(r'<script>\s*document\.addEventListener\(\'DOMContentLoaded\'.*?<\/script>', content, re.DOTALL)
    custom_script = script_match.group(0) if script_match else "<script>document.addEventListener('DOMContentLoaded', () => { lucide.createIcons(); });</script>"

    # Ensure Sidebar Links are correct
    # We want to replace the hardcoded "white paper" links if any, but the links seem to happen in the text.
    # The sidebar navigation highlighting logic:
    # In the old files, the current page link has `bg-h-gold` or similar.
    # We should preserve that unique internal state.
    # Since we are copying the `grid_html` which contains the unique sidebar, the highlight should stay!
    # BUT, we need to unify the sidebar LINK COLORS.
    # `alignment_v2` uses Cyan. `methodology` uses Gold. `protocol` uses Gold.
    # Should we unify to Cyan or keep unique module colors?
    # User said "adapt content of all ... to this specific design".
    # Alignment design uses CYAN. But Methodology uses GOLD.
    # Each module has a specific color in the main `protocol.html` solar system.
    # Module 01 (Veto) = Cyan? No, index says Veto is Cyan. Methodology is Purple.
    # Let's check `protocol.html`:
    # 01 Protocol Core: Cyan
    # 02 NDT: Purple
    # 03 Org: Orange
    # 04 Synergy: Yellow
    # 05 Alignment: Blue
    
    # The current `alignment_v2` redesign uses Cyan.
    # `methodology_v2` uses Gold.
    # If I mass update, I might want to preserve the module's signature color if possible, OR unify to the new "Dark/Cyan" theme.
    # "sav sadrzaj modula mora biti zadrzan" -> Content retained.
    # Does color count as content or design?
    # "prilagodi ovom specificnom dizajnu" -> Adapt to THIS specific design (Alignment V2).
    # Alignment V2 is Cyan.
    # It is safer to switch everything to Cyan/Blue to look uniform, OR keep the logic that matches the Planet Colors.
    # However, keeping Planet Colors requires mapping.
    # I'll stick to preserving the HTML color classes present in the file (e.g. text-h-gold) but removing the white background wrapper.
    # The `grid_html` capture preserves the internal colors.
    
    # Assemble New Content
    new_content = TEMPLATE_HEAD.format(title=title)
    new_content += header_html + "\n"
    new_content += grid_html + "\n"
    new_content += footer_html + "\n"
    new_content += TEMPLATE_FOOTER_SCRIPTS.format(custom_script=custom_script)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Updated {filepath}")

def main():
    if not os.path.exists(PROTOCOL_DIR):
        print("Protocol dir not found")
        return

    files = [f for f in os.listdir(PROTOCOL_DIR) if f.endswith('.html')]
    for f in files:
        standardize_file(os.path.join(PROTOCOL_DIR, f))

if __name__ == "__main__":
    main()
