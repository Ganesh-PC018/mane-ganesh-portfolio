/*
  Requires: npm i swiper
  Tailwind config: enable corePlugins.aspectRatio = true (for image slides if any)
*/
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import type { FC } from "react";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "./ProjectsSection";

interface CarouselProps {
  projects: Project[];
}

export const ProjectsCarousel: FC<CarouselProps> = ({ projects }) => (
  <Swiper
    spaceBetween={16}
    slidesPerView={1.1}
    breakpoints={{
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }}
  >
    {projects.map(p => (
      <SwiperSlide key={p.title}>
        <ProjectCard {...p} />
      </SwiperSlide>
    ))}
  </Swiper>
);
