import Image from "next/image";
const Main = () => {
  return ( 
    <section className="py-20">
      <div className="container">
        <div className="relative overflow-hidden rounded-xl p-10 xl:p-15 2xl:min-h-[635px] flex items-end">
          <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>
          <div className="absolute top-0 left-0 w-[90%] h-full bg-gradient-to-r from-[#066B7F] to-black/0 z-10 opacity-95"></div>
          <Image src="/assets/images/accr-affil/main.jpg" alt="" width={1920} height={1280} className="absolute top-0 left-0 z-0" />
          <div className="relative z-30 text-white">
            <h2 className="text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl leading-[1.111111111111111] mb-5 font-light">Accrediation</h2>
            <p className="font-light max-w-[98ch]">Our schools continually pursue international recognition and seek accreditation to reinforce a commitment to continuous improvement, innovation, and the security of our students and parents. The recognition of New England Association for Schools and Colleges (NEASC) and
              British Schools Overseas (BSO) is a confirmation of high-quality learning in all specific divisions. Having accredited status for our schools provides recognition of the ability to serve the wider community and the world with a focus on quality education.</p>
          </div>
        </div>
      </div>
    </section>
   );
}
 
export default Main;