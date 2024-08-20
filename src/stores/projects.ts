import { create } from 'zustand';
import {Project, ProjectsDTO} from "../types";

const projectsURL = `${import.meta.env.VITE_API_URL}/forwards-dapp/api/v1/projects`;

interface IProjectsState {
  projects: Project[];
  fetch(): Promise<void>;
}

const useProjectsStore = create<IProjectsState>(
  (set) => ({
    projects: [],
    fetch: async () => {
      const response = await fetch(projectsURL).then(res => res.json()) as ProjectsDTO;
      set({ projects: response.data.projects.map(project => ({
          name: project.data.name,
          token: project.token,
          categories: project.data.categories,
          image: project.data.image,
          company: project.company,
          country: project.data.country,
        })) });
    },
  }),
);

export default useProjectsStore;
