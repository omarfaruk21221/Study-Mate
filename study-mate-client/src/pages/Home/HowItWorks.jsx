import steps from "../../../public/steps.json";

const HowItWorks = () => {
  return (
    <div className="py-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center ">
      {steps.map(({ id, title, description, iconUrl, iconColor }) => (
        <div
          key={id}
          className=" p-6 border-2 border-primary rounded-lg shadow-xl hover:shadow-lg transition hover:bg-primary-content   hover:scale-115"
        >
          <img
            src={iconUrl}
            alt={`${title} icon`}
            className="w-10 h-10 mb-3"
            style={{ filter: `drop-shadow(0 0 2px ${iconColor})` }}
          />
          <h3 className="text-xl font-semibold mb-3 text-base-200">{title}</h3>
          <p className="text-base-300">{description}</p>
        </div>
      ))}
    </div>
  );
};

export default HowItWorks;
