(() => {
  gsap.registerPlugin(ScrollTrigger);

  let animateTimeline = gsap.timeline();
  let sequenceTimeline = gsap.timeline({
    scrollTrigger: {
      scrub: 1,
      start: "+=50px",
      end: "+=" + window.innerHeight * 6,
      anticipatePin: true,
    },
  });

  const canvas = document.getElementById("sequence-loader");
  const context = canvas.getContext("2d");

  canvas.width = 600;
  canvas.height = 600;

  const sequenceCreator = (texts, imageFolder, frameStart, frameCount) => {
    const currentFrame = (index) => {
      return `${imageFolder}/${(index + 1).toString()}.png`;
    };

    const images = [];
    const products = {
      frame: 0,
    };

    for (let i = frameStart; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    sequenceTimeline.to(products, {
      frame: frameCount - 1,
      snap: "frame",
      onUpdate: render,
    });

    images[0].onload = render;

    function render() {
      if (!images[products.frame]) {
        return;
      }
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        images[products.frame],
        0,
        0,
        images[products.frame].naturalWidth,
        images[products.frame].naturalHeight,
        0,
        0,
        canvas.width,
        canvas.height
      );

      if (products.frame) {
        if (texts) {
          if (products.frame > 1) {
            sequenceTimeline.to(
              canvas,
              { autoAlpha: 1, ease: Power4.easeOut },
              0
            );
          }

          texts.map((text) => {
            let textId = document.getElementById(text.id);
            if (products.frame >= text.start && products.frame <= text.end) {
              sequenceTimeline.to(
                textId,
                {
                  autoAlpha: 1,
                  ease: Power4.easeOut,
                },
                0
              );
            } else {
              sequenceTimeline.to(
                textId,
                {
                  autoAlpha: 0,
                  ease: Power4.easeOut,
                },
                0
              );
            }
          });
        }
      }
    }
  };

  const scrollImages = (texts, imageFolder, frameStart, frameCount) => {
    ScrollTrigger.matchMedia({
      "(min-width: 800px)": function () {
        canvas.width = 625;
        canvas.height = 625;
        sequenceCreator(texts, imageFolder, frameStart, frameCount);
      },
      "(max-width: 768px)": function () {
        canvas.width = 525;
        canvas.height = 525;
        sequenceCreator(texts, imageFolder, frameStart, frameCount);
      },
      "(max-width: 512px)": function () {
        canvas.width = 350;
        canvas.height = 350;
        sequenceCreator(texts, imageFolder, frameStart, frameCount);
      },
    });
  };

  const animateOnLoad = (imageFolder, frameStart, frameCount, duration) => {
    const currentFrame = (index) => {
      return `${imageFolder}/${(index + 1).toString()}.png`;
    };

    const initalImages = [];
    const initialProducts = {
      frame: 0,
    };

    for (let i = frameStart; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      initalImages.push(img);
    }

    animateTimeline.to(initialProducts, {
      frame: frameCount - 1,
      snap: "frame",
      onUpdate: () => {
        if (initialProducts.frame) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(
            initalImages[initialProducts.frame],
            0,
            0,
            initalImages[initialProducts.frame].naturalWidth,
            initalImages[initialProducts.frame].naturalHeight,
            0,
            0,
            canvas.width,
            canvas.height
          );

          let textId = document.getElementById("product-description-1");
          animateTimeline.to(
            textId,
            {
              autoAlpha: 1,
              ease: Power4.easeOut,
            },
            0
          );
        }
      },
    });

    animateTimeline.play();
    animateTimeline.duration(duration);
  };

  setTimeout(() => {
    animateOnLoad("./img", 0, 29, 1.3);

    scrollImages(
      [
        {
          id: "product-description-1",
          start: 0,
          end: 30,
        },
        {
          id: "product-description-2",
          start: 32,
          end: 115,
        },
        {
          id: "product-description-3",
          start: 116,
          end: 185,
        },
        {
          id: "product-description-4",
          start: 186,
          end: 204,
        },
        {
          id: "product-description-5",
          start: 32,
          end: 95,
        },
        {
          id: "product-description-6",
          start: 96,
          end: 132,
        },
        {
          id: "product-description-7",
          start: 133,
          end: 155,
        }
      ],
      "./img",
      29,
      204
    );
  }, 2500);
})();
