interface Props { msg: string; }
export default function CoachBox({ msg }: Props) {
  return (
    <div style={{ background: '#111', border: '1px solid var(--border)', borderRadius: 8, padding: 11 }}>
      <div style={{ fontSize: '.62rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 4 }}>Coach</div>
      <div style={{ fontSize: '.82rem', lineHeight: 1.5 }}>{msg}</div>
    </div>
  );
}
