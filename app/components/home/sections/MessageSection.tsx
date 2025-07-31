import React from 'react'
import Image from 'next/image'

const MessageSection = () => {
    return (
        <section className="relative w-full h-full grid grid-cols-2 bg-primary">
            <div className='bg-white'>
                <div className='absolute top-0 left-0 w-full h-full'>
                <div className="container h-full">
                    <div className="grid grid-cols-2 h-full gap-12">
                        <div className='flex flex-col gap-12 h-full justify-center'>
                            <div className='border-b border-[#D3D3D3] pb-5'>
                            <h2 className='text-xl'>Message from the Founder</h2>
                            </div>
                            <div>
                            <h1 className='text-4xl text-black'>Vision of Excellence Rooted in Values</h1>
                            </div>
                            <div className='text-sm flex flex-col gap-6'>
                            <p>It is our promise to nurture and develop ambitious, committed young boys and girls, 
                                men and women, who upon graduation will have preserved their cultural identities and become 
                                confident intellectuals, serving as role models in the modern world today and tomorrow.</p>

                                <p>We remain fully committed to striving for excellence and to do our utmost to ensure delivery of 
                                    the highest quality academics within an environment that fosters traditional values and ethos 
                                    that define our credo.</p>

                                <p>Welcome to Bukhatir Education Advancement and Management (BEAM)</p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div className='bg-[radial-gradient(circle,rgba(66, 186, 220, 1) 0%, rgba(28, 179, 230, 1) 57%)] h-full'>
                <div className='relative mt-[143px]'>
                <Image src="/assets/home/founder.png" alt="Message" width={1920} height={950} className='w-full h-full object-contain'/>
                <div className='absolute flex flex-col gap-1 top-1/3 right-5 z-10'>
                    <h3 className='text-black text-xl'>Salah A. Bukhatir</h3>
                    <p className='text-sm'>Founder & Chairman<br/>BEAM</p>
                </div>
                </div>
            </div>
        </section>
    )
}

export default MessageSection