import { Skill } from "./skills-data";
import { useState } from "react";

interface Props {
  skill: Skill;
}

export const SkillCard = ({ skill }: Props) => {
  const [hovered, setHovered] = useState(false);
  const Icon = skill.icon;

  return (
    <div
      className="relative flex flex-col items-center text-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}   // keyboard focusable
      role="button"
      aria-label={skill.name}
    >
      <Icon className="w-5 h-5 iconWrapper" />
      <span className="mt-1 text-compact-xs font-medium">{skill.name}</span>

      {hovered && (
        <div
          role="status"
          className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded border bg-popover px-2 py-1 text-compact-xs shadow-md transition-opacity duration-200"
        >
          {skill.description}
          <div className="tooltip-arrow absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-t-popover border-transparent" />
        </div>
      )}
    </div>
  );
};
