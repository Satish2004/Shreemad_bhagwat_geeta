import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

const pictures = [
  "chapter1", //1    --> 1ka photo
  "ct1", // 2  --> 1 ka text
  "chapter2", //3     --> 2 ka photo
  "ct2", // 4   --> 2 ka text
  "chapter2", // 5    --> 3 ka photo
  "ct3", //6    --> 3 ka text
  "chapter4", //7    --> 4 ka photo
  "ct4", //8     --> 4 ka text
  "chapter5", // 9   --> 5 ka photo
  "ct5", //10  --> 5 ka text
  "chapter6", //11     --> 6 ka photo
  "ct6", //12    --> 6 ka text
  "chapter1", //13    ---> 7 ka photo
  "ct7", //14    --> 7 ka text
  "chapter8", //15   -- > 8 ka photo
  "ct8", //16     --> 8 ka text
  "chapter9", //17      --> 9 ka photo
  "ct9", //18   --> 9 ka text
  "chapter10", //1    --> 10 ka photo
  "ct10", // 2  --> 10 ka text
  "chapter11", //3     --> 11 ka photo
  "ct11", // 4   --> 11 ka text
  "chapter12", // 5    --> 12 ka photo
  "ct12", //6    --> 12 ka text
  "chapter13", //7    --> 13 ka photo
  "ct13", //8     --> 13 ka text
  "chapter14", // 9   --> 14 ka photo
  "ct14", //10  --> 14 ka text
  "chapter15", //11     --> 15 ka photo
  "ct15", //12    --> 15 ka text
  "chapter16", //13    ---> 16 ka photo
  "ct16", //14    --> 16 ka text
  "chapter17", //15   -- > 17 ka photo
  "ct17", //16     --> 17 ka text
  "chapter18", //17      --> 18 ka photo
  "ct18", //18   --> 18 ka text
];

export const pageAtom = atom(0);
export const pages = [
  {
    front: "front",
    back: pictures[0],
  },
];
for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "back",
});

// Array of audio files for each page
const audioFiles = [
  " /audios/frontVoice.mp3", // front cover 0
  // 18 Adhyay of bhagwat geet song of every pages
  "/audios/chapter1.mp3", //1
  "/audios/chapter2.mp3", // 2
  "/audios/chapter3.mp3", // 3
  "/audios/chapter4.mp3", // 4
  "/audios/chapter5.mp3", // 5
  "/audios/chapter6.mp3", //6
  "/audios/chapter7.mp3", //7
  "/audios/chapter8.mp3", //8
  "/audios/chapter9.mp3", //9
  "/audios/chapter10.mp3", //11
  "/audios/chapter11.mp3", //12
  "/audios/chapter12.mp3", //13
  "/audios/chapter13.mp3", //14
  "/audios/chapter14.mp3", //15
  "/audios/chapter15.mp3", //16
  "/audios/chapter16.mp3", //17
  "/audios/chapter17.mp3", //18
  "/audios/chapter18.mp3",
  "/audios/End.mp3",
];

// Page flip sound
const pageFlipSound = "/audios/page-flip-01a.mp3";

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);
  const audioRef = useRef(null); // Ref to hold the audio object

  useEffect(() => {
    // Play page-flip sound for every page change
    const pageFlipAudio = new Audio(pageFlipSound);
    pageFlipAudio.play();

    // Stop the previous audio if any
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Play the new audio specific to the page
    audioRef.current = new Audio(audioFiles[page]);
    audioRef.current.play();

    // Clean up audio on component unmount or page change
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [page]);

  return (
    <>
      <main className="pointer-events-none select-none z-10 fixed inset-0 flex justify-between flex-col">
        <a className="pointer-events-auto mt-10 ml-10" href="#">
          <img
            className="w-20"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Om_symbol.svg/150px-Om_symbol.svg.png"
          />
        </a>
        <div className="w-full overflow-auto pointer-events-auto flex justify-center">
          <div className="overflow-auto flex items-center gap-4 max-w-full p-10">
            {[...pages].map((_, index) => (
              <button
                key={index}
                className={`border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border ${
                  index === page
                    ? "bg-white/90 text-black"
                    : "bg-black/30 text-white"
                }`}
                onClick={() => setPage(index)}
              >
                {index === 0 ? "प्रारंभ" : `अध्याय ${index}`}
              </button>
            ))}
            <button
              className={` border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border  ${
                page === pages.length
                  ? "bg-white/90 text-black"
                  : "bg-black/30 text-white"
              }`}
              onClick={() => setPage(pages.length)}
            >
              समाप्त
            </button>
            <a
              href="https://wwwsatishportfoliocom.netlify.app/
"
            >
              <button className="p-7 from-slate-200  text-white border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-sm uppercase shrink-0 border ">
                About me
              </button>
            </a>
          </div>
        </div>
      </main>

      <div className="fixed inset-0 flex items-center -rotate-2 select-none">
        <div className="relative">
          <div className="bg-white/0 animate-horizontal-scroll flex items-center gap-8 w-max px-8">
            <h1 className="shrink-0 text-white text-10xl font-black ">
              यदा यदा हि
            </h1>
            <h2 className="shrink-0 text-white text-8xl italic font-light">
              ग्लानिर्भवति भारत ।
            </h2>
            <h2 className="shrink-0 text-white text-12xl font-bold">
              अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ॥ परित्राणाय साधूनां
            </h2>
            <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline-text">
              विनाशाय च दुष्कृताम् ।
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-medium">
              धर्मासंस्थापनार्थाय संभवामि
            </h2>
            <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">
              युगे युगे ॥
            </h2>
          </div>
          <div className="absolute top-0 left-0 bg-white/0 animate-horizontal-scroll-2 flex items-center gap-8 px-8 w-max">
            {/* empty */}
          </div>
        </div>
      </div>
    </>
  );
};
