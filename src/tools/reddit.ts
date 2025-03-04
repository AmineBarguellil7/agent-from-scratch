import type { ToolFn } from '../../types'
import z from 'zod'
import fetch from 'node-fetch'

export const redditToolDefinition = {
  name: 'reddit',
  parameters: z.object({}),
  description: 'Get the latest posts from a reddit',
}

type Args = z.infer<typeof redditToolDefinition.parameters>
export const reddit: ToolFn<Args, string> = async ({ toolArgs }) => {
  const { data } = await fetch('https://www.reddit.com/r/nba/.json').then(
    (res) => res.json()
  ) 

  const relevantInfo = data.children.map((child: any) => ({ 
    title: child.data.title,
    url: child.data.url,
    author: child.data.author,
    subreddit: child.data.subreddit_name_prefixed,
    upvotes: child.data.ups,    
  }))   
  

  return JSON.stringify(relevantInfo, null, 2)
}
