import { AppHeader } from "../../components/AppHeader";
import { EducationalCard } from "../../components/EducationalCard";
import { lessons } from "../../data/lessons";

// S31 — Learn
export function LearnScreen() {
  return (
    <div className="screen">
      <AppHeader title="Learn" />
      <div className="screen-content">
        <p className="body-text">Short guides to common scams.</p>
        <div className="stack">
          {lessons.map((lesson) => (
            <EducationalCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </div>
    </div>
  );
}
