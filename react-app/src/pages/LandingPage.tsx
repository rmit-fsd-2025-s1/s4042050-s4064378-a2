import React from "react";
import styled from "styled-components";
import { Page } from "../App";

interface NavButtonProps {
  variant?: "primary" | "secondary" | "disabled";
}

interface FeatureIconProps {
  color?: "blue" | "green" | "purple";
}

const Container = styled.div`
  min-height: 100vh;
  background-color: #ffffff;
`;

const Header = styled.header`
  border-bottom: 1px solid #e5e7eb;
`;

const HeaderContent = styled.div`
  max-width: 1152px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
`;

const HeaderFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoIcon = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: #2563eb;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoText = styled.span`
  color: white;
  font-weight: bold;
  font-size: 0.875rem;
`;

const BrandName = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  color: #111827;
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NavButton = styled.button<NavButtonProps>`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  font-weight: 500;

  ${(props) =>
    props.variant === "primary" &&
    `
    background-color: #2563eb;
    color: white;
    &:hover {
      background-color: #1d4ed8;
    }
  `}

  ${(props) =>
    props.variant === "secondary" &&
    `
    background-color: transparent;
    color: #4b5563;
    &:hover {
      color: #111827;
    }
  `}

  ${(props) =>
    props.variant === "disabled" &&
    `
    background-color: transparent;
    color: #9ca3af;
    border: 1px solid #d1d5db;
    cursor: not-allowed;
  `}
`;

const Main = styled.main``;

const HeroSection = styled.section`
  padding: 4rem 1.5rem;
`;

const HeroContent = styled.div`
  max-width: 896px;
  margin: 0 auto;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 1.5rem;
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const HeroTitleAccent = styled.span`
  display: block;
  color: #2563eb;
`;

const HeroDescription = styled.p`
  font-size: 1.125rem;
  color: #4b5563;
  margin-bottom: 2rem;
`;

const UserGroupsSection = styled.section`
  padding: 3rem 1.5rem;
  background-color: #f9fafb;
`;

const UserGroupsContent = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`;

const UserGroupsGrid = styled.div`
  display: grid;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const UserGroupCard = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 1rem;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  color: #374151;
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  position: relative;

  &:before {
    content: "•";
    position: absolute;
    left: 0;
    color: #2563eb;
    font-weight: bold;
  }
`;

const FeaturesSection = styled.section`
  padding: 3rem 1.5rem;
`;

const FeaturesContent = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: #111827;
  margin-bottom: 2rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FeatureCard = styled.div`
  text-align: center;
  padding: 1rem;
`;

const FeatureIcon = styled.div<FeatureIconProps>`
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  margin: 0 auto 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;

  ${(props) =>
    props.color === "blue" &&
    `
    background-color: #dbeafe;
  `}

  ${(props) =>
    props.color === "green" &&
    `
    background-color: #dcfce7;
  `}

  ${(props) =>
    props.color === "purple" &&
    `
    background-color: #f3e8ff;
  `}
`;

const FeatureTitle = styled.h3`
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
  margin: 0;
`;

const Footer = styled.footer`
  padding: 2rem 1.5rem;
  background-color: #111827;
`;

const FooterContent = styled.div`
  max-width: 1152px;
  margin: 0 auto;
  text-align: center;
`;

const FooterLogoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const FooterLogoIcon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  background-color: #2563eb;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FooterLogoText = styled.span`
  color: white;
  font-weight: bold;
  font-size: 0.75rem;
`;

const FooterBrandName = styled.span`
  color: white;
  font-weight: bold;
`;

const FooterCopyright = styled.p`
  color: #9ca3af;
  font-size: 0.875rem;
  margin: 0;
