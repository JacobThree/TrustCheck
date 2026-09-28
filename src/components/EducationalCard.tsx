import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import type { Lesson } from "../types/trustcheck";

export function EducationalCard({ lesson }: { lesson: Lesson }) {
  return (
    <Link to={`/prototype/learn/${lesson.id}`} className="card card-link">
      <span className="card-body">
        <span className="card-title">{lesson.title}</span>
        <span className="card-text">{lesson.summary}</span>
      </span>
      <ChevronRight aria-hidden size={20} className="card-chevron" />
    </Link>
  );
}
