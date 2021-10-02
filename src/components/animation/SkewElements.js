import gsap from "gsap";

import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== `undefined`) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.core.globals("ScrollTrigger", ScrollTrigger);
}

export default function skewElements(element) {
  let proxy = { skew: 0 },
    skewSetter = gsap.quickSetter(element, "skewY", "deg"),
    clamp = gsap.utils.clamp(-20, 20);

  ScrollTrigger.create({
    onUpdate: (self) => {
      let skew = clamp(self.getVelocity() / 300);
      if (Math.abs(skew) > Math.abs(proxy.skew)) {
        proxy.skew = skew;
        gsap.to(proxy, {
          skew: 0,
          duration: 0.8,
          ease: "power3",
          overwrite: true,
          onUpdate: () => skewSetter(proxy.skew),
        });
      }
    },
  });

  gsap.set(element, {
    transformOrgin: "right center",
    force3D: true,
  });
}
