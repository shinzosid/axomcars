// Supabase Configuration
const SUPABASE_URL = 'https://twdrrfkafjjtnfpaqpoj.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_7z5RVXIbAp-1YKsRBi7i3g_q5xx8neW';

// Initialize Supabase Client
// Note: 'supabase' is provided by the SDK from the CDN
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Attach to window so it's accessible globally
window.supabaseClient = supabaseClient;

/**
 * Submits a lead to Supabase
 * @param {Object} leadData - The lead information (name, phone, email, vehicle, location, source)
 * @returns {Promise} - Supabase response
 */
window.submitLead = async (leadData) => {
    try {
        const { data, error } = await supabaseClient
            .from('leads')
            .insert([
                {
                    name: leadData.name,
                    phone: leadData.phone || leadData.mobile, // Handle both 'phone' and 'mobile' naming
                    email: leadData.email || '',
                    vehicle: leadData.vehicle || leadData.model, // Handle both 'vehicle' and 'model' naming
                    location: leadData.location || leadData.outlet, // Handle both 'location' and 'outlet' naming
                    source: leadData.source || 'Website Lead Form'
                }
            ]);

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Supabase submission error:', error);
        return { success: false, error };
    }
};

/**
 * Form Submission Helper
 * Attaches to any form and handles the Supabase insert + UI feedback
 */
window.handleLeadForm = async (formId, leadType = 'General Inquiry') => {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // UI Loading State
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';
        submitBtn.classList.add('btn-loading');

        // Extract Data
        const name = form.querySelector('[id*="Name"]')?.value || '';
        const mobile = form.querySelector('[id*="Mobile"]')?.value || '';
        const model = form.querySelector('[id*="Model"]')?.value || '';
        const outlet = form.querySelector('[id*="outlet"]')?.value || form.querySelector('[id*="Workshop"]')?.value || '';

        const result = await window.submitLead({
            name,
            mobile,
            model,
            outlet,
            source: (window.currentLeadType && window.currentLeadType !== 'General Inquiry') ? `${window.currentLeadType} Form` : `${leadType} Form`
        });

        if (result.success) {
            alert('Thank you! Your request has been received.');
            form.reset();
            // Set persistence flag so modal doesn't show again
            localStorage.setItem('axom_modal_seen', 'true');
            // Close modals if they exist
            document.querySelector('.modal-overlay.active')?.classList.remove('active');
        }
 else {
            alert('Sorry, there was an error. Please try again or call us directly.');
        }

        // Reset UI
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        submitBtn.classList.remove('btn-loading');
    });
};

/**
 * Tracks a visitor session
 */
/**
 * Tracks a visitor session or specific event
 */
window.trackVisit = async (eventType = 'page_view', metadata = {}) => {
    // Prevent tracking in admin panel or local development
    const isLocal = window.location.hostname === 'localhost' || 
                   window.location.hostname === '127.0.0.1' || 
                   window.location.hostname.startsWith('192.168.') ||
                   window.location.hostname.startsWith('10.') ||
                   window.location.protocol === 'file:';
    
    if (window.location.pathname.toLowerCase().includes('admin') || 
        document.body.classList.contains('admin-body') || 
        isLocal) {
        return;
    }

    try {
        // 1. Manage Visitor ID (Persistent)
        let visitorId = localStorage.getItem('axom_visitor_id');
        if (!visitorId) {
            visitorId = 'v-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
            localStorage.setItem('axom_visitor_id', visitorId);
        }

        // 2. Manage Session ID (Tab-based)
        let sessionId = sessionStorage.getItem('axom_session_id');
        if (!sessionId) {
            sessionId = 's-' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('axom_session_id', sessionId);
        }

        // 3. Capture UTMs
        const urlParams = new URLSearchParams(window.location.search);
        const utm = {
            source: urlParams.get('utm_source'),
            medium: urlParams.get('utm_medium'),
            campaign: urlParams.get('utm_campaign')
        };

        // 4. Fetch Geo Data (Cached per session to avoid rate limits)
        let geoData = JSON.parse(sessionStorage.getItem('axom_geo_data') || '{}');
        if (!geoData.city && eventType === 'page_view') {
            try {
                const geoRes = await fetch('https://ipapi.co/json/');
                geoData = await geoRes.json();
                sessionStorage.setItem('axom_geo_data', JSON.stringify(geoData));
            } catch (e) { console.debug('Geo blocked'); }
        }

        // 5. Insert into Supabase
        const { error } = await supabaseClient
            .from('visits')
            .insert([{
                visitor_id: visitorId,
                session_id: sessionId,
                event_type: eventType,
                page_url: window.location.pathname,
                referrer: document.referrer || 'Direct',
                browser: navigator.userAgent.includes('Mobi') ? 'Mobile' : 'Desktop',
                screen_res: `${window.screen.width}x${window.screen.height}`,
                city: geoData.city || 'Unknown',
                region: geoData.region || 'Unknown',
                country: geoData.country_name || 'India',
                utm_source: utm.source,
                utm_medium: utm.medium,
                utm_campaign: utm.campaign,
                metadata: metadata
            }]);

        if (error) throw error;
    } catch (error) {
        console.debug('Tracking error:', error);
    }
};

/**
 * Global Event Tracker for Clicks
 */
window.trackEvent = (type, label = '') => {
    window.trackVisit(type, { label });
};

// Auto-track page view
if (document.readyState === 'complete') {
    window.trackVisit();
} else {
    window.addEventListener('load', () => window.trackVisit());
}
