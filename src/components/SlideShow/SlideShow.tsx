"use client";
import { SlideItemModel } from "@/components/SlideShow/models/slideItem.model";
import {
  Dispatch,
  MutableRefObject,
  ReactElement,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, wrap } from "framer-motion";
import { Pagination } from "@nextui-org/react";

export interface SlideShowProps {
  items: SlideItemModel[];
  width?: string;
  height?: string;
}

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export function SlideShow({
  items,
  width = "w-[100vw]",
  height = "h-[85vh]",
}: SlideShowProps): ReactElement {
  const timeoutRef: MutableRefObject<NodeJS.Timeout | null> =
    useRef<NodeJS.Timeout | null>(null);

  const [isRunning, setRunning]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState(false);

  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, items.length, page);

  const paginate = useCallback(
    (newDirection: number) => {
      const nextChange: number = page + newDirection;

      setPage([nextChange === items.length ? 0 : nextChange, newDirection]);
    },
    [items.length, page],
  );

  useEffect((): (() => void) => {
    resetTimeout();
    timeoutRef.current = setTimeout((): void => {
      paginate(1);
      setRunning(true);
    }, 5000);

    return () => {
      resetTimeout();
    };
  }, [items.length, paginate]);

  function resetTimeout(): void {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
  }
  //
  // const nextSlide: () => void = () => {
  //   if (isRunning) return;
  //   paginate(1);
  //   resetTimeout();
  // };
  //
  // const prevSlide: () => void = () => {
  //   if (isRunning) return;
  //   paginate(-1);
  //   resetTimeout();
  // };

  return (
    <div
      className={
        "flex justify-center items-center relative overflow-hidden" +
        width +
        " " +
        height
      }
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={items[imageIndex].img}
          alt={"Banner"}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className={"absolute w-full h-full object-cover rounded-md"}
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(_, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
              resetTimeout();
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
              resetTimeout();
            }
          }}
        />
      </AnimatePresence>
      <div className={"absolute z-10 font-bold bottom-2"}>
        <Pagination
          total={items.length}
          showControls
          loop
          variant={"flat"}
          page={page + 1}
          onChange={(page: number) =>
            setPage((prev: number[]) => [page - 1, prev[0] < page ? 1 : -1])
          }
        />
      </div>
    </div>
  );
}
