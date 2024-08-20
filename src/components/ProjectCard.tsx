interface ProjectCardProps {
  categories: string[];
  image: string;
  company: {
    logo: string;
    name: string;
  }
  name: string;
  country: string;
  onClick: () => void;
}

export const ProjectCard = ({
    categories,
    image,
    company,
    name,
  country,
                              onClick
                        }: ProjectCardProps) => {
  return (<div
    className="w-80 relative bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
    onClick={onClick}
  >
    <a href="#">
      {categories.map(((category) => (
        <div className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3">
          {category}
        </div>
      )))}
      <img src={image} alt="Project" className="h-80 w-80 object-cover rounded-t-xl"/>
      <div className="px-4 py-3 w-80">
        <div className="flex items-center justify-center space-x-2">
          <img src={company.logo} alt="Logo" className="h-6 w-6 object-cover rounded-md"/>
          <span className="text-gray-400 uppercase text-sm">{company.name}</span>
        </div>
        <p className="text-lg font-bold text-black truncate block capitalize">{name}</p>
        <p className="text-sm text-gray-500 cursor-auto my-3">{country}</p>
      </div>
    </a>
  </div>)
}
