"use client";

import Image from "next/image"; 

const NewsArea = () => {
  return (
    <section className="pb-8 md:pb-12 lg:pb-20 2xl:pb-[135px] pt-[135px] lg:pt-[198px] 2xl:pt-[193px]">
      <div className="container">
        <div>
          <ul className="flex items-center gap-[3px] text-colorpara">
            <li>Home</li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="14"
                viewBox="0 0 15 14"
                fill="none"
              >
                <path
                  d="M5.56836 10.8141L9.64336 7.27455C10.1246 6.85653 10.1246 6.17251 9.64336 5.75449L5.56836 2.21492"
                  stroke="#626262"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </li>
            <li>
              <a href="#">News & Media</a>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="14"
                viewBox="0 0 15 14"
                fill="none"
              >
                <path
                  d="M5.56836 10.8141L9.64336 7.27455C10.1246 6.85653 10.1246 6.17251 9.64336 5.75449L5.56836 2.21492"
                  stroke="#626262"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </li>
            <li className="text-black">Blog</li>
          </ul>
        </div>
        <div className="mt-4 md:mt-6 xl:mt-8 2xl:mt-12 mb-4 md:mb-6 xl:mb-8 2xl:mb-8">
          <h2 className="text-xl md:text-2xl xl:text-3xl 2xl:text-4xl font-light leading-tight text-black lettersp-4">
          How to Choose the Right School for Secondary Education in the UAE
          </h2>
        </div>
        <div className="flex justify-between pl-5">
          <div>
            <ul className="list-disc lg:flex gap-10  text-colorpara text-sm">
              <li>Published in Blog on July 14, 2025</li>
              <li>10 mins read</li>
              <li>Curriculum</li>
            </ul>
          </div>
          <div>
            <Image
              src="/images/newsdetails/share.svg"
              alt=""
              width={19}
              height={22}
            />
          </div>
        </div>
        <div className="py-4 md:py-6 xl:py-8 2xl:py-12">
          <Image
            src="/images/newsdetails/blogbanner.jpg"
            alt=""
            width={1360}
            height={535}
            className="rounded-sm"
          />
        </div>
        <div>
          <p className="text-colorpara text-sm font-light mb-3 lg:mb-7">
          Confused about picking the right school for your child? With many great options, it can be tough. This blog covers key factors to help you choose the best fit for your child’s growth and success.
          </p>
          <p className="text-colorpara text-sm font-light mb-3 lg:mb-7">
Secondary education in the UAE lasts three years and plays a vital role in shaping academic, personal, and social skills. Choosing the right school ensures your child receives the support and opportunities needed for holistic development.
          </p>
          <p className="text-colorpara text-sm font-light mb-3 lg:mb-7">Before we get started on the factors, you need to know the vital qualities of a secondary education school.  </p>
          <p className="text-colorpara text-sm font-light mb-3 lg:mb-7">Here are a few crucial points that’ll help you while making a list of schools in the UAE for your child</p>
          <div className="md:flex gap-7">
          <ul className="list-disc pl-5">
            <li className="text-colorpara text-sm font-light mb-3 lg:mb-7">Skilled and supportive teachers</li>
            <li className="text-colorpara text-sm font-light mb-3 lg:mb-7">Safe and nurturing environment</li>
            </ul>
            <ul className="list-disc pl-5">
            <li className="text-colorpara text-sm font-light mb-3 lg:mb-7">Personalized and engaging learning</li>
            <li className="text-colorpara text-sm font-light mb-3 lg:mb-7">High-quality American or British curriculum</li>   
          </ul>
          </div>
         
         
         
           
          <h3 className="text-[1.3rem] md:text-md xl:text-lg 2xl:text-xl font-light text-black leading-[1.18] 
           pt-2 md:pt-4 2xl:pt-6 mb-4  xl:mb-5 2xl:mb-5">
            Factors to Consider While You Choose the Right School For Secondary Education 
          </h3>
          <div className=" mb-4 md:mb-6 xl:mb-7 ">
            <ul className="list-disc pl-5 pb-3">
              <li className="text-sm font-medium text-black">
              Look for your child’s strengths and learning methods
              </li>
            </ul>
            <p className="text-colorpara text-sm font-light mb-3 lg:mb-7">
            Talk to your child about their interests and goals—these next 4–5 years are key to building values and skills. Understanding their strengths helps guide their academic journey and choose the right secondary school together.
            </p>
          </div>
          <div className=" mb-4 md:mb-6 xl:mb-7 ">
            <ul className="list-disc pl-5 pb-3">
              <li className="text-sm font-medium text-black">
              Academic Facilities
              </li>
            </ul>
            <p className="text-colorpara text-sm font-light mb-3 lg:mb-7">
            Each secondary school offers a unique learning environment and programs. Ensure the school’s facilities and culture align with your child’s interests and support effective teaching and learning.
            </p>
          </div>
          <div >
            <ul className="list-disc pl-5 pb-3">
              <li className="text-sm font-medium text-black">
              Location And Cost
              </li>
            </ul>
            <p className="text-colorpara text-sm font-light mb-3 lg:mb-7">
            Location plays a key role in choosing a school, affecting transport options and daily routines. Also, check after-school activities and safety measures. Consider tuition fees and extra costs for programs, camps, and uniforms when evaluating affordability.
            </p>
          </div>
          <div>
            <ul className="list-disc pl-5 pb-3">
              <li className="text-sm font-medium text-black">
              Extra-curricular Activities
              </li>
            </ul>
            <p className="text-colorpara text-sm font-light mb-3 lg:mb-7"> The UAE has a diverse range of schools that offer different cultural and educational programs. These include music, drama, arts, science, and various career-oriented activities. </p>
            <p className="text-colorpara text-sm font-light mb-3 lg:mb-7"> Try to get an idea of what kind of extra-curricular activities the school offer and how these can help your child’s future. Ensure the availability of clubs and programs that contribute to your child's interests.</p>
            </div>
          <div>
            <ul className="list-disc pl-5 pb-3">
              <li className="text-sm font-medium text-black">
              Prepare A Short List
              </li>
            </ul>
            <p className="text-colorpara text-sm font-light mb-3 lg:mb-7"> Always make a detailed list of schools you wish to look into further. This list will help you get a clear idea of the kind of facilities and programs your child needs.</p>
            <p className="text-colorpara text-sm font-light mb-3 lg:mb-7"> You can even divide them into several categories based on the interests and goals of your child. The categories can align with the management, values, location, costs, academic needs, and teaching standards.</p>
            </div>
          <div>
            <ul className="list-disc pl-5 pb-3">
              <li className="text-sm font-medium text-black">
              Keep Long-Term Goals In Mind
              </li>
            </ul>
            <p className="text-colorpara text-sm font-light "> Choose a school that matches your child's strengths and supports their future goals.
            BEAM schools offer academic excellence, personal growth, and career-focused learning for a well-rounded education.</p>
           </div>
        </div> 
        
        <div className="pt-8 md:pt-12 lg:pt-20 2xl:pt-[135px]"><hr /></div>
      </div>
      <div></div>
    </section>
  );
};

export default NewsArea;
