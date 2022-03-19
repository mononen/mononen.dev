import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { IconSphere } from '@components/icons';

import anime from 'animejs';

const StyledSphere = styled.div`
  .animation-wrapper {
    width: 50%;
    padding-bottom: 50%;
  }

  .sphere-animation {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 580px;
    height: 580px;
    margin: -290px 0 0 -290px;
  }

  .sphere path {
    fill: url(#sphereGradient);
    stroke-width: 1px;
    stroke: rgba(80, 80, 80, 0.35);
    backface-visibility: hidden;
  }

  @media (min-width: 500px) {
    .sphere path {
      stroke-width: 0.4px;
    }
  }

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  .logo-wrapper {
    // width: max-content;
    max-width: 800px;
    height: 100%;
    opacity: 1;
    top: 0;
    left: 0;
    svg {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      fill: none;
      user-select: none;
    }
  }
`;

const Background = () => {
  function fitElementToParent(el, padding) {
    var timeout = null;
    function resize() {
      if (timeout) clearTimeout(timeout);
      anime.set(el, { scale: 1 });
      var pad = padding || 0;
      var parentEl = el.parentNode;
      var elOffsetWidth = el.offsetWidth - pad;
      var parentOffsetWidth = parentEl.offsetWidth;
      var ratio = parentOffsetWidth / elOffsetWidth;
      timeout = setTimeout(anime.set(el, { scale: ratio }), 10);
    }
    resize();
    window.addEventListener('resize', resize);
  }

  const animate = () => {
    var sphereEl = document.querySelector('.sphere-animation');
    var spherePathEls = sphereEl.querySelectorAll('.sphere path');
    var pathLength = spherePathEls.length;
    var hasStarted = false;
    var aimations = [];

    fitElementToParent(sphereEl);

    var breathAnimation = anime({
      begin: function () {
        for (var i = 0; i < pathLength; i++) {
          aimations.push(
            anime({
              targets: spherePathEls[i],
              // green and light grey stroke
              stroke: { value: ['#64ffda', 'rgba(80,80,80,.35)'], duration: 500 },
              translateX: [2, -4],
              translateY: [2, -4],
              easing: 'easeOutQuad',
              autoplay: false,
            }),
          );
        }
      },
      update: function (ins) {
        aimations.forEach(function (animation, i) {
          var percent = (1 - Math.sin(i * 0.35 + 0.0022 * ins.currentTime)) / 2;
          animation.seek(animation.duration * percent);
        });
      },
      duration: Infinity,
      autoplay: false,
    });

    var introAnimation = anime
      .timeline({
        autoplay: false,
      })
      .add(
        {
          targets: spherePathEls,
          strokeDashoffset: {
            value: [anime.setDashoffset, 0],
            duration: 3900,
            easing: 'easeInOutCirc',
            delay: anime.stagger(190, { direction: 'reverse' }),
          },
          duration: 2000,
          delay: anime.stagger(60, { direction: 'reverse' }),
          easing: 'linear',
        },
        0,
      );

    var shadowAnimation = anime(
      {
        targets: '#sphereGradient',
        x1: '25%',
        x2: '25%',
        y1: '0%',
        y2: '75%',
        duration: 30000,
        easing: 'easeOutQuint',
        autoplay: false,
      },
      0,
    );

    introAnimation.play();
    shadowAnimation.play();
    breathAnimation.play();
  };

  useEffect(() => {
    animate();
  }, []);

  return (
    <StyledSphere className="loader">
      <div className="logo-wrapper">
        <IconSphere />
      </div>
    </StyledSphere>
  );
};

export default Background;
