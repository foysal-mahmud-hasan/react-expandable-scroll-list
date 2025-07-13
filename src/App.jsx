import { useState, useRef, useEffect } from "react";
import "./App.css";
import { Button, Center, ScrollArea, Box, Paper } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

function App() {
  const { height, width } = useViewportSize();

  const [enlargedIndex, setEnlargedIndex] = useState(null);

  const [boxPortal, setBoxPortal] = useState({});
  const scrollAreaRef = useRef(null);

  return (
    <>
      <Center w={width} h={height} bg="blue" p="md">
        <ScrollArea
          h={height - 300}
          w={600}
          bg={"yellow"}
          ref={scrollAreaRef}
          p={"xs"}
        >
          {Array.from({ length: 10 }).map((_, i) => {
            const isEnlarged = enlargedIndex === i;
            return (
              <Box key={`container-${i + 1}`} w="100%">
                {isEnlarged && (
                  <Box
                    p="md"
                    m="sm"
                    h={58}
                    bg="green"
                    // style={{ visibility: "hidden" }}
                  />
                )}
                <Paper
                  shadow={isEnlarged ? "xl" : ""}
                  p="md"
                  m="sm"
                  bg={isEnlarged ? "red" : "white"}
                  h={isEnlarged ? boxPortal.height * 1.1 : 58}
                  w={isEnlarged ? scrollAreaRef.current?.offsetWidth * 1.1 : ""}
                  style={{
                    textAlign: "center",
                    position: isEnlarged ? "fixed" : "",
                    top: isEnlarged ? boxPortal.top - 11 : "",
                    left: isEnlarged
                      ? scrollAreaRef.current?.offsetLeft -
                        (scrollAreaRef.current?.offsetWidth * 1.15 -
                          scrollAreaRef.current?.offsetWidth) /
                          2
                      : "",
                    zIndex: isEnlarged ? 9999 : 1,
                  }}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setBoxPortal({
                      top: rect.top,
                      left: rect.left,
                    });
                    setEnlargedIndex(i);
                  }}
                >
                  Element {i + 1}
                </Paper>
              </Box>
            );
          })}
        </ScrollArea>
      </Center>
    </>
  );
}

export default App;
