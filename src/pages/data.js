import Head from "next/head";
import NavbarSection from "@/components/Navbar/Navbar";
import GetAllData from "@/components/Data/GetAllData";

export default function Data() {
  return (
    <>
      <Head>
        <title>Portofolio | Rizky Prayatman</title>
        <meta
          name="description"
          content="Portofolio Web Personal Rizky Prayatman"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/static/icon/logoRP.png" />
      </Head>
      <NavbarSection />
      <GetAllData />
    </>
  );
}
