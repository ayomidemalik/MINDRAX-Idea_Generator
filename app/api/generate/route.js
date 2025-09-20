import { generateContent } from '@/lib/gemini';

// Content generation prompts
const contentPrompts = {
  blog: (niche) => `Generate 5 creative blog post ideas for the niche: ${niche}. 
  For each idea, provide:
  1. A catchy title
  2. A brief description (1-2 sentences)
  3. 3-4 key points to cover
  4. Suggested target audience

  Format the response with clear line breaks and spacing. Use this exact format for each idea:

  [Number]. Title: 
  [Title Text]

  Description: 
  [Description text]

  Key Points:
  * [Point 1]
  * [Point 2]
  * [Point 3]

  Target Audience: 
  [Audience description]

  ---`,

  tweet: (niche) => `Generate 10 engaging tweet ideas for the niche: ${niche}.
  For each tweet, provide:
  1. The tweet content (280 characters or less)
  2. 2-3 relevant hashtags
  3. Suggested posting time (e.g., morning, afternoon, evening)

  Format each tweet with clear line breaks:

  [Number]. Tweet:
  [Tweet content]

  Hashtags: #[hashtag1] #[hashtag2]

  Best time to post: [time]

  ---`,

  reels: (niche) => `Generate 8 creative Reels/Shorts ideas for Instagram/TikTok/YouTube for the niche: ${niche}.
  For each Reel idea, provide:
  1. A catchy concept/title
  2. Visual description (what to show)
  3. Suggested audio/music type
  4. Caption idea
  5. 3-4 relevant hashtags

  Format each idea with clear line breaks:

  [Number]. Concept: 
  [Concept title]

  Visuals: 
  [Visual description]

  Audio: 
  [Audio type]

  Caption: 
  [Caption text]

  Hashtags: #[hashtag1] #[hashtag2] #[hashtag3]

  ---`,

  carousel: (niche) => `Generate 6 carousel post ideas for Instagram/LinkedIn for the niche: ${niche}.
  For each carousel idea, provide:
  1. Main topic/theme
  2. Number of slides (5-10)
  3. Content outline for each slide
  4. Call-to-action
  5. Relevant hashtags

  Format each idea with clear line breaks:

  [Number]. Topic: 
  [Topic title]

  Slides: [number] slides

  Outline:
  Slide 1: [content]
  Slide 2: [content]
  ...

  CTA: 
  [Call to action]

  Hashtags: #[hashtag1] #[hashtag2] #[hashtag3]

  ---`,

  linkedin: (niche) => `Generate 5 professional LinkedIn post ideas for the niche: ${niche}.
  For each post, provide:
  1. A compelling hook
  2. Main body content (3-5 paragraphs)
  3. A clear call-to-action
  4. 3-5 relevant hashtags

  Format each idea with clear line breaks:

  [Number]. Hook:
  [Hook text]

  Body:
  [Body text]

  CTA:
  [Call to action]

  Hashtags: #[hashtag1] #[hashtag2] #[hashtag3]

  ---`,

  long_form_video: (niche) => `Generate 5 long-form video ideas (e.g., for YouTube) for the niche: ${niche}.
  For each video idea, provide:
  1. A catchy and SEO-friendly title
  2. A brief video description
  3. A 5-7 point video outline
  4. Suggested video length
  5. Target audience

  Format each idea with clear line breaks:

  [Number]. Title:
  [Title text]

  Description:
  [Description text]

  Outline:
  * [Point 1]
  * [Point 2]
  * [Point 3]
  * [Point 4]
  * [Point 5]

  Suggested Length: [e.g., 10-15 minutes]

  Target Audience: [Audience description]

  ---`
};
export async function POST(request) {
  try {
    const { niche, contentType } = await request.json();

    if (!niche || !contentType) {
      return new Response(
        JSON.stringify({ error: 'Niche and content type are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const prompt = contentPrompts[contentType](niche);
    const ideas = await generateContent(prompt);

    return new Response(
      JSON.stringify({ success: true, ideas, contentType, niche }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error generating ideas:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate ideas', message: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}