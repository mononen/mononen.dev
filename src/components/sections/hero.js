import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

import Background from '@components/background';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0;

  @media (max-width: 480px) and (min-height: 700px) {
    padding-bottom: 10vh;
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 10px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Howdy, my name is</h1>;
  const two = <h2 className="big-heading">Alex Mononen.</h2>;
  const three = (
    <h3 className="big-heading">
      I <del>hack</del> reverse engineer stuff.
    </h3>
  );
  const four = (
    <>
      <p>
        I’m a software engineer specializing in devops. Currently, I’m focused on building the
        latest and greatest learning management systems at{' '}
        <a href="https://www.mosaiclearning.com/" target="_blank" rel="noreferrer">
          Mosaic Learning
        </a>
        , hacking Onewheels or taking photos.
      </p>
    </>
  );
  const five = (
    <>
      <a className="email-link" href="/#projects">
        Things I've built!
      </a>{' '}
      <a
        className="email-link"
        href="https://photography.mononen.dev/"
        target="_blank"
        rel="noreferrer"
      >
        Some of my photos!
      </a>
    </>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      <Background />
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 3}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
