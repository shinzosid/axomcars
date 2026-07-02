import os
import glob
import re

workspace = "/Users/sudeepsinha/Documents/axomcars-landing"

# 1. Update EV pages with FAQ and Breadcrumb schemas
ev_pages = glob.glob(os.path.join(workspace, "*ev.html"))
print(f"Found {len(ev_pages)} EV pages")

for page in ev_pages:
    with open(page, 'r') as f:
        content = f.read()
    
    changed = False
    basename = os.path.basename(page)
    model_name = basename.replace('tata-assam-', '').replace('.html', '').replace('-ev', ' EV').title()
    
    if '"@type": "FAQPage"' not in content:
        print(f"Missing FAQPage in {basename}")
        faq_schema = f"""
    <script type="application/ld+json">
    {{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {{
          "@type": "Question",
          "name": "What is the real-world range of the {model_name} in Guwahati?",
          "acceptedAnswer": {{ "@type": "Answer", "text": "The {model_name} provides a practical real-world range suitable for daily commutes in Guwahati, with varying range based on battery pack and driving conditions." }}
        }},
        {{
          "@type": "Question",
          "name": "Can I charge the {model_name} at home in Assam?",
          "acceptedAnswer": {{ "@type": "Answer", "text": "Yes, Axom Cars assists with installing a home charger, allowing you to conveniently charge your {model_name} overnight." }}
        }},
        {{
          "@type": "Question",
          "name": "Is the {model_name} suitable for Assam's monsoon?",
          "acceptedAnswer": {{ "@type": "Answer", "text": "Yes, the {model_name} features an IP67-rated waterproof battery pack, ensuring complete safety even when driving through waterlogged streets in Guwahati." }}
        }}
      ]
    }}
    </script>
"""
        content = content.replace('</head>', faq_schema + '</head>')
        changed = True

    if '"@type": "BreadcrumbList"' not in content:
        print(f"Missing BreadcrumbList in {basename}")
        breadcrumb_schema = f"""
    <script type="application/ld+json">
    {{
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.axomcars.in/" }},
        {{ "@type": "ListItem", "position": 2, "name": "Cars", "item": "https://www.axomcars.in/cars.html" }},
        {{ "@type": "ListItem", "position": 3, "name": "{model_name}", "item": "https://www.axomcars.in/{basename}" }}
      ]
    }}
    </script>
"""
        content = content.replace('</head>', breadcrumb_schema + '</head>')
        changed = True
        
    if changed:
        with open(page, 'w') as f:
            f.write(content)

# 2. Add AutoRepair to workshops.html
workshops = os.path.join(workspace, "workshops.html")
with open(workshops, 'r') as f:
    w_content = f.read()

if '"@type": "AutoRepair"' not in w_content:
    print("Adding AutoRepair to workshops.html")
    repair_schema = """
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "AutoRepair",
      "name": "Axom Cars Service Center",
      "image": "https://www.axomcars.in/logo.png",
      "@id": "https://www.axomcars.in/workshops.html",
      "url": "https://www.axomcars.in/workshops.html",
      "telephone": "+917099034015",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "GMC Hostel Rd, near dispur College, Kachari Basti, Ganeshguri",
        "addressLocality": "Guwahati",
        "addressRegion": "Assam",
        "postalCode": "781006",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 26.1495207,
        "longitude": 91.7839475
      },
      "areaServed": ["Guwahati", "Rangia", "Assam"],
      "brand": "Tata Motors",
      "priceRange": "$$"
    }
    </script>
"""
    w_content = w_content.replace('</head>', repair_schema + '</head>')
    with open(workshops, 'w') as f:
        f.write(w_content)

# 3. Add AutoDealer to showrooms.html
showrooms = os.path.join(workspace, "showrooms.html")
if os.path.exists(showrooms):
    with open(showrooms, 'r') as f:
        s_content = f.read()

    if '"@type": "AutoDealer"' not in s_content:
        print("Adding AutoDealer to showrooms.html")
        dealer_schema = """
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "AutoDealer",
      "name": "Axom Cars Showrooms",
      "image": "https://www.axomcars.in/logo.png",
      "@id": "https://www.axomcars.in/showrooms.html",
      "url": "https://www.axomcars.in/showrooms.html",
      "telephone": "+917099064993",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Guwahati",
        "addressRegion": "Assam",
        "addressCountry": "IN"
      },
      "department": [
        {
          "@type": "AutoDealer",
          "name": "Axom Cars Dispur",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Guwahati",
            "addressRegion": "Assam"
          }
        },
        {
          "@type": "AutoDealer",
          "name": "Axom Cars Ulubari",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Guwahati",
            "addressRegion": "Assam"
          }
        }
      ],
      "areaServed": ["Guwahati", "Rangia", "Dudhnoi", "Jagiroad", "Assam"],
      "brand": "Tata Motors",
      "priceRange": "$$"
    }
    </script>
"""
        s_content = s_content.replace('</head>', dealer_schema + '</head>')
        with open(showrooms, 'w') as f:
            f.write(s_content)

# 4. Search for "On-Road Price Quote" text across all html
found_cta = False
for html_file in glob.glob(os.path.join(workspace, "*.html")):
    with open(html_file, 'r') as f:
        content = f.read()
        if re.search(r'On-Road Price Quote', content, re.IGNORECASE):
            print(f"Found old CTA in {os.path.basename(html_file)}")
            found_cta = True

if not found_cta:
    print("Old CTA 'On-Road Price Quote' not found anywhere.")

print("Done")
