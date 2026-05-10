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
