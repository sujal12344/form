import Image from 'next/image';

const Header = () => {
  return (
    <header className="bg-[#142239] p-4 flex items-center gap-2">
      <Image src="/logo.bmp" alt="DES SOLAR PRIVATE LIMITED" width={innerWidth < 768 ? 40 : 60} height={innerWidth < 768 ? 60 : 80} />
      <h1 className="text-white text-[13px] sm:text-base lg:text-lg font-semibold">DRS SOLAR PRIVATE LIMITED</h1>
    </header>
  );
};

export default Header; 