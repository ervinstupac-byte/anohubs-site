import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'
// CREDENTIALS PROVIDED BY USER 
const supabaseUrl = 'https://nehxtecejxklqknscbgf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5laHh0ZWNlanhrbHFrbnNjYmdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2MjA4NTksImV4cCI6MjA4MTE5Njg1OX0.AWWPN9ocAhjBTMtOgQ29ey3y4KcEXQLvfB98Z998n7A';

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function submitInquiry(formData) {
    console.log("Attempting transmission...", formData);
    const { data, error } = await supabase
        .from('inquiries')
        .insert([{
            full_name: formData.name,
            company: formData.company,
            email: formData.email,
            phone: formData.phone,
            message: formData.message
        }]);

    if (error) {
        console.error('Supabase Error:', error);
        return { success: false, msg: error.message };
    }
    return { success: true, msg: 'Transmission secure.' };
}
