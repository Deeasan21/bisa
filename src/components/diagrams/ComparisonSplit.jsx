import './diagrams.css';

/**
 * ComparisonSplit — side-by-side static reference showing two approaches.
 * Props:
 *   optionA: { title, example, context }
 *   optionB: { title, example, context }
 */
export default function ComparisonSplit({ optionA, optionB }) {
  return (
    <div className="diagram cs-diagram">
      <div className="cs-col">
        <div className="cs-col-title">{optionA.title}</div>
        <div className="cs-col-example">"{optionA.example}"</div>
        <div className="cs-col-context-label">Best when</div>
        <p className="cs-col-context">{optionA.context}</p>
      </div>
      <div className="cs-col">
        <div className="cs-col-title">{optionB.title}</div>
        <div className="cs-col-example">"{optionB.example}"</div>
        <div className="cs-col-context-label">Best when</div>
        <p className="cs-col-context">{optionB.context}</p>
      </div>
    </div>
  );
}
