import { useState } from "react";

interface LinkItem {
  text: string;
  href: string;
}

const links: LinkItem[] = [
  { text: "בית", href: "/" },
  { text: "היסטוריה", href: "/history" },
];

const LinksList = () => (
  <>
    {links.map((link) => (
      <a
        key={link.href}
        href={link.href}
        className="px-2.5 right-0 text-2xl md:text-lg text-white font-medium hover:text-white focus:text-white"
      >
        {link.text}
      </a>
    ))}
  </>
);

export function Header() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleDrawerClick = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
    console.log("mobileDrawerOpen", mobileDrawerOpen);
  };

  return (
    <header className="bg-black px-2 xs:px-0 shadow-lg h-[100px] rounded-b-[35px] fixed top-0 w-full">
      <div className="md:container mx-auto flex items-center h-full gap-5 max-sm:justify-end justify-between">
        <div className="text-white right-0 mr-[10px]">רשימת קניות</div>
        {mobileDrawerOpen && (
          <div
            onClick={handleDrawerClick}
            className="bg-black opacity-50 fixed inset-0 z-10"
          />
        )}

        <nav
          className={`lg:transform-none ${
            mobileDrawerOpen ? "translate-x-0" : "translate-x-full"
          }  lg:w-full lg:justify-between justify-start fixed lg:static bg-black h-full lg:h-auto right-0 top-0 transition-transform duration-200 ease-in-out z-20 lg:items-center items-start min-w-[75%] flex flex-col lg:flex-row py-10 px-8 lg:p-0`}
        >
          <div className="text-white">תפריט</div>

          {mobileDrawerOpen && (
            <button
              onClick={handleDrawerClick}
              className="text-[20px] text-white absolute top-0 right-0 mt-4 mr-4"
            >
              X
            </button>
          )}
          <div className="lg:block lg:gap-0 lg:mt-0 flex flex-col gap-5 mt-7">
            <LinksList />
          </div>
        </nav>

        <div
          className="flex items-center space-x-4 lg:hidden"
          onClick={handleDrawerClick}
        >
          <div className="space-y-2 cursor-pointer py-3">
            <span className="block w-8 h-0.5 bg-white"></span>
            <span className="block w-5 h-0.5 bg-white"></span>
          </div>
        </div>
      </div>
    </header>
  );
}
