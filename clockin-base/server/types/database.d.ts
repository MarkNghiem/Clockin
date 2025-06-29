export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      companies: {
        Row: {
          address_1: string
          address_2: string
          address_city: string
          address_state: string
          address_zip: string
          company_id: string
          company_name: string
          country: string
          country_code: string
          created_at: string | null
          is_active: boolean | null
          occupational_field: string
          owner_id: string | null
          phone_number: string
          updated_at: string | null
        }
        Insert: {
          address_1: string
          address_2: string
          address_city: string
          address_state: string
          address_zip: string
          company_id?: string
          company_name: string
          country: string
          country_code: string
          created_at?: string | null
          is_active?: boolean | null
          occupational_field: string
          owner_id?: string | null
          phone_number: string
          updated_at?: string | null
        }
        Update: {
          address_1?: string
          address_2?: string
          address_city?: string
          address_state?: string
          address_zip?: string
          company_id?: string
          company_name?: string
          country?: string
          country_code?: string
          created_at?: string | null
          is_active?: boolean | null
          occupational_field?: string
          owner_id?: string | null
          phone_number?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      companies_in_user: {
        Row: {
          company_id: string | null
          id: string
          is_active: boolean | null
          user_id: string | null
        }
        Insert: {
          company_id?: string | null
          id?: string
          is_active?: boolean | null
          user_id?: string | null
        }
        Update: {
          company_id?: string | null
          id?: string
          is_active?: boolean | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_in_user_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "companies_in_user_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          company_id: string | null
          created_at: string | null
          employee_id: string
          is_active: boolean | null
          title: string
          updated_at: string | null
          user_id: string | null
          wage: number
          wage_frequency: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          employee_id?: string
          is_active?: boolean | null
          title: string
          updated_at?: string | null
          user_id?: string | null
          wage: number
          wage_frequency: string
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          employee_id?: string
          is_active?: boolean | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
          wage?: number
          wage_frequency?: string
        }
        Relationships: [
          {
            foreignKeyName: "employees_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "employees_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      employees_in_company: {
        Row: {
          company_id: string | null
          employee_id: string | null
          id: string
          is_active: boolean | null
        }
        Insert: {
          company_id?: string | null
          employee_id?: string | null
          id?: string
          is_active?: boolean | null
        }
        Update: {
          company_id?: string | null
          employee_id?: string | null
          id?: string
          is_active?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "employees_in_company_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "employees_in_company_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["employee_id"]
          },
        ]
      }
      test_table: {
        Row: {
          created_at: string | null
          id: string
          number_not_null: number
          number_nullable: number | null
          salary: number
          text_not_null: string
          text_nullable: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          number_not_null: number
          number_nullable?: number | null
          salary: number
          text_not_null: string
          text_nullable?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          number_not_null?: number
          number_nullable?: number | null
          salary?: number
          text_not_null?: string
          text_nullable?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          address_1: string | null
          address_2: string | null
          address_city: string | null
          address_state: string | null
          address_zip: string | null
          country: string | null
          country_code: string | null
          created_at: string | null
          email: string | null
          first_name: string
          id: string
          last_name: string
          password_hash: string | null
          phone_number: string | null
          updated_at: string | null
          user_id: string | null
          user_role: string | null
        }
        Insert: {
          address_1?: string | null
          address_2?: string | null
          address_city?: string | null
          address_state?: string | null
          address_zip?: string | null
          country?: string | null
          country_code?: string | null
          created_at?: string | null
          email?: string | null
          first_name: string
          id?: string
          last_name: string
          password_hash?: string | null
          phone_number?: string | null
          updated_at?: string | null
          user_id?: string | null
          user_role?: string | null
        }
        Update: {
          address_1?: string | null
          address_2?: string | null
          address_city?: string | null
          address_state?: string | null
          address_zip?: string | null
          country?: string | null
          country_code?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string
          id?: string
          last_name?: string
          password_hash?: string | null
          phone_number?: string | null
          updated_at?: string | null
          user_id?: string | null
          user_role?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
