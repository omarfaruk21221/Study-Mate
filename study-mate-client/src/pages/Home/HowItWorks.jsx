import steps from "../../../public/steps.json";

const HowItWorks = () => {
  return (
    <div className="py-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center ">
      {steps.map(({ id, title, description, iconUrl, iconColor }) => (
        <div
          key={id}
          className="p-6 rounded-lg shadow-xl shadow-primary/30 hover:shadow-lg bg-base-100 hover:bg-base-300 hover:scale-110 transform translate-2 ease-in-out"
        >
          <img
            src={iconUrl}
            alt={`${title} icon`}
            className="w-10 h-10 mb-3"
            style={{ filter: `drop-shadow(0 0 2px ${iconColor})` }}
          />
          <h3 className="text-xl text-primary/80 font-semibold mb-3">
            {title}
          </h3>
          <p className="text-primary/40">{description}</p>
        </div>
      ))}
    </div>
  );
};

export default HowItWorks;
