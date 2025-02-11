import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-[#142239] p-4 flex items-center gap-2">
      <Image 
        src="/logo.bmp" 
        alt="DES SOLAR PRIVATE LIMITED" 
        // width={60}
        // height={80}
        className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px]"
      />
      <h1 className="text-white text-[13px] sm:text-base lg:text-lg font-semibold">DRS SOLAR PRIVATE LIMITED</h1>
    </header>
  );
};

export default Header; 