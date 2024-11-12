import { Link, useLocation } from "@remix-run/react";
import { motion, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { Grid } from "./Grid";
import { Text } from "./Text";
import { TextLink } from "./TextLink";

const Header = () => {
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
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const motionNavVariants: Variants = {
    open: {
      height: "8rem",
      width: isButtonHovered || isOpen ? "12.8rem" : "9.6rem",
    },
    closed: {
      height: "3.2rem",
      width: isButtonHovered || isOpen ? "12.8rem" : "9.6rem",
    },
    buttonHovered: { width: "12.8rem" },
  };

  const motionButtonVariants: Variants = {
    open: { opacity: 0, pointerEvents: "none" },
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
    setHovered(currentMenuItem);
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

  return (
    <header>
      <Grid>
        <div className="font-family-default fixed bottom-0 left-0 w-full pb-xl">
          <div
            // onMouseLeave={() => handleMouseLeave()}
            className="relative mx-auto flex w-128 flex-col items-center justify-center border-2 border-[red]"
          >
            <motion.button
              animate={isOpen ? "open" : "closed"}
              variants={motionButtonVariants}
              onClick={() => handleMenuOpen()}
              onHoverStart={() => setIsButtonHovered(true)}
              onHoverEnd={() => setIsButtonHovered(false)}
              initial={{ padding: 4, width: 96 }}
              whileHover={{ padding: 8, width: 128 }}
              transition={{
                duration: 0.2,
                pointerEvents: { delay: 0.125, duration: 0.2 },
              }}
              className="font-family-default z-50 w-128 rounded-md bg-dark py-xs text-center text-large font-strong text-light shadow-[0px_0px_0px_0px_rgba(0,_0,_0,_0.10),_4px_2px_9px_0px_rgba(0,_0,_0,_0.10),_14px_10px_17px_0px_rgba(0,_0,_0,_0.09)]"
            >
              Menu
            </motion.button>
            <motion.nav
              ref={navRef}
              animate={isOpen ? "open" : "closed"}
              initial={{ height: "4.6rem", width: "9.6rem" }}
              variants={motionNavVariants}
              transition={{ duration: 0.2 }}
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
        </div>
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
