'use client';
// Adapted from lucide-animated.com (pqoqubbw), MIT. See LUCIDE-ANIMATED-LICENSE.txt.
import {motion,useAnimation,useReducedMotion} from 'motion/react';
import {forwardRef,useCallback,useImperativeHandle,useRef,useEffect,useState} from 'react';
const cn = value => value || '';

const ARROW_RIGHT_PATH_VARIANTS = {
  normal: { d: "M5 12h14" },
  animate: {
    d: ["M5 12h14", "M5 12h9", "M5 12h14"],
    transition: {
      duration: 0.4,
    },
  },
};

const SECONDARY_ARROW_RIGHT_PATH_VARIANTS = {
  normal: { d: "m12 5 7 7-7 7", translateX: 0 },
  animate: {
    d: "m12 5 7 7-7 7",
    translateX: [0, -3, 0],
    transition: {
      duration: 0.4,
    },
  },
};

const ArrowRightIcon = forwardRef(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start("animate");
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start("normal");
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            animate={controls}
            d="M5 12h14"
            variants={ARROW_RIGHT_PATH_VARIANTS}
          />
          <motion.path
            animate={controls}
            d="m12 5 7 7-7 7"
            variants={SECONDARY_ARROW_RIGHT_PATH_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

ArrowRightIcon.displayName = "ArrowRightIcon";

export { ArrowRightIcon };


const BookTextIcon = forwardRef(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start("animate");
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start("normal");
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <motion.svg
          animate={controls}
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          variants={{
            animate: {
              scale: [1, 1.04, 1],
              rotate: [0, -8, 8, -8, 0],
              y: [0, -2, 0],
              transition: {
                duration: 0.6,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
              },
            },
            normal: {
              scale: 1,
              rotate: 0,
              y: 0,
            },
          }}
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
          <path d="M8 11h8" />
          <path d="M8 7h6" />
        </motion.svg>
      </div>
    );
  }
);

BookTextIcon.displayName = "BookTextIcon";

export { BookTextIcon };


const VARIANTS = {
  normal: {
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  animate: {
    y: [0, -3, 0],
    rotate: [0, -4, 0],
    transition: {
      duration: 0.55,
      ease: "easeInOut",
      times: [0, 0.45, 1],
    },
  },
};

const WalletIcon = forwardRef(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start("animate");
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start("normal");
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <motion.svg
          animate={controls}
          fill="none"
          height={size}
          initial="normal"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          style={{ transformOrigin: "12px 12px" }}
          variants={VARIANTS}
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
          <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
        </motion.svg>
      </div>
    );
  }
);

WalletIcon.displayName = "WalletIcon";

export { WalletIcon };


const MESSAGE_CIRCLE_ICON_VARIANTS = {
  normal: {
    scale: 1,
    rotate: 0,
  },
  animate: {
    scale: 1.05,
    rotate: [0, -7, 7, 0],
    transition: {
      rotate: {
        duration: 0.5,
        ease: "easeInOut",
      },
      scale: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  },
};

const MessageCircleIcon = forwardRef(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const controls = useAnimation();
  const isControlledRef = useRef(false);

  useImperativeHandle(ref, () => {
    isControlledRef.current = true;

    return {
      startAnimation: () => controls.start("animate"),
      stopAnimation: () => controls.start("normal"),
    };
  });

  const handleMouseEnter = useCallback(
    (e) => {
      if (isControlledRef.current) {
        onMouseEnter?.(e);
      } else {
        controls.start("animate");
      }
    },
    [controls, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e) => {
      if (isControlledRef.current) {
        onMouseLeave?.(e);
      } else {
        controls.start("normal");
      }
    },
    [controls, onMouseLeave]
  );

  return (
    <div
      className={cn(className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <motion.svg
        animate={controls}
        fill="none"
        height={size}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        variants={MESSAGE_CIRCLE_ICON_VARIANTS}
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      </motion.svg>
    </div>
  );
});

MessageCircleIcon.displayName = "MessageCircleIcon";

export { MessageCircleIcon };


const FlaskIcon = forwardRef(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start("animate");
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start("normal");
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          fill="currentColor"
          height={size}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="5.632"
          viewBox="0 0 512 512"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.g
            animate={controls}
            variants={{
              normal: { rotate: 0, translateY: 0 },
              animate: {
                translateY: -12,
                rotate: [0, 5, -5, 3, -3, 0],
                transition: {
                  ease: "linear",
                  rotate: { duration: 0.8 },
                },
              },
            }}
          >
            <circle cx="151.273" cy="407.273" r="11.636" />
            <circle cx="244.364" cy="372.364" r="11.636" />
            <circle cx="290.909" cy="418.909" r="11.636" />
            <circle cx="221.091" cy="453.818" r="11.636" />
            <circle cx="372.364" cy="430.545" r="11.636" />
          </motion.g>
          <motion.path
            animate={controls}
            d="M456.145,436.364l-79.127-124.509c0-2.327-2.327-4.655-3.491-5.818l-34.909-55.855c-8.146-13.964-12.8-29.091-12.8-44.218 V67.491c13.964-4.655,23.273-17.455,23.273-32.582C349.091,15.127,333.964,0,314.182,0H197.818 c-19.782,0-34.909,15.127-34.909,34.909c0,19.782,15.127,34.909,34.909,34.909h69.818c6.982,0,11.636-4.655,11.636-11.636 s-4.655-11.636-11.636-11.636h-69.818c-6.982,0-11.636-4.655-11.636-11.636c0-6.982,4.655-11.636,11.636-11.636h116.364 c6.982,0,11.636,4.655,11.636,11.636c0,6.982-4.655,11.636-11.636,11.636s-11.636,4.655-11.636,11.636v147.782 c0,19.782,5.818,39.564,16.291,55.855l19.782,31.418c-30.255-5.818-64-2.327-88.436,10.473 c-23.273,11.636-60.509,13.964-87.273,4.655l30.255-46.545c10.473-16.291,16.291-36.073,16.291-55.855V104.727 c0-6.982-4.655-11.636-11.636-11.636s-11.636,4.655-11.636,11.636v101.236c0,15.127-4.655,30.255-12.8,43.055l-34.909,55.855 c-1.164,1.164-2.327,2.327-3.491,3.491c0,1.164,0,1.164-1.164,2.327L55.855,436.364c-5.818,9.309-9.309,19.782-9.309,31.418v9.309 c0,19.782,15.127,34.909,34.909,34.909h349.091c19.782,0,34.909-15.127,34.909-34.909v-9.309 C465.455,456.145,461.964,445.673,456.145,436.364z M443.345,477.091h-1.164c0,6.982-4.655,11.636-11.636,11.636H81.455 c-6.982,0-11.636-4.655-11.636-11.636v-9.309c0-6.982,2.327-12.8,5.818-18.618l75.636-119.855 c15.127,5.818,32.582,8.145,50.036,8.145c22.109,0,43.055-4.655,60.509-12.8c25.6-12.8,68.655-13.964,96.582-1.164l79.127,125.673 c3.491,5.818,5.818,11.636,5.818,18.618V477.091z"
            variants={{
              normal: { rotate: 0, scale: 1 },
              animate: {
                scale: 0.9,
                rotate: [0, 6, -6, 3, -3, 0],
                transition: {
                  duration: 0.8,
                  scale: {
                    duration: 0.3,
                    type: "spring",
                    bounce: 0.4,
                    stiffness: 150,
                    damping: 10,
                  },
                },
              },
            }}
          />
        </svg>
      </div>
    );
  }
);

