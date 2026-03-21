interface Props { msg: string; }
export default function CoachBox({ msg }: Props) {
  return <div className="coach-box">{msg}</div>;
}
