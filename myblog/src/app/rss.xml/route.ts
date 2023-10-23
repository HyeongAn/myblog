import { generateRss } from '../data/route.data'

export const GET = async () => {
  const feedXml = await generateRss()

  if (feedXml) {
    return new Response(feedXml, {
      headers: { 'Content-Type': 'application/xml' },
    })
  } else {
    return new Response('Error generating RSS feed', { status: 500 })
  }
}
