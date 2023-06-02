import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: 20px 0;
`;

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <FooterContainer>
            Copyright &copy; HR Platform {currentYear}
        </FooterContainer>
    );
};

export default Footer;