import os
import glob

workspace = "/Users/sudeepsinha/Documents/axomcars-landing"
ev_pages = glob.glob(os.path.join(workspace, "*ev.html"))

for page in ev_pages:
    # skip the comparison pages themselves
    if "vs" in page:
        continue
    
    with open(page, 'r') as f:
        content = f.read()
    
    name = os.path.basename(page)
    
    # Check H1
    import re
    h1_match = re.search(r'<h1.*?>(.*?)</h1>', content)
    h1 = h1_match.group(1) if h1_match else "None"
    
    # Check if "Compare This Vehicle" has ICE links
    has_brezza = "tata-nexon-vs-maruti-brezza.html" in content
    has_exter = "tata-punch-vs-hyundai-exter.html" in content
    has_creta_ice = "tata-curvv-vs-hyundai-creta.html" in content
    
    # Check if it has EV comparisons
    has_xuv3xo = "tata-nexon-ev-vs-mahindra-xuv-3xo-ev.html" in content
    has_creta_ev = "tata-curvv-ev-vs-hyundai-creta-ev.html" in content
    has_harrier_vs_curvv = "tata-harrier-ev-vs-tata-curvv-ev.html" in content
    
    print(f"--- {name} ---")
    print(f"H1: {h1}")
    print(f"Has ICE comparisons: Brezza({has_brezza}) Exter({has_exter}) CretaICE({has_creta_ice})")
    print(f"Has EV comparisons: XUV3XO({has_xuv3xo}) CretaEV({has_creta_ev}) HarrierVsCurvv({has_harrier_vs_curvv})")
    
    # Check the "Who Should Buy" section title
    buyer_match = re.search(r'Who Should Buy the (.*?)?\?', content)
    buyer_title = buyer_match.group(1) if buyer_match else "None"
    print(f"Who Should Buy: {buyer_title}")
    print("")

