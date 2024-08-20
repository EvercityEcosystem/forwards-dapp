import {useEffect, useState} from "react";
import useProjectsStore from "../stores/projects";
import {ProjectCard} from "./ProjectCard";
import { BuyNFTModal } from "./BuyNFTModal";
import usePurchaseForwardStore from "../stores/purchaseForwardStore";
import {Project} from "../types";

const Projects = () => {
  const [openBuyModal, setOpenBuyModal] = useState(false);
  const [projects, fetch] = useProjectsStore((state) => [state.projects, state.fetch]);
  const selectProject = usePurchaseForwardStore((state) => state.selectProject)

  useEffect(() => {
    fetch();
  }, [ fetch ]);


  const onClickProject = (project: Project) => {
    selectProject(project);
    setOpenBuyModal(true);
  };


  return (<>
    <div>
      <header className="flex items-center gap-3 rounded-medium border-small border-divider p-4">
        <h2 className="text-medium font-medium text-default-700">Forwards</h2>
      </header>
      <main className="mt-4 h-full w-full overflow-visible">
        <section id="Projects" className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
          {projects.map((project) => (
            <ProjectCard
              onClick={() => onClickProject(project)}
              categories={project.categories}
                         image={project.image}
                         company={project.company}
                         name={project.name}
                         country={project.country}
            />))}
        </section>
      </main>
    </div>
      <BuyNFTModal
        isOpen={openBuyModal}
        onOpenChange={(value) => setOpenBuyModal(value)}
      />
    </>
  );
};

export default Projects;
