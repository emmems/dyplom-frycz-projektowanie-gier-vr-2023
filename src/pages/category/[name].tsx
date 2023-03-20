import Head from "next/head";
import questions from "../questions.json";
import { useState } from "react";


export default function CategoryName(props) {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);


  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const mappedQuestions: {
    nr: number;
    question: string;
    answer: string;
    category: string;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  }[] = props.questions;

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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const categoryQuestions = categories[props.name as string]!;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const [randomQuestion, setNextRandomQuestion] = useState(props.firstRandomQuestion as {
    nr: number;
    question: string;
    answer: string;
  });

  function showAnswerButton() {
    setIsAnswerVisible(true);
  }

  function nextQuestion() {
    setIsAnswerVisible(false);
    setNextRandomQuestion(getRandomItem(categoryQuestions));
  }

  return (
    <>
      <Head>
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
        <title>{props.name}</title>
        <meta name="description" content="Amaaaazing - zdaj dyplom 2023." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="bg-white/90 rounded-xl">

            {randomQuestion != null &&
              <div className="flex flex-col gap-3 items-center mx-2 py-3">
                <article>{randomQuestion.question}</article>
                <button onClick={showAnswerButton} className="px-3 py-2 rounded-xl text-white bg-blue-500 hover:bg-blue-300 transition">
                  Pokaż odpowiedź
                </button>
                {isAnswerVisible &&
                  <article dangerouslySetInnerHTML={{__html: randomQuestion.answer }}></article>
                }
                <button onClick={nextQuestion} className="px-3 py-2 rounded-xl text-white bg-blue-500 hover:bg-blue-300 transition">
                  Następne pytanie
                </button>
              </div>
            }
          </div>
        </div>
      </main>
    </>
  );
}

export function getServerSideProps(context) {
  return {
    props: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
      name: context.params.name,
      questions: questions,
      firstRandomQuestion: getRandomItem(questions)
    } // will be passed to the page component as props
  };
}

function getRandomItem<T>(arr: T[]): T | undefined {
  if (arr === undefined) {
    return undefined;
  }

  // get random index value
  const randomIndex = Math.floor(Math.random() * arr.length);

  // get random item
  const item = arr[randomIndex];

  return item;
}