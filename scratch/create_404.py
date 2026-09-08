import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace main content
main_regex = re.compile(r'<main>.*?</main>', re.DOTALL)
new_main = '''<main style="padding: 100px 20px; text-align: center; min-height: 50vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <h1 style="font-size: 3rem; margin-bottom: 20px;">404 - Page Not Found</h1>
    <p style="font-size: 1.2rem; margin-bottom: 30px;">The page you are looking for does not exist or has been moved.</p>
    <a href="/" class="btn btn-primary" style="display: inline-block;">Go to Homepage</a>
</main>'''
content = main_regex.sub(new_main, content)

# Replace title
title_regex = re.compile(r'<title>.*?</title>', re.DOTALL)
content = title_regex.sub('<title>404 Page Not Found | Axom Cars</title>', content)

# Remove canonical tag
canonical_regex = re.compile(r'<link rel="canonical" href="[^"]*">\n?', re.DOTALL)
content = canonical_regex.sub('', content)

with open('404.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Created 404.html")
