const Support = () => {
  return (
    <div>
      <h3 className="text-2xl mb-5">More than Artificial Intelligence </h3>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1 squircle p-6 max-w-xl dark:bg-dark-el-1  bg-orange-800/[0.08]">
          <h6 className="text-xl mb-2">Contact us via mail!</h6>
          <p className="dark:text-[#8D7160] text-orange-950 mb-6">
            We offer translation support to all companies in need. Contact us
            and we will get the job done.
          </p>
          <button className="px-4 py-2 bg-[#EB5A00] squircle hover:-translate-y-[2px]  active:-translate-y-[1px] transition-transform font-medium text-white">
            Write an E-Mail
          </button>
        </div>
        <div className="flex-1 squircle p-6 max-w-xl dark:bg-dark-el-1 bg-orange-800/[0.08]">
          <h6 className="text-xl mb-2">Call our support helpline!</h6>
          <p className="dark:text-[#8D7160] text-orange-950 mb-6">
            Do you depend on time? We are available to you 7 days a week.
          </p>
          <button className="px-4 py-2 bg-[#EB5A00] squircle hover:-translate-y-[2px]  active:-translate-y-[1px] transition-transform font-medium  text-white">
            Give us a call
          </button>
        </div>
      </div>
    </div>
  );
};

export default Support;
