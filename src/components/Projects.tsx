import { useEffect } from "react";
import useProjectsStore from "../stores/projects";

const Projects = () => {
  const [projectsPayload, fetch] = useProjectsStore((state) => [state.projects, state.fetch]);

  useEffect(() => {
    fetch();
  }, [ fetch ]);

  const projects = projectsPayload?.data?.projects || [];

  return (
    <div>
      <header className="flex items-center gap-3 rounded-medium border-small border-divider p-4">
        <h2 className="text-medium font-medium text-default-700">Projects</h2>
      </header>
      <main className="mt-4 h-full w-full overflow-visible">
        <section id="Projects" className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
          {projects.map((project) => (
            <div className="w-80 relative bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
              <a href="#">
                {project.data.categories.map(((category) => (
                  <div className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3">
                    {category}
                  </div>
                )))}
                <img src={project.data.image} alt="Project" className="h-80 w-80 object-cover rounded-t-xl" />
                <div className="px-4 py-3 w-80">
                  <div className="flex items-center justify-center space-x-2">
                    <img src={project.company.logo} alt="Logo" className="h-6 w-6 object-cover rounded-md" />
                    <span className="text-gray-400 uppercase text-sm">{project.company.name}</span>
                  </div>
                  <p className="text-lg font-bold text-black truncate block capitalize">{project.data.name}</p>
                  <p className="text-sm text-gray-500 cursor-auto my-3">{project.data.country}</p>
                </div>
              </a>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Projects;
