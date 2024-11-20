export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          avatar_url: string | null
          provider: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['users']['Insert']>
      }
      love_letters: {
        Row: {
          id: string
          user_id: string
          content: string
          prompt: string
          locale: string
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['love_letters']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['love_letters']['Insert']>
      }
      favorites: {
        Row: {
          id: string
          user_id: string
          letter_id: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['favorites']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['favorites']['Insert']>
      }
    }
  }
} 