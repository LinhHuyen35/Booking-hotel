import React from "react";
import SectionHero from "../../../components/section-Hero/section-Hero";
import TopDestinations from "../../../components/top-destinations/top-destionations";
import MoreDestinations from "../../../components/more-destinations/more-destinations";
import SearchBar from "../../../components/Search-bar/Search-bar";
import LayoutPrimary from "layouts/LayoutPrimary";

function Home() {
  return (
    <LayoutPrimary>
      <SectionHero />
      <TopDestinations />
      <SearchBar />
      <MoreDestinations />
    </LayoutPrimary>
  );
}

export default Home;
