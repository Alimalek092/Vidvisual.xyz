import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Vid Visual — AI YouTube Video Summarizer & Mind Map Generator';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0f172a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 60px',
          fontFamily: 'sans-serif',
          color: '#ffffff',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(43,89,224,0.25)',
            border: '2px solid #2b59e0',
            borderRadius: '999px',
            padding: '8px 24px',
            fontSize: 22,
            fontWeight: 700,
            color: '#7aa2ff',
            marginBottom: 20,
          }}
        >
          ⚡ #1 AI YouTube Video Summarizer & Mind Map Maker
        </div>

        <div
          style={{
            fontSize: 60,
            fontWeight: 900,
            textAlign: 'center',
            lineHeight: 1.12,
            letterSpacing: '-0.02em',
            maxWidth: '1050px',
            marginBottom: 18,
          }}
        >
          Turn YouTube Videos into Visual Mind Maps
        </div>

        <div
          style={{
            fontSize: 26,
            color: '#94a3b8',
            textAlign: 'center',
            maxWidth: '850px',
            marginBottom: 36,
          }}
        >
          Whiteboard concept cards, knowledge graphs, and actionable takeaways in under 60 seconds.
        </div>

        <div
          style={{
            display: 'flex',
            gap: 16,
            alignItems: 'center',
          }}
        >
          <div
            style={{
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '12px',
              padding: '10px 22px',
              fontSize: 20,
              fontWeight: 600,
              color: '#38bdf8',
            }}
          >
            🧠 Interactive Mind Maps
          </div>
          <div
            style={{
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '12px',
              padding: '10px 22px',
              fontSize: 20,
              fontWeight: 600,
              color: '#4ade80',
            }}
          >
            📋 Whiteboard Concept Cards
          </div>
          <div
            style={{
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '12px',
              padding: '10px 22px',
              fontSize: 20,
              fontWeight: 600,
              color: '#fbbf24',
            }}
          >
            📥 HD PNG & Vector PDF Export
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 26,
            fontSize: 22,
            fontWeight: 800,
            color: '#64748b',
          }}
        >
          vidvisual.xyz
        </div>
      </div>
    ),
    { ...size }
  );
}
