import { Puff } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex items-center text-center">
      <div className="mx-auto p-6 mt-8">
        <Puff
          visible={true}
          height="100"
          width="100"
          color="#dbeafe"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </div>
  );
};

export default Loader;
