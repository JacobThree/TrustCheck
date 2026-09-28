export function NextStepCard({ steps, title = "What should I do?" }: { steps: string[]; title?: string }) {
  return (
    <section className="next-steps" aria-labelledby="next-steps-title">
      <h2 id="next-steps-title" className="next-steps-title">
        {title}
      </h2>
      <ol className="next-steps-list">
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </section>
  );
}
