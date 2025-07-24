import { SkillCategory } from "./SkillCategory";
import { proficiencies, skillCategories } from "./skills-data";

export const SkillsSection = () => (
  <section id="skills" className="bg-muted/30 px-4 py-16">
    <div className="mx-auto max-w-6xl space-y-12">
      {/* Header */}
      <header className="text-center space-y-4">
        <h2 className="text-compact-2xl font-bold">Technical Skills</h2>
        <div className="mx-auto h-1 w-16 rounded-full bg-primary" />
        <p className="mx-auto max-w-2xl text-compact-sm text-muted-foreground">
          Technologies and tools I use to build robust, scalable applications
        </p>
      </header>

      {/* Categories */}
      <div className="space-y-10">
        {skillCategories.map(cat => (
          <SkillCategory key={cat.title} category={cat} />
        ))}
      </div>

      {/* Proficiency Overview */}
      <aside className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-6 text-center text-compact-lg font-semibold">
          Proficiency Overview
        </h3>

        <ul className="grid gap-6 md:grid-cols-2">
          {proficiencies.map(p => (
            <li key={p.label} className="space-y-2">
              <div className="flex justify-between text-compact-sm">
                <span>{p.label}</span>
                <span className="font-medium text-primary">{p.percent}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${p.percent}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  </section>
);