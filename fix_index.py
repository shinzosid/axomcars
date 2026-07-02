import os

workspace = "/Users/sudeepsinha/Documents/axomcars-landing"
index_file = os.path.join(workspace, "index.html")

with open(index_file, 'r') as f:
    content = f.read()

# The exact block that was injected incorrectly:
ev_faq = """                    <div class="faq-item">
                        <button class="faq-question">
                            <span>Which Tata EV should I buy in Assam?</span>
                            <span class="faq-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </span>
                        </button>
                        <div class="faq-answer">
                            <div class="faq-answer-content">
                                <p>If you need an affordable daily city commuter, the <strong>Tiago.ev</strong> is perfect. For a compact family SUV with high ground clearance, choose the <strong>Punch.ev</strong> or <strong>Nexon.ev</strong>. All Tata EVs at Axom Cars come with IP67 waterproof batteries, making them highly safe for Assam's monsoons.</p>
                            </div>
                        </div>
                    </div>
"""

# Remove all occurrences of the mistakenly inserted block (might have a slightly different newline)
# We can just remove the whole faq-item block for that specific question.
import re
# First, remove all of them entirely
content = re.sub(r'\s*<div class="faq-item">\s*<button class="faq-question">\s*<span>Which Tata EV should I buy in Assam\?</span>.*?</button>\s*<div class="faq-answer">\s*<div class="faq-answer-content">\s*<p>If you need an affordable daily city commuter, the <strong>Tiago\.ev</strong> is perfect\. For a compact family SUV with high ground clearance, choose the <strong>Punch\.ev</strong> or <strong>Nexon\.ev</strong>\. All Tata EVs at Axom Cars come with IP67 waterproof batteries, making them highly safe for Assam\'s monsoons\.</p>\s*</div>\s*</div>\s*</div>', '', content, flags=re.DOTALL)

# Now, insert it cleanly into the ACTUAL FAQ section.
# The FAQ section starts with <div class="faq-container"> and ends before the section close.
# Let's find the FAQ container and insert it as the last item.
# We will insert it just before the closing </div> of the <div class="faq-container">

faq_section_pattern = re.compile(r'(<div class="faq-container">.*?)(\s*</div>\s*</div>\s*</section>)', re.DOTALL)
def insert_faq(match):
    return match.group(1) + ev_faq + match.group(2)

# To be completely safe and ensure we only target the faq-container, we can use a more precise string replacement.
# Let's find the last faq-item in the faq-container.
with open(index_file, 'w') as f:
    f.write(content)

print("Removed all broken instances.")