`;

export const TeachTeamLanding = ({
  navigateTo,
}: {
  navigateTo: (page: Page) => void;
}) => {
  return (
    <Container>
      {/* Header */}
      <Header>
        <HeaderContent>
          <HeaderFlex>
            <LogoSection>
              <LogoIcon>
                <LogoText>TT</LogoText>
              </LogoIcon>
              <BrandName>TeachTeam</BrandName>
            </LogoSection>
            <Navigation>
              <NavButton
                variant="secondary"
                onClick={() => navigateTo("login")}
              >
                Sign In
              </NavButton>
              <NavButton
                variant="primary"
                onClick={() => navigateTo("register")}
              >
                Sign Up
              </NavButton>
              {/* <NavButton variant="disabled" onClick={()=>navigateTo('login')}>Sign Out</NavButton> */}
            </Navigation>
          </HeaderFlex>
        </HeaderContent>
      </Header>

      {/* Main Content */}
      <Main>
        {/* Hero Section */}
        <HeroSection>
          <HeroContent>
            <HeroTitle>
              Computer Science Tutor Selection System
              {/* <HeroTitleAccent>Selection System</HeroTitleAccent> */}
            </HeroTitle>
            <HeroDescription>
              Connect qualified tutors with courses. Streamline applications and
              selections.
            </HeroDescription>
          </HeroContent>
        </HeroSection>

        {/* User Groups */}
        <UserGroupsSection>
          <UserGroupsContent>
            <UserGroupsGrid>
              <UserGroupCard>
                <CardTitle>For Tutor Applicants</CardTitle>
                <FeatureList>
                  <FeatureItem>
                    Apply for tutor and lab-assistant roles
                  </FeatureItem>
                  <FeatureItem>
                    List academic credentials and experience
                  </FeatureItem>
                  <FeatureItem>Specify availability and skills</FeatureItem>
                  <FeatureItem>Select from courses</FeatureItem>
                </FeatureList>
              </UserGroupCard>

              <UserGroupCard>
                <CardTitle>For Lecturers</CardTitle>
                <FeatureList>
                  <FeatureItem>Review applicants by course</FeatureItem>
                  <FeatureItem>Search and filter candidates</FeatureItem>
                  <FeatureItem>Select and rank preferences</FeatureItem>
                  <FeatureItem>Add comments on profiles</FeatureItem>
                </FeatureList>
              </UserGroupCard>
            </UserGroupsGrid>
          </UserGroupsContent>
        </UserGroupsSection>

        {/* Features */}
        <FeaturesSection>
          <FeaturesContent>
            <SectionTitle>Key Features</SectionTitle>
            <FeaturesGrid>
              <FeatureCard>
                <FeatureIcon color="blue">🔍</FeatureIcon>
                <FeatureTitle>Advanced Search</FeatureTitle>
                <FeatureDescription>
                  Filter by course, name, skills, and availability
                </FeatureDescription>
              </FeatureCard>

              <FeatureCard>
                <FeatureIcon color="green">📊</FeatureIcon>
                <FeatureTitle>Visual Analytics</FeatureTitle>
                <FeatureDescription>
                  View selection statistics and trends
                </FeatureDescription>
              </FeatureCard>

              <FeatureCard>
                <FeatureIcon color="purple">⭐</FeatureIcon>
                <FeatureTitle>Ranking System</FeatureTitle>
                <FeatureDescription>
                  Rank candidates and leave feedback
                </FeatureDescription>
              </FeatureCard>
            </FeaturesGrid>
          </FeaturesContent>
        </FeaturesSection>
      </Main>

      {/* Footer */}
      <Footer>
        <FooterContent>
          <FooterLogoSection>
            <FooterLogoIcon>
              <FooterLogoText>TT</FooterLogoText>
            </FooterLogoIcon>
            <FooterBrandName>TeachTeam</FooterBrandName>
          </FooterLogoSection>
          <FooterCopyright>
            &copy; 2025 TeachTeam - School of Computer Science Tutor Selection
            System
          </FooterCopyright>
        </FooterContent>
      </Footer>
    </Container>
  );
};
