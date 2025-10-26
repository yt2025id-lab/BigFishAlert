import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(request: NextRequest) {
  try {
    const { topHolders, tokenData, language = 'en' } = await request.json();

    if (!topHolders || topHolders.length === 0) {
      return NextResponse.json(
        { error: 'Holder data required for prediction' },
        { status: 400 }
      );
    }

    const prediction = await generateWhalePrediction(
      topHolders,
      tokenData,
      language
    );

    return NextResponse.json({
      success: true,
      prediction,
    });
  } catch (error) {
    console.error('Error generating whale prediction:', error);
    return NextResponse.json(
      { error: 'Failed to generate prediction' },
      { status: 500 }
    );
  }
}

async function generateWhalePrediction(
  topHolders: any[],
  tokenData: any,
  language: string
): Promise<any> {
  const lang = language === 'id' ? 'Indonesian' : 'English';

  // Calculate whale metrics
  const top3Concentration = topHolders
    .slice(0, 3)
    .reduce((sum, h) => sum + (h.percentage || 0), 0);

  const top10Concentration = topHolders
    .slice(0, 10)
    .reduce((sum, h) => sum + (h.percentage || 0), 0);

  const biggestWhale = topHolders[0];
  const whalePercentage = biggestWhale?.percentage || 0;

  // Analyze risk factors
  const riskFactors = [];

  if (whalePercentage > 20) {
    riskFactors.push(`Single whale owns ${whalePercentage.toFixed(1)}% - HIGH RISK`);
  }

  if (top3Concentration > 50) {
    riskFactors.push(`Top 3 whales control ${top3Concentration.toFixed(1)}% - DANGER ZONE`);
  }

  if (tokenData.liquidity < 100000) {
    riskFactors.push(`Low liquidity ($${(tokenData.liquidity / 1000).toFixed(0)}K) - Easy to manipulate`);
  }

  const prompt = `You are an AI whale behavior analyst for BigFishAlert.
Respond in ${lang} language ONLY.

WHALE DATA ANALYSIS:
═══════════════════════════════════════

Top Whale Holdings:
🐋 Whale #1: ${whalePercentage.toFixed(1)}% of supply
🦈 Whale #2: ${topHolders[1]?.percentage?.toFixed(1) || 0}% of supply
🦈 Whale #3: ${topHolders[2]?.percentage?.toFixed(1) || 0}% of supply

Concentration Metrics:
• Top 3 whales: ${top3Concentration.toFixed(1)}%
• Top 10 whales: ${top10Concentration.toFixed(1)}%

Market Conditions:
• Liquidity: $${(tokenData.liquidity || 0).toLocaleString()}
• Volume 24h: $${(tokenData.volume24h || 0).toLocaleString()}
• Price: $${tokenData.price || 0}

Risk Factors Detected:
${riskFactors.join('\n')}

YOUR TASK:
═══════════════════════════════════════

As an expert whale tracker, predict:

1. **Dump Probability (0-100%)**: How likely will top whale dump in next 24-48h?
2. **Action Prediction**: What will whale most likely do? (HOLD/SELL PARTIAL/DUMP ALL)
3. **Trigger Point**: At what price/percentage would whale likely exit?
4. **Timeframe**: When (hours/days)?
5. **Confidence**: How confident are you? (LOW/MEDIUM/HIGH)

Format your response as JSON:
{
  "dumpProbability": 75,
  "predictedAction": "SELL PARTIAL",
  "triggerPoint": "If holdings reach 15% or price pumps 50%",
  "timeframe": "24-48 hours",
  "confidence": "HIGH",
  "reasoning": "Whale owns dangerous amount (${whalePercentage.toFixed(1)}%). Historical patterns show whales this size typically take profits at...",
  "recommendation": "Set stop-loss at...",
  "signals": ["Signal 1", "Signal 2"]
}

Think like a professional whale watcher. Be specific. Use data to support your prediction.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a professional whale behavior analyst with 10 years experience tracking crypto whales. You analyze on-chain data to predict whale movements. You ALWAYS respond with valid JSON only, no markdown formatting.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3, // Lower temp for more consistent predictions
      max_tokens: 500,
      response_format: { type: "json_object" }, // Force JSON response
    });

    const rawResponse = completion.choices[0]?.message?.content || '{}';

    // Parse JSON response
    const prediction = JSON.parse(rawResponse);

    return {
      ...prediction,
      generated: true,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('OpenAI API error:', error);

    // Fallback prediction based on simple heuristics
    return generateFallbackPrediction(
      whalePercentage,
      top3Concentration,
      tokenData.liquidity,
      language
    );
  }
}

/**
 * Fallback prediction if OpenAI fails
 */
function generateFallbackPrediction(
  whalePercentage: number,
  top3: number,
  liquidity: number,
  language: string
): any {
  const isEnglish = language === 'en';

  // Simple heuristic-based prediction
  let dumpProbability = 0;
  let action = 'HOLD';
  let confidence = 'MEDIUM';
  let reasoning = '';
  let recommendation = '';

  if (whalePercentage > 30 || top3 > 70) {
    dumpProbability = 85;
    action = 'DUMP LIKELY';
    confidence = 'HIGH';
    reasoning = isEnglish
      ? `Extreme concentration detected. Top whale owns ${whalePercentage.toFixed(1)}% which is VERY HIGH RISK.`
      : `Konsentrasi ekstrim terdeteksi. Paus teratas punya ${whalePercentage.toFixed(1)}% yang SANGAT BERISIKO.`;
    recommendation = isEnglish
      ? 'Exit position or set tight stop-loss (-15%)'
      : 'Exit posisi atau set stop-loss ketat (-15%)';
  } else if (whalePercentage > 15 || top3 > 50) {
    dumpProbability = 60;
    action = 'SELL PARTIAL';
    confidence = 'MEDIUM';
    reasoning = isEnglish
      ? `High whale concentration (${whalePercentage.toFixed(1)}%). Whales may take profits soon.`
      : `Konsentrasi paus tinggi (${whalePercentage.toFixed(1)}%). Paus mungkin ambil profit segera.`;
    recommendation = isEnglish
      ? 'Monitor closely, set stop-loss at -20%'
      : 'Monitor ketat, set stop-loss di -20%';
  } else {
    dumpProbability = 25;
    action = 'HOLD';
    confidence = 'LOW';
    reasoning = isEnglish
      ? `Whale distribution looks relatively healthy (${whalePercentage.toFixed(1)}%).`
      : `Distribusi paus terlihat relatif sehat (${whalePercentage.toFixed(1)}%).`;
    recommendation = isEnglish
      ? 'Normal risk level, standard position sizing'
      : 'Tingkat risiko normal, sizing posisi standar';
  }

  return {
    dumpProbability,
    predictedAction: action,
    triggerPoint: isEnglish
      ? `If whale holdings reach ${(whalePercentage + 5).toFixed(0)}% or price pumps 50%`
      : `Jika holdings paus mencapai ${(whalePercentage + 5).toFixed(0)}% atau harga pump 50%`,
    timeframe: '24-72 hours',
    confidence,
    reasoning,
    recommendation,
    signals: [
      isEnglish ? `Whale owns ${whalePercentage.toFixed(1)}%` : `Paus punya ${whalePercentage.toFixed(1)}%`,
      isEnglish
        ? `Liquidity: $${(liquidity / 1000).toFixed(0)}K`
        : `Likuiditas: $${(liquidity / 1000).toFixed(0)}K`,
    ],
    generated: false, // Fallback prediction
    timestamp: new Date().toISOString(),
  };
}
