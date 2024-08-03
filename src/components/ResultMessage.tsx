export default function ResultMessage({ expression }: { expression: string }) {
  const message: {
    [key: string]: JSX.Element;
  } = {
    happy: (
      <>
        Você está <span className="text-black">feliz</span>. Aproveite!
      </>
    ),
    sad: (
      <>
        Você está um pouco <span className="text-black">triste</span> hoje...
      </>
    ),
    angry: (
      <>
        Por que a expressão <span className="text-black">brava?</span>
      </>
    ),
    surprised: (
      <>
        Parece que há alguma <span className="text-black">surpresa</span> por
        aí!
      </>
    ),
    neutral: (
      <>
        Você está <span className="text-black">neutro</span>.
      </>
    ),
    disgusted: (
      <>
        Sua expressão é <span className="text-black">enjoada</span>
      </>
    ),
    fearful: (
      <>
        Do que você tem <span className="text-black">medo</span>
      </>
    ),
  };

  return <>{message[expression]}</>;
}
