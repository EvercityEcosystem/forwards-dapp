import { create } from 'zustand';

const projectsURL = 'https://integrations.api.evercity.dev/forwards-dapp/api/v1/projects';

const useProjectsStore = create(
  (set) => ({
    projects: [],
    fetch: async () => {
      const response = await fetch(projectsURL);
      set({ projects: await response.json() });
    },
  }),
);

export default useProjectsStore;