FlaskIcon.displayName = "FlaskIcon";

export { FlaskIcon };


const RECEIPT_DOLLAR_MAIN_VARIANTS = {
  normal: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    transition: {
      duration: 0.6,
      opacity: { duration: 0.1 },
    },
  },
};

const RECEIPT_DOLLAR_SECONDARY_VARIANTS = {
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: {
      delay: 0.3,
      duration: 0.3,
      opacity: { duration: 0.1, delay: 0.3 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      delay: 0.5,
      duration: 0.4,
      opacity: { duration: 0.1, delay: 0.5 },
    },
  },
};

const ReceiptIcon = forwardRef(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start("animate");
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start("normal");
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <motion.svg
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            animate={controls}
            d="M12 17V7"
            initial="normal"
            variants={RECEIPT_DOLLAR_SECONDARY_VARIANTS}
          />
          <motion.path
            animate={controls}
            d="M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8"
            initial="normal"
            variants={RECEIPT_DOLLAR_MAIN_VARIANTS}
          />
          <path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z" />
        </motion.svg>
      </div>
    );
  }
);

ReceiptIcon.displayName = "ReceiptIcon";

export { ReceiptIcon };

const animatedIcons={arrow:ArrowRightIcon,book:BookTextIcon,notebook:BookTextIcon,wallet:WalletIcon,chat:MessageCircleIcon,flask:FlaskIcon,receipt:ReceiptIcon};
export function AnimatedIcon({target,name}){
  const handle=useRef(null),reduced=useReducedMotion();
  const [active,setActive]=useState(false);
  const Icon=animatedIcons[name];
  useEffect(()=>{
    if(!Icon||reduced)return;
    const host=target.closest('a,button,.preview-steps li,.overview-skills>span,.receipt')||target;
    const start=()=>{setActive(true);handle.current?.startAnimation();};
    const stop=()=>{setActive(false);handle.current?.stopAnimation();};
    host.addEventListener('pointerenter',start);
    host.addEventListener('pointerleave',stop);
    host.addEventListener('focusin',start);
    host.addEventListener('focusout',stop);
    return ()=>{host.removeEventListener('pointerenter',start);host.removeEventListener('pointerleave',stop);host.removeEventListener('focusin',start);host.removeEventListener('focusout',stop);};
  },[target,Icon,reduced]);
  return Icon?<motion.span className="icon-motion-wrap" animate={!reduced&&active?(name==='arrow'?{x:[0,7,0],scale:[1,1.18,1]}:{y:[0,-5,0],rotate:[0,-12,10,0],scale:[1,1.22,1]}):{x:0,y:0,rotate:0,scale:1}} transition={!reduced&&active?{duration:.85,repeat:Infinity,repeatDelay:.4,ease:'easeInOut'}:{duration:.2}}><Icon ref={handle} size={21} className="lucide-motion" aria-hidden="true"/></motion.span>:null;
}

