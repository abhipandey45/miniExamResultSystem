const SummaryCard = ({
  title,
  value,
}) => {

  return (

    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all">

      <h3 className="text-lg font-medium text-gray-500">

        {title}

      </h3>

      <p className="text-4xl font-bold mt-3 text-slate-800">

        {value}

      </p>

    </div>

  );

};

export default SummaryCard;