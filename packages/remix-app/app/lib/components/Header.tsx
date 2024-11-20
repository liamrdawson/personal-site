import { Link, useLocation } from "@remix-run/react";
import { cubicBezier, motion, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { ClientOnly } from "remix-utils/client-only";

import { Grid } from "./Grid";
import { Text } from "./Text";
import { TextLink } from "./TextLink";

interface HeaderProps {
  footerIsInView: boolean;
}

const Header = ({ footerIsInView }: HeaderProps) => {
  const menuItems = [
    { label: "About", path: "/about" },
    { label: "Home", path: "/" },
  ];
  const location = useLocation();
  const currentMenuItem = menuItems.find(
    (item) => item.path === location.pathname,
  );

  const [hovered, setHovered] = useState<(typeof menuItems)[0] | undefined>(
    currentMenuItem,
  );
  const [isOpen, setIsOpen] = useState(false);

  const motionNavVariants: Variants = {
    isOpen: {
      height: ["3.5rem", "8rem"],
      width: ["9.6rem", "12.8rem"],
      transition: {
        ease: cubicBezier(0.5, 0, 0, 1),
        height: {
          duration: 0.25,
          delay: 0.1,
        },
        width: {
          duration: 0.1,
          delay: 0,
        },
      },
    },
    isClosed: {
      height: [null, "3.5rem"],
      width: [null, "9.6rem"],
      transition: {
        ease: cubicBezier(0.5, 0, 0, 1),
        height: {
          duration: 0.25,
          delay: 0.1,
        },
        width: {
          duration: 0.1,
          delay: 0,
        },
      },
    },
  };

  const motionButtonVariants: Variants = {
    open: {
      opacity: 0,
      pointerEvents: "none",
    },
    closed: { opacity: 1, pointerEvents: "auto" },
  };

  const HoverBox = () => (
    <motion.span
      layoutId="underline"
      transition={{ duration: 0.2 }}
      className="absolute bottom-0 left-0 right-0 top-0 z-30 rounded-sm bg-light"
    />
  );

  const navRef = useRef<HTMLDivElement>(null);

  const handleMenuOpen = () => {
    if (isMobile) {
      setHovered(currentMenuItem);
    } else {
      setHovered(menuItems.find((item) => item.path === "/"));
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
    setHovered(menuItems[1]);
  };

  const handleLinkClick = () => handleMouseLeave();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside as EventListener);
    document.addEventListener(
      "touchstart",
      handleClickOutside as EventListener,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside as EventListener,
      );
      document.removeEventListener(
        "touchstart",
        handleClickOutside as EventListener,
      );
    };
  }, []);

  const menuVariants: Variants = {
    hidden: {
      y: "110%",
    },
    visible: {
      y: 0,
    },
  };

  const boxShadow =
    "shadow-[0px_0px_0px_0px_rgba(0,_0,_0,_0.10),_4px_2px_9px_0px_rgba(0,_0,_0,_0.10),_14px_10px_17px_0px_rgba(0,_0,_0,_0.09)]";

  return (
    <header>
      <Grid>
        <ClientOnly>
          {() => (
            <motion.div
              variants={menuVariants}
              animate={footerIsInView ? "hidden" : "visible"}
              className="fixed bottom-0 left-0 z-50 w-full pb-xl font-family-default"
              initial={{ y: "100%" }}
              transition={{
                duration: 0.3,
                delay: 0,
                ease: cubicBezier(0.5, 0, 0, 1),
              }}
            >
              <div className="relative mx-auto flex w-128 flex-col items-center justify-center border-2 border-[red]">
                <motion.button
                  animate={isOpen ? "open" : "closed"}
                  variants={motionButtonVariants}
                  onClick={() => handleMenuOpen()}
                  initial={{ padding: 4, width: 96 }}
                  whileHover={{
                    padding: 8,
                    width: 128,
                    transition: {
                      duration: 0.2,
                      ease: cubicBezier(0.28, 0.44, 0.49, 1),
                      pointerEvents: { delay: 0.125, duration: 0.125 },
                    },
                  }}
                  transition={{
                    duration: 0.2,
                    ease: cubicBezier(0.28, 0.44, 0.49, 1),
                    pointerEvents: { delay: 0.125, duration: 0.125 },
                  }}
                  className={`${boxShadow} z-50 w-128 rounded-md bg-dark py-xs text-center font-family-default text-large font-strong text-light`}
                >
                  Menu
                </motion.button>
                <motion.nav
                  ref={navRef}
                  animate={isOpen ? "isOpen" : "isClosed"}
                  initial={{ height: "2.6rem", width: "9.6rem" }}
                  variants={motionNavVariants}
                  onMouseLeave={() => handleMouseLeave()}
                  className="absolute bottom-0 w-96 overflow-y-hidden rounded-md bg-dark p-xs"
                >
                  <ul className="relative flex flex-col rounded-sm text-center text-large font-strong">
                    {menuItems.map((item) => (
                      <motion.li
                        key={item.label}
                        className={`relative z-40 flex h-32 flex-row items-center justify-center`}
                        onHoverStart={() => setHovered(item)}
                        onClick={() => handleLinkClick()}
                      >
                        <TextLink
                          className={`relative z-40 flex h-full w-full items-center justify-center px-sm ${item.label === hovered?.label ? "text-dark" : "text-light"}`}
                          to={item.path}
                          variant="nav"
                          prefetch="viewport"
                        >
                          <span className="relative z-40">{item.label}</span>
                          {item.label === hovered?.label ? <HoverBox /> : null}
                        </TextLink>
                      </motion.li>
                    ))}
                  </ul>
                </motion.nav>
              </div>
            </motion.div>
          )}
        </ClientOnly>
        <div className="col-span-6 col-start-1 border-b border-solid border-dark pb-md pt-xl text-center md:col-span-12">
          <Link to="/">
            <Text variant="display" size="display">
              LIAM DAWSON
            </Text>
            <Text
              variant="content"
              size="default"
              className="italic leading-subheading"
            >
              <i>eCommerce Developer</i>
            </Text>
          </Link>
        </div>
      </Grid>
    </header>
  );
};

export default Header;
