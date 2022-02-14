import React from "react";
import { Link } from "wouter";
import "styled-components/macro";
import { a } from "@react-spring/web";
import styled from "styled-components";

const Container = styled(a.div)`
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const ContentContainer = styled(a.div)`
  margin-inline-start: auto;
  margin-inline-end: auto;
  width: 100%;
  max-width: 1200px;
  height: 100%;
`;
const Jumbo = styled.div`
  white-space: pre;
  margin-bottom: 2.5rem;
  font-size: 7em;
  font-weight: 800;
  letter-spacing: -4px;
`;

const NavRight = styled(a.div)`
  position: absolute;
  right: 50px;
  top: 50px;
  color: #fffffe;
`;

const Box = styled(a.div)`
  position: absolute;
  transform: translate3d(-50%, -42%, 0);
  will-change: opacity;
`;

const Line = styled(a.div)`
  position: relative;
  width: 100%;
  will-change: transform;
  overflow: hidden;
  line-height: 1.2em;
`;

const Cover = styled(a.div)`
  position: absolute;
  will-change: background, transform;
  top: 0;
  left: 0;
  width: 120%;
  height: 120%;
`;

function Nav(props) {
  return (
    <>
      <NavRight {...props}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/Projects">Projects</Link>
      </NavRight>
    </>
  );
}
const HeroDiv = styled(a.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const LandingDiv = styled(HeroDiv)`
  width: 100%;
  /* height: 100%; */
  align-items: flex-start;
`;
const AboutDiv = styled.div`
  display: flex;

  flex-direction: column;
  width: 50%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Paragraph = styled.span`
  color: #94a1b2;
  font-size: 1.2rem;
`;
const Heading = styled.h1`
  color: #fffffe;
  font-weight: 900;
  font-size: 3rem;
`;
const Button = styled.span`
  border-radius: 50px;
  background: ${({ primary }) => (primary ? "#7f5af0" : "#010606")};
  white-space: nowrap;
  padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
  color: ${({ dark }) => (dark ? "#010606" : "#fff")};
  font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
  outline: none;
  border: none;
  /* cursor: init; */
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  /* &:hover {
    transition: all 0.2s ease-in-out;
    background: ${({
    primary,
  }) => (primary ? "#94a1b2" : "#63FFF0")};
  } */
`;
export {
  Container,
  Jumbo,
  Nav,
  Box,
  Line,
  Cover,
  HeroDiv,
  LandingDiv,
  ContentContainer,
  Paragraph,
  Heading,
  Button,
  AboutDiv,
};
