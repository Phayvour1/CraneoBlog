
import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'your_project_id',
  dataset: 'production',
  apiVersion: '2024-11-14',
  useCdn: true,
})
