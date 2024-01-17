import Head from "next/head";
import NavbarSection from "@/components/Navbar/Navbar";
import Beranda from "@/components/Beranda/Beranda";

export default function Home() {
  return (
    <>
      <Head>
        <title>Get and Filter Data</title>
        <meta name="description" content="Get and Filter Data" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/static/icon/logoRP.png" />
      </Head>
      <NavbarSection />
      <Beranda />
    </>
  );
}
