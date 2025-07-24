import { Category } from "./skills-data";
import { SkillCard } from "./SkillCard";

interface Props {
  category: Category;
}

export const SkillCategory = ({ category }: Props) => (
  <section className="space-y-4 animate-fade">
    <h3 className="text-compact-lg font-semibold">{category.title}</h3>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {category.skills.map(skill => (
        <SkillCard key={skill.name} skill={skill} />
      ))}
    </div>
  </section>
);
