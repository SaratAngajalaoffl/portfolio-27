import { Loader } from "@/components/Loader";
import { Cursor } from "@/components/Cursor";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Stack } from "@/components/Stack";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Loader />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Stack />
        <Contact />
      </main>
    </>
  );
}
