import LoadingSpinner from './LoadingSpinner';
import ResultMessage from './ResultMessage';
import { translateExpressionToEmoji } from '../lib/utils';

export default function ResultCard({
  loading,
  expression,
}: {
  loading: boolean;
  expression: string;
}) {
  return (
    <div
      className={`bg-white rounded-xl px-8 py-6 flex gap-6 lg:gap-20 items-center h-[200px] ${
        loading ? 'justify-center' : 'justify-between'
      }`}
    >
      {loading ? (
        <div className="text-amber-300 text-6xl flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <span className="lg:text-[100px] text-6xl">
            {expression && translateExpressionToEmoji(expression)}
          </span>
          <h3 className="text-3xl text-right lg:text-4xl md:text-3xl text-neutral-500 font-secondary">
            <ResultMessage expression={expression} />
          </h3>
        </>
      )}
    </div>
  );
}
