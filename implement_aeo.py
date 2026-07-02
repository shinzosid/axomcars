import os
import re

workspace = "/Users/sudeepsinha/Documents/axomcars-landing"

# 1. Update Homepage (index.html)
index_file = os.path.join(workspace, "index.html")
with open(index_file, 'r') as f:
    content = f.read()

# Enhance "Which Tata SUV is best for Assam roads?"
q1_old = r'<p>For navigating both the city traffic of Guwahati and the rugged terrains of Assam, the <strong>Tata Nexon<\/strong> and <strong>Tata Harrier<\/strong> are top choices. They offer robust build quality, high ground clearance, and powerful performance suited for the Northeast.<\/p>'
q1_new = r'<p>For navigating both the city traffic of Guwahati and the rugged terrains of Assam, the <strong>Tata Nexon<\/strong> and <strong>Tata Harrier<\/strong> are top choices. The Nexon offers a class-leading <strong>208mm ground clearance<\/strong>, making it perfect for waterlogged monsoon streets, while the Harrier provides <strong>Level 2 ADAS<\/strong> for safe highway cruising across Northeast India.<\/p>'
content = re.sub(q1_old, q1_new, content)

# Enhance "Where can I buy Tata cars in Guwahati?"
q2_old = r'<p>You can purchase the latest Tata Motors vehicles at <strong>Axom Cars<\/strong>. We have state-of-the-art showrooms located in <strong>Dispur<\/strong> and <strong>Ulubari<\/strong> in Guwahati, as well as branches in Rangia, Jagiroad, and Dudhnoi.<\/p>'
q2_new = r'<p>You can purchase the latest Tata Motors vehicles at <strong>Axom Cars<\/strong>. We have state-of-the-art showrooms located at <strong>GS Road, Dispur<\/strong> and <strong>Ulubari<\/strong> in Guwahati. Visit us for the best on-road price quotes, or <a href="showrooms.html">view our showroom directions on Google Maps<\/a>. We also serve Rangia, Jagiroad, and Dudhnoi.<\/p>'
content = re.sub(q2_old, q2_new, content)

# Enhance "Where can I book a Tata test drive in Guwahati?"
q3_old = r'<p>Booking a test drive is easy! You can fill out the <strong><a href="#test-drive" onclick="openTestDriveModal\(\); return false;">Test Drive Form<\/a><\/strong> on our website, call our sales team, or visit any Axom Cars showroom in Guwahati or Rangia to experience your favorite Tata car firsthand.<\/p>'
q3_new = r'<p>Booking a test drive is easy! You can fill out the <strong><a href="#test-drive" onclick="openTestDriveModal(); return false;">Test Drive Form</a></strong> on our website, or for instant booking, <strong><a href="https://wa.me/917099064993" target="_blank">message us on WhatsApp</a></strong>. We offer doorstep test drives anywhere in Guwahati for your convenience.</p>'
content = re.sub(q3_old, q3_new, content)

# Add "Which Tata EV should I buy?" to Homepage FAQs
if "Which Tata EV should I buy in Assam?" not in content:
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
                    </div>"""
    # Insert before the last faq-item closing div
    content = content.replace('</div>\n                </div>\n            </div>\n        </section>', f'{ev_faq}\n                </div>\n            </div>\n        </section>')

with open(index_file, 'w') as f:
    f.write(content)

# 2. Update Nexon Page (tata-assam-nexon.html)
nexon_file = os.path.join(workspace, "tata-assam-nexon.html")
with open(nexon_file, 'r') as f:
    n_content = f.read()

nq_old = r'The on-road price of Tata Nexon in Guwahati depends on the chosen variant and applicable taxes. Contact our Dispur or Ulubari showrooms for a detailed price breakup including insurance and registration.'
nq_new = r'The on-road price of Tata Nexon in Guwahati starts from approximately <strong>₹8.50 Lakh</strong> for the base Smart variant and goes up to <strong>₹17.50 Lakh</strong> for the top-end Fearless+ diesel automatic. Contact our Dispur or Ulubari showrooms for a detailed price breakup including RTO and insurance.'
n_content = re.sub(nq_old, nq_new, n_content)

with open(nexon_file, 'w') as f:
    f.write(n_content)

# 3. Add FAQs to Workshops Page
workshops_file = os.path.join(workspace, "workshops.html")
with open(workshops_file, 'r') as f:
    w_content = f.read()

if "Tata Service FAQs" not in w_content:
    workshop_faqs = """
        <section class="faq-section" style="padding: 60px 0; background: var(--white);">
            <div class="container">
                <div class="section-header">
                    <h2>Tata Service FAQs</h2>
                </div>
                <div class="faq-container">
                    <div class="faq-item">
                        <button class="faq-question">
                            <span>Where is the nearest Tata service centre in Guwahati?</span>
                            <span class="faq-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </span>
                        </button>
                        <div class="faq-answer">
                            <div class="faq-answer-content">
                                <p>The authorized Axom Cars Tata service centre in Guwahati is located at <strong>GMC Hostel Rd, near Dispur College, Kachari Basti, Ganeshguri, Guwahati, Assam 781006</strong>. We also have a fully equipped workshop in Rangia.</p>
                            </div>
                        </div>
                    </div>
                    <div class="faq-item">
                        <button class="faq-question">
                            <span>How much does Tata car service cost in Guwahati?</span>
                            <span class="faq-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </span>
                        </button>
                        <div class="faq-answer">
                            <div class="faq-answer-content">
                                <p>Routine maintenance for Tata cars is highly affordable. A standard paid service (oil change, filters, general checkup) for models like Tiago or Punch typically costs between <strong>₹3,500 to ₹5,500</strong>. SUVs like Harrier or Safari cost between <strong>₹6,500 to ₹9,000</strong>. EV servicing is significantly cheaper, often under <strong>₹2,000</strong> per visit.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
"""
    w_content = w_content.replace('</main>', f'{workshop_faqs}\n    </main>')
    with open(workshops_file, 'w') as f:
        f.write(w_content)

print("AEO Enhancements applied to Homepage, Nexon, and Workshops.")
