import styled from "styled-components";

const OverviewStyledBanner = styled.div`
  background-image: linear-gradient(to right, #a6a6a6, #ffffff);;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 300px;
  width: 100%;
  overflow: hidden;
  z-index: 0;
  margin: 0;
  padding: 0;
`;

const BannerImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
`;

const BannerLogo = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  height: 60px;
  z-index: 2;
`

export const OverviewBanner = () => {
    return (
        <OverviewStyledBanner>
            <BannerImage src={"/Assets/images/overview_banner.png"} alt="Banner"/>
            <BannerLogo src={"/Assets/images/logo-writing.png"} alt="Logo"/>
        </OverviewStyledBanner>
    )
}
