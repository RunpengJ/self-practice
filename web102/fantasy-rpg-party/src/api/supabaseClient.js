import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY

// Check if environment variables are loaded
if (!SUPABASE_URL) {
  throw new Error('Missing REACT_APP_SUPABASE_URL environment variable')
}

if (!SUPABASE_ANON_KEY) {
  throw new Error('Missing REACT_APP_SUPABASE_ANON_KEY environment variable')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// 创建新成员
export async function createCrewmate(data) {
  const { data: created, error } = await supabase
    .from('crewmates')
    .insert([{
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }])
    .select()
  
  if (error) throw error
  return created[0]
}

// 获取成员列表（按创建时间倒序）
export async function getCrewmates() {
  const { data, error } = await supabase
    .from('crewmates')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data || []
}

// 根据ID获取成员详情
export async function getCrewmateById(id) {
  const { data, error } = await supabase
    .from('crewmates')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}

// 更新成员
export async function updateCrewmate(id, updates) {
  const { data, error } = await supabase
    .from('crewmates')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
  
  if (error) throw error
  return data[0]
}

// 删除成员
export async function deleteCrewmate(id) {
  const { error } = await supabase
    .from('crewmates')
    .delete()
    .eq('id', id)
  
  if (error) throw error
  return true
}

// 检查名字唯一性
export async function checkNameExists(name, excludeId = null) {
  let query = supabase
    .from('crewmates')
    .select('id')
    .eq('name', name)
  
  if (excludeId) {
    query = query.neq('id', excludeId)
  }
  
  const { data, error } = await query
  
  if (error) throw error
  return data && data.length > 0
}