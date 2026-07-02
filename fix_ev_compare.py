import os
import glob
import re

workspace = "/Users/sudeepsinha/Documents/axomcars-landing"
ev_pages = glob.glob(os.path.join(workspace, "*ev.html"))

ev_compare_html = """                <div class="compare-cards-grid">
                    <!-- Nexon EV vs XUV 3XO EV -->
                    <div class="compare-card ev-compare-card">
                        <span class="compare-card-badge">Compact EV SUV</span>
                        <h3>Tata Nexon EV vs Mahindra XUV 3XO EV</h3>
                        <p>Analyze V2L technology, waterproof IP67 battery setup, and charging stops in Assam.</p>
                        <a href="tata-nexon-ev-vs-mahindra-xuv-3xo-ev.html" class="compare-card-btn">Compare Details &rarr;</a>
                    </div>
                    
                    <!-- Curvv EV vs Creta EV -->
                    <div class="compare-card ev-compare-card">
                        <span class="compare-card-badge">EV SUV Coupé</span>
                        <h3>Tata Curvv EV vs Hyundai Creta EV</h3>
                        <p>Compare the striking coupe-SUV styling, 585km range, and advanced connected features.</p>
                        <a href="tata-curvv-ev-vs-hyundai-creta-ev.html" class="compare-card-btn">Compare Details &rarr;</a>
                    </div>
                    
                    <!-- Harrier EV vs Curvv EV -->
                    <div class="compare-card ev-compare-card">
                        <span class="compare-card-badge">Premium EV SUV</span>
                        <h3>Tata Harrier EV vs Tata Curvv EV</h3>
                        <p>Evaluate Acti.ev platform benefits, AWD capabilities, and luxury features for Assam roads.</p>
                        <a href="tata-harrier-ev-vs-tata-curvv-ev.html" class="compare-card-btn">Compare Details &rarr;</a>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 40px;">
                    <a href="compare-cars.html" class="btn btn-primary">View All Comparisons</a>
                </div>"""

for page in ev_pages:
    if "vs" in page:
        continue
        
    with open(page, 'r') as f:
        content = f.read()

    # 1. Fix Curvv H1
    if "tata-assam-curvv-ev.html" in page:
        content = content.replace("<h1>Tata CURVV Price in Guwahati & Assam</h1>", "<h1>Tata Curvv EV in Guwahati & Assam</h1>")

    # 2. Replace the compare grid
    # We will use regex to find <div class="compare-cards-grid"> ... </div> (including the button below it if exists)
    # inside the #compare-vehicle section.
    
    # We match from <div class="compare-cards-grid" (or variations) up to the closing </div> of the compare-vehicle section container,
    # but it's safer to just replace everything between <h2 class="compare-section-title">... subtitle ...</p> and </div>\n        </section>
    
    pattern = re.compile(r'(<h2 class="compare-section-title">.*?</h2>\s*<p class="compare-section-subtitle">.*?</p>\s*)<div class="compare-cards-grid".*?(?=</div>\s*</section>)', re.DOTALL)
    
    new_content = pattern.sub(r'\1' + ev_compare_html + '\n            ', content)
    
    with open(page, 'w') as f:
        f.write(new_content)
        
    print(f"Updated {os.path.basename(page)}")

