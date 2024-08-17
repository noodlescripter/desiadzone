export default function Component() {
    return (
        <div className="w-full py-16">
            <section className="relative h-[500px] bg-gradient-to-r from-[#6366F1] to-[#9333EA] overflow-hidden">
                {/* <img
          src="/placeholder.svg"
          alt="Hero Image"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          width="1200"
          height="500"
          style={{ aspectRatio: "1200/500", objectFit: "cover" }}
        /> */}
                <div className="relative z-10 container mx-auto px-4 md:px-6 h-full flex flex-col items-center justify-center text-center text-primary-foreground">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">About Our Company</h1>
                    <p className="mt-4 max-w-3xl text-lg md:text-xl">
                        Desi Ad Zone is an online marketplace connecting the South Asian community through classified ads. Whether you're buying, selling, or promoting services, our platform makes it easy to reach the right audience. With a user-friendly design and a vibrant, culturally inspired look, Desi Ad Zone is more than just a marketplace—it's a hub for connecting people and opportunities within the Desi community.
                    </p>
                </div>
            </section>
            <section className="py-12 md:py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
                            <p className="mt-4 text-muted-foreground">
                                Our mission at Desi Ad Zone is to empower the South Asian community by providing a seamless platform for connection and opportunity. We aim to create an inclusive space that not only meets needs but also inspires and uplifts our users.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold">Our Values</h2>
                            <p className="mt-4 text-muted-foreground">
                                At Desi Ad Zone, our values guide every action. We prioritize fostering connections, building trust, and empowering our users within the South Asian community. These principles drive our commitment to creating a vibrant, inclusive, and reliable platform for all.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-12 md:py-20 bg-muted">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-center">Meet Our Team</h2>
                    <p className="mt-4 text-center text-muted-foreground">
                        Our team is composed of talented individuals who are passionate about their work and dedicated to our
                        mission.
                    </p>
                    <div className="container content-center text-center">
                    
                        <h3 className="mt-4 text-lg font-semibold">Hamim Alam</h3>
                        <p className="text-muted-foreground">CEO/Developer</p>
                    </div>
                    {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
            <div className="flex flex-col items-center">
              <Avatar className="shadow-xl">
                <AvatarImage src="/placeholder-user.jpg" alt="John Doe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <h3 className="mt-4 text-lg font-semibold">John Doe</h3>
              <p className="text-muted-foreground">CEO</p>
            </div>
            <div className="flex flex-col items-center">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt="Jane Smith" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <h3 className="mt-4 text-lg font-semibold">Jane Smith</h3>
              <p className="text-muted-foreground">CTO</p>
            </div>
            <div className="flex flex-col items-center">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt="Michael Johnson" />
                <AvatarFallback>MJ</AvatarFallback>
              </Avatar>
              <h3 className="mt-4 text-lg font-semibold">Michael Johnson</h3>
              <p className="text-muted-foreground">Head of Engineering</p>
            </div>
            <div className="flex flex-col items-center">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt="Emily Davis" />
                <AvatarFallback>ED</AvatarFallback>
              </Avatar>
              <h3 className="mt-4 text-lg font-semibold">Emily Davis</h3>
              <p className="text-muted-foreground">Head of Design</p>
            </div>
          </div> */}
                </div>
            </section>
        </div>
    )
}