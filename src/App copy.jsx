import { useState, useRef, useEffect } from "react";
import "./App.css";
import { Button, Center, ScrollArea, Box } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

function App() {
  const { height, width } = useViewportSize();

  const [enlargedIndex, setEnlargedIndex] = useState(null);

  const [boxPortal, setBoxPortal] = useState({
    index: null,
    top: 0,
    left: 0,
    width: 0,
  });
  const scrollAreaRef = useRef(null);
  const originalElementRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    let lastUpdateTime = 0;
    const throttleMs = 16;

    const updatePosition = (currentTime) => {
      if (currentTime - lastUpdateTime >= throttleMs) {
        if (enlargedIndex !== null && originalElementRef.current) {
          const rect = originalElementRef.current.getBoundingClientRect();
          const scrollAreaRect = scrollAreaRef.current?.getBoundingClientRect();

          const isVisible =
            scrollAreaRect &&
            rect.bottom >= scrollAreaRect.top &&
            rect.top <= scrollAreaRect.bottom;
          setBoxPortal((prev) => ({
            ...prev,
            top: rect.top - 12,
            left: rect.left - 12,
            visible: isVisible,
          }));
        }
        lastUpdateTime = currentTime;
      }
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    if (enlargedIndex !== null) {
      animationFrameId = requestAnimationFrame(updatePosition);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [enlargedIndex]);

  return (
    <>
      <Box
        w={width}
        h={height}
        bg="blue"
        p="md"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ScrollArea
          h={height - 300}
          type="auto"
          w={600}
          bg={"yellow"}
          ref={scrollAreaRef}
          p={"xs"}
        >
          {Array.from({ length: 10 }).map((_, i) => {
            const isEnlarged = enlargedIndex === i;
            return (
              <div key={`container-${i + 1}`}>
                {isEnlarged && (
                  <Box
                    ref={originalElementRef}
                    p="md"
                    m="sm"
                    h={58}
                    style={{ visibility: "hidden" }}
                  />
                )}
                <Box
                  p="md"
                  m="sm"
                  bg="white"
                  h={58}
                  w={isEnlarged ? boxPortal.width * 2 : 560}
                  style={{
                    borderRadius: 8,
                    textAlign: "center",
                    cursor: "pointer",
                    margin: "auto",
                    position: isEnlarged ? "fixed" : "relative",
                    top: isEnlarged ? boxPortal.top : "auto",
                    left: isEnlarged
                      ? boxPortal.left - boxPortal.width / 2
                      : "auto",
                    zIndex: isEnlarged ? 9999 : 1,
                    display:
                      isEnlarged && boxPortal.visible === false
                        ? "none"
                        : "block",
                  }}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setBoxPortal({
                      index: i,
                      top: rect.top - 12,
                      left: rect.left - 12,
                      width: rect.width,
                    });
                    setEnlargedIndex(i);
                  }}
                >
                  Element {i + 1}
                </Box>
              </div>
            );
          })}
        </ScrollArea>
      </Box>
    </>
  );
}

export default App;
