import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.7/+esm';

const supabaseUrl = 'https://zkeitplyvdffmxzqwfm.supabase.co';
const supabaseAnonKey = 'sb_publishable_xxe0R1QxVNIiEuGfaoL2Hw_cbbFE4FH';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const db = {
    produtos: {
        listar: async () => {
            const { data, error } = await supabase.from('produtos').select('*').order('id', { ascending: true });
            return { data, error };
        },
        criar: async (nome, preco, quantidade) => {
            const { data, error } = await supabase.from('produtos').insert([{ nome, preco, quantidade }]).select();
            return { data, error };
        },
        deletar: async (id) => {
            const { error } = await supabase.from('produtos').delete().eq('id', id);
            return { error };
        }
    },
    vendas: {
        criar: async (total, itens) => {
            const { data, error } = await supabase.from('vendas').insert([{ total, itens }]).select();
            return { data, error };
        }
    },
    transacoes: {
        listar: async () => {
            const { data, error } = await supabase.from('transacoes').select('*').order('id', { ascending: true });
            return { data, error };
        },
        criar: async (tipo, descricao, valor) => {
            const { data, error } = await supabase.from('transacoes').insert([{ tipo, descricao, valor }]).select();
            return { data, error };
        },
        deletar: async (id) => {
            const { error } = await supabase.from('transacoes').delete().eq('id', id);
            return { error };
        }
    }
};
