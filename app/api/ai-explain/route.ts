import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { BigFishScore } from '@/lib/solana/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(request: NextRequest) {
  try {
    const { bigFishScore, language, tokenSymbol, topHolders } = await request.json();

    if (!bigFishScore) {
      return NextResponse.json(
        { error: 'Big Fish Score data is required' },
        { status: 400 }
      );
    }

    const explanation = await generateAIExplanation(
      bigFishScore,
      language || 'en',
      tokenSymbol || 'Token',
      topHolders || []
    );

    return NextResponse.json({
      success: true,
      explanation,
    });
  } catch (error) {
    console.error('Error generating AI explanation:', error);
    return NextResponse.json(
      { error: 'Failed to generate explanation' },
      { status: 500 }
    );
  }
}

async function generateAIExplanation(
  score: BigFishScore,
  language: string,
  tokenSymbol: string,
  topHolders: any[]
): Promise<string> {
  const lang = language === 'id' ? 'Indonesian' : 'English';

  const top10Percentage = topHolders
    .slice(0, 10)
    .reduce((sum, holder) => sum + (holder.percentage || 0), 0);

  const prompt = `You are BigFishAlert AI, an expert at tracking whales in the crypto ocean.
Respond in ${lang} language ONLY.

Token: ${tokenSymbol}
Big Fish Score: ${score.score}/100

Detailed Metrics:
- Holder Concentration: ${score.holderConcentration.toFixed(1)}/100
  (Top 10 holders own ${top10Percentage.toFixed(1)}% of supply)
- Recent Big Fish Activity: ${score.recentActivity.toFixed(1)}/100
- Liquidity Ocean Depth: ${score.liquidityDepth.toFixed(1)}/100
- Security Score: ${score.securityScore.toFixed(1)}/100
- Volume Anomaly: ${score.volumeAnomaly.toFixed(1)}/100

Using ocean and fishing metaphors, explain in 3-4 SHORT sentences (max 50 words total):

1. Are big fish leaving or staying? 🐋
2. How deep is the liquidity ocean? 🌊
3. Should small fish be worried? 🐟
4. What's happening in this ocean right now?

Style Guidelines:
- Use ocean/fishing metaphors (waves, swimming, depths, currents)
- Be conversational and friendly
- NO technical jargon
- NO financial advice disclaimers
- Keep it SHORT and actionable

Examples of good responses:

English: "Big fish are circling the exit - 3 whales sold $2M today 🔴. The ocean is shallow with low liquidity, so they're making big waves. Small fish should stay near the shore and watch carefully before swimming in."

Indonesian: "Ikan besar sedang berenang keluar - 3 paus jual $2M hari ini 🔴. Lautan dangkal dengan likuiditas rendah, jadi mereka buat ombak besar. Ikan kecil harus tetap dekat pantai dan perhatikan baik-baik sebelum berenang masuk."

Now generate a response for the data above:`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a friendly ocean guide who explains crypto whale movements using simple ocean metaphors. Keep responses under 50 words. Use emojis: 🐋🦈🐬🐟🐠🌊🔴🟡🟢`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    return completion.choices[0]?.message?.content || 'Unable to generate explanation at this time.';
  } catch (error) {
    console.error('OpenAI API error:', error);

    // Fallback explanation if OpenAI fails
    return generateFallbackExplanation(score, language, top10Percentage);
  }
}

/**
 * Fallback explanation if OpenAI API fails
 */
function generateFallbackExplanation(
  score: BigFishScore,
  language: string,
  top10Percentage: number
): string {
  if (language === 'id') {
    if (score.score >= 70) {
      return `Peringatan! Ikan besar sedang berenang keluar 🔴. Top 10 pemegang kontrol ${top10Percentage.toFixed(1)}% supply. Lautan dangkal - hati-hati sebelum masuk!`;
    } else if (score.score >= 50) {
      return `Hati-hati! Ada aktivitas ikan besar 🟡. Top 10 pemegang ${top10Percentage.toFixed(1)}% supply. Perhatikan arus sebelum berenang.`;
    } else {
      return `Perairan tenang 🟢. Ikan besar sedang istirahat. Top 10 pemegang ${top10Percentage.toFixed(1)}% supply. Kondisi cukup aman untuk ikan kecil.`;
    }
  } else {
    if (score.score >= 70) {
      return `Warning! Big fish are swimming away 🔴. Top 10 holders control ${top10Percentage.toFixed(1)}% of supply. Shallow waters - be careful before jumping in!`;
    } else if (score.score >= 50) {
      return `Caution! Big fish activity detected 🟡. Top 10 holders own ${top10Percentage.toFixed(1)}% of supply. Watch the currents before swimming.`;
    } else {
      return `Calm waters 🟢. Big fish are resting. Top 10 holders own ${top10Percentage.toFixed(1)}% of supply. Relatively safe conditions for small fish.`;
    }
  }
}
