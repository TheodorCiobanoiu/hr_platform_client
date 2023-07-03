import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  width: 100%;
  text-align: center;
  padding: 30px 0;
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