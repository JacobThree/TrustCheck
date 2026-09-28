import { Navigate, useParams } from "react-router";
import { AppHeader } from "../../components/AppHeader";
import { SecondaryButton } from "../../components/Button";
import { NextStepCard } from "../../components/NextStepCard";
import { getLesson } from "../../data/lessons";

// S32 — Scam lesson detail
export function LessonDetailScreen() {
  const lesson = getLesson(useParams().topicId);
  if (!lesson) return <Navigate to="/prototype/learn" replace />;

  return (
    <div className="screen">
      <AppHeader title={lesson.title} back="/prototype/learn" />
      <div className="screen-content">
        <p className="body-text">{lesson.summary}</p>
        <p className="field-label">Example</p>
        <blockquote className="quote-box">{lesson.example}</blockquote>
        <h2 className="section-title">Warning signs</h2>
        <ul className="bullet-list">
          {lesson.warningSigns.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <NextStepCard steps={lesson.whatToDo} />
      </div>
      <div className="screen-footer">
        <SecondaryButton to="/prototype/learn">Back to Learn</SecondaryButton>
      </div>
    </div>
  );
}
