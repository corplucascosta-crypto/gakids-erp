import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.7/+esm';
const supabaseUrl = 'https://zkeitplyvdffmxzqwfm.supabase.co';
const supabaseKey = 'sua-chave-anonima';
export const supabase = createClient(supabaseUrl, supabaseKey);
export const auth = {
    signIn: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        return { data, error };
    },
    signOut: async () => {
        const { error } = await supabase.auth.signOut();
        return { error };
    },
    getCurrentUser: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    }
};
export const db = {
    getDashboardData: async () => {
        return {
            data: {
                balance: 15250.00,
                revenue: 28450.00,
                expenses: 13200.00,
                profit: 15250.00,
                margin: 35.5,
                totalSales: 142,
                totalProducts: 856,
                outOfStock: 23,
                lowStock: 45
            },
            error: null
        };
    }
};
export default { supabase, auth, db };
