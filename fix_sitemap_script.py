import os

filepath = "/Users/sudeepsinha/Documents/axomcars-landing/generate_sitemap.py"
with open(filepath, "r") as f:
    content = f.read()

# Replace url assignment to remove .html
content = content.replace('url = f"{base_url}/{basename}"', 'url = f"{base_url}/{basename.replace(\'.html\', \'\')}"')
# Don't change index.html since it maps to "/"

with open(filepath, "w") as f:
    f.write(content)
