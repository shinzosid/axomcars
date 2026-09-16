import re

with open('privacy.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix 1: "with TATA.CARS and relevant authorised systems"
# Fix 2: "including TATA.CARS, WhatsApp or Meta"
content = content.replace("with TATA.CARS and relevant authorised systems", "with Tata Motors and relevant authorised systems")
content = content.replace("including TATA.CARS, WhatsApp or Meta", "including Tata Motors, WhatsApp or Meta")

with open('privacy.html', 'w', encoding='utf-8') as f:
    f.write(content)
