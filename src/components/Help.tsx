const Help = () => {
  return (
    <div>
      <header className="flex items-center gap-3 rounded-medium border-small border-divider p-4">
        <h2 className="text-medium font-medium text-default-700">Help and Information</h2>
      </header>
      <main className="mt-4 h-full w-full overflow-visible">
        <div className="flex justify-center">
          <iframe className="w-6/12 h-96" src="https://www.youtube.com/embed/SgzdfX9axRc" allow="autoplay; clipboard-write; encrypted-media; gyroscope;" allowFullScreen></iframe>
        </div>
      </main>
    </div>
  );
};

export default Help;
