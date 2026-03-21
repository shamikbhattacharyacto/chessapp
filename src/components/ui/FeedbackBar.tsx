import type { FeedbackType } from '@/lib/types';
interface Props { type: FeedbackType; msg: string; }
const cls: Record<FeedbackType, string> = { success:'fb-success', error:'fb-error', info:'fb-info', empty:'fb-empty' };
export default function FeedbackBar({ type, msg }: Props) {
  return <div className={`feedback-bar ${cls[type]}`}>{msg}</div>;
}
