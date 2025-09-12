import { supabase } from './supabase';

export const login = async (email: string, password: string) => {
    const { user, error } = await supabase.auth.signIn({
        email,
        password,
    });
    return { user, error };
};

export const signup = async (email: string, password: string) => {
    const { user, error } = await supabase.auth.signUp({
        email,
        password,
    });
    return { user, error };
};

export const logout = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
};