"use client";
import Image from "next/image";

interface ProgramProps {
  title: string;
  subtitle?: string;
  description: string;
  photo: string;
}

export default function PLProgram({ data }: { data: ProgramProps }) {
  const { title, subtitle, photo, description } = data;

  return (
    <section className="py-12 md:py-20 xl:py-[135px]">
      <div className="container">
        <div className="flex flex-col xl:flex-row items-stretch gap-[70px]">
          {/* Left Content */}
          <div className="w-[49%]">
            <h2 className="text-4xl font-light leading-[1.111] mb-[50px] lettersp-2">
              {title}
            </h2>
            {subtitle && (
              <h3 className="text-xl text-black leading-[1.262857142857143] font-light lettersp-2">
                {subtitle}
              </h3>
            )}
            <div className="text-colorpara w-65ch]">
              {description.split("\n").map(
                (line, idx) =>
                  line.trim() && (
                    <p key={idx} className="whitespace-pre-line">
                      <span dangerouslySetInnerHTML={{ __html: line }} />
                    </p>
                  )
              )}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative 2xl:w-[749px] w-full rounded-[12px] overflow-hidden shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
            <Image
              src={photo}
              alt={title}
              fill
              className="object-cover rounded-[12px]"
            />
            <div
              style={{
                background:
                  "linear-gradient(183.56deg, rgba(66, 186, 220, 0) 43.99%, #7E5AA3 116.63%)",
              }}
              className="absolute inset-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
