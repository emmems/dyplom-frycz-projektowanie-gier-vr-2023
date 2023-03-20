import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import questions from './questions.json';


const Home: NextPage = () => {

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const mappedQuestions: {
    nr: number;
    question: string;
    answer: string;
    category: string;
  }[] = questions;

  const categories: {[key: string]: {
    nr: number;
    question: string;
    answer: string;
    }[]} = {};

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
  })


  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Amaaaazing - zdaj dyplom 2023." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
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
                href={'/category/' + category}
              >
                <h3 className="text-2xl font-bold">{category}</h3>
                <div className="text-lg">
                  {categories[category]?.length || 0} pytań
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
