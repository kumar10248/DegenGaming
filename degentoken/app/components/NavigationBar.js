export default function NavigationBar({
  ConnectToMetamask,
  accounts,
  connected,
  balance,
}) {
  return (
    <div className="bg-black text-white sticky">
      <nav className="bg-transparent text-white shadow-lg">
        <div className=" mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-7">
              <div>
                <a href="#" className="flex items-center py-4 px-2">
                  <img
                    src="./block-.png"
                    alt="Logo"
                    className="h-8 w-8 mr-2 rounded-3xl fill-[#1679AB]"
                  />
                  <span className="font-semibold text-yellow-400 text-lg">
                    {accounts ? accounts : "No Account Connected"}
                  </span>
                </a>
              </div>
              <div className="hidden md:flex items-center space-x-1">
                <a
                  href="#"
                  className="py-4 px-2 text-white font-semibold hover:text-[#1679AB] transition duration-300"
                >
                  Balance : {balance ? balance : "XXX"} DGN Tokens
                </a>
                <div className="relative group">
                  <button className="py-4 px-2 text-white font-semibold hover:text-[#1679AB] transition duration-300">
                    Services
                  </button>
                  <div className="absolute hidden  bg-black shadow-lg w-[30rem] group-hover:flex group-hover:justify-between -left-52 gap-x-5 z-10">
                    <div className="inline-block w-1/2">
                      <div className="mb-6">
                        <p className="text-gray-700 text-start text-md">
                          Services
                        </p>
                      </div>

                      <hr className="col-start-1 col-end-4 w-full h-1 mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700" />
                      <div className="flex justify-between mt-5 items-center">
                        <img
                          src="./right-arrow.png"
                          alt="Logo"
                          className="h-8  mr-2 w-1/12"
                        />
                        <a
                          href="#"
                          className="block px-1 py-2 text-white hover:bg-gray-100 w-11/12 text-sm"
                        >
                          Service 1
                        </a>
                      </div>

                      <div className="flex justify-between">
                        <img
                          src="./right-arrow.png"
                          alt="Logo"
                          className="h-8  mr-2 w-1/12"
                        />
                        <a
                          href="#"
                          className="block px-1 py-2 text-white hover:bg-gray-100 w-11/12 text-sm"
                        >
                          Service 2
                        </a>
                      </div>
                      <div className="flex justify-between">
                        <img
                          src="./right-arrow.png"
                          alt="Logo"
                          className="h-8  mr-2 w-1/12"
                        />
                        <a
                          href="#"
                          className="block px-1 py-2 text-white hover:bg-gray-100 w-11/12 text-sm"
                        >
                          Service 3
                        </a>
                      </div>
                    </div>
                    <div className="bg-black inline-block w-1/2">
                      <div className="mb-6">
                        <p className="text-gray-700 text-start text-md">
                          Services
                        </p>
                      </div>

                      <hr className="col-start-1 col-end-4 w-full h-1 mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700" />
                      <div className="flex justify-between mt-5 items-center">
                        <img
                          src="./right-arrow.png"
                          alt="Logo"
                          className="h-8  mr-2 w-1/12"
                        />
                        <a
                          href="#"
                          className="block px-1 py-2 text-white hover:bg-gray-100 w-11/12 text-sm"
                        >
                          Service 1
                        </a>
                      </div>

                      <div className="flex justify-between">
                        <img
                          src="./right-arrow.png"
                          alt="Logo"
                          className="h-8  mr-2 w-1/12"
                        />
                        <a
                          href="#"
                          className="block px-1 py-2 text-white hover:bg-gray-100 w-11/12 text-sm"
                        >
                          Service 2
                        </a>
                      </div>
                      <div className="flex justify-between">
                        <img
                          src="./right-arrow.png"
                          alt="Logo"
                          className="h-8  mr-2 w-1/12"
                        />
                        <a
                          href="#"
                          className="block px-1 py-2 text-white hover:bg-gray-100 w-11/12 text-sm"
                        >
                          Service 3
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="items-center flex">
              <div className="flex justify-center ml-10">
                <button
                  className="bg-gradient-to-r from-sky-500 to-purple-600 px-3 py-2 rounded-xl"
                  onClick={ConnectToMetamask}
                >
                  {connected ? "Connected" : "Connect To metamask"}
                </button>
              </div>
            </div>

            
          </div>
        </div>
      </nav>
      <hr className="col-start-1 col-end-4 w-full h-0.5 mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700" />
    </div>
  );
}
