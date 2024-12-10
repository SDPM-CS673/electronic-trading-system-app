const About = () => {
  return (
    <section id="about" className="min-h-screen w-full bg-gray-900 text-gray-200 py-16 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        <div className="p-8 rounded-lg bg-gray-800 flex-1">
          <h3 className="text-2xl mb-4 text-white">About Us</h3>
          <p className="text-base leading-relaxed">
            Unitrade is a dynamic and forward-thinking trading platform designed to cater to the needs of traders at all levels.
          </p>
        </div>

        <div className="flex flex-col gap-8 md:w-1/2">
          <div className="p-8 rounded-lg bg-gray-800">
            <h3 className="text-2xl mb-4 text-white">Vision</h3>
            <p className="text-base leading-relaxed">
              To revolutionize global financial markets by empowering traders of all levels with cutting-edge technology.
            </p>
          </div>
          <div className="p-8 rounded-lg bg-gray-800">
            <h3 className="text-2xl mb-4 text-white">Mission</h3>
            <p className="text-base leading-relaxed">
              At Unitrade, our mission is to provide an innovative and user-centric trading platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
