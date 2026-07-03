import os
import glob
import re

html_files = glob.glob("/Users/sudeepsinha/Documents/axomcars-landing/*.html")

for file_path in html_files:
    with open(file_path, "r") as f:
        content = f.read()
    
    # We want to replace occurrences of https://www.axomcars.in/SOMETHING.html
    # with https://www.axomcars.in/SOMETHING
    
    def strip_html(match):
        return match.group(1)
        
    # Regex to match https://www.axomcars.in/... ending with .html
    # group 1 is the URL without .html
    new_content = re.sub(r'(https://www\.axomcars\.in/[a-zA-Z0-9_-]+)\.html', strip_html, content)
    
    if new_content != content:
        with open(file_path, "w") as f:
            f.write(new_content)
        print(f"Updated {os.path.basename(file_path)}")

