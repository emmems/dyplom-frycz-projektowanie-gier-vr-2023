import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import questions from "./questions.json";
import { useState } from "react";


const Home: NextPage = () => {
  const [searchResults, setSearchResults] = useState([] as {
    nr: number;
    question: string;
    answer: string;
  }[]);
  const [expandedIndexes, setExpandedIndexes] = useState([] as number[]);
  const [currentSearchQuery, setCurrentSearchQuery] = useState("");
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const mappedQuestions: {
    nr: number;
    question: string;
    answer: string;
    category: string;
  }[] = questions;

  const categories: {
    [key: string]: {
      nr: number;
      question: string;
      answer: string;
    }[]
  } = {};

  mappedQuestions.forEach(el => {
    const payload = {
      nr: 1,
      question: el.question,
      answer: el.answer
    };
    if (categories[el.category] !== undefined) {
      categories[el.category]?.push(payload);
    } else {
      categories[el.category] = [payload];
    }
  });


  function search(query: string) {

    setCurrentSearchQuery(query);
    const matches = mappedQuestions.filter(el => el.question.toLowerCase().includes(query.toLowerCase()) || el.answer.toLowerCase().includes(query.toLowerCase()));

    setExpandedIndexes([]);
    setSearchResults(matches);
  }

  function toggleIndex(index: number) {
    if (expandedIndexes.find(el => index === el) !== undefined) {
      setExpandedIndexes(expandedIndexes.filter(el => index !== el));
    } else {
      setExpandedIndexes([...expandedIndexes, index]);
    }
    console.log(expandedIndexes);
  }

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Amaaaazing - zdaj dyplom 2023." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Fiszki <span className="text-[hsl(280,100%,70%)]">DYPLOM</span> 2023
          </h1>
          <p className="text-3xl font-bold text-white">Wybierz kategorię pytań</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">

            {Object.keys(categories).map((category) => (
              <Link
                key={category}
                className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
                href={"/category/" + category}
              >
                <h3 className="text-2xl font-bold">{category}</h3>
                <div className="text-lg">
                  {categories[category]?.length || 0} pytań
                </div>
              </Link>
            ))}

            <div className={"flex flex-col justify-center w-full sm:col-span-2"}>
              <input className={"px-3 py-2 rounded-2xl"} type="text" placeholder="Wpisz pytanie..."
                     onChange={(e) => search(e.target.value)} />
            </div>
            <div className={"flex flex-col gap-5 w-full"}>
              {searchResults.map((result, index) =>
                <button key={index} onClick={() => {
                  toggleIndex(index);
                }} className={"flex flex-col items-center bg-black/60 rounded-2xl px-3 py-2 text-white"}>
                  <p className={'text-base font-medium mb-3'} dangerouslySetInnerHTML={{__html: result.question.toLowerCase().replaceAll(currentSearchQuery.toLowerCase(), "<span class='font-bold text-blue-400'>" + currentSearchQuery + "</span>")}}></p>
                  {expandedIndexes.find(el => index === el) !== undefined
                    ? <p className={'text-xs'} dangerouslySetInnerHTML={{__html: result.answer.toLowerCase().replaceAll(currentSearchQuery.toLowerCase(), "<span class='font-bold text-blue-400'>" + currentSearchQuery + "</span>")}}></p>
                    : <p className={'text-xs'} dangerouslySetInnerHTML={{__html: result.answer.toLowerCase().replaceAll(currentSearchQuery.toLowerCase(), "<span class='font-bold text-blue-400'>" + currentSearchQuery + "</span>").slice(0, 90)}}></p>
                  }
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
