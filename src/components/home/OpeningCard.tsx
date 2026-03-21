'use client';
import Link from 'next/link';
import MiniBoard from '@/components/board/MiniBoard';
import type { Opening } from '@/lib/types';

interface Props { opening: Opening; }

export default function OpeningCard({ opening }: Props) {
  return (
    <Link href={`/opening/${opening.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 11, cursor: 'pointer', overflow: 'hidden', transition: 'transform .14s, border-color .14s, box-shadow .14s' }}
        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--purple)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'; }}
      >
        <div style={{ background: '#111', padding: 8, display: 'flex', justifyContent: 'center' }}>
          <MiniBoard moves={opening.moves} />
        </div>
        <div style={{ padding: '11px 13px 13px' }}>
          <h3 style={{ fontSize: '.92rem', fontWeight: 600, marginBottom: 3 }}>{opening.name}</h3>
          <p style={{ fontSize: '.73rem', color: 'var(--muted)', lineHeight: 1.4, marginBottom: 9 }}>{opening.desc}</p>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            <span style={{ fontSize: '.67rem', padding: '2px 8px', borderRadius: 999, fontWeight: 500, background: 'var(--purple-dim)', color: 'var(--purple-light)' }}>{opening.lines} lines</span>
            <span style={{ fontSize: '.67rem', padding: '2px 8px', borderRadius: 999, fontWeight: 500, background: '#252525', color: 'var(--muted)' }}>{opening.moves.length} moves</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
