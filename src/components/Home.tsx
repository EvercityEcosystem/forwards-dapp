import { Progress } from "@nextui-org/react";

const HomePage = () => {
  return (
    <div>
      <header className="flex items-center gap-3 rounded-medium border-small border-divider p-4">
        <h2 className="text-medium font-medium text-default-700">My NFTs</h2>
      </header>
      <main className="mt-4 h-full w-full overflow-visible">
        <section id="My NFTs" className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
          <div className="w-80 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
            <a href="#">
              <img src="https://images.squarespace-cdn.com/content/v1/63cff903cdb4f654e3f85dde/ac79f2bc-b760-4220-a541-b45fc5887a3e/pexels-scott-gudahl-5109343.jpg?format=1280w" alt="Product" className="h-80 w-80 object-cover rounded-t-xl" />
              <div className="px-4 py-3 w-80">
                <span className="text-gray-400 mr-3 uppercase text-xs">Forwards Collection</span>
                <p className="text-lg font-bold text-black truncate block capitalize">Montana Trees</p>
                <p className="text-sm font-semibold text-gray-500 cursor-auto my-3">Next level: 30tCO2</p>
                <div className="flex items-center">
                  <Progress aria-label="Loading..." value={60} className="max-w-sm"/>
                </div>
              </div>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
