import React from "react";

const Hero = () => {
  return (
    <div>
    <div className='bg-[url("https://s3-alpha-sig.figma.com/img/2347/b4d9/a701aa174891ae660d7c601823cad922?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=L5e1VLmfvOmGhH4ovklyL3CCTz~821CeykFbJnmlrRynUQj0IPr1Kn58taQPSp-Tb3-lsauW2Nj~McSDXhc3d4FtUPJp42WDYs8xA74v1kNaV74fyhqs~2SHnBH5us4sD9kOr7~qF3BdQ8lj64l8jPdtaKNVhoa7mGCERrWJTbVrqo4G30vPXRBXqFyKG-Tg3SD2gp84D1DIY3dh~Z-7AZv-y0AZIRiFUTRYeeLzqBG519psVl9dFviH3LixOhNrqWu~blAPOJTK-VruMOYjnhd~PEm5heVuau8zRunGO4KQxuAE8s~9zCQQbv6fBSkbXXvmDoeNr3qpnlZhK~B6Hg__")] bg-cover bg-center h-[652px] w-full flex justify-center items-center'>
      <div className="flex flex-col justify-center items-center">
        <span className="font-bold text-4xl">
          Design for you loan <h1 className="text-center">with the Experts</h1>
        </span>
        <p className="px-4 text-center">
          Credora we are here for you likke we should to manage your finance and
          loan through our AI
        </p>
        <button className="bg-white text-[#4B415F] px-12 py-4 rounded-full">
          Get started
        </button>
      </div>
      <div className="invisible md:visible absolute bottom-[-195px] right-3 md:bottom-[-30px] md:right-12 bg-white bg-opacity-60 h-[150px] w-[430px] text-white p-4">
        <h1 className="font-bold text-white">5% Interest</h1>
        <p>
          Discover our dependable loan solutions designed to empower you
          financial journey
        </p>
      </div>
    </div>
    </div>
  );
};

export default Hero;
