import { supabase, TABLES } from '../config/supabase'

export const mediaService = {
  async getAnimationAssets() {
    try {
      const { data, error } = await supabase
        .from(TABLES.MEDIA_ASSETS)
        .select('*')
        .eq('type', 'animation')
        .order('order_num', { ascending: true })
        .limit(8)

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching animation assets:', error)
      return { data: null, error }
    }
  }
}